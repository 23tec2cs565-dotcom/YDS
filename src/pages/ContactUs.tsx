import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ArrowRight,
  Send
} from "lucide-react";

import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

const ContactForm = ({ onSubmit }: { onSubmit: (data: { name: string; email: string; phone: string; message: string }) => void }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", phone: "" };

    const cleanName = formData.name.trim();
    if (cleanName.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    const phoneRegex = /^\+?[0-9\s-]{8,15}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const sanitized = {
        name: formData.name.replace(/<[^>]*>/g, "").trim(),
        email: formData.email.replace(/<[^>]*>/g, "").trim(),
        phone: formData.phone.replace(/<[^>]*>/g, "").trim(),
        message: formData.message.replace(/<[^>]*>/g, "").trim()
      };
      onSubmit(sanitized);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
          <input 
            id="contact-name"
            name="name"
            required 
            type="text" 
            value={formData.name}
            placeholder=""
            className="w-full bg-gray-50 border-b-2 border-gray-200 p-2.5 sm:p-3 text-sm focus:outline-none focus:border-[#B08D57] transition-colors rounded-md"
            onChange={(e) => {
              setFormData({...formData, name: e.target.value});
              if (errors.name) setErrors({...errors, name: ""});
            }}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && <span id="contact-name-error" className="text-red-500 text-[10px] font-mono tracking-wide mt-1 block">{errors.name}</span>}
        </div>
        <div className="space-y-1 ">
          <label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-widest text-gray-500 ">Phone</label>
          <input 
            id="contact-phone"
            name="phone"
            required 
            type="tel" 
            value={formData.phone}
            placeholder=""
            className="w-full bg-gray-50 border-b-2 border-gray-200 p-2.5 sm:p-3 text-sm focus:outline-none focus:border-[#B08D57] transition-colors rounded-md"
            onChange={(e) => {
              setFormData({...formData, phone: e.target.value});
              if (errors.phone) setErrors({...errors, phone: ""});
            }}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          />
          {errors.phone && <span id="contact-phone-error" className="text-red-500 text-[10px] font-mono tracking-wide mt-1 block">{errors.phone}</span>}
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
        <input 
          id="contact-email"
          name="email"
          required 
          type="email" 
          value={formData.email}
          placeholder=""
          className="w-full bg-gray-50 border-b-2 border-gray-200 p-2.5 sm:p-3 text-sm focus:outline-none focus:border-[#B08D57] transition-colors rounded-md"
          onChange={(e) => {
            setFormData({...formData, email: e.target.value});
            if (errors.email) setErrors({...errors, email: ""});
          }}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && <span id="contact-email-error" className="text-red-500 text-[10px] font-mono tracking-wide mt-1 block">{errors.email}</span>}
      </div>
      <div className="space-y-1">
        <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
        <textarea 
          id="contact-message"
          name="message"
          required 
          rows={4} 
          value={formData.message}
          placeholder="Tell us about your project..."
          className="w-full bg-gray-50 border-b-2 border-gray-200 p-2.5 sm:p-3 text-sm focus:outline-none focus:border-[#B08D57] transition-colors resize-none"
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>
      <button 
        type="submit" 
        className="group w-full py-3.5 sm:py-4 bg-[#18181B] text-white font-medium hover:bg-[#B08D57] transition-all duration-300 flex items-center justify-center gap-2 mt-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider"
      >
        Send Inquiry <Send size={14} className="group-hover:translate-x-1 transition-transform sm:w-4 sm:h-4" />
      </button>
    </form>
  );
};

