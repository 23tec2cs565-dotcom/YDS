import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Sparkles, MoveHorizontal, ChevronRightCircleIcon, MapPin } from "lucide-react";
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
              <MapPin size={12} strokeWidth={2.5} className="text-[#8C6226] shrink-0" aria-hidden="true" />
              {activeItem.location}
            </span>
            <span className="hidden sm:inline text-gray-400 text-[11px]">
              Drag center slider to reveal transformation
            </span>
          </div>
        </div>

        {/* Right: Project Selector + Project Details */}
        <div className="lg:col-span-5 w-full flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-end justify-between border-b border-[#E6B566]/40 pb-3 px-1">
            <div>
              <p className="mb-1 text-[9px] font-mono font-bold uppercase tracking-[0.22em] text-[#A17A3A]">
                Project gallery
              </p>
              <h3 className="flex items-center gap-2 text-[13px] sm:text-[14px] font-mono font-bold uppercase tracking-wider text-[#0B1220]">
                Select to Compare
              </h3>
            </div>
            <span className="rounded-full border border-[#E6B566]/30 bg-[#F8F2E6] px-2.5 py-1 text-[10px] font-mono font-bold text-[#8C6226]">
              {String(activeTab + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>

          {/* Elegant Horizontal Filmstrip */}
          <div className="w-full overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              className="grid items-stretch gap-2 rounded-2xl border border-gray-200/80 bg-[#F8F8F6] p-2 shadow-[0_8px_28px_rgba(11,18,32,0.07)]"
              style={{ gridTemplateColumns: `repeat(${items.length}, minmax(96px, 1fr))` }}
              role="tablist"
              aria-label="Projects to compare"
            >
              {items.map((item, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      if (activeTab !== idx) {
                        setActiveTab(idx);
                        setSliderPosition(50);
                      }
                    }}
                    className={`group relative aspect-[16/10] min-w-[96px] overflow-hidden rounded-xl text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "ring-2 ring-[#D6A84F] ring-offset-2 ring-offset-[#F8F8F6] shadow-[0_8px_20px_rgba(166,126,58,0.22)]"
                        : "opacity-60 hover:opacity-100 hover:-translate-y-0.5"
                    }`}
                    title={item.title}
                  >
                    <img
                      src={item.afterImage}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] pointer-events-none"
                      loading="lazy"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-2 left-2 right-2 truncate text-[8px] font-mono font-bold uppercase tracking-[0.12em] text-white">
                      {item.category}
                    </span>
                    {isActive && (
                      <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white/60 bg-[#E6B566] shadow-[0_0_8px_rgba(230,181,102,0.9)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Project Details */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={activeItem.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl border border-gray-200/90 bg-[linear-gradient(145deg,#FFFFFF_0%,#FAFAF8_100%)] p-4 sm:p-5 shadow-[0_12px_35px_rgba(11,18,32,0.08)]"
              >
                <span className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#E6B566]/10" aria-hidden="true" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-1 text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-[#A17A3A]">
                      {activeItem.category}
                    </p>
                    <h4 className="text-base sm:text-lg font-serif font-semibold text-[#0B1220] leading-tight">
                      {activeItem.title}
                    </h4>
                  </div>
                  <span className="mt-0.5 shrink-0 font-serif text-3xl leading-none text-[#E6B566]/70">
                    {String(activeTab + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                  <MapPin size={11} className="text-[#A17A3A]" aria-hidden="true" />
                  {activeItem.location}
                </p>

                <p className="mt-3 text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  {activeItem.description}
                </p>

                {/* Highlights */}
                <div className="mt-3.5 border-t border-gray-200/80 pt-3">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#0B1220]">
                    Project highlights
                  </p>
                  <div className="grid gap-1.5">
                    {activeItem.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F3E8CE]">
                          <ChevronRightCircleIcon size={11} className="text-[#9A7031]" />
                        </span>
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <footer className="mt-3.5 flex items-center justify-between gap-3 border-t border-gray-200/80 pt-3">
                  <p
                    className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-gray-500"
                    aria-label="Turnkey project delivered on time"
                  >
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span>Turnkey <span className="text-gray-700">· On-Time</span></span>
                  </p>

                  <Link
                    href={`/projects/${activeItem.projectSlug || activeItem.id}`}
                    className="group inline-flex items-center gap-2 rounded-xl bg-[#0B1220] px-4 py-2 text-white text-[10px] sm:text-xs font-mono uppercase tracking-[0.12em] font-semibold shadow-[0_6px_18px_rgba(11,18,32,0.18)] hover:bg-[#1A2538] hover:shadow-[0_8px_22px_rgba(11,18,32,0.24)] transition-all shrink-0"
                    title={`View ${activeItem.title} project`}
                  >
                    <span>View Project</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </Link>
                </footer>
              </MotionDiv>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
