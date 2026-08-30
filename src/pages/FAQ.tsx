import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, ArrowRight, MessageCircle, Phone, ArrowLeft } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

interface FAQItem {
  question: string;
  answer: string;
  category: "Design" | "Turnkey" | "Pricing" | "Process";
}

const FAQS: FAQItem[] = [
  {
    category: "Pricing",
    question: "How much does interior design & turnkey execution cost in Jaipur?",
    answer:
      "Interior design costs in Jaipur typically range from ₹1,200 to ₹2,500+ per sq. ft. for premium turnkey residential projects (including woodwork, false ceiling, lighting, paint, and modular kitchen). Luxury and bespoke villa executions range upwards based on Italian marble, automation, and designer fixtures. We offer transparent estimates via our online calculator."
  },
  {
    category: "Turnkey",
    question: "What is included in a Turnkey Interior project by Younick Studio?",
    answer:
      "Turnkey execution means end-to-end responsibility. We handle space planning, 3D visualizations, material procurement (plywood, laminates, hardware, stone), civil modifications, electrical, plumbing, carpentry, painting, and deep cleaning before final handover."
  },
  {
    category: "Process",
    question: "What is the typical timeline for a complete residential interior project?",
    answer:
      "A 3BHK to 4BHK apartment or villa typically requires 6 to 12 weeks from finalized 3D renders to final handover. Commercial fit-outs and retail spaces are fast-tracked within 4 to 8 weeks depending on floor plate size."
  },
  {
    category: "Design",
    question: "Do you provide 3D photorealistic visualizations before starting on-site work?",
    answer:
      "Yes! Every project begins with high-fidelity 3D renderings and walkthroughs showing exact materials, textures, lighting, and spatial flow so you experience your space before physical execution begins."
  },
  {
    category: "Process",
    question: "Do you take projects outside Jaipur?",
    answer:
      "Yes! While our primary design studio is located in Civil Lines, Jaipur, we regularly execute luxury villas, commercial gyms, and hospital projects across Sikar, Udaipur, Jodhpur, Kota, and all of Rajasthan, as well as pan-India design consultations."
  },
  {
    category: "Turnkey",
    question: "How do you ensure material quality and on-site supervision?",
    answer:
      "Our founders and dedicated project managers conduct structured weekly quality inspections. We use only branded, boiling waterproof (BWR/BWP) plywood, certified electrical cabling, and premium hardware with full warranty documentation."
  }
];

const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const categories = ["All", "Pricing", "Turnkey", "Process", "Design"];

  const filtered = selectedCat === "All" ? FAQS : FAQS.filter(f => f.category === selectedCat);

  // FAQ Schema.org JSON-LD structured data for Google Search rich snippet accordion
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead seo={pageSEO.faq} schema={faqSchema} />

      <div className="min-h-screen bg-[#070D18] text-[#F8FAFC] font-sans pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E6B566] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Return to Studio
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3528] border border-emerald-500/40 text-[11px] font-bold tracking-widest uppercase text-[#E6B566] mb-4">
              <HelpCircle size={14} />
              Frequently Asked Questions
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-white mb-4">
              Everything You Need to Know
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Clear answers on interior pricing, architectural timelines, turnkey execution, and material standards.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCat(cat); setOpenIdx(null); }}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedCat === cat
                      ? "bg-[#E6B566] text-[#0B1220] font-bold shadow-md shadow-[#E6B566]/20"
                      : "bg-[#0B1220] text-gray-400 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion FAQ list */}
          <div className="space-y-4">
            {filtered.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0B1220]/90 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-white"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={20}
                      className={`text-[#E6B566] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-sm sm:text-base text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-gradient-to-r from-[#0B3528]/80 to-[#0B1220] rounded-2xl border border-emerald-500/30 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="text-xl font-serif text-white mb-2">Have a custom architectural inquiry?</h3>
              <p className="text-sm text-gray-300">Speak directly with our principal designers in Civil Lines, Jaipur.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/918854883058"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#E6B566] text-[#0B1220] font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp Us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 text-white font-medium text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Contact Form <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FAQPage;
