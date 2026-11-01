import type { Metadata } from "next";
import NotFound from "@/views/NotFound";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Younick Design Studio",
  description: "The architectural blueprint or page you are looking for does not exist. Explore our luxury interior portfolio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
