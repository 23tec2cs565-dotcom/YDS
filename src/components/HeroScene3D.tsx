// src/components/HeroScene3D.tsx
// Cinematic Luxury Interior Parallax Slideshow Hero (High-Res, Controlled)
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

interface HeroSceneProps {
  className?: string;
  activeIndex: number;
  customImages?: string[];
}

const HeroScene3D: React.FC<HeroSceneProps> = ({ className = "", activeIndex, customImages }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-Resolution 2.5K Unsplash Photography (optimizes automatically, retina-ready)
  const defaultImages = [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2560&q=85", // PCP Sikar (Interior Design)
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2560&q=85", // Bright School (Construction)
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2560&q=85", // JK LON Hospital (Renovation)
  ];

  const images = customImages && customImages.length > 0 ? customImages : defaultImages;
  
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
        const isActive = index === activeIndex;
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
      
      {/* Elegant minimalist blueprint grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(230,181,102,0.18) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(230,181,102,0.18) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      
      {/* Fine architectural coordinate line markings */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-20 text-[#E6B566] text-[9px] font-mono tracking-widest hidden md:flex pointer-events-none z-10">
        <span>LAT: 26.9124° N</span>
        <span>LNG: 75.7873° E</span>
        <div className="w-12 h-px bg-[#E6B566]" />
      </div>
      
      {/* Ambient lighting / shading gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/25 to-black/40 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/75 via-transparent to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default HeroScene3D;
