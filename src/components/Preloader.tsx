import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = 'auto';
      }
    });

    // Fast loading animation
    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power3.inOut'
    })
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in'
    }, "-=0.2")
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut'
    });

    return () => {
      document.body.style.overflow = 'auto';
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950"
    >
      <div className="relative overflow-hidden">
        <h2 
          ref={textRef}
          className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter uppercase mb-8"
        >
          Executive Plans
        </h2>
      </div>
      
      <div className="w-64 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full bg-orange-500 origin-left scale-x-0"
        />
      </div>
    </div>
  );
}
