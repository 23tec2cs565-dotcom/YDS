"use client";
import React, { useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ArrowRight,
  Search,
  X,
  Check,
  AlertCircle,
  Home,
  Building,
  Wrench,
  MessageCircle,
  Eye,
  Paintbrush,
  Hammer,
  RefreshCw,
  Layers,
  HelpCircle,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Search,
  X,
  Check,
  AlertCircle,
  Home,
  Building,
  Wrench,
  MessageCircle,
  Eye
};

// Icon map for the budget estimator service selector buttons
const ESTIMATOR_ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Paintbrush,
  Hammer,
  RefreshCw,
  Layers,
  HelpCircle,
  Home,
};
import { services as defaultServices } from "../data/services";
import { useServices } from "../hooks/useSanityData";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "/assets/Placeholder/Mock-9.avif"; 
    img.alt = "Younick studio image fallback";
  }
}


import { projects } from "../data/projects";
import { YEARS_OF_EXPERIENCE } from "../utils/constants";

const STATS = [
  { label: "Years of Experience", value: `${YEARS_OF_EXPERIENCE}+` },
  { label: "Projects Completed", value: `${projects.length}+` },
  { label: "Happy Clients", value: "100%" },
];

const allowedIds = new Set([
  "interior-design",
  "construction",
  "3d-visualization",
  "renovation",
  "consultation",
]);

type ServiceType = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features?: string[];
  keywords?: string[];
};

const ServiceCard: React.FC<{ service: ServiceType; onExplore: (id: string) => void }> = ({ service, onExplore }) => {
  const IconComp = ICON_MAP[service.icon] ?? Home;
  const displayTitle = service.id === "construction" ? "Construction & Turnkey" : service.title;

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onExplore(service.id);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onKeyDown={handleKey}
      onClick={() => onExplore(service.id)}
      className="group relative bg-white p-4 sm:p-8 border border-gray-100 hover:border-[#B08D57]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#B08D57]/5 flex flex-col h-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6B566]/30"
      aria-label={`Open service ${displayTitle}`}
    >
      <div className="absolute top-0 left-0 w-1 h-0 bg-[#B08D57] transition-all duration-500 group-hover:h-full" />

      <div className="mb-3 sm:mb-5 text-gray-400 group-hover:text-[#B08D57] transition-colors duration-300">
        <IconComp size={20} className="sm:w-7 sm:h-7" />
      </div>

      <h3 className="text-sm sm:text-xl font-serif text-gray-900 mb-1 sm:mb-3 group-hover:translate-x-2 transition-transform duration-300 leading-tight">
        {displayTitle}
      </h3>

      <p className="text-gray-500 text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-6 flex-grow line-clamp-2 sm:line-clamp-none">
        {service.description}
      </p>

      <div className="mt-auto pt-3 sm:pt-5 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#B08D57] transition-colors">
          Explore
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExplore(service.id);
          }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#B08D57] group-hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6B566]"
          aria-label={`Explore ${displayTitle}`}
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
};

// Available locations lists
const RAJASTHAN_LOCATIONS = [
  { id: "jaipur", label: "Jaipur", region: "Rajasthan, District (Center)", multiplier: 1.0 },
  { id: "ajmer", label: "Ajmer", region: "Rajasthan, District (~130 km)", multiplier: 1.08 },
  { id: "sikar", label: "Sikar", region: "Rajasthan, District (~115 km)", multiplier: 1.08 },
  { id: "alwar", label: "Alwar", region: "Rajasthan, District (~150 km)", multiplier: 1.10 },
  { id: "tonk", label: "Tonk", region: "Rajasthan, District (~95 km)", multiplier: 1.06 },
  { id: "dausa", label: "Dausa", region: "Rajasthan, District (~60 km)", multiplier: 1.05 },
  { id: "kotputli", label: "Kotputli", region: "Rajasthan, District (~110 km)", multiplier: 1.08 },
  { id: "kishangarh", label: "Kishangarh", region: "Rajasthan, Town (~100 km)", multiplier: 1.07 },
  { id: "jhunjhunu", label: "Jhunjhunu", region: "Rajasthan, District (~170 km)", multiplier: 1.12 },
  { id: "karauli", label: "Karauli", region: "Rajasthan, District (~160 km)", multiplier: 1.09 },
  { id: "sawai-madhopur", label: "Sawai Madhopur", region: "Rajasthan, District (~130 km)", multiplier: 1.10 },
  { id: "udaipur", label: "Udaipur", region: "Rajasthan, District (Heritage)", multiplier: 1.12 },
  { id: "jodhpur", label: "Jodhpur", region: "Rajasthan, District", multiplier: 1.10 },
  { id: "bikaner", label: "Bikaner", region: "Rajasthan, District", multiplier: 1.10 },
  { id: "kota", label: "Kota", region: "Rajasthan, District", multiplier: 1.08 },
  { id: "bhilwara", label: "Bhilwara", region: "Rajasthan, District", multiplier: 1.08 },
];

