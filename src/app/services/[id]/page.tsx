import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetails from "@/views/ServiceDetails";
import { services } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({
    id: s.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Service Not Found | Younick Studio",
    };
  }

  const title = service.seoTitle || `${service.title} in Jaipur | Younick Studio`;
  const description = service.description;
  const url = `https://studioyounick.vercel.app/services/${service.id}`;

  return {
    title,
    description,
    keywords: service.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: service.image || "https://studioyounick.vercel.app/younick-logo.webp",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return <ServiceDetails />;
}
