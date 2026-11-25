"use client";
// src/pages/Home.tsx
import React, { useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Quote,
  Home as HomeIcon,
  Building,
  Wrench,
  MessageCircle,
  Eye,
  HelpCircle,
} from "lucide-react";

// -- Data imports with Sanity / local fallback
import { projects as defaultProjects } from "../data/projects";
import { teamMembers as defaultTeam } from "../data/team";
import { blogs as defaultBlogs } from "../data/blogs";
import { useProjects, useServices, useTeam, useTestimonials, useBlogPosts } from "../hooks/useSanityData";
import type { Project } from "../data/projects";
import type { Service } from "../data/services";
import { urlFor } from "../lib/sanity";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { YEARS_OF_EXPERIENCE } from "../utils/constants";
import { handleImgError, handleAvatarError } from "../utils/imageFallback";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home: HomeIcon,
  Building,
  Wrench,
  MessageCircle,
  Eye,
};

const HERO_VIDEOS = [
  "/assets/Projects/Detailing devils/video-1.mp4",
  "/assets/Projects/Detailing devils/video-2.mp4",
  "/assets/Projects/Detailing devils/video-3.mp4",
  "/assets/Projects/Detailing devils/video-4.mp4",
  "/assets/Projects/Detailing devils/video-5.mp4",
  "/assets/Projects/Detailing devils/video-6.mp4",
  "/assets/Projects/Detailing devils/video-7.mp4",
  "/assets/Projects/Detailing devils/video-8.mp4",
  "/assets/Projects/Detailing devils/video-9.mp4",
  "/assets/Projects/Detailing devils/video-10.mp4",
  "/assets/Projects/Detailing devils/video-11.mp4",
  "/assets/Projects/Detailing devils/video-12.mp4",
  "/assets/Projects/Detailing devils/video-13.mp4",
  "/assets/Projects/Detailing devils/video-14.mp4",
];

const PROJECT_FILTERS = ["All", "Interior Design", "Construction", "Renovation"] as const;

const cn = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MotionDiv = motion.div as unknown as React.ComponentType<any>;

interface ExtendedProject extends Project {
  imageUrl?: string;
}

interface ExtendedService extends Service {
  imageUrl?: string;
}



const TESTIMONIALS_FALLBACK = [
  {
    id: "t1",
    name: "Arpit Agarwal",
    role: "Client",
    quote: "Nikhil ji, everything came out really beautiful and elegant, thank you so much for all your efforts and to the team also.. looking forward to working in future also..",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=512&auto=format&fit=crop",
  },
  {
    id: "t2",
    name: "Sanjay Choudhary",
    role: "Client",
    quote: "Great process, clear communication and beautiful finishes.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=512&auto=format&fit=crop",
  },
];

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  width?: string;
  className?: string;
}> = ({ children, delay = 0, width = "100%", className }) => (
  <div style={{ width }} className={cn("relative overflow-visible", className)}>
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.25, 0, 1] }}
    >
      {children}
    </MotionDiv>
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  withIcon?: boolean;
  size?: "sm" | "md" | "lg";
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, withIcon, ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: "bg-[#0B1220] text-white hover:bg-[#0B1220]/90 shadow-xl",
      secondary: "bg-white text-[#0B1220] border border-gray-200 hover:bg-gray-50",
      outline: "bg-transparent border border-current text-[#0B1220] hover:opacity-70",
      ghost: "bg-transparent text-[#0B1220] hover:bg-gray-100",
      link: "p-0 bg-transparent text-[#0B1220] hover:text-[#E6B566] underline-offset-4 hover:underline",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          className || ""
        )}
        {...props}
      >
        {children}
        {withIcon && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
      </button>
    );
  }
);
Button.displayName = "Button";

// ------------------ Sections ------------------

