import React, { useState, useEffect } from 'react';
import { 
  Shield, Eye, FileText, Fingerprint, Share2, Clock, 
  UserCheck, Lock, Mail, ArrowUp, ChevronDown, MapPin, Phone 
} from 'lucide-react';
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

const SECTIONS = [
  { id: 'commitment-to-privacy', title: 'Commitment to Privacy', icon: Shield, num: '01' },
  { id: 'information-we-collect', title: 'Information We Collect', icon: Eye, num: '02' },
  { id: 'how-we-use-your-information', title: 'How We Use Your Information', icon: FileText, num: '03' },
  { id: 'cookies-website-analytics', title: 'Cookies & Website Analytics', icon: Fingerprint, num: '04' },
  { id: 'third-party-services', title: 'Third-Party Services', icon: Share2, num: '05' },
  { id: 'data-retention-deletion', title: 'Data Retention & Deletion', icon: Clock, num: '06' },
  { id: 'your-rights', title: 'Your Rights', icon: UserCheck, num: '07' },
  { id: 'data-security', title: 'Data Security', icon: Lock, num: '08' },
  { id: 'contact-privacy-officer', title: 'Contact Our Privacy Officer', icon: Mail, num: '09' },
];

const SectionCard = ({ id, num, title, icon: Icon, children }: { id: string, num: string, title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <section 
    id={id} 
    className="bg-[#0B1220]/90 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-10 transition-colors duration-300 hover:border-white/20"
    style={{ scrollMarginTop: '100px' }}
  >
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#E6B566]" />
      </div>
      <div>
        <div className="font-mono text-sm text-[#E6B566] mb-1">[ {num} ]</div>
        <h2 className="text-2xl font-serif text-white">{title}</h2>
      </div>
    </div>
    <div className="text-gray-300 leading-relaxed space-y-4">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setIsTocOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead seo={pageSEO?.privacy || { title: 'Privacy Policy | Younick Design Studio' }} />
      
      <div className="min-h-screen bg-[#070D18] pt-32 pb-24 font-sans text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-[#E6B566]" />
              <span className="text-sm font-mono tracking-wider text-gray-300 uppercase">Legal & Privacy</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-400 mb-6 font-light">
              Last updated: September 13, 2026
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              At Younick Design Studio, transparency and trust are the foundation of our client relationships. This policy outlines our commitment to safeguarding your data while delivering luxury interior design and architecture services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* TOC Sidebar */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                {/* Mobile TOC Button */}
                <button 
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  className="w-full lg:hidden flex items-center justify-between bg-[#0B1220]/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 mb-4 text-white font-medium"
                >
                  <span>Table of Contents</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isTocOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`${isTocOpen ? 'block' : 'hidden'} lg:block bg-[#0B1220]/50 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/10 lg:border-none rounded-2xl p-4 lg:p-0 mb-8 lg:mb-0`}>
                  <h3 className="hidden lg:block text-white font-serif text-xl mb-6">Contents</h3>
                  <nav className="flex flex-col space-y-2 text-sm font-mono">
                    {SECTIONS.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollTo(section.id)}
                        className={`text-left px-4 py-2.5 rounded-lg transition-all duration-300 border-l-2 ${
                          activeSection === section.id 
                            ? 'border-[#E6B566] text-[#E6B566] bg-white/5' 
                            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="opacity-50 mr-2">[{section.num}]</span>
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-9 space-y-8">
              
              <SectionCard id="commitment-to-privacy" num="01" title="Commitment to Privacy" icon={Shield}>
                <p>
                  At Younick Design Studio, we respect your privacy and are committed to protecting the personal and project-related data you share with us. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website (studioyounick.vercel.app), our studio consultation services, WhatsApp communications, and in-person site visits.
                </p>
              </SectionCard>

              <SectionCard id="information-we-collect" num="02" title="Information We Collect" icon={Eye}>
                <ul className="list-disc list-outside ml-5 space-y-3">
                  <li><strong className="text-white font-medium">Personal Information:</strong> Name, email, phone number, site/property address provided during consultations or contact form submissions.</li>
                  <li><strong className="text-white font-medium">Project Specifications:</strong> Floor plans, site photographs, architectural blueprints, square footage, room dimensions, budget preferences, material preferences, and aesthetic mood references.</li>
                  <li><strong className="text-white font-medium">Technical & Analytics Data:</strong> Anonymized browsing patterns, device type, browser version, screen resolution, and referral sources collected via privacy-first analytics to optimize website performance and Core Web Vitals.</li>
                </ul>
              </SectionCard>

              <SectionCard id="how-we-use-your-information" num="03" title="How We Use Your Information" icon={FileText}>
                <ul className="list-disc list-outside ml-5 space-y-3">
                  <li>Prepare customized spatial layouts, 3D photorealistic renderings, and turnkey cost estimations.</li>
                  <li>Schedule and coordinate site visits, material procurement, and project milestones.</li>
                  <li>Communicate regarding design revisions, construction updates, and handover timelines.</li>
                  <li>Send project-related updates via WhatsApp or email (with your explicit consent).</li>
                  <li>Improve our website design, digital portfolio presentation, and user experience.</li>
                </ul>
                <p className="italic text-gray-400 mt-4">We will never sell, rent, or trade your personal data or project-confidential blueprints to any third party.</p>
              </SectionCard>

              <SectionCard id="cookies-website-analytics" num="04" title="Cookies & Website Analytics" icon={Fingerprint}>
                <ul className="list-disc list-outside ml-5 space-y-3">
                  <li>Our website uses minimal, privacy-respecting analytics (Vercel Web Analytics) to understand traffic patterns and improve user experience.</li>
                  <li>We do not use invasive third-party tracking cookies or advertising pixels.</li>
                  <li>Essential cookies may be used to maintain session state and preferences.</li>
                  <li>You can manage cookie preferences through your browser settings at any time.</li>
                </ul>
              </SectionCard>

              <SectionCard id="third-party-services" num="05" title="Third-Party Services" icon={Share2}>
                <ul className="list-disc list-outside ml-5 space-y-3">
                  <li><strong className="text-white font-medium">Vercel:</strong> Hosts our website; may process anonymized analytics data.</li>
                  <li><strong className="text-white font-medium">Sanity CMS:</strong> Powers our project portfolio and blog content; stores no client personal data.</li>
                  <li><strong className="text-white font-medium">WhatsApp Business:</strong> Used for project communication with your consent; governed by WhatsApp's own privacy policy.</li>
                  <li><strong className="text-white font-medium">Google Fonts:</strong> Loads typefaces for our website; governed by Google's privacy policy.</li>
                  <li>We vet all third-party services for data protection compliance before integration.</li>
                </ul>
              </SectionCard>

              <SectionCard id="data-retention-deletion" num="06" title="Data Retention & Deletion" icon={Clock}>
                <ul className="list-disc list-outside ml-5 space-y-3">
                  <li>Project-related data (floor plans, blueprints, communications) is retained for the duration of the project plus 2 years for warranty and reference purposes.</li>
                  <li>Contact information is retained until you request its deletion.</li>
                  <li>Analytics data is anonymized and aggregated; it cannot be tied to individual users.</li>
                  <li>To request deletion of your personal data, contact us at <a href="mailto:studioyounick@gmail.com" className="text-[#E6B566] hover:underline">studioyounick@gmail.com</a> with the subject line "Data Deletion Request."</li>
                </ul>
              </SectionCard>

              <SectionCard id="your-rights" num="07" title="Your Rights" icon={UserCheck}>
                <ul className="list-disc list-outside ml-5 space-y-3">
                  <li><strong className="text-white font-medium">Right to Access:</strong> Request a copy of any personal or project data we hold about you.</li>
                  <li><strong className="text-white font-medium">Right to Correction:</strong> Ask us to update or correct inaccurate information.</li>
                  <li><strong className="text-white font-medium">Right to Deletion:</strong> Request that we delete your personal data (subject to legal retention requirements).</li>
                  <li><strong className="text-white font-medium">Right to Withdraw Consent:</strong> Opt out of marketing communications at any time.</li>
                  <li>To exercise any of these rights, email us at <a href="mailto:studioyounick@gmail.com" className="text-[#E6B566] hover:underline">studioyounick@gmail.com</a> or call <a href="tel:+918854883058" className="text-[#E6B566] hover:underline">+91 88548 83058</a>.</li>
                </ul>
              </SectionCard>

              <SectionCard id="data-security" num="08" title="Data Security" icon={Lock}>
                <ul className="list-disc list-outside ml-5 space-y-3">
                  <li>SSL/TLS encryption on all website communications and form submissions.</li>
                  <li>Encrypted cloud storage for project files, blueprints, and client documents.</li>
                  <li>Role-based access controls — only authorized team members can access client data.</li>
                  <li>All staff and contractors sign non-disclosure agreements (NDAs) covering client information.</li>
                  <li>Regular security reviews of our digital infrastructure and third-party integrations.</li>
                </ul>
              </SectionCard>

              <SectionCard id="contact-privacy-officer" num="09" title="Contact Our Privacy Officer" icon={Mail}>
                <p className="mb-6">If you have questions about this Privacy Policy, wish to exercise your data rights, or want to report a privacy concern, please contact us.</p>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                  <h3 className="text-white font-serif text-xl mb-4">Younick Design Studio</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#E6B566] shrink-0 mt-0.5" />
                    <span className="text-gray-300">3008, Third Floor, Orbit Mall,<br/>Civil Lines, Jaipur, Rajasthan 302001</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#E6B566] shrink-0" />
                    <a href="tel:+918854883058" className="text-gray-300 hover:text-white transition-colors">+91 88548 83058</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#E6B566] shrink-0" />
                    <a href="mailto:studioyounick@gmail.com" className="text-gray-300 hover:text-white transition-colors">studioyounick@gmail.com</a>
                  </div>
                </div>
              </SectionCard>

            </div>
          </div>
        </div>
      </div>

      {/* Back to top FAB */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#E6B566] text-[#0B1220] p-3 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </>
  );
}
