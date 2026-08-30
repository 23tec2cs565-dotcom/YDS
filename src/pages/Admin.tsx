import React, { useEffect } from "react";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import SEOHead from "../components/SEOHead";

const SANITY_STUDIO_URL = "https://younickdesignstudio-admin.sanity.studio";

const AdminRedirect: React.FC = () => {
  useEffect(() => {
    // Seamlessly redirect to hosted Sanity Studio
    const timer = setTimeout(() => {
      window.location.href = SANITY_STUDIO_URL;
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const seoForPage = {
    title: "Redirecting to Sanity Studio | Younick Design Studio",
    description: "Cloud Content Management Studio for Younick Design Studio.",
    url: "/admin",
  };

  return (
    <>
      <SEOHead seo={seoForPage} type="website" noIndex={true} />

      <div className="min-h-screen bg-[#070D18] text-white flex flex-col items-center justify-center px-4 font-sans selection:bg-[#E6B566] selection:text-[#0B1220]">
        
        {/* Glow ambient */}
        <div className="absolute w-96 h-96 bg-[#E6B566]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md w-full text-center space-y-8 bg-[#0B1220]/90 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
          
          {/* Younick Emblem & Badge */}
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0B3528] border border-emerald-500/40 flex items-center justify-center text-[#E6B566] shadow-lg shadow-emerald-950/50">
              <ShieldCheck size={32} />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-[#E6B566]">
              <Sparkles size={12} />
              Sanity Cloud Studio
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white mb-2">
              Younick Admin Console
            </h1>
            <p className="text-sm text-gray-400">
              Redirecting to your secure cloud studio...
            </p>
          </div>

          {/* Loading animation bar */}
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#B08D57] to-[#E6B566] rounded-full animate-marquee" style={{ animationDuration: "1.2s" }} />
          </div>

          {/* Direct link button */}
          <div className="pt-2">
            <a
              href={SANITY_STUDIO_URL}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-[#E6B566] text-[#0B1220] font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg shadow-[#E6B566]/20"
            >
              Open Sanity Studio Now <ArrowUpRight size={16} />
            </a>
          </div>

          <p className="text-[11px] text-gray-500 font-mono">
            {SANITY_STUDIO_URL.replace("https://", "")}
          </p>

        </div>
      </div>
    </>
  );
};

export default AdminRedirect;
