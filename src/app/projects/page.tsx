import type { Metadata } from "next";
import { Suspense } from "react";
import Projects from "@/views/Projects";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.projects.title,
  description: pageSEO.projects.description,
  alternates: {
    canonical: pageSEO.projects.url,
  },
  openGraph: {
    title: pageSEO.projects.title,
    description: pageSEO.projects.description,
    url: pageSEO.projects.url,
    images: [{ url: pageSEO.projects.image || "https://studioyounick.vercel.app/younick-logo.webp" }],
  },
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <Projects />
    </Suspense>
  );
}
