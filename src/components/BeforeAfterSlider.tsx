import React, { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, MoveHorizontal, ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MotionDiv = motion.div as unknown as React.ComponentType<any>;

export interface ComparisonItem {
  id: string;
  title: string;
  category: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  description: string;
  highlights: string[];
}

export const COMPARISONS_DATA: ComparisonItem[] = [
  {
    id: "foyer",
    title: "Entrance Foyer Renovation",
    category: "Turnkey Renovation",
    location: "New Light Colony, Tonk Road, Jaipur",
    beforeImage: "/assets/Projects/Foyer/2.webp",
    afterImage: "/assets/Projects/Foyer/1.webp",
    beforeLabel: "RAW SITE / BEFORE",
    afterLabel: "YOUNICK EXECUTION / AFTER",
    description:
      "Complete metamorphosis of a bare, dark entryway into a welcoming architectural foyer with custom acoustic wall panelling, integrated mood cove lighting, and seamless floor transition.",
    highlights: [
      "Custom Fluted Woodwork & Panelling",
      "Concealed Ambient 3000K Warm Lighting",
      "Marble & Engineered Surface Integration",
    ],
  },
  {
    id: "goyal",
    title: "Mr. Goyal's Residential Renovation",
    category: "Complete Overhaul",
    location: "Jaipur, Rajasthan",
    beforeImage: "/assets/Projects/Mr. Goyal's renovation project/2.webp",
    afterImage: "/assets/Projects/Mr. Goyal's renovation project/1.webp",
    beforeLabel: "STRUCTURAL DEMOLITION",
    afterLabel: "FINAL LIVING INTERIOR",
    description:
      "Re-engineered spatial flow, structural wall modifications, and full-scale interior fit-out creating a clutter-free, luxurious modern living and entertaining space.",
    highlights: [
      "Structural Wall Modification & Civil Works",
      "Integrated Bespoke Storage Units",
      "Seamless False Ceiling & Lighting Grid",
    ],
  },
  {
    id: "chhoti-bai",
    title: "Chhoti Bai Jewellers Showroom",
    category: "Commercial Turnkey",
    location: "City Center, Sansar Chandra Road, Jaipur",
    beforeImage: "/assets/Projects/Chhoti bai jewellers/2.webp",
    afterImage: "/assets/Projects/Chhoti bai jewellers/1.webp",
    beforeLabel: "BARE RETAIL SHELL",
    afterLabel: "LUXURY SHOWROOM",
    description:
      "Turnkey material execution for a high-end jewellery boutique, incorporating high-security showcases, armored vitrines, and calibrated color-true illumination.",
    highlights: [
      "High-Security Display Vitrines",
      "Calibrated Diamond True-Color Lighting",
      "Turnkey Execution with Material within ₹14L",
    ],
  },
];

export const BeforeAfterSlider: React.FC<{ items?: ComparisonItem[] }> = ({
  items = COMPARISONS_DATA,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = items[activeTab] || items[0];

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    if (isDragging) {
      window.addEventListener("mouseup", handleGlobalMouseUp);
      window.addEventListener("mousemove", handleGlobalMouseMove);
    }
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging, handleMove]);

  return (
    <div className="w-full">
      {/* Tab Switchers */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(idx);
              setSliderPosition(50);
            }}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === idx
                ? "bg-[#0B1220] text-white shadow-xl scale-105 border border-[#E6B566]/30"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-[#0B1220] border border-gray-200"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeTab === idx ? "bg-[#E6B566]" : "bg-gray-300"}`} />
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Visual Comparison + Project Details */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Slider Viewport */}
        <div className="lg:col-span-8">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onTouchMove={handleTouchMove}
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize bg-[#0B1220] border-4 border-white"
          >
            {/* After Image (Background Layer) */}
            <img
              src={activeItem.afterImage}
              alt={`${activeItem.title} - After Execution`}
              title={`${activeItem.title} - After Execution by Younick Design Studio`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="eager"
            />

            {/* Before Image (Foreground Clipped Layer) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              <img
                src={activeItem.beforeImage}
                alt={`${activeItem.title} - Before Renovation`}
                title={`${activeItem.title} - Before Renovation State`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                loading="eager"
              />
            </div>

            {/* Badge: BEFORE */}
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 pointer-events-none">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-bold tracking-widest uppercase bg-black/70 backdrop-blur-md text-white/90 border border-white/20 shadow-lg whitespace-nowrap">
                <span className="sm:hidden">BEFORE</span>
                <span className="hidden sm:inline">{activeItem.beforeLabel || "BEFORE / RAW"}</span>
              </span>
            </div>

            {/* Badge: AFTER */}
            <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 pointer-events-none">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-bold tracking-widest uppercase bg-[#0B1220]/80 backdrop-blur-md text-[#E6B566] border border-[#E6B566]/40 shadow-lg flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                <Sparkles size={11} className="text-[#E6B566] shrink-0" />
                <span className="sm:hidden">AFTER</span>
                <span className="hidden sm:inline">{activeItem.afterLabel || "AFTER / YOUNICK"}</span>
              </span>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Vertical Glowing Line */}
              <div className="absolute top-0 bottom-0 -left-[1.5px] w-[3px] bg-gradient-to-b from-[#E6B566]/60 via-white to-[#E6B566]/60 shadow-[0_0_12px_rgba(230,181,102,0.8)]" />

              {/* Center Circular Grab Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0B1220] border-2 border-[#E6B566] text-[#E6B566] shadow-2xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <MoveHorizontal size={18} className="text-[#E6B566]" />
              </div>
            </div>

            {/* Drag Hint at Bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-4 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/70 text-[10px] sm:text-xs tracking-wider uppercase flex items-center gap-2 border border-white/10">
                <MoveHorizontal size={12} />
                <span>Drag to Compare</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Context & Transformation Highlights */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            <MotionDiv
              key={activeItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6B566]/10 text-[#8C6226] text-xs font-bold uppercase tracking-wider mb-3">
                  <Layers size={13} />
                  {activeItem.category}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#0B1220] leading-tight">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-mono tracking-wide">
                  {activeItem.location}
                </p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {activeItem.description}
              </p>

              {/* Execution Points */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0B1220]">
                  Transformation Key Points:
                </p>
                <div className="space-y-2">
                  {activeItem.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 size={15} className="text-[#8C6226] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Turnkey Handover
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6B566]" />
                    On-Time Delivery
                  </span>
                </div>
              </div>
            </MotionDiv>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
