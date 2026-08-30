export const serviceSchema = {
  name: "service",
  title: "Services",
  type: "document",
  groups: [
    { name: "main", title: "📌 Overview" },
    { name: "seo", title: "🔍 Google SEO" },
  ],
  fields: [
    {
      name: "title",
      title: "Service Title",
      type: "string",
      group: "main",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "main",
      options: { source: "title" },
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      group: "main",
      rows: 3,
    },
    {
      name: "icon",
      title: "Icon Name (e.g. Home, Building, Wrench, Sparkles)",
      type: "string",
      group: "main",
      initialValue: "Home",
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      group: "main",
      options: { hotspot: true },
    },
    {
      name: "video",
      title: "Video URL / Path",
      type: "string",
      group: "main",
    },
    {
      name: "features",
      title: "Key Service Deliverables / Features",
      type: "array",
      group: "main",
      of: [{ type: "string" }],
    },
    {
      name: "timeline",
      title: "Standard Timeline (e.g. 4 - 8 Weeks)",
      type: "string",
      group: "main",
    },

    /* --- SEO Group --- */
    {
      name: "seoTitle",
      title: "Google Search Title",
      type: "string",
      group: "seo",
      description: "E.g. Turnkey Construction & Architecture in Jaipur | Younick",
    },
    {
      name: "seoDescription",
      title: "Google Search Description",
      type: "text",
      group: "seo",
      rows: 3,
    },
    {
      name: "seoKeywords",
      title: "Target Search Keywords",
      type: "array",
      group: "seo",
      of: [{ type: "string" }],
    },
  ],
};
