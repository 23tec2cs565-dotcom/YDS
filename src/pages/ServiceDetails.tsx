import React, { useMemo, useCallback } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Hammer,
  Sparkles,
  Layout,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import { services } from "../data/services";
import { projects as ALL_PROJECTS } from "../data/projects";

/* Helper: graceful image fallback */
function handleImgError(ev: React.SyntheticEvent<HTMLImageElement>) {
  const el = ev.currentTarget;
  if (!el.dataset.fallback) {
    el.dataset.fallback = "1";
    el.src = "/assets/placeholder-rect.jpg"; // keep or replace with your optimized fallback
  }
}

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // Use route param; if not present (dev), fallback to first service
  const activeId = id ?? services?.[0]?.id;

  const service = useMemo(
    () => services.find((s) => s.id === activeId),
    [activeId]
  );

  const relatedProjects = useMemo(() => {
    if (!service) return ALL_PROJECTS.slice(0, 3);
    // simple heuristic: match by keywords, title or category
    const kws = (service.keywords || []).map((k: string) => k.toLowerCase());
    const matches = ALL_PROJECTS.filter((p) => {
      const hay = `${p.title} ${p.category ?? ""}`.toLowerCase();
      if (kws.some((k) => hay.includes(k))) return true;
      if (service.title && hay.includes(service.title.toLowerCase())) return true;
      return false;
    });
    return matches.length ? matches.slice(0, 4) : ALL_PROJECTS.slice(0, 3);
  }, [service]);

  const goBack = useCallback(() => {
    try {
      if (window.history.length > 1) navigate(-1);
      else navigate("/services");
    } catch {
      navigate("/services");
    }
  }, [navigate]);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEOHead
        seo={{
          ...pageSEO.home,
          title: `${service.title} — Younick Design Studio`,
          description: service.description || pageSEO.home.description,
          url: `https://yds-liart.vercel.app/services/${service.id}`
          // optionally add open graph image if service.image exists
        }}
      />

      <main className="bg-white min-h-screen pt-20">
        {/* HERO */}
        <header className="relative h-[45vh] sm:h-[60vh] min-h-[320px] sm:min-h-[420px] bg-[#0F0F10] text-white flex items-end overflow-hidden" role="region" aria-label={`${service.title} hero`}>
          <div className="absolute inset-0">
            <img
              src={service.image || "/assets/placeholder-rect.jpg"}
              alt={`${service.title} — hero`}
              className="w-full h-full object-cover opacity-60"
              loading="lazy"
              decoding="async"
              onError={handleImgError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/40 to-transparent" />
          </div>

          <div className="absolute top-4 sm:top-6 left-0 right-0 z-20 max-w-7xl mx-auto px-5 sm:px-6 pointer-events-none">
            <button
              onClick={goBack}
              aria-label="Go back to services"
              className="pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/80 hover:text-[#E6B566] backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 border border-white/20 transition-colors"
            >
              <ChevronLeft size={14} className="sm:w-4 sm:h-4" /> Back
            </button>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pb-6 sm:pb-12 w-full">
            <div className="max-w-3xl">
              <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 mb-2 sm:mb-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-[#E6B566] text-black rounded-sm">
                Service Overview
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-medium mb-2 sm:mb-4 leading-tight tracking-tight">{service.title}</h1>
              <p className="text-xs sm:text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed line-clamp-3 sm:line-clamp-none">{service.description}</p>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20">
            {/* Left: content */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-12">
              <section>
                <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-3 sm:mb-4">The Approach</h2>
                <div className="text-gray-600 max-w-none text-xs sm:text-base leading-relaxed space-y-3">
                  <p>{service.description}</p>
                  <p>
                    We combine architectural thoughtfulness with craft-driven finishes to deliver
                    spaces that are functional, durable and emotionally resonant.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl sm:text-2xl font-serif text-gray-900 mb-4 sm:mb-6">How We Work</h3>

                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      title: "Discovery & Concept",
                      desc: "We start with a deep dive into your vision, followed by mood boards and initial sketches.",
                      Icon: Sparkles,
                    },
                    {
                      title: "Design Development",
                      desc: "Refining the details with 3D models, material samples, and technical drawings.",
                      Icon: Layout,
                    },
                    {
                      title: "Execution & Styling",
                      desc: "Managing the build process and adding the final layer of furniture and decor.",
                      Icon: Hammer,
                    },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-3.5 sm:gap-5 items-start">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FAFAFA] border border-gray-200 flex items-center justify-center text-[#B08D57]" aria-hidden>
                        <step.Icon size={18} className="sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-0.5 sm:mb-1">{step.title}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-lg">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: sticky panel */}
            <aside className="lg:col-span-5">
              <div className="sticky top-24 bg-[#FAFAFA] rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm" aria-labelledby="included-title">
                <h3 id="included-title" className="text-lg sm:text-xl font-serif text-gray-900 mb-3 sm:mb-4">What's Included</h3>

                <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6" aria-label="Service features">
                  {(service.features || []).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-gray-700">
                      <CheckCircle2 className="mt-0.5 text-[#B08D57] flex-shrink-0" size={16} aria-hidden />
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 sm:space-y-4">
                  <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-gray-200 flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock size={15} className="sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Typical Timeline</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-900">{service.timeline || "4 - 8 Weeks"}</p>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    aria-label={`Request consultation for ${service.title}`}
                    className="block w-full py-3 sm:py-3.5 bg-[#18181B] text-white text-center rounded-xl font-medium hover:bg-[#2b2b2f] transition-colors duration-200 text-xs sm:text-sm uppercase tracking-wider"
                  >
                    Request Consultation
                  </Link>

                  <p className="text-[10px] sm:text-xs text-center text-gray-400 mt-2">Detailed quote provided after initial site visit.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* RELATED PROJECTS */}
        <section className="bg-[#0F0F10] py-12 sm:py-16 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="flex items-end justify-between mb-6 sm:mb-8">
              <div>
                <span className="text-[#B08D57] font-bold tracking-widest uppercase text-[10px] sm:text-xs">Our Portfolio</span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif">Related Projects</h2>
              </div>

              <Link to="/projects" className="hidden md:inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {relatedProjects.map((p) => (
                <article key={p.id} className="group">
                  <Link to={`/projects?project=${encodeURIComponent(p.id)}`} className="block rounded-lg overflow-hidden" aria-label={`Open project ${p.title}`}>
                    <div className="relative aspect-[4/3] bg-gray-800 mb-2 sm:mb-3 rounded-lg overflow-hidden">
                      <img
                        src={p.image || "/assets/placeholder-rect.jpg"}
                        alt={p.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                        onError={handleImgError}
                      />
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/60 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        View Case Study
                      </div>
                    </div>
                    <h3 className="text-xs sm:text-lg font-serif text-white mb-0.5 sm:mb-1 group-hover:text-[#B08D57] transition-colors leading-tight line-clamp-1">{p.title}</h3>
                    <p className="text-[10px] sm:text-sm text-gray-400 truncate">{p.location} • {p.category}</p>
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 text-center md:hidden">
              <Link to="/projects" className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#E6B566] font-medium">
                View All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServiceDetails;
