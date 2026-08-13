export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  image: string;
  images: string[];
  description: string;
  longDescription?: string;
  outcome?: string;
  workScope?: string[];
  clientContact?: string;
  completionDate?: string;
  area?: string;
  budget?: string;
  featured: boolean;
  focalPoint?: { x: number; y: number };
  subtitle?: string;
  link?: string;
  tech?: string[];
}

export const projects: Project[] = [
  {
    id: "pcp-sikar",
    slug: "pcp-sikar",
    title: "PCP Sikar",
    category: "Interior Design",
    location: "Sikar",
    image: "/assets/optimized/Projects/PCP Sikar/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/PCP Sikar/1/1-1024.jpg",
      "/assets/optimized/Projects/PCP Sikar/2/2-1024.jpg",
      "/assets/optimized/Projects/PCP Sikar/3/3-1024.jpg",
      "/assets/optimized/Projects/PCP Sikar/4/4-1024.jpg",
      "/assets/optimized/Projects/PCP Sikar/5/5-1024.jpg"
    ],
    subtitle: "Luxury Contemporary Living",
    description:
      "Complete interior transformation of a luxury villa with modern contemporary design elements.",
    longDescription:
      "This luxury villa project redefined elegance with open spaces, natural light, and custom furniture. Our focus was on blending sophistication with comfort for a timeless living experience.",
    outcome: "Delivered a warm, high-end living experience with improved light flow and custom detailing.",
    workScope: [
      "Full Interior Design",
      "Furniture Selection",
      "Lighting Design",
      "Color Consultation"
    ],
    clientContact: "Available upon request",
    completionDate: "December 2023",
    area: "4,500 sq ft",
    featured: true,
    focalPoint: { x: 0.5, y: 0.45 }
  },
  {
    id: "bright-school",
    slug: "bright-school",
    title: "Bright School",
    category: "Construction",
    location: "Govindgarh",
    image: "/assets/optimized/Projects/BRIGHT SCHOOL/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/BRIGHT SCHOOL/1/1-1024.jpg",
      "/assets/optimized/Projects/BRIGHT SCHOOL/2/2-1024.jpg",
      "/assets/optimized/Projects/BRIGHT SCHOOL/3/3-1024.jpg",
      "/assets/optimized/Projects/BRIGHT SCHOOL/4/4-1024.jpg",
      "/assets/optimized/Projects/BRIGHT SCHOOL/5/5-1024.jpg"
    ],
    subtitle: "Future-Ready Education Spaces",
    description:
      "Modern school construction with functional classrooms and play areas.",
    longDescription:
      "A contemporary educational facility designed for safety, flexibility, and natural light. Includes learning zones, labs and recreational areas tailored to children.",
    outcome: "Created a safer, brighter learning environment with flexible classrooms and shared spaces.",
    workScope: [
      "Space Planning",
      "Construction Management",
      "Interior Design",
      "MEP Coordination"
    ],
    clientContact: "Available upon request",
    completionDate: "October 2023",
    area: "2,800 sq ft",
    featured: true,
    focalPoint: { x: 0.5, y: 0.5 }
  },
  {
    id: "jk-lon",
    slug: "jk-lon",
    title: "JK LON Hospital",
    category: "Renovation",
    location: "Jaipur",
    image: "/assets/optimized/Projects/JK LON/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/JK LON/1/1-1024.jpg",
      "/assets/optimized/Projects/JK LON/2/2-1024.jpg",
      "/assets/optimized/Projects/JK LON/3/3-1024.jpg",
      "/assets/optimized/Projects/JK LON/4/4-1024.jpg",
      "/assets/optimized/Projects/JK LON/5/5-1024.jpg",
      "/assets/optimized/Projects/JK LON/6/6-1024.jpg",
      "/assets/optimized/Projects/JK LON/7/7-1024.jpg",
      "/assets/optimized/Projects/JK LON/8/8-1024.jpg",
      "/assets/optimized/Projects/JK LON/9/9-1024.jpg"
    ],
    subtitle: "Healthcare Reimagined",
    description:
      "Renovation and interior upgrades for JK LON Hospital with improved patient flow and functional spaces.",
    longDescription:
      "This hospital renovation focused on efficient circulation, clear wayfinding, and durable finishes. The updated layout improves patient experience while supporting clinical workflows.",
    outcome: "Improved patient flow and clarity of movement while upgrading durable interior finishes.",
    workScope: [
      "Renovation Planning",
      "Interior Design",
      "Kitchen Design",
      "Bathroom Renovation"
    ],
    clientContact: "Available upon request",
    completionDate: "August 2023",
    area: "1,200 sq ft",
    featured: true,
    focalPoint: { x: 0.5, y: 0.45 }
  },
  {
    id: "home-dharmendra",
    slug: "home-dharmendra",
    title: "Dharmendra Villa",
    category: "Interior Design",
    location: "Jagatpura, Jaipur",
    image: "/assets/optimized/Projects/Home-Dharmendra/1.jpeg",
    images: [
      "/assets/optimized/Projects/Home-Dharmendra/1.jpeg",
      "/assets/optimized/Projects/Home-Dharmendra/video-1.mp4",
      "/assets/optimized/Projects/Home-Dharmendra/video-2.mp4",
      "/assets/optimized/Projects/Home-Dharmendra/1/1-1024.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/2/2-1024.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/3/3-1024.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/4/4-1024.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/5/5-1024.jpg"
    ],
    subtitle: "Design & Execution • Budget ₹45 Lakhs",
    description:
      "Residential interior design and execution project for Mr. Dharmendra Sharma in Jagatpura, Jaipur.",
    longDescription:
      "Comprehensive residential design and execution project for Mr. Dharmendra Sharma's villa in Jagatpura, Jaipur. Features complete living area interiors, custom furniture, false ceilings, and premium lighting with a ₹45 Lakh budget.",
    outcome: "Client approved the final execution with high satisfaction in material quality and spatial layout.",
    workScope: [
      "Design & Execution",
      "Residential Fit-Out",
      "Custom Furniture",
      "Lighting & Ceilings"
    ],
    clientContact: "Mr. Dharmendra Sharma",
    completionDate: "November 2023",
    area: "3,000 sq ft",
    budget: "₹45 Lakhs",
    featured: false
  },
  {
    id: "home-pradeep",
    slug: "home-pradeep",
    title: "Pradeep Villa",
    category: "Consultation",
    location: "Jagatpura",
    image: "/assets/optimized/Projects/Home-Pradeep/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/Home-Pradeep/1/1-1024.jpg",
      "/assets/optimized/Projects/Home-Pradeep/2/2-1024.jpg",
      "/assets/optimized/Projects/Home-Pradeep/3/3-1024.jpg",
      "/assets/optimized/Projects/Home-Pradeep/4/4-1024.jpg"
    ],
    subtitle: "Heritage Meets Modern",
    description:
      "Design consultation for a private villa blending modern comfort with local Rajasthani details.",
    longDescription:
      "This villa consultation explored cultural motifs, handcrafted textures, and contemporary planning to create a warm, upscale home with regional character.",
    outcome: "Aligned design direction early, reducing revisions and accelerating planning decisions.",
    workScope: [
      "Design Consultation",
      "Cultural Integration",
      "Space Planning",
      "Material Guidance"
    ],
    clientContact: "Available upon request",
    completionDate: "September 2023",
    area: "8,000 sq ft",
    featured: false
  },
  {
    id: "foyer",
    slug: "foyer",
    title: "Foyer",
    category: "Interior Design",
    location: "Tonk Phatak",
    image: "/assets/optimized/Projects/Foyer/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/Foyer/1/1-1024.jpg",
      "/assets/optimized/Projects/Foyer/2/2-1024.jpg",
      "/assets/optimized/Projects/Foyer/3/3-1024.jpg",
      "/assets/optimized/Projects/Foyer/4/4-1024.jpg",
      "/assets/optimized/Projects/Foyer/5/5-1024.jpg"
    ],
    subtitle: "Rustic Modern Charm",
    description:
      "Contemporary farmhouse design blending modern amenities with rustic charm.",
    longDescription:
      "This farmhouse project brought modern living to a rustic setting. Natural wood, large windows, and outdoor integration made this design both cozy and contemporary.",
    outcome: "Balanced rustic charm with modern comfort, strengthening indoor-outdoor connection.",
    workScope: [
      "Interior Design",
      "Furniture Design",
      "Landscape Integration",
      "Lighting Design"
    ],
    clientContact: "Available upon request",
    completionDate: "July 2023",
    area: "3,200 sq ft",
    featured: false
  },
  {
    id: "chhoti-bai-jewellers",
    slug: "chhoti-bai-jewellers",
    title: "Chhoti Bai Jewellers",
    category: "Construction",
    location: "City Center, Sansar Chandra Road, Jaipur",
    image: "/assets/optimized/Projects/Chhoti bai jewellers/1.jpeg",
    images: [
      "/assets/optimized/Projects/Chhoti bai jewellers/1.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/2.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/3.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/4.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/5.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/6.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/7.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/8.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/9.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/10.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/11.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/12.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/13.jpeg",
      "/assets/optimized/Projects/Chhoti bai jewellers/14.jpeg"
    ],
    subtitle: "Turnkey Project with Material • Budget ₹14 Lakhs",
    description:
      "Turnkey commercial jewellery showroom project with material execution in City Center, Sansar Chandra Road, Jaipur.",
    longDescription:
      "Complete turnkey commercial project with premium material execution for Chhoti Bai Jewellers at City Center, Sansar Chandra Road, Jaipur. Features bespoke display units, security integration, and luxury interior finishing within a ₹14 Lakh budget.",
    outcome: "Delivered a luxurious retail atmosphere with specialized accent lighting and security-integrated display units.",
    workScope: [
      "Turnkey Project with Material",
      "Retail Interior Design",
      "Display Vitrines",
      "Security Layout Planning"
    ],
    clientContact: "Chhoti Bai Jewellers",
    completionDate: "January 2024",
    area: "2,200 sq ft",
    budget: "₹14 Lakhs",
    featured: true,
    focalPoint: { x: 0.5, y: 0.45 }
  },
  {
    id: "detailing-devils",
    slug: "detailing-devils",
    title: "Detailing Devils",
    category: "Consultation",
    location: "Vaishali Nagar, Jaipur",
    image: "/assets/optimized/Projects/Detailing devils/1.jpeg",
    images: [
      "/assets/optimized/Projects/Detailing devils/1.jpeg",
      "/assets/optimized/Projects/Detailing devils/video-1.mp4",
      "/assets/optimized/Projects/Detailing devils/video-2.mp4",
      "/assets/optimized/Projects/Detailing devils/video-3.mp4",
      "/assets/optimized/Projects/Detailing devils/video-4.mp4",
      "/assets/optimized/Projects/Detailing devils/video-5.mp4",
      "/assets/optimized/Projects/Detailing devils/video-6.mp4",
      "/assets/optimized/Projects/Detailing devils/video-7.mp4",
      "/assets/optimized/Projects/Detailing devils/video-8.mp4",
      "/assets/optimized/Projects/Detailing devils/video-9.mp4",
      "/assets/optimized/Projects/Detailing devils/video-10.mp4",
      "/assets/optimized/Projects/Detailing devils/video-11.mp4",
      "/assets/optimized/Projects/Detailing devils/video-12.mp4",
      "/assets/optimized/Projects/Detailing devils/video-13.mp4",
      "/assets/optimized/Projects/Detailing devils/video-14.mp4"
    ],
    subtitle: "Design Consultancy",
    description:
      "Design consultancy project for Detailing Devils automotive studio in Vaishali Nagar, Jaipur for Mr. Sanjay Choudhary.",
    longDescription:
      "Commercial design consultancy for Mr. Sanjay Choudhary's Detailing Devils studio in Vaishali Nagar, Jaipur. Specialized layout planning for high-intensity detailing bays, client lounge, and industrial aesthetic.",
    outcome: "Built an immersive, high-visibility detailing bay that enhances operational efficiency.",
    workScope: [
      "Design Consultancy",
      "Commercial Layout",
      "Lighting Bay Design",
      "Industrial Aesthetics"
    ],
    clientContact: "Mr. Sanjay Choudhary",
    completionDate: "February 2024",
    area: "3,500 sq ft",
    featured: false
  },
  {
    id: "foyer-renovation",
    slug: "foyer-renovation",
    title: "Entrance Foyer Renovation",
    category: "Renovation",
    location: "New Light Colony, Tonk Road, Jaipur",
    image: "/assets/optimized/Projects/Foyer Renovation/1.jpeg",
    images: [
      "/assets/optimized/Projects/Foyer Renovation/1.jpeg",
      "/assets/optimized/Projects/Foyer Renovation/video-1.mp4",
      "/assets/optimized/Projects/Foyer Renovation/video-2.mp4",
      "/assets/optimized/Projects/Foyer Renovation/video-3.mp4",
      "/assets/optimized/Projects/Foyer Renovation/video-4.mp4",
      "/assets/optimized/Projects/Foyer Renovation/2.jpeg",
      "/assets/optimized/Projects/Foyer Renovation/3.jpeg",
      "/assets/optimized/Projects/Foyer Renovation/4.jpeg",
      "/assets/optimized/Projects/Foyer Renovation/5.jpeg",
      "/assets/optimized/Projects/Foyer Renovation/6.jpeg",
      "/assets/optimized/Projects/Foyer Renovation/7.jpeg"
    ],
    subtitle: "Foyer Renovation • Budget ₹15 Lakhs",
    description:
      "Entrance foyer renovation project for Mr. Arpit Agrawal in New Light Colony, Tonk Road, Jaipur.",
    longDescription:
      "High-end entrance foyer renovation for Mr. Arpit Agrawal at New Light Colony, Tonk Road, Jaipur. Features custom wall cladding, luxury foyer lighting, and premium carpentry detailing within a ₹15 Lakh budget.",
    outcome: "Elevated the home's arrival experience with refined material textures and warm welcoming light.",
    workScope: [
      "Entrance Foyer Renovation",
      "Custom Wall Panelling",
      "Lighting Upgrade",
      "Custom Consoles"
    ],
    clientContact: "Mr. Arpit Agrawal",
    completionDate: "March 2024",
    area: "800 sq ft",
    budget: "₹15 Lakhs",
    featured: false
  },
  {
    id: "goyal-renovation",
    slug: "goyal-renovation",
    title: "Exterior Renovation — Mr. Sampat Goyal",
    category: "Consultation",
    location: "Govindgarh, Jaipur",
    image: "/assets/optimized/Projects/Mr. Goyal's renovation project/1.jpeg",
    images: [
      "/assets/optimized/Projects/Mr. Goyal's renovation project/1.jpeg",
      "/assets/optimized/Projects/Mr. Goyal's renovation project/2.jpeg",
      "/assets/optimized/Projects/Mr. Goyal's renovation project/video-1.mp4"
    ],
    subtitle: "Exterior Renovation • Design Consultancy",
    description:
      "Exterior renovation project and design consultancy for Mr. Sampat Goyal in Govindgarh, Jaipur.",
    longDescription:
      "Exterior facade renovation and spatial design consultancy for Mr. Sampat Goyal's residence in Govindgarh, Jaipur. Focused on elevation aesthetics, exterior lighting, and durable material selection.",
    outcome: "Modernized exterior elevation with improved natural ventilation and durable stone/finish selection.",
    workScope: [
      "Exterior Renovation",
      "Design Consultancy",
      "Facade Elevation",
      "Material Selection"
    ],
    clientContact: "Mr. Sampat Goyal",
    completionDate: "April 2024",
    area: "2,400 sq ft",
    featured: false
  },
  {
    id: "himani-residence",
    slug: "himani-residence",
    title: "Mrs. Himani Residence",
    category: "Interior Design",
    location: "Govindgarh, Jaipur",
    image: "/assets/optimized/Projects/Mrs. Himani interior/1.jpeg",
    images: [
      "/assets/optimized/Projects/Mrs. Himani interior/1.jpeg",
      "/assets/optimized/Projects/Mrs. Himani interior/2.jpeg",
      "/assets/optimized/Projects/Mrs. Himani interior/3.jpeg",
      "/assets/optimized/Projects/Mrs. Himani interior/4.jpeg",
      "/assets/optimized/Projects/Mrs. Himani interior/5.jpeg",
      "/assets/optimized/Projects/Mrs. Himani interior/6.jpeg",
      "/assets/optimized/Projects/Mrs. Himani interior/7.jpeg",
      "/assets/optimized/Projects/Mrs. Himani interior/8.jpeg",
      "/assets/optimized/Projects/Mrs. Himani interior/9.jpeg"
    ],
    subtitle: "Bedroom Interior • Design & Execution • Budget ₹2.5 Lakhs",
    description:
      "Bedroom interior design and execution project for Mrs. Himani Sain in Govindgarh, Jaipur.",
    longDescription:
      "Custom bedroom interior design and execution for Mrs. Himani Sain in Govindgarh, Jaipur. Features space-saving modular wardrobes, upholstered headboard, cove lighting, and warm finishes within a ₹2.5 Lakh budget.",
    outcome: "Created a calm, cozy bedroom sanctuary tailored to the family's daily lifestyle.",
    workScope: [
      "Design & Execution",
      "Bedroom Interior",
      "Modular Storage",
      "Lighting & Panelling"
    ],
    clientContact: "Mrs. Himani Sain",
    completionDate: "May 2024",
    area: "3,100 sq ft",
    budget: "₹2.5 Lakhs",
    featured: true,
    focalPoint: { x: 0.5, y: 0.5 }
  },
  {
    id: "rawat-light-studio",
    slug: "rawat-light-studio",
    title: "Rawat Light Studio",
    category: "Consultation",
    location: "Murlipura, Jaipur",
    image: "/assets/optimized/Projects/Rawat light studio/1.jpeg",
    images: [
      "/assets/optimized/Projects/Rawat light studio/1.jpeg",
      "/assets/optimized/Projects/Rawat light studio/video-1.mp4",
      "/assets/optimized/Projects/Rawat light studio/video-2.mp4",
      "/assets/optimized/Projects/Rawat light studio/video-3.mp4",
      "/assets/optimized/Projects/Rawat light studio/2.jpeg",
      "/assets/optimized/Projects/Rawat light studio/3.jpeg",
      "/assets/optimized/Projects/Rawat light studio/4.jpeg",
      "/assets/optimized/Projects/Rawat light studio/5.jpeg",
      "/assets/optimized/Projects/Rawat light studio/6.jpeg",
      "/assets/optimized/Projects/Rawat light studio/7.jpeg"
    ],
    subtitle: "Design Consultancy Project",
    description:
      "Design consultancy project for Rawat Light Studio in Murlipura, Jaipur for Mr. Rahul Jangir.",
    longDescription:
      "Design consultancy project for Mr. Rahul Jangir's Rawat Light Studio in Murlipura, Jaipur. Optimized display zones for architectural lighting fixtures, dark backdrops, and interactive client demonstration areas.",
    outcome: "Built a sleek, high-contrast showroom layout that highlights architectural lighting fixtures.",
    workScope: [
      "Design Consultancy",
      "Showroom Architecture",
      "Lighting Display Layout",
      "Electrical Planning"
    ],
    clientContact: "Mr. Rahul Jangir",
    completionDate: "June 2024",
    area: "1,800 sq ft",
    featured: false
  },
  {
    id: "sharma-residency",
    slug: "sharma-residency",
    title: "Sharma's Residency",
    category: "Consultation",
    location: "Sikar",
    image: "/assets/optimized/Projects/Sharma's Residency/1.jpeg",
    images: [
      "/assets/optimized/Projects/Sharma's Residency/1.jpeg",
      "/assets/optimized/Projects/Sharma's Residency/2.jpeg",
      "/assets/optimized/Projects/Sharma's Residency/3.jpeg",
      "/assets/optimized/Projects/Sharma's Residency/4.jpeg",
      "/assets/optimized/Projects/Sharma's Residency/5.jpeg",
      "/assets/optimized/Projects/Sharma's Residency/6.jpeg"
    ],
    subtitle: "Residential Consultancy Project",
    description:
      "Residential consultancy project for Ms. Jyoti Sharma in Sikar.",
    longDescription:
      "Comprehensive residential design consultancy project for Ms. Jyoti Sharma in Sikar, focusing on spatial optimization, material guidance, and modern functional living.",
    outcome: "Delivered a tailored residential design plan with optimized spatial flow and material specifications.",
    workScope: [
      "Residential Consultancy",
      "Space Planning",
      "Design Guidance",
      "Material Selection"
    ],
    clientContact: "Ms. Jyoti Sharma",
    completionDate: "July 2024",
    area: "4,200 sq ft",
    featured: true,
    focalPoint: { x: 0.5, y: 0.45 }
  },
  {
    id: "the-coffee-crust-caffe",
    slug: "the-coffee-crust-caffe",
    title: "The Coffee Crust Caffe",
    category: "Interior Design",
    location: "Vidyadhar Nagar, Jaipur",
    image: "/assets/optimized/Projects/The coffee crust caffe/1.jpeg",
    images: [
      "/assets/optimized/Projects/The coffee crust caffe/1.jpeg",
      "/assets/optimized/Projects/The coffee crust caffe/2.jpeg",
      "/assets/optimized/Projects/The coffee crust caffe/3.jpeg",
      "/assets/optimized/Projects/The coffee crust caffe/4.jpeg",
      "/assets/optimized/Projects/The coffee crust caffe/5.jpeg"
    ],
    subtitle: "Design & Execution • Budget ₹2.5 Lakhs",
    description:
      "Design and execution project for The Coffee Crust Caffe in Vidyadhar Nagar, Jaipur for Mr. Shashank.",
    longDescription:
      "Complete design and execution for Mr. Shashank's The Coffee Crust Caffe in Vidyadhar Nagar, Jaipur. Created a warm, inviting cafe interior featuring custom wooden counter, cozy seating, and ambient lighting within a ₹2.5 Lakh budget.",
    outcome: "Created a trendy, photogenic cafe space that maximizes seating capacity while maintaining a relaxed vibe.",
    workScope: [
      "Design & Execution",
      "Cafe Interior Design",
      "Counter Fabrication",
      "Lighting & Ambience"
    ],
    clientContact: "Mr. Shashank",
    completionDate: "August 2024",
    area: "1,500 sq ft",
    budget: "₹2.5 Lakhs",
    featured: true,
    focalPoint: { x: 0.5, y: 0.5 }
  }
];

export default projects;
