import React, { useEffect, useMemo } from "react";
import { SEOData, defaultSEO, structuredData } from "../utils/seo";

interface SEOHeadProps {
  seo?: Partial<SEOData>;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  type?: "website" | "article";
  schema?: object;
  noIndex?: boolean;
}

function upsertMeta(attrName: "name" | "property", attrValue: string, content: string): void {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string): void {
  if (!href) return;
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

const SEOHead: React.FC<SEOHeadProps> = React.memo(({
  seo,
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType,
  type,
  schema,
  noIndex = false,
}) => {
  const resolved = useMemo(() => {
    const resolvedTitle = title || seo?.title || defaultSEO.title;
    const resolvedDescription = description || seo?.description || defaultSEO.description;
    const resolvedKeywords = keywords || seo?.keywords || defaultSEO.keywords || "";
    const resolvedUrl =
      canonicalUrl ||
      seo?.url ||
      (typeof window !== "undefined" ? window.location.href : defaultSEO.url || "https://studioyounick.vercel.app/");
    const resolvedImage = ogImage || seo?.image || defaultSEO.image || "";
    const resolvedType = ogType || type || "website";
    const resolvedRobots = noIndex ? "noindex, nofollow" : "index, follow";

    return {
      title: resolvedTitle,
      description: resolvedDescription,
      keywords: resolvedKeywords,
      url: resolvedUrl,
      image: resolvedImage,
      type: resolvedType,
      robots: resolvedRobots,
    };
  }, [seo, title, description, keywords, canonicalUrl, ogImage, ogType, type, noIndex]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.title = resolved.title;
    upsertMeta("name", "description", resolved.description);
    if (resolved.keywords) {
      upsertMeta("name", "keywords", resolved.keywords);
    }
    upsertMeta("name", "robots", resolved.robots);
    upsertCanonical(resolved.url);

    // OpenGraph
    upsertMeta("property", "og:title", resolved.title);
    upsertMeta("property", "og:description", resolved.description);
    upsertMeta("property", "og:type", resolved.type);
    upsertMeta("property", "og:url", resolved.url);
    if (resolved.image) {
      upsertMeta("property", "og:image", resolved.image);
    }

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", resolved.title);
    upsertMeta("name", "twitter:description", resolved.description);
    if (resolved.image) {
      upsertMeta("name", "twitter:image", resolved.image);
    }
  }, [resolved]);

  const jsonLd = useMemo(() => {
    if (schema && Object.keys(schema).length > 0) {
      return JSON.stringify(schema);
    }
    const isHome =
      resolved.url === "https://studioyounick.vercel.app/" ||
      resolved.url === "https://studioyounick.vercel.app";
    if (isHome) {
      return JSON.stringify(structuredData.organization);
    }
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": resolved.type === "article" ? "Article" : "WebPage",
      name: resolved.title,
      description: resolved.description,
      url: resolved.url,
      ...(resolved.image ? { image: resolved.image } : {}),
      isPartOf: {
        "@type": "WebSite",
        name: "Younick Design Studio",
        url: "https://studioyounick.vercel.app",
      },
    });
  }, [schema, resolved]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
});

export default SEOHead;
