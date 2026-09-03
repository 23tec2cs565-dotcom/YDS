// src/pages/Blog.tsx
// Knowledge Center & Architectural Guides Hub for Younick Design Studio

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
    url: "https://yds-liart.vercel.app/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://yds-liart.vercel.app/blog/${post.slug}`,
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
          item: "https://yds-liart.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://yds-liart.vercel.app/blog",
        },
      ],
    },
  };

  return (
    <>
      <SEOHead
        title="Interior & Architecture Blog | Younick Design Studio Jaipur"
        description="Comprehensive 2026 cost guides, material comparisons, Vastu rules, and turnkey civil construction insights for luxury homes and commercial spaces in Jaipur."
        keywords="interior design cost jaipur, modular kitchen material jaipur, vastu guidelines luxury villa jaipur, turnkey civil contractor jaipur, 3d architectural rendering jaipur, architecture blog jaipur"
        canonicalUrl="https://yds-liart.vercel.app/blog"
        schema={schema}
      />

      <div className="min-h-screen bg-[#070D18] text-white pt-28 sm:pt-32 pb-20">
        {/* ── Hero Header ── */}
        <div className="relative overflow-hidden border-b border-white/10 pb-12 sm:pb-16">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E6B566]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#B08D57]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-6">
              <Link to="/" className="hover:text-[#E6B566] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white font-medium">Blog</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E6B566]/30 bg-[#E6B566]/10 text-xs font-semibold uppercase tracking-widest text-[#E6B566] mb-4">
                <BookOpen size={13} />
                Architectural Insights &amp; Cost Guides
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
                The Jaipur Interior &amp; Construction <span className="text-[#E6B566]">Blog</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#E6B566] focus:ring-1 focus:ring-[#E6B566] transition-all"
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
                          ? "bg-[#E6B566] text-[#070D18] font-bold shadow-md shadow-[#E6B566]/20"
                          : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-b border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-[#E6B566]" />
              <span className="text-xs uppercase tracking-widest text-[#E6B566] font-bold">
                Featured 2026 Flagship Guide
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 sm:p-8 lg:p-10 group hover:border-[#E6B566]/40 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#E6B566]/20 text-[#E6B566] font-semibold">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readingTime}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {featuredPost.publishedAt}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-3 group-hover:text-[#E6B566] transition-colors leading-snug">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E6B566] text-[#070D18] text-xs font-bold uppercase tracking-wider hover:bg-[#D4A054] transition-all"
                    >
                      Read Full Guide <ArrowRight size={14} />
                    </Link>

                    <div className="flex items-center gap-2.5 text-xs text-gray-400">
                      <img
                        src={featuredPost.author.image || "/assets/team/Nikhil/Nikhil-480.jpeg"}
                        alt={featuredPost.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#E6B566]/40"
                      />
                      <span>By <strong>{featuredPost.author.name}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <Link to={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-xl aspect-[16/10] border border-white/10">
                    <img
                      src={featuredPost.coverImage}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {selectedCategory === "All Guides" ? "All Knowledge Base Articles" : `${selectedCategory} Articles`}
              <span className="ml-2.5 text-xs font-sans font-normal text-gray-400">({filteredPosts.length} guides)</span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="text-gray-400 text-sm">No articles found matching your search. Try another category or keyword.</p>
              <button
                onClick={() => { setSelectedCategory("All Guides"); setSearchQuery(""); }}
                className="mt-4 px-4 py-2 rounded-lg bg-[#E6B566] text-[#070D18] text-xs font-bold"
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
                    className="flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-[#E6B566]/40 transition-all duration-300 group"
                  >
                    {/* Cover image */}
                    <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-black/40">
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#070D18]/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-[#E6B566] flex items-center gap-1.5">
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
                        <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E6B566] transition-colors line-clamp-2 leading-snug mb-2">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <img
                            src={post.author.image || "/assets/team/Nikhil/Nikhil-480.jpeg"}
                            alt={post.author.name}
                            className="w-5 h-5 rounded-full object-cover border border-[#E6B566]/30"
                          />
                          <span className="text-[11px]">{post.author.name}</span>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#E6B566] hover:text-white transition-colors"
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
          <div className="rounded-2xl border border-[#E6B566]/30 bg-gradient-to-r from-[#E6B566]/15 via-white/[0.03] to-[#E6B566]/10 p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6B566] mb-2 block">
                Have a Specific Site or Budget in Mind?
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                Book a Complimentary Architectural Planning Session
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Receive an itemized BOQ estimate, 3D zoning review, and material suitability checklist directly from our principal architects at Orbit Mall, Civil Lines, Jaipur.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/918854883058?text=Hello%20Younick%20Studio%2C%20I%20read%20your%20Knowledge%20Center%20guides%20and%20would%20like%20to%20discuss%20an%20interior%2Fconstruction%20project%20in%20Jaipur."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#E6B566] text-[#070D18] font-bold text-xs uppercase tracking-wider hover:bg-[#D4A054] transition-all shadow-lg shadow-[#E6B566]/20"
                >
                  Chat with Architect on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
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
