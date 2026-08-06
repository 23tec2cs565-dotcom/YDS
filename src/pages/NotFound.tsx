import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Lightbulb, Compass } from "lucide-react";
import SEOHead from "../components/SEOHead";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.onerror = null;
    img.src = "/assets/optimized/hero-480.webp";
    img.alt = "Younick studio fallback image";
  }
}

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

  // Node placements: adjusts relative positions depending on mobile vs desktop
  const nodes = [
    {
      id: "projects",
      x: isMobile ? 20 : 22,
      y: isMobile ? 32 : 46,
      title: "Design Showcase",
      subtitle: "Explore our luxury spaces",
      path: "/projects",
    },
    {
      id: "services",
      x: isMobile ? 80 : 78,
      y: isMobile ? 32 : 38,
      title: "Bespoke Services",
      subtitle: "Tailored interior solutions",
      path: "/services",
    },
    {
      id: "contact",
      x: 50,
      y: isMobile ? 84 : 78,
      title: "Start a Project",
      subtitle: "Collaborate with our studio",
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

  // CSS mask for the spotlight reveal
  const spotlightRadius = isMobile ? 140 : 200;
  const maskStyle: React.CSSProperties = lightsOn
    ? {}
    : {
        WebkitMaskImage: isHovering
          ? `radial-gradient(circle ${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)`
          : `radial-gradient(circle ${spotlightRadius * 1.3}px at 50% 46%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)`,
        maskImage: isHovering
          ? `radial-gradient(circle ${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)`
          : `radial-gradient(circle ${spotlightRadius * 1.3}px at 50% 46%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)`,
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
        className="relative min-h-screen w-full bg-[#09090A] text-white overflow-hidden font-sans select-none"
      >
        {/* Ambient background glows (Permanent) */}
        <div className="absolute left-[-10rem] top-[-10rem] h-[35rem] w-[35rem] rounded-full bg-[#B08D57]/[0.04] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-12rem] right-[-12rem] h-[35rem] w-[35rem] rounded-full bg-[#E6B566]/[0.03] blur-[150px] pointer-events-none" />

        {/* 💡 Light Switch Toggle */}
        <div className="absolute top-24 left-6 md:left-10 z-50 flex items-center gap-3">
          <button
            onClick={() => setLightsOn(!lightsOn)}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg transition-all duration-500 cursor-pointer ${
              lightsOn
                ? "bg-[#E6B566]/15 border-[#E6B566]/40 text-[#E6B566] shadow-[#E6B566]/10 animate-pulse"
                : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:border-white/20"
            }`}
          >
            <Lightbulb size={13} className={lightsOn ? "fill-[#E6B566] text-[#E6B566]" : "text-white/60"} />
            <span>{lightsOn ? "Lights On" : "Lights Off"}</span>
          </button>
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest hidden sm:inline select-none">
            {lightsOn ? "Full Space Revealed" : "Move cursor to sweep the spotlight"}
          </span>
        </div>

        {/* Technical Label (Permanent) */}
        <div className="absolute right-6 top-24 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#E6B566] backdrop-blur-md md:right-10 md:top-28 shadow-lg shadow-black/10 z-20">
          Error 404 • Lost in Space
        </div>

        {/* ──────── LAYER 1: BASE LAYER (Dim, Muted, Outline Blueprint) ──────── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          {/* Dimmed blueprint grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
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
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.015] invert blur-[2px]"
          />

          {/* Large dim background 404 */}
          <div className="pointer-events-none absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 select-none text-[160px] md:text-[260px] lg:text-[380px] font-serif font-bold tracking-tight text-white/[0.02] border-text z-0">
            404
          </div>

          {/* Sofa shadow outline */}
          <div className="relative z-10 mb-8 opacity-25 filter grayscale">
            <div className="absolute bottom-[2rem] left-1/2 h-[1.5rem] w-[60%] -translate-x-1/2 rounded-full bg-black/40 blur-[20px]" />
            <img
              src="/assets/404/luxury-sofa.png"
              alt=""
              aria-hidden="true"
              onError={handleImgError}
              className="mx-auto w-[240px] object-contain sm:w-[300px] md:w-[360px] lg:w-[420px] opacity-10 filter brightness-50"
            />
          </div>

          {/* Muted Copy */}
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white/50 tracking-tight leading-tight select-none">
              This space <span className="italic font-normal">doesn’t exist</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xs md:text-sm leading-relaxed text-gray-500 font-light select-none">
              The layout is incomplete or the page was moved. You can sweep your spotlight to find navigation nodes, or simply return back home.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/"
                className="group relative z-50 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-white/10 text-white/60 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-xl transition-all duration-300 shadow-md cursor-pointer"
              >
                <Home size={13} className="mr-1" />
                Return Home
              </Link>
            </div>
          </div>
        </div>

        {/* ──────── LAYER 2: SPOTLIGHT OVERLAY (Bright, Gold Glowing) ──────── */}
        <div
          style={maskStyle}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-700 pointer-events-none"
        >
          {/* Active gold blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.05] mix-blend-screen"
            style={{
              backgroundImage: `
                linear-gradient(rgba(230,181,102,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(230,181,102,0.12) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          <img
            src="/assets/404/floorplan-overlay.png"
            alt=""
            aria-hidden="true"
            onError={handleImgError}
            className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.045] invert mix-blend-screen blur-[0.5px]"
          />
          <img
            src="/assets/404/blueprint-collage.png"
            alt=""
            aria-hidden="true"
            onError={handleImgError}
            className="absolute left-1/2 top-[15%] w-[48rem] -translate-x-1/2 opacity-[0.05] invert mix-blend-screen blur-[1px]"
          />

          {/* Large glowing background 404 in gold */}
          <div className="absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 select-none text-[160px] md:text-[260px] lg:text-[380px] font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#E6B566]/[0.18] via-[#B08D57]/[0.05] to-transparent z-0">
            404
          </div>

          {/* Floating Sofa and Halo Elements */}
          <div className="relative z-10 mb-8 animate-sofaFloat">
            {/* Volumetric glow orbs behind the sofa */}
            <div className="absolute left-1/2 top-[48%] h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B08D57]/12 blur-[90px] animate-pulse" />
            <div className="absolute left-1/2 top-[48%] h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E6B566]/10 blur-[60px]" />

            {/* Premium thin golden elevation rings */}
            <div className="absolute left-1/2 top-[46%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E6C890]/15 opacity-80 animate-slowRotate" />
            <div className="absolute left-1/2 top-[46%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B08D57]/10 border-dashed opacity-60 animate-reverseRotate" />

            {/* Sofa ground shadow */}
            <div className="absolute bottom-[2rem] left-1/2 h-[2rem] w-[70%] -translate-x-1/2 rounded-full bg-black/40 blur-[24px]" />
            <div className="absolute bottom-[2.2rem] left-1/2 h-[1rem] w-[50%] -translate-x-1/2 rounded-full bg-[#B08D57]/20 blur-[14px]" />

            {/* Sofa image */}
            <img
              src="/assets/404/luxury-sofa.png"
              alt="Luxury interior setup"
              onError={handleImgError}
              className="relative z-10 mx-auto w-[240px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] sm:w-[300px] md:w-[360px] lg:w-[420px] transition-transform duration-500 hover:scale-105"
              loading="eager"
            />
          </div>

          {/* Glowing Content */}
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              This space <span className="italic text-[#E6B566] font-normal">doesn’t exist</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xs md:text-sm leading-relaxed text-gray-300 font-light">
              The page you are looking for may have been moved, redesigned, or no longer exists — but beautifully crafted spaces are still waiting to be explored.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#E6B566]/40 text-[#E6B566] bg-gradient-to-br from-[#E6B566]/20 to-[#E6B566]/5 px-8 py-3.5 text-xs font-bold uppercase tracking-widest backdrop-blur-xl shadow-lg"
              >
                <Compass size={13} className="animate-spin" style={{ animationDuration: "10s" }} />
                Space Mapping Active
              </div>
            </div>
          </div>
        </div>

        {/* ──────── LAYER 3: DYNAMIC DRAFTING CROSSHAIRS & MEASUREMENTS ──────── */}
        {!lightsOn && isHovering && (
          <>
            {/* Horizontal blueprint crosshair line */}
            <div
              className="pointer-events-none absolute left-0 right-0 h-[0.5px] bg-[#E6B566]/20 z-30"
              style={{ top: mousePos.y }}
            />
            {/* Vertical blueprint crosshair line */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 w-[0.5px] bg-[#E6B566]/20 z-30"
              style={{ left: mousePos.x }}
            />
            {/* Digital coordinate label near cursor */}
            <div
              className="pointer-events-none absolute z-40 bg-black/85 border border-[#E6B566]/35 px-3 py-1.5 rounded-lg text-[9px] font-mono text-[#E6B566] backdrop-blur-md shadow-2xl flex flex-col gap-0.5"
              style={{
                left: mousePos.x + 16,
                top: mousePos.y + 16,
              }}
            >
              <div>DRAFT_X: {((mousePos.x / (dimensions.width || 1)) * 12).toFixed(2)}m</div>
              <div>DRAFT_Y: {(((dimensions.height - mousePos.y) / (dimensions.height || 1)) * 7).toFixed(2)}m</div>
              <div className="text-[7px] text-gray-500 uppercase tracking-widest mt-0.5">Spotlight Tracker</div>
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
                <div className="mt-3 bg-black/90 border border-[#E6B566]/25 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-1 group-hover:-translate-y-0.5 group-hover:border-[#E6B566]/50 min-w-[180px] z-50">
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

        {/* Footer alignment bar (Permanent) */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 hidden w-[85%] -translate-x-1/2 items-center justify-between border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-[0.28em] text-white/30 lg:flex">
          <span>Younick Design Studio</span>
          <div className="h-3 w-px bg-white/15" />
          <span>Designing Spaces. Creating Experiences.</span>
        </div>

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