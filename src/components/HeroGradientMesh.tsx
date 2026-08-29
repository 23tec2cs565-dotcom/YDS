// src/components/HeroGradientMesh.tsx
// Cinematic Designer Mood Board Slideshow Hero (High-Res)
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const HeroGradientMesh: React.FC<{ className?: string }> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-Resolution 2.5K Unsplash Photography (optimizes automatically, retina-ready)
  const images = [
    "/assets/HGM/HGM-1.avif", // PCP Sikar (Interior Design)
    "/assets/HGM/HGM-2.avif", // Bright School (Construction)
    "/assets/HGM/HGM-3.avif", // JK LON Hospital (Renovation)
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // rotates every 6s
    return () => clearInterval(timer);
  }, [images.length]);
  
  // Scroll Parallax (slight movement of background image on vertical scroll)
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 0.8], ["0%", "10%"]);
  
  // Mouse Tilt Parallax (3D rotation of background image matching cursor coords)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  
  // Spring settings for super smooth lag-free movement
  const mouseX = useSpring(rawMouseX, { stiffness: 45, damping: 20 });
  const mouseY = useSpring(rawMouseY, { stiffness: 45, damping: 20 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]); 
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);   
  
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rawMouseX.set(x);
    rawMouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };
  
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`absolute inset-0 overflow-hidden bg-[#070b13] ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Background Images Crossfading Slideshow */}
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <motion.div
            key={src}
            className="absolute inset-[-5%] bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url("${src}")`,
              y: backgroundY,
              rotateX,
              rotateY,
              zIndex: isActive ? 2 : 1,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isActive ? 0.65 : 0,
              scale: isActive ? 1.02 : 1.1,
            }}
            transition={{
              opacity: { duration: 1.6, ease: "easeInOut" },
              scale: { duration: 6, ease: [0.16, 1, 0.3, 1] }
            }}
          />
        );
      })}
      
      {/* Subtle blueprint compass circle drawing overlay */}
      <div className="absolute right-12 bottom-12 opacity-15 text-[#E6B566] hidden md:block pointer-events-none z-10">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" />
        </svg>
      </div>
      
      {/* Fine architectural coordinate line markings */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-20 text-[#E6B566] text-[9px] font-mono tracking-widest hidden md:flex pointer-events-none z-10">
        <span>SHEET: A-02</span>
        <span>SCALE: 1:20</span>
        <div className="w-12 h-px bg-[#E6B566]" />
      </div>
      
      {/* Ambient lighting / shading gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/25 to-black/40 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/75 via-transparent to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default HeroGradientMesh;
