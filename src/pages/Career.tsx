// src/pages/Career.tsx
import React, { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import { 
  Briefcase, 
  Users, 
  ChevronDown, 
  Star, 
  ArrowRight, 
  MapPin, 
  CheckCircle2,
  X,
  Send,
  Compass,
  Award
} from "lucide-react";

// --- HELPERS ---
function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"; 
    img.alt = "Younick studio image fallback";
  }
}

// --- DATA STRUCTURES ---
const CORE_VALUES = [
  {
    title: "Craft Above Speed",
    description: "We believe in the slow, meticulous patience of making. No cutting corners, no rushed joints.",
    icon: Award,
    id: "value-01"
  },
  {
    title: "Material Honesty",
    description: "We honor the nature of elements. Teak stays warm, stone remains cold, brass ages with grace.",
    icon: Compass,
    id: "value-02"
  },
  {
    title: "Millimeter Precision",
    description: "The distance between good and exceptional design is measured in millimeters.",
    icon: Star,
    id: "value-03"
  },
  {
    title: "Collective Voice",
    description: "Egos are left at the door. Every voice in the studio has a right to shape the space.",
    icon: Users,
    id: "value-04"
  }
];

const OPEN_ROLES = [
  {
    id: "role-1",
    title: "Junior Interior Architect",
    department: "Design",
    type: "Full-Time",
    location: "Jaipur Studio",
    experience: "1-3 Years",
    description: "We are seeking a junior architect with a strong eye for spatial flow, material combinations, and detailed construction drawings.",
    responsibilities: [
      "Develop detailed 2D construction drawings, layouts, and elevations.",
      "Collaborate on material selection, moodboards, and finishes.",
      "Assist in coordinating with on-site contractors and vendors.",
      "Translate schematic designs into photorealistic concepts."
    ],
    requirements: [
      "Degree in Architecture or Interior Design.",
      "Proficiency in AutoCAD, SketchUp, and Adobe Creative Suite.",
      "Strong understanding of joinery details and material applications.",
      "Excellent communication and presentation skills."
    ]
  },
  {
    id: "role-2",
    title: "Senior 3D Visualizer",
    department: "Design",
    type: "Full-Time",
    location: "Jaipur Studio",
    experience: "3-5 Years",
    description: "Lead our rendering and visualization pipeline. We need someone who can turn concepts into atmospheric, light-rich, photorealistic spatial realities.",
    responsibilities: [
      "Create high-end, photorealistic 3D interior and exterior renders.",
      "Maintain a unified visual direction, texturing, and lighting system.",
      "Manage render assets, material library, and pipeline optimization.",
      "Work closely with lead designers to refine spatial details."
    ],
    requirements: [
      "Expertise in 3ds Max + Corona Renderer or V-Ray, and Photoshop.",
      "Strong understanding of architectural lighting, composition, and texturing.",
      "Ability to interpret CAD files and designer sketches accurately.",
      "Portfolio demonstrating photo-realism and architectural styling."
    ]
  },
  {
    id: "role-3",
    title: "Project Site Supervisor",
    department: "Execution",
    type: "Full-Time",
    location: "On-Site (Jaipur)",
    experience: "2-4 Years",
    description: "Oversee site progress and ensure construction matches Younick's signature standards of craftsmanship, accuracy, and finish quality.",
    responsibilities: [
      "Supervise daily on-site carpentry, masonry, electrical, and finishing work.",
      "Perform quality checks against construction drawings and specifications.",
      "Coordinate material deliveries, vendor timelines, and contractor tasks.",
      "Report daily progress and resolve site challenges proactively."
    ],
    requirements: [
      "Diploma/Degree in Civil Engineering or Interior Execution.",
      "Deep understanding of interior fit-out processes and tolerances.",
      "Experience handling contractors and managing site labor.",
      "Fluent in local language and technical drawings."
    ]
  },
  {
    id: "role-4",
    title: "Design & Research Intern",
    department: "Internships",
    type: "3-6 Months",
    location: "Jaipur Studio",
    experience: "Freshers / Students",
    description: "A hands-on role for students or recent graduates to learn from our senior collective, assist in material sourcing, and draft live project elements.",
    responsibilities: [
      "Assist in moodboard creation, drafting, and model making.",
      "Research local craftsmen, materials, and historical finishes.",
      "Participate in client dialogues and site inspection visits.",
      "Maintain the studio's physical material library."
    ],
    requirements: [
      "Currently pursuing or recently completed architectural/interior studies.",
      "Eager to learn, with a strong work ethic and attention to detail.",
      "Basic knowledge of CAD software and spatial modeling.",
      "Appreciation for raw materiality and organic craftsmanship."
    ]
  }
];

