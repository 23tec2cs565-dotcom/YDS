"use client";
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Mail,
  MapPin,
  Phone,
  Youtube as YoutubeIcon,
} from "lucide-react";
import { projects } from "../data/projects";

const socials = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/studio.younick",
    label: "Instagram",
    hoverColor: "group-hover:text-[#E4405F]",
    hoverBorder: "group-hover:border-[#E4405F]/50",
  },
  {
    icon: FacebookIcon,
    href: "https://www.facebook.com/studioyounick",
    label: "Facebook",
    hoverColor: "group-hover:text-[#1877F2]",
    hoverBorder: "group-hover:border-[#1877F2]/50",
  },
  {
    icon: YoutubeIcon,
    href: "https://www.youtube.com/@Younickdesignstudio",
    label: "YouTube",
    hoverColor: "group-hover:text-[#FF0000]",
    hoverBorder: "group-hover:border-[#FF0000]/50",
  },
];

const serviceLinks = [
  { href: "/services/interior-design", label: "Luxury Interior Design" },
  { href: "/services/construction", label: "Turnkey Construction" },
  { href: "/services/renovation", label: "Space Renovation" },
  { href: "/services/consultation", label: "Design Consultation" },
  { href: "/services/3d-visualization", label: "3D Architectural Viz" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Our Portfolio" },
  { href: "/blog", label: "Blog & Insights" },
  { href: "/team", label: "Our Team" },
  { href: "/faq", label: "FAQ & Pricing" },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-[#080D17] text-stonecream relative overflow-hidden"
      data-purpose="full-bleed-footer"
      id="contact"
      aria-label="Site Footer"
    >
      {/* ── Thin Grey Architectural CAD Drafting Grid Background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 90% 75% at 50% 30%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 75% at 50% 30%, #000 50%, transparent 100%)",
        }}
      />

      {/* Ambient warm gold lighting highlights */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute right-[-5%] top-[10%] h-[550px] w-[550px] rounded-full bg-[#E6B566]/8 blur-[140px]" />
        <div className="absolute left-[-5%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-[#B08D57]/6 blur-[130px]" />
      </div>

      {/* ── Top Architectural Metadata Strip ── */}
      <div className="relative z-10 border-b border-white/10 bg-white/[0.02] backdrop-blur-sm px-4 sm:px-8 py-3.5 text-[11px] font-mono tracking-widest text-stonecream/60 uppercase flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brass-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brass-400" />
          </span>
          <span className="text-white/80 font-medium">YOUNICK DESIGN STUDIO • JAIPUR ARCHITECTURE &amp; LUXURY INTERIORS</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-stonecream/70">
          <span>{projects.length}+ SIGNATURE PROJECTS</span>
          <span className="text-white/20">•</span>
          <span>TURNKEY EXECUTION</span>
          <span className="text-white/20">•</span>
          <span>BESPOKE CRAFTSMANSHIP</span>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="relative z-10 max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 md:py-24">

        {/* ── CTA Banner — Luxury Framed Card ── */}
        <section className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.05] backdrop-blur-md p-6 sm:p-10 md:p-14 lg:p-16 shadow-2xl overflow-hidden group mb-16 sm:mb-20">
          {/* Subtle warm glow orbs inside card */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#E6B566]/10 blur-[80px]" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-[#B08D57]/8 blur-[80px]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Eyebrow + Headline + Copy */}
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-brass-400 block mb-3 sm:mb-4">
                ✦ Younick Design Studio • Jaipur
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight text-white">
                Every great space starts with a <br className="hidden sm:inline" />
                <span className="italic font-serif bg-gradient-to-r from-[#F5D899] via-[#E6B566] to-[#C5A059] bg-clip-text text-transparent">
                  single conversation.
                </span>
              </h2>
              <p className="text-stonecream/70 text-sm sm:text-base md:text-lg max-w-2xl mt-4 sm:mt-5 font-light leading-relaxed">
                From architectural concept to meticulous execution, we bring clarity, high-end material selection, and timeless sophistication to every space.
              </p>
            </div>

            {/* Right: Polished Action Buttons */}
            <div className="flex shrink-0 flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-[#E6B566] text-[#080D17] hover:bg-[#F5D899] px-7 sm:px-8 py-3.5 sm:py-4 font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E6B566]/20 hover:shadow-[#E6B566]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Start Your Project</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] text-white hover:bg-white/10 hover:border-white/50 px-7 sm:px-8 py-3.5 sm:py-4 font-mono text-xs font-medium uppercase tracking-wider backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>View Portfolio</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Footer Directory ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pt-8 sm:pt-10">

          {/* Col 1: Brand Info (span 5) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <img
                src="/younick-logo.webp"
                alt="Younick Design Studio — Signature Monogram"
                title="Younick Design Studio — Luxury Interior Architecture & Turnkey Construction"
                width="48"
                height="48"
                className="h-11 sm:h-12 w-auto object-contain brightness-110 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  YOUNICK
                </span>
                <span className="font-mono text-[9px] tracking-widest text-brass-400 uppercase block mt-1">
                  Design Studio
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stonecream/70 max-w-sm leading-relaxed font-light">
              Interior design, construction, renovation and 3D visualization crafted with calm precision from Jaipur, serving discerning patrons across India.
            </p>

            {/* Social Media Badges */}
            <div className="flex items-center gap-3 pt-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    aria-label={social.label}
                    className={`group w-9 h-9 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-stonecream/80 hover:bg-white/10 ${social.hoverBorder} transition-all duration-300`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={16} className={`transition-colors duration-300 ${social.hoverColor}`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Services (span 2) */}
          <div className="lg:col-span-2">
            <h5 className="font-mono text-xs uppercase tracking-widest text-brass-400 mb-4 sm:mb-5 font-semibold">
              Services
            </h5>
            <ul className="space-y-3 text-xs sm:text-[13px] text-stonecream/70">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company (span 2) */}
          <div className="lg:col-span-2">
            <h5 className="font-mono text-xs uppercase tracking-widest text-brass-400 mb-4 sm:mb-5 font-semibold">
              Company
            </h5>
            <ul className="space-y-3 text-xs sm:text-[13px] text-stonecream/70">
              {companyLinks.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Get in Touch (span 3) */}
          <div className="lg:col-span-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-brass-400 mb-4 sm:mb-5 font-semibold">
              Get in Touch
            </h5>
            <div className="space-y-3.5 text-xs sm:text-[13px] text-stonecream/70">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-brass-400 shrink-0" />
                <div>
                  <span className="block text-white font-medium text-xs">Visit Studio</span>
                  <a
                    href="https://maps.google.com/?q=Orbit+Mall+Civil+Lines+Jaipur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brass-300 transition-colors leading-snug block mt-0.5"
                  >
                    Orbit Mall, Civil Lines, Jaipur
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={15} className="mt-0.5 text-brass-400 shrink-0" />
                <div>
                  <span className="block text-white font-medium text-xs">Direct Line</span>
                  <a
                    className="hover:text-brass-300 transition-colors block mt-0.5"
                    href="tel:+918854883058"
                    onClick={() => {
                      if (typeof window !== "undefined" && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
                        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
                          event: "phone_call_clicked",
                          phone_number: "+918854883058",
                          lead_type: "phone_call",
                          page_location: window.location.href,
                        });
                      }
                    }}
                  >
                    +91 88548 83058
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 text-brass-400 shrink-0" />
                <div>
                  <span className="block text-white font-medium text-xs">Official Inquiry</span>
                  <a
                    className="hover:text-brass-300 transition-colors block mt-0.5"
                    href="mailto:studioyounick@gmail.com"
                  >
                    studioyounick@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar / Copyright ── */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stonecream/50 gap-4">
          <div>
            © {new Date().getFullYear()} YOUNICK DESIGN STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <Link className="hover:text-white transition-colors" href="/faq">
              Help
            </Link>
            <Link className="hover:text-white transition-colors" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-white transition-colors" href="/terms">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