const ALL_INDIA_LOCATIONS = [
  ...RAJASTHAN_LOCATIONS,
  { id: "delhi-ncr", label: "Delhi / NCR", region: "National Capital Region", multiplier: 1.15 },
  { id: "gurgaon", label: "Gurugram (Gurgaon)", region: "Haryana, NCR", multiplier: 1.18 },
  { id: "noida", label: "Noida / Greater Noida", region: "Uttar Pradesh, NCR", multiplier: 1.15 },
  { id: "mumbai", label: "Mumbai", region: "Maharashtra, Metro", multiplier: 1.25 },
  { id: "pune", label: "Pune", region: "Maharashtra", multiplier: 1.18 },
  { id: "bengaluru", label: "Bengaluru", region: "Karnataka, Metro", multiplier: 1.22 },
  { id: "hyderabad", label: "Hyderabad", region: "Telangana, Metro", multiplier: 1.18 },
  { id: "chennai", label: "Chennai", region: "Tamil Nadu, Metro", multiplier: 1.18 },
  { id: "kolkata", label: "Kolkata", region: "West Bengal, Metro", multiplier: 1.15 },
  { id: "ahmedabad", label: "Ahmedabad", region: "Gujarat", multiplier: 1.12 },
  { id: "surat", label: "Surat", region: "Gujarat", multiplier: 1.12 },
  { id: "chandigarh", label: "Chandigarh", region: "Punjab & Haryana", multiplier: 1.15 },
  { id: "lucknow", label: "Lucknow", region: "Uttar Pradesh", multiplier: 1.10 },
  { id: "indore", label: "Indore", region: "Madhya Pradesh", multiplier: 1.10 },
  { id: "bhopal", label: "Bhopal", region: "Madhya Pradesh", multiplier: 1.08 },
  { id: "dehradun", label: "Dehradun", region: "Uttarakhand", multiplier: 1.12 },
  { id: "goa", label: "Goa", region: "Goa Coastal", multiplier: 1.20 },
  { id: "nagpur", label: "Nagpur", region: "Maharashtra", multiplier: 1.10 },
  { id: "patna", label: "Patna", region: "Bihar", multiplier: 1.10 },
  { id: "ranchi", label: "Ranchi", region: "Jharkhand", multiplier: 1.10 },
  { id: "guwahati", label: "Guwahati", region: "Assam", multiplier: 1.15 },
  { id: "kochi", label: "Kochi", region: "Kerala", multiplier: 1.15 },
];

