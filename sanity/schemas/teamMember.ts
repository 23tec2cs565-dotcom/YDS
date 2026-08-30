export const teamMemberSchema = {
  name: "teamMember",
  title: "Team Members",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" }
    },
    {
      name: "role",
      title: "Designation / Role",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "image",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "isFounder",
      title: "Is Studio Founder",
      type: "boolean",
      initialValue: false
    },
    {
      name: "badge",
      title: "Badge (e.g. Founder, Lead 3D Visualizer)",
      type: "string"
    },
    {
      name: "description",
      title: "Bio / Experience",
      type: "text",
      rows: 4
    },
    {
      name: "expertise",
      title: "Key Expertise Tags",
      type: "array",
      of: [{ type: "string" }]
    }
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image"
    }
  }
};
