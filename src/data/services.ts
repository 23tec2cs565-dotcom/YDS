// src/data/services.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name (e.g. "Home", "Building", "Wrench")
  image: string;
  video?: string;
  features: string[];
  keywords?: string[];
  timeline?: string;
}

export const services: Service[] = [
  {
    id: "interior-design",
    title: "Luxury Interior Design & Styling",
    description:
      "Transform your villa or home with bespoke luxury interior design in Jaipur. Smart spatial layouts, Italian marble finishes, and modular kitchens.",
    icon: "Home",
    image: "/assets/services/interior-design3.jpg",
    video: "/assets/services/interior-design.mp4",
    features: [
      "Spatial Architecture & Layouts",
      "Bespoke Woodwork & Modular Kitchens",
      "Architectural Lighting & Ambiance",
      "Luxury Material & Italian Marble Curation",
      "Color Psychology & Styling",
    ],
    keywords: [
      "interior designers in jaipur",
      "luxury villa interior design jaipur",
      "modular kitchen jaipur",
      "living room interiors rajasthan",
      "bespoke woodwork jaipur",
    ],
    timeline: "4 - 8 Weeks",
  },
  {
    id: "construction",
    title: "Turnkey Construction & Civil Works",
    description:
      "End-to-end turnkey construction and civil contracting in Jaipur. Structural execution, foundation-to-finish precision, and premium material quality.",
    icon: "Building",
    image: "/assets/services/construction.avif",
    features: [
      "Turnkey Project Management",
      "Structural & RCC Execution",
      "Certified Material Procurement",
      "Strict Quality Assurance",
      "On-Site Architectural Supervision",
    ],
    keywords: [
      "turnkey construction jaipur",
      "building contractors jaipur",
      "civil work rajasthan",
      "architectural build jaipur",
    ],
    timeline: "4 - 8 Months",
  },
  {
    id: "renovation",
    title: "Architectural Renovation & Remodeling",
    description:
      "Premium home, villa, and commercial renovation services in Jaipur. Structural remodeling, contemporary interior revamps, and turnkey execution.",
    icon: "Wrench",
    image: "/assets/services/renovation.avif",
    features: [
      "Full Home Remodeling & Refurbishment",
      "Structural Space Alterations",
      "Modern Interior & Electrical Upgrades",
      "Acoustic & Energy Efficiency",
      "Transparent Budget Optimization",
    ],
    keywords: [
      "home renovation jaipur",
      "villa remodeling rajasthan",
      "commercial interior renovation",
      "turnkey restoration jaipur",
    ],
    timeline: "3 - 6 Weeks",
  },
  {
    id: "consultation",
    title: "Architectural & Interior Consultation",
    description:
      "Expert architectural and spatial design consultation in Jaipur. Feasibility analysis, 2D floor plans, material guidance, and cost budgeting.",
    icon: "MessageCircle",
    image: "/assets/services/consultation.avif",
    features: [
      "Spatial Concept & 2D Layouts",
      "Accurate Budget & BOQ Planning",
      "Material & Finish Advisory",
      "Vastu-Aligned Architectural Guidance",
      "Timeline & Contractor Strategy",
    ],
    keywords: [
      "interior design consultation jaipur",
      "architect consultation rajasthan",
      "spatial planning jaipur",
      "interior cost estimate jaipur",
    ],
    timeline: "3 - 7 Days",
  },
  {
    id: "3d-visualization",
    title: "3D Architectural Visualization & Walkthroughs",
    description:
      "Photorealistic 3D interior renders, 3D exterior elevations, and immersive architectural video walkthroughs in Jaipur and Rajasthan.",
    icon: "Eye",
    image: "/assets/services/3d-visualization.jpg",
    features: [
      "High-Fidelity 3D Modeling",
      "Photorealistic Interior & Exterior Rendering",
      "3D Architectural Walkthrough Videos",
      "Real-World Material & Texture Mapping",
      "Day & Night Architectural Lighting Simulation",
    ],
    keywords: [
      "3d architectural rendering jaipur",
      "3d elevation design rajasthan",
      "interior 3d walkthrough jaipur",
      "cgi architectural rendering",
    ],
    timeline: "5 - 10 Days",
  },
];