const ServicesPage: React.FC = () => {
  const { services: SERVICES } = useServices();
  const visibleServices = (SERVICES || []).filter((s) => allowedIds.has(s.id));
  const router = useRouter();
  const servicesRef = useRef<HTMLElement | null>(null);

  const [selectedServices, setSelectedServices] = useState<string[]>(["interior-design"]);
  const [area, setArea] = useState<number>(1500);
  const [quality, setQuality] = useState<"standard" | "premium" | "luxury">("premium");
  const [location, setLocation] = useState<string>("jaipur");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Turnkey construction & Renovation are restricted to Rajasthan locations near Jaipur (under 150-170 km)
  const hasRestrictedService = selectedServices.includes("construction") || selectedServices.includes("renovation");

  // If restricted service, use RAJASTHAN_LOCATIONS. Otherwise use the full national locations list
  const activeCitiesList = hasRestrictedService
    ? RAJASTHAN_LOCATIONS
    : ALL_INDIA_LOCATIONS;

  // Memoize filtered cities so it only runs once and limits results to 15 cities to prevent browser hanging
  const filteredCities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return activeCitiesList.slice(0, 15);

    return activeCitiesList.filter(
      (c) =>
        c.label.toLowerCase().includes(query) ||
        c.region.toLowerCase().includes(query)
    ).slice(0, 15);
  }, [searchQuery, activeCitiesList]);

  // Find the selected location label robustly
  const selectedCityLabel = useMemo(() => {
    const found = activeCitiesList.find((c) => c.id === location) ||
                  ALL_INDIA_LOCATIONS.find((c) => c.id === location);
    return found ? found.label : "";
  }, [location, activeCitiesList]);

  // Auto-reset location to Jaipur if restricted service is chosen and current location is outside the restricted list
  React.useEffect(() => {
    const isValid = activeCitiesList.some((c) => c.id === location);
    if (!isValid) {
      setLocation("jaipur");
      setSearchQuery("");
    }
  }, [selectedServices, location, activeCitiesList]);

  // Base rates per sq ft
  const serviceRates: Record<string, Record<"standard" | "premium" | "luxury", number>> = {
    "interior-design": { standard: 130, premium: 240, luxury: 480 },
    "construction": { standard: 1650, premium: 2300, luxury: 3800 },
    "renovation": { standard: 450, premium: 850, luxury: 1800 },
    "3d-visualization": { standard: 25, premium: 45, luxury: 90 },
    "consultation": { standard: 15, premium: 30, luxury: 60 },
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    if (selectedServices.length === 0) {
      return { min: 0, max: 0, comboDiscount: 0, scaleDiscount: 0 };
    }

    let totalMinRate = 0;
    let totalMaxRate = 0;

    selectedServices.forEach((serviceId) => {
      const rate = serviceRates[serviceId]?.[quality] ?? 0;
      totalMinRate += rate * 0.9;
      totalMaxRate += rate * 1.1;
    });

    // Find multiplier for the current selected city
    const activeLocation = activeCitiesList.find((c) => c.id === location) ||
                           ALL_INDIA_LOCATIONS.find((c) => c.id === location) ||
                           RAJASTHAN_LOCATIONS[0];
    const multiplier = activeLocation.multiplier;
    let minCost = totalMinRate * area * multiplier;
    let maxCost = totalMaxRate * area * multiplier;

    // Turnkey Combo Discount (5% for 2 services, 10% for 3+ services)
    let comboDiscountPercent = 0;
    if (selectedServices.length === 2) comboDiscountPercent = 0.05;
    else if (selectedServices.length >= 3) comboDiscountPercent = 0.10;

    // Volume / Scale Discount based on Sq. Ft.
    let scaleDiscountPercent = 0;
    if (area >= 4000) scaleDiscountPercent = 0.08;
    else if (area >= 2500) scaleDiscountPercent = 0.05;
    else if (area >= 1500) scaleDiscountPercent = 0.02;

    minCost = minCost * (1 - comboDiscountPercent - scaleDiscountPercent);
    maxCost = maxCost * (1 - comboDiscountPercent - scaleDiscountPercent);

    return {
      min: Math.round(minCost),
      max: Math.round(maxCost),
      comboDiscount: comboDiscountPercent * 100,
      scaleDiscount: scaleDiscountPercent * 100,
    };
  };

  const { min, max, comboDiscount, scaleDiscount } = calculateEstimate();

  const formatCost = (val: number) => {
    if (val === 0) return "₹0";
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(1)} Lakhs`;
  };

  const handleScrollDown = () => {
    if (servicesRef.current) {
      const rect = servicesRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offset = 90; // Height of fixed navbar
      window.scrollTo({
        top: rect.top + scrollTop - offset,
        behavior: "smooth",
      });
    }
  };

  const goToService = (id: string) => {
    router.push(`/services/${id}`);
  };

  const startProject = () => {
    router.push("/contact");
  };

  return (
    <>
      <SEOHead seo={pageSEO.services} />

      {/* Hero */}
      <header className="mt-24 relative bg-[#0F0F10] text-white overflow-hidden min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img decoding="async" loading="lazy"
            src="/assets/services/Service-1.avif"
            alt="Younick Design Studio Services and Architectural Expertise"
            title="Comprehensive Interior Design and Turnkey Architecture Services in Jaipur"
            width="1920"
            height="800"
            className="w-full h-full object-cover opacity-40 grayscale-[20%]"
            onError={handleImgError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            Our Expertise
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-6 sm:mb-10">
            We don't just design spaces; we curate experiences. Discover our range of specialized services crafted for modern living.
          </p>

          <button
  onClick={handleScrollDown}
  aria-label="Scroll to services"
  className="animate-bounce p-3 border border-white/20 rounded-full text-white/60 hover:text-white transition"
>
  <ChevronDown size={20} />
    </button>

  </div>
</header>

<main className="bg-white">
        {/* Stats */}
        <div className="bg-[#0F0F10] border-t border-white/10 ">
          <div className="max-w-[1680px] mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 divide-x divide-white/10">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center px-2 sm:px-4">
                  <div className="text-xl sm:text-2xl md:text-3xl font-serif text-[#E6B566] mb-1">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <section ref={servicesRef} className="bg-[#FAFAFA] py-12 sm:py-20">
          <div className="max-w-[1680px] mx-auto px-5 sm:px-6">
            <div className="mb-8 sm:mb-12 md:flex items-end justify-between">
              <div className="max-w-xl">
                <span className="text-[#8C6226] font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">What We Do</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900">Comprehensive Design Services</h2>
              </div>
              <p className="hidden md:block text-gray-500 max-w-sm text-sm leading-relaxed text-right">
                From concept to completion, we handle every detail so you can enjoy the transformation.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-200">
              {visibleServices.map((s) => (
                <div key={s.id} className="border-r border-b border-gray-200">
                  <ServiceCard service={s} onExplore={goToService} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 sm:py-20 overflow-hidden">
          <div className="max-w-[1680px] mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div>
                <span className="text-[#8C6226] font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">How It Works</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4 sm:mb-6">The Younick Standard</h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  We've refined our process over a decade to ensure clarity, creativity, and precision at every stage. No surprises, just exceptional results.
                </p>
                <div className="space-y-5 sm:space-y-8">
                  {[
                    { step: "01", title: "Discovery", desc: "We meet to discuss your vision, budget, and requirements." },
                    { step: "02", title: "Curation", desc: "We develop concepts, mood boards, and detailed layouts." },
                    { step: "03", title: "Execution", desc: "Our team brings the design to life with expert craftsmanship." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-6 group">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center text-xs sm:text-sm font-serif text-gray-400 group-hover:border-[#B08D57] group-hover:text-[#B08D57] transition-colors duration-300">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-[#B08D57] transform translate-x-3 translate-y-3 rounded-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img decoding="async" loading="lazy"
                    src="/assets/services/Service-2.avif"
                    alt="Precision craftsmanship and interior architecture process"
                    title="Precision Interior Execution Process by Younick Design Studio"
                    width="800"
                    height="600"
                    className="w-full h-full object-cover"
                    onError={handleImgError}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-serif text-lg">"Precision in every detail."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Budget Estimator Section - Haute Architectural Luxury Modeler */}
        <section className="py-20 sm:py-32 px-5 sm:px-6 bg-[#FAF9F6] border-t border-[#EAE6DE] relative overflow-hidden">
          {/* Subtle multi-tone architectural atmospheric aura */}
          <div className="absolute top-1/4 left-1/6 w-[550px] h-[550px] bg-blue-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/6 w-[550px] h-[550px] bg-rose-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-[1680px] mx-auto relative z-10">
            {/* Editorial Header */}
            <div className="text-center mb-10 sm:mb-18">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E0DACF] shadow-sm text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-stone-700 mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span>Architectural Investment Modeler</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-[#181C24] tracking-tight">
                Project Budget Estimator
              </h2>
              <p className="mt-3.5 sm:mt-4 text-stone-500 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-sans">
                Real-time algorithmic cost modeling calibrated across architectural disciplines, regional indices, and bespoke finish specifications.
              </p>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-stretch">
              
              {/* Left Controls Column (7 cols) - The Architectural Specification Tablet */}
              <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] border border-[#E8E4DC] flex flex-col justify-between relative overflow-hidden">
                
                {/* Architectural CAD Drafting Crosshairs in corners */}
                <span className="absolute top-3 left-3 text-stone-300 font-mono text-[10px] select-none pointer-events-none">+</span>
                <span className="absolute top-3 right-3 text-stone-300 font-mono text-[10px] select-none pointer-events-none">+</span>
                <span className="absolute bottom-3 left-3 text-stone-300 font-mono text-[10px] select-none pointer-events-none">+</span>
                <span className="absolute bottom-3 right-3 text-stone-300 font-mono text-[10px] select-none pointer-events-none">+</span>

                {/* 1. Service Selector (Primary Accent: Architectural Sapphire & Cobalt) */}
                <div className="mb-7 sm:mb-9">
                  <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                      1. Architectural Disciplines (Select Multiple)
                    </label>
                    <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-50/90 border border-blue-200/80 px-2.5 py-0.5 rounded-full shadow-sm">
                      {selectedServices.length} Selected
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {[
                      { id: "interior-design", code: "01", label: "Interior Architecture", icon: "Paintbrush", desc: "Bespoke millwork, ambient lighting & spatial curation" },
                      { id: "construction", code: "02", label: "Turnkey Construction", icon: "Hammer", desc: "Civil engineering, reinforced core & structural erection" },
                      { id: "renovation", code: "03", label: "Heritage & Renovation", icon: "RefreshCw", desc: "Adaptive restoration, structural retrofit & fine masonry" },
                      { id: "3d-visualization", code: "04", label: "3D Digital Twin", icon: "Layers", desc: "Ray-traced CGI renders & virtual walkthroughs" },
                      { id: "consultation", code: "05", label: "Design Consultation", icon: "HelpCircle", desc: "Spatial masterplanning, Vastu & moodboard synthesis" }
                    ].map((svc) => {
                      const isSelected = selectedServices.includes(svc.id);
                      const SvcIcon = ESTIMATOR_ICON_MAP[svc.icon] ?? Home;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => toggleService(svc.id)}
                          className={`group relative flex items-start text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "border-blue-600 bg-gradient-to-br from-blue-50/90 via-indigo-50/30 to-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/50 -translate-y-0.5"
                              : "border-[#E8E4DC] hover:border-blue-300 hover:bg-blue-50/20 bg-[#FCFCFA] hover:-translate-y-0.5"
                          }`}
                        >
                          {/* Disciplinary code watermark */}
                          <span className={`absolute top-2.5 right-3 text-[9px] font-mono tracking-widest ${
                            isSelected ? "text-blue-600 font-bold" : "text-stone-300"
                          }`}>
                            SPEC.{svc.code}
                          </span>

                          <div className={`mr-3 mt-0.5 p-2 sm:p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                            isSelected
                              ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-600/30"
                              : "bg-stone-100 text-stone-500 group-hover:text-stone-700 group-hover:bg-stone-200/60"
                          }`}>
                            <SvcIcon size={16} />
                          </div>
                          <div className="flex-1 min-w-0 pr-4">
                            <span className={`block text-xs sm:text-sm font-semibold transition-colors duration-200 mb-0.5 ${
                              isSelected ? "text-slate-900 font-bold" : "text-stone-800"
                            }`}>
                              {svc.label}
                            </span>
                            <span className="block text-[11px] text-stone-400 leading-relaxed font-sans line-clamp-2">
                              {svc.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Project Location (Secondary Accent: Warm Terracotta & Rose Siena) */}
                <div className="mb-7 sm:mb-9 relative">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor="city-search" className="block text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                      2. Geographic Location
                    </label>
                    {hasRestrictedService && (
                      <span className="text-[10px] font-semibold text-rose-700 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 tracking-wide shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        Rajasthan Territorial Zone
                      </span>
                    )}
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Search size={15} />
                    </div>
                    <input
                      id="city-search"
                      name="city-search"
                      type="text"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E8E4DC] text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-[#FCFCFA] text-slate-900 placeholder:text-stone-400 shadow-sm"
                      placeholder={hasRestrictedService ? "Search Rajasthan locations (Jaipur, Jodhpur, Udaipur, Kota...)" : "Search major Indian metropolitan cities..."}
                      value={showDropdown ? searchQuery : selectedCityLabel}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => { setShowDropdown(true); setSearchQuery(""); }}
                      onBlur={() => setTimeout(() => setShowDropdown(false), 250)}
                    />
                    {(searchQuery || (location && location !== "jaipur")) && (
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setLocation("jaipur");
                          setSearchQuery("");
                        }}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute left-0 right-0 mt-1.5 max-h-56 overflow-y-auto bg-white border border-stone-200 rounded-2xl shadow-2xl z-50 py-2 scrollbar-thin">
                      {filteredCities.length === 0 ? (
                        <div className="px-4 py-3 text-xs text-stone-400 italic">
                          No matching territories found
                        </div>
                      ) : (
                        filteredCities.map((city) => {
                          const isSelected = location === city.id;
                          return (
                            <button
                              key={city.id}
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setLocation(city.id);
                                setSearchQuery("");
                                setShowDropdown(false);
                              }}
                              className={`flex items-center justify-between w-full px-4 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-blue-50 text-blue-950 font-bold"
                                  : "hover:bg-stone-50 text-stone-700"
                              }`}
                            >
                              <div>
                                <span className="block text-slate-900 font-medium">{city.label}</span>
                                <span className="block text-[10px] text-stone-400">{city.region}</span>
                              </div>
                              {isSelected && <Check size={14} className="text-blue-600" />}
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* Service warning note (Warm Terracotta & Siena) */}
                  {hasRestrictedService && (
                    <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-rose-50/90 via-amber-50/60 to-rose-50/90 border border-rose-200/90 text-[11px] text-rose-950 flex items-start gap-3 shadow-sm">
                      <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-0.5 text-rose-900 text-xs uppercase tracking-wider">Geographic Operational Scope</span>
                        Turnkey Construction & Heritage Restoration are bespoke on-site disciplines currently restricted to select districts in Rajasthan (Jaipur, Ajmer, Sikar, Udaipur & surrounding regions).
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Area Slider (Tertiary Accent: Jade & Emerald Precision Dial) */}
                <div className="mb-7 sm:mb-9">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor="area-number" className="block text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                      3. Built-Up Area Scale
                    </label>
                    <div className="flex items-center gap-2 bg-[#0F172A] text-white px-3.5 py-1.5 rounded-xl shadow-md border border-slate-700/60 transition-all">
                      <input
                        id="area-number"
                        name="area-number"
                        type="number"
                        min="100"
                        max="100000"
                        value={area || ""}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setArea(isNaN(val) ? 0 : val);
                        }}
                        onBlur={() => {
                          if (area < 100) setArea(500);
                        }}
                        className="w-18 bg-transparent text-right font-serif text-sm font-bold text-white outline-none border-none p-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-[10px] font-mono font-semibold text-emerald-400 tracking-wider">SQ. FT.</span>
                    </div>
                  </div>

                  {/* Dynamic Gradient Range Track */}
                  <div className="relative py-2">
                    <input
                      id="area-range"
                      name="area-range"
                      type="range"
                      min="500"
                      max="6000"
                      step="100"
                      value={Math.max(500, Math.min(6000, area))}
                      onChange={(e) => setArea(parseInt(e.target.value))}
                      style={{
                        background: `linear-gradient(to right, #059669 0%, #10B981 ${((Math.max(500, Math.min(6000, area)) - 500) / 5500) * 100}%, #E5E7EB ${((Math.max(500, Math.min(6000, area)) - 500) / 5500) * 100}%, #E5E7EB 100%)`
                      }}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  </div>

                  {/* Architectural Graduation Ticks */}
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono tracking-wider pt-1 border-t border-stone-100">
                    <span>500 SQFT <span className="hidden sm:inline text-stone-300">(Studio)</span></span>
                    <span>1,500 SQFT <span className="hidden sm:inline text-stone-300">(Apartment)</span></span>
                    <span>3,000 SQFT <span className="hidden sm:inline text-stone-300">(Bungalow)</span></span>
                    <span>6,000+ SQFT <span className="hidden sm:inline text-stone-300">(Estate)</span></span>
                  </div>
                </div>

                {/* 4. Quality/Material Selector (Bespoke Material Swatch Blocks) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                      4. Material & Craftsmanship Tier
                    </label>
                    <span className="text-[10px] text-stone-400 font-mono">Bespoke Specifications</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { 
                        id: "standard", 
                        tier: "Tier I",
                        label: "Classic Craft", 
                        desc: "Engineered oak, branded fittings & premium acrylic paints",
                        activeStyle: "border-emerald-600 bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/30 text-emerald-950 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/40",
                        activeTag: "text-emerald-700 bg-emerald-100/70 border-emerald-300"
                      },
                      { 
                        id: "premium", 
                        tier: "Tier II • Studio Choice",
                        label: "Signature Luxury", 
                        desc: "Italian Botticino, fluted glass, brass hardware & bespoke joinery",
                        activeStyle: "border-blue-600 bg-gradient-to-b from-blue-50/80 via-white to-blue-50/30 text-blue-950 shadow-md shadow-blue-500/15 ring-1 ring-blue-500/40",
                        activeTag: "text-blue-700 bg-blue-100/70 border-blue-300"
                      },
                      { 
                        id: "luxury", 
                        tier: "Tier III • Haute Bespoke",
                        label: "Ultra-Prestige", 
                        desc: "Statuario marble, exotic burl veneer, home automation & custom bronze",
                        activeStyle: "border-amber-500 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/30 text-amber-950 shadow-md shadow-amber-500/15 ring-1 ring-amber-500/40",
                        activeTag: "text-amber-800 bg-amber-100/70 border-amber-300"
                      }
                    ].map((g) => {
                      const isSelected = quality === g.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setQuality(g.id as "standard" | "premium" | "luxury")}
                          className={`flex flex-col items-start p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer ${
                            isSelected
                              ? `${g.activeStyle} -translate-y-0.5`
                              : "border-[#E8E4DC] hover:border-stone-300 bg-[#FCFCFA] hover:bg-stone-50/70 hover:-translate-y-0.5"
                          }`}
                        >
                          <span className={`text-[9px] font-mono uppercase tracking-wider font-bold mb-1 px-2 py-0.5 rounded-full border ${
                            isSelected ? g.activeTag : "text-stone-400 bg-stone-100 border-stone-200"
                          }`}>
                            {g.tier}
                          </span>
                          <span className={`block text-xs sm:text-sm font-semibold transition-colors mt-1 ${
                            isSelected ? "font-bold text-slate-900" : "text-stone-800"
                          }`}>
                            {g.label}
                          </span>
                          <span className="block text-[10.5px] text-stone-400 mt-1 leading-relaxed">
                            {g.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Results Column (5 cols) - Haute Smoked Glass Architectural Master Console */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#0F1420] via-[#0A0E18] to-[#06080F] text-white rounded-3xl p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(11,16,29,0.55)]">
                
                {/* Precision 3-color laser edge rim (Sapphire -> Terracotta -> Jade) */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-rose-500 to-emerald-400 pointer-events-none" />

                {/* Multi-tone atmospheric jewel glows */}
                <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-600/[0.18] rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-rose-600/[0.15] rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-500/[0.08] rounded-full blur-[80px] pointer-events-none" />

                {/* Architectural Crosshairs */}
                <span className="absolute top-3 left-3 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</span>
                <span className="absolute top-3 right-3 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</span>

                <div className="relative z-10">
                  {/* Console Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <span className="text-[#E6B566] text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E6B566] shadow-[0_0_10px_rgba(230,181,102,0.8)]" />
                      Calibrated Budget Range
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 uppercase font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Model
                    </span>
                  </div>
                  
                  {/* Budget Counter with Metallic Platinum & Champagne Gleam */}
                  <div className="mt-6 mb-3">
                    {selectedServices.length === 0 ? (
                      <div className="text-xl sm:text-2xl text-stone-400 font-serif py-8 italic font-light">
                        Select one or more architectural disciplines to generate estimate...
                      </div>
                    ) : (
                      <div>
                        <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight font-medium bg-gradient-to-r from-white via-[#F5E6C8] to-[#E6B566] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(230,181,102,0.3)]">
                          {formatCost(min)} – {formatCost(max)}
                        </div>
                        <p className="text-[11px] text-stone-400 mt-2.5 tracking-wider font-mono flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#E6B566]" />
                          Indicative Turnkey Estimate for {selectedCityLabel || location} ({quality.charAt(0).toUpperCase() + quality.slice(1)} Tier)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Applied Volume & Combo Savings Pill (Secondary Terracotta / Rose) */}
                  {(comboDiscount > 0 || scaleDiscount > 0) && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500/15 via-amber-500/15 to-rose-500/15 border border-rose-500/30 text-[11px] text-rose-200 font-medium backdrop-blur-md shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
                      <span>
                        Applied Privilege: {comboDiscount > 0 ? `${comboDiscount}% Multi-Service` : ""}{" "}
                        {comboDiscount > 0 && scaleDiscount > 0 ? "+" : ""}{" "}
                        {scaleDiscount > 0 ? `${scaleDiscount}% Scale Index` : ""} Offset
                      </span>
                    </div>
                  )}

                  {/* Breakdown Progress Bars - Tri-Color Neon Jewel Meters with Frosted Glass Plate */}
                  {selectedServices.length > 0 && (
                    <div className="mt-7 sm:mt-9 space-y-4 bg-white/[0.04] backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/10 shadow-inner">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E6B566]/90">
                          Capital Allocation Matrix
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" title="Architecture & Planning" />
                          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" title="Material Procurement" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" title="Artisans & Execution" />
                        </div>
                      </div>
                      
                      {[
                        { 
                          label: "Design, Architecture & 3D Planning", 
                          pct: 10, 
                          detail: "Floorplans, elevations, structural CAD & digital twin visuals", 
                          gradient: "from-blue-600 via-blue-500 to-indigo-500",
                          glow: "shadow-[0_0_12px_rgba(59,130,246,0.4)]",
                          textColor: "text-blue-300",
                          dotColor: "bg-blue-400"
                        },
                        { 
                          label: "High-Specification Material Procurement", 
                          pct: 55, 
                          detail: "Italian marble, engineered core, imported hardware & veneers", 
                          gradient: "from-amber-500 via-rose-500 to-rose-600",
                          glow: "shadow-[0_0_12px_rgba(244,63,94,0.4)]",
                          textColor: "text-rose-300",
                          dotColor: "bg-rose-400"
                        },
                        { 
                          label: "Master Artisans & Turnkey Execution", 
                          pct: 35, 
                          detail: "Master carpenters, site architects & QA engineering", 
                          gradient: "from-emerald-500 via-emerald-400 to-teal-400",
                          glow: "shadow-[0_0_12px_rgba(16,185,129,0.4)]",
                          textColor: "text-emerald-300",
                          dotColor: "bg-emerald-400"
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-stone-200 flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                              {item.label}
                            </span>
                            <span className={`${item.textColor} font-mono font-bold text-xs`}>{item.pct}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden p-[1px]">
                            <div
                              className={`h-full bg-gradient-to-r ${item.gradient} rounded-full transition-all duration-500 ${item.glow}`}
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                          <span className="block text-[10px] text-stone-400 font-light leading-none">
                            {item.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Primary CTA - Gleaming Haute Champagne Gold Button */}
                <div className="relative z-10 mt-7 sm:mt-10 space-y-3 sm:space-y-4">
                  <button
                    type="button"
                    onClick={startProject}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#E6B566] via-[#F3DBA3] to-[#C5A059] hover:from-[#ECC278] hover:to-[#B89243] text-[#0A0E18] shadow-[0_12px_35px_-5px_rgba(230,181,102,0.45)] hover:shadow-[0_16px_45px_-5px_rgba(230,181,102,0.6)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 rounded-full font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Request Architectural Dossier</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#0A0E18]" />
                  </button>
                  <p className="text-[10.5px] text-center text-stone-400 leading-relaxed font-sans">
                    Ballpark modeling only. Actual project scope is itemized upon site survey and CAD architectural drawings.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServicesPage;
