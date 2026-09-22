import React from "react";
import { Helmet } from "react-helmet-async";
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

const SEOHead: React.FC<SEOHeadProps> = ({
  seo,
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType,
  type = "website",
  schema,
  noIndex = false,
}) => {
  const rawDescription = description || seo?.description || defaultSEO.description;
  const cleanDescription =
    rawDescription && rawDescription.length > 155
      ? rawDescription.slice(0, 152).trim() + "..."
      : rawDescription;
  const resolvedType = ogType || type || "website";

  // Resolve absolute canonical URL reliably
  let rawUrl = canonicalUrl || seo?.url;
  if (!rawUrl && typeof window !== "undefined") {
    rawUrl = window.location.pathname;
  }
  const url = rawUrl?.startsWith("http")
    ? rawUrl
    : `https://studioyounick.vercel.app${rawUrl && !rawUrl.startsWith("/") ? `/${rawUrl}` : rawUrl || ""}`;

  const meta: SEOData = {
    ...defaultSEO,
    ...seo,
    title: title || seo?.title || defaultSEO.title,
    description: cleanDescription,
    keywords: keywords || seo?.keywords || defaultSEO.keywords,
    image: ogImage || seo?.image || defaultSEO.image,
    url,
  };

  const schemaData =
    schema && Object.keys(schema).length > 0
      ? schema
      : structuredData.organization;

  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{meta.title}</title>

      {/* Primary Meta */}
      <meta name="description" content={cleanDescription} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      <meta name="author" content="Younick Design Studio" />
      <meta name="theme-color" content="#0D0D0D" />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow, noarchive" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"}
      />
      {noIndex && <meta name="googlebot" content="noindex, nofollow, noarchive" />}
      {noIndex && <meta name="prerender-status-code" content="404" />}

      {/* Open Graph */}
      <meta property="og:type" content={resolvedType} />
      <meta property="og:site_name" content="Younick Design Studio" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={cleanDescription} />
      {meta.image && (
        <>
          <meta property="og:image" content={meta.image} />
          <meta property="og:image:alt" content={meta.title} />
        </>
      )}
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_IN" />
      {meta.datePublished && (
        <meta
          property="article:published_time"
          content={meta.datePublished}
        />
      )}
      {meta.dateModified && (
        <meta
          property="article:modified_time"
          content={meta.dateModified}
        />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.image && <meta name="twitter:image" content={meta.image} />}
      <meta name="twitter:creator" content="@younickstudio" />
      <meta name="twitter:site" content="@younickstudio" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEOHead;
