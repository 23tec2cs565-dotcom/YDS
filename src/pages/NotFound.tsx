import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Home, 
  Lightbulb, 
  Calculator, 
  Building2, 
  Layers, 
  MessageCircle,
  FolderOpen
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { projects } from "../data/projects";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.onerror = null;
    img.src = "/assets/optimized/hero-480.webp";
    img.alt = "Younick studio fallback image";
  }
}

const QUICK_PILLS = [
  {
    icon: Building2,
    title: "Luxury Residences",
    subtitle: "Turnkey Villas & Homes",
    path: "/projects",
    tag: "Portfolio"
  },
  {
    icon: Layers,
    title: "Commercial Fit-Outs",
    subtitle: "Showrooms & Studios",
    path: "/projects",
    tag: "Turnkey"
  },
  {
    icon: Calculator,
    title: "Cost Estimator",
    subtitle: "Instant Pricing Tool",
    path: "/services",
    tag: "Estimate"
  },
  {
    icon: MessageCircle,
    title: "Direct Consultation",
    subtitle: "+91 88548 83058",
    path: "/contact",
    tag: "Jaipur"
  },
];

const NotFound: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Resize handler & mobile check
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 1,
          height: containerRef.current.clientHeight || 1,
        });
      }
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleResize, 150);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const updateCoords = (clientX: number, clientY: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsHovering(true);
    if (e.touches.length > 0) {
      updateCoords(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateCoords(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Parallax tilt angles for 3D depth
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const tiltX = ((mousePos.y - centerY) / (centerY || 1)) * -8;
  const tiltY = ((mousePos.x - centerX) / (centerX || 1)) * 8;

  // Node placements: shifts comfortably below the top status bar
  const nodes = [
    {
      id: "projects",
      x: isMobile ? 14 : 12,
      y: isMobile ? 42 : 46,
      title: "Curated Showcase",
      subtitle: `${projects.length}+ Built Spaces`,
      path: "/projects",
    },
    {
      id: "services",
      x: isMobile ? 86 : 88,
      y: isMobile ? 42 : 46,
      title: "Bespoke Services",
      subtitle: "Turnkey Architecture & Interior",
      path: "/services",
    },
    {
      id: "contact",
      x: isMobile ? 22 : 18,
      y: isMobile ? 82 : 80,
      title: "Start a Conversation",
      subtitle: "Meet Principle Designers",
      path: "/contact",
    },
  ];

  const calculateDistance = (nodeXPercent: number, nodeYPercent: number) => {
    const nodeX = (nodeXPercent / 100) * dimensions.width;
    const nodeY = (nodeYPercent / 100) * dimensions.height;
    const dx = mousePos.x - nodeX;
    const dy = mousePos.y - nodeY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // CSS mask for the spotlight reveal (Complete dark when lights are OFF and not hovering)
  const spotlightRadius = isMobile ? 150 : 230;
  const maskStyle: React.CSSProperties = lightsOn
    ? {}
    : {
        WebkitMaskImage: isHovering
          ? `radial-gradient(circle ${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)`
          : `radial-gradient(circle 0px at 0px 0px, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)`,
        maskImage: isHovering
          ? `radial-gradient(circle ${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)`
          : `radial-gradient(circle 0px at 0px 0px, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)`,
      };

  const seoForPage = {
    title: "404 — Page Not Found | Younick Design Studio",
    description: "The page you are looking for may have been moved, redesigned, or no longer exists.",
    url: "/404",
    image: "/assets/404/luxury-sofa.png",
  };

  return (
    <>
      <SEOHead seo={seoForPage} type="website" noIndex={true} />

      <div
        ref={containerRef}
        onMouseMove={(e) => {
          setIsHovering(true);
          updateCoords(e.clientX, e.clientY);
        }}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="relative min-h-screen w-full bg-[#08090A] text-white overflow-hidden font-sans select-none pt-24 sm:pt-28 md:pt-32 pb-10 flex flex-col justify-between"
      >
        {/* Ambient background glows (Permanent) */}
        <div className="absolute left-[-10rem] top-[-10rem] h-[40rem] w-[40rem] rounded-full bg-[#B08D57]/[0.05] blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[-12rem] right-[-12rem] h-[40rem] w-[40rem] rounded-full bg-[#E6B566]/[0.04] blur-[160px] pointer-events-none" />

        {/* Dynamic Warm Studio Light Overhead Glow (when lightsOn is true) */}
        <div 
          className={`absolute inset-x-0 top-0 h-[650px] bg-gradient-to-b from-[#E6B566]/[0.14] via-[#B08D57]/[0.04] to-transparent pointer-events-none transition-opacity duration-700 ${
            lightsOn ? "opacity-100" : "opacity-0"
          }`} 
        />

        {/* ──────── TOP STATUS BAR (Below Navbar) ──────── */}
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 pt-2 pb-4 flex flex-wrap items-center justify-between gap-4 z-50 relative pointer-events-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightsOn((prev) => !prev);
              }}
              aria-label="Toggle Studio Lights"
              className={`group flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg transition-all duration-300 cursor-pointer ${
                lightsOn
                  ? "bg-[#E6B566]/20 border-[#E6B566]/60 text-[#E6B566] shadow-[#E6B566]/20"
                  : "bg-white/[0.04] border-white/15 text-white/70 hover:text-white hover:border-[#E6B566]/40 hover:bg-white/[0.08]"
              }`}
            >
              <Lightbulb 
                size={14} 
                className={lightsOn ? "fill-[#E6B566] text-[#E6B566] drop-shadow-[0_0_8px_#E6B566]" : "text-white/50 group-hover:text-[#E6B566] transition-colors"} 
              />
              <span className="font-semibold">{lightsOn ? "Lights: ON" : "Lights: OFF"}</span>

              {/* Physical sliding toggle knob */}
              <div 
                className={`w-7 h-3.5 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
                  lightsOn ? "bg-[#E6B566]" : "bg-white/20"
                }`}
              >
                <div 
                  className={`w-2.5 h-2.5 rounded-full shadow-md transition-transform duration-300 ${
                    lightsOn ? "translate-x-3.5 bg-[#08090A]" : "translate-x-0 bg-white"
                  }`} 
                />
              </div>
            </button>

            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest hidden lg:inline select-none">
              {lightsOn ? "Studio illuminated • Click to switch off" : "Move cursor to sweep the radial spotlight"}
            </span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#E6B566]/20 bg-[#E6B566]/5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#E6B566] backdrop-blur-md shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6B566] animate-ping" />
            Jaipur, RJ • 404 Unmapped Space
          </div>
        </div>

        {/* ──────── CENTRAL 404 HERO SECTION ──────── */}
        <div className="relative flex-1 w-full flex items-center justify-center min-h-[460px] sm:min-h-[500px] py-4">
          {/* ──────── BACKGROUND CANVAS (Floorplan, 404, Floating Sofa, Glows) ──────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Dimmed blueprint grid */}
            <div
              className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            <img
              src="/assets/404/floorplan-overlay.png"
              alt=""
              aria-hidden="true"
              onError={handleImgError}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.02] invert blur-[2px]"
            />

            {/* Spotlight revealed blueprint layer */}
            <div style={maskStyle} className="absolute inset-0">
              <div
                className="absolute inset-0 opacity-[0.06] mix-blend-screen"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(230,181,102,0.14) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(230,181,102,0.14) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
              <img
                src="/assets/404/floorplan-overlay.png"
                alt=""
                aria-hidden="true"
                onError={handleImgError}
                className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.05] invert mix-blend-screen blur-[0.5px]"
              />
              <img
                src="/assets/404/blueprint-collage.png"
                alt=""
                aria-hidden="true"
                onError={handleImgError}
                className="absolute left-1/2 top-[15%] w-[48rem] -translate-x-1/2 opacity-[0.06] invert mix-blend-screen blur-[1px]"
              />
            </div>

            {/* Large glowing 404 background text */}
            <div className="pointer-events-none absolute left-1/2 top-[32%] sm:top-[30%] -translate-x-1/2 -translate-y-1/2 select-none text-[120px] sm:text-[180px] md:text-[230px] lg:text-[280px] font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#E6B566]/[0.18] via-[#B08D57]/[0.05] to-transparent z-0">
              404
            </div>
          </div>

          {/* ──────── FOREGROUND CONTENT (Sofa + Copy + CTAs) ──────── */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-3xl mx-auto">
            {/* Floating Luxury Sofa with 3D Parallax Tilt */}
            <div 
              className="relative z-10 mb-4 sm:mb-5 animate-sofaFloat"
              style={{
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* Volumetric glow orbs behind the sofa */}
              <div className="absolute left-1/2 top-[48%] h-[16rem] w-[16rem] sm:h-[18rem] sm:w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B08D57]/15 blur-[80px] animate-pulse pointer-events-none" />
              <div className="absolute left-1/2 top-[48%] h-[10rem] w-[10rem] sm:h-[12rem] sm:w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E6B566]/15 blur-[50px] pointer-events-none" />

              {/* Thin golden elevation halo rings */}
              <div className="absolute left-1/2 top-[46%] h-[18rem] w-[18rem] sm:h-[20rem] sm:w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E6C890]/20 opacity-80 animate-slowRotate pointer-events-none" />
              <div className="absolute left-1/2 top-[46%] h-[14rem] w-[14rem] sm:h-[16rem] sm:w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B08D57]/15 border-dashed opacity-60 animate-reverseRotate pointer-events-none" />

              {/* Sofa ground shadow */}
              <div className="absolute bottom-[1.2rem] left-1/2 h-[1.8rem] w-[70%] -translate-x-1/2 rounded-full bg-black/60 blur-[20px] pointer-events-none" />
              <div className="absolute bottom-[1.4rem] left-1/2 h-[1rem] w-[50%] -translate-x-1/2 rounded-full bg-[#B08D57]/30 blur-[14px] pointer-events-none" />

              {/* Sofa image */}
              <img
                src="/assets/404/luxury-sofa.png"
                alt="Luxury Italian Leather Sofa by Younick Design Studio"
                title="Page Not Found — Younick Design Studio Luxury Interior"
                onError={handleImgError}
                className="relative z-10 mx-auto w-[180px] sm:w-[220px] md:w-[260px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105"
                loading="eager"
              />
            </div>

            {/* Editorial Headline & Narrative */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              This space is <span className="italic text-[#E6B566] font-normal">undefined</span>.
            </h1>
            <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-gray-300 font-light">
              Every great space starts with an empty canvas. Explore our portfolio of luxury residences, or collaborate with our architects on your vision.
            </p>

            {/* ──────── SINGLE CLEAN BUTTON ROW (Zero Overlap / Congestion) ──────── */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative z-30">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E6B566] to-[#B08D57] text-[#08090A] px-6 sm:px-7 py-3 text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#E6B566]/20 hover:shadow-[#E6B566]/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Portfolio</span>
                <ArrowRight size={13} />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white hover:text-[#F9D2BA] hover:border-[#F9D2BA]/50 bg-white/[0.04] hover:bg-white/[0.08] px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-widest backdrop-blur-xl transition-all duration-300 shadow-md cursor-pointer"
              >
                <Calculator size={13} className="text-[#F9D2BA]" />
                <span>Cost Estimator</span>
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.06] px-5 py-3 text-xs font-semibold uppercase tracking-widest backdrop-blur-xl transition-all duration-300 cursor-pointer"
              >
                <Home size={13} />
                <span>Return Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ──────── BOTTOM CURATED DESTINATIONS (Lucrative Quick-Access) ──────── */}
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 pt-4 z-40 relative">
          <div className="text-center mb-3">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
              Popular Studio Destinations
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {QUICK_PILLS.map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <Link
                  key={idx}
                  to={pill.path}
                  className="group relative p-3 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-[#E6B566]/40 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#E6B566]/10 border border-[#E6B566]/20 flex items-center justify-center text-[#E6B566] group-hover:scale-110 transition-transform">
                      <Icon size={14} />
                    </div>
                    <span className="text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-gray-400 group-hover:text-[#E6B566] transition-colors">
                      {pill.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#E6B566] transition-colors flex items-center justify-between">
                      <span>{pill.title}</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E6B566]" />
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{pill.subtitle}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ──────── LAYER 3: DYNAMIC DRAFTING CROSSHAIRS & MEASUREMENTS ──────── */}
        {!lightsOn && isHovering && (
          <>
            {/* Horizontal blueprint crosshair line */}
            <div
              className="pointer-events-none absolute left-0 right-0 h-[0.5px] bg-[#E6B566]/25 z-30"
              style={{ top: mousePos.y }}
            />
            {/* Vertical blueprint crosshair line */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 w-[0.5px] bg-[#E6B566]/25 z-30"
              style={{ left: mousePos.x }}
            />
            {/* Digital coordinate label near cursor */}
            <div
              className="pointer-events-none absolute z-40 bg-black/90 border border-[#E6B566]/40 px-3 py-1.5 rounded-lg text-[9px] font-mono text-[#E6B566] backdrop-blur-md shadow-2xl flex flex-col gap-0.5"
              style={{
                left: mousePos.x + 16,
                top: mousePos.y + 16,
              }}
            >
              <div>DRAFT_X: {((mousePos.x / (dimensions.width || 1)) * 12).toFixed(2)}m</div>
              <div>DRAFT_Y: {(((dimensions.height - mousePos.y) / (dimensions.height || 1)) * 7).toFixed(2)}m</div>
              <div className="text-[7px] text-gray-400 uppercase tracking-widest mt-0.5">Spotlight Active</div>
            </div>
          </>
        )}

        {/* ──────── LAYER 4: HIDDEN INTERACTIVE DESIGN NODES ──────── */}
        {nodes.map((node) => {
          const isRevealed = lightsOn || (isHovering && calculateDistance(node.x, node.y) < spotlightRadius * 1.15);

          return (
            <div
              key={node.id}
              className="absolute z-40 transition-all duration-700 ease-out"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: isRevealed ? 1 : 0,
                pointerEvents: isRevealed ? "auto" : "none",
              }}
            >
              <Link
                to={node.path}
                className="group relative flex flex-col items-center text-center cursor-pointer"
              >
                {/* Pulsing ring indicator */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full border border-[#E6B566] opacity-30 group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute w-8 h-8 rounded-full border border-dashed border-[#B08D57]/40 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute w-3 h-3 rounded-full bg-[#E6B566] group-hover:scale-110 transition-transform shadow-[0_0_12px_#E6B566]" />
                  {/* Radar ping */}
                  {isRevealed && (
                    <div className="absolute inset-[-8px] rounded-full border border-[#E6B566]/40 animate-ping" style={{ animationDuration: "2.5s" }} />
                  )}
                </div>

                {/* Text Details (slide-up transition) */}
                <div className="mt-3 bg-black/90 border border-[#E6B566]/30 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-1 group-hover:-translate-y-0.5 group-hover:border-[#E6B566]/60 min-w-[180px] z-50">
                  <span className="text-[8px] font-mono tracking-[0.2em] text-[#E6B566] uppercase">Design Node</span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">{node.title}</h3>
                  <p className="text-[10px] text-gray-400 mt-1 leading-snug">{node.subtitle}</p>
                  <div className="mt-2 text-[9px] font-bold text-[#E6B566] inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight size={10} />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}

        {/* Custom animations */}
        <style>
          {`
            @keyframes sofaFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            .animate-sofaFloat {
              animation: sofaFloat 8s ease-in-out infinite;
            }

            @keyframes slowRotate {
              0% { transform: translate(-50%, -50%) rotate(0deg); }
              100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
            .animate-slowRotate {
              animation: slowRotate 24s linear infinite;
            }

            @keyframes reverseRotate {
              0% { transform: translate(-50%, -50%) rotate(360deg); }
              100% { transform: translate(-50%, -50%) rotate(0deg); }
            }
            .animate-reverseRotate {
              animation: reverseRotate 20s linear infinite;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default NotFound;