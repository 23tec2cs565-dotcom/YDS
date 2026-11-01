import type { Metadata } from "next";
import Services from "@/views/Services";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.services.title,
  description: pageSEO.services.description,
  keywords: pageSEO.services.keywords?.split(", "),
  alternates: {
    canonical: pageSEO.services.url,
  },
  openGraph: {
    title: pageSEO.services.title,
    description: pageSEO.services.description,
    url: pageSEO.services.url,
    images: [{ url: pageSEO.services.image || "https://studioyounick.vercel.app/younick-logo.webp" }],
  },
};

export default function ServicesPage() {
  return <Services />;
}
