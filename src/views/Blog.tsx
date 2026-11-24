"use client";
// src/pages/Blog.tsx
// Knowledge Center & Architectural Guides Hub for Younick Design Studio

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Clock,
  Search,
  ArrowRight,
  Sparkles,
  Tag,
  ChevronRight,
  ShieldCheck,
  Building,
  Home,
  Palette,
  Compass,
  CheckCircle2,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { useBlogPosts } from "../hooks/useSanityData";
import { type BlogPost } from "../data/blogs";
import { urlFor } from "../lib/sanity";

const CATEGORIES = [
  "All Guides",
  "Cost & Budgeting",
  "Materials & Climate",
  "Vastu & Planning",
  "Turnkey Construction",
  "3D Visualization",
] as const;

const CategoryIcons: Record<string, React.ElementType> = {
  "Cost & Budgeting": Building,
  "Materials & Climate": Palette,
  "Vastu & Planning": Compass,
  "Turnkey Construction": Home,
  "3D Visualization": Sparkles,
};

// Bespoke Architectural Category Themes with distinct luxury palettes & multi-layer styles
const CATEGORY_THEMES: Record<string, {
  name: string;
  dotColor: string;
  pillActive: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  cardBorder: string;
  cardBorderHover: string;
  cardGlow: string;
  rimGradient: string;
  accentColor: string;
  lightAura: string;
}> = {
  "All Guides": {
    name: "All Guides",
    dotColor: "bg-gradient-to-r from-[#BEDEFF] via-[#EEEEEE] to-[#F8EADC]",
    pillActive: "bg-[#0B1220] text-white shadow-md shadow-black/15",
    badgeBg: "bg-[#F8EADC]",
    badgeBorder: "border-[#ECC8AA]",
    badgeText: "text-[#8C6226]",
    cardBorder: "border-gray-200/90",
    cardBorderHover: "hover:border-[#B08D57]/60",
    cardGlow: "group-hover:shadow-[0_20px_45px_-15px_rgba(176,141,87,0.25)]",
    rimGradient: "from-[#BEDEFF] via-[#EEEEEE] to-[#F8EADC]",
    accentColor: "text-[#8C6226]",
    lightAura: "bg-[#F8EADC]/30",
  },
  "Cost & Budgeting": {
    name: "Cost & Budgeting",
    dotColor: "bg-[#8C6226]",
    pillActive: "bg-[#8C6226] text-white shadow-md shadow-[#8C6226]/30",
    badgeBg: "bg-[#F8EADC]",
    badgeBorder: "border-[#ECC8AA]",
    badgeText: "text-[#8C6226]",
    cardBorder: "border-[#F8EADC]/80",
    cardBorderHover: "hover:border-[#8C6226]",
    cardGlow: "group-hover:shadow-[0_20px_45px_-15px_rgba(236,200,170,0.55)]",
    rimGradient: "from-[#F8EADC] via-[#E8BA93] to-[#8C6226]",
    accentColor: "text-[#8C6226]",
    lightAura: "bg-[#F8EADC]/40",
  },
  "Materials & Climate": {
    name: "Materials & Climate",
    dotColor: "bg-[#A44A32]",
    pillActive: "bg-[#A44A32] text-white shadow-md shadow-[#A44A32]/30",
    badgeBg: "bg-[#FBE8E2]",
    badgeBorder: "border-[#F4C5B8]",
    badgeText: "text-[#A44A32]",
    cardBorder: "border-[#FBE8E2]/90",
    cardBorderHover: "hover:border-[#A44A32]",
    cardGlow: "group-hover:shadow-[0_20px_45px_-15px_rgba(244,197,184,0.55)]",
    rimGradient: "from-[#FBE8E2] via-[#E8A593] to-[#A44A32]",
    accentColor: "text-[#A44A32]",
    lightAura: "bg-[#FBE8E2]/40",
  },
  "Vastu & Planning": {
    name: "Vastu & Planning",
    dotColor: "bg-[#2D5A3C]",
    pillActive: "bg-[#2D5A3C] text-white shadow-md shadow-[#2D5A3C]/30",
    badgeBg: "bg-[#EAF2EC]",
    badgeBorder: "border-[#C2DEC9]",
    badgeText: "text-[#2D5A3C]",
    cardBorder: "border-[#EAF2EC]/90",
    cardBorderHover: "hover:border-[#2D5A3C]",
    cardGlow: "group-hover:shadow-[0_20px_45px_-15px_rgba(194,222,201,0.55)]",
    rimGradient: "from-[#EAF2EC] via-[#A8D3B2] to-[#2D5A3C]",
    accentColor: "text-[#2D5A3C]",
    lightAura: "bg-[#EAF2EC]/40",
  },
  "Turnkey Construction": {
    name: "Turnkey Construction",
    dotColor: "bg-[#2B303A]",
    pillActive: "bg-[#2B303A] text-white shadow-md shadow-[#2B303A]/30",
    badgeBg: "bg-[#EEEEEE]",
    badgeBorder: "border-[#D6D6D6]",
    badgeText: "text-[#2B303A]",
    cardBorder: "border-[#EEEEEE]",
    cardBorderHover: "hover:border-[#2B303A]",
    cardGlow: "group-hover:shadow-[0_20px_45px_-15px_rgba(43,48,58,0.25)]",
    rimGradient: "from-[#EEEEEE] via-[#CBD5E1] to-[#2B303A]",
    accentColor: "text-[#2B303A]",
    lightAura: "bg-[#EEEEEE]/50",
  },
  "3D Visualization": {
    name: "3D Visualization",
    dotColor: "bg-[#1A4971]",
    pillActive: "bg-[#1A4971] text-white shadow-md shadow-[#1A4971]/30",
    badgeBg: "bg-[#BEDEFF]/60",
    badgeBorder: "border-[#BEDEFF]",
    badgeText: "text-[#1A4971]",
    cardBorder: "border-[#BEDEFF]/60",
    cardBorderHover: "hover:border-[#1A4971]",
    cardGlow: "group-hover:shadow-[0_20px_45px_-15px_rgba(190,222,255,0.65)]",
    rimGradient: "from-[#BEDEFF] via-[#85B8F2] to-[#1A4971]",
    accentColor: "text-[#1A4971]",
    lightAura: "bg-[#BEDEFF]/35",
  },
};

