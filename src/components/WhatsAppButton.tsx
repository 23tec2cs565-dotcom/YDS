import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MotionDiv = motion.div as unknown as React.ComponentType<any>;

const PHONE_NUMBER = "918854883058"; // Studio contact: +91 8854883058

const PRESET_MESSAGES = [
  {
    id: "residential",
    icon: "🏡",
    label: "Residential Interior",
    text: "Hi Younick Studio! I'm interested in luxury residential interior design for my home/villa in Jaipur. Could you share details?",
  },
  {
    id: "commercial",
    icon: "🏢",
    label: "Commercial / Turnkey",
    text: "Hi Younick Studio! I have a commercial project (gym / showroom / office / clinic) and would like to discuss turnkey execution.",
  },
  {
    id: "consultation",
    icon: "📐",
    label: "3D Design & Space Planning",
    text: "Hi Younick Studio! I need 3D architectural visualization and design consultancy for my upcoming project.",
  },
];

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Show a gentle preview tooltip after 4 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenWhatsApp = (messageText: string) => {
    const textToSend = messageText.trim() || "Hi Younick Design Studio! I saw your portfolio and would like to discuss an interior project.";
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-14 right-8 sm:bottom-8 sm:right-8 z-50 pointer-events-auto">
      <AnimatePresence mode="wait">
        {isOpen ? (
          /* Expanded Luxury Chat Card Anchored in Bottom Right Corner */
          <MotionDiv
            key="chat-card"
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-[90vw] max-w-[360px] max-h-[85vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#c8d9e6] text-[#0B1220] rounded-3xl shadow-2xl border border-[#adc4d6]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#b9cfdf] to-[#c8d9e6] p-4 sm:p-5 border-b border-[#adc4d6] relative sticky top-0 z-20 backdrop-blur-md">
              {/* Section's Own Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-700 hover:text-black rounded-full bg-black/5 hover:bg-black/10 transition-all"
                aria-label="Close WhatsApp chat"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1.5 border border-[#1E3A5F]/20 shadow-md flex items-center justify-center">
                    <img decoding="async" loading="lazy"
                      src="/younick-logo.webp"
                      alt="Younick Studio WhatsApp Support Representative"
                      title="Younick Design Studio — Official WhatsApp Support"
                      width="48"
                      height="48"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#c8d9e6] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-[#0B1220] text-base">Younick Studio</h3>
                    <CheckCircle2 size={15} className="text-[#1E3A5F]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5 font-medium">
                    <Clock size={12} className="text-emerald-700" />
                    <span>Replies within 15 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 space-y-4">
              <div className="bg-white/85 border border-[#adc4d6] p-3.5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 text-[#1E3A5F] text-xs font-bold uppercase tracking-wider mb-1">
                  <img decoding="async" loading="lazy" src="/icons/whatsapp-logo-new.webp" alt="WhatsApp Direct Verified Line Icon" title="Chat with Younick Design Studio on WhatsApp" width="16" height="16" className="w-4 h-4 object-contain" />
                  <span>Direct WhatsApp Line</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Have a dream space in mind? Connect directly with our lead interior designers in Jaipur.
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Select your inquiry:
                </p>
                <div className="space-y-1.5">
                  {PRESET_MESSAGES.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleOpenWhatsApp(preset.text)}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white hover:border-[#1E3A5F]/40 border border-[#adc4d6] transition-all text-xs text-slate-800 hover:text-black font-medium flex items-center justify-between group shadow-sm"
                    >
                      <span className="flex items-center gap-2">
                        <span>{preset.icon}</span>
                        <span>{preset.label}</span>
                      </span>
                      <Send size={12} className="opacity-0 group-hover:opacity-100 text-[#1E3A5F] transition-opacity transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div className="pt-2 border-t border-[#adc4d6]">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleOpenWhatsApp(customMsg);
                      }
                    }}
                    placeholder="Or type a custom message..."
                    className="w-full bg-white border border-[#adc4d6] rounded-full px-4 py-2.5 text-xs text-[#0B1220] placeholder-slate-400 focus:outline-none focus:border-[#1E3A5F] shadow-sm transition-colors pr-10"
                  />
                  <button
                    onClick={() => handleOpenWhatsApp(customMsg)}
                    className="absolute right-1.5 p-1.5 bg-[#25D366] text-white rounded-full hover:scale-105 transition-transform shadow-md"
                    aria-label="Send WhatsApp message"
                  >
                    <Send size={13} className="text-white fill-white" />
                  </button>
                </div>
              </div>
            </div>
          </MotionDiv>
        ) : (
          /* Floating Action Button in Corner */
          <div key="chat-button" className="flex items-center gap-3">
            {/* Helper Tooltip on Desktop */}
            <AnimatePresence>
              {showTooltip && (
                <MotionDiv
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  className="hidden sm:flex items-center gap-2 bg-[#c8d9e6] text-[#0B1220] text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl border border-[#adc4d6]"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Chat with Us!</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(false);
                    }}
                    className="text-slate-600 hover:text-black ml-1"
                    aria-label="Dismiss tooltip"
                  >
                    <X size={12} />
                  </button>
                </MotionDiv>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
              aria-label="Open WhatsApp conversation"
              className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center border-2 border-white/20"
            >
              {/* Subtle Outer Glow Wave */}
              <span className="absolute inset-0 rounded-full bg-[#25D366]/35 animate-ping pointer-events-none -z-10" />

              <img decoding="async" loading="lazy"
                src="/icons/whatsapp-logo-new.webp"
                alt="Floating WhatsApp Consultation Action Button"
                title="Direct WhatsApp Consultation with Younick Design Studio"
                width="40"
                height="40"
                className="w-40 h-40 sm:w-10 sm:h-10 object-contain drop-shadow-md transition-transform group-hover:scale-110"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />

              {/* Unread dot indicator (without dark border) */}
              <span className="absolute top-1 right-1 w-3 h-3 bg-[#E6B566] rounded-full shadow-md" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppButton;
