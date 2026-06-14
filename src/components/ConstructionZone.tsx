import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import { Settings } from 'lucide-react';

// Welding Torch Emitter with Smoke and Intense Flashes
const WeldingTorch = ({ className, angleOffset = 0, isBlackout = false }: { className?: string, angleOffset?: number, isBlackout?: boolean }) => {
  const [sparks, setSparks] = useState<number[]>([]);
  const [smoke, setSmoke] = useState<number[]>([]);
  const flashControls = useAnimation();

  useEffect(() => {
    if (isBlackout) {
      setSparks([]);
      setSmoke([]);
      return;
    }
    const interval = setInterval(() => {
      // Trigger a massive burst of sparks
      const numSparks = Math.floor(Math.random() * 30) + 20;
      setSparks(Array.from({ length: numSparks }, (_, i) => Date.now() + i));

      // Trigger a puff of smoke occasionally
      if (Math.random() > 0.4) {
        setSmoke((prev) => [...prev, Date.now()]);
      }

      // Trigger intense ambient light flash
      flashControls.start({
        opacity: [0, 0.8, 0.2, 1, 0],
        scale: [1, 1.5, 1.2, 2, 1],
        transition: { duration: 0.3 }
      });

      setTimeout(() => setSparks([]), 1500);
      setTimeout(() => setSmoke([]), 4000); // Smoke lasts longer
    }, Math.random() * 800 + 400);

    return () => clearInterval(interval);
  }, [flashControls, isBlackout]);

  return (
    <div className={`absolute w-10 h-10 flex items-center justify-center ${className} transition-opacity duration-500 ${isBlackout ? 'opacity-0' : 'opacity-100'}`}>
      {/* Ambient flash lighting when welding */}
      {!isBlackout && (
        <motion.div
          className="absolute w-32 h-32 bg-blue-500/20 rounded-full blur-[30px] pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={flashControls}
        />
      )}

      {/* Intense center light of the weld */}
      {!isBlackout && (
        <motion.div
          className="absolute w-8 h-8 bg-blue-100 rounded-full blur-[6px] z-20"
          animate={{ scale: [1, 1.4, 0.8, 1.2, 1], opacity: [0.7, 1, 0.5, 1, 0.8] }}
          transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
        />
      )}
      {!isBlackout && <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_40px_20px_rgba(59,130,246,1)] z-30" />}

      {/* Smoke */}
      {!isBlackout && smoke.map((id) => (
        <motion.div
          key={`smoke-${id}`}
          className="absolute w-16 h-16 bg-neutral-500/10 rounded-full blur-[15px] z-10"
          initial={{ x: 0, y: 0, scale: 0.5, opacity: 0.5 }}
          animate={{
            y: -150 - Math.random() * 100,
            x: (Math.random() - 0.5) * 100,
            scale: [0.5, 3, 5],
            opacity: [0.5, 0.2, 0]
          }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      ))}

      {/* Sparks */}
      {!isBlackout && sparks.map((id) => {
        const baseAngle = (Math.random() * 90 - 45);
        const finalAngle = (baseAngle + angleOffset) * (Math.PI / 180);

        // Faster velocity
        const velocity = Math.random() * 450 + 150;

        const targetX = Math.sin(finalAngle) * velocity;
        const initialYVelocity = -Math.cos(finalAngle) * velocity;
        const gravityDrop = Math.random() * 300 + 150;

        const size = Math.random() * 5 + 2;
        const colors = ['#fef08a', '#fb923c', '#ffffff', '#eab308'];
        const sparkColor = colors[Math.floor(Math.random() * colors.length)];

        // Simulate motion blur by stretching the spark slightly based on angle
        const rotation = Math.atan2(initialYVelocity, targetX) * (180 / Math.PI);

        return (
          <motion.div
            key={`spark-${id}`}
            className="absolute rounded-full z-20"
            style={{
              width: size * 2, // stretched
              height: size * 0.5, // thinned
              backgroundColor: sparkColor,
              boxShadow: `0 0 ${size * 4}px ${sparkColor}`,
              rotate: rotation
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: [0, targetX * 0.8, targetX],
              y: [0, initialYVelocity * 0.8, initialYVelocity + gravityDrop],
              opacity: [1, 1, 0],
              scale: [1, Math.random() * 0.5 + 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 0.4 + 0.3,
              ease: "easeOut",
              times: [0, 0.4, 1]
            }}
          />
        );
      })}
    </div>
  );
};

// Flickering Text Component
const FlickeringText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      className={className}
      animate={{ opacity: [1, 1, 0.4, 1, 0.8, 1, 1, 0.2, 1] }}
      transition={{
        duration: Math.random() * 2 + 2,
        repeat: Infinity,
        repeatType: "mirror",
        times: [0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.8, 0.85, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// Web Audio API Synthesized Sounds for Blackout Interactions
const playPowerDownSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Helper for a single high-voltage cracking spark pop
    const triggerSpark = (time: number, duration: number, pitch: number, volume: number) => {
      // 1. Frying noise burst
      const sampleRate = ctx.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(pitch, time);
      filter.Q.setValueAtTime(6.0, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.01);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(time);
      noise.stop(time + duration);

      // 2. High frequency electrical snap impulse
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch * 1.4, time);
      osc.frequency.exponentialRampToValueAtTime(60, time + duration);
      oscGain.gain.setValueAtTime(volume * 0.4, time);
      oscGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + duration);
    };

    // Erratic short-circuit arcing snaps over 0.75 seconds
    triggerSpark(now, 0.08, 1600, 0.28);
    triggerSpark(now + 0.1, 0.04, 2600, 0.32);
    triggerSpark(now + 0.22, 0.12, 1100, 0.22);
    triggerSpark(now + 0.34, 0.05, 3000, 0.35);
    triggerSpark(now + 0.44, 0.14, 1400, 0.26);
    triggerSpark(now + 0.58, 0.07, 2000, 0.33);

    // --- ELECTRIC MAINS HUM (Unstable buzzing short-circuiting wire) ---
    const humOsc = ctx.createOscillator();
    const humGain = ctx.createGain();

    humOsc.type = 'sawtooth';
    humOsc.frequency.setValueAtTime(60, now); // 60Hz standard electrical hum

    const humFilter = ctx.createBiquadFilter();
    humFilter.type = 'peaking';
    humFilter.frequency.setValueAtTime(180, now); // Peak harmonics for buzzing sound
    humFilter.Q.setValueAtTime(4.0, now);
    humFilter.gain.setValueAtTime(14, now);

    // Volume rapidly flickers / stutters (Instability of electric arc)
    humGain.gain.setValueAtTime(0.32, now);
    humGain.gain.linearRampToValueAtTime(0.02, now + 0.07);
    humGain.gain.linearRampToValueAtTime(0.38, now + 0.14);
    humGain.gain.linearRampToValueAtTime(0.04, now + 0.21);
    humGain.gain.linearRampToValueAtTime(0.3, now + 0.34);
    humGain.gain.linearRampToValueAtTime(0.01, now + 0.43);
    humGain.gain.linearRampToValueAtTime(0.35, now + 0.55);
    humGain.gain.linearRampToValueAtTime(0.05, now + 0.65);
    humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    humOsc.connect(humFilter);
    humFilter.connect(humGain);
    humGain.connect(ctx.destination);
    humOsc.start(now);
    humOsc.stop(now + 0.85);

    // --- FINAL FUSE BLOW "POP!" (Extreme energy blackout) ---
    const blowTime = now + 0.68;
    triggerSpark(blowTime, 0.25, 800, 0.5); // Loud pop

    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(320, blowTime);
    snapOsc.frequency.exponentialRampToValueAtTime(25, blowTime + 0.08);

    snapGain.gain.setValueAtTime(0.45, blowTime);
    snapGain.gain.exponentialRampToValueAtTime(0.001, blowTime + 0.08);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start(blowTime);
    snapOsc.stop(blowTime + 0.09);

  } catch (e) {
    console.warn('AudioContext is blocked or not supported:', e);
  }
};

const playPowerUpSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Helper for electrical snapping contactors
    const triggerSnap = (time: number, pitch: number, volume: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, time);
      osc.frequency.exponentialRampToValueAtTime(50, time + 0.07);

      gain.gain.setValueAtTime(volume, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.08);
    };

    // Snap-snap-snap! Grid relays connecting
    triggerSnap(now, 380, 0.24);
    triggerSnap(now + 0.07, 580, 0.2);
    triggerSnap(now + 0.16, 850, 0.32); // Energized arc snap!

    // Electric surge buzz flowing in
    const surgeOsc = ctx.createOscillator();
    const surgeGain = ctx.createGain();
    surgeOsc.type = 'sawtooth';
    surgeOsc.frequency.setValueAtTime(50, now + 0.16);
    surgeOsc.frequency.exponentialRampToValueAtTime(110, now + 0.45);

    surgeGain.gain.setValueAtTime(0.001, now + 0.16);
    surgeGain.gain.exponentialRampToValueAtTime(0.2, now + 0.32);
    surgeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now + 0.16);

    surgeOsc.connect(filter);
    filter.connect(surgeGain);
    surgeGain.connect(ctx.destination);

    surgeOsc.start(now + 0.16);
    surgeOsc.stop(now + 0.9);

  } catch (e) {
    console.warn('AudioContext is blocked or not supported:', e);
  }
};

