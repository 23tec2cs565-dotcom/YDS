// src/components/IntroScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "younick_intro_v1";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  const triggerExit = useCallback(() => {
    setPhase("exit");
    setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      onComplete();
    }, 500);
  }, [onComplete]);

  // Counter: 0 → 100 over ~2.0s with smooth ease-out
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 2000;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Brief crisp hold then exit
        setTimeout(triggerExit, 250);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [triggerExit]);

  // Line animation variant
  const lineVariant = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.25, 0, 0, 1] as [number, number, number, number], delay: 0.2 },
    },
  };

  const isExiting = phase === "exit";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0C1018]"
      // Cinematic shutter-up exit
      animate={{ y: isExiting ? "-100%" : "0%" }}
      transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Radial warm glow behind centre */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(230,181,102,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ──────────────── Centre Content ──────────────── */}
      <div className="relative z-10 flex flex-col items-center select-none">

        {/* Top gold rule */}
        <motion.div
          className="h-px w-52 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E6B566 40%, #E6B566 60%, transparent)",
          }}
          variants={lineVariant}
          initial="hidden"
          animate="visible"
        />

        {/* Logo */}
        <motion.img
          src="/younick-logo.PNG"
          alt="Younick Design Studio"
          width="56"
          height="56"
          className="mt-10 h-14 w-auto"
          style={{ filter: "brightness(1.8) saturate(0.6)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.75, ease: [0.25, 0, 0, 1] }}
        />

        {/* Studio wordmark */}
        <motion.div
          className="mt-5 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.65, ease: "easeOut" }}
        >
          <p className="font-serif text-[2.6rem] font-medium tracking-tight text-white leading-none">
            Younick
          </p>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.52em] text-[#E6B566]">
            Design Studio
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-9 text-[10px] uppercase tracking-[0.32em] text-white/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
        >
          Architecture&nbsp;&nbsp;·&nbsp;&nbsp;Interiors&nbsp;&nbsp;·&nbsp;&nbsp;Jaipur
        </motion.p>

        {/* Bottom gold rule */}
        <motion.div
          className="mt-9 h-px w-52 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E6B566 40%, #E6B566 60%, transparent)",
          }}
          variants={lineVariant}
          initial="hidden"
          animate="visible"
        />
      </div>

      {/* ──────────────── Counter (bottom-left) ──────────────── */}
      <motion.div
        className="absolute bottom-10 left-10 font-mono leading-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        aria-hidden
      >
        <span className="text-[4.5rem] font-thin text-white/10 tabular-nums">
          {String(count).padStart(2, "0")}
        </span>
      </motion.div>

      {/* ──────────────── Craft note (bottom-right) ──────────────── */}
      <motion.div
        className="absolute bottom-12 right-10 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        aria-hidden
      >
        <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">
          Est. 2018&nbsp;·&nbsp;Crafted with care
        </p>
      </motion.div>

      {/* ──────────────── Skip (top-right, subtle) ──────────────── */}
      <motion.button
        type="button"
        onClick={triggerExit}
        className="absolute top-8 right-8 text-[9px] uppercase tracking-[0.28em] text-white/20 transition-colors duration-300 hover:text-white/50 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        aria-label="Skip intro"
      >
        Skip
      </motion.button>

      {/* ──────────────── Progress bar (bottom edge) ──────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#E6B566]/40"
        style={{ width: `${count}%` }}
        aria-hidden
      />
    </motion.div>
  );
};

export default IntroScreen;
