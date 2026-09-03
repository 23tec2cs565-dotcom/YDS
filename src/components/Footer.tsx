import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube as YoutubeIcon,
} from "lucide-react";
import { projects } from "../data/projects";

// ── Mouse-tracking glass button ──
interface GlassBtnProps {
  href: string;
  variant: "gold" | "neutral";
  children: React.ReactNode;
  className?: string;
}

const GlassBtn: React.FC<GlassBtnProps> = ({ href, variant, children, className = "" }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const isGold = variant === "gold";

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  // Clamp horizontal movement so shadow never extends past the button borders
  const shadowLeft = Math.max(0, Math.min(40, pos.x - 30));

  const btnProps = {
    ref,
    onMouseMove: onMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      background: isGold
        ? "linear-gradient(135deg, rgba(230,181,102,0.28) 0%, rgba(230,181,102,0.10) 100%)"
        : "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)",
      boxShadow: isGold
        ? "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15), 0 0 28px rgba(230,181,102,0.18), 0 8px 32px rgba(0,0,0,0.35)"
        : "inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.30)",
    },
    className: `group relative z-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border ${
      isGold
        ? "border-[#E6B566]/55 text-[#E6B566]"
        : "border-white/25 text-white/70 hover:text-white"
    } px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs font-${isGold ? "bold" : "medium"} uppercase tracking-widest backdrop-blur-xl transition-all duration-300 ${className}`,
  };

  const innerContent = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-200"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle 80px at ${pos.x}% ${pos.y}%, ${
            isGold ? "rgba(230,181,102,0.45)" : "rgba(255,255,255,0.18)"
          } 0%, transparent 80%)`,
        }}
      />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-t-xl bg-gradient-to-b from-white/20 to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] rounded-b-xl bg-gradient-to-t from-black/20 to-transparent" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 h-full w-[60%] rounded-full z-0"
        style={{
          left: `${shadowLeft}%`,
          background: isGold
            ? "rgba(230,181,102,0.32)"
            : "rgba(200,210,255,0.10)",
          filter: "blur(12px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {href.startsWith("/") ? (
        <Link to={href} ref={ref} onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={btnProps.style} className={btnProps.className}>
          {innerContent}
        </Link>
      ) : (
        <a href={href} {...btnProps}>
          {innerContent}
        </a>
      )}
    </div>
  );
};

const socials = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/studio.younick",
    label: "Instagram",
    hoverColor: "group-hover:text-[#E4405F]",
    hoverBg: "group-hover:bg-[#E4405F]/15",
    hoverBorder: "group-hover:border-[#E4405F]/40",
  },
  {
    icon: FacebookIcon,
    href: "https://www.facebook.com/studioyounick",
    label: "Facebook",
    hoverColor: "group-hover:text-[#1877F2]",
    hoverBg: "group-hover:bg-[#1877F2]/15",
    hoverBorder: "group-hover:border-[#1877F2]/40",
  },
  {
    icon: YoutubeIcon,
    href: "https://www.youtube.com/@Younickdesignstudio",
    label: "YouTube",
    hoverColor: "group-hover:text-[#FF0000]",
    hoverBg: "group-hover:bg-[#FF0000]/15",
    hoverBorder: "group-hover:border-[#FF0000]/40",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/918854883058",
    label: "WhatsApp",
    hoverColor: "group-hover:text-[#25D366]",
    hoverBg: "group-hover:bg-[#25D366]/15",
    hoverBorder: "group-hover:border-[#25D366]/40",
  },
];

// 5 items → grid-cols-2 → 3 rows × 2 cols
const serviceList = [
  { href: "/services/interior-design", label: "Luxury Interior Design" },
  { href: "/services/construction", label: "Turnkey Construction" },
  { href: "/services/renovation", label: "Space Renovation" },
  { href: "/services/consultation", label: "Design Consultation" },
  { href: "/services/3d-visualization", label: "3D Architectural Visualization" },
];

// 8 items → grid-cols-2 → 4 rows × 2 cols
const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Portfolio", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Our Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Career Opportunities", href: "/career" },
  { label: "FAQ & Pricing", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const Footer: React.FC = () => {
  return (
    <>
      {/* ── Architectural Curved & Layered Palette Transition ── */}
      <div className="relative w-full overflow-hidden bg-white">
        {/* Soft Tonal Intermediate Palette Layer (#F6F4EE) with subtle pattern grid */}
        <div className="bg-[#F6F4EE] py-3 sm:py-4 px-4 sm:px-6 border-t border-gray-200/60 relative">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs tracking-wider uppercase text-gray-600 font-medium text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6B566] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B08D57]" />
              </span>
              <strong className="font-semibold tracking-widest text-gray-800">Younick Design Studio</strong>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-gray-500 lowercase tracking-normal italic font-serif text-xs sm:text-sm">Jaipur • Architecture & Luxury Interiors</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] text-gray-600 font-semibold tracking-widest">
              <span className="inline-flex items-center gap-1.5 text-gray-800">
                <span className="text-[#B08D57]">✦</span> {projects.length}+ Signature Projects
              </span>
              <span className="text-gray-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-gray-800">
                <span className="text-[#B08D57]">✦</span> Turnkey Execution
              </span>
              <span className="text-gray-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-gray-800">
                <span className="text-[#B08D57]">✦</span> Bespoke Craftsmanship
              </span>
            </div>
          </div>
        </div>

        {/* Architectural Multi-Curved SVG Divider into Footer */}
        <div className="relative leading-none bg-[#F6F4EE]">
          <svg
            viewBox="0 0 1440 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-6 sm:h-10 md:h-16 lg:h-20 block text-[#18181B]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="goldGradientCurve" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F5D899" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#E6B566" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#B08D57" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Glowing metallic gold accent curve */}
            <path
              d="M0,18 Q720,68 1440,18 L1440,76 L0,76 Z"
              fill="url(#goldGradientCurve)"
            />
            {/* Main sleek architectural dark curve */}
            <path
              d="M0,28 Q720,76 1440,28 L1440,76 L0,76 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <footer
        aria-label="Site Footer"
        className="relative overflow-hidden bg-[#18181B] text-white"
      >
        {/* Ambient warm glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute right-[-5rem] top-0 h-80 w-80 rounded-full bg-[#E6B566]/8 blur-[90px]" />
          <div className="absolute left-[-3rem] bottom-0 h-64 w-64 rounded-full bg-[#E6B566]/5 blur-[70px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* ── CTA Banner — Luxury Framed Card ── */}
          <section className="relative my-6 sm:my-8 md:my-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-r from-[#1A1A1E] via-[#222228] to-[#1A1A1E] p-5 sm:p-8 md:p-12 lg:p-14 shadow-2xl overflow-hidden group">
            {/* Subtle luxury background radial glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#E6B566]/10 blur-[80px]" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#B08D57]/10 blur-[80px]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: eyebrow + headline + sub-copy */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-[#E6B566]/30 bg-[#E6B566]/10 px-3 sm:px-3.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[#E6B566] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E6B566] animate-pulse" />
                  Younick Design Studio · Jaipur
                </div>
                <h2 className="mt-3 sm:mt-5 font-serif text-2xl sm:text-3xl leading-snug text-white md:text-4xl lg:text-[2.85rem] lg:leading-tight">
                  Every great space starts with a{" "}
                  <span className="italic bg-gradient-to-r from-[#F5D899] via-[#E6B566] to-[#C5A059] bg-clip-text text-transparent drop-shadow-sm">
                    single conversation.
                  </span>
                </h2>
                <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-gray-300 max-w-xl">
                  From architectural concept to meticulous execution we bring clarity, high end material selection, and timeless sophistication to every space.
                </p>
              </div>

              {/* Right: Lucrative CTAs */}
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center">
                <GlassBtn href="/contact" variant="gold" className="shadow-lg shadow-[#E6B566]/10">
                  Start Your Project
                </GlassBtn>

                <GlassBtn href="/projects" variant="neutral">
                  View Portfolio
                </GlassBtn>
              </div>
            </div>
          </section>

          {/* ── 4-column links ── */}
          <section className="grid gap-6 sm:gap-8 py-8 sm:py-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-11">

            {/* Col 1: Brand + socials */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="/" className="inline-flex items-center gap-2.5 sm:gap-3">
                <img
                  src="/younick-logo.webp"
                  alt="Younick Design Studio Signature Monogram Branding Footer"
                  title="Younick Design Studio — Luxury Turnkey Interior Architecture Jaipur"
                  width="54"
                  height="54"
                  className="h-10 sm:h-[3.375rem] w-auto brightness-110"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="text-xl sm:text-[1.55rem] font-bold tracking-tight text-white leading-tight">Younick</p>
                  <p className="text-[10px] sm:text-[12.5px] uppercase tracking-[0.32em] text-[#E6B566]">Design Studio</p>
                </div>
              </a>

              <p className="mt-3 sm:mt-4 max-w-xs text-[11px] sm:text-xs leading-relaxed text-gray-400">
                Interior design, construction, renovation and 3D visualization crafted
                with calm precision from Jaipur.
              </p>

              <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`group rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition-all duration-300 ${social.hoverBorder} ${social.hoverBg}`}
                    >
                      <Icon
                        size={19}
                        className={`transition-colors duration-300 ${social.hoverColor}`}
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Col 2: Services — 2 cols × 3 rows */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6B566]">
                Services
              </p>
              <nav className="mt-3 sm:mt-4 grid grid-cols-2 gap-x-3 gap-y-0.5">
                {serviceList.map((service) => (
                  <Link
                    key={service.label}
                    to={service.href}
                    className="group relative py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="block truncate">{service.label}</span>
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#E6B566]/50 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 3: Company — 2 cols × 4 rows */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6B566]">
                Company
              </p>
              <nav className="mt-3 sm:mt-4 grid grid-cols-2 gap-x-3 gap-y-0.5">
                {companyLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="group relative py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="block truncate">{link.label}</span>
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#E6B566]/50 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 4: Contact */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6B566]">
                Get In Touch
              </p>
              <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                <a
                  href="https://maps.google.com/?q=Orbit+Mall+Civil+Lines+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 transition-colors duration-300"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#E6B566]" />
                  <div>
                    <p className="text-xs font-medium text-white/80 group-hover:text-white">Visit Studio</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-gray-500">
                      Orbit Mall, Civil Lines, Jaipur
                    </p>
                  </div>
                </a>

                <a
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
                  className="group flex items-start gap-2.5 transition-colors duration-300"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-[#E6B566]" />
                  <div>
                    <p className="text-xs font-medium text-white/80 group-hover:text-white">Call Us</p>
                    <p className="mt-0.5 text-[11px] text-gray-500">+91 88548 83058</p>
                  </div>
                </a>

                <a
                  href="mailto:studioyounick@gmail.com"
                  className="group flex items-start gap-2.5 transition-colors duration-300"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-[#E6B566]" />
                  <div>
                    <p className="text-xs font-medium text-white/80 group-hover:text-white">Email</p>
                    <p className="mt-0.5 text-[11px] text-gray-500">studioyounick@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

          </section>

          {/* ── Bottom bar ── */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#E6B566]/12 to-transparent" />

          <div className="flex flex-col gap-2 py-4 sm:py-5 text-[9px] sm:text-[10px] text-gray-400 md:flex-row md:items-center md:justify-between text-center md:text-left">
            <p className="font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em]">
              © {new Date().getFullYear()} Younick Design Studio. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-5 font-mono">
              <Link to="/faq" className="transition-colors duration-300 hover:text-[#E6B566]">
                FAQs
              </Link>
              <Link to="/privacy" className="transition-colors duration-300 hover:text-[#E6B566]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors duration-300 hover:text-[#E6B566]">
                Terms of Service
              </Link>
              <Link to="/contact" className="transition-colors duration-300 hover:text-[#E6B566]">
                Inquiries
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
