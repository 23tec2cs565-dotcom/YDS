import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle2,
  Briefcase,
  Clock
} from "lucide-react";

import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";



function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"; 
    img.alt = "Younick studio image fallback";
  }
}

// --- COMPONENTS ---

const Marquee = () => (
  <div className="bg-[#18181B] text-[#E6B566] py-4 overflow-hidden border-y border-[#E6B566]/20">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex gap-12 px-6 items-center uppercase tracking-[0.2em] text-sm font-bold">
          <span>Architecture</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
          <span>Interior Design</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
          <span>Restoration</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
          <span>Consultancy</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
          <span>Styling</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
        </div>
      ))}
    </div>
  </div>
);


const blueprintSteps = [
  {
    id: "01",
    phase: "Discover & Dialogue",
    subtitle: "Lifestyle Mapping & Spatial Analysis",
    description: "Before drawing a single line, we map how you live. We analyze daily routines, lighting requirements, and your emotional relationship with the space to establish a foundational design intent.",
    details: [
      "Site analysis & sunpath mapping",
      "Material preference dialogues",
      "Functional space utilization audits",
      "Initial budget & timeline mapping"
    ],
    tag: "Foundational"
  },
  {
    id: "02",
    phase: "Design & Visualize",
    subtitle: "3D Rendering, Moodboards & Layouts",
    description: "We translate discussions into precise spatial layouts and hyper-realistic 3D visualizations. This is where volumes, lighting, and materiality meet, allowing you to walk through the space virtually.",
    details: [
      "Photorealistic 3D visualization",
      "Detailed floor layouts & furniture plans",
      "Initial material moodboards",
      "Lighting design & electrical planning"
    ],
    tag: "Conceptual"
  },
  {
    id: "03",
    phase: "Curate & Source",
    subtitle: "Natural Stone, Teak & Custom Brass",
    description: "We source authentic, raw materials directly from trusted quarries and craft workshops. Every block of marble, panel of teak, and custom brass detail is hand-selected to ensure organic unity.",
    details: [
      "Direct sourcing from stone quarries",
      "Bespoke brass hardware detailing",
      "Premium seasoned teak selection",
      "Upholstery & textile curation"
    ],
    tag: "Materiality"
  },
  {
    id: "04",
    phase: "Construct & Deliver",
    subtitle: "On-Site Supervision & Finishing",
    description: "The execution phase is overseen with rigorous civil and interior supervision. Our dedicated project managers and master craftsmen collaborate daily to deliver millimeter-perfect installation.",
    details: [
      "Daily master-craftsman supervision",
      "Precision joinery & stone installation",
      "Strict timeline tracking (4-8 weeks)",
      "Final styling & white-glove handover"
    ],
    tag: "Realization"
  }
];

