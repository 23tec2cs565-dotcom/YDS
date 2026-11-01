import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/views/ProjectDetail";
import { projects } from "@/data/projects";
import { getProjectSeoTitle } from "@/utils/seo";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug || p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(
    (p) => (p.slug || p.id) === slug || p.id === slug
  );

  if (!project) {
    return {
      title: "Project Not Found | Younick Studio",
    };
  }

  const title = getProjectSeoTitle(
    project.slug || project.id,
    project.title,
    project.category
  );
  const description =
    project.description ||
    project.longDescription ||
    `Explore ${project.title} by Younick Design Studio in ${project.location || "Jaipur"}.`;
  const url = `https://studioyounick.vercel.app/projects/${project.slug || project.id}`;
  const image = project.image || "https://studioyounick.vercel.app/assets/og/hero-1200.webp";

  return {
    title,
    description,
    keywords: project.tech || [project.category, "interior design jaipur", "architecture jaipur"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find(
    (p) => (p.slug || p.id) === slug || p.id === slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetail />;
}