const PERKS = [
  {
    title: "Creative Ownership",
    description: "Own your design paths from initial concept sketch to ultimate delivery."
  },
  {
    title: "Jaipur Studio Space",
    description: "A beautifully curated workspace built inside the historic pink city."
  },
  {
    title: "Live Site & Craft Exposure",
    description: "Work directly with master craftsmen, stone artisans, and timber workshops."
  },
  {
    title: "Mentorship & Growth",
    description: "Receive daily guidance from the studio's principals and senior team."
  }
];

// --- MAIN COMPONENT ---
const Career: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"All" | "Design" | "Execution" | "Internships">("All");
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);
  const [applyingRole, setApplyingRole] = useState<typeof OPEN_ROLES[0] | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    portfolio: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    portfolio: ""
  });

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", portfolio: "" };

    const cleanName = formValues.name.trim();
    if (cleanName.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(formValues.portfolio.trim())) {
      newErrors.portfolio = "Please enter a valid URL (e.g. https://website.com).";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (name in errors) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus("sending");
      
      const sanitized = {
        name: formValues.name.replace(/<[^>]*>/g, "").trim(),
        email: formValues.email.replace(/<[^>]*>/g, "").trim(),
        portfolio: formValues.portfolio.replace(/<[^>]*>/g, "").trim(),
        message: formValues.message.replace(/<[^>]*>/g, "").trim()
      };
      
      // Simulate form submission using sanitized data
      setTimeout(() => {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setApplyingRole(null);
          setFormValues({ name: "", email: "", portfolio: "", message: "" });
        }, 1500);
      }, 1200);
    }
  };

  const filteredRoles = OPEN_ROLES.filter(role => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Internships") return role.department === "Internships";
    return role.department === activeFilter;
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && applyingRole) {
        setApplyingRole(null);
        setStatus("idle");
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [applyingRole]);

  return (
    <>
      <SEOHead seo={pageSEO.career ?? { title: "Career - Younick" }} />

      <main className="bg-white min-h-screen pt-20">
        {/* --- HERO SECTION: EDITORIAL --- */}
        <header className="relative min-h-[85vh] flex items-center bg-[#18181B] text-white overflow-hidden">
        {/* Background decoration grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-[#B08D57]"></span>
                <span className="font-mono text-xs font-bold tracking-widest text-[#B08D57] uppercase">Join the Collective</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-[1.05] tracking-tight">
                Shape the <br />
                <span className="italic text-[#B08D57]">Future of Space.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-xl mb-10 border-l-2 border-[#B08D57] pl-6">
                We are a collective of designers, builders, and detail obsessives who build spaces that breathe. We are always looking for new minds who respect the grid, the materials, and the craft.
              </p>
              <a 
                href="#roles" 
                className="inline-flex items-center gap-3 bg-[#B08D57] hover:bg-[#967748] text-[#18181B] font-mono text-xs uppercase tracking-widest px-8 py-4 font-bold transition-all duration-300 hover:shadow-lg shadow-black/20"
              >
                Explore Open Roles <ArrowRight size={14} />
              </a>
            </div>

            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="absolute -top-10 -left-10 w-32 h-32 border-l-2 border-t-2 border-[#B08D57]/30 pointer-events-none" />
              <div className="relative rounded-sm overflow-hidden h-[450px]">
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592dedb80256?auto=format&fit=crop&q=80&w=800" 
                  alt="Architecture work desk" 
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                  onError={handleImgError}
                />
                <div className="absolute bottom-6 left-6 z-20 bg-[#18181B]/90 backdrop-blur border border-white/10 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white">
                  [ The Studio Craft ]
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- SECTION: CORE PILLARS / VALUES BENTO --- */}
      <section className="bg-[#18181B] text-white py-24 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 border-b border-white/10 pb-8">
            <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-3 block uppercase">[ How We Work ]</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">Our Core Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val) => (
              <div 
                key={val.id} 
                className="bg-white/5 p-8 rounded-sm border border-white/5 hover:border-[#B08D57]/30 transition-colors group flex flex-col justify-between min-h-[260px]"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="p-3 bg-white/5 rounded-sm group-hover:bg-[#B08D57]/10 transition-colors">
                    <val.icon className="text-[#B08D57] group-hover:scale-110 transition-transform duration-500" size={24} />
                  </div>
                  <span className="font-mono text-white/20 text-xs uppercase tracking-widest">{val.id.split("-")[1]}</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-3 text-white">{val.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: ROLES EXPLORER --- */}
      <section id="roles" className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-gray-100">
            <div>
              <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-3 block uppercase">[ OPPORTUNITIES ]</span>
              <h2 className="text-4xl md:text-6xl font-serif text-[#18181B] tracking-tight">Open Opportunities</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
              We look for people who respect materials, love spatial alignment, and can collaborate under rigorous schedules.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-6">
            {(["All", "Design", "Execution", "Internships"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setExpandedRoleId(null);
                }}
                className={`font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-sm border transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-[#18181B] border-[#18181B] text-white shadow-sm"
                    : "bg-transparent border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4 max-w-5xl">
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => {
                const isExpanded = expandedRoleId === role.id;
                return (
                  <div 
                    key={role.id}
                    className={`border transition-all duration-300 rounded-sm ${
                      isExpanded 
                        ? "border-[#B08D57] bg-[#FAF9F6]/30 shadow-md shadow-[#B08D57]/5" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Header Trigger */}
                    <button
                      onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                      className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-6"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="font-mono text-[10px] font-bold text-[#B08D57] uppercase tracking-widest bg-[#B08D57]/10 px-2 py-0.5 rounded-full">
                            {role.department}
                          </span>
                          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <MapPin size={10} /> {role.location}
                          </span>
                        </div>
                        <h3 className="text-2xl font-serif text-[#18181B]">{role.title}</h3>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <span className="font-mono text-xs text-gray-500 block">{role.type}</span>
                          <span className="font-mono text-[10px] text-gray-400 block">{role.experience}</span>
                        </div>
                        <div className={`p-2 rounded-full border transition-transform duration-300 ${
                          isExpanded ? "border-[#B08D57] bg-[#B08D57]/10 rotate-180" : "border-gray-200 text-gray-400"
                        }`}>
                          <ChevronDown size={18} className={isExpanded ? "text-[#B08D57]" : ""} />
                        </div>
                      </div>
                    </button>

                    {/* Expandable Details Panel */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? "max-h-[1000px] border-t border-gray-100" : "max-h-0"
                      }`}
                    >
                      <div className="p-6 md:p-8 space-y-8">
                        <div>
                          <p className="text-gray-600 text-base leading-relaxed max-w-3xl">
                            {role.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-mono text-xs font-bold text-[#18181B] uppercase tracking-widest mb-4">
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-3">
                              {role.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-500">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] shrink-0 mt-1.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-mono text-xs font-bold text-[#18181B] uppercase tracking-widest mb-4">
                              What We Look For
                            </h4>
                            <ul className="space-y-3">
                              {role.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-500">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] shrink-0 mt-1.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="font-mono text-xs text-gray-400">
                            Role Type: <span className="font-bold text-gray-600">{role.type}</span> | Exp: <span className="font-bold text-gray-600">{role.experience}</span>
                          </div>
                          <button
                            onClick={() => setApplyingRole(role)}
                            className="bg-[#18181B] hover:bg-[#B08D57] hover:text-[#18181B] text-white font-mono text-xs uppercase tracking-widest px-6 py-3 font-bold transition-colors duration-300 rounded-sm"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="border border-dashed border-gray-200 rounded-sm p-12 text-center">
                <Briefcase className="text-gray-300 mx-auto mb-4" size={36} />
                <p className="text-gray-500 font-mono text-sm">No active roles in this department currently.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- SECTION: LIFE AT THE STUDIO (VISUAL GALLERY) --- */}
      <section className="bg-[#18181B] text-white py-24 px-6 relative overflow-hidden border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
            <div>
              <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-3 block uppercase">[ STUDIO CULTURE ]</span>
              <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">Life at Younick</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
              We work in a high-collaboration, open-workspace design house. We balance rigorous drafting with daily site visits and materials research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative rounded-sm overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                alt="Stone and materials checking"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={handleImgError}
              />
              <div className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-white">
                Sourcing & Materials
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-sm overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
              <img
                src="https://images.unsplash.com/photo-1503387762-592dedb80256?auto=format&fit=crop&q=80&w=800"
                alt="Drafting blueprints"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={handleImgError}
              />
              <div className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-white">
                Drafting & Visuals
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-sm overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
              <img
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800"
                alt="Bespoke furniture joinery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={handleImgError}
              />
              <div className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-white">
                Site & Craft Work
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: PERKS & BENEFITS GRID --- */}
      <section className="py-24 px-6 bg-[#FAF9F6] border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-4 block uppercase">
            [ STUDIO PERKS ]
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#18181B] mb-16 tracking-tight">
            Why Grow With Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {PERKS.map((perk, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-sm border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-1.5 h-1.5 bg-[#B08D57] rounded-full mb-6" />
                  <h3 className="text-lg font-serif text-[#18181B] mb-3">{perk.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-light">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- APPLICATION FORM OVERLAY MODAL --- */}
      {applyingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300" role="dialog" aria-modal="true" aria-labelledby="career-modal-title">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-xl overflow-hidden relative border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Header bar */}
            <div className="bg-[#18181B] text-white p-6 md:p-8 flex justify-between items-center">
              <div>
                <span className="font-mono text-[10px] text-[#B08D57] uppercase tracking-widest block mb-1">
                  Applying For:
                </span>
                <h3 id="career-modal-title" className="text-xl md:text-2xl font-serif text-white">{applyingRole.title}</h3>
              </div>
              <button
                onClick={() => {
                  setApplyingRole(null);
                  setStatus("idle");
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                aria-label="Close form modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 md:p-8">
              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-xl font-serif text-[#18181B]">Application Received</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for applying. Our operations team will review your credentials and contact you within 5 working days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-6">
                  <div>
                    <label htmlFor="modal-name" className="block font-mono text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      id="modal-name"
                      name="name"
                      type="text"
                      value={formValues.name}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "career-name-error" : undefined}
                      placeholder="e.g. Kabir Singh"
                      className="w-full bg-[#FAF9F6] border border-gray-200 rounded-sm px-4 py-3 text-sm text-[#18181B] placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B08D57] focus:border-transparent transition-all"
                    />
                    {errors.name && <span id="career-name-error" className="text-red-500 text-[10px] font-mono tracking-wide mt-1 block">{errors.name}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-email" className="block font-mono text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                        Email Address *
                      </label>
                      <input
                        required
                        id="modal-email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "career-email-error" : undefined}
                        placeholder="e.g. kabir@email.com"
                        className="w-full bg-[#FAF9F6] border border-gray-200 rounded-sm px-4 py-3 text-sm text-[#18181B] placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B08D57] focus:border-transparent transition-all"
                      />
                      {errors.email && <span id="career-email-error" className="text-red-500 text-[10px] font-mono tracking-wide mt-1 block">{errors.email}</span>}
                    </div>
                    <div>
                      <label htmlFor="modal-portfolio" className="block font-mono text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                        Portfolio Link *
                      </label>
                      <input
                        required
                        id="modal-portfolio"
                        name="portfolio"
                        type="url"
                        value={formValues.portfolio}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.portfolio}
                        aria-describedby={errors.portfolio ? "career-portfolio-error" : undefined}
                        placeholder="e.g. Behance or website"
                        className="w-full bg-[#FAF9F6] border border-gray-200 rounded-sm px-4 py-3 text-sm text-[#18181B] placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B08D57] focus:border-transparent transition-all"
                      />
                      {errors.portfolio && <span id="career-portfolio-error" className="text-red-500 text-[10px] font-mono tracking-wide mt-1 block">{errors.portfolio}</span>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-message" className="block font-mono text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                      Cover Note (Brief introduction)
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={3}
                      value={formValues.message}
                      onChange={handleInputChange}
                      placeholder="Tell us why you want to design/build with Younick..."
                      className="w-full bg-[#FAF9F6] border border-gray-200 rounded-sm px-4 py-3 text-sm text-[#18181B] placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B08D57] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-[#18181B] text-white hover:bg-[#B08D57] hover:text-[#18181B] font-mono text-xs uppercase tracking-widest py-4 font-bold transition-all duration-300 rounded-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    {status === "sending" ? (
                      <>Sending Application...</>
                    ) : (
                      <>
                        Submit Application <Send size={12} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      </main>
    </>
  );
};

export default Career;
