export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  image768?: string;
  image480?: string;
  description: string;
  expertise: string[];
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  social?: {
    linkedin?: string;
    instagram?: string;
  };
  isFounder: boolean;
  badge?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "founder",
    name: "Nikhil Sain",
    role: "Founder & Lead Designer",
    image: "/assets/team/Nikhil/Nikhil-1024.jpeg?v=2",
    image768: "/assets/team/Nikhil/Nikhil-1024.jpeg?v=2",
    image480: "/assets/team/Nikhil/Nikhil-1024.jpeg?v=2",
    description:
      "Nikhil Sain is an experienced and dynamic interior designer who pursued his Master's at Arch College of Interior and Business in 2017. His philosophy centers on incorporating the client's needs into the design with a creative flair. He focuses on finishes, furnishings, materials and practical solutions that last.",
    expertise: [
      "Interior Design",
      "Space Planning",
      "3D Visualization",
      "Project Management",
      "Design Strategy",
    ],
    contact: {
      email: "nick885488@gmail.com",
      phone: "+91 8854883058",
      whatsapp: "+91 8854883058",
    },
    social: {
      linkedin: "https://www.linkedin.com/in/nikhil-sain-300351156",
      instagram: "https://www.instagram.com/studio.younick",
    },
    isFounder: true,
  },

  {
    id: "co-founder",
    name: "Kamal Rajoriya",
    role: "Co-Founder",
    image: "/assets/team/Kamal/Kamal-1024.jpg",
    image768: "/assets/team/Kamal/Kamal-768.jpg",
    image480: "/assets/team/Kamal/Kamal-480.jpg",
    description:
      "Kamal Kumawat is an expert civil engineer who graduated from the University of Engineering and Management, Jaipur. His client-centric approach and technical knowledge ensure projects are built to high standards with efficient execution.",
    expertise: [
      "Construction Management",
      "3D Visualization",
      "Technical Planning",
      "Quality Assurance",
    ],
    contact: {
      email: "kamal@younickdesign.com",
      phone: "+91 9166776697",
      whatsapp: "+91 9166776697",
    },
    social: {
      instagram: "https://www.instagram.com/studio.younick",
    },
    isFounder: true,
  },

  {
    id: "pooja-sain",
    name: "Pooja Sain",
    role: "Interior Designer",
    image: "/assets/team/Pooja/Pooja-1024.png?v=2",
    image768: "/assets/team/Pooja/Pooja-1024.png?v=2",
    image480: "/assets/team/Pooja/Pooja-1024.png?v=2",
    description:
      "Pooja leads design thinking and operations, bringing sustainable architecture and refined detailing to every project.",
    expertise: [
      "Aesthetic Concepts",
      "Architecture Drawings",
      "Material Exploration",
      "3D Visualization",
      "Design Detailing",
    ],
    contact: {},
    social: {
    instagram: "https://www.instagram.com/inter._space10",
    },
    isFounder: true,
    badge: "3D Visualizer",
  },

  {
    id: "nikhil-verma",
    name: "Nikhil Verma",
    role: "Interior Designer",
    image: "/assets/team/Nikhil-Verma/Nikhil-Verma.jpeg",
    image768: "/assets/team/Nikhil-Verma/Nikhil-Verma.jpeg",
    image480: "/assets/team/Nikhil-Verma/Nikhil-Verma.jpeg",
    description:
      "Nikhil Verma is a Jaipur-based Interior Designer with a creative mind and a passion for transforming spaces. He is continuously learning and exploring new design ideas, focusing on creating interiors that are functional, aesthetic, and unique.",
    expertise: [
      "Interior Design",
      "Space Planning",
      "Aesthetic Concepts",
      "Functional Design",
    ],
    contact: {
      email: "nikhilverma@younickdesign.com",
      phone: "+91 9057009494",
      whatsapp: "+91 9057009494",
    },
    social: {},
    isFounder: false,
    badge: "Member",
  },

  {
    id: "keshav-sain",
    name: "Keshav Sain",
    role: "Technical Assistant",
    image: "/assets/team/Keshav/Keshav-768.jpeg?v=2",
    image768: "/assets/team/Keshav/Keshav-768.jpeg?v=2",
    image480: "/assets/team/Keshav/Keshav-480.jpeg?v=2",
    description:
      "Keshav supports design thinking and operations, ensuring technical excellence in every project.",
    expertise: [
      "Technical Support",
      "Design Implementation",
    ],
    contact: {
      email: "keshavsain.jpr@gmail.com",
      phone: "+91 9887159297",
      whatsapp: "+91 9887159297",
    },
    social: {
      linkedin: "https://www.linkedin.com/in/keshav-sain-1a6ba942a",
      instagram: "https://www.instagram.com/keshavsain34",
    },
    isFounder: false,
    badge: "Member",
  },
  {
    id: "rahul-kumawat",
    name: "Rahul Kumawat",
    role: "Member",
    image: "/assets/team/Rahul/Rahul-768.jpeg?v=2",
    image768: "/assets/team/Rahul/Rahul-768.jpeg?v=2",
    image480: "/assets/team/Rahul/Rahul-480.jpeg?v=2",
    description:
      "Rahul supports design thinking and operations, ensuring technical excellence in every project.",
    expertise: [
      "Interior Design",
      "Space Planning",
      "Aesthetic Concepts",
      "Functional Design",
    ],
    contact: {
      email: "rahulkumawat@gmail.com",
      phone: "+91 9876543210",
      whatsapp: "+91 9876543210",
    },
    social: {
    },
    isFounder: false,
    badge: "Member",
  },

];