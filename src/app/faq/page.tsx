import type { Metadata } from "next";
import FAQ from "@/views/FAQ";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.faq.title,
  description: pageSEO.faq.description,
  keywords: pageSEO.faq.keywords?.split(", "),
  alternates: {
    canonical: pageSEO.faq.url,
  },
  openGraph: {
    title: pageSEO.faq.title,
    description: pageSEO.faq.description,
    url: pageSEO.faq.url,
    images: [{ url: pageSEO.faq.image || "https://studioyounick.vercel.app/younick-logo.webp" }],
  },
};

export default function FAQPage() {
  return <FAQ />;
}
