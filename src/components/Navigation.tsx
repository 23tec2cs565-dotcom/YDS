// src/components/Navigation.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
  LayoutGrid,
} from "lucide-react";
interface NavigationProps {
  onSearch: (query: string) => void;
}

type Suggest =
  | { type: "project"; title: string; projectId: string }
  | { type: "team"; name: string; role: string; memberId: string };

const DEBOUNCE = 250;

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/projects", label: "Projects", icon: FolderOpen },
  { path: "/services", label: "Services", icon: Briefcase },
  { path: "/contact", label: "Contact", icon: MessageSquare },
  { path: "/about", label: "About", icon: Info },
];

const gridItems = [
  { path: "/team", label: "Our Team", icon: Users },
  { path: "/career", label: "Career", icon: Clipboard },
  { path: "/projects", label: "Projects", icon: FolderOpen },
  { path: "/services", label: "Services", icon: Briefcase },
  { path: "/contact", label: "Contact Us", icon: MessageSquare },
  { path: "/about", label: "About", icon: Info },
];

const Navigation: React.FC<NavigationProps> = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [deskOpen, setDeskOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const [suggests, setSuggests] = useState<Suggest[]>([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // typed debounce timer
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deskRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile nav open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  // Reset navQuery when moving between routes but don't trigger search/navigation side-effects
  useEffect(() => {
    setOpen(false);
    // keep existing behaviour: if we're on projects route, don't override query from params
    const navQ = searchParams.get("navSearch") || "";
    // only set navQuery from params when not navigating inside projects (preserve user's typed query)
    if (!location.pathname.startsWith("/projects")) {
      setNavQuery(navQ);
    } else {
      // if we're already on /projects and navSearch param exists, reflect it but don't auto-submit
      setNavQuery(navQ);
    }
  }, [location.pathname, searchParams]);

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
      onSearch(q);

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

  // Close desktop popover when clicking outside or pressing ESC
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (deskRef.current && !deskRef.current.contains(e.target as Node)) setDeskOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDeskOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Search actions
  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = navQuery.trim();
    // Only navigate if there is actually a query (guard against empty navigation)
    if (q) {
      onSearch(q);
      navigate(`/projects?navSearch=${encodeURIComponent(q)}`);
    } else {
      // if empty and user explicitly submitted (enter), go to projects list without navSearch param
      navigate("/projects");
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
      navigate(`/projects?project=${encodeURIComponent(s.projectId)}`);
    } else {
      navigate(`/team#${s.memberId}`);
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

  const is404 = location.pathname === "/404" || (
    ![
      "/",
      "/home",
      "/about",
      "/projects",
      "/team",
      "/contact",
      "/faq",
      "/services",
      "/career",
      "/admin",
    ].includes(location.pathname) &&
    !location.pathname.startsWith("/services/")
  );

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || is404
          ? "bg-white/90 backdrop-blur-md py-2 sm:py-3 shadow-md border-b border-gray-100"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 sm:h-16 relative">
          {/* Logo */}
          <NavLink to="/" end className="flex items-center space-x-2.5 sm:space-x-3 group">
            <img
              src="/younick-crest.png"
              alt="Younick Design Studio Logo"
              title="Younick Design Studio — Luxury Interior Design & Turnkey Architecture Jaipur"
              width="44"
              height="52"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = "/younick-logo.PNG";
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
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map(({ path, label }) => {
              const isActive = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
              return (
                <NavLink
                  key={path}
                  to={path}
                  end={path === "/"}
                  className={`group relative flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                    isActive
                      ? "text-[#0B1220] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#E6B566] after:rounded-full font-medium"
                      : "text-gray-600 hover:text-[#0B1220] hover:scale-[1.01]"
                  }`}
                >
                  {label}
                </NavLink>
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

            {/* Grid Popover */}
            <div className="relative" ref={deskRef}>
              <button
                onClick={() => setDeskOpen((v) => !v)}
                aria-expanded={deskOpen}
                aria-haspopup="menu"
                aria-label="Navigation Grid Shortcuts"
                className="inline-flex items-center justify-center p-2 rounded-lg bg-white/90 border border-gray-100 hover:shadow-sm transition text-[#0B1220]"
              >
                <LayoutGrid size={18} />
              </button>

              {deskOpen && (
                <div
                  role="menu"
                  aria-label="Navigation shortcuts"
                  className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50"
                >
                  <div className="grid grid-cols-3 gap-3">
                    {gridItems.map(({ path, label, icon: Icon }) => (
                      <NavLink
                        key={path}
                        to={path}
                        onClick={() => setDeskOpen(false)}
                        className={({ isActive }) =>
                          `flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all ${
                            isActive
                              ? "bg-[#E6B566]/10 text-[#0B1220]"
                              : "text-gray-700 hover:text-[#0B1220] hover:scale-[1.03]"
                          }`
                        }
                      >
                        <div className="p-2 rounded-full bg-gray-50 shadow-sm">
                          <Icon size={16} />
                        </div>
                        <span className="text-xs font-medium">{label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-[#E6B566]"
            aria-label="Toggle menu"
          >
            {open ? <XIcon size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-nav"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur rounded-lg mx-2 p-4 border border-gray-100 shadow-lg">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {gridItems.map(({ path, label, icon: Icon }) => {
                const isActive = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
                return (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={`group flex flex-col items-center justify-center gap-2 p-3 rounded-lg text-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#E6B566]/10 text-[#0B1220]"
                        : "text-gray-700 hover:text-[#0B1220] hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#E6B566]/20 text-[#B08D57] scale-110"
                          : "bg-gray-50 text-gray-500 group-hover:bg-[#E6B566]/10 group-hover:text-[#B08D57] group-hover:scale-105"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-medium">{label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Search */}
            <div className="mt-3">
              <form onSubmit={submitSearch}>
                <div className="relative">
                  <input
                    id="mobile-search-input"
                    name="q"
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                    value={navQuery}
                    onChange={(e) => setNavQuery(e.target.value)}
                    className="pl-9 pr-9 py-2 w-full rounded-lg bg-gray-50 text-[#0B1220] text-sm placeholder-gray-400 border border-gray-200 focus:ring-2 focus:ring-[#E6B566] focus:outline-none"
                  />
                  <Search className="absolute left-3 top-2.5 text-[#E6B566]" size={16} />
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
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-5 text-sm text-gray-600 text-center">
              <div>
                Call:{" "}
                <a href="tel:+918854883058" className="text-[#0B1220] hover:text-[#E6B566]">
                  +91 88548 83058
                </a>
              </div>
              <div>
                Email:{" "}
                <a href="mailto:studioyounick@gmail.com" className="text-[#0B1220] hover:text-[#E6B566]">
                  studioyounick@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
