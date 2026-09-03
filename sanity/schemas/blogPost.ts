// sanity/schemas/blogPost.ts

export const blogPostSchema = {
  name: "blogPost",
  title: "Knowledge Center & Blog",
  type: "document",
  groups: [
    { name: "main", title: "📌 Overview" },
    { name: "content", title: "✍️ Article Body" },
    { name: "seo", title: "🔍 Google SEO & Ranking" },
  ],
  fields: [
    {
      name: "title",
      title: "Article Title",
      type: "string",
      group: "main",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL identifier)",
      type: "slug",
      group: "main",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle / Tagline",
      type: "string",
      group: "main",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "Cost & Budgeting", value: "Cost & Budgeting" },
          { title: "Materials & Climate", value: "Materials & Climate" },
          { title: "Vastu & Planning", value: "Vastu & Planning" },
          { title: "Turnkey Construction", value: "Turnkey Construction" },
          { title: "3D Visualization", value: "3D Visualization" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Short Excerpt (Summary for Cards)",
      type: "text",
      rows: 3,
      group: "main",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "main",
      options: {
        hotspot: true,
      },
    },
    {
      name: "readingTime",
      title: "Reading Time (e.g. 8 min read)",
      type: "string",
      group: "main",
      initialValue: "7 min read",
    },
    {
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      group: "main",
      initialValue: false,
    },
    {
      name: "publishedAt",
      title: "Publication Date",
      type: "date",
      group: "main",
      initialValue: () => new Date().toISOString().split("T")[0],
    },
    {
      name: "tags",
      title: "Topic Tags",
      type: "array",
      group: "main",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "content",
      title: "Article Content (Rich Text / HTML)",
      type: "text",
      rows: 15,
      group: "content",
      description: "Full text of the guide. Supports HTML headings, tables, lists, and paragraphs.",
    },
    {
      name: "faqs",
      title: "Frequently Asked Questions (Google Rich Snippets)",
      type: "array",
      group: "seo",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text", rows: 3 },
          ],
        },
      ],
    },
    {
      name: "seoTitle",
      title: "Google Meta Title (Max 60 chars)",
      type: "string",
      group: "seo",
    },
    {
      name: "seoDescription",
      title: "Google Meta Description (150-160 chars)",
      type: "text",
      rows: 3,
      group: "seo",
    },
    {
      name: "seoKeywords",
      title: "Target SEO Keywords (comma separated)",
      type: "string",
      group: "seo",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
};
