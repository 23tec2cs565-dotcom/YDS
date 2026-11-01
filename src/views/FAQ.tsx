import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, MessageSquare, ArrowRight, Search, ThumbsUp, ThumbsDown, ArrowUp, ChevronDown } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

// Types
type Category = "Pricing" | "Turnkey" | "Process" | "Design" | "Warranty" | "Commercial";

interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

// Data
const faqs: FAQItem[] = [
  {
    category: "Pricing",
    question: "How much does interior design & turnkey execution cost in Jaipur?",
    answer: "Interior design costs in Jaipur typically range from ₹1,200 to ₹2,500+ per sq. ft. for premium turnkey residential projects (including woodwork, false ceiling, lighting, paint, and modular kitchen). Luxury and bespoke villa executions range upwards based on Italian marble, automation, and designer fixtures. We offer transparent estimates via our online calculator."
  },
  {
    category: "Pricing",
    question: "Do you charge a design consultation fee?",
    answer: "We offer a complimentary initial consultation — either at our studio in Civil Lines, Jaipur or via video call — to understand your vision, space, and budget. Detailed design work, including 3D renderings and floor plans, begins after a formal project agreement and booking advance."
  },
  {
    category: "Pricing",
    question: "What payment milestones do you follow?",
    answer: "We follow a transparent milestone-based payment structure: 10-20% booking advance to initiate design, 20-30% upon 3D render and layout approval, 30-40% during on-site execution phases, and the remaining balance before final handover and styling. All milestones are clearly documented in your project agreement."
  },
  {
    category: "Turnkey",
    question: "What is included in a Turnkey Interior project by Younick Studio?",
    answer: "Turnkey execution means end-to-end responsibility. We handle space planning, 3D visualizations, material procurement (plywood, laminates, hardware, stone), civil modifications, electrical, plumbing, carpentry, painting, and deep cleaning before final handover."
  },
  {
    category: "Turnkey",
    question: "Do you handle government approvals and building permits?",
    answer: "While our core expertise is in interior design and construction, we assist clients with the documentation and coordination required for building permits, municipal approvals, and structural NOCs through our network of licensed architects and structural engineers."
  },
  {
    category: "Turnkey",
    question: "What brands and grades of materials do you use?",
    answer: "We use only branded, certified materials — IS:710 Marine Grade BWP plywood, premium laminates from Merino/Century/Greenlam, Hettich/Hafele hardware, Finolex/Havells electrical wiring, and Jaquar/Kohler sanitary fittings. Clients are invited to material selection meetings to make informed choices."
  },
  {
    category: "Process",
    question: "What is the typical timeline for a complete residential interior project?",
    answer: "A 3BHK to 4BHK apartment or villa typically requires 6 to 12 weeks from finalized 3D renders to final handover. Commercial fit-outs and retail spaces are fast-tracked within 4 to 8 weeks depending on floor plate size."
  },
  {
    category: "Process",
    question: "How do I start a project with Younick Studio?",
    answer: "Starting is simple: reach out via our contact form, WhatsApp (+91 88548 83058), or visit our studio at Orbit Mall, Civil Lines, Jaipur. We'll schedule a free consultation to understand your space and vision, followed by a detailed proposal with 3D renders, BOQ, and timeline."
  },
  {
    category: "Process",
    question: "How many design revisions are included?",
    answer: "Each project includes up to 2 rounds of design revisions within the approved scope at no additional cost. Additional revisions beyond the included rounds are charged at a per-revision rate communicated in your project agreement. We encourage clients to consolidate feedback to make the revision process efficient."
  },
  {
    category: "Design",
    question: "Do you provide 3D photorealistic visualizations before starting on-site work?",
    answer: "Yes! Every project begins with high-fidelity 3D renderings and walkthroughs showing exact materials, textures, lighting, and spatial flow so you experience your space before physical execution begins."
  },
  {
    category: "Design",
    question: "Can you work with my existing furniture and fixtures?",
    answer: "Absolutely. We regularly design around clients' existing furniture, heirloom pieces, and fixtures they wish to retain. Our designers integrate these elements seamlessly into the new design concept, ensuring visual harmony while respecting sentimental or practical value."
  },
  {
    category: "Design",
    question: "Do you offer Vastu-compliant designs?",
    answer: "Yes, we design with Vastu Shastra principles in mind when requested. Our team incorporates Vastu guidelines for room placement, entrance orientation, kitchen positioning, and color schemes while maintaining contemporary aesthetics and functionality. We balance traditional Vastu wisdom with modern spatial planning."
  },
  {
    category: "Warranty",
    question: "What warranty do you offer on completed work?",
    answer: "We provide a 1-year comprehensive workmanship warranty from the date of project handover. This covers manufacturing defects in custom woodwork, faulty installation of modular kitchens and wardrobes, and plumbing/electrical defects arising from installation errors. Individual products carry their respective manufacturer warranties."
  },
  {
    category: "Warranty",
    question: "What if I notice defects after project handover?",
    answer: "Report any defects within 48 hours of discovery via WhatsApp or email. Our maintenance team will inspect the issue within 3-5 working days and arrange repairs at no cost if the defect falls under warranty coverage. We maintain a dedicated after-sales support channel for all completed projects."
  },
  {
    category: "Commercial",
    question: "Do you design offices, retail stores, and restaurants?",
    answer: "Yes! We have extensive experience designing and executing commercial spaces including corporate offices, co-working spaces, retail showrooms, restaurants, cafés, gyms, clinics, and hospital interiors. Our commercial projects are fast-tracked with dedicated project managers and site supervisors."
  },
  {
    category: "Commercial",
    question: "Do you take projects outside Jaipur?",
    answer: "Yes! While our primary design studio is located in Civil Lines, Jaipur, we regularly execute luxury villas, commercial gyms, and hospital projects across Sikar, Udaipur, Jodhpur, Kota, and all of Rajasthan, as well as pan-India design consultations."
  }
];

