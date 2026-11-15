"use client";
// src/components/Navigation.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  X as XIcon,
  Menu,
  Home,
  FolderOpen,
  Briefcase,
  MessageSquare,
  Info,
  Users,
  Clipboard,
  BookOpen,
} from "lucide-react";

interface NavigationProps {
  onSearch?: (query: string) => void;
}

type Suggest =
  | { type: "project"; title: string; projectId: string }
  | { type: "team"; name: string; role: string; memberId: string };

const DEBOUNCE = 250;

const navItems = [
  { path: "/", label: "Home", icon: Home, title: "Younick Design Studio Home" },
  { path: "/projects", label: "Projects", icon: FolderOpen, title: "View Architecture & Interior Projects Portfolio" },
  { path: "/services", label: "Services", icon: Briefcase, title: "Turnkey Interior Design & Construction Services" },
  { path: "/about", label: "About", icon: Info, title: "About Younick Design Studio Jaipur" },
  { path: "/contact", label: "Contact", icon: MessageSquare, title: "Contact Our Jaipur Design Studio" },
];

const gridItems = [
  { path: "/", label: "Home", icon: Home, title: "Younick Design Studio Home" },
  { path: "/projects", label: "Portfolio", icon: FolderOpen, title: "View Our Completed Architecture & Interior Projects" },
  { path: "/services", label: "Services", icon: Briefcase, title: "Explore Turnkey Interior & Construction Services" },
  { path: "/about", label: "About Us", icon: Info, title: "Learn About Younick Design Studio Philosophy" },
  { path: "/blog", label: "Blog", icon: BookOpen, title: "Architectural & Interior Design Blog" },
  { path: "/team", label: "Our Team", icon: Users, title: "Meet Our Architects and Interior Designers" },
  { path: "/career", label: "Careers", icon: Clipboard, title: "Explore Career Opportunities at Younick Studio" },
  { path: "/contact", label: "Contact Us", icon: MessageSquare, title: "Get in Touch with Our Jaipur Studio" },
];

