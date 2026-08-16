// src/components/ProjectModal.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X as CloseIcon, ArrowLeft, ArrowRight, MapPin, Calendar, Maximize2, User, Play, IndianRupee } from "lucide-react";
import type { Project } from "../data/projects";

type Props = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  related?: Project[];
  onSelectRelated?: (project: Project) => void;
};

const isVideo = (url?: string) => Boolean(url && /\.(mp4|webm|mov)(\?.*)?$/i.test(url));

export default function ProjectModal({ project, isOpen, onClose, related = [], onSelectRelated }: Props) {
  // prefer a dedicated modal root if provided
  const portalRoot =
    typeof document !== "undefined" ? document.getElementById("modal-root") || document.body : null;

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevActiveElement = useRef<HTMLElement | null>(null);
  const prevBodyOverflow = useRef<string | null>(null);
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

  // touch/pointer swipe refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const handleClose = useCallback(() => {
    setAnimating(true);
    // small delay to allow fade-out
    setTimeout(() => {
      setAnimating(false);
      onClose();
    }, 150);
  }, [onClose]);

  useEffect(() => {
    if (project) setActiveIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  // open/close side effects: keyboard, focus trapping, body scroll, restore focus
  useEffect(() => {
    if (!isOpen) {
      // ensure body scroll is restored if something left it locked
      if (prevBodyOverflow.current !== null) {
        document.body.style.overflow = prevBodyOverflow.current;
        prevBodyOverflow.current = null;
      }
      // restore focus on close after animation
      if (prevActiveElement.current) {
        try { (prevActiveElement.current as HTMLElement).focus(); } catch { /* ignore */ }
      }
      return;
    }

    // save previously focused element to restore later
    prevActiveElement.current = document.activeElement as HTMLElement | null;

    // lock body scroll
    prevBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus the close button when modal opens
    setTimeout(() => closeBtnRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((i) => Math.min((project?.images?.length || 1) - 1, i + 1));
        return;
      }
      if (e.key === "Tab") {
        // focus trap: gather focusable elements inside dialog
        const root = dialogRef.current;
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null); // visible only
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
      // restore focus after a tick (in case onClose handles animation)
      setTimeout(() => {
        try { prevActiveElement.current?.focus(); } catch { /* ignore */ }
      }, 60);
    };
  }, [isOpen, project, handleClose]);

  const imgs = project?.images && project.images.length ? project.images : project?.image ? [project.image] : [];

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  // pointer swipe on the viewer area for touch + mouse presses
  useEffect(() => {
    if (!isOpen || !project) return;
    const el = dialogRef.current?.querySelector<HTMLDivElement>(".modal-image-area");
    if (!el || imgs.length <= 1) return;

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
          // swipe left -> next
          setActiveIndex((i) => Math.min(imgs.length - 1, i + 1));
        } else {
          // swipe right -> prev
          setActiveIndex((i) => Math.max(0, i - 1));
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
  }, [isOpen, project, imgs.length]);

  if (!portalRoot || !isOpen || !project) return null;

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
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        onClick={stop}
        className="relative z-10 mx-auto w-full max-w-7xl max-h-[96vh] md:h-[92vh] rounded-2xl md:rounded-3xl overflow-hidden border border-[#2A2A2E] shadow-2xl transform bg-gradient-to-br from-[#0d0d0f] via-[#121214] to-[#1b1b1f] text-[#EAEAEA] flex flex-col"
      >
        {/* Close */}
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
          {/* Image/Video area */}
          <div className="modal-image-area relative h-[40vh] sm:h-[48vh] md:h-full md:w-[55%] lg:w-[58%] shrink-0 bg-[#0d0d0f] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full p-3 sm:p-5 md:p-6 flex items-center justify-center">
              {isVideo(imgs[activeIndex]) ? (
                <video
                  key={imgs[activeIndex]}
                  src={imgs[activeIndex]}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="max-h-full max-w-full object-contain rounded-lg md:rounded-xl shadow-xl"
                />
              ) : (
                <img
                  src={imgs[activeIndex]}
                  alt={`${project.title} ${activeIndex + 1}`}
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
              )}
            </div>

            {/* left/right arrows */}
            {imgs.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setActiveIndex((i) => Math.max(0, i - 1));
                  }}
                  disabled={activeIndex === 0}
                  className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 text-white p-2 sm:p-3 hover:bg-[#E6B566] hover:text-black transition disabled:opacity-30 backdrop-blur-md"
                >
                  <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>

                <button
                  aria-label="Next image"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setActiveIndex((i) => Math.min(imgs.length - 1, i + 1));
                  }}
                  disabled={activeIndex === imgs.length - 1}
                  className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 text-white p-2 sm:p-3 hover:bg-[#E6B566] hover:text-black transition disabled:opacity-30 backdrop-blur-md"
                >
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>

                {/* page dots */}
                <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 sm:gap-2">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to item ${i + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(i);
                      }}
                      className={`h-1.5 sm:h-2 rounded-full transition-all ${i === activeIndex ? "w-6 sm:w-9 bg-[#E6B566]" : "w-2 sm:w-3 bg-white/40"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details panel */}
          <aside className="md:w-[45%] lg:w-[42%] h-auto md:h-full overflow-y-auto p-5 sm:p-8 lg:p-10 bg-gradient-to-b from-[#111111] via-[#18181B] to-[#1E1E21]">
            <div className="space-y-6">
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
                </div>

                <h2 className="text-3xl font-serif text-white mb-2">{project.title}</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 ${getLocationStyles()}`}>
                    <MapPin size={14} /> {project.location}
                  </span>
                </div>
              </header>

              <div className="text-white/80 leading-relaxed">
                {project.longDescription || project.description}
              </div>

              {project.outcome && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-bold text-white/40 uppercase mb-2">Outcome</div>
                  <div className="text-sm text-white/80">{project.outcome}</div>
                </div>
              )}

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

              {imgs.length > 1 && (
                <div>
                  <h4 className="text-xs font-bold text-white/40 uppercase mb-3">Gallery</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {imgs.map((src, i) => {
                      const itemIsVideo = isVideo(src);
                      return (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(i);
                          }}
                          aria-label={`Media ${i + 1}`}
                          className={`relative overflow-hidden rounded-md border transition ${i === activeIndex ? "border-[#E6B566] scale-105" : "border-transparent opacity-70 hover:opacity-100"}`}
                        >
                          {itemIsVideo ? (
                            <div className="h-16 w-full bg-black/80 flex items-center justify-center relative">
                              <video src={src} className="h-16 w-full object-cover opacity-60" muted />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <Play size={18} className="text-[#E6B566] fill-[#E6B566]" />
                              </div>
                            </div>
                          ) : (
                            <img
                              src={src}
                              alt={`${project.title} ${i + 1}`}
                              className="h-16 w-full object-cover"
                              onError={(e) => {
                                const img = e.currentTarget;
                                img.onerror = null;
                                img.src = "/assets/placeholder.jpg";
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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
                              img.src = "/assets/placeholder.jpg";
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
                  <img src="/icons/whatsapp-logo new.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
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
