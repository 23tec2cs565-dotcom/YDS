import React, { useEffect, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import SEOHead from "../components/SEOHead";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"; 
    img.alt = "Younick studio image fallback";
  }
}

const faqItems = [
  {
    question: "Do you work nationwide?",
    answer:
      "We primarily operate across Rajasthan and Jaipur, and we take select projects nationwide. For remote projects, we provide detailed visuals and phased on-site visits.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines depend on size, complexity, and scope. Interior projects generally take a few weeks, while construction and larger renovations require more planning and execution time.",
  },
  {
    question: "What's included in your design service?",
    answer:
      "Our design services include space planning, material guidance, layout concepts, furniture direction, color coordination, lighting suggestions, and detailed execution support.",
  },
  {
    question: "What type of clients work best with Younick?",
    answer:
      "Clients who value thoughtful design, clear communication, quality execution, and long-term functionality tend to get the best results from our process.",
  },
   {
    question: "How are project costs and fees decided?",
    answer:
      "Project pricing depends on scope, size, materials, complexity, and execution requirements. We provide clear estimates and planning discussions before beginning any work.",
  },
  {
    question: "Do you provide 3D visualization before execution?",
    answer:
      "Yes. We create detailed 3D visualizations so you can understand the final outcome before construction or execution begins.",
  },
  {
    question: "Can I hire Younick only for consultation?",
    answer:
      "Absolutely. We offer standalone consultation services for design guidance, planning clarity, material recommendations, and execution advice.",
  },
  {
    question: "How do I start a project with Younick?",
    answer:
      "You can contact us through our contact page, WhatsApp, or direct phone call. We’ll discuss your requirements and recommend the best next steps.",
  },
];

