import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, FileText, ArrowLeft, Mail, Phone } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEOHead seo={pageSEO.privacy} />
      
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
              <Shield size={14} />
              Legal & Privacy
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-sm">
              Last updated: August 30, 2026 • Younick Design Studio (Jaipur, India)
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-[#0B1220]/90 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-10 space-y-8 text-gray-300 leading-relaxed text-sm sm:text-base">
            
            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <Lock size={18} className="text-[#E6B566]" /> 1. Commitment to Privacy
              </h2>
              <p>
                At <strong>Younick Design Studio</strong>, we respect your privacy and are committed to protecting the personal and project-related data you share with us. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website (<a href="https://yds-liart.vercel.app" className="text-[#E6B566] underline">yds-liart.vercel.app</a>) and our studio consultation services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <Eye size={18} className="text-[#E6B566]" /> 2. Information We Collect
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, and site location when you request a consultation, estimate, or contact us.</li>
                <li><strong>Project Specifications:</strong> Floor plans, square footage, budget preferences, architectural blueprints, and aesthetic preferences.</li>
                <li><strong>Analytics & Technical Data:</strong> Anonymized browsing patterns, device information, and IP addresses collected via privacy-first analytics to optimize Core Web Vitals and user experience.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <FileText size={18} className="text-[#E6B566]" /> 3. How We Use Your Information
              </h2>
              <p>Your information is used strictly to:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-2">
                <li>Prepare architectural layouts, 3D renderings, and turnkey cost estimations.</li>
                <li>Communicate regarding site visits, project milestones, and material procurement.</li>
                <li>Improve our website design and digital presentation standards.</li>
              </ul>
              <p className="text-xs text-gray-500 italic mt-2">
                * We will never sell, rent, or trade your personal data or project confidential blueprints to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white">4. Data Security</h2>
              <p>
                We implement industry-standard SSL/TLS encryption, secure edge storage, and restricted credential protocols to ensure all project blueprints and client communications remain strictly confidential.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-serif text-white">5. Contact Our Privacy Officer</h2>
              <p>If you have any questions regarding this Privacy Policy or wish to modify your information:</p>
              <div className="bg-[#070D18] p-4 rounded-xl border border-white/5 space-y-2 text-sm">
                <p className="font-semibold text-white">Younick Design Studio</p>
                <p className="flex items-center gap-2 text-gray-400"><Mail size={14} className="text-[#E6B566]" /> studioyounick@gmail.com</p>
                <p className="flex items-center gap-2 text-gray-400"><Phone size={14} className="text-[#E6B566]" /> +91 88548 83058</p>
                <p className="text-gray-500 text-xs">3008, Third Floor, Orbit Mall, Civil Lines, Jaipur, Rajasthan 302001</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
