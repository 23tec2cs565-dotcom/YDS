import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/views/BlogPost";
import { blogs } from "@/data/blogs";

export function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.slug || b.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase()
  );

  if (!post) {
    return {
      title: "Article Not Found | Younick Studio",
    };
  }

  const title = post.seoTitle || `${post.title} | Younick Studio Jaipur`;
  const description = post.seoDescription || post.excerpt;
  const url = `https://studioyounick.vercel.app/blog/${post.slug}`;
  const image = post.coverImage.startsWith("http")
    ? post.coverImage
    : `https://studioyounick.vercel.app${post.coverImage}`;

  return {
    title,
    description,
    keywords: post.seoKeywords ? post.seoKeywords.split(", ") : post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: `${post.publishedAt}T09:00:00+05:30`,
      authors: [post.author.name],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