const Navigation: React.FC<NavigationProps> = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const [suggests, setSuggests] = useState<Suggest[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname() || "";
  const router = useRouter();

  // typed debounce timer
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock, document class for hiding WhatsApp & full frosted glass overlay, plus drawer focus
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("nav-menu-open");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        drawerRef.current?.focus();
      }, 50);
    } else {
      document.body.classList.remove("nav-menu-open");
      document.body.style.overflow = "";
    }

    window.dispatchEvent(
      new CustomEvent("nav-menu-toggle", { detail: { open: menuOpen } })
    );

    return () => {
      document.body.classList.remove("nav-menu-open");
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Reset navQuery when moving between routes and close menu
  useEffect(() => {
    setMenuOpen(false);
    // keep existing behaviour: if we're on projects route, don't override query from params
    const navQ = searchParams?.get("navSearch") || "";
    // only set navQuery from params when not navigating inside projects (preserve user's typed query)
    if (!pathname.startsWith("/projects")) {
      setNavQuery(navQ);
    } else {
      // if we're already on /projects and navSearch param exists, reflect it but don't auto-submit
      setNavQuery(navQ);
    }
  }, [pathname, searchParams]);

  // Debounced search suggestions
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const q = navQuery.trim().toLowerCase();

      // IMPORTANT FIX:
      // don't call onSearch when q is empty. Previously we called onSearch("") which caused
      // upstream navigate-to-projects behavior. Only call onSearch for meaningful queries.
      if (!q) {
        setSuggests([]);
        return;
      }

      // call onSearch only for non-empty queries
      onSearch?.(q);

      Promise.all([
        import("../data/projects"),
        import("../data/team"),
      ]).then(([{ projects }, { teamMembers }]) => {
        const projectMatches: Suggest[] = projects
          .filter((p: any) =>
            `${p.title} ${p.description} ${p.category} ${p.location}`.toLowerCase().includes(q)
          )
          .slice(0, 4)
          .map((p: any) => ({ type: "project", title: p.title, projectId: p.id }));

        const teamMatches: Suggest[] = teamMembers
          .filter((m: any) =>
            `${m.name} ${m.role} ${m.expertise?.join(" ")}`.toLowerCase().includes(q)
          )
          .slice(0, 3)
          .map((m: any) => ({ type: "team", name: m.name, role: m.role, memberId: m.id }));

        setSuggests([...projectMatches, ...teamMatches]);
      }).catch(() => {
        setSuggests([]);
      });
    }, DEBOUNCE);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [navQuery, onSearch]);

  // Search actions
  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = navQuery.trim();
    // Only navigate if there is actually a query (guard against empty navigation)
    if (q) {
      onSearch?.(q);
      router.push(`/projects?navSearch=${encodeURIComponent(q)}`);
    } else {
      // if empty and user explicitly submitted (enter), go to projects list without navSearch param
      router.push("/projects");
    }
    setSuggests([]);
  };

  const clearSearch = () => {
    setNavQuery("");
    setSuggests([]);
    // don't navigate or call onSearch when user clears — keep them on current page
  };

  const selectSuggestion = (s: Suggest) => {
    if (s.type === "project") {
      router.push(`/projects/${encodeURIComponent(s.projectId)}`);
    } else {
      router.push(`/team#${s.memberId}`);
    }
    setNavQuery("");
    setSuggests([]);
  };

  // Keyboard navigation for search suggestions
  const handleKeyNav = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (suggests.length === 0) return;
      const focusable = listRef.current?.querySelectorAll<HTMLLIElement>("li");
      if (!focusable || focusable.length === 0) return;
      const currentIndex = Array.from(focusable).findIndex(
        (el) => document.activeElement === el
      );
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (currentIndex + 1) % focusable.length;
        focusable[next].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (currentIndex - 1 + focusable.length) % focusable.length;
        focusable[prev].focus();
      }
    },
    [suggests.length]
  );

  const is404 = pathname === "/404" || (
    ![
      "/",
      "/home",
      "/about",
      "/projects",
      "/team",
      "/contact",
      "/services",
      "/career",
      "/admin",
      "/blog",
      "/insights",
    ].includes(pathname) &&
    !pathname.startsWith("/services/") &&
    !pathname.startsWith("/projects/") &&
    !pathname.startsWith("/blog/")
  );

  const isSolid = scrolled || is404 || pathname !== "/";

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? "bg-white/95 backdrop-blur-md py-2 sm:py-3 shadow-md border-b border-gray-100"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 sm:h-16 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
            <img
              src="/younick-crest.webp"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              alt="Younick Design Studio Crest Emblem Navigation Header"
              title="Younick Design Studio — Luxury Interior Design & Turnkey Architecture Jaipur"
              width="44"
              height="52"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = "/younick-logo.webp";
              }}
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#0B1220] tracking-tight group-hover:text-[#8C6226] transition-colors">
                Younick
              </span>
              <span className="font-sans font-medium text-gray-500 text-[9px] sm:text-[11px] tracking-[0.22em] uppercase mt-0.5">
                Design Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map(({ path, label, title }) => {
              const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);
              return (
                <Link
                  key={path}
                  href={path}
                  title={title}
                  aria-label={title}
                  className={`group relative flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                    isActive
                      ? "text-[#0B1220] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#E6B566] after:rounded-full font-medium"
                      : "text-gray-600 hover:text-[#0B1220] hover:scale-[1.01]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            {/* Search Box */}
            <form onSubmit={submitSearch} className="relative">
              <input
                id="search-input"
                name="q"
                type="text"
                placeholder="Search projects, team..."
                value={navQuery}
                onChange={(e) => setNavQuery(e.target.value)}
                onKeyDown={handleKeyNav}
                className="pl-9 pr-9 py-2 w-72 rounded-lg bg-white/90 text-[#0B1220] text-sm placeholder-gray-400 border border-gray-200 focus:ring-2 focus:ring-[#E6B566] focus:outline-none shadow-sm"
                aria-label="Search"
              />
              <Search
                className="absolute left-3 top-2.5 text-[#E6B566]"
                size={16}
                aria-hidden="true"
              />
              {navQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-2.5 p-1 rounded-full hover:bg-gray-100/60"
                  aria-label="Clear search"
                >
                  <XIcon size={14} className="text-[#0B1220]" />
                </button>
              )}
              {suggests.length > 0 && (
                <ul
                  id="nav-suggestions"
                  ref={listRef}
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden"
                >
                  {suggests.map((s) => (
                    <li
                      key={s.type === "project" ? s.projectId : s.memberId}
                      tabIndex={0}
                      onClick={() => selectSuggestion(s)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-50 focus:bg-gray-50 flex items-center justify-between text-sm"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {s.type === "project" ? s.title : s.name}
                        </div>
                        {s.type === "team" && (
                          <div className="text-xs text-gray-500">{s.role}</div>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">
                        {s.type === "project" ? "Project" : "Team"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </form>

            {/* Menu Trigger Button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              aria-label="Navigation Menu"
              className="inline-flex items-center justify-center p-2 rounded-lg bg-white/90 border border-gray-100 hover:shadow-sm transition text-[#0B1220]"
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-[#0B1220]"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Frosted Glass Backdrop & Full-Height Right Drawer */}
      {mounted && menuOpen && createPortal(
        <>
          {/* Frosted Glass Backdrop covering entire screen */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60] transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Right-aligned Full-height Drawer touching the bottom */}
          <aside
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Studio Navigation Menu"
            className="fixed top-0 right-0 bottom-0 h-full w-80 sm:w-96 max-w-[85vw] bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-gray-100 z-[70] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 outline-none"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center space-x-2.5">
                <img
                  src="/younick-crest.webp"
                  alt="Younick Crest"
                  width="28"
                  height="32"
                  className="h-7 w-auto object-contain"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = "/younick-logo.webp";
                  }}
                />
                <div className="flex flex-col leading-none">
                  <span className="font-serif text-lg font-bold text-[#0B1220]">
                    Younick
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.2em] text-[#8C6226] uppercase font-semibold mt-0.5">
                    Design Studio
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl text-gray-500 hover:text-[#0B1220] hover:bg-gray-100 transition-colors"
                aria-label="Close navigation menu"
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Vertical Series List */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-1">
              {/* Mobile Search Input inside Drawer */}
              <div className="lg:hidden mb-4">
                <form onSubmit={submitSearch}>
                  <div className="relative">
                    <input
                      id="drawer-search-input"
                      name="q"
                      type="text"
                      placeholder="Search projects, team..."
                      aria-label="Search"
                      value={navQuery}
                      onChange={(e) => setNavQuery(e.target.value)}
                      className="pl-9 pr-9 py-2.5 w-full rounded-xl bg-gray-50 text-[#0B1220] text-sm placeholder-gray-400 border border-gray-200 focus:ring-2 focus:ring-[#E6B566] focus:outline-none"
                    />
                    <Search className="absolute left-3 top-3 text-[#E6B566]" size={16} />
                    {navQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-3 p-1 rounded-full hover:bg-gray-100/60"
                        aria-label="Clear search"
                      >
                        <XIcon size={14} className="text-[#0B1220]" />
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                Studio Navigation
              </div>

              {gridItems.map(({ path, label, title, icon: Icon }) => {
                const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);
                return (
                  <Link
                    key={path}
                    href={path}
                    title={title}
                    aria-label={title}
                    onClick={() => setMenuOpen(false)}
                    className={`group flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#E6B566]/15 text-[#0B1220] font-semibold"
                        : "text-gray-700 hover:text-[#0B1220] hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#E6B566]/25 text-[#8C6226]"
                          : "bg-gray-100 text-gray-500 group-hover:bg-[#E6B566]/15 group-hover:text-[#8C6226]"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="text-sm font-medium tracking-wide">{label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Drawer Bottom touching the bottom of the screen */}
            <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/80 space-y-3">
              <div className="text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-800 uppercase tracking-wider text-[10px]">
                  Jaipur Studio Office
                </div>
                <div>Orbit Mall, Civil Lines, Jaipur</div>
                <div>
                  <a href="tel:+918854883058" className="font-medium text-[#0B1220] hover:text-[#8C6226]">
                    +91 88548 83058
                  </a>
                </div>
                <div>
                  <a href="mailto:studioyounick@gmail.com" className="text-gray-500 hover:text-[#8C6226]">
                    studioyounick@gmail.com
                  </a>
                </div>
              </div>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-2.5 px-4 rounded-xl bg-[#0B1220] text-[#E6B566] font-medium text-xs tracking-wider uppercase hover:bg-black transition shadow-sm"
              >
                Book Studio Consultation
              </Link>
            </div>
          </aside>
        </>,
        document.body
      )}
    </nav>
  );
};

export default Navigation;