export default function ConstructionZone() {
  const [isBlackout, setIsBlackout] = useState(false);

  const handleToggleBlackout = () => {
    const nextState = !isBlackout;
    setIsBlackout(nextState);
    if (nextState) {
      playPowerDownSound();
    } else {
      playPowerUpSound();
    }
  };

  return (
    <section
      onClick={handleToggleBlackout}
      className={`relative w-full py-24 md:py-48 overflow-hidden flex flex-col items-center justify-center min-h-[500px] md:min-h-[700px] cursor-pointer select-none transition-all duration-700 ease-in-out ${isBlackout
          ? 'bg-[#000000] border-y-8 border-red-950/60 shadow-[inset_0_0_100px_rgba(0,0,0,1)]'
          : 'bg-[#030303] border-y-8 border-yellow-500'
        }`}
    >

      {/* Emergency flashing red light overlay */}
      {isBlackout && (
        <motion.div
          className="absolute inset-0 bg-red-950/15 pointer-events-none z-10 mix-blend-color-burn"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Animated Caution Tape Top */}
      <motion.div
        className="absolute top-0 left-0 w-[200%] h-4 opacity-[0.3] z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #eab308, #eab308 30px, #000 30px, #000 60px)',
        }}
        animate={{ x: isBlackout ? '0%' : ['0%', '-50%'] }}
        transition={{ duration: 10, repeat: isBlackout ? 0 : Infinity, ease: 'linear' }}
      />

      {/* Animated Caution Tape Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-4 opacity-[0.3] z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #eab308, #eab308 30px, #000 30px, #000 60px)',
        }}
        animate={{ x: isBlackout ? '0%' : ['-50%', '0%'] }}
        transition={{ duration: 10, repeat: isBlackout ? 0 : Infinity, ease: 'linear' }}
      />

      {/* Giant Background Gears - Interlocking */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20 scale-50 md:scale-100">
        <motion.div
          className="absolute text-neutral-800 transition-colors duration-1000"
          style={{ x: -250, y: -100 }}
          animate={{ rotate: isBlackout ? 0 : 360, color: isBlackout ? '#1c1917' : '#262626' }}
          transition={{ duration: isBlackout ? 8 : 40, repeat: isBlackout ? 0 : Infinity, ease: isBlackout ? "easeOut" : "linear" }}
        >
          <Settings size={600} strokeWidth={0.5} />
        </motion.div>

        <motion.div
          className="absolute text-neutral-800 transition-colors duration-1000"
          style={{ x: 250, y: 150 }}
          animate={{ rotate: isBlackout ? 0 : -360, color: isBlackout ? '#1c1917' : '#262626' }}
          transition={{ duration: isBlackout ? 8 : 40, repeat: isBlackout ? 0 : Infinity, ease: isBlackout ? "easeOut" : "linear" }}
        >
          <Settings size={600} strokeWidth={0.5} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="mb-6 relative min-h-[160px] md:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isBlackout ? (
              <motion.div
                key="active-text"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <FlickeringText className="drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                  <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter text-yellow-500 leading-none">
                    System
                    <br />
                    Under
                    <br />
                    Construction
                  </h2>
                </FlickeringText>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-6"
                >
                  <p className="font-body text-yellow-400/80 text-xs md:text-sm max-w-md mx-auto uppercase tracking-[0.4em] border border-yellow-500/30 py-3 px-8 rounded-sm bg-yellow-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                    Warning // Heavy Machinery
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="blackout-text"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: [0, 0.3, 0.1, 0.6, 0.2, 0.8, 0.4, 0.7],
                  scale: 1
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
                className="text-center"
              >
                <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter text-red-950/60 leading-none select-none drop-shadow-[0_0_15px_rgba(220,38,38,0.05)]">
                  SYSTEM
                  <br />
                  OFFLINE
                </h2>
                <p className="font-body text-red-900/40 text-[9px] md:text-xs uppercase tracking-[0.3em] mt-6 animate-pulse">
                  ⚠️ EMERGENCY BACKUP ACTIVE ⚠️
                  <br />
                  <span className="opacity-60 text-[8px] md:text-[10px]">[ CLICK ANYWHERE TO REBOOT POWER ]</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Welding Torches */}
      <WeldingTorch className="bottom-8 md:bottom-16 left-1/2 -translate-x-1/2" angleOffset={0} isBlackout={isBlackout} />
      <WeldingTorch className="top-10 left-5 md:left-10" angleOffset={135} isBlackout={isBlackout} />
      <WeldingTorch className="top-20 right-5 md:right-10" angleOffset={-135} isBlackout={isBlackout} />

      {/* Desktop only torches to save mobile performance */}
      <div className="hidden md:block">
        <WeldingTorch className="bottom-32 left-32" angleOffset={45} isBlackout={isBlackout} />
        <WeldingTorch className="bottom-24 right-24" angleOffset={-45} isBlackout={isBlackout} />

        {/* Additional sparks in the background to add depth */}
        <WeldingTorch className="top-1/2 left-10 opacity-30 blur-[2px] scale-75" angleOffset={90} isBlackout={isBlackout} />
        <WeldingTorch className="top-1/3 right-10 opacity-30 blur-[2px] scale-75" angleOffset={-90} isBlackout={isBlackout} />
      </div>

    </section>
  );
}
