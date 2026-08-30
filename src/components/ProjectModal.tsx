// src/components/ProjectModal.tsx
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { 
  X as CloseIcon, 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Maximize2, 
  User, 
  Play, 
  IndianRupee, 
  Image as ImageIcon, 
  Film,
  Sparkles
} from "lucide-react";
import type { Project } from "../data/projects";

type Props = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  related?: Project[];
  onSelectRelated?: (project: Project) => void;
};

export default function ProjectModal({ project, isOpen, onClose, related = [], onSelectRelated }: Props) {
  // Prefer a dedicated modal root if provided
  const portalRoot =
    typeof document !== "undefined" ? document.getElementById("modal-root") || document.body : null;

  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevActiveElement = useRef<HTMLElement | null>(null);
  const prevBodyOverflow = useRef<string | null>(null);

  const imagesList = useMemo(() => {
    if (project?.images && project.images.length > 0) return project.images;
    if (project?.image) return [project.image];
    return [];
  }, [project]);

  const videosList = useMemo(() => {
    return project?.videos && project.videos.length > 0 ? project.videos : [];
  }, [project]);

  const hasVideos = videosList.length > 0;
  const hasPhotos = imagesList.length > 0;

  const isInProgress = !project?.completionDate || /in progress/i.test(project?.completionDate || "");

  const getCategoryStyles = (category?: string) => {
    const key = (category || "").toLowerCase();
    if (key.includes("interior")) return "bg-[#F6E7C5] text-[#6B4E16] border-[#E9C982]";
    if (key.includes("construction")) return "bg-[#E3ECF8] text-[#1F3B5B] border-[#BBD1EE]";
    if (key.includes("renovation")) return "bg-[#F5E0D1] text-[#6B3E1E] border-[#E9BFA0]";
    if (key.includes("3d")) return "bg-[#EAE3F7] text-[#3F2B6B] border-[#CDBEF0]";
    if (key.includes("consult")) return "bg-[#E2F0E6] text-[#1F5133] border-[#B7D9C1]";
    return "bg-[#F5F0E8] text-[#493E25] border-[#E6B566]/30";
  };

  const getLocationStyles = () => "bg-[#EEF2F6] text-[#425466] border-[#D7E0EA]";

  // Touch/pointer swipe refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const handleClose = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      onClose();
    }, 150);
  }, [onClose]);

  // Reset indices on project change
  useEffect(() => {
    if (project) {
      setActivePhotoIndex(0);
      setActiveVideoIndex(0);
      setActiveTab("photos");
    }
  }, [project?.id]);

  // Open/close side effects: keyboard, focus trapping, body scroll, restore focus
  useEffect(() => {
    if (!isOpen) {
      if (prevBodyOverflow.current !== null) {
        document.body.style.overflow = prevBodyOverflow.current;
        prevBodyOverflow.current = null;
      }
      if (prevActiveElement.current) {
        try { (prevActiveElement.current as HTMLElement).focus(); } catch { /* ignore */ }
      }
      return;
    }

    prevActiveElement.current = document.activeElement as HTMLElement | null;
    prevBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setTimeout(() => closeBtnRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeTab === "photos" && hasPhotos) {
          setActivePhotoIndex((i) => Math.max(0, i - 1));
        } else if (activeTab === "videos" && hasVideos) {
          setActiveVideoIndex((i) => Math.max(0, i - 1));
        }
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (activeTab === "photos" && hasPhotos) {
          setActivePhotoIndex((i) => Math.min(imagesList.length - 1, i + 1));
        } else if (activeTab === "videos" && hasVideos) {
          setActiveVideoIndex((i) => Math.min(videosList.length - 1, i + 1));
        }
        return;
      }
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (prevBodyOverflow.current !== null) {
        document.body.style.overflow = prevBodyOverflow.current;
        prevBodyOverflow.current = null;
      }
      setTimeout(() => {
        try { prevActiveElement.current?.focus(); } catch { /* ignore */ }
      }, 60);
    };
  }, [isOpen, project, handleClose, activeTab, hasPhotos, hasVideos, imagesList.length, videosList.length]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  // Pointer swipe on the viewer area
  useEffect(() => {
    if (!isOpen || !project) return;
    const el = dialogRef.current?.querySelector<HTMLDivElement>(".modal-image-area");
    const currentCount = activeTab === "photos" ? imagesList.length : videosList.length;
    if (!el || currentCount <= 1) return;

    const onPointerDown = (ev: PointerEvent) => {
      touchStartX.current = ev.clientX;
      touchEndX.current = null;
      try { (ev.target as Element).setPointerCapture?.(ev.pointerId); } catch { /* ignore */ }
    };
    const onPointerMove = (ev: PointerEvent) => {
      if (touchStartX.current === null) return;
      touchEndX.current = ev.clientX;
    };
    const onPointerUp = (ev: PointerEvent) => {
      if (touchStartX.current === null) return;
      touchEndX.current = touchEndX.current ?? ev.clientX;
      const dx = (touchStartX.current ?? 0) - (touchEndX.current ?? 0);
      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        if (dx > 0) {
          if (activeTab === "photos") {
            setActivePhotoIndex((i) => Math.min(imagesList.length - 1, i + 1));
          } else {
            setActiveVideoIndex((i) => Math.min(videosList.length - 1, i + 1));
          }
        } else {
          if (activeTab === "photos") {
            setActivePhotoIndex((i) => Math.max(0, i - 1));
          } else {
            setActiveVideoIndex((i) => Math.max(0, i - 1));
          }
        }
      }
      touchStartX.current = null;
      touchEndX.current = null;
      try { (ev.target as Element).releasePointerCapture?.(ev.pointerId); } catch { /* ignore */ }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [isOpen, project, activeTab, imagesList.length, videosList.length]);

  if (!portalRoot || !isOpen || !project) return null;

  const currentMediaCount = activeTab === "photos" ? imagesList.length : videosList.length;
  const currentMediaIndex = activeTab === "photos" ? activePhotoIndex : activeVideoIndex;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 transition-opacity duration-200 ${
        animating ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        onClick={stop}
        className="relative z-10 mx-auto w-full max-w-7xl max-h-[96vh] md:h-[92vh] rounded-2xl md:rounded-3xl overflow-hidden border border-[#2A2A2E] shadow-2xl transform bg-gradient-to-br from-[#0d0d0f] via-[#121214] to-[#1b1b1f] text-[#EAEAEA] flex flex-col"
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          aria-label="Close project"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute right-3 top-3 sm:right-5 sm:top-5 z-40 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-black/60 sm:bg-white/10 text-gray-200 sm:text-gray-300 hover:bg-white/20 hover:text-white transition backdrop-blur-md"
        >
          <CloseIcon size={18} className="sm:w-5 sm:h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
          
          {/* ═════════════════════════════════════════════
              MAIN VIEWER AREA (Photos / Videos)
             ═════════════════════════════════════════════ */}
          <div className="modal-image-area relative h-[42vh] sm:h-[50vh] md:h-full md:w-[55%] lg:w-[58%] shrink-0 bg-[#0d0d0f] flex flex-col items-center justify-center overflow-hidden">
            
            {/* Top Media Switcher Tabs (Only shown if project has both photos & videos) */}
            {hasVideos && hasPhotos && (
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-30 flex items-center gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab("photos")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    activeTab === "photos"
                      ? "bg-[#E6B566] text-black shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <ImageIcon size={13} />
                  <span>Photos ({imagesList.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("videos")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    activeTab === "videos"
                      ? "bg-[#E6B566] text-black shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Film size={13} />
                  <span>Videos ({videosList.length})</span>
                </button>
              </div>
            )}

            {/* Main Stage Display */}
            <div className="w-full h-full p-3 sm:p-5 md:p-6 flex items-center justify-center relative">
              {activeTab === "videos" && hasVideos ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <video
                    key={videosList[activeVideoIndex]}
                    src={videosList[activeVideoIndex]}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-h-full max-w-full object-contain rounded-lg md:rounded-xl shadow-2xl bg-black"
                  />
                  <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-[#E6B566] flex items-center gap-1.5 font-medium">
                    <Play size={11} className="fill-[#E6B566]" />
                    <span>Clip {activeVideoIndex + 1} of {videosList.length}</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    key={imagesList[activePhotoIndex]}
                    src={imagesList[activePhotoIndex]}
                    alt={`${project.title} — Architectural Photo ${activePhotoIndex + 1}`}
                    title={`${project.title} — Photo ${activePhotoIndex + 1} by Younick Design Studio`}
                    className="max-h-full max-w-full object-contain rounded-lg md:rounded-xl shadow-xl"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      if (img.src.endsWith(".heic")) {
                        img.src = img.src.replace(/\.heic$/i, ".jpg");
                        return;
                      }
                      img.src = project.image || "/default-project.jpg";
                    }}
                  />
                  <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-white/80 font-medium">
                    Photo {activePhotoIndex + 1} of {imagesList.length}
                  </div>
                </div>
              )}
            </div>

            {/* Left/Right Navigation Arrows */}
            {currentMediaCount > 1 && (
              <>
                <button
                  aria-label="Previous"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    if (activeTab === "photos") {
                      setActivePhotoIndex((i) => Math.max(0, i - 1));
                    } else {
                      setActiveVideoIndex((i) => Math.max(0, i - 1));
                    }
                  }}
                  disabled={currentMediaIndex === 0}
                  className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 text-white p-2 sm:p-3 hover:bg-[#E6B566] hover:text-black transition disabled:opacity-30 backdrop-blur-md"
                >
                  <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>

                <button
                  aria-label="Next"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    if (activeTab === "photos") {
                      setActivePhotoIndex((i) => Math.min(imagesList.length - 1, i + 1));
                    } else {
                      setActiveVideoIndex((i) => Math.min(videosList.length - 1, i + 1));
                    }
                  }}
                  disabled={currentMediaIndex === currentMediaCount - 1}
                  className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 text-white p-2 sm:p-3 hover:bg-[#E6B566] hover:text-black transition disabled:opacity-30 backdrop-blur-md"
                >
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>

                {/* Page Indicator Dots */}
                <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 sm:gap-2">
                  {(activeTab === "photos" ? imagesList : videosList).map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to item ${i + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeTab === "photos") {
                          setActivePhotoIndex(i);
                        } else {
                          setActiveVideoIndex(i);
                        }
                      }}
                      className={`h-1.5 sm:h-2 rounded-full transition-all ${
                        i === currentMediaIndex ? "w-6 sm:w-9 bg-[#E6B566]" : "w-2 sm:w-3 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ═════════════════════════════════════════════
              DETAILS & SEPARATE MEDIA SECTIONS
             ═════════════════════════════════════════════ */}
          <aside className="md:w-[45%] lg:w-[42%] h-auto md:h-full overflow-y-auto p-5 sm:p-8 lg:p-10 bg-gradient-to-b from-[#111111] via-[#18181B] to-[#1E1E21]">
            <div className="space-y-6">
              
              {/* Header */}
              <header>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${getCategoryStyles(project.category)}`}>
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 text-xs uppercase bg-white/5 text-white/60 rounded-full border border-white/10">
                      Featured
                    </span>
                  )}
                  {hasVideos && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#E6B566]/10 text-[#E6B566] border border-[#E6B566]/30">
                      <Play size={10} className="fill-[#E6B566]" />
                      <span>{videosList.length} {videosList.length === 1 ? "Video" : "Videos"}</span>
                    </span>
                  )}
                </div>

                <div className="text-3xl font-serif text-white mb-2">{project.title}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 ${getLocationStyles()}`}>
                    <MapPin size={14} /> {project.location}
                  </span>
                </div>
              </header>

              {/* Description */}
              <div className="text-white/80 leading-relaxed">
                {project.longDescription || project.description}
              </div>

              {/* Outcome */}
              {project.outcome && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-bold text-white/40 uppercase mb-2">Outcome</div>
                  <div className="text-sm text-white/80">{project.outcome}</div>
                </div>
              )}

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-6 border-y border-white/10 py-6">
                {project.area && (
                  <div>
                    <div className="text-[#E6B566] uppercase text-xs flex items-center gap-1 mb-1">
                      <Maximize2 size={12} /> Area
                    </div>
                    <div className="font-medium text-white">{project.area}</div>
                  </div>
                )}

                <div>
                  <div className="text-[#E6B566] uppercase text-xs flex items-center gap-1 mb-1">
                    <Calendar size={12} /> Date
                  </div>
                  <div className={`inline-flex items-center rounded-full border px-2.5 py-1 text-sm ${
                    isInProgress ? "bg-[#FCE6B0] text-[#6B4E16] border-[#F5C970]" : "bg-white/5 text-white border-white/10"
                  }`}>
                    {project.completionDate || "In Progress"}
                  </div>
                </div>

                {project.clientContact && project.clientContact.toLowerCase() !== "available upon request" && (
                  <div>
                    <div className="text-[#E6B566] uppercase text-xs flex items-center gap-1 mb-1">
                      <User size={12} /> Client
                    </div>
                    <div className="font-medium text-white truncate" title={project.clientContact}>
                      {project.clientContact}
                    </div>
                  </div>
                )}

                {project.budget && (
                  <div>
                    <div className="text-[#E6B566] uppercase text-xs flex items-center gap-1 mb-1">
                      <IndianRupee size={12} /> Budget
                    </div>
                    <div className="font-medium text-[#E6B566]">{project.budget}</div>
                  </div>
                )}
              </div>

              {/* Scope of Work */}
              {project.workScope && project.workScope.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-white/40 uppercase mb-3">Scope of Work</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.workScope.map((s, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────
                  SECTION 1: PHOTO GALLERY (Photos Only)
                 ─────────────────────────────────────────── */}
              {imagesList.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon size={14} className="text-[#E6B566]" />
                      <span>Photo Gallery ({imagesList.length})</span>
                    </h4>
                    {activeTab === "photos" && (
                      <span className="text-[10px] text-[#E6B566] font-medium">Viewing Photo #{activePhotoIndex + 1}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-2.5">
                    {imagesList.map((src, i) => {
                      const isSelected = activeTab === "photos" && i === activePhotoIndex;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab("photos");
                            setActivePhotoIndex(i);
                          }}
                          aria-label={`Photo ${i + 1}`}
                          className={`relative overflow-hidden rounded-lg border transition-all aspect-[4/3] bg-black/40 ${
                            isSelected
                              ? "border-[#E6B566] ring-2 ring-[#E6B566]/40 scale-105 shadow-lg shadow-[#E6B566]/10"
                              : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                          }`}
                        >
                          <img
                            src={src}
                            alt={`${project.title} photo ${i + 1}`}
                            title={`${project.title} — Photo ${i + 1}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const img = e.currentTarget;
                              img.onerror = null;
                              img.src = "/assets/Placeholder/placeholder.jpg";
                            }}
                          />
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white/80">
                            #{i + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────
                  SECTION 2: VIDEO WALKTHROUGHS (Videos Only)
                 ─────────────────────────────────────────── */}
              {hasVideos && (
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-[#E6B566] uppercase tracking-wider flex items-center gap-2">
                      <Film size={14} className="text-[#E6B566]" />
                      <span>Video Walkthroughs ({videosList.length})</span>
                    </h4>
                    {activeTab === "videos" && (
                      <span className="text-[10px] text-[#E6B566] font-medium">Playing Clip #{activeVideoIndex + 1}</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {videosList.map((videoSrc, idx) => {
                      const isSelected = activeTab === "videos" && idx === activeVideoIndex;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab("videos");
                            setActiveVideoIndex(idx);
                          }}
                          className={`relative overflow-hidden rounded-xl border transition-all text-left group/vid flex flex-col ${
                            isSelected
                              ? "border-[#E6B566] ring-2 ring-[#E6B566]/50 bg-[#E6B566]/10 shadow-lg shadow-[#E6B566]/15"
                              : "border-white/10 bg-white/5 hover:border-[#E6B566]/40 hover:bg-white/10"
                          }`}
                        >
                          {/* Mini video visual / poster area */}
                          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                            <video
                              src={videoSrc}
                              className="h-full w-full object-cover opacity-50 group-hover/vid:opacity-75 transition-opacity"
                              muted
                              preload="metadata"
                            />
                            {/* Central play button */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-transform ${
                              isSelected ? "scale-110" : "group-hover/vid:scale-110"
                            }`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-md ${
                                isSelected ? "bg-[#E6B566] text-black" : "bg-black/70 text-[#E6B566] border border-[#E6B566]/40"
                              }`}>
                                <Play size={14} className="fill-current ml-0.5" />
                              </div>
                            </div>
                            <span className="absolute top-1 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[8.5px] font-mono text-[#E6B566] border border-[#E6B566]/20">
                              CLIP {idx + 1}
                            </span>
                          </div>

                          {/* Card label */}
                          <div className="p-2 flex items-center justify-between">
                            <span className="text-[11px] font-medium text-white truncate">
                              Walkthrough {idx + 1}
                            </span>
                            <span className={`text-[9px] uppercase tracking-wider font-semibold ${
                              isSelected ? "text-[#E6B566]" : "text-white/40"
                            }`}>
                              {isSelected ? "Active" : "Play"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {related.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-white/40 uppercase mb-3">Related Projects</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {related.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRelated?.(p);
                        }}
                        className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-left hover:border-[#E6B566]/60 transition"
                      >
                        <div className="h-12 w-16 overflow-hidden rounded-md bg-black/40 flex-shrink-0">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const img = e.currentTarget;
                              img.onerror = null;
                              img.src = "/assets/Placeholder/placeholder.jpg";
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white truncate">{p.title}</div>
                          <div className="text-xs text-white/50 truncate">{p.location}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-4">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#3A3A3F] bg-[#1F1F22] px-4 py-2 text-sm text-[#E6B566]">
                    View Live
                  </a>
                )}
                <a
                  href={`https://wa.me/918854883058?text=${encodeURIComponent(
                    `Hi Younick Studio! I saw your portfolio project: ${project.title} (${project.location}) and would like to discuss a similar design/execution.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-3.5 py-2 text-sm text-[#25D366] hover:bg-[#25D366] hover:text-black font-medium transition flex items-center gap-1.5"
                >
                  <img src="/icons/whatsapp-logo-new.png" alt="WhatsApp Consultation" title="Chat on WhatsApp with Younick Design Studio" className="w-6 h-6 object-contain" />
                  <span>WhatsApp</span>
                </a>
                <a href="/contact" className="rounded-md bg-[#E6B566] px-4 py-2 text-sm text-[#1b1b1b] font-semibold shadow-lg shadow-[#E6B566]/20">
                  Start a Project
                </a>
                <button onClick={handleClose} className="rounded-md border border-[#3A3A3F] bg-[#1F1F22] px-4 py-2 text-sm text-white/80 hover:text-white">
                  Close
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>,
    portalRoot
  );
}