const Hero: React.FC<{ projects: Project[] }> = React.memo(({ projects }) => {
  const router = useRouter();
  const videoIdxRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = useCallback(() => {
    videoIdxRef.current = (videoIdxRef.current + 1) % HERO_VIDEOS.length;
    const vid = videoRef.current;
    if (vid) {
      vid.src = HERO_VIDEOS[videoIdxRef.current];
      vid.play().catch(() => {});
    }
  }, []);

  // Back panel static image from first featured project
  const heroBackImg = useMemo(() => {
    const featured = projects.find((p) => p.featured) ?? projects[0];
    return (featured as ExtendedProject)?.imageUrl ?? featured?.image ?? "/assets/Hero/hero-1920.webp";
  }, [projects]);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden bg-[#FAFAFB]">
      {/* ── Architectural Drafting Grid Background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(11, 18, 32, 0.9) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(11, 18, 32, 0.9) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 40%, #000 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 40%, #000 55%, transparent 100%)",
        }}
      />

      <div className="absolute top-0 right-0 w-[40vw] h-full bg-[#EAEAEA] rounded-l-[120px] -z-10 hidden lg:block opacity-50" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#E6B566]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1680px] mx-auto grid lg:grid-cols-12 gap-16 items-center h-full">
        <div className="lg:col-span-6 relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-[#0B1220] leading-[1.1] mb-8">
            Interiors that <br />
            <span className="italic text-[#8C6226] font-angelone">feel curated</span>
            <br />
            modern & warm.
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
            <strong>Architecture</strong>, craft and <strong>human-centred spatial thinking</strong> — from concept and visualization to <strong>turnkey delivery</strong>. Spaces people truly want to live in.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button
              onClick={() => router.push("/contact")}
              withIcon
              className="group relative rounded-none bg-transparent hover:bg-transparent text-white shadow-none overflow-visible px-8 py-4"
            >
              {/* Morphing SVG Background */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full -z-10 drop-shadow-xl"
              >
                <path
                  d="M 0,0 Q 100,0 200,0 Q 200,30 200,60 Q 100,60 0,60 Q 0,30 0,0 Z"
                  className="fill-[#0B3528] transition-all duration-300 ease-out group-hover:fill-[#0B3528]/90 group-hover:[d:path('M_1,1_Q_100,4_199,1_Q_195,30_199,59_Q_100,56_1,59_Q_5,30_1,1_Z')]"
                />
              </svg>

              <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-[0.98]">
                Start a Conversation
              </span>
            </Button>

            <Link
              href="/projects"
              className="px-6 py-3 rounded-full text-sm font-medium text-gray-700 hover:text-[#0B1220] hover:bg-gray-100 transition-colors"
            >
              View Selected Work
            </Link>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 pt-8 border-t border-gray-200/80 flex-wrap">
            <div>
              <div className="text-3xl font-serif text-[#0B1220]">{projects.length}+</div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Signature Projects</p>
            </div>
            <div>
              <div className="text-3xl font-serif text-[#0B1220]">{YEARS_OF_EXPERIENCE}+</div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Years Experience</p>
            </div>
            <div>
              <div className="text-3xl font-serif text-[#0B1220]">4.5<span className="gap-1 text-xl text-[#E6B566] align-middle">★</span></div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Client Rating</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-[600px] hidden md:block">
          <div className="absolute top-0 right-0 w-4/5 h-4/5 z-10">
            <div className="w-full h-full rounded-tr-[100px] rounded-bl-[40px] overflow-hidden shadow-2xl">
              <img
                decoding="async"
                fetchPriority="high"
                src={heroBackImg}
                alt="Luxury Interior Living Space by Younick Design Studio"
                title="Luxury Interior Architecture — Younick Design Studio Jaipur"
                width="1200"
                height="900"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                onError={handleImgError}
                loading="eager"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-3/5 h-1/2 z-20">
            <div className="w-full h-full rounded-tl-[60px] rounded-br-[20px] overflow-hidden shadow-2xl border-8 border-[#FAFAFB]">
              <video
                ref={videoRef}
                src={HERO_VIDEOS[0]}
                autoPlay
                muted
                playsInline
                preload="metadata"
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-xl max-w-[180px]">
              <div className="flex items-center gap-1 mb-2" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3 h-3 text-[#E6B566]" />
                ))}
              </div>
              <p className="text-xs font-medium text-[#0B1220]">"The attention to detail is unlike anything else."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

const About: React.FC<{ projects: Project[] }> = React.memo(({ projects }) => {
  const { aboutImg1, aboutImg2 } = useMemo(() => {
    const projectList = projects.length > 0 ? projects : defaultProjects;
    const featured = projectList.filter((p) => p.featured);
    const first = featured[0] ?? projectList[0];
    const second = featured[1] ?? projectList[1];
    return {
      aboutImg1: (first as ExtendedProject)?.imageUrl ?? first?.image ?? "/assets/Placeholder/Mock-4.jpg",
      aboutImg2: (second as ExtendedProject)?.imageUrl ?? second?.image ?? "/assets/Placeholder/Mock-9.avif",
    };
  }, [projects]);

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-[1680px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-12">
                  <img src={aboutImg1} alt="Premium materials and finishes used in Younick Studio projects" title="Premium materials, Italian marble and custom woodwork used in Younick Studio projects" width="600" height="800" className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover" onError={handleImgError} loading="lazy" decoding="async" />
                </div>
                <div className="space-y-4">
                  <img src={aboutImg2} alt="Interior design showcase by Younick Studio" title="Award-winning interior design showcase by Younick Studio Jaipur" width="600" height="800" className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover" onError={handleImgError} loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#F7F7F9] rounded-full blur-3xl opacity-60" />
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-serif text-[#0B1220] mb-8 leading-tight">
                We listen first, then we <span className="italic text-[#8C6226] font-angelone">create.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We design <strong>thoughtful interiors</strong> that balance <strong>material honesty</strong> with timeless form. Listening is our primary tool we then layer craft, light, and curated materials to create rooms that feel lived-in and intentional.
              </p>
              <p className="text-base text-gray-500 mb-10 leading-relaxed">
                From <strong>full-scale renovations</strong> to bespoke commercial fit-outs, <strong>Younick Design Studio</strong> manages concept, visualization and delivery with transparency. Clients choose us for clear communication, material expertise and the quiet confidence of built work.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex gap-8">
                <div>
                  <div className="text-4xl font-serif mb-1">{YEARS_OF_EXPERIENCE}+</div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Years Exp.</p>
                </div>
                <div className="w-px bg-gray-200 h-12" />
                <div>
                  <div className="text-4xl font-serif mb-1">120+</div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Happy Clients</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
});

const TransformationSection: React.FC = React.memo(() => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-gray-100 w-full">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif text-[#0B1220] mb-6 leading-tight">
              Witness the Art of <span className="italic text-[#8C6226] font-angelone">Turnkey Execution</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              From raw masonry shells and outdated layouts to luminous, mastercrafted interiors. Drag the slider to explore the precision of our on-site transformations.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <BeforeAfterSlider />
        </Reveal>
      </div>
    </section>
  );
});

const ProjectsSection: React.FC<{ projects: Project[] }> = React.memo(({ projects }) => {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("All");
  const filtered = useMemo(
    () =>
      (
        filter === "All"
          ? projects.filter((p) => p.featured)
          : projects
              .filter((p) => p.category === filter)
              .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      ).slice(0, 6),
    [projects, filter]
  );

  return (
    <section id="projects" className="py-24 bg-[#FAFAFB]">
      <div className="max-w-[1680px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <Reveal>
            <h2 className="text-4xl font-serif text-[#0B1220] mb-4">Selected Works</h2>
            <p className="text-gray-500">A curated selection of our finest residential and commercial spaces.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex gap-2 p-1 bg-white rounded-full border border-gray-200 shadow-sm overflow-x-auto">
              {PROJECT_FILTERS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-full transition-all whitespace-nowrap",
                    filter === cat ? "bg-[#0B3528] text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              const img = (project as ExtendedProject)?.imageUrl ?? project.image ?? "";
              const projSlug = project.slug || project.id;
              return (
                <Link
                  key={project.id ?? idx}
                  href={`/projects/${projSlug}`}
                  className="block no-underline text-inherit"
                >
                  <MotionDiv
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-md text-[#0B1220] px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Project
                        </span>
                      </div>
                      <img src={img} alt={`${project.title} — ${project.category || "Interior Architecture"} in ${project.location || "Jaipur"}`} title={`${project.title} — ${project.category || "Interior Architecture"} in ${project.location || "Jaipur"}`} width="600" height="750" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={handleImgError} loading="lazy" decoding="async" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#0B1220] group-hover:text-[#E6B566] transition-colors">{project.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{project.location} : {project.category}</p>
                  </MotionDiv>
                </Link>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <Button onClick={() => router.push("/projects")} variant="outline" className="border-gray-300">View Full Portfolio</Button>
        </div>
      </div>
    </section>
  );
});

const ServicesSection: React.FC = React.memo(() => {
  const { services } = useServices();
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-[1680px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0B1220] mb-6">
            Our Expertise
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive design solutions tailored to your lifestyle.
          </p>
        </div>

        <div className="space-y-32">
          {services.map((service, index) => {
            const s = service as ExtendedService;
            const img = s?.imageUrl ?? s?.image ?? "";
            const Icon = s?.icon ? ICON_MAP[s.icon] || HelpCircle : null;
            const isEven = index % 2 === 0;

            return (
              <div
                key={s.id ?? index}
                className={cn(
                  "flex flex-col lg:flex-row gap-12 lg:gap-24 items-center",
                  !isEven && "lg:flex-row-reverse"
                )}
              >
                <motion.div
                  className="w-full lg:w-1/2 relative group"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div
                    className={cn(
                      "absolute -inset-4 bg-[#F7F7F9] rounded-3xl transform transition-transform duration-500",
                      isEven
                        ? "rotate-2 group-hover:-rotate-1"
                        : "-rotate-2 group-hover:rotate-1"
                    )}
                  />
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10] shadow-xl">
                    <img
                      src={img}
                      alt={`${s?.title} — Architecture & Turnkey Service`}
                      title={`${s?.title} — Younick Design Studio Services Jaipur`}
                      width="800"
                      height="500"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={handleImgError}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5 w-12 h-12 sm:w-14 sm:h-14 bg-[#0B3528]/95 backdrop-blur-md rounded-2xl border border-emerald-500/40 flex items-center justify-center shadow-xl text-[#E6B566] z-10 shadow-emerald-950/40">
                      {Icon ? (
                        <Icon size={28} />
                      ) : (
                        <svg width="28" height="28" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-serif text-[#0B1220] mb-6">
                    {s?.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {s?.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {(s?.features ?? []).map((feature: string) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-sm font-medium text-gray-700"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-[#E6B566]"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/services/${s?.id || "interior-design"}`}
                    className="inline-flex items-center text-[#0B1220] font-semibold border-b border-[#0B1220] pb-1 hover:text-[#E6B566] hover:border-[#E6B566] transition-colors"
                  >
                    Explore {s?.title || "Service"} Details <ArrowRight size={16} className="ml-2" />
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

const TestimonialsSection: React.FC = React.memo(() => {
  const { testimonials: TESTIMONIALS } = useTestimonials();
  const [index, setIndex] = useState(0);
  const list = TESTIMONIALS && TESTIMONIALS.length > 0 ? TESTIMONIALS : TESTIMONIALS_FALLBACK;
  const total = list.length || 1;
  const next = useCallback(() => setIndex((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setIndex((p) => (p - 1 + total) % total), [total]);
  const current = list[index] || list[0];

  if (!current) return null;

  return (
    <section className="py-24 bg-[#FAFAFB] border-y border-white">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="absolute top-0 left-10 text-[#E6B566]/10 pointer-events-none" aria-hidden="true">
          <Quote size={120} />
        </div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl font-serif">Client Stories</h2>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-sm relative min-h-[300px] flex items-center justify-center text-center">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
            <button onClick={prev} aria-label="Previous testimonial" className="p-3 rounded-full hover:bg-gray-100 transition-colors"><ChevronLeft /></button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <button onClick={next} aria-label="Next testimonial" className="p-3 rounded-full hover:bg-gray-100 transition-colors"><ChevronRight /></button>
          </div>

          <AnimatePresence mode="wait">
            <MotionDiv key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="max-w-2xl">
              <div className="flex justify-center gap-1 mb-6" aria-hidden="true">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#E6B566]" />)}
              </div>
              <p className="text-2xl md:text-3xl font-serif text-[#0B1220] leading-relaxed italic mb-8">"{current?.quote || "Exceptional craftsmanship and attention to detail."}"</p>
              <div className="flex flex-col items-center">
                <img
                  src={current?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=512&auto=format&fit=crop"}
                  alt={`${current?.name || "Client"} — Client Review`}
                  title={`${current?.name || "Client"} — Client Review for Younick Design Studio`}
                  width="64"
                  height="64"
                  className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-white shadow-md"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => handleAvatarError(e, current?.name || "C", 128, 48)}
                />
                <div className="font-bold text-[#0B1220]">{current?.name || "Satisfied Client"}</div>
                <p className="text-sm text-gray-500">{current?.role || "Homeowner"}</p>
              </div>
            </MotionDiv>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

const LeadershipSection: React.FC = React.memo(() => {
  const { teamMembers } = useTeam();
  const displayedLeadership = useMemo(() => {
    const members = teamMembers && teamMembers.length > 0 ? teamMembers : defaultTeam;
    const founders = members.filter((member) => member.isFounder);
    return (founders.length > 0 ? founders : members).slice(0, 3);
  }, [teamMembers]);

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-[1680px] mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">The Leadership</h2>
            <p className="text-gray-500">
              Founders &amp; core leadership shaping our design language.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12">
          {displayedLeadership.map((member, i) => (
            <Reveal key={member.id || i} delay={i * 0.1}>
              <div className="group text-center">
                <div className="relative w-64 h-64 mx-auto mb-8 overflow-hidden rounded-full border-4 border-white shadow-xl">
                  <img
                    src={member.image || "/assets/team/Nikhil/Nikhil-1024.jpeg"}
                    alt={`${member.name} — ${member.role} at Younick Design Studio`}
                    title={`${member.name} — ${member.role} at Younick Design Studio`}
                    width="256"
                    height="256"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => handleAvatarError(e, member?.name || "Y", 256, 96)}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#0B1220]">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#E6B566] font-bold mt-1 mb-4">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {member.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
});

// Insights & Knowledge Center Section for SEO & Client Education
const InsightsSection: React.FC = React.memo(() => {
  const { posts } = useBlogPosts();
  const guides = useMemo(
    () => (posts && posts.length > 0 ? posts : defaultBlogs).slice(0, 3),
    [posts]
  );

  return (
    <section className="pt-16 pb-20 bg-[#070D18] text-white border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E6B566]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-[1680px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E6B566] mb-3 block">
              Architecture &amp; Interior Blog
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
              Design Intelligence &amp; <span className="text-[#E6B566]">Blog Guides</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="mt-6 md:mt-0 group inline-flex items-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 bg-white text-[#0B1220] hover:bg-[#E6B566] hover:text-[#0B1220] text-xs font-mono font-bold uppercase tracking-wider shadow-md hover:shadow-xl transition-all duration-300 shrink-0"
          >
            <span>Explore All Blog Articles</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((g) => (
            <Link
              key={g.id}
              href={`/blog/${g.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#E6B566]/40 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden bg-black/40 relative">
                <img
                  src={urlFor(g.coverImage) || "/assets/services/interior-design3.jpg"}
                  alt={g.title}
                  width="640"
                  height="400"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={handleImgError}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#070D18]/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#E6B566] uppercase tracking-wider">
                  {g.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2.5">
                    <span>{g.readingTime}</span>
                    <span>•</span>
                    <span>By {g.author.name}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E6B566] transition-colors line-clamp-2 leading-snug mb-2">
                    {g.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {g.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#E6B566]">
                  <span>Read Guide</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

const Home: React.FC = () => {
  const { projects } = useProjects();

  return (
    <>
      <SEOHead seo={pageSEO.home} />
      <div className="min-h-screen bg-[#FAFAFB] text-[#0B1220] font-sans selection:bg-[#E6B566] selection:text-white">
        <Hero projects={projects} />
        <About projects={projects} />
        <TransformationSection />
        <ProjectsSection projects={projects} />
        <ServicesSection />
        <TestimonialsSection />
        <LeadershipSection />
        <InsightsSection />
        {/* FooterSection intentionally not rendered on the Home page per request */}
      </div>
    </>
  );
};

export default Home;
