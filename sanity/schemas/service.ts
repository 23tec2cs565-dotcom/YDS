export const serviceSchema = {
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" }
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3
    },
    {
      name: "icon",
      title: "Icon Name (e.g. Home, Building, Wrench, Sparkles)",
      type: "string",
      initialValue: "Home"
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "video",
      title: "Video URL / Path",
      type: "string"
    },
    {
      name: "features",
      title: "Key Service Deliverables / Features",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "timeline",
      title: "Standard Timeline (e.g. 4 - 8 Weeks)",
      type: "string"
    }
  ]
};
