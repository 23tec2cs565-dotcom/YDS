import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Sparkles, MoveHorizontal, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MotionDiv = motion.div as unknown as React.ComponentType<any>;

export interface ComparisonItem {
  id: string;
  projectSlug?: string;
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
    projectSlug: "foyer",
    title: "Entrance Foyer Renovation",
    category: "Turnkey Renovation",
    location: "New Light Colony, Tonk Road, Jaipur",
    beforeImage: "/assets/Projects/Foyer/2.webp",
    afterImage: "/assets/Projects/Foyer/1.webp",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER EXECUTION",
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
    projectSlug: "goyal-renovation",
    title: "Mr. Goyal's Residential Renovation",
    category: "Complete Overhaul",
    location: "Govindgarh, Jaipur",
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
    projectSlug: "chhoti-bai-jewellers",
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
      {/* Main Grid: Comparison Viewport on Left, Vertical Thumbnails + Description on Right */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Interactive Comparison Viewport */}
        <div className="lg:col-span-7 w-full">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onTouchMove={handleTouchMove}
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize bg-[#0B1220] border-4 border-white"
          >
            {/* Animated Transition for Project Images */}
            <AnimatePresence mode="wait">
              <MotionDiv
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {/* After Image (Background Layer) */}
                <img
                  decoding="async"
                  src={activeItem.afterImage}
                  alt={`${activeItem.title} - After Execution`}
                  title={`${activeItem.title} - After Execution by Younick Design Studio`}
                  width="1200"
                  height="750"
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
                    decoding="async"
                    src={activeItem.beforeImage}
                    alt={`${activeItem.title} - Before Renovation`}
                    title={`${activeItem.title} - Before Renovation State`}
                    width="1200"
                    height="750"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    loading="eager"
                  />
                </div>
              </MotionDiv>
            </AnimatePresence>

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
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0B1220] border-2 border-[#E6B566] text-[#E6B566] shadow-2xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <MoveHorizontal size={17} className="text-[#E6B566]" />
              </div>
            </div>

            {/* Drag Hint at Bottom */}
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/70 text-[9px] sm:text-[10px] tracking-wider uppercase flex items-center gap-1.5 border border-white/10">
                <MoveHorizontal size={11} />
                <span>Drag to Compare</span>
              </div>
            </div>
          </div>

          {/* Sub-caption below slider */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 px-1 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6B566]" />
              {activeItem.location}
            </span>
            <span className="hidden sm:inline text-gray-400 text-[11px]">
              Drag center slider to reveal transformation
            </span>
          </div>
        </div>

        {/* Right: Horizontal Image Filmstrip Carousel + Clicked Project Description */}
        <div className="lg:col-span-5 w-full flex flex-col space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 px-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#0B1220]">
                Select Project to Compare
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#8C6226] font-semibold">
              {activeTab + 1} of {items.length}
            </span>
          </div>

          {/* Horizontal Image Carousel Strip (compact filmstrip matching the reference) */}
          <div className="w-full">
            <div className="inline-flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl  border border-white/10 shadow-lg">
              {items.map((item, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (activeTab !== idx) {
                        setActiveTab(idx);
                        setSliderPosition(50);
                      }
                    }}
                    className={`relative w-20 sm:w-24 md:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer block shrink-0 ${
                      isActive
                        ? "border-[#E6B566] shadow-[0_0_12px_rgba(230,181,102,0.55)] opacity-100 scale-[1.03] z-10 ring-1 ring-[#E6B566]/40"
                        : "border-transparent opacity-40 hover:opacity-85 hover:border-white/20"
                    }`}
                    title={item.title}
                  >
                    <img
                      src={item.afterImage}
                      alt={item.title}
                      className="w-full h-full object-cover pointer-events-none"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description & Details for the Specific Clicked Project */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={activeItem.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="p-4 sm:p-5 rounded-2xl bg-gray-50/95 border border-gray-200/90 space-y-3 shadow-xs"
              >
                <div>
                  <h4 className="text-base sm:text-lg font-serif font-semibold text-[#0B1220] leading-tight">
                    {activeItem.title}
                  </h4>
                  <p className="text-[10px] font-mono text-gray-500 mt-0.5">
                    {activeItem.location}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {activeItem.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0B1220]">
                    Highlights:
                  </p>
                  <div className="space-y-1">
                    {activeItem.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <CheckCircle2 size={13} className="text-[#8C6226] shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-2.5 border-t border-gray-200/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Turnkey
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E6B566]" />
                      On-Time
                    </span>
                  </div>

                  <Link
                    href={`/projects/${activeItem.projectSlug || activeItem.id}`}
                    className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0B1220] hover:bg-[#1A2538] text-white text-[10px] sm:text-xs font-mono uppercase tracking-wider font-semibold shadow-xs hover:shadow-md transition-all shrink-0"
                    title={`View ${activeItem.title} project`}
                  >
                    <span>View Project</span>
                    <ArrowRight size={12} className="text-[#E6B566] transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </MotionDiv>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
