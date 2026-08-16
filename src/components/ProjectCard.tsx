import React, { useState } from "react";
import { MapPin, ArrowUpRight, User, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";
import { getCategoryStyles } from "../utils/categoryStyles";
import { safeCapture } from "../utils/analytics";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const buildSrcSet = (src: string) => {
  if (!src || !src.includes("-1024")) return undefined;
  return [
    src.replace("-1024", "-480") + " 480w",
    src.replace("-1024", "-768") + " 768w",
    src + " 1024w",
  ].join(", ");
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imgSrc =
    project.image ||
    (Array.isArray(project.images) && project.images.length > 0
      ? project.images[0]
      : "/assets/placeholder.jpg");

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    // @ts-expect-error: Setting onerror to null is valid JS but TS expects the exact event handler type
    img.onerror = null;
    img.src = "/assets/placeholder.jpg";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative h-full overflow-hidden rounded-2xl bg-[#0B1220] shadow-lg transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/20 ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={() => {
        safeCapture("project_viewed", {
          project_id: project.id,
          category: project.category,
          location: project.location,
        });
        if (onClick) onClick();
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View project details for ${project.title}` : undefined}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}
        <img
          src={imgSrc}
          srcSet={buildSrcSet(imgSrc)}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          alt={project.title}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={handleImgError}
        />

        {/* Gradient overlay — always visible, deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Category & Budget badges — top left */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex flex-wrap gap-1 sm:gap-2 max-w-[calc(100%-3rem)] sm:max-w-[calc(100%-4rem)]">
          <span
            className={`inline-flex items-center rounded-full border px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${getCategoryStyles(
              project.category
            )}`}
          >
            {project.category}
          </span>
          {project.budget && (
            <span className="hidden sm:inline-flex items-center gap-0.5 rounded-full border border-[#E6B566]/40 bg-[#0B1220]/80 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-[#E6B566] backdrop-blur-md">
              <IndianRupee size={9} className="sm:w-2.5 sm:h-2.5" />
              {project.budget.replace(/^₹\s*/, '')}
            </span>
          )}
        </div>

        {/* View arrow — top right */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
          <div className="h-7 w-7 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-white/15 sm:bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </div>
        </div>

        {/* Bottom content overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-5 pb-3 sm:pb-6">
          {/* Subtitle */}
          {project.subtitle && (
            <p className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#E6B566] mb-0.5 sm:mb-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-3 sm:group-hover:translate-y-0 transition-all duration-300 delay-75">
              {project.subtitle}
            </p>
          )}

          {/* Title */}
          <h3 className="text-sm sm:text-xl font-serif font-medium text-white leading-tight mb-0.5 sm:mb-2 group-hover:translate-y-0 transition-transform duration-300 line-clamp-2">
            {project.title}
          </h3>

          {/* Description — hidden on mobile, expanded on desktop hover */}
          {project.description && (
            <p className="hidden sm:block text-sm text-white/70 leading-relaxed line-clamp-2 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300 delay-100">
              {project.description}
            </p>
          )}

          {/* Location + Area + Client + Date row */}
          <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 sm:gap-y-1 mt-1 sm:mt-3 opacity-90 sm:opacity-80 sm:group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-white/70 sm:text-white/60">
              <MapPin size={11} className="sm:w-3 sm:h-3" />
              {project.location}
            </span>
            {project.area && (
              <span className="hidden sm:contents">
                <span className="text-white/30">·</span>
                <span className="text-[11px] sm:text-xs text-white/70 sm:text-white/60">{project.area}</span>
              </span>
            )}
            {project.clientContact && project.clientContact.toLowerCase() !== "available upon request" && (
              <span className="hidden sm:contents">
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-white/70 sm:text-white/60">
                  <User size={10} className="sm:w-3 sm:h-3" />
                  {project.clientContact}
                </span>
              </span>
            )}
            {project.completionDate && (
              <span className="hidden sm:contents">
                <span className="text-white/30">·</span>
                <span className="text-[11px] sm:text-xs text-white/70 sm:text-white/60">{project.completionDate}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
