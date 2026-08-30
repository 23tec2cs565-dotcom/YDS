export const projectSchema = {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Architecture", value: "Architecture" },
          { title: "Interior Design", value: "Interior Design" },
          { title: "Construction", value: "Construction" },
          { title: "Renovation", value: "Renovation" },
          { title: "3D Visualization", value: "3D Visualization" },
          { title: "Consultation", value: "Consultation" }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Jaipur, Rajasthan"
    },
    {
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false
    },
    {
      name: "image",
      title: "Main Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "images",
      title: "Photo Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    },
    {
      name: "videos",
      title: "Video URLs or paths",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "subtitle",
      title: "Subtitle / Tagline",
      type: "string"
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3
    },
    {
      name: "longDescription",
      title: "Detailed Architectural Scope & Story",
      type: "text",
      rows: 5
    },
    {
      name: "outcome",
      title: "Project Outcome / Result",
      type: "text",
      rows: 2
    },
    {
      name: "workScope",
      title: "Work Scope Checklist",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "area",
      title: "Built-up Area (e.g. 4,500 sq ft)",
      type: "string"
    },
    {
      name: "budget",
      title: "Budget / Execution Tier",
      type: "string"
    },
    {
      name: "completionDate",
      title: "Completion Date",
      type: "string"
    },
    {
      name: "clientContact",
      title: "Client / Landmark Reference",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image"
    }
  }
};