const FAQ: React.FC = () => {
  const [faqAnimation, setFaqAnimation] = useState<object | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
const [focusedIndex, setFocusedIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
  const isClosing = openIndex === index;

  setOpenIndex(isClosing ? null : index);
  setFocusedIndex(isClosing ? null : index);
};
  useEffect(() => {
  fetch("/assets/lottie/faq-confused.json")
    .then((res) => res.json())
    .then((data) => setFaqAnimation(data))
    .catch((err) =>
      console.error("Failed to load FAQ animation:", err)
    );
}, []);

  const seoForPage = {
    title: "FAQ — Younick Design Studio",
    description:
      "Frequently asked questions about interior design, construction, renovation, consultation, and project planning at Younick Design Studio.",
    url: "/faq",
    image: "/assets/faq/faq-hero.png",
  };
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};
  return (
    <>
      <SEOHead seo={seoForPage} type="website"  />
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>

      <main className="min-h-screen bg-gradient-to-b from-[#F7F6F3] via-[#FCFBF8] to-[#F8F4EE] pt-28 pb-20">
        <section className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[2.5rem] border border-[#E7D6B7]/50 bg-gradient-to-br from-[#F9F6F0] via-[#FFFFFF] to-[#F7F3EC] shadow-[0_35px_90px_rgba(0,0,0,0.08)]">
            {/* background decorative elements */}
            <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[#E6B566]/10 blur-[100px]" />
            <div className="absolute bottom-[-4rem] left-[-4rem] h-72 w-72 rounded-full bg-[#B6862E]/10 blur-[90px]" />

            {/* huge faded typography */}
            <div className="pointer-events-none absolute top-6 left-6 select-none text-[120px] font-semibold tracking-tight text-[#B6862E]/[0.05] lg:text-[180px]">
              FAQ
            </div>

            <div className="relative grid items-center gap-10 px-8 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-14 lg:py-14">
              {/* LEFT CONTENT */}
              <div className="relative z-10 max-w-[620px]">
                <div className="inline-flex items-center rounded-full border border-[#C8A66A]/30 bg-[#E6B566]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A7772C] backdrop-blur-sm">
                  Frequently Asked Questions
                </div>

                {/* gold accent line */}
                <div className="mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#C8A66A] to-transparent" />

                <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-tight text-[#1B2430] md:text-6xl">
                  Answers to common questions before starting your
                  <span className="text-[#B6862E]">
                    {" "}
                    dream space.
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#5F6875]">
                  Everything you may want to know about our interior design,
                  construction, renovation, consultation, and execution process
                  — thoughtfully crafted to make your experience smoother.
                </p>
                </div>



              {/* RIGHT VISUAL */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/30 shadow-[0_30px_80px_rgba(0,0,0,0.12)] backdrop-blur-md">
                  <img
                    src="/assets/faq/faq-hero.png"
                    alt="Luxury Interior Design"
                    className="h-[440px] w-full rounded-[2rem] object-cover lg:w-[560px]"
                    loading="lazy"
                    decoding="async"
                    onError={handleImgError}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/20 via-transparent to-transparent" />

<div className="absolute top-6 right-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
  {/* inner luxury ring */}
  <div className="absolute h-16 w-16 rounded-full border border-[#E6B566]/25" />

  {/* soft glow */}
  <div className="absolute inset-0 rounded-full bg-[#E6B566]/[0.03]" />

  {/* lottie animation */}
  <div className="relative z-10 -mt-10 translate-x-1 w-[100px] opacity-80 mix-blend-screen animate-lottieEntrance">
    {faqAnimation && (
      <Lottie
        animationData={faqAnimation}
        loop
        autoplay
        style={{
          filter:
  "sepia(1) saturate(1.4) hue-rotate(345deg) brightness(0.82) contrast(0.92)"
        }}
      />
    )}
  </div>
</div>

                  <div className="absolute bottom-5 left-5 rounded-2xl border border-white/30 bg-white/70 px-5 py-3 shadow-lg backdrop-blur-xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B6862E]">
                      Design • Plan • Build
                    </p>

                    <p className="mt-1 text-sm text-[#374151]">
                      Thoughtfully designed spaces.
                    </p>
                  </div>
                </div>

                <div className="absolute -right-4 -bottom-4 rounded-2xl border border-[#E6B566]/20 bg-white px-5 py-4 shadow-xl">
                  <p className="text-2xl font-semibold text-[#1B2430]">
                    120+
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#7A8494]">
                    Spaces Designed
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative mt-16">
  {/* luxury blur layer */}
  <div
    className={`pointer-events-none absolute inset-0 rounded-[3rem] transition-all duration-700 ${
      focusedIndex !== null
        ? "bg-white/10 backdrop-blur-[8px] bg-gradient-to-b from-white/10 to-[#FFF8EE]/10"
        : ""
    }`}
  />

  <div className="relative space-y-5">
    {faqItems.map((faq, index) => {
      const isOpen = openIndex === index;
      const isFocused = focusedIndex === index;
      const isDimmed =
        focusedIndex !== null && focusedIndex !== index;

      return (
        <div
          key={faq.question}
          className={`group relative overflow-hidden rounded-[2rem] border backdrop-blur-xl transition-all duration-700 ease-out ${
            isOpen
              ? "z-20 scale-[1.012] border-[#D2B17A]/40 bg-gradient-to-br from-white/95 via-[#FFFDF8]/92 to-[#FFF8EE]/88 shadow-[0_35px_90px_rgba(182,134,46,0.16)] ring-1 ring-[#E6B566]/10"
              : "border-[#E7DDD0]/80 bg-white/65 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:-translate-y-[2px] hover:border-[#D2B17A]/40 hover:bg-white/85 hover:shadow-[0_18px_50px_rgba(182,134,46,0.08)]"
          } ${
            isDimmed
              ? "scale-[0.995] opacity-[0.82] "
              : "opacity-100"
          }`}
        >
          {/* liquid luxury glow */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isOpen || isFocused
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-[#E6B566]/[0.10] blur-[90px]" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[#FFF3D6]/20 blur-[60px]" />
            {/* subtle liquid glass sheen */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>

          
            <button
  onClick={() => toggleFAQ(index)}
  aria-expanded={isOpen}
  aria-controls={`faq-answer-${index}`}
  id={`faq-question-${index}`}
  className="relative flex w-full items-start justify-between px-7 py-7 text-left lg:px-9"
>
  <div className="flex gap-6 lg:gap-8">
    {/* luxury number badge */}
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-700 ${
        isOpen
          ? "border-[#D2B17A]/40 bg-gradient-to-br from-[#E6B566]/20 to-[#B6862E]/10 text-[#A7772C] shadow-[0_10px_25px_rgba(182,134,46,0.18)]"
          : "border-[#E6DDD0] bg-white/80 text-[#A0A7B4] group-hover:border-[#D2B17A]/30 group-hover:text-[#A7772C]"
      }`}
    >
      {String(index + 1).padStart(2, "0")}
    </div>

    <div className="pt-1">
                <h2
                  className={`font-serif leading-[1.2] tracking-[-0.02em] transition-all duration-500 md:text-[1.9rem] ${
                    isOpen
                      ? "text-[1.95rem] text-[#1B2430]"
                      : "text-[1.65rem] text-[#344256] group-hover:text-[#1B2430]"
                  }`}
                >
                  {faq.question}
                </h2>

                <div 
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  isOpen
                  ? "mt-5 max-h-[280px] opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
                  >
                  <div className="relative overflow-hidden rounded-[1.5rem] border border-white/30 bg-white/40 px-6 py-5 backdrop-blur-xl">
                    {/* liquid highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                    <p className="relative z-10 max-w-3xl text-[15px] leading-8 text-[#667085] md:text-[16px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* premium chevron */}
            <div
              className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-700 ${
                isOpen
                  ? "border-[#D2B17A]/30 bg-[#E6B566]/10 shadow-[0_8px_20px_rgba(182,134,46,0.10)]"
                  : "border-[#ECE6DD] bg-white/70 group-hover:border-[#D2B17A]/25"
              }`}
            >
              <ChevronDown
                size={20}
                className={`text-[#A7772C] transition-transform duration-700 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>
        </div>
      );
    })}
  </div>
</section>

          {/* FAQ → CTA luxury transition */}
<div className="relative my-10 h-24 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E6B566]/[0.04] to-transparent blur-[30px]" />
</div>

{/* CTA */}
<section className="relative mt-24 overflow-hidden rounded-[2.5rem] border border-white/30 bg-gradient-to-br from-white via-[#FFFCF7] to-[#FFF4E8] px-8 py-14 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:px-14">
  {/* ambient luxury glow */}
  <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[#E6B566]/10 blur-[120px] animate-pulse" />
  <div className="absolute bottom-[-3rem] left-[-3rem] h-56 w-56 rounded-full bg-[#FFF3D6]/30 blur-[90px]" />

  {/* subtle liquid glass line */}
  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />

  <div className="relative z-10 lg:flex lg:items-center lg:justify-between lg:gap-16">
    {/* LEFT CONTENT */}
    <div className="max-w-3xl">
      {/* luxury pill */}
      <div className="inline-flex items-center rounded-full border border-[#D2B17A]/20 bg-white/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A7772C] backdrop-blur-md">
        Interior • Plan • Build
      </div>

      <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-[#1B2430] md:text-5xl">
        Let’s create a space
        <span className="text-[#B6862E]">
          {" "}
          that feels uniquely yours.
        </span>
      </h2>

      <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#5F6875]">
        From interiors and planning to construction and detailing, we
        shape thoughtful spaces designed around your lifestyle.
      </p>
    </div>

    {/* RIGHT CTA */}
    <div className="mt-8 flex items-center lg:mt-0">
      <Link
  to="/contact"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#1B2430]/10 bg-[#1B2430] px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(27,36,48,0.18)] transition-all duration-700 ease-out hover:-translate-y-[3px] hover:scale-[1.015] hover:shadow-[0_22px_55px_rgba(27,36,48,0.26)]"
      >
        {/* subtle hover glow */}
        <span className="absolute inset-0 overflow-hidden rounded-full">
  <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
    <span className="absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-all duration-1000 group-hover:left-[140%]" />
  </span>
</span>

        <span className="relative z-10">
          Start Your Project
        </span>

        <ArrowRight
          size={16}
          className="relative z-10 transition-transform duration-700 ease-out group-hover:translate-x-[4px] group-hover:-translate-y-[1px]"
        />
      </Link>
    </div>
  </div>
</section>

</section>
</main>
    </>
  );
};

export default FAQ;