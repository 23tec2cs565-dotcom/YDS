import type { Metadata } from "next";
import Home from "@/views/Home";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.home.title,
  description: pageSEO.home.description,
  keywords: pageSEO.home.keywords?.split(", "),
  alternates: {
    canonical: pageSEO.home.url,
  },
  openGraph: {
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    url: pageSEO.home.url,
    images: [{ url: pageSEO.home.image || "https://studioyounick.vercel.app/assets/og/hero-1200.webp" }],
  },
};

export default function Page() {
  return <Home />;
}
