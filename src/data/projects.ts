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
    id: "six-eleven-gym",
    slug: "six-eleven-gym",
    title: "Six Eleven Gym",
    category: "Interior Design",
    location: "Pratap Nagar, Jaipur",
    image: "/assets/optimized/Projects/six eleven gym/1.png",
    images: [
      "/assets/optimized/Projects/six eleven gym/1.png",
      "/assets/optimized/Projects/six eleven gym/2.png",
      "/assets/optimized/Projects/six eleven gym/3.png",
      "/assets/optimized/Projects/six eleven gym/4.png",
      "/assets/optimized/Projects/six eleven gym/5.png",
      "/assets/optimized/Projects/six eleven gym/6.png",
      "/assets/optimized/Projects/six eleven gym/7.png",
      "/assets/optimized/Projects/six eleven gym/8.png"
    ],
    subtitle: "Design & Execution • Budget ₹18 Lakhs",
    description: "Design and execution work for SIX11 Gym in Pratap Nagar, Jaipur.",
    longDescription: "Comprehensive interior design and turnkey execution for SIX11 Gym in Pratap Nagar, Jaipur. Features specialized acoustic panelling, shock-absorbent high-grade rubber gym flooring, dynamic neon and ambient workout lighting, modern locker facilities, and spacious cardio/strength zoning within an ₹18 Lakh budget.",
    outcome: "Delivered an energetic, high-performance fitness club environment maximizing member engagement and floor efficiency.",
    workScope: [
      "Design & Execution",
      "Gym Interior Architecture",
      "Lighting & Acoustic Design",
      "Specialized Fitness Flooring"
    ],
    clientContact: "SIX11 Gym, Pratap Nagar, Jaipur",
    completionDate: "September 2024",
    area: "3,500 sq ft",
    budget: "₹18 Lakhs",
    featured: false,
    focalPoint: { x: 0.5, y: 0.5 }
  },
  {
    id: "dlmeh-hospital",
    slug: "dlmeh-hospital",
    title: "Devi Lal Memorial Eye Hospital",
    category: "Consultation",
    location: "Chomu, Jaipur",
    image: "/assets/optimized/Projects/DLMEH/1.jpeg",
    images: [
      "/assets/optimized/Projects/DLMEH/1.jpeg",
      "/assets/optimized/Projects/DLMEH/2.jpeg",
      "/assets/optimized/Projects/DLMEH/3.jpeg",
      "/assets/optimized/Projects/DLMEH/4.jpeg",
      "/assets/optimized/Projects/DLMEH/5.jpeg"
    ],
    subtitle: "Design Consultancy Project",
    description: "Design consultancy project for Devi Lal Memorial Eye Hospital (DLMEH) in Chomu, Jaipur.",
    longDescription: "Healthcare design consultancy and spatial planning for Devi Lal Memorial Eye Hospital in Chomu, Jaipur for DLMEH. Focused on patient circulation, reception flow, clinical efficiency, and comfortable eye-care facilities with calming clinical finishes.",
    outcome: "Delivered a functional, patient-centric healthcare layout with streamlined movement and soothing clinical aesthetics.",
    workScope: [
      "Design Consultancy",
      "Healthcare Space Planning",
      "Clinical Layout",
      "Lighting & Circulation"
    ],
    clientContact: "DLMEH Jaipur",
    completionDate: "August 2024",
    area: "4,500 sq ft",
    featured: false,
    focalPoint: { x: 0.5, y: 0.45 }
  },
  {
    id: "pcp-sikar",
    slug: "pcp-sikar",
    title: "PCP Sikar",
    category: "Consultation",
    location: "Sikar",
    image: "/assets/optimized/Projects/PCP Sikar/1.jpeg",
    images: [
      "/assets/optimized/Projects/PCP Sikar/1.jpeg",
      "/assets/optimized/Projects/PCP Sikar/2.jpeg",
      "/assets/optimized/Projects/PCP Sikar/3.jpeg",
      "/assets/optimized/Projects/PCP Sikar/4.jpeg",
      "/assets/optimized/Projects/PCP Sikar/5.jpeg",
      "/assets/optimized/Projects/PCP Sikar/6.jpeg",
      "/assets/optimized/Projects/PCP Sikar/7.jpeg",
      "/assets/optimized/Projects/PCP Sikar/8.jpeg",
      "/assets/optimized/Projects/PCP Sikar/9.jpeg",
      "/assets/optimized/Projects/PCP Sikar/10.jpeg",
      "/assets/optimized/Projects/PCP Sikar/11.jpeg",
      "/assets/optimized/Projects/PCP Sikar/12.jpeg",
      "/assets/optimized/Projects/PCP Sikar/13.jpeg",
      "/assets/optimized/Projects/PCP Sikar/14.jpeg",
      "/assets/optimized/Projects/PCP Sikar/15.jpeg",
      "/assets/optimized/Projects/PCP Sikar/16.jpeg",
      "/assets/optimized/Projects/PCP Sikar/17.jpeg"
    ],
    subtitle: "Design Consultancy Project",
    description: "Design consultancy project for PCP Sikar focusing on modern educational and institutional spaces.",
    longDescription: "Comprehensive design consultancy project for PCP in Sikar. Specialized in space planning, layout optimization, and aesthetic guidance for an inspiring environment.",
    outcome: "Delivered a refined educational campus layout enhancing student focus, natural daylighting, and spatial harmony.",
    workScope: [
      "Design Consultancy",
      "Space Planning",
      "Architectural Guidance",
      "Interior Detailing"
    ],
    clientContact: "Available upon request",
    completionDate: "December 2023",
    area: "4,500 sq ft",
    featured: true,
    focalPoint: { x: 0.5, y: 0.45 }
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
      "/assets/optimized/Projects/Chhoti bai jewellers/10.jpeg"
    ],
    subtitle: "Turnkey Project with Material • Budget ₹14 Lakhs",
    description: "Turnkey commercial jewellery showroom project with material execution in City Center, Sansar Chandra Road, Jaipur.",
    longDescription: "Complete turnkey commercial project with premium material execution for Chhoti Bai Jewellers at City Center, Sansar Chandra Road, Jaipur. Features bespoke display units, security integration, and luxury interior finishing within a ₹14 Lakh budget.",
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
    id: "foyer",
    slug: "foyer",
    title: "Entrance Foyer Renovation",
    category: "Renovation",
    location: "New Light Colony, Tonk Road, Jaipur",
    image: "/assets/optimized/Projects/Foyer/1.jpeg",
    images: [
      "/assets/optimized/Projects/Foyer/1.jpeg",
      "/assets/optimized/Projects/Foyer/2.jpg",
      "/assets/optimized/Projects/Foyer/3.jpeg",
      "/assets/optimized/Projects/Foyer/4.jpeg",
      "/assets/optimized/Projects/Foyer/5.jpeg",
      "/assets/optimized/Projects/Foyer/6.jpg",
      "/assets/optimized/Projects/Foyer/7.jpg",
      "/assets/optimized/Projects/Foyer/8.jpeg",
      "/assets/optimized/Projects/Foyer/9.jpeg",
      "/assets/optimized/Projects/Foyer/10.jpeg",
      "/assets/optimized/Projects/Foyer/11.jpg",
      "/assets/optimized/Projects/Foyer/video-1.mp4",
      "/assets/optimized/Projects/Foyer/video-2.mp4",
      "/assets/optimized/Projects/Foyer/video-3.mp4",
      "/assets/optimized/Projects/Foyer/video-4.mp4"
    ],
    subtitle: "Foyer Renovation • Budget ₹15 Lakhs",
    description: "Entrance foyer renovation project for Mr. Arpit Agrawal in New Light Colony, Tonk Road, Jaipur.",
    longDescription: "High-end entrance foyer renovation for Mr. Arpit Agrawal at New Light Colony, Tonk Road, Jaipur. Features custom wall cladding, luxury foyer lighting, and premium carpentry detailing within a ₹15 Lakh budget.",
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
    featured: true,
    focalPoint: { x: 0.5, y: 0.5 }
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
    description: "Bedroom interior design and execution project for Mrs. Himani Sain in Govindgarh, Jaipur.",
    longDescription: "Custom bedroom interior design and execution for Mrs. Himani Sain in Govindgarh, Jaipur. Features space-saving modular wardrobes, upholstered headboard, cove lighting, and warm finishes within a ₹2.5 Lakh budget.",
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
    description: "Design and execution project for The Coffee Crust Caffe in Vidyadhar Nagar, Jaipur for Mr. Shashank.",
    longDescription: "Complete design and execution for Mr. Shashank's The Coffee Crust Caffe in Vidyadhar Nagar, Jaipur. Created a warm, inviting cafe interior featuring custom wooden counter, cozy seating, and ambient lighting within a ₹2.5 Lakh budget.",
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
  },
  {
    id: "jk-lon",
    slug: "jk-lon",
    title: "JK LON Hospital",
    category: "Renovation",
    location: "Jaipur",
    image: "/assets/optimized/Projects/JK LON/1.jpg",
    images: [
      "/assets/optimized/Projects/JK LON/1.jpg",
      "/assets/optimized/Projects/JK LON/2.jpg",
      "/assets/optimized/Projects/JK LON/3.jpg",
      "/assets/optimized/Projects/JK LON/4.jpg",
      "/assets/optimized/Projects/JK LON/5.jpeg",
      "/assets/optimized/Projects/JK LON/6.jpeg",
      "/assets/optimized/Projects/JK LON/7.jpeg",
      "/assets/optimized/Projects/JK LON/8.jpg",
      "/assets/optimized/Projects/JK LON/9.jpeg",
      "/assets/optimized/Projects/JK LON/video-1.mp4"
    ],
    subtitle: "Healthcare Reimagined",
    description: "Renovation and interior upgrades for JK LON Hospital with improved patient flow and functional spaces.",
    longDescription: "This hospital renovation focused on efficient circulation, clear wayfinding, and durable finishes. The updated layout improves patient experience while supporting clinical workflows.",
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
    image: "/assets/optimized/Projects/Home-Dharmendra/1.jpg",
    images: [
      "/assets/optimized/Projects/Home-Dharmendra/1.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/2.jpeg",
      "/assets/optimized/Projects/Home-Dharmendra/3.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/video-1.mp4",
      "/assets/optimized/Projects/Home-Dharmendra/video-2.mp4"
    ],
    subtitle: "Design & Execution • Budget ₹45 Lakhs",
    description: "Residential interior design and execution project for Mr. Dharmendra Sharma in Jagatpura, Jaipur.",
    longDescription: "Comprehensive residential design and execution project for Mr. Dharmendra Sharma's villa in Jagatpura, Jaipur. Features complete living area interiors, custom furniture, false ceilings, and premium lighting with a ₹45 Lakh budget.",
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
    description: "Design consultancy project for Detailing Devils automotive studio in Vaishali Nagar, Jaipur for Mr. Sanjay Choudhary.",
    longDescription: "Commercial design consultancy for Mr. Sanjay Choudhary's Detailing Devils studio in Vaishali Nagar, Jaipur. Specialized layout planning for high-intensity detailing bays, client lounge, and industrial aesthetic.",
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
    description: "Exterior renovation project and design consultancy for Mr. Sampat Goyal in Govindgarh, Jaipur.",
    longDescription: "Exterior facade renovation and spatial design consultancy for Mr. Sampat Goyal's residence in Govindgarh, Jaipur. Focused on elevation aesthetics, exterior lighting, and durable material selection.",
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
    id: "rawat-light-studio",
    slug: "rawat-light-studio",
    title: "Rawat Light Studio",
    category: "Consultation",
    location: "Murlipura, Jaipur",
    image: "/assets/optimized/Projects/Rawat light studio/1.jpeg",
    images: [
      "/assets/optimized/Projects/Rawat light studio/1.jpeg",
      "/assets/optimized/Projects/Rawat light studio/2.jpeg",
      "/assets/optimized/Projects/Rawat light studio/3.jpeg",
      "/assets/optimized/Projects/Rawat light studio/4.jpeg",
      "/assets/optimized/Projects/Rawat light studio/5.jpeg",
      "/assets/optimized/Projects/Rawat light studio/6.jpeg",
      "/assets/optimized/Projects/Rawat light studio/7.jpeg",
      "/assets/optimized/Projects/Rawat light studio/video-1.mp4",
      "/assets/optimized/Projects/Rawat light studio/video-2.mp4",
      "/assets/optimized/Projects/Rawat light studio/video-3.mp4"
    ],
    subtitle: "Design Consultancy Project",
    description: "Design consultancy project for Rawat Light Studio in Murlipura, Jaipur for Mr. Rahul Jangir.",
    longDescription: "Design consultancy project for Mr. Rahul Jangir's Rawat Light Studio in Murlipura, Jaipur. Optimized display zones for architectural lighting fixtures, dark backdrops, and interactive client demonstration areas.",
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
    description: "Residential consultancy project for Ms. Jyoti Sharma in Sikar.",
    longDescription: "Comprehensive residential design consultancy project for Ms. Jyoti Sharma in Sikar, focusing on spatial optimization, material guidance, and modern functional living.",
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
    featured: false,
    focalPoint: { x: 0.5, y: 0.45 }
  }
];

export default projects;