const categoryColors: Record<Category, string> = {
  Pricing: "bg-emerald-500/10 text-emerald-400",
  Turnkey: "bg-blue-500/10 text-blue-400",
  Process: "bg-purple-500/10 text-purple-400",
  Design: "bg-pink-500/10 text-pink-400",
  Warranty: "bg-amber-500/10 text-amber-400",
  Commercial: "bg-cyan-500/10 text-cyan-400"
};

// Generate JSON-LD schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

const FAQAccordionItem: React.FC<{ faq: FAQItem; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [feedbackState, setFeedbackState] = useState<"idle" | "submitted">("idle");

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, feedbackState]);

  const handleFeedback = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFeedbackState("submitted");
  };

  return (
    <div className="border border-white/10 rounded-xl bg-[#0B1220]/90 backdrop-blur-md overflow-hidden transition-colors duration-300 hover:border-[#E6B566]/30">
      <button
        onClick={onClick}
        className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-[10px] md:text-xs font-mono font-medium px-2 py-0.5 rounded-full ${categoryColors[faq.category]}`}>
              {faq.category}
            </span>
          </div>
          <h3 className="text-base md:text-lg text-white font-medium pr-4">{faq.question}</h3>
        </div>
        <div className={`mt-1 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown className="w-5 h-5 text-[#E6B566]" />
        </div>
      </button>

      <div
        style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px" }}
        className="transition-[max-height] duration-300 ease-in-out overflow-hidden"
      >
        <div ref={contentRef} className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
            {faq.answer}
          </p>
          
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            {feedbackState === "idle" ? (
              <>
                <span className="text-xs text-gray-400 font-mono">Was this helpful?</span>
                <div className="flex items-center gap-2">
                  <button onClick={handleFeedback} className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button onClick={handleFeedback} className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <span className="text-xs text-[#E6B566] font-mono">Thanks for your feedback!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = ["All", "Pricing", "Turnkey", "Process", "Design", "Warranty", "Commercial"];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070D18] pt-24 pb-20">
      <SEOHead seo={pageSEO.faq} schema={faqSchema} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-[#E6B566]/10 rounded-full mb-6 text-[#E6B566]">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Everything You Need to Know
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Answers to common questions about our interior design services, pricing, timeline, and turnkey execution process in Jaipur.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-[#E6B566]" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B1220] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#E6B566]/50 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-mono transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#E6B566] text-[#070D18] font-semibold"
                  : "bg-[#0B1220] border border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Result Count */}
        <div className="text-center mb-8">
          <span className="text-sm font-mono text-gray-400">
            {filteredFaqs.length > 0 
              ? `Showing ${filteredFaqs.length} of ${faqs.length} questions`
              : ""}
          </span>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-20">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQAccordionItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))
          ) : (
            <div className="text-center py-16 px-4 bg-[#0B1220]/50 rounded-2xl border border-white/5">
              <HelpCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No matching questions found</h3>
              <p className="text-gray-400">Try a different search term or browse all categories.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-6 text-[#E6B566] hover:text-[#E6B566]/80 underline transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Enhanced CTA Box */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1220] to-[#070D18] border border-white/10 p-8 md:p-12 text-center group">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[#E6B566]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl mb-6">
              <MessageSquare className="w-8 h-8 text-[#E6B566]" />
            </div>
            <h2 className="text-3xl font-serif text-white mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Our design experts are here to help. Reach out to us for a free consultation or to discuss your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#E6B566] text-[#070D18] rounded-xl font-medium hover:bg-white transition-colors duration-300"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="https://wa.me/918854883058"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#0B1220] border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 transition-colors duration-300"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <div 
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="bg-[#E6B566] text-[#0B1220] p-3 rounded-full shadow-lg shadow-[#E6B566]/20 hover:scale-110 transition-transform"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
