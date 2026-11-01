import type { Metadata } from "next";
import TermsOfService from "@/views/TermsOfService";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.terms.title,
  description: pageSEO.terms.description,
  keywords: pageSEO.terms.keywords?.split(", "),
  alternates: {
    canonical: pageSEO.terms.url,
  },
  openGraph: {
    title: pageSEO.terms.title,
    description: pageSEO.terms.description,
    url: pageSEO.terms.url,
    images: [{ url: pageSEO.terms.image || "https://studioyounick.vercel.app/younick-logo.webp" }],
  },
};

export default function TermsPage() {
  return <TermsOfService />;
}
