"use client";
// src/pages/BlogPost.tsx
// Dedicated Architectural Guide & Knowledge Center Article Page for Younick Design Studio

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Check,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Building,
  ShieldCheck,
  CheckCircle2,
  Tag,
  BookOpen,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { useBlogPosts } from "../hooks/useSanityData";
import { blogs as defaultBlogs, type BlogPost } from "../data/blogs";
import { urlFor } from "../lib/sanity";

const BlogPostPage: React.FC<{ slug?: string }> = ({ slug: propSlug }) => {
  const params = useParams();
  const rawSlug = propSlug || (typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "");
  const slug = rawSlug;
  const { posts, loading } = useBlogPosts();
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Find target post
  const post = useMemo(() => {
    if (!slug) return null;
    const clean = slug.toLowerCase().trim();
    return posts.find(
      (p) => p.slug.toLowerCase() === clean || p.id.toLowerCase() === clean
    );
  }, [slug, posts]);

  // Related posts
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  }, [post, posts]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: `${post?.title} | Younick Design Studio`,
        text: post?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [post]);

  if (loading && !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-white to-[#F7F5F0] flex flex-col items-center justify-center text-center px-6">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#8C6226] animate-pulse mb-4">
          Loading Architectural Guide...
        </div>
        <div className="w-20 h-[2px] bg-gray-200 overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#B08D57] rounded-full animate-marquee" style={{ animationDuration: "1.2s" }} />
        </div>
      </div>
    );
  }

  if (!post) {
    if (!loading) {
      notFound();
    }
    return null;
  }

  const siteUrl = "https://studioyounick.vercel.app";
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const ogImage = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${siteUrl}${post.coverImage}`;

  // Structured Data Schema for Google BlogPosting + FAQPage + BreadcrumbList
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [ogImage],
        datePublished: `${post.publishedAt}T09:00:00+05:30`,
        dateModified: `${post.publishedAt}T12:00:00+05:30`,
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
          url: `${siteUrl}/team`,
          sameAs: [
            "https://www.linkedin.com/in/nikhil-sain-300351156",
            "https://www.instagram.com/studio.younick",
          ],
        },
        publisher: {
          "@type": "Organization",
          name: "Younick Design Studio",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/younick-crest.webp`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        articleSection: post.category,
        keywords: post.tags.join(", "),
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      },
      ...(post.faqs && post.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${canonicalUrl}#faq`,
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <SEOHead
        seo={{
          title: post.seoTitle || `${post.title} | Younick Studio Jaipur`,
          description: post.seoDescription || post.excerpt,
          keywords: post.seoKeywords || post.tags.join(", "),
          url: canonicalUrl,
          image: ogImage,
        }}
        title={post.seoTitle || `${post.title} | Younick Studio Jaipur`}
        description={post.seoDescription || post.excerpt}
        keywords={post.seoKeywords || post.tags.join(", ")}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        ogType="article"
        schema={schema}
      />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gray-200 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#B08D57] to-[#8C6226] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-white to-[#F7F5F0] text-gray-900 pt-28 sm:pt-32 pb-20">
        {/* ── Article Header ── */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#8C6226] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-[#8C6226] transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-[#8C6226] font-semibold truncate max-w-[200px] sm:max-w-xs">{post.category}</span>
          </nav>

          {/* Category & Read Time badge */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#F8EADC] border border-[#ECC8AA] text-[#8C6226] font-bold">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readingTime}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> Published {post.publishedAt}</span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-[1.2] mb-4">
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed mb-6">
              {post.subtitle}
            </p>
          )}

          {/* Author & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={urlFor(post.author.image) || "/assets/team/Nikhil/Nikhil-480.jpeg"}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border border-[#B08D57]/40 shadow-xs"
              />
              <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">{post.author.name}</p>
                <p className="text-xs text-gray-500">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 shadow-xs transition-colors"
                title="Share this guide"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                <span>{copied ? "Link Copied!" : "Share"}</span>
              </button>

              <a
                href={`https://wa.me/918854883058?text=Hello%20Younick%20Studio%2C%20I%20have%20a%20question%20regarding%20your%20article%3A%20${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#B08D57] to-[#8C6226] text-white text-xs font-bold hover:from-[#9C7945] hover:to-[#79541F] shadow-xs transition-colors"
              >
                <MessageCircle size={14} />
                <span>Ask Architect</span>
              </a>
            </div>
          </div>
        </header>

        {/* ── Featured Cover Image ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-gray-200/90 relative bg-gray-100 shadow-xl">
            <img
              src={urlFor(post.coverImage) || "/assets/services/interior-design3.jpg"}
              alt={post.coverImageAlt || post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          {post.coverImageCaption && (
            <p className="mt-2.5 text-center text-xs text-gray-500 italic font-light">
              {post.coverImageCaption}
            </p>
          )}
        </div>

        {/* ── Main Article Body ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Executive Summary Callout */}
          <div className="p-6 rounded-2xl border-l-4 border-[#B08D57] bg-gradient-to-r from-[#B08D57]/10 via-[#F8EADC]/30 to-transparent border-y border-r border-gray-200/60 mb-10 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#8C6226] mb-2 flex items-center gap-2">
              <ShieldCheck size={14} />
              Executive Summary &amp; Architect Takeaways
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          </div>

          {/* Rich HTML Content */}
          <div
            className="prose prose-stone max-w-none 
              prose-headings:font-serif prose-headings:text-gray-900 prose-headings:font-bold
              prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-[#8C6226]
              prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-900
              prose-p:text-gray-700 prose-p:text-base prose-p:leading-relaxed prose-p:mb-5
              prose-ul:text-gray-700 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:text-gray-700 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:mb-2 prose-li:leading-relaxed
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-a:text-[#8C6226] prose-a:underline hover:prose-a:text-[#0B1220]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500 flex items-center gap-1.5 mr-2">
                <Tag size={13} /> Topics:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md bg-white border border-gray-200 text-xs text-gray-700 shadow-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ── FAQ Section (Google Rich Results Snippet) ── */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-14 pt-10 border-t border-gray-200" aria-label="Frequently Asked Questions">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle size={18} className="text-[#8C6226]" />
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {post.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-colors hover:border-[#B08D57]/40 shadow-xs"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-medium text-gray-900 hover:text-[#8C6226] transition-colors"
                      >
                        <span className="text-sm sm:text-base">{faq.question}</span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-[#8C6226] transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Photo Gallery / Architectural Visuals ── */}
          {post.galleryImages && post.galleryImages.length > 0 && (
            <section className="mt-14 pt-10 border-t border-gray-200" aria-label="Project Visuals Gallery">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Project Visuals &amp; Architectural Renders
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {post.galleryImages.map((img, gIdx) => (
                  <figure key={gIdx} className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm group">
                    <img
                      src={urlFor(img.url)}
                      alt={img.alt || `${post.title} render ${gIdx + 1}`}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {img.caption && (
                      <figcaption className="p-3 text-xs text-gray-600 border-t border-gray-100 bg-gray-50">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* ── Author Bio Box ── */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={urlFor(post.author.image) || "/assets/team/Nikhil/Nikhil-480.jpeg"}
              alt={post.author.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#B08D57]/40 shrink-0 shadow-xs"
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6226] block mb-1">
                Written by Architect
              </span>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1.5">
                {post.author.name}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {post.author.bio || `${post.author.role} at Younick Design Studio, specializing in turnkey civil construction, luxury residential architecture, and climate-responsive interior engineering across Jaipur, Sikar, and Rajasthan.`}
              </p>
              <Link
                href="/team"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#8C6226] hover:text-[#0B1220] transition-colors"
              >
                Meet the Full Architectural Team <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* ── Sticky WhatsApp Consultation CTA ── */}
          <div className="mt-12 rounded-2xl border border-[#B08D57]/30 bg-gradient-to-r from-[#FAF8F5] via-white to-[#F5EFE6] p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-1">
                Planning a Project in Jaipur?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Get an architect-calculated BOQ estimate and material guidance for your site.
              </p>
            </div>
            <a
              href={`https://wa.me/918854883058?text=Hello%20Younick%20Studio%2C%20I%20read%20your%20guide%20on%20${encodeURIComponent(post.title)}%20and%20would%20like%20to%20schedule%20a%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-5 py-3 rounded-xl bg-gradient-to-r from-[#B08D57] to-[#8C6226] hover:from-[#9C7945] hover:to-[#79541F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#B08D57]/20 flex items-center gap-2"
            >
              <MessageCircle size={15} />
              <span>Discuss With Architect</span>
            </a>
          </div>
        </div>

        {/* ── Related Guides Carousel ── */}
        {relatedPosts.length > 0 && (
          <aside className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-gray-200" aria-label="Related Architectural Guides">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                Related Blog Guides
              </h2>
              <Link
                href="/blog"
                className="text-xs font-semibold text-[#8C6226] hover:text-[#0B1220] transition-colors flex items-center gap-1"
              >
                View All Guides <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200/80 bg-white hover:border-[#B08D57]/40 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                        <span className="text-[#8C6226] font-semibold">{rel.category}</span>
                        <span>•</span>
                        <span>{rel.readingTime}</span>
                      </div>
                      <h3 className="text-sm font-serif font-bold text-gray-900 group-hover:text-[#8C6226] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h3>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-[11px] font-semibold text-[#8C6226]">
                      Read Guide <ArrowRight size={11} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </>
  );
};

export default BlogPostPage;
