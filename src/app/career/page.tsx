import type { Metadata } from "next";
import Career from "@/views/Career";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.career.title,
  description: pageSEO.career.description,
  keywords: pageSEO.career.keywords?.split(", "),
  alternates: {
    canonical: pageSEO.career.url,
  },
  openGraph: {
    title: pageSEO.career.title,
    description: pageSEO.career.description,
    url: pageSEO.career.url,
    images: [{ url: pageSEO.career.image || "https://studioyounick.vercel.app/younick-about-hero.webp" }],
  },
};

export default function CareerPage() {
  return <Career />;
}
