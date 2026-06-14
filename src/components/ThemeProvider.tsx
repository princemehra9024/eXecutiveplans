import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

type Theme = 'dark' | 'light';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  toggleTheme: (originX: number, originY: number) => void;
  isAnimating: boolean;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  toggleTheme: () => null,
  isAnimating: false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = useCallback((originX: number, originY: number) => {
    if (isAnimating) return;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Use View Transitions API if supported
    if ((document as any).startViewTransition) {
      // Set CSS custom properties for the clip-path origin
      document.documentElement.style.setProperty('--theme-toggle-x', `${originX}px`);
      document.documentElement.style.setProperty('--theme-toggle-y', `${originY}px`);
      document.documentElement.classList.add('theme-transitioning');

      const transition = (document as any).startViewTransition(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(nextTheme);
        localStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);
      });

      transition.finished.finally(() => {
        document.documentElement.classList.remove('theme-transitioning');
        document.documentElement.style.removeProperty('--theme-toggle-x');
        document.documentElement.style.removeProperty('--theme-toggle-y');
      });
    } else {
      // Fallback: manual ripple overlay
      setIsAnimating(true);
      const overlay = overlayRef.current;
      if (!overlay) {
        setTheme(nextTheme);
        localStorage.setItem(storageKey, nextTheme);
        setIsAnimating(false);
        return;
      }

      // Size the circle to cover the full viewport
      const maxDim = Math.max(
        Math.hypot(originX, originY),
        Math.hypot(window.innerWidth - originX, originY),
        Math.hypot(originX, window.innerHeight - originY),
        Math.hypot(window.innerWidth - originX, window.innerHeight - originY)
      );
      const diameter = maxDim * 2 + 50;

      overlay.style.left = `${originX}px`;
      overlay.style.top = `${originY}px`;
      overlay.style.width = `${diameter}px`;
      overlay.style.height = `${diameter}px`;
      overlay.style.marginLeft = `-${diameter / 2}px`;
      overlay.style.marginTop = `-${diameter / 2}px`;
      overlay.style.backgroundColor = nextTheme === 'dark' ? '#000000' : '#ffffff';
      overlay.style.transform = 'scale(0)';
      overlay.style.opacity = '1';
      overlay.style.transition = 'none';
      overlay.style.display = 'block';

      // Force reflow
      overlay.offsetHeight;

      overlay.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
      overlay.style.transform = 'scale(1)';

      setTimeout(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(nextTheme);
        localStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);

        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
          setIsAnimating(false);
        }, 300);
      }, 400);
    }
  }, [theme, isAnimating, storageKey]);

  const value = { theme, toggleTheme, isAnimating };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
      {/* Fallback ripple overlay (used when View Transitions API is not available) */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          display: 'none',
          borderRadius: '50%',
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      />
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
