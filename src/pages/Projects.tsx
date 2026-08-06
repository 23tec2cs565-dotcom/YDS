// src/pages/Projects.tsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, Grid, List, Filter, SlidersHorizontal, ChevronDown, X, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { projects as ALL_PROJECTS } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
const ProjectModal = React.lazy(() => import('../components/ProjectModal'));
import SEOHead from "../components/SEOHead";
import { safeCapture } from "../utils/analytics";
import { getSimilarProjects } from "../utils/recommendation";
import { getCategoryStyles } from "../utils/categoryStyles";
const HeroScene3D = React.lazy(() => import('../components/HeroScene3D'));

/* ── helpers ────────────────────────────────────── */
const slugify = (s?: string) =>
  (s || "").toString().trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"; 
    img.alt = "Younick studio image fallback";
  }
};

const parseDateScore = (d?: string) => {
  if (!d) return 0;
  const parsed = Date.parse(d);
  if (!isNaN(parsed)) return parsed;
  try {
    const alt = Date.parse("1 " + d);
    if (!isNaN(alt)) return alt;
  } catch {
    // Return default score on invalid format
  }
  return 0;
};

/* ── Reveal wrapper ─────────────────────────────── */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}> = ({ children, delay = 0, className = "", once = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Animated counter ───────────────────────────── */
const Counter: React.FC<{ value: number; label: string; suffix?: string }> = ({
  value,
  label,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-serif font-medium text-white">
        {count}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/50 mt-1">{label}</div>
    </div>
  );
};

/* ── Featured bento card ────────────────────────── */
const BentoCard: React.FC<{
  project: (typeof ALL_PROJECTS)[0];
  large?: boolean;
  onClick: () => void;
  delay?: number;
}> = ({ project, large = false, onClick, delay = 0 }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
        large ? "row-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className="absolute inset-0">
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={handleImgError}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Category */}
      <div className="absolute top-5 left-5 z-10">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm ${getCategoryStyles(
            project.category
          )}`}
        >
          {project.category}
        </span>
      </div>

      {/* Arrow */}
      <div className="absolute top-5 right-5 z-10">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8">
        {project.subtitle && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#E6B566] mb-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {project.subtitle}
          </p>
        )}
        <h3
          className={`font-serif font-medium text-white leading-tight mb-2 ${
            large ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-white/60 leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75 ${
            large ? "text-sm sm:text-base line-clamp-3" : "text-sm line-clamp-2"
          }`}
        >
          {project.description}
        </p>
        <div className="flex items-center gap-3 mt-3 text-xs text-white/50">
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} />
            {project.location}
          </span>
          {project.area && (
            <>
              <span className="text-white/25">·</span>
              <span>{project.area}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Sort dropdown ──────────────────────────────── */
const SortDropdown: React.FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "az", label: "A → Z" },
    { value: "za", label: "Z → A" },
  ];

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-[#D2A761] transition"
      >
        <SlidersHorizontal size={14} />
        {current.label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 z-50 w-44 rounded-xl bg-white border border-gray-200 shadow-xl overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition ${
                  value === opt.value
                    ? "bg-[#0B1220] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const heroSlides = {
  all: [
    {
      badge: "Interior Architecture",
      titleLine1: "Bespoke Interiors,",
      titleLine2: "Crafted Comfort",
      desc: "Timeless residential and commercial spaces designed with luxury finishes, customized furniture, and sophisticated lighting layouts.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=75",
    },
    {
      badge: "Civil Construction",
      titleLine1: "Structural Mastery,",
      titleLine2: "Solid Foundations",
      desc: "Turnkey structural engineering and civil construction built to safety standards, featuring natural ventilation and modern planning.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=75",
    },
    {
      badge: "Space Renovation",
      titleLine1: "Revitalized Spaces,",
      titleLine2: "Reimagined Flows",
      desc: "Upgrading spatial flows, circulation, and finishes to revitalize existing structures into highly functional modern environments.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=75",
    },
  ],
  "Interior Design": {
    badge: "Interior Design",
    titleLine1: "Bespoke Interiors,",
    titleLine2: "Crafted Comfort",
    desc: "Timeless residential and commercial spaces designed with luxury finishes, customized furniture, and sophisticated lighting layouts.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=75",
  },
  "Construction": {
    badge: "Civil Construction",
    titleLine1: "Structural Mastery,",
    titleLine2: "Solid Foundations",
    desc: "Turnkey structural engineering and civil construction built to safety standards, featuring natural ventilation and modern planning.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=75",
  },
  "Renovation": {
    badge: "Space Renovation",
    titleLine1: "Revitalized Spaces,",
    titleLine2: "Reimagined Flows",
    desc: "Upgrading spatial flows, circulation, and finishes to revitalize existing structures into highly functional modern environments.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=75",
  },
  "3D Visualization": {
    badge: "3D Visualization",
    titleLine1: "Virtual Concepts,",
    titleLine2: "Visualized Realities",
    desc: "Photorealistic 3D modeling and rendering to help visualize materials, lighting, and layout before construction begins.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75",
  },
  "Consultation": {
    badge: "Design Consultation",
    titleLine1: "Expert Guidance,",
    titleLine2: "Strategic Planning",
    desc: "Professional consultation on space planning, material choices, structural viability, and design direction.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=75",
  }
};

/* ══════════════════════════════════════════════════
   MAIN PROJECTS PAGE
   ══════════════════════════════════════════════════ */
const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load dynamic projects from localStorage and merge with static ones
  const combinedProjects = useMemo(() => {
    try {
      const stored = localStorage.getItem("younick_dynamic_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return [...parsed, ...ALL_PROJECTS];
        }
      }
    } catch (e) {
      console.error("Failed to load dynamic projects:", e);
    }
    return ALL_PROJECTS;
  }, []);

  const [filtered, setFiltered] = useState<typeof ALL_PROJECTS>(combinedProjects);
  const [selected, setSelected] = useState<null | (typeof ALL_PROJECTS)[0]>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [category, setCategory] = useState<string>(searchParams.get("filter") || "all");
  const [locationFilter, setLocationFilter] = useState<string>(searchParams.get("location") || "all");
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchText, setSearchText] = useState<string>(
    searchParams.get("search") || searchParams.get("navSearch") || ""
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset slide index when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [category]);

  // Auto-rotate slides (only when 'all' category is active)
  useEffect(() => {
    if (category !== "all") return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, [category]);

  const activeSlideData = useMemo(() => {
    const rawKey = Object.keys(heroSlides).find(
      (k) => k.toLowerCase() === category.toLowerCase()
    );
    if (rawKey && rawKey !== "all") {
      const data = heroSlides[rawKey as keyof typeof heroSlides];
      return Array.isArray(data) ? data[0] : data;
    }
    return heroSlides.all[currentSlide];
  }, [category, currentSlide]);

  const activeHeroImages = useMemo(() => {
    const rawKey = Object.keys(heroSlides).find(
      (k) => k.toLowerCase() === category.toLowerCase()
    );
    if (rawKey && rawKey !== "all") {
      const data = heroSlides[rawKey as keyof typeof heroSlides];
      return [Array.isArray(data) ? data[0].image : data.image];
    }
    return heroSlides.all.map((s) => s.image);
  }, [category]);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Derived data
  const featuredProjects = useMemo(() => combinedProjects.filter((p) => p.featured), [combinedProjects]);
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    combinedProjects.forEach((p) => {
      const key = p.category || "Uncategorized";
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [combinedProjects]);
  const uniqueLocations = useMemo(
    () => [...new Set(combinedProjects.map((p) => p.location).filter(Boolean))].sort(),
    [combinedProjects]
  );

  // Filter + sort logic
  useEffect(() => {
    const appliedSearch = searchParams.get("search") || searchParams.get("navSearch") || "";
    const appliedFilter = searchParams.get("filter") || "all";
    const appliedLocation = searchParams.get("location") || "all";
    const appliedSort = searchParams.get("sort") || "newest";

    setCategory(appliedFilter);
    setLocationFilter(appliedLocation);
    setSort(appliedSort);
    setSearchText(appliedSearch);

    let results = [...combinedProjects];

    if (appliedFilter !== "all") {
      const want = slugify(appliedFilter);
      results = results.filter((p) => slugify(p.category) === want);
    }

    if (appliedLocation !== "all") {
      const wantLoc = slugify(appliedLocation);
      results = results.filter((p) => slugify(p.location) === wantLoc);
    }

    if (appliedSearch) {
      const s = appliedSearch.toLowerCase();
      results = results.filter((p) =>
        `${p.title} ${p.description || ""} ${p.category || ""} ${p.location || ""}`
          .toLowerCase()
          .includes(s)
      );
    }

    if (appliedSort === "az") results.sort((a, b) => a.title.localeCompare(b.title));
    else if (appliedSort === "za") results.sort((a, b) => b.title.localeCompare(a.title));
    else if (appliedSort === "newest") {
      results.sort((a, b) => parseDateScore(b.completionDate) - parseDateScore(a.completionDate));
    } else if (appliedSort === "oldest") {
      results.sort((a, b) => parseDateScore(a.completionDate) - parseDateScore(b.completionDate));
    }

    setFiltered(results);
  }, [searchParams, combinedProjects]);

  // Auto-open modal if 'project' or 'id' query parameter is present in URL
  useEffect(() => {
    const projId = searchParams.get("project") || searchParams.get("id");
    if (projId) {
      const found = combinedProjects.find(
        (p) => p.id === projId || slugify(p.title) === slugify(projId)
      );
      if (found) {
        setSelected(found);
        setModalOpen(true);
      } else {
        navigate("/404", { replace: true });
      }
    }
  }, [searchParams, combinedProjects, navigate]);

  const updateParams = useCallback(
    (params: Record<string, string | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "newest") newParams.set(key, value);
        else newParams.delete(key);
      });
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const applyCategory = (value: string) => {
    setCategory(value);
    updateParams({ filter: value });
  };

  const clearAll = () => {
    setSearchText("");
    setCategory("all");
    setLocationFilter("all");
    setSort("newest");
    updateParams({ search: "", filter: "all", location: "all", sort: "newest", project: undefined, id: undefined });
  };

  // Debounced live search
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const handleSearchChange = (value: string) => {
    setSearchText(value);
    if (value.length > 2) {
      safeCapture("search_typing", { query: value });
    }
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      updateParams({ search: value || undefined });
    }, 350);
  };

  const openProject = (proj: (typeof ALL_PROJECTS)[0]) => {
    setSelected(proj);
    setModalOpen(true);
    updateParams({ project: proj.id });
  };
  const closeProject = () => {
    setModalOpen(false);
    updateParams({ project: undefined, id: undefined });
    setTimeout(() => setSelected(null), 150);
  };

  const hasActiveFilters =
    (category && category !== "all") ||
    (locationFilter && locationFilter !== "all") ||
    !!searchText;

  const seoForPage = {
    title: "Projects — Younick Design Studio",
    description:
      "Explore our portfolio of interior design and construction projects across Rajasthan — residential, commercial and bespoke spaces crafted by Younick Design Studio.",
    url: "/projects",
    image: "/assets/optimized/hero-480.jpg",
    datePublished: "2025-11-01",
    dateModified: "2025-11-10",
  };

  return (
    <>
      <SEOHead seo={seoForPage} type="article" />

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <header
        ref={heroRef}
        className="relative bg-[#0B1220] text-white mt-24 overflow-hidden"
        style={{ height: "clamp(500px, 68vh, 720px)" }}
      >
        {/* Full-bleed slideshow behind text */}
        <React.Suspense fallback={null}>
          <HeroScene3D activeIndex={category === "all" ? currentSlide : 0} customImages={activeHeroImages} />
        </React.Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/45 via-[#0B1220]/30 to-[#0B1220]/85 pointer-events-none" />
 
        {/* Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={category === "all" ? currentSlide : category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E6B566] mb-4">
                {activeSlideData.badge}
              </p>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium tracking-tight leading-[1.12]">
                {activeSlideData.titleLine1}
                <br />
                <span className="text-[#E6B566] italic font-normal">{activeSlideData.titleLine2}</span>
              </h1>
              
              <p className="mt-5 text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
                {activeSlideData.desc}
              </p>
            </motion.div>
          </AnimatePresence>
 
          {/* Stats */}
          <Reveal delay={0.35}>
            <div className="mt-8 flex items-center gap-8 sm:gap-12">
              <Counter value={combinedProjects.length} label="Projects" suffix="+" />
              <div className="w-px h-10 bg-white/15" />
              <Counter value={categories.length} label="Categories" />
              <div className="w-px h-10 bg-white/15" />
              <Counter value={uniqueLocations.length} label="Cities" />
            </div>
          </Reveal>
        </motion.div>
 
        {/* Slide Navigation Controls */}
        {category === "all" && (
          <div className="absolute right-6 sm:right-12 bottom-8 flex items-center gap-3 z-20">
            {heroSlides.all.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`group flex items-center justify-center w-8 h-8 rounded-full border text-xs font-mono transition-all duration-300 ${
                  idx === currentSlide
                    ? "bg-[#E6B566] border-[#E6B566] text-[#0B1220] font-bold"
                    : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        )}
        {/* Golden shimmer line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 golden-strip" />
      </header>

      {/* ═══════════════════════════════════════════
          FEATURED PROJECTS — BENTO GRID
          ═══════════════════════════════════════════ */}
      {featuredProjects.length >= 3 && (
        <section className="bg-[#0B1220] pb-16 pt-8">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white">
                    Featured Work
                  </h2>
                  <p className="text-sm text-white/40 mt-1">
                    Handpicked projects showcasing our best craftsmanship
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" style={{ gridAutoRows: "280px" }}>
              <BentoCard
                project={featuredProjects[0]}
                large
                onClick={() => openProject(featuredProjects[0])}
                delay={0.1}
              />
              <BentoCard
                project={featuredProjects[1]}
                onClick={() => openProject(featuredProjects[1])}
                delay={0.2}
              />
              <BentoCard
                project={featuredProjects[2]}
                onClick={() => openProject(featuredProjects[2])}
                delay={0.3}
              />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════ */}
      <div className="bg-gradient-to-b from-[#F8F7F4] via-white to-[#F8F4EE] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* ─── Floating Filter Toolbar ─── */}
          <Reveal>
            <div className="sticky top-20 z-30 mb-10">
              <div className="bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-lg shadow-black/[0.03] p-4 sm:p-5">
                {/* Row 1: Search + Sort + View */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Search size={16} />
                    </div>
                    <input
                      id="project-search"
                      name="project-search"
                      aria-label="Search projects"
                      value={searchText}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search projects, locations, or categories..."
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6B566]/40 focus:border-[#E6B566] bg-white/90 text-sm transition"
                    />
                    {searchText && (
                      <button
                        type="button"
                        onClick={() => handleSearchChange("")}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Sort + View */}
                  <div className="flex items-center gap-2">
                    <SortDropdown value={sort} onChange={(v) => updateParams({ sort: v })} />
                    <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl p-1">
                      <button
                        onClick={() => setView("grid")}
                        className={`p-2 rounded-lg transition ${
                          view === "grid"
                            ? "bg-[#0B1220] text-white shadow-sm"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                        type="button"
                        aria-label="Grid view"
                      >
                        <Grid size={16} />
                      </button>
                      <button
                        onClick={() => setView("list")}
                        className={`p-2 rounded-lg transition ${
                          view === "list"
                            ? "bg-[#0B1220] text-white shadow-sm"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                        type="button"
                        aria-label="List view"
                      >
                        <List size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 2: Category pills */}
                <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  <button
                    type="button"
                    onClick={() => applyCategory("all")}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                      category === "all"
                        ? "bg-[#0B1220] text-white border-[#0B1220]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#D2A761]"
                    }`}
                  >
                    All
                    <span className="text-[10px] opacity-60">({combinedProjects.length})</span>
                  </button>
                  {categories.map(([cat, count]) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => applyCategory(cat)}
                      className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                        slugify(category) === slugify(cat)
                          ? "bg-[#0B1220] text-white border-[#0B1220]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#D2A761]"
                      }`}
                    >
                      {cat}
                      <span className="text-[10px] opacity-60">({count})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ─── Active Filters + Results Count ─── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
            <motion.div
              key={filtered.length}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-500"
            >
              Showing <strong className="text-gray-800">{filtered.length}</strong> of{" "}
              <strong className="text-gray-800">{combinedProjects.length}</strong> projects
            </motion.div>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {category && category !== "all" && (
                  <button
                    type="button"
                    onClick={() => applyCategory("all")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#0B1220] text-white px-3 py-1 text-xs font-medium hover:bg-[#1a2a40] transition"
                  >
                    {category}
                    <X size={12} />
                  </button>
                )}
                {searchText && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#0B1220] text-white px-3 py-1 text-xs font-medium hover:bg-[#1a2a40] transition"
                  >
                    "{searchText}"
                    <X size={12} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-[#D2A761] hover:text-[#b8903e] font-medium transition"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════
              PROJECT GRID
              ═══════════════════════════════════════ */}
          {view === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((proj) => (
                  <ProjectCard key={proj.id} project={proj} onClick={() => openProject(proj)} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* ═══════════════════════════════════════
              TIMELINE LIST VIEW
              ═══════════════════════════════════════ */}
          {view === "list" && filtered.length > 0 && (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#E6B566]/60 via-[#E6B566]/20 to-transparent hidden sm:block" />

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filtered.map((proj, idx) => {
                    const inProgress = !proj.completionDate || /in progress/i.test(proj.completionDate);
                    return (
                      <motion.div
                        key={proj.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                        className="group relative sm:pl-16 cursor-pointer"
                        onClick={() => {
                          safeCapture("project_viewed", {
                            project_id: proj.id,
                            title: proj.title,
                            category: proj.category,
                            location: proj.location,
                          });
                          openProject(proj);
                        }}
                      >
                        {/* Timeline dot */}
                        <div className={`absolute left-[18px] top-8 h-4 w-4 rounded-full border-2 bg-white group-hover:bg-[#E6B566] transition-colors hidden sm:block ${
                          inProgress ? "border-[#E6B566] border-dashed" : "border-[#E6B566]"
                        }`} />

                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-[#D2A761] hover:-translate-y-0.5">
                          <div className="flex flex-col sm:flex-row">
                            {/* Thumbnail */}
                            <div className="sm:w-48 h-40 sm:h-auto overflow-hidden flex-shrink-0">
                              <img
                                src={proj.image}
                                alt={proj.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                                onError={handleImgError}
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span
                                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${getCategoryStyles(
                                    proj.category
                                  )}`}
                                >
                                  {proj.category}
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                  <MapPin size={12} />
                                  {proj.location}
                                </span>
                              </div>
                              <h3 className="text-lg font-serif font-semibold text-[#0B1220] group-hover:text-[#D2A761] transition-colors">
                                {proj.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {proj.description}
                              </p>
                              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                                <span className="inline-flex items-center gap-1">
                                  <Calendar size={12} />
                                  {proj.completionDate || "In Progress"}
                                </span>
                                {proj.area && <span>{proj.area}</span>}
                              </div>
                            </div>

                            {/* Arrow */}
                            <div className="hidden sm:flex items-center pr-6">
                              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#E6B566] group-hover:text-white transition-all">
                                <ArrowUpRight size={16} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
              EMPTY STATE
              ═══════════════════════════════════════ */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <Filter size={32} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-[#0B1220] mb-3">
                No projects found
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                We couldn't find any projects matching your current filters. Try broadening your
                search or clearing filters.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0B1220] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#1a2a40] transition"
                >
                  Clear All Filters
                </button>
                <button
                  type="button"
                  onClick={() => applyCategory("all")}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 text-gray-700 px-6 py-2.5 text-sm font-semibold hover:border-[#D2A761] transition"
                >
                  Browse All
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Modal */}
        {selected && (
          <React.Suspense fallback={null}>
            <ProjectModal
              project={selected}
              isOpen={modalOpen}
              onClose={closeProject}
              related={getSimilarProjects(selected, combinedProjects)}
              onSelectRelated={(p) => openProject(p)}
            />
          </React.Suspense>
        )}
      </div>
    </>
  );
};

export default Projects;