const Blog: React.FC = () => {
  const { posts, loading } = useBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Guides");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat =
        selectedCategory === "All Guides" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // Schema: CollectionPage + ItemList + BreadcrumbList
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Architectural Blog & Guides | Younick Design Studio Jaipur",
    description:
      "Expert architectural guides, turnkey construction cost breakdowns, modular kitchen materials, and Vastu guidelines for Jaipur and Rajasthan homeowners.",
    url: "https://studioyounick.vercel.app/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://studioyounick.vercel.app/blog/${post.slug}`,
        name: post.title,
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://studioyounick.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://studioyounick.vercel.app/blog",
        },
      ],
    },
  };

  return (
    <>
      <SEOHead
        seo={{
          title: "Interior & Architecture Blog | Younick Design Studio Jaipur",
          description: "Comprehensive 2026 cost guides, material comparisons, Vastu rules, and turnkey civil construction insights for luxury homes and commercial spaces in Jaipur.",
          keywords: "interior design cost jaipur, modular kitchen material jaipur, vastu guidelines luxury villa jaipur, turnkey civil contractor jaipur, 3d architectural rendering jaipur, architecture blog jaipur",
          url: "https://studioyounick.vercel.app/blog",
        }}
        title="Interior & Architecture Blog | Younick Design Studio Jaipur"
        description="Comprehensive 2026 cost guides, material comparisons, Vastu rules, and turnkey civil construction insights for luxury homes and commercial spaces in Jaipur."
        keywords="interior design cost jaipur, modular kitchen material jaipur, vastu guidelines luxury villa jaipur, turnkey civil contractor jaipur, 3d architectural rendering jaipur, architecture blog jaipur"
        canonicalUrl="https://studioyounick.vercel.app/blog"
        schema={schema}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-white to-[#F5EFE6] text-gray-900 pt-28 sm:pt-32 pb-20 relative overflow-hidden">
        {/* ── Multi-tone Atmospheric Aura Layers (#BEDEFF, #F8EADC, #EEEEEE) ── */}
        <div className="absolute top-10 right-1/6 w-[600px] h-[600px] bg-[#BEDEFF]/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/10 w-[550px] h-[550px] bg-[#F8EADC]/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[400px] bg-[#EEEEEE]/60 rounded-full blur-[150px] pointer-events-none" />

        {/* ── Hero Header ── */}
        <div className="relative overflow-hidden border-b border-gray-200/80 pb-12 sm:pb-16">
          <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#8C6226] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-gray-900 font-semibold">Blog</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B08D57]/30 bg-[#B08D57]/10 text-xs font-semibold uppercase tracking-widest text-[#8C6226] mb-4 shadow-xs">
                <BookOpen size={13} />
                Architectural Insights &amp; Cost Guides
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight mb-4">
                The Jaipur Interior &amp; Construction <span className="text-[#8C6226]">Blog</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
                Objective per-square-foot cost breakdowns, material durability tests for Rajasthan’s climate, and modern Vastu engineering written by practicing architects.
              </p>
            </div>

            {/* Search and Filters Bar with Multi-Palettes */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cost guides, materials, Vastu, modular kitchens..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 shadow-xs transition-all"
                />
              </div>

              {/* Multi-Palette Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const theme = CATEGORY_THEMES[cat] || CATEGORY_THEMES["All Guides"];
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? `${theme.pillActive} scale-[1.02]`
                          : "bg-white/90 text-gray-600 hover:bg-white hover:text-gray-900 border border-gray-200 shadow-xs hover:border-gray-300"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-white" : theme.dotColor}`} />
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Featured Guide Highlight with Multi-Layer Offset Plate ── */}
        {selectedCategory === "All Guides" && !searchQuery && featuredPost && (() => {
          const featuredTheme = CATEGORY_THEMES[featuredPost.category] || CATEGORY_THEMES["All Guides"];
          return (
            <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-b border-gray-200/80">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs uppercase tracking-widest text-[#8C6226] font-bold">
                  Featured 2026 Flagship Guide
                </span>
              </div>

              {/* Multi-Layered Featured Card */}
              <div className="relative group select-none">
                {/* Layer 1: Architectural Offset Plate */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8EADC] via-[#EEEEEE] to-[#BEDEFF]/40 rounded-3xl transform translate-x-2.5 translate-y-2.5 sm:translate-x-3.5 sm:translate-y-3.5 border border-[#ECC8AA]/60 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4 shadow-md pointer-events-none" />

                {/* Layer 2: Main Featured Porcelain Card */}
                <div className="relative rounded-3xl overflow-hidden border border-gray-200/90 bg-white shadow-xl shadow-black/[0.04] p-6 sm:p-8 lg:p-10 transition-all duration-300">
                  {/* Precision laser edge rim */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#BEDEFF] via-[#EEEEEE] to-[#F8EADC]" />

                  {/* Corner crosshairs */}
                  <span className="absolute top-3 left-3 font-mono text-[10px] text-gray-300 select-none">+</span>
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-gray-300 select-none">+</span>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3.5">
                        <span className={`px-2.5 py-1 rounded-md ${featuredTheme.badgeBg} ${featuredTheme.badgeBorder} ${featuredTheme.badgeText} font-bold border shadow-xs`}>
                          {featuredPost.category}
                        </span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readingTime}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {featuredPost.publishedAt}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3.5 group-hover:text-[#8C6226] transition-colors leading-snug">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#B9E4E8] to-[#F5F5F0] hover:from-[#B9E4E8]/80 hover:to-[#F5F5F0]/80  text-gray-900 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#B08D57]/25 hover:shadow-lg hover:shadow-[#B08D57]/35 hover:scale-[1.01]"
                        >
                          Read Full Guide 
                        </Link>

                        <div className="flex items-center gap-2.5 text-xs text-gray-500">
                          <img
                            src={urlFor(featuredPost.author.image) || "/assets/team/Nikhil/Nikhil-480.jpeg"}
                            alt={featuredPost.author.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-[#B08D57]/40 shadow-xs"
                          />
                          <span>By <strong className="text-gray-900">{featuredPost.author.name}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                      <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-2xl aspect-[16/10] border border-gray-200/90 shadow-lg relative group/img">
                        <img
                          src={urlFor(featuredPost.coverImage) || "/assets/services/interior-design3.jpg"}
                          alt={featuredPost.coverImageAlt || featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Main Guides Grid with Multi-Palettes ── */}
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
              {selectedCategory === "All Guides" ? "All Knowledge Base Articles" : `${selectedCategory} Articles`}
              <span className="ml-2.5 text-xs font-sans font-normal text-gray-500">({filteredPosts.length} guides)</span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm">No articles found matching your search. Try another category or keyword.</p>
              <button
                onClick={() => { setSelectedCategory("All Guides"); setSearchQuery(""); }}
                className="mt-4 px-4 py-2 rounded-lg bg-[#0B1220] text-white text-xs font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post, idx) => {
                const IconComponent = CategoryIcons[post.category] || BookOpen;
                const theme = CATEGORY_THEMES[post.category] || CATEGORY_THEMES["All Guides"];
                return (
                  <article
                    key={post.id}
                    className={`group relative flex flex-col rounded-3xl overflow-hidden border ${theme.cardBorder} ${theme.cardBorderHover} bg-white shadow-sm hover:shadow-2xl ${theme.cardGlow} hover:-translate-y-1.5 transition-all duration-300`}
                  >
                    {/* Top Laser Edge Rim in category gradient */}
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${theme.rimGradient}`} />

                    {/* Corner watermark for architectural drafting index */}
                    <span className="absolute top-2.5 right-3 text-[9px] font-mono tracking-widest text-gray-300 font-bold z-10 pointer-events-none">
                      SPEC.0{idx + 1}
                    </span>

                    {/* Cover image */}
                    <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={urlFor(post.coverImage) || "/assets/services/interior-design3.jpg"}
                        alt={post.coverImageAlt || post.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                      {/* Category Badge with custom palette */}
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full ${theme.badgeBg} backdrop-blur-md border ${theme.badgeBorder} text-[11px] font-bold ${theme.badgeText} flex items-center gap-1.5 shadow-sm`}>
                        <IconComponent size={12} />
                        {post.category}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta info */}
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
                          <span className="flex items-center gap-1 font-mono text-[11px]"><Clock size={11} /> {post.readingTime}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-mono text-[11px]"><Calendar size={11} /> {post.publishedAt}</span>
                        </div>

                        {/* Title */}
                        <h3 className={`text-lg font-serif font-bold text-gray-900 group-hover:${theme.accentColor} transition-colors line-clamp-2 leading-snug mb-2.5`}>
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <img
                            src={urlFor(post.author.image) || "/assets/team/Nikhil/Nikhil-480.jpeg"}
                            alt={post.author.name}
                            className="w-5 h-5 rounded-full object-cover border border-[#B08D57]/30"
                          />
                          <span className="text-[11px] font-medium text-gray-700">{post.author.name}</span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className={`inline-flex items-center gap-1 text-xs font-bold ${theme.accentColor} hover:text-gray-900 transition-colors`}
                        >
                          <span>Read Guide</span>
                          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Consultation Callout (Layered Pavilion) ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
          <div className="relative group">
            {/* Layer 1: Offset plate */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#BEDEFF]/40 via-[#EEEEEE] to-[#F8EADC]/50 rounded-3xl transform translate-x-2 translate-y-2 border border-[#ECC8AA]/40 shadow-sm pointer-events-none" />

            {/* Layer 2: Main Pavilion Card */}
            <div className="relative rounded-3xl border border-gray-200/90 bg-white p-8 sm:p-12 text-center overflow-hidden shadow-xl shadow-black/[0.03]">
              {/* Top tri-color laser line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#BEDEFF] via-[#EEEEEE] to-[#F8EADC]" />

              {/* Corner crosshairs */}
              <span className="absolute top-3 left-3 font-mono text-[10px] text-gray-400 select-none">+</span>
              <span className="absolute top-3 right-3 font-mono text-[10px] text-gray-400 select-none">+</span>

              <div className="max-w-2xl mx-auto relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border border-amber-400 text-[10.5px] font-semi bold uppercase tracking-widest text-gray-300 mb-3 shadow-xs">
                  Have a Specific Site or Budget in Mind?
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
                  Book a Complimentary Architectural Planning Session
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-sans">
                  Receive an itemized BOQ estimate, 3D zoning review, and material suitability checklist directly from our principal architects at Orbit Mall, Civil Lines, Jaipur.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://wa.me/918854883058?text=Hello%20Younick%20Studio%2C%20I%20read%20your%20Knowledge%20Center%20guides%20and%20would%20like%20to%20discuss%20an%20interior%2Fconstruction%20project%20in%20Jaipur."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#9FED72] to-[#9FED72] hover:from-[#9FED72] hover:to-[#B7D894] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#B08D57]/30 hover:shadow-lg hover:scale-[1.01]"
                  >
                    Chat with Architect on WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="px-7 py-3.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-[1.01]"
                  >
                    Schedule Studio Meeting
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
