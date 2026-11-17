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

      <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-white to-[#F7F5F0] text-gray-900 pt-28 sm:pt-32 pb-20">
        {/* ── Hero Header ── */}
        <div className="relative overflow-hidden border-b border-gray-200/80 pb-12 sm:pb-16">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#BEDEFF]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#F8EADC]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#8C6226] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-gray-900 font-semibold">Blog</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B08D57]/30 bg-[#B08D57]/10 text-xs font-semibold uppercase tracking-widest text-[#8C6226] mb-4">
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

            {/* Search and Filters Bar */}
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

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-[#0B1220] text-white font-bold shadow-md shadow-black/10"
                          : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 shadow-xs"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Featured Guide Highlight (if showing all and no search) ── */}
        {selectedCategory === "All Guides" && !searchQuery && featuredPost && (
          <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-b border-gray-200/80">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-[#8C6226]" />
              <span className="text-xs uppercase tracking-widest text-[#8C6226] font-bold">
                Featured 2026 Flagship Guide
              </span>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-gray-200/90 bg-white shadow-xl shadow-black/[0.03] p-6 sm:p-8 lg:p-10 group hover:border-[#B08D57]/40 hover:shadow-2xl hover:shadow-[#B08D57]/10 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#F8EADC] border border-[#ECC8AA] text-[#8C6226] font-semibold">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readingTime}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {featuredPost.publishedAt}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3 group-hover:text-[#8C6226] transition-colors leading-snug">
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B08D57] to-[#8C6226] hover:from-[#9C7945] hover:to-[#79541F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#B08D57]/20"
                    >
                      Read Full Guide <ArrowRight size={14} />
                    </Link>

                    <div className="flex items-center gap-2.5 text-xs text-gray-500">
                      <img
                        src={urlFor(featuredPost.author.image) || "/assets/team/Nikhil/Nikhil-480.jpeg"}
                        alt={featuredPost.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#B08D57]/40"
                      />
                      <span>By <strong className="text-gray-800">{featuredPost.author.name}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-2xl aspect-[16/10] border border-gray-200 shadow-md">
                    <img
                      src={urlFor(featuredPost.coverImage) || "/assets/services/interior-design3.jpg"}
                      alt={featuredPost.coverImageAlt || featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Guides Grid ── */}
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
                className="mt-4 px-4 py-2 rounded-lg bg-[#0B1220] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => {
                const IconComponent = CategoryIcons[post.category] || BookOpen;
                return (
                  <article
                    key={post.id}
                    className="flex flex-col rounded-2xl overflow-hidden border border-gray-200/80 bg-white hover:border-[#B08D57]/40 shadow-sm hover:shadow-xl hover:shadow-black/[0.04] transition-all duration-300 group"
                  >
                    {/* Cover image */}
                    <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={urlFor(post.coverImage) || "/assets/services/interior-design3.jpg"}
                        alt={post.coverImageAlt || post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-gray-200/80 text-[11px] font-semibold text-[#8C6226] flex items-center gap-1.5 shadow-sm">
                        <IconComponent size={12} />
                        {post.category}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta info */}
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
                          <span className="flex items-center gap-1"><Clock size={11} /> {post.readingTime}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar size={11} /> {post.publishedAt}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#8C6226] transition-colors line-clamp-2 leading-snug mb-2">
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
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6226] hover:text-[#0B1220] transition-colors"
                        >
                          Read Guide <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Consultation Callout ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="rounded-3xl border border-[#B08D57]/20 bg-gradient-to-br from-[#FAF8F5] via-white to-[#F5EFE6] p-8 sm:p-12 text-center relative overflow-hidden shadow-xl shadow-black/[0.03]">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6226] mb-2 block">
                Have a Specific Site or Budget in Mind?
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-3">
                Book a Complimentary Architectural Planning Session
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Receive an itemized BOQ estimate, 3D zoning review, and material suitability checklist directly from our principal architects at Orbit Mall, Civil Lines, Jaipur.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/918854883058?text=Hello%20Younick%20Studio%2C%20I%20read%20your%20Knowledge%20Center%20guides%20and%20would%20like%20to%20discuss%20an%20interior%2Fconstruction%20project%20in%20Jaipur."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#B08D57] to-[#8C6226] hover:from-[#9C7945] hover:to-[#79541F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#B08D57]/20"
                >
                  Chat with Architect on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  Schedule Studio Meeting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
