import type { Metadata } from "next";
import About from "@/views/About";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.about.title,
  description: pageSEO.about.description,
  keywords: pageSEO.about.keywords?.split(", "),
  alternates: {
    canonical: pageSEO.about.url,
  },
  openGraph: {
    title: pageSEO.about.title,
    description: pageSEO.about.description,
    url: pageSEO.about.url,
    images: [{ url: pageSEO.about.image || "https://studioyounick.vercel.app/younick-about-hero.webp" }],
  },
};

export default function AboutPage() {
  return <About />;
}
