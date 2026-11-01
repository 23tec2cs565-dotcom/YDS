import type { Metadata } from "next";
import ContactUs from "@/views/ContactUs";
import { pageSEO } from "@/utils/seo";

export const metadata: Metadata = {
  title: pageSEO.contact.title,
  description: pageSEO.contact.description,
  alternates: {
    canonical: pageSEO.contact.url,
  },
  openGraph: {
    title: pageSEO.contact.title,
    description: pageSEO.contact.description,
    url: pageSEO.contact.url,
    images: [{ url: pageSEO.contact.image || "https://studioyounick.vercel.app/younick-logo.webp" }],
  },
};

export default function ContactPage() {
  return <ContactUs />;
}
