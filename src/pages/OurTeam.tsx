// src/pages/OurTeam.tsx
// Consolidated, High-Impact Team Page
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import {
  Heart,
  Sparkles,
  Leaf,
  Award,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { teamMembers } from "../data/team";
import { projects } from "../data/projects";
import TeamMember from "../components/TeamMember";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import HeroGradientMesh from "../components/HeroGradientMesh";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "/assets/Placeholder/Mock-4.jpg"; 
    img.alt = "Younick studio image fallback";
  }
}

/* ── Reveal wrapper ─────────────────────────────── */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
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

/* ══════════════════════════════════════════════════
   MAIN TEAM PAGE
   ══════════════════════════════════════════════════ */
const OurTeam: React.FC = () => {
  const loc = useLocation();

  // Hash-based scroll to member
  useEffect(() => {
    if (!loc.hash) return;
    const id = loc.hash.replace("#", "");
    const el = document.getElementById(`member-${id}`);
    if (el) {
      setTimeout(() => {
        try {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          (el as HTMLElement).focus?.();
          el.classList.add("ring-4", "ring-[#E6B566]", "ring-opacity-60", "rounded-2xl");
          setTimeout(
            () => el.classList.remove("ring-4", "ring-[#E6B566]", "ring-opacity-60", "rounded-2xl"),
            2500
          );
        } catch {
          // ignore focus/scroll errors
        }
      }, 100);
    }
  }, [loc.hash]);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const values = [
    {
      icon: Heart,
      title: "Client First",
      desc: "Every design decision is rooted in understanding our client's needs, lifestyle, and aspirations.",
    },
    {
      icon: Sparkles,
      title: "Craftsmanship",
      desc: "Meticulous attention to detail from initial sketch through to flawless on-site execution.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      desc: "Responsibly sourced, long-lasting materials that honor both beauty and the environment.",
    },
    {
      icon: Award,
      title: "Timeless Quality",
      desc: "Built to endure with refined materials, precision detailing, and architectural elegance.",
    },
  ];

  return (
    <>
      <SEOHead seo={pageSEO.team} />

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO & VISION (Consolidated)
          ═══════════════════════════════════════════ */}
      <header
        ref={heroRef}
        className="relative bg-[#0B1220] text-white mt-24 overflow-hidden"
        style={{ height: "clamp(420px, 55vh, 560px)" }}
      >
        {/* Animated slideshow background */}
        <HeroGradientMesh />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/30 via-[#0B1220]/20 to-[#0B1220]/80 pointer-events-none" />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center"
          style={{ opacity: heroOpacity }}
        >
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E6B566] mb-4">
              Our Team
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium tracking-tight leading-[1.1]">
              The Creative Minds
              <br />
              <span className="text-[#E6B566]">Behind Every Space</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              Designers, engineers, and makers — a close-knit team who turn ideas into
              beautifully crafted living spaces.
            </p>
          </Reveal>

          {/* Stats integrated directly in Hero */}
          <Reveal delay={0.35}>
            <div className="mt-8 flex items-center gap-8 sm:gap-12">
              <Counter value={projects.length} label="Projects" suffix="+" />
              <div className="w-px h-10 bg-white/15" />
              <Counter value={120} label="Happy Clients" suffix="+" />
              <div className="w-px h-10 bg-white/15" />
              <Counter value={8} label="Years" suffix="+" />
            </div>
          </Reveal>
        </motion.div>
      </header>

      <main className="bg-gradient-to-b from-[#F8F7F4] via-white to-[#F8F4EE] min-h-screen">
        {/* Values Row — 2 columns x 2 rows on mobile, 4 columns on desktop */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {values.map((v, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="h-full relative group bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg bg-[#0B1220] text-[#E6B566] mb-3 group-hover:scale-105 transition-transform duration-300">
                      <v.icon size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-serif font-semibold text-[#0B1220] mb-1 sm:mb-1.5">
                      {v.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 2: THE STUDIO COLLECTIVE (Consolidated Grid)
            ═══════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E6B566] mb-3">
                The Collective
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0B1220]">
                Meet the Team
              </h2>
              <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
                A tight-knit studio of designers, engineers, and detail-oriented builders crafting beautiful residential and commercial environments.
              </p>
            </div>
          </Reveal>

          {/* Unified Team Grid (All members on a single cohesive list) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <TeamMember key={member.id} member={member} index={idx} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3: WORKSPACE & CULTURE (Consolidated Gallery + CTA)
            ═══════════════════════════════════════════ */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-20 sm:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* Left Column: Bento Workspace Gallery */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <Reveal>
                  <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E6B566] mb-2">
                      Our Craft
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#0B1220]">
                      Creative Workspace
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      A glimpse into our recent design solutions and materials workshop.
                    </p>
                  </div>
                </Reveal>

                {/* Bento Grid with clean mobile & desktop heights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto sm:h-[340px]">
                  <Reveal className="h-full">
                    <Link to="/projects" className="group relative block h-[220px] sm:h-full overflow-hidden rounded-2xl shadow-sm">
                      <img
                        src="/assets/optimized/gallery/g1-768.jpeg"
                        alt="Younick Design Studio workspace and architectural planning desk"
                        title="Younick Design Studio architectural workspace in Jaipur"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={handleImgError}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                          View Projects
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-1 sm:grid-rows-2 gap-4 h-[120px] sm:h-full">
                    <Reveal className="h-full">
                      <Link to="/projects" className="group relative block h-full overflow-hidden rounded-xl shadow-sm">
                        <img
                          src="/assets/optimized/gallery/g2-768.jpeg"
                          alt="Material samples, veneers, and Italian marble swatches"
                          title="Curated luxury interior material samples at Younick Design Studio"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          onError={handleImgError}
                        />
                      </Link>
                    </Reveal>
                    <Reveal className="h-full">
                      <Link to="/projects" className="group relative block h-full overflow-hidden rounded-xl shadow-sm">
                        <img
                          src="/assets/optimized/gallery/g3-768.jpeg"
                          alt="3D architectural scale model drafts and structural drawings"
                          title="3D architectural scale models and CAD working drawings"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          onError={handleImgError}
                        />
                      </Link>
                    </Reveal>
                  </div>
                </div>
              </div>

              {/* Right Column: Hiring / Join CTA Card */}
              <div className="lg:col-span-5 flex mt-4 lg:mt-0">
                <Reveal className="w-full h-full flex">
                  <div className="relative w-full overflow-hidden rounded-3xl bg-[#0B1220] p-6 sm:p-10 flex flex-col justify-center text-center lg:text-left border border-white/[0.05] shadow-xl">
                    {/* Decorative gradient orb */}
                    <div
                      aria-hidden
                      className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle, rgba(230,181,102,0.25) 0%, transparent 70%)",
                        filter: "blur(35px)",
                      }}
                    />
                    
                    <div className="relative z-10">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E6B566] mb-3">
                        We're Hiring
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white mb-4">
                        Join Our Journey
                      </h3>
                      <p className="text-white/50 text-xs leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
                        We are always looking for passionate designers, architects, and managers to join our studio. Send us your resume/portfolio.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                        <a
                          href="mailto:careers@younickdesign.com"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E6B566] text-[#0B1220] text-xs font-bold rounded-full shadow-lg shadow-[#E6B566]/10 hover:shadow-[#E6B566]/20 hover:scale-103 transition-all duration-300"
                        >
                          Send Resume
                          <ArrowRight size={14} />
                        </a>
                        <a
                          href="/career"
                          className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white text-xs rounded-full hover:bg-white/5 transition-all duration-300"
                        >
                          Open Roles
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
      </main>
    </>
  );
};

export default OurTeam;
