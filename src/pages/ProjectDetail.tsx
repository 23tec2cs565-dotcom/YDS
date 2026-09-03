// src/pages/ProjectDetail.tsx
// Dedicated Case-Study Page for Younick Design Studio Projects

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Share2,
  CheckCircle2,
  MessageCircle,
  Play,
  Image as ImageIcon,
  Film,
  Building2,
  IndianRupee,
  Maximize2
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { projects as defaultProjects, type Project } from "../data/projects";
import { useProjects } from "../hooks/useSanityData";
import { safeCapture } from "../utils/analytics";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "/assets/Placeholder/placeholder.jpg";
    img.alt = "Younick studio image fallback";
  }
}

const slugify = (s?: string) =>
  (s || "").toString().trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { projects: sanityProjects, loading } = useProjects();

  // Combine Sanity + local storage + default projects
  const allProjects = useMemo(() => {
    try {
      const stored = localStorage.getItem("younick_dynamic_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return [...parsed, ...sanityProjects];
        }
      }
    } catch {
      // ignore
    }
    return sanityProjects.length ? sanityProjects : defaultProjects;
  }, [sanityProjects]);

  // Find target project by slug or id
  const project = useMemo(() => {
    if (!slug) return null;
    const clean = slug.toLowerCase().trim();
    return allProjects.find(
      (p) => (p.slug && p.slug.toLowerCase() === clean) ||
             (p.id && p.id.toLowerCase() === clean) ||
             slugify(p.title) === clean
    );
  }, [slug, allProjects]);

  // Media lists
  const imagesList = useMemo(() => {
    if (project?.images && project.images.length > 0) return project.images;
    if (project?.image) return [project.image];
    return [];
  }, [project]);

  const videosList = useMemo(() => {
    return project?.videos && project.videos.length > 0 ? project.videos : [];
  }, [project]);

  const [activeMediaTab, setActiveMediaTab] = useState<"photos" | "videos">("photos");
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Track analytics
  useEffect(() => {
    if (project) {
      safeCapture("project_case_study_viewed", {
        project_id: project.id,
        project_slug: project.slug,
        title: project.title,
        category: project.category,
        location: project.location
      });
      window.scrollTo(0, 0);
    }
  }, [project]);

  // Related projects (same category or nearby)
  const relatedProjects = useMemo(() => {
    if (!project) return [];
    const cat = (project.category || "").toLowerCase();
    const sameCat = allProjects.filter(
      (p) => p.id !== project.id && (p.category || "").toLowerCase() === cat
    );
    const others = allProjects.filter(
      (p) => p.id !== project.id && (p.category || "").toLowerCase() !== cat
    );
    return [...sameCat, ...others].slice(0, 3);
  }, [project, allProjects]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: `${project?.title} | Younick Design Studio`,
        text: project?.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [project]);

  if (loading && !project) {
    return (
      <div className="min-h-screen bg-[#070D18] flex flex-col items-center justify-center text-center px-6">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#E6B566] animate-pulse mb-4">
          Loading Project from Studio...
        </div>
        <div className="w-20 h-[2px] bg-white/10 overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#B08D57] rounded-full animate-marquee" style={{ animationDuration: "1.2s" }} />
        </div>
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const siteUrl = "https://yds-liart.vercel.app";
  const canonicalUrl = `${siteUrl}/projects/${project.slug || project.id}`;
  const ogImage = project.image?.startsWith("http")
    ? project.image
    : `${siteUrl}${project.image || "/assets/og/hero-1200.webp"}`;

  // Structured data schema for Google Rich Results
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: `${project.title} — ${project.subtitle || project.category} in Jaipur`,
    description: project.longDescription || project.description,
    url: canonicalUrl,
    image: imagesList.map((img) => img.startsWith("http") ? img : `${siteUrl}${img}`),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` },
        { "@type": "ListItem", position: 3, name: project.title, item: canonicalUrl }
      ]
    },
    mainEntity: {
      "@type": "VisualArtwork",
      name: project.title,
      description: project.longDescription || project.description,
      creator: {
        "@type": "Organization",
        name: "Younick Design Studio",
        url: siteUrl
      },
      locationCreated: {
        "@type": "Place",
        name: project.location || "Jaipur, Rajasthan"
      }
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Younick Design Studio, I saw your signature project "${project.title}" on your website and would like to discuss a similar design/construction project.`
  );

  return (
    <>
      <SEOHead
        seo={{
          title: `${project.title} — ${project.category} Portfolio | Younick Studio Jaipur`,
          description: `${project.description} Delivered by Younick Design Studio in ${project.location}. Explore photos, specifications, and execution details.`,
          url: `/projects/${project.slug || project.id}`,
          image: ogImage,
          keywords: `${project.title.toLowerCase()}, ${project.category.toLowerCase()} jaipur, interior design ${project.location.toLowerCase()}, younick design studio portfolio, luxury architecture jaipur`
        }}
        type="article"
        schema={projectSchema}
      />

      <div className="min-h-screen bg-[#070D18] text-white selection:bg-[#E6B566] selection:text-[#070D18] pt-28 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumb & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Link to="/" className="hover:text-[#E6B566] transition">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-[#E6B566] transition">Projects</Link>
              <span>/</span>
              <span className="text-white truncate max-w-[200px] sm:max-w-xs">{project.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#E6B566]/40 text-xs sm:text-sm font-medium transition"
                aria-label="Share this project"
              >
                <Share2 size={15} />
                <span>{copied ? "Copied Link!" : "Share Project"}</span>
              </button>

              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-xs sm:text-sm font-medium transition text-gray-300"
              >
                <ChevronLeft size={16} />
                <span>All Projects</span>
              </Link>
            </div>
          </div>

          {/* Project Title Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6B566]/10 text-[#E6B566] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#E6B566]/20">
              <Layers size={13} />
              {project.category}
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-lg sm:text-xl text-[#E6B566]/90 font-light max-w-3xl">
                {project.subtitle}
              </p>
            )}

            {/* Quick Specs Bar */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#E6B566]" />
                <span>{project.location}</span>
              </div>
              {project.completionDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#E6B566]" />
                  <span>{project.completionDate}</span>
                </div>
              )}
              {project.area && (
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-[#E6B566]" />
                  <span>{project.area}</span>
                </div>
              )}
              {project.budget && (
                <div className="flex items-center gap-2">
                  <IndianRupee size={16} className="text-[#E6B566]" />
                  <span>{project.budget}</span>
                </div>
              )}
            </div>
          </div>

          {/* Media Showcase (Photos & Videos) */}
          <div className="mb-16">
            {/* Tab switchers if both photos and videos exist */}
            {videosList.length > 0 && imagesList.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setActiveMediaTab("photos")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    activeMediaTab === "photos"
                      ? "bg-[#E6B566] text-[#070D18]"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <ImageIcon size={16} />
                  <span>Photography ({imagesList.length})</span>
                </button>
                <button
                  onClick={() => setActiveMediaTab("videos")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    activeMediaTab === "videos"
                      ? "bg-[#E6B566] text-[#070D18]"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Film size={16} />
                  <span>Site Walkthroughs ({videosList.length})</span>
                </button>
              </div>
            )}

            {/* Photo Gallery View */}
            {activeMediaTab === "photos" && (
              <div className="space-y-4">
                {/* Main Active Image Viewport */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[680px] w-full rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imagesList[activePhotoIdx]}
                      src={imagesList[activePhotoIdx]}
                      alt={`${project.title} photo ${activePhotoIdx + 1}`}
                      title={`${project.title} by Younick Design Studio`}
                      className="w-full h-full object-cover select-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onError={handleImgError}
                    />
                  </AnimatePresence>

                  {/* Prev / Next Arrows */}
                  {imagesList.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActivePhotoIdx((prev) =>
                            prev === 0 ? imagesList.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() =>
                          setActivePhotoIdx((prev) =>
                            prev === imagesList.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Photo Counter Pill */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white/90 text-xs font-mono border border-white/10">
                    {activePhotoIdx + 1} / {imagesList.length}
                  </div>
                </div>

                {/* Thumbnails Strip */}
                {imagesList.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {imagesList.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIdx(idx)}
                        className={`relative w-20 sm:w-28 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border-2 transition ${
                          activePhotoIdx === idx
                            ? "border-[#E6B566] scale-105"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={handleImgError}
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Video Viewport */}
            {activeMediaTab === "videos" && videosList.length > 0 && (
              <div className="space-y-4">
                <div className="relative aspect-[16/9] max-h-[650px] w-full rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                  <video
                    key={videosList[activeVideoIdx]}
                    controls
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  >
                    <source src={videosList[activeVideoIdx]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {videosList.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {videosList.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveVideoIdx(idx)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
                          activeVideoIdx === idx
                            ? "bg-[#E6B566] text-[#070D18] border-[#E6B566]"
                            : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <Play size={12} />
                        <span>Clip {idx + 1}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Project Details: Story, Work Scope & Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left Column: Story & Outcome (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
                  Architectural Story &amp; Design Intent
                </h2>
                <div className="prose prose-invert max-w-none text-gray-300 text-base sm:text-lg leading-relaxed space-y-4">
                  <p>{project.longDescription || project.description}</p>
                </div>
              </div>

              {/* Scope of Work Badges */}
              {project.workScope && project.workScope.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif text-white mb-4">
                    Key Deliverables &amp; Execution Scope
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.workScope.map((scope, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5"
                      >
                        <CheckCircle2 size={18} className="text-[#E6B566] shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-200">{scope}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Outcome */}
              {project.outcome && (
                <div className="p-6 rounded-2xl bg-[#0B1528] border border-[#E6B566]/20">
                  <h3 className="text-sm font-semibold text-[#E6B566] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles size={16} />
                    Execution Outcome
                  </h3>
                  <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                    {project.outcome}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Key Specifications Card (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-6">
                <h3 className="text-xl font-serif text-white pb-3 border-b border-white/10">
                  Project Factsheet
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider block">Project Name</span>
                    <span className="text-white font-medium">{project.title}</span>
                  </div>

                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider block">Category</span>
                    <span className="text-[#E6B566] font-medium">{project.category}</span>
                  </div>

                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider block">Location</span>
                    <span className="text-white font-medium">{project.location}</span>
                  </div>

                  {project.area && (
                    <div>
                      <span className="text-gray-400 text-xs uppercase tracking-wider block">Floor Plate / Area</span>
                      <span className="text-white font-medium">{project.area}</span>
                    </div>
                  )}

                  {project.budget && (
                    <div>
                      <span className="text-gray-400 text-xs uppercase tracking-wider block">Execution Budget</span>
                      <span className="text-white font-medium">{project.budget}</span>
                    </div>
                  )}

                  {project.completionDate && (
                    <div>
                      <span className="text-gray-400 text-xs uppercase tracking-wider block">Handover Date</span>
                      <span className="text-white font-medium">{project.completionDate}</span>
                    </div>
                  )}

                  {project.clientContact && (
                    <div>
                      <span className="text-gray-400 text-xs uppercase tracking-wider block">Client / Project Reference</span>
                      <span className="text-white font-medium">{project.clientContact}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <a
                    href={`https://wa.me/918854883058?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm transition"
                  >
                    <MessageCircle size={18} />
                    <span>Inquire About Similar Project</span>
                  </a>

                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition"
                  >
                    <span>Schedule Design Consultation</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects Showcase */}
          {relatedProjects.length > 0 && (
            <div className="pt-12 border-t border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white">
                    Explore Other Signature Projects
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    More turnkey interior and architectural executions in Jaipur &amp; Rajasthan.
                  </p>
                </div>
                <Link
                  to="/projects"
                  className="text-[#E6B566] hover:underline text-sm font-medium hidden sm:inline-block"
                >
                  View All Projects &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedProjects.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/projects/${rp.slug || rp.id}`}
                    className="group block bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#E6B566]/40 transition duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                      <img
                        src={rp.image || "/assets/Placeholder/placeholder.jpg"}
                        alt={rp.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={handleImgError}
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#E6B566] text-[10px] font-semibold uppercase tracking-wider border border-white/10">
                        {rp.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-serif text-white group-hover:text-[#E6B566] transition mb-1">
                        {rp.title}
                      </h3>
                      <p className="text-gray-400 text-xs">{rp.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
