import React from "react";
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
  schema,
}) => {
  const schemaData =
    schema && Object.keys(schema).length > 0
      ? schema
      : structuredData.organization;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SEOHead;
