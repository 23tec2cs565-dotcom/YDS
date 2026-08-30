export const testimonialSchema = {
  name: "testimonial",
  title: "Client Testimonials",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "role",
      title: "Role / Project Type (e.g. Villa Owner, Commercial Client)",
      type: "string",
      initialValue: "Client"
    },
    {
      name: "quote",
      title: "Review / Quote",
      type: "text",
      rows: 4,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "rating",
      title: "Star Rating (1 - 5)",
      type: "number",
      initialValue: 5,
      validation: (Rule: any) => Rule.min(1).max(5)
    },
    {
      name: "avatar",
      title: "Client Avatar Image",
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Jaipur"
    }
  ]
};
