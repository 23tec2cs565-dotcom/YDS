// src/components/TeamMember.tsx
import React, { useState } from "react";
import { Mail, Phone, MessageCircle, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { TeamMember as TeamMemberType } from "../data/team";

interface TeamMemberProps {
  member: TeamMemberType;
  index?: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member, index = 0 }) => {
  const buildSrcSet = () => {
    const parts: string[] = [];
    if (member.image480) parts.push(`${member.image480} 480w`);
    if (member.image768) parts.push(`${member.image768} 768w`);
    if (member.image) parts.push(`${member.image} 1024w`);
    return parts.join(", ");
  };

  const srcSet = buildSrcSet();
  const sizes = "(max-width:600px) 480px, (max-width:1024px) 768px, 1024px";

  const initials =
    (member.name || "")
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const placeholderSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><rect width='100%' height='100%' fill='#1a1a2e'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui, sans-serif' font-size='180' fill='#E6B566'>${initials}</text></svg>`
  );
  const placeholderDataUrl = `data:image/svg+xml;utf8,${placeholderSvg}`;

  const [imgSrc, setImgSrc] = useState<string>(member.image || placeholderDataUrl);
  const onImgError = () => {
    if (imgSrc !== placeholderDataUrl) setImgSrc(placeholderDataUrl);
  };

  const whatsappDigits = member.contact?.whatsapp
    ? member.contact.whatsapp.replace(/[^0-9+]/g, "")
    : "";

  const showBadge =
    !!(member.badge && member.badge.toString().trim().length > 0) ||
    (member.isFounder && member.badge?.toLowerCase?.() !== "member");

  const badgeText =
    member.badge && member.badge.toString().trim().length > 0
      ? member.badge
      : member.isFounder
      ? "Founder"
      : "";

  return (
    <motion.article
      id={`member-${member.id}`}
      tabIndex={-1}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-[#0B1220] shadow-lg hover:shadow-2xl hover:shadow-black/20 transition-shadow duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6B566]/30"
      role="article"
      aria-label={`Team member: ${member.name}`}
    >
      {/* Image with overlay */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={imgSrc}
          srcSet={srcSet || undefined}
          sizes={srcSet ? sizes : undefined}
          alt={`${member.name} — ${member.role} at Younick Design Studio`}
          title={`${member.name} — ${member.role} at Younick Design Studio`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={onImgError}
        />

        {/* Gradient overlay — always visible, deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

        {/* Badge */}
        {showBadge && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center rounded-full bg-[#E6B566] text-[#0B1220] px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-lg">
              {badgeText}
            </span>
          </div>
        )}

        {/* Bottom content overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 pb-6">
          {/* Role */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#E6B566] mb-1.5">
            {member.role}
          </p>

          {/* Name */}
          <h3 className="text-xl font-serif font-medium text-white leading-tight mb-2">
            {member.name}
          </h3>

          {/* Description — appears on hover */}
          <p className="text-sm text-white/60 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {member.description}
          </p>

          {/* Expertise — appears on hover */}
          {Array.isArray(member.expertise) && member.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
              {member.expertise.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] text-white/70 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Social & Contact — appears on hover */}
          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
            {member.contact?.email && (
              <a
                href={`mailto:${member.contact.email}`}
                aria-label={`Email ${member.name}`}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#E6B566] hover:text-[#0B1220] transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Mail size={14} />
              </a>
            )}
            {member.contact?.phone && (
              <a
                href={`tel:${member.contact.phone}`}
                aria-label={`Call ${member.name}`}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#E6B566] hover:text-[#0B1220] transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={14} />
              </a>
            )}
            {whatsappDigits && (
              <a
                href={`https://wa.me/${whatsappDigits.replace(/^\+/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${member.name}`}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-green-500 hover:text-white transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle size={14} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn`}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#0077b5] hover:text-white transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin size={14} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} Instagram`}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default TeamMember;
