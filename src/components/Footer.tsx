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
    } px-7 py-3.5 text-xs font-${isGold ? "bold" : "medium"} uppercase tracking-widest backdrop-blur-xl transition-all duration-300 ${className}`,
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
        <Link to={href} {...(btnProps as unknown as React.ComponentProps<typeof Link>)}>
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
  { href: "/projects?filter=Interior%20Design", label: "Interior Design" },
  { href: "/projects?filter=Construction", label: "Construction" },
  { href: "/projects?filter=Renovation", label: "Renovation" },
  { href: "/projects?filter=Consultation", label: "Consultation" },
  { href: "/projects?filter=3D%20Visualization", label: "3D Visualization" },
];

// 7 items → grid-cols-2 → 4 rows × 2 cols
const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Portfolio", href: "/projects" },
  { label: "Our Process", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Careers", href: "/career" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const Footer: React.FC = () => {
  return (
    <>
      {/* ── Gradient bridge: white page → dark footer ── */}
      <div
        aria-hidden="true"
        className="h-14 w-full"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 0%, #f4f3f0 25%, #1f1f22 75%, #18181B 100%)",
        }}
      />

      <footer
        aria-label="Site Footer"
        className="relative overflow-hidden bg-[#18181B] text-white"
      >
        {/* Ambient warm glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute right-[-5rem] top-0 h-80 w-80 rounded-full bg-[#E6B566]/5 blur-[90px]" />
          <div className="absolute left-[-3rem] bottom-0 h-64 w-64 rounded-full bg-[#E6B566]/4 blur-[70px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* ── CTA Banner — horizontal, mid-height ── */}
          <section className="flex flex-col gap-8 border-b border-white/8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
            {/* Left: eyebrow + headline + sub-copy */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E6B566]">
                <span className="h-px w-7 bg-[#E6B566]" />
                Younick Design Studio · Jaipur
              </span>
              <h2 className="mt-4 font-serif text-3xl leading-snug text-white lg:text-[2.75rem] lg:leading-tight">
                Every great space starts with a{" "}
                <span className="italic text-[#E6B566]">single conversation.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                From concept to completion — we bring calm planning, better material
                clarity, and refined execution to every project.
              </p>
            </div>

            {/* Right: CTAs */}
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <GlassBtn href="/contact" variant="gold">
                Start Your Project
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </GlassBtn>

              <GlassBtn href="/projects" variant="neutral">
                View Portfolio
              </GlassBtn>
            </div>
          </section>

          {/* ── 4-column links ── */}
          <section className="grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-11">

            {/* Col 1: Brand + socials */}
            <div>
              <a href="/" className="inline-flex items-center gap-3">
                <img
                  src="/younick-logo.PNG"
                  alt="Younick Design Studio"
                  width="54"
                  height="54"
                  className="h-[3.375rem] w-auto brightness-110"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="text-[1.55rem] font-bold tracking-tight text-white leading-tight">Younick</p>
                  <p className="text-[12.5px] uppercase tracking-[0.32em] text-[#E6B566]">Design Studio</p>
                </div>
              </a>

              <p className="mt-4 max-w-xs text-xs leading-relaxed text-gray-400">
                Interior design, construction, renovation and 3D visualization — crafted
                with calm precision from Jaipur.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
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
              <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6B566]">
                Services
              </h3>
              <nav className="mt-4 grid grid-cols-2 gap-x-3 gap-y-0.5">
                {serviceList.map((service) => (
                  <Link
                    key={service.label}
                    to={service.href}
                    className="group relative py-2 text-xs text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="block truncate">{service.label}</span>
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#E6B566]/50 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 3: Company — 2 cols × 4 rows */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6B566]">
                Company
              </h3>
              <nav className="mt-4 grid grid-cols-2 gap-x-3 gap-y-0.5">
                {companyLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="group relative py-2 text-xs text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="block truncate">{link.label}</span>
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#E6B566]/50 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E6B566]">
                Get In Touch
              </h3>
              <div className="mt-4 space-y-3">
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

          <div className="flex flex-col gap-2 py-5 text-[10px] text-gray-400 md:flex-row md:items-center md:justify-between">
            <p className="font-mono uppercase tracking-[0.22em]">
              © {new Date().getFullYear()} Younick Design Studio. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-5 font-mono">
              <Link to="/privacy" className="transition-colors duration-300 hover:text-[#E6B566]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors duration-300 hover:text-[#E6B566]">
                Terms of Service
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
