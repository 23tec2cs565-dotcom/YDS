import type { Metadata } from "next";
import Blog from "@/views/Blog";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.blog.title,
  description: pageSEO.blog.description,
  keywords: pageSEO.blog.keywords?.split(", "),
  alternates: {
    canonical: pageSEO.blog.url,
  },
  openGraph: {
    title: pageSEO.blog.title,
    description: pageSEO.blog.description,
    url: pageSEO.blog.url,
    images: [{ url: pageSEO.blog.image || "https://studioyounick.vercel.app/younick-og-image.jpg" }],
  },
};

export default function BlogHubPage() {
  return <Blog />;
}
