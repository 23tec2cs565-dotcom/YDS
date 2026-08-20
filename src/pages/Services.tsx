import React, { useRef, useState, useMemo } from "react";
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
import { services as SERVICES } from "../data/services";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import { useNavigate } from "react-router-dom";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"; 
    img.alt = "Younick studio image fallback";
  }
}


const STATS = [
  { label: "Years of Experience", value: "12+" },
  { label: "Projects Completed", value: "150+" },
  { label: "Design Awards", value: "08" },
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
  const visibleServices = (SERVICES || []).filter((s) => allowedIds.has(s.id));
  const navigate = useNavigate();
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
    navigate(`/services/${id}`);
  };

  const startProject = () => {
    navigate("/contact");
  };

  return (
    <>
      <SEOHead seo={pageSEO.services} />

      {/* Hero */}
      <header className="mt-24 relative bg-[#0F0F10] text-white overflow-hidden min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Services Background"
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
        <div className="bg-[#0F0F10] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 divide-x divide-white/10">
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
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
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
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
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
                  <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
                    alt="Process"
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

        {/* Interactive Budget Estimator Section */}
        <section className="py-12 sm:py-24 px-5 sm:px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-16">
              <span className="text-[#8C6226] font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">
                Interactive Tool
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-gray-900 tracking-tight">
                Project Budget Estimator
              </h2>
              <p className="mt-3 sm:mt-4 text-gray-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
                Estimate your custom project costs instantly. Select multiple services, your location, area size, and finish quality to plan your next space.
              </p>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-stretch">
              
              {/* Controls Column (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
                
                {/* Service Selector */}
                <div className="mb-5 sm:mb-8">
                  <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 sm:mb-4">
                    1. Select Services (Select Multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[
                      { id: "interior-design", label: "Interior Design", icon: "Paintbrush", desc: "Lighting, ceiling, furniture & woodwork" },
                      { id: "construction", label: "Turnkey Construction", icon: "Hammer", desc: "Civil architecture, brick & structure build" },
                      { id: "renovation", label: "Renovation", icon: "RefreshCw", desc: "Restoration, structural repairs & tiling" },
                      { id: "3d-visualization", label: "3D Visualization", icon: "Layers", desc: "Photo-realistic views & digital walkthroughs" },
                      { id: "consultation", label: "Design Consultation", icon: "HelpCircle", desc: "Layout planning & mood boards" }
                    ].map((svc) => {
                      const isSelected = selectedServices.includes(svc.id);
                      const SvcIcon = ESTIMATOR_ICON_MAP[svc.icon] ?? Home;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => toggleService(svc.id)}
                          className={`flex items-start text-left p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                            isSelected
                              ? "border-[#F9D2BA] bg-[#F9D2BA]/15 shadow-sm ring-1 ring-[#F9D2BA]"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className={`mr-2 sm:mr-3.5 mt-0.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl flex items-center justify-center ${
                            isSelected ? "bg-[#F9D2BA] text-gray-900 shadow-sm" : "bg-gray-100 text-gray-500"
                          }`}>
                            <SvcIcon size={16} />
                          </div>
                          <div>
                            <span className="block text-xs font-semibold text-gray-900 leading-none mb-0.5 sm:mb-1">
                              {svc.label}
                            </span>
                            <span className="hidden sm:block text-[11px] text-gray-400 leading-normal">
                              {svc.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-5 sm:mb-8 relative">
                  {/* Location Selector (Searchable Dropdown) */}
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor="city-search" className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                      2. Project Location
                    </label>
                    {hasRestrictedService && (
                      <span className="text-[10px] font-semibold text-[#8C6226] px-2 py-0.5 rounded-md bg-[#F9D2BA]/30 border border-[#F9D2BA]/50">
                        Rajasthan Only
                      </span>
                    )}
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Search size={15} />
                    </div>
                    <input
                      id="city-search"
                      name="city-search"
                      type="text"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#F9D2BA] focus:ring-2 focus:ring-[#F9D2BA]/40 outline-none transition-all bg-white text-gray-800"
                      placeholder={hasRestrictedService ? "Search Rajasthan locations near Jaipur..." : "Search major India cities..."}
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
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute left-0 right-0 mt-1 max-h-52 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1.5 scrollbar-thin">
                      {filteredCities.length === 0 ? (
                        <div className="px-4 py-3 text-xs text-gray-400 italic">
                          No matching cities found
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
                              className={`flex items-center justify-between w-full px-4 py-2.5 text-xs text-left transition-colors ${
                                isSelected
                                  ? "bg-[#F9D2BA]/25 text-gray-900 font-semibold"
                                  : "hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              <div>
                                <span className="block text-gray-900 font-medium">{city.label}</span>
                                <span className="block text-[10px] text-gray-400">{city.region}</span>
                              </div>
                              {isSelected && <Check size={12} className="text-[#8C6226]" />}
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* Service warning note */}
                  {hasRestrictedService && (
                    <div className="mt-3.5 p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-2.5">
                      <AlertCircle size={15} className="shrink-0 text-[#F9D2BA] mt-0.5" />
                      <div>
                        <span className="font-bold block mb-1 text-white text-xs uppercase tracking-wider">Location Restricted Service</span>
                        Turnkey Construction and Renovation services are limited only to select locations in Rajasthan (primarily Jaipur and nearby surrounding districts).
                      </div>
                    </div>
                  )}
                </div>

                {/* Area Slider */}
                <div className="mb-5 sm:mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor="area-number" className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                      3. Area of Project
                    </label>
                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-2.5 py-1 focus-within:border-[#F9D2BA] focus-within:ring-2 focus-within:ring-[#F9D2BA]/40 transition-all shadow-sm">
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
                        className="w-20 bg-transparent text-right font-serif text-sm font-bold text-gray-900 outline-none border-none p-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-[10px] font-sans font-normal text-gray-400">Sq. Ft.</span>
                    </div>
                  </div>
                  <input
                    id="area-range"
                    name="area-range"
                    type="range"
                    min="500"
                    max="6000"
                    step="100"
                    value={Math.max(500, Math.min(6000, area))}
                    onChange={(e) => setArea(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#F9D2BA]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                    <span>500 SQFT</span>
                    <span>3,000 SQFT</span>
                    <span>6,000 SQFT</span>
                  </div>
                </div>

                {/* Quality/Material Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    4. Material & Finish Grade
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "standard", label: "Classic", desc: "Quality essentials" },
                      { id: "premium", label: "Premium", desc: "Branded finishes" },
                      { id: "luxury", label: "Ultra-Luxury", desc: "Exotic & bespoke" }
                    ].map((g) => {
                      const isSelected = quality === g.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setQuality(g.id as "standard" | "premium" | "luxury")}
                          className={`flex flex-col items-center py-2 px-3 rounded-2xl border text-center transition-all duration-200 ${
                            isSelected
                              ? "border-[#F9D2BA] bg-[#F9D2BA]/15 shadow-sm ring-1 ring-[#F9D2BA]"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <span className={`block text-xs font-semibold ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                            {g.label}
                          </span>
                          <span className="block text-[10px] text-gray-400 mt-0.5">
                            {g.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Estimate Results Card (5 cols) */}
              <div className="lg:col-span-5 bg-[#0B1220] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-[#F9D2BA]/25 shadow-2xl shadow-[#0B1220]/25">
                
                {/* Accent glows */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#F9D2BA]/15 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B08D57]/10 rounded-full blur-[70px] pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-[#F9D2BA] text-[10px] font-bold uppercase tracking-[0.25em]">
                    Estimated Budget Range
                  </span>
                  
                  {/* Budget Counter */}
                  <div className="mt-4 mb-2">
                    {selectedServices.length === 0 ? (
                      <div className="text-2xl text-gray-400 font-serif py-4">
                        Please select a service...
                      </div>
                    ) : (
                      <div>
                        <div className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#F9D2BA] tracking-tight">
                          {formatCost(min)} - {formatCost(max)}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-2 tracking-wide font-mono">
                          *Estimated pricing for {selectedCityLabel || location} ({quality.charAt(0).toUpperCase() + quality.slice(1)} Grade)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Discounts Notifications */}
                  {(comboDiscount > 0 || scaleDiscount > 0) && (
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F9D2BA]/15 border border-[#F9D2BA]/30 text-[10.5px] text-[#F9D2BA]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F9D2BA] animate-pulse" />
                      <span>
                        Applied: {comboDiscount > 0 ? `${comboDiscount}% Combo` : ""}{" "}
                        {comboDiscount > 0 && scaleDiscount > 0 ? "+" : ""}{" "}
                        {scaleDiscount > 0 ? `${scaleDiscount}% Scale` : ""} Discount
                      </span>
                    </div>
                  )}

                  {/* Breakdown Progress Bars */}
                  {selectedServices.length > 0 && (
                    <div className="mt-6 sm:mt-9 space-y-4 sm:space-y-5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-white/10 pb-2">
                        Estimated Cost Allocation
                      </p>
                      
                      {[
                        { label: "Design & Planning", pct: 10, detail: "Architecture, 3D views & project layouts" },
                        { label: "Material Procurement", pct: 55, detail: "Core structural materials & premium fittings" },
                        { label: "Execution & Labor", pct: 35, detail: "Site managers, artisans & carpentry" }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-gray-200">{item.label}</span>
                            <span className="text-[#F9D2BA] font-mono">{item.pct}%</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#B08D57] to-[#F9D2BA] rounded-full"
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                          <span className="block text-[10px] text-gray-400 font-light leading-none">
                            {item.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                <div className="relative z-10 mt-6 sm:mt-10 space-y-3 sm:space-y-4">
                  <button
                    type="button"
                    onClick={startProject}
                    className="w-full py-4 px-6 bg-[#F9D2BA] text-[#0B1220] hover:bg-white transition-all duration-300 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#F9D2BA]/25 active:scale-[0.98] flex items-center justify-center gap-2 group"
                  >
                    Discuss This Estimate
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <p className="text-[10px] text-center text-gray-400 leading-normal">
                    Estimate is ballpark. Get in touch for a detailed, itemized quote based on your site drawings.
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
