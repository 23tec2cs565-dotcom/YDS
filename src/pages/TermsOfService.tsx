import React from "react";
import { Link } from "react-router-dom";
import { Scale, CheckCircle2, AlertCircle, ArrowLeft, Mail, Phone } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

const TermsOfService: React.FC = () => {
  return (
    <>
      <SEOHead seo={pageSEO.terms} />
      
      <div className="min-h-screen bg-[#070D18] text-[#F8FAFC] font-sans pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E6B566] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Return to Studio
            </Link>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3528] border border-emerald-500/40 text-[11px] font-bold tracking-widest uppercase text-[#E6B566] mb-4">
              <Scale size={14} />
              Service Terms & Conditions
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-400 text-sm">
              Effective Date: August 30, 2026 • Younick Design Studio
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-[#0B1220]/90 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-10 space-y-8 text-gray-300 leading-relaxed text-sm sm:text-base">
            
            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#E6B566]" /> 1. Scope of Services
              </h2>
              <p>
                <strong>Younick Design Studio</strong> provides architectural consultation, interior design planning, photorealistic 3D visualization, and turnkey civil construction execution in Jaipur, Rajasthan, and nationwide.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <Scale size={18} className="text-[#E6B566]" /> 2. Design Intellectual Property
              </h2>
              <p>
                All 3D visualization renders, CAD structural layouts, bespoke joinery details, and spatial concepts authored by Younick Design Studio remain the intellectual property of the studio until full execution milestone settlement. Re-use or distribution of studio drawings without written consent is prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <AlertCircle size={18} className="text-[#E6B566]" /> 3. Project Estimates & Turnkey Budgets
              </h2>
              <p>
                Estimations provided via our digital calculator or preliminary consultations serve as indicative feasibility guidelines based on prevailing material and labor rates. Formal project scopes are governed by individualized bilateral contracts signed prior to site execution.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white">4. Material Quality & Execution Standards</h2>
              <p>
                We adhere to strict Indian Standards (IS) for civil construction, certified hardware, premium ply/MDF grades, and Italian/Indian marble selection. Warranty and defect liability periods are detailed in individual execution agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white">5. Governing Law</h2>
              <p>
                These terms and all architectural/interior contracts are governed by and construed in accordance with the laws of Jaipur, Rajasthan, India.
              </p>
              <div className="bg-[#070D18] p-4 rounded-xl border border-white/5 space-y-1 text-sm text-gray-400 mt-3">
                <p className="text-white font-medium">Inquiries & Contract Support:</p>
                <p className="flex items-center gap-2"><Mail size={14} className="text-[#E6B566]" /> studioyounick@gmail.com</p>
                <p className="flex items-center gap-2"><Phone size={14} className="text-[#E6B566]" /> +91 88548 83058</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