const AboutContent = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <>
      <SEOHead seo={pageSEO.about} />
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scroll 30s linear infinite;
        }
        .font-mono-num {
          font-variant-numeric: tabular-nums;
        }
      `}</style>

      <main className="bg-white min-h-screen">
        
        {/* --- HERO SECTION: EDITORIAL STYLE --- */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
          {/* Background decoration lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-end mb-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="w-12 h-[1px] bg-[#B08D57]"></span>
                  <span className="font-mono text-xs font-bold tracking-widest text-[#B08D57] uppercase">Est. 2018 — Jaipur</span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#18181B] leading-[0.9] tracking-tighter">
                  Studio <br/>
                  <span className="italic text-[#B08D57] pl-4 md:pl-12">Younick.</span>
                </h1>
              </div>
              <div className="lg:w-1/3 pb-4">
                <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed border-l-2 border-[#B08D57] pl-6">
                  We are a collective of designers and craftsmen obsessed with the <span className="text-[#18181B] font-medium">art of longevity</span>. We don't just fill spaces; we curate environments that breathe.
                </p>
              </div>
            </div>

            {/* Cinematic Image Strip */}
            <div className="grid grid-cols-12 gap-4 h-[400px] md:h-[500px]">
              <div className="col-span-12 md:col-span-8 relative rounded-sm overflow-hidden group">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10" />
                <img 
                  src="/younick-about-hero.jpg" 
                  alt="Studio Main" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={handleImgError}
                />
                <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur px-4 py-2 text-xs font-mono uppercase tracking-widest">
                  [01] The Studio
                </div>
              </div>
              <div className="hidden md:block md:col-span-4 relative rounded-sm overflow-hidden group">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10" />
                 <img 
                  src="/younick-thumb3.jpg" 
                  alt="Studio Detail" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={handleImgError}
                />
                <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur px-4 py-2 text-xs font-mono uppercase tracking-widest">
                  [02] The Craft
                </div>
              </div>
            </div>
          </div>
        </section>

        <Marquee />

        {/* --- PHILOSOPHY: BENTO GRID STYLE --- */}
        <section className="bg-[#18181B] text-white py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
              <h2 className="text-4xl md:text-6xl font-serif">Why We Build</h2>
              <Link to="/projects" className="group flex items-center gap-2 mt-4 md:mt-0 text-[#B08D57] font-mono text-sm uppercase tracking-widest hover:text-white transition-colors">
                View Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Stat Card 1 - Large */}
              <div className="lg:col-span-2 bg-white/5 p-8 rounded-sm border border-white/5 hover:border-[#B08D57]/30 transition-colors group">
                <div className="flex justify-between items-start mb-12">
                   <Briefcase className="text-[#B08D57] group-hover:scale-110 transition-transform duration-500" size={32} />
                   <span className="font-mono text-white/30 text-xs">[ 01 ]</span>
                </div>
                <h3 className="text-2xl font-serif mb-4">Integrated Practice</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  We bridge the gap between imagination and execution. By handling design, visualization, and construction under one roof, we ensure the vision never gets lost in translation.
                </p>
                <div className="flex gap-2">
                   <span className="px-3 py-1 bg-white/10 text-xs rounded-full">Architecture</span>
                   <span className="px-3 py-1 bg-white/10 text-xs rounded-full">Interiors</span>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-white/5 p-8 rounded-sm border border-white/5 hover:border-[#B08D57]/30 transition-colors group">
                <div className="flex justify-between items-start mb-8">
                   <Clock className="text-[#B08D57] group-hover:rotate-12 transition-transform duration-500" size={32} />
                   <span className="font-mono text-white/30 text-xs">[ 02 ]</span>
                </div>
                <h3 className="text-xl font-serif mb-2">Precision Timing</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We respect the calendar as much as the canvas. 4-8 weeks for renovations, milestones defined from Day 1.
                </p>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-white/5 p-8 rounded-sm border border-white/5 hover:border-[#B08D57]/30 transition-colors group">
                <div className="flex justify-between items-start mb-8">
                   <CheckCircle2 className="text-[#B08D57] group-hover:scale-110 transition-transform duration-500" size={32} />
                   <span className="font-mono text-white/30 text-xs">[ 03 ]</span>
                </div>
                <h3 className="text-xl font-serif mb-2">Quality Control</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Rigorous material checks and site inspections. We don't sign off until the finish matches the render.
                </p>
              </div>

              {/* Number Stats - Horizontal */}
              <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                 <div className="bg-[#B08D57] p-6 text-[#18181B] flex flex-col justify-between h-32 hover:bg-white transition-colors duration-300 group">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60">Projects</span>
                    <span className="text-5xl font-serif font-medium">30+</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-6 flex flex-col justify-between h-32 hover:bg-[#B08D57] hover:text-[#18181B] transition-colors duration-300 group">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-60">Established</span>
                    <span className="text-5xl font-serif font-medium">2018</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-6 flex flex-col justify-between h-32 hover:bg-[#B08D57] hover:text-[#18181B] transition-colors duration-300 group">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-60">Base</span>
                    <span className="text-3xl font-serif font-medium truncate">Jaipur</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-6 flex items-center justify-center h-32 hover:bg-[#B08D57] hover:text-[#18181B] transition-colors duration-300 group cursor-pointer">
                    <div className="flex items-center gap-2">
                       <span className="font-mono text-sm uppercase tracking-widest font-bold">Meet The Team</span>
                       <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- SECTION: DESIGN ETHOS CINEMATIC QUOTE --- */}
        <section className="bg-[#18181B] text-white py-28 px-6 border-t border-white/5 relative overflow-hidden">
          {/* Subtle gold decorative element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-[#B08D57] to-transparent" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B08D57] block mb-8">
              [ Our Creed ]
            </span>
            <blockquote className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white/90 leading-snug tracking-tight mb-8">
              "We do not build for the present moment. We build for the memories that will inhabit the space, and the quiet dignity of materials that age beautifully."
            </blockquote>
            <cite className="not-italic font-mono text-xs uppercase tracking-widest text-[#B08D57]/70">
              — Younick Design Ethos
            </cite>
          </div>
        </section>

        {/* --- TEAM TEASER: MAGAZINE STYLE --- */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
               <div className="absolute -top-10 -left-10 w-32 h-32 border-l-2 border-t-2 border-[#B08D57] opacity-50" />
               <div className="grid grid-cols-2 gap-4">
                 <img src="/younick-thumb1.jpg" onError={handleImgError} className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm" alt="Team Work" />
                 <img src="/younick-thumb2.jpg" onError={handleImgError} className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm translate-y-8" alt="Team Meeting" />
               </div>
            </div>
            <div className="md:w-1/2">
               <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-4 block">[ THE COLLECTIVE ]</span>
               <h3 className="text-5xl font-serif text-[#18181B] mb-6">Humans First,<br/>Designers Second.</h3>
               <p className="text-gray-600 text-lg leading-relaxed mb-8">
                 We are a compact collective of designers, engineers, and project managers. Our process begins with listening—understanding how people live, move, and inhabit spaces—and ends with carefully detailed execution.
               </p>
               <Link to="/team" className="inline-block border-b border-[#18181B] pb-1 text-[#18181B] font-medium hover:text-[#B08D57] hover:border-[#B08D57] transition-colors">
                 Read Our Story
               </Link>
            </div>
          </div>
        </section>

        {/* --- SECTION: YOUNICK BLUEPRINT --- */}
        <section className="py-24 px-6 bg-[#FAF9F6] border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-16">
              <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-3 block">[ THE PROCESS ]</span>
              <h2 className="text-4xl md:text-6xl font-serif text-[#18181B] tracking-tight">The Younick Blueprint</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Interactive Steps List */}
              <div className="lg:col-span-5 space-y-4">
                {blueprintSteps.map((step, index) => {
                  const isActive = activeStep === index;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(index)}
                      className={`w-full text-left p-6 md:p-8 rounded-sm border transition-all duration-300 flex items-start gap-6 group ${
                        isActive
                          ? "bg-white border-[#B08D57] shadow-md shadow-[#B08D57]/5"
                          : "bg-transparent border-gray-200/60 hover:border-gray-300"
                      }`}
                    >
                      <span className={`font-mono text-sm tracking-wider font-bold transition-colors ${
                        isActive ? "text-[#B08D57]" : "text-gray-400 group-hover:text-gray-600"
                      }`}>
                        {step.id}
                      </span>
                      <div className="flex-1">
                        <h4 className={`text-xl font-serif mb-1 transition-colors ${
                          isActive ? "text-[#18181B]" : "text-gray-500 group-hover:text-gray-800"
                        }`}>
                          {step.phase}
                        </h4>
                        <p className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                          isActive ? "text-[#B08D57]" : "text-gray-400 group-hover:text-gray-500"
                        }`}>
                          {step.tag}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Step Detail Card */}
              <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-sm border border-gray-200/80 shadow-sm min-h-[450px] flex flex-col justify-between transition-all duration-500">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-[#B08D57] text-sm tracking-widest font-bold">
                      PHASE {blueprintSteps[activeStep].id}
                    </span>
                    <span className="px-3 py-1 bg-[#B08D57]/10 text-[#B08D57] font-mono text-xs uppercase tracking-widest rounded-full">
                      {blueprintSteps[activeStep].tag}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-serif text-[#18181B] mb-2 transition-all">
                    {blueprintSteps[activeStep].phase}
                  </h3>
                  <p className="text-[#B08D57] font-mono text-xs tracking-wider uppercase mb-6">
                    {blueprintSteps[activeStep].subtitle}
                  </p>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {blueprintSteps[activeStep].description}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-8">
                  <h5 className="font-mono text-xs font-bold text-[#18181B] uppercase tracking-widest mb-4">
                    Key Focus Deliverables:
                  </h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {blueprintSteps[activeStep].details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION: SIGNATURE CRAFTSMANSHIP DETAIL GALLERY --- */}
        <section className="bg-[#18181B] text-white py-24 px-6 relative overflow-hidden border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
              <div>
                <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-3 block">[ MATERIALITY & DETAILS ]</span>
                <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">Bespoke Craftsmanship</h2>
              </div>
              <p className="text-gray-400 text-sm max-w-sm mt-4 md:mt-0 font-light">
                We select, cut, and finish every element by hand. Our materials tell a story of natural origin and human touch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Teak Joinery */}
              <div className="group relative rounded-sm overflow-hidden bg-white/5 border border-white/5 transition-all duration-500 hover:border-[#B08D57]/30 flex flex-col h-[500px]">
                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800"
                    alt="Teak Joinery"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={handleImgError}
                  />
                  <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                    Woodwork
                  </div>
                </div>
                <div className="p-8 bg-white/5 z-20">
                  <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase mb-2 block">Detail 01</span>
                  <h3 className="text-xl font-serif text-white mb-2">Bespoke Teak Joinery</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">
                    Seasoned teak wood joined with traditional mortise-and-tenon connections, celebrating natural expansion and contraction.
                  </p>
                </div>
              </div>

              {/* Card 2: Brass Details */}
              <div className="group relative rounded-sm overflow-hidden bg-white/5 border border-white/5 transition-all duration-500 hover:border-[#B08D57]/30 flex flex-col h-[500px]">
                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
                    alt="Brass Detailing"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={handleImgError}
                  />
                  <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                    Hardware
                  </div>
                </div>
                <div className="p-8 bg-white/5 z-20">
                  <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase mb-2 block">Detail 02</span>
                  <h3 className="text-xl font-serif text-white mb-2">Hand-Polished Brass</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">
                    Unlacquered brass accents and pulls designed to develop a rich, localized patina over decades of direct touch.
                  </p>
                </div>
              </div>

              {/* Card 3: Stone Joints */}
              <div className="group relative rounded-sm overflow-hidden bg-white/5 border border-white/5 transition-all duration-500 hover:border-[#B08D57]/30 flex flex-col h-[500px]">
                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800"
                    alt="Stone Joints"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={handleImgError}
                  />
                  <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                    Masonry
                  </div>
                </div>
                <div className="p-8 bg-white/5 z-20">
                  <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase mb-2 block">Detail 03</span>
                  <h3 className="text-xl font-serif text-white mb-2">Book-Matched Stone</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">
                    Precision-mitred stone intersections sourced from Rajasthan quarries, aligning natural grain flow seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION: MONOCHROMATIC PRESS & RECOGNITION GRID --- */}
        <section className="py-24 px-6 bg-white border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto text-center">
            <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-12 block uppercase">
              [ Selected Recognition ]
            </span>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 items-center justify-center">
              {[
                { name: "ARCHITECTURAL DIGEST", style: "font-serif tracking-[0.25em] text-sm font-semibold" },
                { name: "ELLE DECOR", style: "font-serif tracking-[0.3em] text-base italic font-bold" },
                { name: "DECO INDIA", style: "font-mono tracking-[0.2em] text-sm uppercase font-black" },
                { name: "JAIPUR ARCH FORUM", style: "font-serif tracking-[0.15em] text-xs uppercase font-light" }
              ].map((press, idx) => (
                <div 
                  key={idx}
                  className="flex justify-center items-center py-6 px-4 transition-all duration-300 hover:scale-105"
                >
                  <span className={`${press.style} text-gray-400 hover:text-[#B08D57] cursor-default transition-colors duration-300 selection:bg-transparent`}>
                    {press.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

const About: React.FC = () => {
  return (
    <AboutContent />
  );
};

export default About;