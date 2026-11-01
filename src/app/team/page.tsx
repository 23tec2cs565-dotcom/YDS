import type { Metadata } from "next";
import OurTeam from "@/views/OurTeam";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.team.title,
  description: pageSEO.team.description,
  alternates: {
    canonical: pageSEO.team.url,
  },
  openGraph: {
    title: pageSEO.team.title,
    description: pageSEO.team.description,
    url: pageSEO.team.url,
    images: [{ url: pageSEO.team.image || "https://studioyounick.vercel.app/younick-logo.webp" }],
  },
};

export default function TeamPage() {
  return <OurTeam />;
}
