// src/pages/ServiceDetails.tsx
import React, { useMemo, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  FileText,
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
    return (
      <>
        <SEOHead seo={{ ...pageSEO.home, title: "Service not found" }} />
        <main className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4 py-12">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400" aria-hidden>
              <FileText size={24} />
            </div>

            <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Service Not Found</h1>
            <p className="text-gray-500 mb-6">The requested service couldn't be found. It may have been renamed or removed.</p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate("/services")}
                className="px-6 py-2.5 rounded-full bg-[#18181B] text-white hover:bg-black transition-colors"
              >
                Back to Services
              </button>
              <Link to="/" className="px-6 py-2.5 rounded-full border border-gray-200">
                Home
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEOHead
        seo={{
          ...pageSEO.home,
          title: `${service.title} — Younick Design Studio`,
          description: service.description || pageSEO.home.description,
          // optionally add open graph image if service.image exists
        }}
      />

      <main className="bg-white min-h-screen">
        {/* HERO */}
        <header className="relative h-[60vh] min-h-[420px] bg-[#0F0F10] text-white flex items-end" role="region" aria-label={`${service.title} hero`}>
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

          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
            <button
              onClick={goBack}
              aria-label="Go back to services"
              className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-[#E6B566] backdrop-blur-md px-3 py-2 rounded-full bg-white/5 border border-white/10"
            >
              <ChevronLeft size={16} /> Back
            </button>

            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase bg-[#E6B566] text-black rounded-sm">
                Service Overview
              </span>

              <h1 className="text-4xl md:text-6xl font-serif font-medium mb-4 leading-tight">{service.title}</h1>
              <p className="text-base md:text-lg text-gray-200 max-w-2xl">{service.description}</p>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: content */}
            <div className="lg:col-span-7 space-y-12">
              <section>
                <h2 className="text-3xl font-serif text-gray-900 mb-4">The Approach</h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>{service.description}</p>
                  <p>
                    We combine architectural thoughtfulness with craft-driven finishes to deliver
                    spaces that are functional, durable and emotionally resonant.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-gray-900 mb-6">How We Work</h3>

                <div className="space-y-6">
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
                    <div key={idx} className="flex gap-5 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FAFAFA] border border-gray-200 flex items-center justify-center text-[#B08D57]" aria-hidden>
                        <step.Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-lg">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: sticky panel */}
            <aside className="lg:col-span-5">
              <div className="sticky top-24 bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 shadow-sm" aria-labelledby="included-title">
                <h3 id="included-title" className="text-xl font-serif text-gray-900 mb-4">What's Included</h3>

                <ul className="space-y-3 mb-6" aria-label="Service features">
                  {(service.features || []).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="mt-1 text-[#B08D57] flex-shrink-0" size={18} aria-hidden />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4">
                  <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Typical Timeline</p>
                      <p className="text-sm font-medium text-gray-900">4 - 8 Weeks</p>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    aria-label={`Request consultation for ${service.title}`}
                    className="block w-full py-3 bg-[#18181B] text-white text-center rounded-xl font-medium hover:bg-[#2b2b2f] transition-colors duration-200"
                  >
                    Request Consultation
                  </Link>

                  <p className="text-xs text-center text-gray-400 mt-2">Detailed quote provided after initial site visit.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* RELATED PROJECTS */}
        <section className="bg-[#0F0F10] py-16 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[#B08D57] font-bold tracking-widest uppercase text-xs">Our Portfolio</span>
                <h2 className="text-2xl md:text-3xl font-serif">Related Projects</h2>
              </div>

              <Link to="/projects" className="hidden md:inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <article key={p.id} className="group">
                  <Link to={`/projects?search=${encodeURIComponent(p.title)}`} className="block rounded-lg overflow-hidden" aria-label={`Open project ${p.title}`}>
                    <div className="relative aspect-[4/3] bg-gray-800 mb-3 rounded-lg overflow-hidden">
                      <img
                        src={p.image || "/assets/placeholder-rect.jpg"}
                        alt={p.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                        onError={handleImgError}
                      />
                      <div className="absolute top-3 right-3 bg-black/50 px-3 py-1 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        View Case Study
                      </div>
                    </div>
                    <h3 className="text-lg font-serif text-white mb-1 group-hover:text-[#B08D57] transition-colors">{p.title}</h3>
                    <p className="text-sm text-gray-400">{p.location} • {p.category}</p>
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-[#E6B566] font-medium">
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServiceDetails;
