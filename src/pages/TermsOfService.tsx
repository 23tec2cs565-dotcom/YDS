import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Scale, 
  AlertCircle, 
  CreditCard, 
  Clock, 
  RefreshCw, 
  Award, 
  ShieldCheck, 
  XCircle, 
  ArrowUp, 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

const SECTIONS = [
  {
    id: "scope-of-services",
    title: "Scope of Services",
    icon: CheckCircle2,
    content: (
      <div className="space-y-4">
        <p>Younick Design Studio provides architectural consultation, interior design planning, photorealistic 3D visualization, turnkey civil construction execution, and renovation services in Jaipur, Rajasthan, and nationwide.</p>
        <p>Our services include but are not limited to: Residential interior design (apartments, villas, independent houses), Commercial fit-outs (offices, retail stores, restaurants, gyms, hospitals), 3D photorealistic rendering and virtual walkthroughs, Space planning and furniture layout optimization, Material procurement and vendor coordination, Civil modifications (demolition, masonry, plumbing, electrical), Modular kitchen and wardrobe design, False ceiling, lighting, and paint execution.</p>
        <p>All services are subject to a formal project agreement signed by both parties before on-site execution begins.</p>
      </div>
    )
  },
  {
    id: "design-intellectual-property",
    title: "Design Intellectual Property",
    icon: Scale,
    content: (
      <div className="space-y-4">
        <p>All 3D visualization renders, CAD structural layouts, bespoke joinery details, mood boards, and spatial concepts authored by Younick Design Studio remain the intellectual property of the studio until full execution milestone settlement.</p>
        <p>Upon complete payment of all agreed milestones, design rights for the specific project transfer to the client for personal use only.</p>
        <p>The studio retains the right to feature completed projects in its portfolio, website, social media, and marketing materials unless the client explicitly requests confidentiality in writing.</p>
        <p>Re-use, redistribution, or commercial reproduction of studio drawings without written consent is strictly prohibited.</p>
      </div>
    )
  },
  {
    id: "project-estimates-budgets",
    title: "Project Estimates & Budgets",
    icon: AlertCircle,
    content: (
      <div className="space-y-4">
        <p>Estimations provided via our digital calculator or preliminary consultations serve as indicative feasibility guidelines based on prevailing material and labor rates.</p>
        <p>Written estimates are valid for 30 days from the date of issue. After this period, prices may be revised based on market fluctuations in material costs.</p>
        <p>Formal project scopes, itemized Bills of Quantities (BOQ), and binding budgets are governed by individualized bilateral contracts signed prior to site execution.</p>
        <p>Any additions or changes to the agreed scope will be documented as change orders with revised pricing.</p>
      </div>
    )
  },
  {
    id: "payment-terms-milestones",
    title: "Payment Terms & Milestones",
    icon: CreditCard,
    content: (
      <div className="space-y-4">
        <p>Projects typically follow a milestone-based payment structure:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong className="text-white font-medium">Booking Advance:</strong> 10-20% of total project value to initiate design work.</li>
          <li><strong className="text-white font-medium">Design Approval:</strong> 20-30% upon approval of final 3D renders and layouts.</li>
          <li><strong className="text-white font-medium">Execution Phase:</strong> 30-40% in installments tied to on-site progress milestones.</li>
          <li><strong className="text-white font-medium">Handover:</strong> Remaining balance due before final handover and styling.</li>
        </ul>
        <p>Payment methods accepted: Bank transfer (NEFT/RTGS/IMPS), UPI, and cheque.</p>
        <p>Late payments beyond 7 days may result in project timeline adjustments.</p>
        <p>Advance payments are non-refundable once design work has commenced, except as outlined in the Cancellation section.</p>
      </div>
    )
  },
  {
    id: "project-timeline-delays",
    title: "Project Timeline & Delays",
    icon: Clock,
    content: (
      <div className="space-y-4">
        <p>Typical timelines: 3BHK-4BHK residential interiors: 6-12 weeks. Commercial fit-outs: 4-8 weeks. Design-only consultations: 2-4 weeks.</p>
        <p>Timelines commence from the date of design approval and advance payment receipt.</p>
        <p>Force majeure events (natural disasters, government orders, supply chain disruptions, pandemics) may extend timelines without penalty to either party.</p>
        <p>Client-side delays (delayed approvals, access restrictions, payment delays) will proportionally extend the project timeline.</p>
        <p>Weekly progress updates are shared via WhatsApp or email throughout the execution phase.</p>
      </div>
    )
  },
  {
    id: "design-revisions-change-orders",
    title: "Design Revisions & Change Orders",
    icon: RefreshCw,
    content: (
      <div className="space-y-4">
        <p>Each project includes up to 2 rounds of design revisions within the approved scope at no additional cost.</p>
        <p>Additional revisions beyond the included rounds will be charged at a per-revision rate communicated in the project agreement.</p>
        <p>Changes to the approved design during execution (change orders) require written approval and may affect both project cost and timeline.</p>
        <p>Structural or layout changes requested after execution has begun may incur demolition and rework charges.</p>
      </div>
    )
  },
  {
    id: "material-quality-execution-standards",
    title: "Material Quality & Execution Standards",
    icon: Award,
    content: (
      <div className="space-y-4">
        <p>We adhere to strict Indian Standards (IS) for all civil construction work.</p>
        <p>Material standards include: IS:710 Marine Grade BWP (Boiling Water Proof) Plywood, Fe 550D TMT steel reinforcement, ISI-marked electrical wiring and switchgear, Premium-grade MDF, laminates, and veneers from branded manufacturers, Italian and Indian marble/granite from verified quarries.</p>
        <p>All materials are procured from authorized dealers with original warranty documentation.</p>
        <p>Clients are invited to material selection meetings and factory/showroom visits.</p>
      </div>
    )
  },
  {
    id: "warranty-defect-liability",
    title: "Warranty & Defect Liability",
    icon: ShieldCheck,
    content: (
      <div className="space-y-4">
        <p>Younick Design Studio provides a 1-year workmanship warranty from the date of project handover.</p>
        <p>Warranty covers: Manufacturing defects in custom woodwork and joinery, Faulty installation of modular kitchens and wardrobes, Plumbing and electrical defects arising from installation errors.</p>
        <p>Warranty does NOT cover: Normal wear and tear, damage from misuse or negligence, natural material aging (wood grain changes, marble patina), damage from unauthorized modifications by third parties, fixtures and fittings covered under their own manufacturer warranty.</p>
        <p>Warranty claims should be reported within 48 hours of discovery via email or WhatsApp.</p>
      </div>
    )
  },
  {
    id: "cancellation-termination",
    title: "Cancellation & Termination",
    icon: XCircle,
    content: (
      <div className="space-y-4">
        <p>Client may cancel the project by providing written notice via email.</p>
        <p>Cancellation before design commencement: Full refund minus a 10% administrative fee.</p>
        <p>Cancellation after design approval but before execution: Refund of unused milestone amounts; design fees are non-refundable.</p>
        <p>Cancellation during execution: Payment due for all work completed and materials procured; remaining unused milestones will be refunded.</p>
        <p>The studio reserves the right to terminate the agreement if the client fails to make payments within 30 days of the due date, after providing written notice.</p>
      </div>
    )
  },
  {
    id: "governing-law-dispute-resolution",
    title: "Governing Law & Dispute Resolution",
    icon: Scale,
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <p>These terms and all architectural/interior contracts are governed by and construed in accordance with the laws of India, with jurisdiction in the courts of Jaipur, Rajasthan.</p>
          <p>In the event of a dispute, both parties agree to first attempt resolution through good-faith mediation before pursuing legal action.</p>
          <p>For contract inquiries, legal clarifications, or to request a copy of your project agreement, please contact us.</p>
        </div>
        
        <div className="bg-[#070D18] p-6 rounded-xl border border-white/5 space-y-4 mt-6">
          <h3 className="font-serif text-white text-lg border-b border-white/10 pb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-[#E6B566]" />
              <a href="mailto:studioyounick@gmail.com" className="hover:text-[#E6B566] transition-colors">studioyounick@gmail.com</a>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-5 h-5 text-[#E6B566]" />
              <a href="tel:+918854883058" className="hover:text-[#E6B566] transition-colors">+91 88548 83058</a>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-[#E6B566] shrink-0 mt-1" />
              <span>3008, Third Floor, Orbit Mall, Civil Lines, Jaipur, Rajasthan 302001</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Choose the section that is closest to the top of the viewport
          const topmost = visibleSections.reduce((prev, current) => {
            return (prev.boundingClientRect.top < current.boundingClientRect.top) ? prev : current;
          });
          setActiveSection(topmost.target.id);
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: [0, 0.5, 1] }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#070D18] pt-24 pb-20">
      <SEOHead seo={pageSEO.terms} />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Scale className="w-4 h-4 text-[#E6B566]" />
            <span className="text-xs font-mono text-gray-300 tracking-wider uppercase">Service Terms & Conditions</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">Terms of Service</h1>
          <p className="text-gray-400 text-lg">
            Effective Date: September 13, 2026. These Terms of Service outline the rules, regulations, and operational guidelines governing architectural and interior design projects undertaken by Younick Design Studio.
          </p>
        </div>

        {/* Mobile TOC Button */}
        <div className="lg:hidden mb-8">
          <button 
            onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
            className="w-full flex items-center justify-between p-4 bg-[#0B1220]/90 backdrop-blur-md border border-white/10 rounded-xl text-white font-serif"
          >
            <span className="flex items-center gap-2">
              <Menu className="w-5 h-5 text-[#E6B566]" />
              Table of Contents
            </span>
            {isMobileTocOpen ? <X className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          
          {isMobileTocOpen && (
            <div className="mt-2 p-4 bg-[#0B1220]/90 backdrop-blur-md border border-white/10 rounded-xl">
              <nav className="flex flex-col gap-2">
                {SECTIONS.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id 
                        ? "bg-white/5 text-[#E6B566] border-l-2 border-[#E6B566]" 
                        : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}. {section.title}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          {/* Desktop TOC Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-[#0B1220]/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <h3 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
                <Menu className="w-5 h-5 text-[#E6B566]" />
                Contents
              </h3>
              <nav className="flex flex-col gap-1">
                {SECTIONS.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === section.id 
                        ? "bg-white/5 text-[#E6B566] border-l-2 border-[#E6B566] shadow-sm" 
                        : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                    }`}
                  >
                    <span className="font-mono text-xs opacity-60 mr-2">{String(index + 1).padStart(2, '0')}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9 space-y-8 lg:space-y-12">
            {SECTIONS.map((section, index) => {
              const Icon = section.icon;
              return (
                <section 
                  key={section.id} 
                  id={section.id}
                  className="scroll-mt-[100px]"
                  style={{ scrollMarginTop: '100px' }}
                >
                  <div className="bg-[#0B1220]/90 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8 lg:p-10 transition-colors duration-300 hover:border-white/20 group">
                    <div className="flex items-start md:items-center gap-4 md:gap-6 mb-6">
                      <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-[#E6B566] shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <div>
                        <div className="font-mono text-[#E6B566] text-xs md:text-sm tracking-widest mb-1 md:mb-2">
                          [ {String(index + 1).padStart(2, '0')} ]
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif text-white">
                          {section.title}
                        </h2>
                      </div>
                    </div>
                    <div className="text-gray-300/90 md:text-gray-400 md:group-hover:text-gray-300 transition-colors duration-300 text-base md:text-lg leading-relaxed space-y-4">
                      {section.content}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      {/* Back to top FAB */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-[#E6B566] text-[#0B1220] shadow-lg shadow-[#E6B566]/20 transition-all duration-300 z-50 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </main>
  );
}
