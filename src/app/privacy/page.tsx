import type { Metadata } from "next";
import PrivacyPolicy from "@/views/PrivacyPolicy";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.privacy.title,
  description: pageSEO.privacy.description,
  keywords: pageSEO.privacy.keywords?.split(", "),
  alternates: {
    canonical: pageSEO.privacy.url,
  },
  openGraph: {
    title: pageSEO.privacy.title,
    description: pageSEO.privacy.description,
    url: pageSEO.privacy.url,
    images: [{ url: pageSEO.privacy.image || "https://studioyounick.vercel.app/younick-logo.webp" }],
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