const ContactUs: React.FC = () => {
  const [formStatus, setFormStatus] = useState<null | "idle" | "sending" | "success" | "error">(null);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick chat & queries",
      action: "Chat Now",
      href: "https://wa.me/918854883058",
      color: "hover:text-green-600 hover:border-green-600",
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Visual portfolio",
      action: "Follow Us",
      href: "https://www.instagram.com/studio.younick",
      color: "hover:text-pink-600 hover:border-pink-600",
    },
    {
      icon: Youtube,
      title: "YouTube",
      description: "Design walkthroughs",
      action: "Subscribe",
      href: "https://www.youtube.com/@Younickdesignstudio",
      color: "hover:text-red-600 hover:border-red-600",
    },
    {
      icon: Facebook,
      title: "Facebook",
      description: "Community updates",
      action: "Like Page",
      href: "https://www.facebook.com/studioyounick",
      color: "hover:text-blue-600 hover:border-blue-600",
    },
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Studio",
      details: ["Orbit Mall, Civil Lines", "Jaipur, Rajasthan 302001"],
    },
    {
      icon: Phone,
      title: "Phone (Direct Lines)",
      details: [
        "+91 88548 83058 (Nikhil Sain · Studio)",
        "+91 91667 76697 (Kamal Rajoriya)",
      ],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["studioyounick@gmail.com"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon - Sat: 10:00 AM - 7:00 PM"],
    },
  ];

  const handleFormSubmit = async () => {
    try {
      setFormStatus("sending");
      await new Promise((res) => setTimeout(res, 1500));
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    } finally {
      setTimeout(() => setFormStatus(null), 4000);
    }
  };

  return (
    <>
      <SEOHead seo={pageSEO.contact} />

      <div className="bg-[#FAFAFA] min-h-screen pt-20">
        
        <header className="relative bg-[#0F0F10] text-white pt-16 pb-20 sm:py-24 px-5 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B08D57] rounded-full blur-[120px] -mr-32 -mt-32" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[100px] -ml-20 -mb-20" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <span className="inline-block px-2.5 sm:px-3 py-1 mb-4 sm:mb-6 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase bg-[#E6B566]/10 text-[#E6B566] border border-[#E6B566]/20 rounded-sm">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif mb-4 sm:mb-6 text-white tracking-tight">Let's Create Together</h1>
            <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you have a specific project in mind or just want to explore possibilities, we're here to listen and guide you.
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 -mt-10 sm:-mt-12 relative z-20 pb-12 sm:pb-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl sm:rounded-xl shadow-xl shadow-gray-200/50 p-5 sm:p-8 md:p-12 border border-gray-100">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-1.5 sm:mb-2">Send us a Message</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Fill out the form below and our team will get back to you within 24 hours.</p>
                </div>

                <div className="relative">
                  {formStatus === "success" ? (
                    <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                      <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <CheckCircleIcon size={32} />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-500">Thank you for reaching out. We'll be in touch shortly.</p>
                    </div>
                  ) : null}
                  
                  <ContactForm onSubmit={handleFormSubmit} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              
              <div className="bg-[#18181B] text-white rounded-2xl sm:rounded-xl p-5 sm:p-8 md:p-10 shadow-2xl shadow-black/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B08D57] rounded-full blur-[60px] opacity-20" />
                
                <h3 className="text-xl sm:text-2xl font-serif mb-5 sm:mb-8 relative z-10">Studio Information</h3>
                
                <div className="space-y-4 sm:space-y-6 relative z-10">
                  {officeInfo.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#E6B566]">
                          <Icon size={15} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1">{item.title}</p>
                          {item.details.map((line, i) => {
                            if (item.title.startsWith("Phone")) {
                              const rawNumber = line.includes("88548") ? "+918854883058" : "+919166776697";
                              return (
                                <a key={i} href={`tel:${rawNumber}`} className="block text-xs sm:text-sm text-white/90 font-light hover:text-[#E6B566] transition-colors">
                                  {line}
                                </a>
                              );
                            }
                            if (item.title === "Email") {
                              return (
                                <a key={i} href={`mailto:${line}`} className="block text-xs sm:text-sm text-white/90 font-light hover:text-[#E6B566] transition-colors">
                                  {line}
                                </a>
                              );
                            }
                            return (
                              <p key={i} className="text-xs sm:text-sm text-white/90 font-light">{line}</p>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 sm:mt-10 pt-5 sm:pt-8 border-t border-white/10">
                  <a 
                    href="https://maps.app.goo.gl/p78kLz4VR3ip9tXC6" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#E6B566] hover:text-white transition-colors text-xs sm:text-sm font-medium"
                  >
                    View on Google Maps <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {contactMethods.map((method, idx) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={idx}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center ${method.color}`}
                    >
                      <div className="mb-2 sm:mb-3 text-gray-400 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={22} className="sm:w-7 sm:h-7" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1">{method.title}</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 group-hover:text-gray-600 transition-colors">{method.action}</span>
                    </a>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 pb-12 sm:pb-20">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 mb-3">
            <MapPin size={16} className="text-[#B08D57]" /> Book Your Appointment
          </div>

          <div className="h-56 sm:h-80 bg-gray-200 grayscale opacity-90 relative rounded-2xl sm:rounded-md overflow-hidden">
            <iframe
              title="Younick Studio Location"
              src="https://www.google.com/maps?q=Orbit+Mall+Jaipur&output=embed"
              className="w-full h-full"
              style={{ border: 5, borderColor: "#B08D57", borderWidth: 3, borderStyle: "solid" , borderRadius: 8 , boxShadow: "0 0 10px rgba(176, 141, 87, 0.2)"}}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </>
  );
};

const CheckCircleIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default ContactUs;
