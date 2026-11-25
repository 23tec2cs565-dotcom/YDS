import React, { useMemo } from "react";
import { SEOData, structuredData } from "../utils/seo";

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

const SEOHead: React.FC<SEOHeadProps> = React.memo(({ schema }) => {
  const jsonLd = useMemo(() => {
    const schemaData =
      schema && Object.keys(schema).length > 0
        ? schema
        : structuredData.organization;
    return JSON.stringify(schemaData);
  }, [schema]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
});

export default SEOHead;
