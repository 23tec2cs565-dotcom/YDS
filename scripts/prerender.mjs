// scripts/prerender.mjs
// Deterministic Build-Time Static Site Generator (SSG) & Route Pre-renderer
// Generates physical, SEO-optimized .html files for all routes deployed on Vercel.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.resolve(ROOT_DIR, "dist");
const BASE_HTML_PATH = path.resolve(DIST_DIR, "index.html");

const SITE_URL = "https://yds-liart.vercel.app";
const STUDIO_NAME = "Younick Design Studio";
const DEFAULT_IMAGE = `${SITE_URL}/assets/og/hero-1200.webp`;
const LOGO_URL = `${SITE_URL}/android-chrome-512x512.png`;

// Common Organization / LocalBusiness base Schema
const baseOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: STUDIO_NAME,
  alternateName: ["Younick Studio", "Younick Studio Jaipur", "YDS"],
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  image: DEFAULT_IMAGE,
  telephone: "+91 8854883058",
  email: "studioyounick@gmail.com",
  priceRange: "₹₹₹",
  hasMap: "https://maps.google.com/?q=Orbit+Mall+Civil+Lines+Jaipur",
  sameAs: [
    "https://www.instagram.com/studio.younick",
    "https://www.facebook.com/studioyounick",
    "https://www.youtube.com/@Younickdesignstudio",
    "https://wa.me/918854883058"
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "3008, Third Floor, Orbit Mall, Civil Lines",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302001",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.9069,
    longitude: 75.7836
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00"
    }
  ],
  areaServed: [
    "Jaipur", "Civil Lines", "C-Scheme", "Mansarovar", "Vaishali Nagar",
    "Malviya Nagar", "Pratap Nagar", "Jagatpura", "Tonk Road", "Raja Park",
    "Bani Park", "Sikar", "Udaipur", "Jodhpur", "Kota", "Rajasthan"
  ]
};

// Helper to create BreadcrumbList Schema
function createBreadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? (item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`) : undefined
    }))
  };
}

// Navigation HTML for crawlers and immediate FCP
function getNavHtml() {
  return `
    <header role="banner" style="padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); background: #070D18; color: #fff;">
      <nav aria-label="Main Navigation" style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; max-width: 1200px; margin: 0 auto; font-size: 14px;">
        <a href="/" style="color: #E6B566; font-weight: bold; text-decoration: none; font-size: 18px; margin-right: 16px;">YOUNICK DESIGN STUDIO</a>
        <a href="/projects" style="color: #ccc; text-decoration: none;">Projects</a>
        <a href="/services" style="color: #ccc; text-decoration: none;">Services</a>
        <a href="/about" style="color: #ccc; text-decoration: none;">About</a>
        <a href="/team" style="color: #ccc; text-decoration: none;">Team</a>
        <a href="/contact" style="color: #ccc; text-decoration: none;">Contact</a>
        <a href="/career" style="color: #ccc; text-decoration: none;">Careers</a>
        <a href="/faq" style="color: #ccc; text-decoration: none;">FAQ</a>
      </nav>
    </header>
  `;
}

// Footer HTML for crawlers and internal link distribution
function getFooterHtml() {
  return `
    <footer role="contentinfo" style="padding: 32px 24px; border-top: 1px solid rgba(255,255,255,0.1); background: #070D18; color: #888; font-size: 13px; line-height: 1.8;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <nav aria-label="Footer Quick Links" style="margin-bottom: 16px; display: flex; flex-wrap: wrap; gap: 12px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> ·
          <a href="/services" style="color: #aaa; text-decoration: none;">All Services</a> ·
          <a href="/services/interior-design" style="color: #aaa; text-decoration: none;">Interior Design Jaipur</a> ·
          <a href="/services/construction" style="color: #aaa; text-decoration: none;">Turnkey Construction</a> ·
          <a href="/services/renovation" style="color: #aaa; text-decoration: none;">Home Renovation</a> ·
          <a href="/services/consultation" style="color: #aaa; text-decoration: none;">Architect Consultation</a> ·
          <a href="/services/3d-visualization" style="color: #aaa; text-decoration: none;">3D Visualization</a> ·
          <a href="/projects" style="color: #aaa; text-decoration: none;">Portfolio</a> ·
          <a href="/about" style="color: #aaa; text-decoration: none;">About Studio</a> ·
          <a href="/team" style="color: #aaa; text-decoration: none;">Architects &amp; Team</a> ·
          <a href="/career" style="color: #aaa; text-decoration: none;">Careers</a> ·
          <a href="/faq" style="color: #aaa; text-decoration: none;">Pricing FAQ</a> ·
          <a href="/privacy" style="color: #aaa; text-decoration: none;">Privacy Policy</a> ·
          <a href="/terms" style="color: #aaa; text-decoration: none;">Terms of Service</a> ·
          <a href="/contact" style="color: #aaa; text-decoration: none;">Contact Us</a>
        </nav>
        <p style="margin-bottom: 8px;">
          <strong>Studio Address:</strong> 3008, Third Floor, Orbit Mall, Civil Lines, Jaipur, Rajasthan 302001, India. |
          <strong>Phone:</strong> <a href="tel:+918854883058" style="color: #E6B566; text-decoration: none;">+91 88548 83058</a> |
          <strong>Email:</strong> <a href="mailto:studioyounick@gmail.com" style="color: #E6B566; text-decoration: none;">studioyounick@gmail.com</a>
        </p>
        <p>© ${new Date().getFullYear()} Younick Design Studio. All rights reserved. Registered Architectural &amp; Luxury Interior Practice in Jaipur, Rajasthan.</p>
      </div>
    </footer>
  `;
}

// Fallback Project Manifest (used if Sanity API is unreachable during build)
const defaultProjectItems = [
  {
    slug: "hera-mahal",
    name: "Hera Mahal",
    title: "Hera Mahal — Turnkey Civil Construction Landmark in Jaipur | Younick Studio",
    subtitle: "Turnkey Construction & Civil Execution • 6,000 sq ft",
    category: "Construction",
    location: "Jaipur, Rajasthan",
    area: "6,000 sq ft",
    budget: "Turnkey Execution",
    completionDate: "October 2024",
    image: "/assets/Projects/Hera Mahal/1.webp",
    description: "Complete turnkey construction and civil engineering execution for Hera Mahal in Jaipur. Full project management from foundation to final handover.",
    longDescription: "End-to-end civil construction and structural execution project for Hera Mahal in Jaipur. Features high-grade IS materials, precision structural engineering, and comprehensive project management from foundation to final finishes.",
    outcome: "Delivered a structurally sound, premium construction landmark executed with meticulous attention to structural standards.",
    workScope: ["Turnkey Construction", "Civil Engineering", "Structural Execution", "Site Development & Quality Assurance"]
  },
  {
    slug: "six-eleven-gym",
    name: "Six Eleven Gym",
    title: "Six Eleven Gym — High-Energy Fitness Interior Design in Jaipur | Younick",
    subtitle: "Design & Execution • Budget ₹18 Lakhs",
    category: "Interior Design",
    location: "Pratap Nagar, Jaipur",
    area: "3,500 sq ft",
    budget: "₹18 Lakhs",
    completionDate: "September 2024",
    image: "/assets/Projects/six eleven gym/1.webp",
    description: "Comprehensive interior design and turnkey execution for SIX11 Gym in Pratap Nagar, Jaipur. Specialized acoustic panelling, shock-absorbent flooring, and workout lighting.",
    longDescription: "Comprehensive interior design and turnkey execution for SIX11 Gym in Pratap Nagar, Jaipur. Features specialized acoustic panelling, shock-absorbent high-grade rubber gym flooring, dynamic neon and ambient workout lighting, modern locker facilities, and spacious cardio/strength zoning within an ₹18 Lakh budget.",
    outcome: "Delivered an energetic, high-performance fitness club environment maximizing member engagement and floor efficiency.",
    workScope: ["Design & Execution", "Gym Interior Architecture", "Lighting & Acoustic Design", "Specialized Fitness Flooring"]
  },
  {
    slug: "dlmeh-hospital",
    name: "Devi Lal Memorial Eye Hospital",
    title: "Devi Lal Memorial Eye Hospital — Healthcare Space Design in Jaipur | Younick",
    subtitle: "Design Consultancy Project • 4,500 sq ft",
    category: "Consultation",
    location: "Chomu, Jaipur",
    area: "4,500 sq ft",
    budget: "Design Consultancy",
    completionDate: "August 2024",
    image: "/assets/Projects/DLMEH/1.webp",
    description: "Healthcare design consultancy and spatial planning for Devi Lal Memorial Eye Hospital in Chomu, Jaipur. Clinical circulation, reception flow, and patient care facilities.",
    longDescription: "Healthcare design consultancy and spatial planning for Devi Lal Memorial Eye Hospital in Chomu, Jaipur for DLMEH. Focused on patient circulation, reception flow, clinical efficiency, and comfortable eye-care facilities with calming clinical finishes.",
    outcome: "Delivered a functional, patient-centric healthcare layout with streamlined movement and soothing clinical aesthetics.",
    workScope: ["Design Consultancy", "Healthcare Space Planning", "Clinical Layout", "Lighting & Circulation"]
  },
  {
    slug: "pcp-sikar",
    name: "PCP Sikar Educational Campus",
    title: "PCP Sikar Educational Campus — Institutional Architecture in Sikar | Younick",
    subtitle: "Design Consultancy Project • 4,500 sq ft",
    category: "Consultation",
    location: "Sikar, Rajasthan",
    area: "4,500 sq ft",
    budget: "Design Consultancy",
    completionDate: "December 2023",
    image: "/assets/Projects/PCP Sikar/1.webp",
    description: "Design consultancy project for PCP Sikar focusing on modern educational and institutional spaces, natural daylighting, and spatial harmony.",
    longDescription: "Comprehensive design consultancy project for PCP in Sikar. Specialized in space planning, layout optimization, and aesthetic guidance for an inspiring environment.",
    outcome: "Delivered a refined educational campus layout enhancing student focus, natural daylighting, and spatial harmony.",
    workScope: ["Design Consultancy", "Space Planning", "Architectural Guidance", "Interior Detailing"]
  },
  {
    slug: "chhoti-bai-jewellers",
    name: "Chhoti Bai Jewellers",
    title: "Chhoti Bai Jewellers — Turnkey Luxury Jewellery Showroom in Jaipur | Younick",
    subtitle: "Turnkey Project with Material • Budget ₹14 Lakhs",
    category: "Construction",
    location: "City Center, Sansar Chandra Road, Jaipur",
    area: "2,200 sq ft",
    budget: "₹14 Lakhs",
    completionDate: "January 2024",
    image: "/assets/Projects/Chhoti bai jewellers/1.webp",
    description: "Turnkey commercial jewellery showroom project with material execution in City Center, Sansar Chandra Road, Jaipur. Bespoke display vitrines, lighting, and security integration.",
    longDescription: "Complete turnkey commercial project with premium material execution for Chhoti Bai Jewellers at City Center, Sansar Chandra Road, Jaipur. Features bespoke display units, security integration, and luxury interior finishing within a ₹14 Lakh budget.",
    outcome: "Delivered a luxurious retail atmosphere with specialized accent lighting and security-integrated display units.",
    workScope: ["Turnkey Project with Material", "Retail Interior Design", "Display Vitrines", "Security Layout Planning"]
  },
  {
    slug: "foyer",
    name: "Entrance Foyer Renovation",
    title: "Entrance Foyer Renovation — Acoustic Wood Panelling in Jaipur | Younick Studio",
    subtitle: "Foyer Renovation • Budget ₹15 Lakhs",
    category: "Renovation",
    location: "New Light Colony, Tonk Road, Jaipur",
    area: "800 sq ft",
    budget: "₹15 Lakhs",
    completionDate: "March 2024",
    image: "/assets/Projects/Foyer/1.webp",
    description: "High-end entrance foyer renovation for Mr. Arpit Agrawal in New Light Colony, Tonk Road, Jaipur. Custom wall panelling, luxury lighting, and bespoke consoles.",
    longDescription: "High-end entrance foyer renovation for Mr. Arpit Agrawal at New Light Colony, Tonk Road, Jaipur. Features custom wall cladding, luxury foyer lighting, and premium carpentry detailing within a ₹15 Lakh budget.",
    outcome: "Elevated the home's arrival experience with refined material textures and warm welcoming light.",
    workScope: ["Entrance Foyer Renovation", "Custom Wall Panelling", "Lighting Upgrade", "Custom Consoles"]
  },
  {
    slug: "himani-residence",
    name: "Mrs. Himani Residence",
    title: "Mrs. Himani Residence — Luxury Bedroom Interior in Jaipur | Younick Studio",
    subtitle: "Bedroom Interior • Design & Execution • Budget ₹2.5 Lakhs",
    category: "Interior Design",
    location: "Govindgarh, Jaipur",
    area: "3,100 sq ft",
    budget: "₹2.5 Lakhs",
    completionDate: "May 2024",
    image: "/assets/Projects/Mrs. Himani interior/1.webp",
    description: "Custom bedroom interior design and execution for Mrs. Himani Sain in Govindgarh, Jaipur. Modular wardrobes, upholstered headboard, and cove lighting.",
    longDescription: "Custom bedroom interior design and execution for Mrs. Himani Sain in Govindgarh, Jaipur. Features space-saving modular wardrobes, upholstered headboard, cove lighting, and warm finishes within a ₹2.5 Lakh budget.",
    outcome: "Created a calm, cozy bedroom sanctuary tailored to the family's daily lifestyle.",
    workScope: ["Design & Execution", "Bedroom Interior", "Modular Storage", "Lighting & Panelling"]
  },
  {
    slug: "the-coffee-crust-caffe",
    name: "The Coffee Crust Caffe",
    title: "The Coffee Crust Caffe — Modern Cafe Interior in Jaipur | Younick Studio",
    subtitle: "Design & Execution • Budget ₹2.5 Lakhs",
    category: "Interior Design",
    location: "Vidyadhar Nagar, Jaipur",
    area: "1,500 sq ft",
    budget: "₹2.5 Lakhs",
    completionDate: "August 2024",
    image: "/assets/Projects/The coffee crust caffe/1.webp",
    description: "Design and execution project for The Coffee Crust Caffe in Vidyadhar Nagar, Jaipur. Custom wooden bar counter, cozy seating, and ambient lighting.",
    longDescription: "Complete design and execution for Mr. Shashank's The Coffee Crust Caffe in Vidyadhar Nagar, Jaipur. Created a warm, inviting cafe interior featuring custom wooden counter, cozy seating, and ambient lighting within a ₹2.5 Lakh budget.",
    outcome: "Created a trendy, photogenic cafe space that maximizes seating capacity while maintaining a relaxed vibe.",
    workScope: ["Design & Execution", "Cafe Interior Design", "Counter Fabrication", "Lighting & Ambience"]
  },
  {
    slug: "jk-lon",
    name: "JK LON Hospital",
    title: "JK LON Hospital — Pediatric Healthcare Ward Renovation in Jaipur | Younick",
    subtitle: "Healthcare Reimagined • Renovation & Interior Upgrades",
    category: "Renovation",
    location: "Jaipur, Rajasthan",
    area: "1,200 sq ft",
    budget: "Healthcare Renovation",
    completionDate: "August 2023",
    image: "/assets/Projects/JK LON/1.webp",
    description: "Renovation and interior upgrades for JK LON Hospital with improved patient flow, wayfinding, and functional spaces.",
    longDescription: "This hospital renovation focused on efficient circulation, clear wayfinding, and durable finishes. The updated layout improves patient experience while supporting clinical workflows.",
    outcome: "Improved patient flow and clarity of movement while upgrading durable interior finishes.",
    workScope: ["Renovation Planning", "Interior Design", "Kitchen Design", "Bathroom Renovation"]
  },
  {
    slug: "home-dharmendra",
    name: "Dharmendra Villa",
    title: "Dharmendra Villa — Luxury Residential Fit-Out in Jagatpura, Jaipur | Younick",
    subtitle: "Design & Execution • Budget ₹45 Lakhs",
    category: "Interior Design",
    location: "Jagatpura, Jaipur",
    area: "3,000 sq ft",
    budget: "₹45 Lakhs",
    completionDate: "November 2023",
    image: "/assets/Projects/Home-Dharmendra/1.webp",
    description: "Comprehensive residential design and execution project for Mr. Dharmendra Sharma's villa in Jagatpura, Jaipur. Complete living interiors and lighting within ₹45 Lakhs.",
    longDescription: "Comprehensive residential design and execution project for Mr. Dharmendra Sharma's villa in Jagatpura, Jaipur. Features complete living area interiors, custom furniture, false ceilings, and premium lighting with a ₹45 Lakh budget.",
    outcome: "Client approved the final execution with high satisfaction in material quality and spatial layout.",
    workScope: ["Design & Execution", "Residential Fit-Out", "Custom Furniture", "Lighting & Ceilings"]
  },
  {
    slug: "detailing-devils",
    name: "Detailing Devils",
    title: "Detailing Devils Studio — High-CRI Automotive Studio Design in Jaipur | Younick",
    subtitle: "Design Consultancy • 3,500 sq ft",
    category: "Consultation",
    location: "Vaishali Nagar, Jaipur",
    area: "3,500 sq ft",
    budget: "Design Consultancy",
    completionDate: "February 2024",
    image: "/assets/Projects/Detailing devils/1.webp",
    description: "Commercial design consultancy for Detailing Devils automotive studio in Vaishali Nagar, Jaipur. Specialized layout planning for high-intensity detailing bays and client lounge.",
    longDescription: "Commercial design consultancy for Mr. Sanjay Choudhary's Detailing Devils studio in Vaishali Nagar, Jaipur. Specialized layout planning for high-intensity detailing bays, client lounge, and industrial aesthetic.",
    outcome: "Built an immersive, high-visibility detailing bay that enhances operational efficiency.",
    workScope: ["Design Consultancy", "Commercial Layout", "Lighting Bay Design", "Industrial Aesthetics"]
  },
  {
    slug: "goyal-renovation",
    name: "Exterior Renovation — Mr. Sampat Goyal",
    title: "Exterior Renovation & Façade Elevation — Govindgarh, Jaipur | Younick",
    subtitle: "Exterior Renovation • Design Consultancy",
    category: "Consultation",
    location: "Govindgarh, Jaipur",
    area: "2,400 sq ft",
    budget: "Exterior Renovation",
    completionDate: "April 2024",
    image: "/assets/Projects/Mr. Goyal's renovation project/1.webp",
    description: "Exterior facade renovation and spatial design consultancy for Mr. Sampat Goyal's residence in Govindgarh, Jaipur. Elevation aesthetics and exterior lighting.",
    longDescription: "Exterior facade renovation and spatial design consultancy for Mr. Sampat Goyal's residence in Govindgarh, Jaipur. Focused on elevation aesthetics, exterior lighting, and durable material selection.",
    outcome: "Modernized exterior elevation with improved natural ventilation and durable stone/finish selection.",
    workScope: ["Exterior Renovation", "Design Consultancy", "Facade Elevation", "Material Selection"]
  },
  {
    slug: "rawat-light-studio",
    name: "Rawat Light Studio",
    title: "Rawat Light Studio — Commercial Lighting Showroom Fitout in Jaipur | Younick",
    subtitle: "Design Consultancy Project • 1,800 sq ft",
    category: "Consultation",
    location: "Murlipura, Jaipur",
    area: "1,800 sq ft",
    budget: "Design Consultancy",
    completionDate: "June 2024",
    image: "/assets/Projects/Rawat light studio/1.webp",
    description: "Design consultancy project for Rawat Light Studio in Murlipura, Jaipur. Optimized display zones for architectural lighting fixtures.",
    longDescription: "Design consultancy project for Mr. Rahul Jangir's Rawat Light Studio in Murlipura, Jaipur. Optimized display zones for architectural lighting fixtures, dark backdrops, and interactive client demonstration areas.",
    outcome: "Built a sleek, high-contrast showroom layout that highlights architectural lighting fixtures.",
    workScope: ["Design Consultancy", "Showroom Architecture", "Lighting Display Layout", "Electrical Planning"]
  },
  {
    slug: "sharma-residency",
    name: "Sharma's Residency",
    title: "Sharma Residency — Tailored Residential Architecture in Sikar | Younick Studio",
    subtitle: "Residential Consultancy Project • 4,200 sq ft",
    category: "Consultation",
    location: "Sikar, Rajasthan",
    area: "4,200 sq ft",
    budget: "Residential Consultancy",
    completionDate: "July 2024",
    image: "/assets/Projects/Sharma's Residency/1.webp",
    description: "Comprehensive residential design consultancy project for Ms. Jyoti Sharma in Sikar. Spatial optimization, material guidance, and modern functional living.",
    longDescription: "Comprehensive residential design consultancy project for Ms. Jyoti Sharma in Sikar, focusing on spatial optimization, material guidance, and modern functional living.",
    outcome: "Delivered a tailored residential design plan with optimized spatial flow and material specifications.",
    workScope: ["Residential Consultancy", "Space Planning", "Design Guidance", "Material Selection"]
  }
];

function createProjectRoute(p) {
  const fullUrl = `${SITE_URL}/projects/${p.slug}`;
  const fullImage = p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`;
  return {
    path: `/projects/${p.slug}`,
    title: p.title,
    description: p.description,
    keywords: `${p.name.toLowerCase()}, ${p.category.toLowerCase()} jaipur, ${p.location.toLowerCase()} architecture, younick design studio projects, luxury interior designer rajasthan`,
    image: fullImage,
    type: "article",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemPage",
          "@id": `${fullUrl}#webpage`,
          url: fullUrl,
          name: p.title,
          description: p.description,
          inLanguage: "en-IN",
          image: fullImage,
          mainEntity: {
            "@type": "VisualArtwork",
            name: p.name,
            description: p.longDescription,
            creator: {
              "@type": "LocalBusiness",
              "@id": `${SITE_URL}/#organization`,
              name: STUDIO_NAME,
              url: SITE_URL,
              telephone: "+91-8854883058"
            },
            locationCreated: {
              "@type": "Place",
              name: p.location
            }
          }
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
          { name: p.name, url: `/projects/${p.slug}` }
        ]),
        baseOrganizationSchema
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; 
          <a href="/projects" style="color: #E6B566; text-decoration: none;">Projects</a> &gt; 
          <span>${p.name}</span>
        </nav>
        <div style="display: inline-block; padding: 4px 12px; background: rgba(230,181,102,0.1); border: 1px solid rgba(230,181,102,0.25); border-radius: 9999px; color: #E6B566; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 16px;">
          ${p.category} &bull; ${p.location}
        </div>
        <h1 style="font-size: 36px; line-height: 1.25; margin-bottom: 16px; color: #fff;">
          ${p.name}
        </h1>
        <p style="font-size: 18px; line-height: 1.6; color: #E6B566; margin-bottom: 24px;">
          ${p.subtitle}
        </p>

        <!-- Project Factsheet Table -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 20px; border-radius: 12px; margin-bottom: 32px;">
          <div>
            <span style="display: block; font-size: 11px; color: #888; text-transform: uppercase;">Location</span>
            <strong style="color: #fff; font-size: 14px;">${p.location}</strong>
          </div>
          <div>
            <span style="display: block; font-size: 11px; color: #888; text-transform: uppercase;">Floor Area</span>
            <strong style="color: #fff; font-size: 14px;">${p.area}</strong>
          </div>
          <div>
            <span style="display: block; font-size: 11px; color: #888; text-transform: uppercase;">Budget / Scope</span>
            <strong style="color: #E6B566; font-size: 14px;">${p.budget}</strong>
          </div>
          <div>
            <span style="display: block; font-size: 11px; color: #888; text-transform: uppercase;">Handover Date</span>
            <strong style="color: #fff; font-size: 14px;">${p.completionDate}</strong>
          </div>
        </div>

        <!-- Architectural Story -->
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 14px; border-bottom: 1px solid rgba(230,181,102,0.3); padding-bottom: 8px;">
            Architectural Story &amp; Execution Brief
          </h2>
          <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 16px;">
            ${p.longDescription}
          </p>
          <div style="background: rgba(11,21,40,0.8); border: 1px solid rgba(230,181,102,0.25); border-radius: 12px; padding: 18px; margin-top: 16px;">
            <strong style="color: #E6B566; display: block; margin-bottom: 6px;">Client Outcome:</strong>
            <p style="color: #eee; font-size: 14px; line-height: 1.6; margin: 0;">${p.outcome}</p>
          </div>
        </section>

        <!-- Deliverables -->
        <section style="margin-bottom: 32px;">
          <h3 style="font-size: 20px; color: #fff; margin-bottom: 12px;">
            Key Deliverables &amp; Work Scope
          </h3>
          <ul style="color: #bbb; font-size: 15px; line-height: 2; padding-left: 20px;">
            ${p.workScope.map(ws => `<li>${ws}</li>`).join("")}
          </ul>
        </section>

        <!-- CTA -->
        <div style="text-align: center; margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1);">
          <p style="color: #ccc; font-size: 16px; margin-bottom: 20px;">
            Planning a similar residential or commercial architecture project in Jaipur?
          </p>
          <a href="/contact" style="background: #E6B566; color: #070D18; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block; margin-right: 12px;">
            Schedule Architectural Consultation
          </a>
          <a href="/projects" style="background: rgba(255,255,255,0.08); color: #fff; padding: 14px 28px; border-radius: 8px; font-weight: 500; text-decoration: none; display: inline-block;">
            View All Projects
          </a>
        </div>
      </article>
    `
  };
}

// 5 Foundational Architectural Guides Manifest
export const defaultBlogItems = [
  {
    slug: "interior-design-cost-jaipur-2026",
    title: "Cost of Interior Design in Jaipur (2026 Price Guide: 1BHK, 2BHK, 3BHK, 4BHK & Luxury Villas)",
    subtitle: "Complete per-square-foot cost breakdown for modular kitchens, woodwork, false ceilings, and turnkey execution in Jaipur.",
    excerpt: "Planning an interior design project in Jaipur? Here is an architect-verified 2026 cost guide covering per sq ft rates, room-by-room budgeting, and how to avoid contractor overruns.",
    category: "Cost & Budgeting",
    author: { name: "Nikhil Sain", role: "Lead Architect & Interior Designer" },
    publishedAt: "2026-08-15",
    readingTime: "8 min read",
    coverImage: "/assets/services/interior-design3.jpg",
    tags: ["Interior Design Cost", "Jaipur Cost Guide", "3BHK Budget", "Turnkey Interior Rates", "Modular Kitchen Pricing"],
    seoTitle: "Cost of Interior Design in Jaipur (2026 Price Guide) | Younick Studio",
    seoDescription: "How much does interior design cost in Jaipur in 2026? Per sq ft rates from ₹1,200 to ₹4,500+. Complete cost breakdown for 2BHK, 3BHK, and luxury villas.",
    seoKeywords: "interior design cost in jaipur, 3bhk interior design cost jaipur, per sq ft interior design cost jaipur 2026, turnkey interior contractor rates jaipur",
    faqs: [
      {
        question: "What is the average cost of interior design per sq ft in Jaipur?",
        answer: "In Jaipur, interior design and turnkey execution costs generally range from ₹1,200 to ₹1,800/sq.ft for Essential Turnkey, ₹1,800 to ₹2,800/sq.ft for Premium Contemporary finishes, and ₹2,800 to ₹4,500+/sq.ft for Ultra-Luxury custom residential villas."
      },
      {
        question: "How much does 3BHK interior design cost in Jaipur?",
        answer: "A complete turnkey 3BHK interior (approx. 1,600–2,000 sq.ft) in Jaipur typically ranges between ₹18 Lakhs and ₹32 Lakhs for premium quality woodwork, modular kitchen with Blum hardware, false ceilings, and lighting."
      }
    ],
    content: `
      <h2>1. Average Interior Design Cost per Sq. Ft. in Jaipur (2026 Benchmarks)</h2>
      <p>Whether you have purchased an apartment in Vaishali Nagar, Jagatpura, or Mansarovar, or you are constructing an independent villa in Civil Lines or C-Scheme, interior costs in Jaipur fall into three execution tiers:</p>
      <ul>
        <li><strong>Essential Turnkey (₹1,200 – ₹1,800 per sq ft):</strong> Commercial BWR ply, 1mm laminate finishes, soft-close hardware, modular kitchen, and basic cove lighting.</li>
        <li><strong>Premium Contemporary (₹1,800 – ₹2,800 per sq ft):</strong> IS:710 BWP Marine Plywood, acrylic/PU kitchen finishes, Blum/Hettich hardware, quartz countertops, designer false ceilings, profile lights.</li>
        <li><strong>Luxury Signature Villa (₹2,800 – ₹4,500+ per sq ft):</strong> Italian marble flooring, natural smoked veneer panelling, metallic PVD profiles, architectural automation, custom acoustic bar, smart lighting grids.</li>
      </ul>
      <h2>2. Room-by-Room Cost Breakdown for Jaipur Homes</h2>
      <ul>
        <li><strong>Modular Kitchen (₹2.5L – ₹6.5L):</strong> Must use IS:710 Marine Grade BWP plywood with German hardware to resist Rajasthan heat and moisture.</li>
        <li><strong>Master Bedroom (₹2.8L – ₹5.5L):</strong> Floor-to-ceiling modular wardrobe, hydraulic storage king bed, upholstered headboard, and bedside reading lights.</li>
        <li><strong>Living & Dining Foyer (₹4L – ₹9L):</strong> Large-format TV console, acoustic wood panelling, ambient warm 3000K cove lighting, and dining partitions.</li>
        <li><strong>False Ceiling & Lighting (₹110 – ₹180 per sq ft):</strong> Gyproc channels with fire-resistant boards and magnetic track lights.</li>
      </ul>
    `
  },
  {
    slug: "best-modular-kitchen-materials-rajasthan-hot-climate",
    title: "Best Materials for Modular Kitchens in Rajasthan’s Hot Climate (Thermal & Dust Resistance Guide)",
    subtitle: "How to choose kitchen carcass substrates, shutter finishes, and countertops that withstand 45°C+ summer heat and desert dust.",
    excerpt: "Rajasthan's extreme temperature swings, dry dust storms, and water hardness destroy cheap modular kitchens within 2 years. Discover the architect-recommended materials for Jaipur kitchens.",
    category: "Materials & Climate",
    author: { name: "Nikhil Sain", role: "Lead Architect & Interior Designer" },
    publishedAt: "2026-08-20",
    readingTime: "7 min read",
    coverImage: "/assets/services/construction.jpg",
    tags: ["Modular Kitchen", "Rajasthan Climate", "BWP Plywood", "HDHMR vs Plywood", "Kitchen Countertops"],
    seoTitle: "Best Modular Kitchen Materials in Rajasthan's Climate | Younick Studio",
    seoDescription: "Which modular kitchen materials survive Rajasthan's 45°C+ heat, dust, and hard water? Architect comparison of BWP Marine Ply, HDHMR, Acrylic, and Quartz.",
    seoKeywords: "best modular kitchen material jaipur, kitchen cabinets for hot climate rajasthan, acrylic vs pu kitchen jaipur, bwp plywood kitchen rajasthan",
    faqs: [
      {
        question: "Is HDHMR or BWP Plywood better for modular kitchens in Jaipur?",
        answer: "For Rajasthan's semi-arid conditions, IS:710 Marine Grade BWP Plywood is superior for wet sink carcass zones because it does not swell from plumbing leaks or water salinity. HDHMR is great for overhead dry shutters."
      }
    ],
    content: `
      <h2>The Harsh Climate Reality of Kitchens in Rajasthan</h2>
      <p>Jaipur and Rajasthan present unique challenges: extreme summer heat exceeding 46°C, fine airborne dust that clogs low-grade drawer tracks, and high TDS groundwater that corrodes cheap iron hinges.</p>
      <h2>1. The Carcass: Core Substrates</h2>
      <p><strong>IS:710 BWP Marine Plywood:</strong> The gold standard. Bonded with synthetic phenol formaldehyde resin, it withstands 72 hours in boiling water without ply separation.</p>
      <h2>2. Shutter Finishes: Acrylic vs PU vs Laminate</h2>
      <p><strong>Anti-Fingerprint Matte PU:</strong> Seamless luxury with zero edge-band lines, resisting grease and UV yellowing. <strong>High-Gloss Acrylic:</strong> Brilliant mirror sheen and 100% non-porous.</p>
    `
  },
  {
    slug: "vastu-guidelines-luxury-villa-design-jaipur",
    title: "Vastu Guidelines for Luxury Villa Entrances & Spatial Planning in Jaipur (Architect's Perspective)",
    subtitle: "Harmonizing ancient Vedic orientation science with contemporary open-plan luxury architecture.",
    excerpt: "How do you design an ultra-luxury modern villa in Jaipur that honors Vastu Shastra without compromising on double-height ceilings, glass facades, and minimalist aesthetics?",
    category: "Vastu & Planning",
    author: { name: "Nikhil Sain", role: "Lead Architect & Interior Designer" },
    publishedAt: "2026-08-25",
    readingTime: "9 min read",
    coverImage: "/assets/services/renovation.jpg",
    tags: ["Vastu Shastra", "Luxury Villa Planning", "Jaipur Architecture", "Entrance Vastu", "Brahmasthan Courtyard"],
    seoTitle: "Vastu Guidelines for Luxury Villas in Jaipur | Younick Studio",
    seoDescription: "Architect's guide to modern Vastu planning for luxury villas in Jaipur. Entrance zones, master bedroom placement, kitchen Agni corner, and open courtyards.",
    seoKeywords: "vastu for luxury villa entrance jaipur, main door vastu rules rajasthan, vastu compliant spatial planning civil lines jaipur",
    faqs: [
      {
        question: "Which direction is best for a villa entrance in Jaipur?",
        answer: "Northeast (Ishanya) and North (Kuber/Uttar) entrances are considered the most auspicious, capturing clean morning solar rays while shielding the home from harsh southwest afternoon heat."
      }
    ],
    content: `
      <h2>Reconciling Vedic Science with Modern Architecture</h2>
      <p>At Younick Design Studio, we view Vastu not as superstition, but as an empirical environmental planning framework designed for Rajasthan’s solar and wind angles.</p>
      <h2>1. The Grand Entrance (Mahadwara)</h2>
      <p>Entrances in the 3rd and 4th pada of the East or North channel prosperity and natural lighting. Use natural Rajasthan granite or Makrana marble at the threshold.</p>
      <h2>2. Zone Allocations</h2>
      <p>Northeast for prayer rooms or reflective water bodies. Southeast (Agni) for the primary kitchen. Southwest (Nairutya) for the Master Suite. Center (Brahmasthan) kept open as a skylit atrium or landscaped courtyard.</p>
    `
  },
  {
    slug: "turnkey-construction-vs-local-contractors-jaipur",
    title: "Turnkey Civil Construction vs Local Labor Contractors in Jaipur: Detailed Cost & Risk Analysis",
    subtitle: "Why managing separate plumbers, electricians, and masons causes 30% budget overruns in Rajasthan.",
    excerpt: "Building a home in Jaipur? Discover the financial, legal, and engineering differences between hiring fragmented labor contractors versus an all-inclusive turnkey architecture studio.",
    category: "Turnkey Construction",
    author: { name: "Nikhil Sain", role: "Lead Architect & Interior Designer" },
    publishedAt: "2026-08-28",
    readingTime: "8 min read",
    coverImage: "/assets/services/construction.jpg",
    tags: ["Turnkey Construction", "Civil Contractors Jaipur", "Home Building Cost", "Project Management", "BOQ Contracts"],
    seoTitle: "Turnkey Construction vs Local Contractors in Jaipur | Younick Studio",
    seoDescription: "Turnkey construction vs hiring local labor contractors in Jaipur. Detailed cost comparison, structural safety risks, and why turnkey contracts prevent 30% overruns.",
    seoKeywords: "turnkey construction contractor jaipur, turnkey vs item rate contractor jaipur, civil construction costs jaipur per sq ft",
    faqs: [
      {
        question: "Why do local labor contractors in Jaipur frequently exceed initial quotes?",
        answer: "Labor-only contracts exclude material price volatility, structural detailing, electrical conduit planning, and waterproofing engineering. When site complications arise, contractors submit additional item-rate bills that inflate costs by 25% to 40%."
      }
    ],
    content: `
      <h2>The Illusion of Cheap Labor Contracts</h2>
      <p>Data from over 100 site audits across Rajasthan shows that 80%+ of self-managed contractor builds experience severe delays and 30%+ cost overruns.</p>
      <h2>Turnkey Architecture vs Separate Contractors</h2>
      <p>Turnkey provides single-point accountability, fixed itemized BOQs, IS-tested concrete, Dr. Fixit multi-layer waterproofing, and guaranteed handover schedules.</p>
    `
  },
  {
    slug: "why-3d-architectural-renders-save-construction-cost",
    title: "Why 3D Architectural Renders Save 20% on Villa Construction in Rajasthan",
    subtitle: "How photorealistic CGI visualization prevents expensive on-site structural demolition and rework.",
    excerpt: "Demolishing an incorrectly placed partition wall or re-doing false ceilings costs 10x more than photorealistic 3D visualization. See how 3D CGI saves lakhs on your build.",
    category: "3D Visualization",
    author: { name: "Nikhil Sain", role: "Lead Architect & Interior Designer" },
    publishedAt: "2026-09-01",
    readingTime: "6 min read",
    coverImage: "/assets/services/consultation.jpg",
    tags: ["3D Rendering", "CGI Walkthroughs", "Construction Cost Savings", "VR Architecture", "Jaipur Renders"],
    seoTitle: "Why 3D Architectural Renders Save Construction Costs | Younick Studio",
    seoDescription: "How 3D architectural renders and CGI walkthroughs save 20% on villa construction in Jaipur. Avoid on-site rework, coordinate lighting, and test materials before building.",
    seoKeywords: "3d architectural rendering jaipur, benefits of 3d interior renders before construction, vr walkthrough architecture rajasthan",
    faqs: [
      {
        question: "How does 3D visualization save money during construction?",
        answer: "Catching design conflicts digitally costs zero rupees. Altering physical brickwork, marble flooring, or HVAC ducting on site costs lakhs in material wastage and labor."
      }
    ],
    content: `
      <h2>The Cost of Guesswork on Construction Sites</h2>
      <p>Residential architecture in Rajasthan often suffers from on-site rework. 3D visualization eliminates false ceiling & AC duct clashes, material color mismatches, and improper solar orientation.</p>
    `
  }
];

// Generates dedicated Blog Article Route with BlogPosting + FAQPage schema and semantic HTML
function createBlogRoute(b) {
  const canonicalUrl = `${SITE_URL}/blog/${b.slug}`;
  const ogImage = b.coverImage.startsWith("http") ? b.coverImage : `${SITE_URL}${b.coverImage}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        headline: b.title,
        description: b.excerpt,
        image: [ogImage],
        datePublished: `${b.publishedAt}T09:00:00+05:30`,
        dateModified: `${b.publishedAt}T12:00:00+05:30`,
        author: {
          "@type": "Person",
          name: b.author.name,
          jobTitle: b.author.role,
          url: `${SITE_URL}/team`
        },
        publisher: {
          "@type": "Organization",
          name: "Younick Design Studio",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/younick-crest.webp`
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        articleSection: b.category,
        keywords: b.tags.join(", "),
        inLanguage: "en-IN"
      },
      createBreadcrumbs([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: b.title, url: `/blog/${b.slug}` }
      ]),
      ...(b.faqs && b.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: b.faqs.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }] : [])
    ]
  };

  return {
    path: `/blog/${b.slug}`,
    title: b.seoTitle || `${b.title} | Younick Studio Jaipur`,
    description: b.seoDescription || b.excerpt,
    keywords: b.seoKeywords || b.tags.join(", "),
    image: ogImage,
    type: "article",
    schema,
    renderBody: () => `
      <article style="max-width: 900px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 20px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; 
          <a href="/blog" style="color: #E6B566; text-decoration: none;">Blog</a> &gt; 
          <span>${b.category}</span>
        </nav>

        <header style="margin-bottom: 32px;">
          <div style="display: flex; gap: 12px; align-items: center; font-size: 12px; color: #aaa; margin-bottom: 12px;">
            <span style="background: rgba(230,181,102,0.2); color: #E6B566; padding: 4px 10px; border-radius: 4px; font-weight: bold;">${b.category}</span>
            <span>•</span>
            <span>${b.readingTime}</span>
            <span>•</span>
            <span>Published ${b.publishedAt}</span>
          </div>

          <h1 style="font-size: 36px; line-height: 1.3; color: #fff; margin-bottom: 16px; font-family: serif;">
            ${b.title}
          </h1>

          <p style="font-size: 18px; line-height: 1.6; color: #ccc; margin-bottom: 20px;">
            ${b.subtitle}
          </p>

          <div style="display: flex; align-items: center; gap: 12px; padding: 14px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 13px;">
              <strong style="color: #fff; display: block;">${b.author.name}</strong>
              <span style="color: #888;">${b.author.role}</span>
            </div>
          </div>
        </header>

        <div style="margin-bottom: 32px; border-radius: 12px; overflow: hidden;">
          <img src="${b.coverImage}" alt="${b.title}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 12px;" />
        </div>

        <div style="background: rgba(230,181,102,0.08); border-left: 4px solid #E6B566; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
          <strong style="color: #E6B566; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Executive Summary &amp; Key Takeaways:</strong>
          <p style="color: #eee; font-size: 15px; line-height: 1.7; margin: 0;">${b.excerpt}</p>
        </div>

        <div style="color: #ccc; font-size: 16px; line-height: 1.8;">
          ${b.content}
        </div>

        ${b.faqs && b.faqs.length > 0 ? `
          <section style="margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1);">
            <h2 style="font-size: 24px; color: #E6B566; margin-bottom: 20px;">Frequently Asked Questions</h2>
            ${b.faqs.map(faq => `
              <div style="margin-bottom: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 18px;">
                <h3 style="font-size: 16px; color: #fff; margin-top: 0; margin-bottom: 8px;">${faq.question}</h3>
                <p style="font-size: 14px; color: #bbb; line-height: 1.6; margin: 0;">${faq.answer}</p>
              </div>
            `).join("")}
          </section>
        ` : ""}

        <div style="text-align: center; margin-top: 48px; padding: 32px; background: rgba(230,181,102,0.1); border: 1px solid rgba(230,181,102,0.3); border-radius: 12px;">
          <h3 style="font-size: 22px; color: #fff; margin-bottom: 10px;">Planning an Interior or Construction Project in Jaipur?</h3>
          <p style="color: #ccc; font-size: 15px; margin-bottom: 20px;">Get an itemized BOQ estimate, architectural drawings, and material guidance tailored to your site.</p>
          <a href="https://wa.me/918854883058" style="background: #E6B566; color: #070D18; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">
            Consult with Architect on WhatsApp
          </a>
        </div>
      </article>
    `
  };
}

// Fetch all live blog posts dynamically from Sanity.io CMS during build time
async function fetchSanityBlogPosts() {
  const projectId = process.env.VITE_SANITY_PROJECT_ID || "b0rnzdhr";
  const dataset = process.env.VITE_SANITY_DATASET || "production";
  const apiVersion = process.env.VITE_SANITY_API_VERSION || "2024-01-01";

  const query = `*[_type == "blogPost"] | order(publishedAt desc, _createdAt desc) {
    _id,
    "slug": slug.current,
    title,
    subtitle,
    category,
    excerpt,
    readingTime,
    publishedAt,
    tags,
    content,
    faqs,
    seoTitle,
    seoDescription,
    seoKeywords,
    "coverImage": coalesce(coverImage.asset->url, coverImageUrl, coverImage),
    "coverImageAlt": coverImage.alt,
    "coverImageCaption": coverImage.caption,
    "author": coalesce(
      author->{
        name,
        role,
        "image": coalesce(image.asset->url, "/assets/team/Nikhil/Nikhil-480.jpeg"),
        "bio": description
      },
      customAuthor{
        name,
        role,
        "image": coalesce(image.asset->url, imageUrl, "/assets/team/Nikhil/Nikhil-480.jpeg"),
        bio
      },
      {
        "name": "Nikhil Sain",
        "role": "Lead Architect & Interior Designer",
        "image": "/assets/team/Nikhil/Nikhil-480.jpeg",
        "bio": "Lead Architect & Interior Designer at Younick Design Studio."
      }
    )
  }`;

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const json = await res.json();
      if (json && json.result && Array.isArray(json.result) && json.result.length > 0) {
        console.log(`✅ Retrieved ${json.result.length} live blog posts dynamically from Sanity CMS!`);
        const sanityItems = json.result.map(b => ({
          slug: b.slug || b._id,
          title: b.title || "Architectural Guide",
          subtitle: b.subtitle || "",
          category: b.category || "Cost & Budgeting",
          excerpt: b.excerpt || "",
          author: b.author || { name: "Nikhil Sain", role: "Lead Architect & Interior Designer" },
          publishedAt: b.publishedAt || "2026-08-01",
          readingTime: b.readingTime || "7 min read",
          coverImage: b.coverImage || "/assets/services/interior-design3.jpg",
          coverImageAlt: b.coverImageAlt || b.title,
          coverImageCaption: b.coverImageCaption || "",
          tags: b.tags || ["Architecture", "Interior Design"],
          seoTitle: b.seoTitle,
          seoDescription: b.seoDescription,
          seoKeywords: b.seoKeywords,
          faqs: b.faqs || [],
          content: b.content || ""
        }));

        const sanitySlugs = new Set(sanityItems.map(p => p.slug));
        const merged = [...sanityItems];
        for (const def of defaultBlogItems) {
          if (!sanitySlugs.has(def.slug)) {
            merged.push(def);
          }
        }
        return merged;
      }
    }
  } catch (err) {
    // offline or no blog posts in Sanity yet
  }

  return defaultBlogItems;
}

// Fetch all live projects dynamically from Sanity.io CMS during build time
async function fetchSanityProjects() {
  const projectId = process.env.VITE_SANITY_PROJECT_ID || "b0rnzdhr";
  const dataset = process.env.VITE_SANITY_DATASET || "production";
  const apiVersion = process.env.VITE_SANITY_API_VERSION || "2024-01-01";

  const query = `*[_type == "project"] | order(orderRank asc, _createdAt desc) {
    _id,
    "slug": slug.current,
    title,
    subtitle,
    category,
    location,
    area,
    budget,
    completionDate,
    description,
    longDescription,
    outcome,
    workScope,
    "image": coalesce(image.asset->url, image),
    "images": coalesce(images[].asset->url, [image.asset->url])
  }`;

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    console.log(`📡 Connecting to Sanity CMS (Project ID: ${projectId}, Dataset: ${dataset})...`);
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      console.warn(`⚠️ Sanity query responded with status ${res.status}. Using fallback project manifest.`);
      return defaultProjectItems;
    }
    const json = await res.json();
    if (json && json.result && Array.isArray(json.result) && json.result.length > 0) {
      console.log(`✅ Retrieved ${json.result.length} live projects dynamically from Sanity CMS!`);
      const sanityItems = json.result.map(p => {
        const slug = p.slug || p._id;
        const name = p.title || "Untitled Project";
        const cat = p.category || "Architecture";
        const loc = p.location || "Jaipur, Rajasthan";
        const desc = p.description || `Luxury ${cat} project delivered by Younick Design Studio in ${loc}.`;
        const longDesc = p.longDescription || desc;
        const outcome = p.outcome || "Delivered a premium architectural environment tailored to the client's specifications.";
        const workScope = Array.isArray(p.workScope) && p.workScope.length > 0 ? p.workScope : [cat, "Turnkey Execution", "Design Consultation"];
        const image = p.image || "/assets/og/hero-1200.webp";

        return {
          slug,
          name,
          title: `${name} — ${p.subtitle || cat} in Jaipur | Younick Studio`,
          subtitle: p.subtitle || `${cat} • ${loc}`,
          category: cat,
          location: loc,
          area: p.area || "Custom Floor Plate",
          budget: p.budget || "Turnkey Scope",
          completionDate: p.completionDate || "Recently Handed Over",
          image,
          description: desc,
          longDescription: longDesc,
          outcome,
          workScope
        };
      });

      // Merge: ensure any local fallback projects not in Sanity are preserved
      const sanitySlugs = new Set(sanityItems.map(p => p.slug));
      const merged = [...sanityItems];
      for (const def of defaultProjectItems) {
        if (!sanitySlugs.has(def.slug)) {
          merged.push(def);
        }
      }
      return merged;
    }
  } catch (err) {
    console.warn(`⚠️ Could not reach Sanity API (${err.message}). Using fallback project manifest.`);
  }

  return defaultProjectItems;
}

// Function returning all routes configured with dynamic project items and blog articles
function getRoutes(projectItems, blogItems = []) {
  return [
  // 1. HOME
  {
    path: "/",
    title: "Best Interior Designer in Jaipur | Younick Design Studio",
    description: "Award-winning interior design, turnkey construction, and 3D architectural visualization studio in Civil Lines, Jaipur. Contact Younick Design Studio.",
    keywords: "best interior designer in jaipur, interior design jaipur, turnkey interior contractor jaipur, luxury interior designers rajasthan, commercial gym interior jaipur, hospital design consultancy jaipur, villa interior designers civil lines, home renovation jaipur, 3d visualization studio jaipur",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: STUDIO_NAME,
          alternateName: ["Younick Studio", "Younick Design Studio Jaipur", "YDS"],
          description: "Premier luxury interior design, turnkey construction, and 3D architectural visualization studio in Jaipur, Rajasthan.",
          inLanguage: "en-IN"
        },
        baseOrganizationSchema
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Best Interior Designer in Jaipur — Younick Design Studio | Turnkey Architecture &amp; Luxury Interiors
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 24px;">
          Welcome to <strong>Younick Design Studio</strong>, an award-winning interior design, turnkey civil construction, luxury home renovation, and 3D photorealistic architectural visualization practice headquartered in Civil Lines, Jaipur, Rajasthan. With <strong>14+ signature projects delivered</strong>, <strong>5 turnkey services</strong>, and a <strong>4.9★ client rating from 128+ reviews</strong>, our studio delivers bespoke spatial architecture for high-end residences, luxury villas, commercial showrooms, corporate offices, and healthcare facilities across Rajasthan. Residential interior design starts from <strong>₹1,200 per sq. ft</strong>.
        </p>
        <p style="font-size: 15px; line-height: 1.8; color: #bbb; margin-bottom: 32px;">
          Under the leadership of Nikhil Sain and Kamal Rajoriya, our design philosophy balances material honesty, timeless aesthetics, and uncompromising engineering precision. From bespoke teak joinery, Italian marble floorings, and smart home automation to structural civil alterations and turnkey project management, we transform raw spaces into timeless environments built for living.
        </p>

        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; color: #fff; margin-bottom: 16px; border-bottom: 1px solid rgba(230,181,102,0.3); padding-bottom: 8px;">
            Comprehensive Turnkey Interior &amp; Architectural Services in Jaipur
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #E6B566; margin-bottom: 10px;"><a href="/services/interior-design" style="color: #E6B566; text-decoration: none;">1. Luxury Residential &amp; Villa Interior Design</a></h3>
              <p style="font-size: 14px; color: #aaa; line-height: 1.6;">Specializing in 3BHK, 4BHK, 5BHK luxury apartments, penthouses, and bespoke heritage bungalows in Civil Lines, C-Scheme, Vaishali Nagar, Mansarovar, and Jagatpura.</p>
              <a href="/services/interior-design" style="display: inline-block; margin-top: 12px; color: #fff; font-weight: 500; font-size: 13px;">Explore Interior Design &rarr;</a>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #E6B566; margin-bottom: 10px;"><a href="/services/construction" style="color: #E6B566; text-decoration: none;">2. Turnkey Civil Construction &amp; Structural Execution</a></h3>
              <p style="font-size: 14px; color: #aaa; line-height: 1.6;">End-to-end civil engineering and material execution using certified IS-grade steel, cement, and boiling waterproof (BWP/BWR) plywood with strict milestone tracking.</p>
              <a href="/services/construction" style="display: inline-block; margin-top: 12px; color: #fff; font-weight: 500; font-size: 13px;">Explore Turnkey Construction &rarr;</a>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #E6B566; margin-bottom: 10px;"><a href="/services/renovation" style="color: #E6B566; text-decoration: none;">3. Full-Scale Renovation &amp; Remodeling</a></h3>
              <p style="font-size: 14px; color: #aaa; line-height: 1.6;">Rejuvenating outdated homes, ancestral havelis, and commercial spaces through structural wall modifications, plumbing retrofitting, and spatial layout optimization.</p>
              <a href="/services/renovation" style="display: inline-block; margin-top: 12px; color: #fff; font-weight: 500; font-size: 13px;">Explore Renovation Services &rarr;</a>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #E6B566; margin-bottom: 10px;"><a href="/services/3d-visualization" style="color: #E6B566; text-decoration: none;">4. 3D Architectural Visualization &amp; Walkthroughs</a></h3>
              <p style="font-size: 14px; color: #aaa; line-height: 1.6;">High-fidelity 3D modeling, lighting simulation, walkthrough animations, and CAD construction drawings before execution begins.</p>
              <a href="/services/3d-visualization" style="display: inline-block; margin-top: 12px; color: #fff; font-weight: 500; font-size: 13px;">Explore 3D Visualization &rarr;</a>
            </div>
          </div>
        </section>

        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 16px;">Frequently Asked Questions (FAQ)</h2>
          <div style="margin-bottom: 16px;">
            <h3 style="color: #E6B566; font-size: 16px;">How much does interior design cost in Jaipur?</h3>
            <p style="color: #aaa; font-size: 14px; line-height: 1.6;">Turnkey residential interior design in Jaipur typically ranges from ₹1,200 to ₹2,500+ per sq. ft. for premium homes (including custom woodwork, modular kitchen, false ceilings, lighting, and premium paint). Luxury villa executions scale based on Italian marble, automation, and bespoke furniture.</p>
          </div>
          <div style="margin-bottom: 16px;">
            <h3 style="color: #E6B566; font-size: 16px;">What are the advantages of turnkey interior execution?</h3>
            <p style="color: #aaa; font-size: 14px; line-height: 1.6;">Turnkey execution provides single-point responsibility where Younick Design Studio handles design, 3D visualization, material procurement, carpentry, civil work, electrical, plumbing, and site management with guaranteed timelines.</p>
          </div>
        </section>
      </article>
    `
  },

  // 2. ABOUT
  {
    path: "/about",
    title: "About Our Luxury Architecture & Interior Studio in Jaipur | Younick",
    description: "Learn about Younick Design Studio in Jaipur — our turnkey craftsmanship, architectural philosophy, and the interior designers crafting luxury spaces in Rajasthan.",
    keywords: "about younick design studio, interior designer profile jaipur, luxury architects rajasthan, interior design firm civil lines jaipur",
    image: `${SITE_URL}/younick-about-hero.webp`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": `${SITE_URL}/about#webpage`,
          url: `${SITE_URL}/about`,
          name: "About Younick Design Studio Jaipur",
          description: "Learn about Younick Design Studio in Jaipur — our turnkey craftsmanship, architectural philosophy, and the interior designers crafting luxury spaces.",
          inLanguage: "en-IN"
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" }
        ]),
        baseOrganizationSchema
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <span>About Us</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          About Younick Design Studio — Premier Architecture &amp; Turnkey Interior Practice in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 24px;">
          Founded with a vision to redefine spatial architecture in Rajasthan, <strong>Younick Design Studio</strong> is a comprehensive interior architecture, turnkey construction, and 3D visualization firm based in Orbit Mall, Civil Lines, Jaipur. We believe spaces should not merely be decorated; they should be engineered to reflect identity, evoke emotion, and endure gracefully through decades.
        </p>

        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; color: #fff; margin-bottom: 16px; border-bottom: 1px solid rgba(230,181,102,0.3); padding-bottom: 8px;">
            The 4-Step Architectural Blueprint
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="font-size: 12px; font-weight: bold; color: #E6B566;">PHASE 01</span>
              <h3 style="color: #fff; margin: 8px 0;">Discover &amp; Dialogue</h3>
              <p style="font-size: 14px; color: #aaa; line-height: 1.6;">Lifestyle mapping, sunpath analysis, daily routine audits, and establishing functional budget intent.</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="font-size: 12px; font-weight: bold; color: #E6B566;">PHASE 02</span>
              <h3 style="color: #fff; margin: 8px 0;">Conceive &amp; Visualize</h3>
              <p style="font-size: 14px; color: #aaa; line-height: 1.6;">High-resolution 3D photorealistic visualization, lighting simulations, and material sample curation.</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="font-size: 12px; font-weight: bold; color: #E6B566;">PHASE 03</span>
              <h3 style="color: #fff; margin: 8px 0;">Detail &amp; Engineer</h3>
              <p style="font-size: 14px; color: #aaa; line-height: 1.6;">Millimeter-accurate working CAD drawings, electrical-plumbing schematics, and itemized transparent BOQs.</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="font-size: 12px; font-weight: bold; color: #E6B566;">PHASE 04</span>
              <h3 style="color: #fff; margin: 8px 0;">Construct &amp; Deliver</h3>
              <p style="font-size: 14px; color: #aaa; line-height: 1.6;">Dedicated on-site supervision, IS-grade material execution, milestone tracking, and white-glove handover.</p>
            </div>
          </div>
        </section>

        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; color: #fff; margin-bottom: 16px;">Leadership &amp; Architectural Direction</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #E6B566; margin-bottom: 4px;">Nikhil Sain</h3>
              <p style="color: #888; font-size: 13px; margin-bottom: 12px;">Founder &amp; Lead Interior Designer</p>
              <p style="font-size: 14px; color: #bbb; line-height: 1.6;">Pursued Master's at Arch College of Interior &amp; Business in 2017. Specializes in luxury spatial layouts, bespoke woodwork, and architectural lighting orchestration.</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #E6B566; margin-bottom: 4px;">Kamal Rajoriya</h3>
              <p style="color: #888; font-size: 13px; margin-bottom: 12px;">Co-Founder &amp; Civil Engineering Lead</p>
              <p style="font-size: 14px; color: #bbb; line-height: 1.6;">Graduate in Civil Engineering from UEM Jaipur. Oversees structural durability, site logistics, quality assurance, and on-schedule execution milestones.</p>
            </div>
          </div>
        </section>

        <div style="text-align: center; margin-top: 40px;">
          <a href="/contact" style="background: #E6B566; color: #070D18; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Schedule an Architectural Dialogue</a>
        </div>
      </article>
    `
  },

  // 3. SERVICES OVERVIEW
  {
    path: "/services",
    title: "Turnkey Interior Design & Construction Services in Jaipur | Younick Studio",
    description: "Bespoke residential interior design, turnkey civil construction, villa renovation, 3D visualization, and architectural consultation in Jaipur, Rajasthan.",
    keywords: "interior design services jaipur, turnkey construction rajasthan, home renovation jaipur, 3d visualization studio, interior styling civil lines",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/services#webpage`,
          url: `${SITE_URL}/services`,
          name: "Turnkey Interior & Architectural Services — Younick Studio Jaipur",
          description: "Explore our complete range of turnkey interior design, civil construction, 3D architectural rendering, and home remodeling services.",
          inLanguage: "en-IN"
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" }
        ]),
        baseOrganizationSchema
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <span>Services</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Turnkey Interior Design, Civil Construction &amp; Architectural Services in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 32px;">
          At Younick Design Studio, our turnkey methodology eliminates contractor confusion, unexpected budget escalations, and project delays. We provide single-point accountability across five core architectural disciplines.
        </p>

        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="background: rgba(255,255,255,0.03); padding: 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 22px; margin-bottom: 8px;"><a href="/services/interior-design" style="color: #E6B566; text-decoration: none;">1. Luxury Interior Design &amp; Styling</a></h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7; margin-bottom: 12px;">Turnkey interior architecture for luxury villas, 3BHK/4BHK apartments, and commercial penthouses in Jaipur. Includes modular kitchens with Blum/Hettich hardware, bespoke teak woodwork, Italian marble flooring, and smart automation.</p>
            <p style="font-size: 13px; color: #888; margin-bottom: 14px;"><strong>Timeline:</strong> 4 - 8 Weeks | <strong>Starting From:</strong> ₹1,200 / sq. ft.</p>
            <a href="/services/interior-design" style="color: #E6B566; font-weight: bold; text-decoration: none; font-size: 14px;">View Full Interior Design Specifications &rarr;</a>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 22px; margin-bottom: 8px;"><a href="/services/construction" style="color: #E6B566; text-decoration: none;">2. Turnkey Construction &amp; Civil Works</a></h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7; margin-bottom: 12px;">End-to-end structural civil contracting from foundation excavation to RCC structure and final finishing. Executed using certified IS-grade steel, UltraTech cement, and rigorous on-site architectural supervision.</p>
            <p style="font-size: 13px; color: #888; margin-bottom: 14px;"><strong>Timeline:</strong> 4 - 8 Months | <strong>Landmarks:</strong> Hera Mahal (6,000 sq ft civil build)</p>
            <a href="/services/construction" style="color: #E6B566; font-weight: bold; text-decoration: none; font-size: 14px;">View Turnkey Construction Details &rarr;</a>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 22px; margin-bottom: 8px;"><a href="/services/renovation" style="color: #E6B566; text-decoration: none;">3. Architectural Renovation &amp; Remodeling</a></h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7; margin-bottom: 12px;">Transforming outdated residences, ancestral havelis, and retail showrooms into modern spatial landmarks. Complete structural wall removals, plumbing overhauls, and contemporary interior revamps.</p>
            <p style="font-size: 13px; color: #888; margin-bottom: 14px;"><strong>Timeline:</strong> 3 - 6 Weeks | <strong>Recent:</strong> Goyal Residence, Tonk Road Foyer</p>
            <a href="/services/renovation" style="color: #E6B566; font-weight: bold; text-decoration: none; font-size: 14px;">View Renovation &amp; Remodeling Scope &rarr;</a>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 22px; margin-bottom: 8px;"><a href="/services/consultation" style="color: #E6B566; text-decoration: none;">4. Architectural &amp; Interior Consultation</a></h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7; margin-bottom: 12px;">1-on-1 strategic spatial advisory covering 2D floor plans, Vastu compliance, itemized BOQ budgeting, and certified material procurement recommendations.</p>
            <p style="font-size: 13px; color: #888; margin-bottom: 14px;"><strong>Timeline:</strong> 3 - 7 Days | <strong>Delivery:</strong> Detailed Architectural Brief &amp; 2D CAD Plans</p>
            <a href="/services/consultation" style="color: #E6B566; font-weight: bold; text-decoration: none; font-size: 14px;">Book an Architectural Consultation &rarr;</a>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 22px; margin-bottom: 8px;"><a href="/services/3d-visualization" style="color: #E6B566; text-decoration: none;">5. 3D Architectural Visualization &amp; Walkthroughs</a></h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7; margin-bottom: 12px;">Ultra-photorealistic 3D interior renders, 3D exterior elevations, daylight/dusk lighting simulations, and 4K cinematic video walkthroughs.</p>
            <p style="font-size: 13px; color: #888; margin-bottom: 14px;"><strong>Timeline:</strong> 5 - 10 Days | <strong>Resolution:</strong> 4K UHD Photorealistic CGI</p>
            <a href="/services/3d-visualization" style="color: #E6B566; font-weight: bold; text-decoration: none; font-size: 14px;">Explore 3D Visualization Capabilities &rarr;</a>
          </div>
        </div>
      </article>
    `
  },

  // 4. SERVICE DETAIL: /services/interior-design
  {
    path: "/services/interior-design",
    title: "Luxury Interior Design & Styling in Jaipur | Younick Studio",
    description: "Transform your villa or home with bespoke luxury interior design in Jaipur. Smart spatial layouts, Italian marble finishes, modular kitchens, and custom woodwork.",
    keywords: "interior designers in jaipur, luxury villa interior design jaipur, modular kitchen jaipur, living room interiors rajasthan, bespoke woodwork jaipur, turnkey residential interiors civil lines",
    image: `${SITE_URL}/assets/services/interior-design3.jpg`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${SITE_URL}/services/interior-design#service`,
          name: "Luxury Interior Design & Styling in Jaipur",
          serviceType: "Interior Architecture & Design",
          description: "Transform your villa or home with bespoke luxury interior design in Jaipur. Smart spatial layouts, Italian marble finishes, modular kitchens, and custom woodwork.",
          provider: baseOrganizationSchema,
          areaServed: baseOrganizationSchema.areaServed,
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "1200",
              unitText: "per sq ft"
            }
          }
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Luxury Interior Design", url: "/services/interior-design" }
        ])
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <a href="/services" style="color: #E6B566; text-decoration: none;">Services</a> &gt; <span>Interior Design</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Luxury Interior Design &amp; Styling in Jaipur — Bespoke Residential Architecture
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 24px;">
          Specializing in 3BHK, 4BHK, 5BHK luxury apartments, penthouses, and bespoke heritage bungalows in <strong>Civil Lines, C-Scheme, Vaishali Nagar, Mansarovar, Malviya Nagar, and Jagatpura</strong>. Younick Design Studio crafts bespoke living environments blending ergonomic functionality with timeless luxury aesthetics.
        </p>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 16px; border-bottom: 1px solid rgba(230,181,102,0.3); padding-bottom: 8px;">
            Key Interior Design Deliverables
          </h2>
          <ul style="color: #bbb; font-size: 15px; line-height: 2; padding-left: 20px;">
            <li><strong>Spatial Architecture &amp; Custom Layouts:</strong> Optimal circulation, lifestyle-aligned zoning, and acoustic planning.</li>
            <li><strong>Bespoke Woodwork &amp; Modular Kitchens:</strong> Certified BWP plywood, Blum/Hettich soft-close hardware, quartz &amp; acrylic finishes.</li>
            <li><strong>Architectural Lighting &amp; Ambiance:</strong> Calibrated 3000K warm cove profiles, magnetic track lighting, and scene automation.</li>
            <li><strong>Luxury Material Curation:</strong> Imported Italian marble (Statuario, Botticino), natural veneers, brass accents, and fluted acoustic panels.</li>
            <li><strong>Color Psychology &amp; Styling:</strong> Curated designer fabrics, bespoke upholstery, statement rugs, and art curation.</li>
          </ul>
        </section>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 16px;">Execution Timeline &amp; Cost Guidelines</h2>
          <p style="color: #aaa; font-size: 15px; line-height: 1.7;">
            <strong>Typical Execution Duration:</strong> 4 to 8 Weeks from finalized 3D renders.<br>
            <strong>Pricing Guideline:</strong> Starting from ₹1,200 to ₹2,500+ per sq. ft. for premium turnkey residences in Jaipur.
          </p>
        </section>

        <div style="text-align: center; margin-top: 40px;">
          <a href="/contact" style="background: #E6B566; color: #070D18; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Book Your Interior Design Consultation</a>
        </div>
      </article>
    `
  },

  // 5. SERVICE DETAIL: /services/construction
  {
    path: "/services/construction",
    title: "Turnkey Construction & Civil Works in Jaipur | Younick Studio",
    description: "End-to-end turnkey construction and civil contracting in Jaipur. Structural execution, foundation-to-finish precision, and premium material quality.",
    keywords: "turnkey construction jaipur, building contractors jaipur, civil work rajasthan, architectural build jaipur, structural civil engineering",
    image: `${SITE_URL}/assets/services/construction.avif`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${SITE_URL}/services/construction#service`,
          name: "Turnkey Civil Construction & Contracting in Jaipur",
          serviceType: "Civil Construction & Structural Engineering",
          description: "End-to-end turnkey construction and civil contracting in Jaipur. Structural execution, foundation-to-finish precision, and premium material quality.",
          provider: baseOrganizationSchema,
          areaServed: baseOrganizationSchema.areaServed
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Turnkey Construction", url: "/services/construction" }
        ])
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <a href="/services" style="color: #E6B566; text-decoration: none;">Services</a> &gt; <span>Construction</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Turnkey Construction &amp; Civil Engineering in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 24px;">
          From excavation and foundation laying to RCC frame construction, brick masonry, and precision MEP (mechanical, electrical, plumbing) installations, Younick Design Studio executes turnkey builds with rigorous engineering standards.
        </p>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 16px; border-bottom: 1px solid rgba(230,181,102,0.3); padding-bottom: 8px;">
            Structural Capabilities &amp; Standards
          </h2>
          <ul style="color: #bbb; font-size: 15px; line-height: 2; padding-left: 20px;">
            <li><strong>Certified Materials:</strong> Fe 550D TMT steel bars, certified 43/53 grade cement, anti-termite foundation treatment.</li>
            <li><strong>Daily On-Site Civil Supervision:</strong> Project managers track concrete slump, curing timelines, and dimensional tolerances.</li>
            <li><strong>Transparent Procurement:</strong> Itemized material logs and milestone verification before stage payments.</li>
            <li><strong>Signature Civil Project:</strong> Hera Mahal — 6,000 sq ft luxury civil construction delivered in Jaipur.</li>
          </ul>
        </section>

        <div style="text-align: center; margin-top: 40px;">
          <a href="/contact" style="background: #E6B566; color: #070D18; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Discuss Your Construction Project</a>
        </div>
      </article>
    `
  },

  // 6. SERVICE DETAIL: /services/renovation
  {
    path: "/services/renovation",
    title: "Architectural Renovation & Remodeling in Jaipur | Younick Studio",
    description: "Premium home, villa, and commercial renovation services in Jaipur. Structural remodeling, contemporary interior revamps, and turnkey execution.",
    keywords: "home renovation jaipur, villa remodeling rajasthan, commercial interior renovation, turnkey restoration jaipur, heritage haveli restoration",
    image: `${SITE_URL}/assets/services/renovation.avif`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${SITE_URL}/services/renovation#service`,
          name: "Architectural Renovation & Remodeling in Jaipur",
          serviceType: "Architectural Renovation",
          description: "Premium home, villa, and commercial renovation services in Jaipur. Structural remodeling, contemporary interior revamps, and turnkey execution.",
          provider: baseOrganizationSchema,
          areaServed: baseOrganizationSchema.areaServed
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Renovation", url: "/services/renovation" }
        ])
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <a href="/services" style="color: #E6B566; text-decoration: none;">Services</a> &gt; <span>Renovation</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Architectural Renovation &amp; Remodeling in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 24px;">
          Breathing new architectural life into aging villas, residential apartments, and retail boutiques across Jaipur. We handle load-bearing wall modifications, plumbing replacements, modern waterproofing, and full spatial overhauls.
        </p>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 16px; border-bottom: 1px solid rgba(230,181,102,0.3); padding-bottom: 8px;">
            Renovation Scope of Work
          </h2>
          <ul style="color: #bbb; font-size: 15px; line-height: 2; padding-left: 20px;">
            <li><strong>Structural Layout Optimization:</strong> Demolishing partition walls to create expansive open-concept living and dining zones.</li>
            <li><strong>Complete Wet-Area Overhauls:</strong> Re-plumbing bathrooms with concealed diverters, Italian marble claddings, and zero-leak waterproofing.</li>
            <li><strong>Electrical &amp; False Ceiling Upgrades:</strong> Concealed conduits, energy-efficient LED profiles, and smart home automation retrofits.</li>
            <li><strong>Proven Handover Records:</strong> Mr. Goyal's Full Residence Overhaul; Entrance Foyer Renovation (Tonk Road, Jaipur).</li>
          </ul>
        </section>

        <div style="text-align: center; margin-top: 40px;">
          <a href="/contact" style="background: #E6B566; color: #070D18; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Get a Renovation Estimate</a>
        </div>
      </article>
    `
  },

  // 7. SERVICE DETAIL: /services/consultation
  {
    path: "/services/consultation",
    title: "Architectural & Interior Design Consultation in Jaipur | Younick Studio",
    description: "Expert architectural and spatial design consultation in Jaipur. Feasibility analysis, 2D floor plans, material guidance, and cost budgeting.",
    keywords: "interior design consultation jaipur, architect consultation rajasthan, spatial planning jaipur, interior cost estimate jaipur, vastu consultation jaipur",
    image: `${SITE_URL}/assets/services/consultation.avif`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${SITE_URL}/services/consultation#service`,
          name: "Architectural & Interior Design Consultation in Jaipur",
          serviceType: "Architectural Consultation",
          description: "Expert architectural and spatial design consultation in Jaipur. Feasibility analysis, 2D floor plans, material guidance, and cost budgeting.",
          provider: baseOrganizationSchema,
          areaServed: baseOrganizationSchema.areaServed
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Consultation", url: "/services/consultation" }
        ])
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <a href="/services" style="color: #E6B566; text-decoration: none;">Services</a> &gt; <span>Consultation</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Architectural &amp; Interior Design Consultation in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 24px;">
          Before investing lakhs into construction or interior work, our consultation service gives you complete clarity. We analyze structural feasibility, optimize space zoning, provide Vastu alignment, and deliver transparent BOQ cost estimates.
        </p>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 16px; border-bottom: 1px solid rgba(230,181,102,0.3); padding-bottom: 8px;">
            What You Receive
          </h2>
          <ul style="color: #bbb; font-size: 15px; line-height: 2; padding-left: 20px;">
            <li>2D Spatial Concept &amp; Furniture Layout CAD Drawings</li>
            <li>Detailed Bill of Quantities (BOQ) with transparent market rate benchmarks</li>
            <li>Material Selection Guide (Plywood grades, laminates, marbles, fittings)</li>
            <li>Timeline &amp; contractor coordination roadmap</li>
          </ul>
        </section>

        <div style="text-align: center; margin-top: 40px;">
          <a href="/contact" style="background: #E6B566; color: #070D18; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Book Your 1-on-1 Consultation</a>
        </div>
      </article>
    `
  },

  // 8. SERVICE DETAIL: /services/3d-visualization
  {
    path: "/services/3d-visualization",
    title: "3D Architectural Visualization & Walkthroughs in Jaipur | Younick Studio",
    description: "Photorealistic 3D interior renders, 3D exterior elevations, and immersive architectural video walkthroughs in Jaipur and Rajasthan.",
    keywords: "3d architectural rendering jaipur, 3d elevation design rajasthan, interior 3d walkthrough jaipur, cgi architectural rendering, 3d interior designer jaipur",
    image: `${SITE_URL}/assets/services/3d-visualization.jpg`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${SITE_URL}/services/3d-visualization#service`,
          name: "3D Architectural Visualization & Walkthroughs in Jaipur",
          serviceType: "3D Architectural Visualization",
          description: "Photorealistic 3D interior renders, 3D exterior elevations, and immersive architectural video walkthroughs in Jaipur and Rajasthan.",
          provider: baseOrganizationSchema,
          areaServed: baseOrganizationSchema.areaServed
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "3D Visualization", url: "/services/3d-visualization" }
        ])
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <a href="/services" style="color: #E6B566; text-decoration: none;">Services</a> &gt; <span>3D Visualization</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          3D Architectural Visualization &amp; Walkthroughs in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 24px;">
          Experience your residence, villa, or commercial property in lifelike photorealism before breaking ground. Our 3D CGI studio produces high-fidelity still renderings, daylight/night artificial lighting studies, and 4K animated video walkthroughs.
        </p>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 16px; border-bottom: 1px solid rgba(230,181,102,0.3); padding-bottom: 8px;">
            CGI &amp; Rendering Deliverables
          </h2>
          <ul style="color: #bbb; font-size: 15px; line-height: 2; padding-left: 20px;">
            <li><strong>High-Resolution Photorealistic Renders:</strong> Calibrated material reflections, depth of field, and accurate surface textures.</li>
            <li><strong>3D Exterior Elevations:</strong> Modern, classical, and contemporary façade designs for luxury villas and bungalows.</li>
            <li><strong>Architectural Lighting Simulation:</strong> Natural solar angles, shadow analysis, and 3000K warm interior illumination studies.</li>
            <li><strong>Turnaround:</strong> 5 to 10 Days with full revision rounds.</li>
          </ul>
        </section>

        <div style="text-align: center; margin-top: 40px;">
          <a href="/contact" style="background: #E6B566; color: #070D18; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Request 3D Rendering Estimate</a>
        </div>
      </article>
    `
  },

  // 9. PROJECTS PORTFOLIO
  {
    path: "/projects",
    title: "Interior Design & Architecture Projects in Jaipur | Younick Studio Portfolio",
    description: "Explore our portfolio of luxury residential villas, turnkey commercial spaces, and bespoke interior renovations executed by Younick Studio in Jaipur.",
    keywords: "interior design portfolio jaipur, completed architecture projects rajasthan, luxury villa interior photos, commercial showroom design jaipur",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/projects#webpage`,
          url: `${SITE_URL}/projects`,
          name: "Architectural & Interior Design Portfolio — Younick Studio Jaipur",
          description: "Portfolio of completed luxury residential interiors, turnkey civil builds, and commercial renovations in Jaipur, Rajasthan.",
          inLanguage: "en-IN"
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" }
        ]),
        baseOrganizationSchema
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <span>Projects</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Completed Architecture &amp; Interior Design Portfolio in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 32px;">
          Explore our signature executions spanning luxury residences, commercial gym facilities, high-end retail showrooms, and institutional landmarks across Jaipur and Rajasthan.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          ${projectItems.map(p => `
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <a href="/projects/${p.slug}" style="text-decoration: none; color: inherit;">
                <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; background: rgba(230,181,102,0.15); color: #E6B566; font-size: 11px; text-transform: uppercase; font-weight: 600; margin-bottom: 8px;">
                  ${p.category}
                </span>
                <h2 style="color: #fff; font-size: 20px; margin-bottom: 6px;">${p.name}</h2>
                <p style="color: #E6B566; font-size: 12px; margin-bottom: 8px;">${p.location} &bull; ${p.area}</p>
                <p style="color: #aaa; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">${p.description}</p>
                <span style="color: #E6B566; font-size: 13px; font-weight: 600;">View Case Study &rarr;</span>
              </a>
            </div>
          `).join("")}
        </div>
      </article>
    `
  },

  // INDIVIDUAL PROJECT CASE-STUDY ROUTES (SSG PRE-RENDERED)
  ...projectItems.map(createProjectRoute),

  // 9b. BLOG HUB
  {
    path: "/blog",
    title: "Interior & Architecture Blog | Younick Design Studio Jaipur",
    description: "Comprehensive 2026 cost guides, material comparisons, Vastu rules, and turnkey civil construction insights for luxury homes and commercial spaces in Jaipur.",
    keywords: "interior design cost jaipur, modular kitchen material jaipur, vastu guidelines luxury villa jaipur, turnkey civil contractor jaipur, 3d architectural rendering jaipur, architecture blog jaipur",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Architectural Blog & Guides | Younick Design Studio Jaipur",
      description: "Expert architectural guides, turnkey construction cost breakdowns, modular kitchen materials, and Vastu guidelines for Jaipur and Rajasthan homeowners.",
      url: `${SITE_URL}/blog`,
      breadcrumb: createBreadcrumbs([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" }
      ])
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 36px; color: #E6B566; margin-bottom: 16px;">
          The Jaipur Interior &amp; Construction Blog
        </h1>
        <p style="font-size: 18px; color: #bbb; line-height: 1.8; margin-bottom: 32px;">
          Architect-verified per-square-foot cost breakdowns, material durability tests for Rajasthan’s climate, and modern Vastu engineering.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          ${blogItems.map(b => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px;">
              <span style="color: #E6B566; font-size: 11px; font-weight: bold; text-transform: uppercase;">${b.category}</span>
              <h2 style="font-size: 20px; margin: 8px 0; color: #fff;">
                <a href="/blog/${b.slug}" style="color: #fff; text-decoration: none;">${b.title}</a>
              </h2>
              <p style="color: #aaa; font-size: 14px; line-height: 1.6;">${b.excerpt}</p>
              <a href="/blog/${b.slug}" style="color: #E6B566; font-weight: bold; font-size: 13px; text-decoration: none; display: inline-block; margin-top: 12px;">Read Full Guide &rarr;</a>
            </div>
          `).join("")}
        </div>
      </article>
    `
  },

  // INDIVIDUAL ARCHITECTURAL & INTERIOR BLOG GUIDES (SSG PRE-RENDERED)
  ...blogItems.map(createBlogRoute),

  // 10. TEAM
  {
    path: "/team",
    title: "Our Architects & Interior Designers in Jaipur | Younick Studio",
    description: "Meet the principal architects, interior designers, 3D visualizers, and turnkey civil engineers behind Younick Design Studio in Civil Lines, Jaipur.",
    keywords: "architects in jaipur, interior design team rajasthan, nikhil sain interior designer, kamal rajoriya civil engineer, younick studio team",
    image: `${SITE_URL}/assets/team/Nikhil/Nikhil-1024.jpeg?v=2`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": `${SITE_URL}/team#webpage`,
          url: `${SITE_URL}/team`,
          name: "Our Team & Architects — Younick Design Studio Jaipur",
          description: "Meet the dedicated architects, interior designers, and project managers of Younick Design Studio.",
          inLanguage: "en-IN"
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Our Team", url: "/team" }
        ]),
        baseOrganizationSchema
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <span>Our Team</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Our Architects &amp; Interior Designers in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 32px;">
          Meet the multidisciplinary minds shaping residential and commercial architecture across Rajasthan. Under the leadership of Nikhil Sain and Kamal Rajoriya, our studio blends artistic creativity with civil precision.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 22px; margin-bottom: 4px;">Nikhil Sain</h2>
            <p style="color: #888; font-size: 13px; margin-bottom: 12px;">Founder &amp; Lead Designer</p>
            <p style="font-size: 14px; color: #bbb; line-height: 1.6;">Master's from Arch College of Interior &amp; Business (2017). Directs spatial layouts, bespoke woodwork, luxury finishes, and design strategy.</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 22px; margin-bottom: 4px;">Kamal Rajoriya</h2>
            <p style="color: #888; font-size: 13px; margin-bottom: 12px;">Co-Founder &amp; Civil Engineering Lead</p>
            <p style="font-size: 14px; color: #bbb; line-height: 1.6;">Civil Engineer from University of Engineering &amp; Management, Jaipur. Manages on-site execution, structural integrity, and contractor workflows.</p>
          </div>
        </div>
      </article>
    `
  },

  // 11. CONTACT
  {
    path: "/contact",
    title: "Contact Luxury Interior Designers in Jaipur | Younick Studio",
    description: "Connect with Younick Design Studio for villa interior design, turnkey construction, and 3D architectural rendering in Orbit Mall, Civil Lines, Jaipur.",
    keywords: "contact interior designer jaipur, interior design studio civil lines jaipur, younick studio phone number, hire interior contractor jaipur",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": `${SITE_URL}/contact#webpage`,
          url: `${SITE_URL}/contact`,
          name: "Contact Younick Design Studio Jaipur",
          description: "Connect with our design studio for consultations on luxury interiors, turnkey civil works, and architectural 3D visualizations.",
          inLanguage: "en-IN"
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Contact Us", url: "/contact" }
        ]),
        baseOrganizationSchema
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <span>Contact Us</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Contact Younick Design Studio — Schedule an Architectural Dialogue
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 32px;">
          Ready to transform your home, villa, or commercial space? Visit our studio in Civil Lines, Jaipur or reach out to our principal designers directly.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 18px; margin-bottom: 10px;">Studio Headquarters</h2>
            <p style="color: #bbb; font-size: 14px; line-height: 1.6;">
              3008, Third Floor, Orbit Mall,<br>
              Civil Lines, Jaipur, Rajasthan 302001, India.
            </p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 18px; margin-bottom: 10px;">Direct Phone &amp; WhatsApp</h2>
            <p style="color: #bbb; font-size: 14px; line-height: 1.6;">
              <strong>Phone:</strong> <a href="tel:+918854883058" style="color: #fff; text-decoration: none;">+91 88548 83058</a><br>
              <strong>WhatsApp:</strong> <a href="https://wa.me/918854883058" style="color: #fff; text-decoration: none;">+91 88548 83058</a>
            </p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 18px; margin-bottom: 10px;">Email &amp; Studio Hours</h2>
            <p style="color: #bbb; font-size: 14px; line-height: 1.6;">
              <strong>Email:</strong> <a href="mailto:studioyounick@gmail.com" style="color: #fff; text-decoration: none;">studioyounick@gmail.com</a><br>
              <strong>Hours:</strong> Mon – Sat: 10:00 AM – 7:00 PM (Sunday by Appointment)
            </p>
          </div>
        </div>
      </article>
    `
  },

  // 12. CAREER
  {
    path: "/career",
    title: "Careers in Interior Design & Architecture | Younick Jaipur",
    description: "Explore job openings and career opportunities for interior designers, architects, and 3D visualizers at Younick Design Studio in Civil Lines, Jaipur.",
    keywords: "interior design careers jaipur, architecture jobs rajasthan, 3d visualizer vacancy jaipur, interior designer hiring jaipur",
    image: `${SITE_URL}/younick-about-hero.webp`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": `${SITE_URL}/career#webpage`,
          url: `${SITE_URL}/career`,
          name: "Careers at Younick Design Studio Jaipur",
          description: "Join our architectural and interior design practice in Jaipur.",
          inLanguage: "en-IN"
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Careers", url: "/career" }
        ]),
        baseOrganizationSchema
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <span>Careers</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Join Our Architectural &amp; Interior Design Practice in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 32px;">
          We are constantly on the lookout for visionary interior designers, detail-oriented architects, master 3D CGI visualizers, and disciplined civil site supervisors who share our passion for architectural precision and timeless aesthetics.
        </p>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 16px;">Open Positions</h2>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #E6B566; font-size: 18px; margin-bottom: 6px;">Senior Interior Designer</h3>
              <p style="color: #aaa; font-size: 14px; line-height: 1.6;">Minimum 3+ years experience in luxury residential villas, AutoCAD working drawings, modular cabinetry detailing, and client presentations.</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #E6B566; font-size: 18px; margin-bottom: 6px;">3D Architectural CGI Visualizer</h3>
              <p style="color: #aaa; font-size: 14px; line-height: 1.6;">Proficiency in 3ds Max / Corona / V-Ray / Blender. Experience with photorealistic interior lighting, material shaders, and animation rendering.</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #E6B566; font-size: 18px; margin-bottom: 6px;">Civil Site Execution Supervisor</h3>
              <p style="color: #aaa; font-size: 14px; line-height: 1.6;">Diploma or Degree in Civil Engineering. Expertise in carpenter management, IS-grade material quality checks, and daily milestone reporting.</p>
            </div>
          </div>
        </section>

        <div style="text-align: center; margin-top: 40px;">
          <p style="color: #aaa; font-size: 15px; margin-bottom: 16px;">To apply, send your portfolio and resume to:</p>
          <a href="mailto:studioyounick@gmail.com?subject=Job%20Application%20at%20Younick%20Studio" style="background: #E6B566; color: #070D18; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Send Resume to studioyounick@gmail.com</a>
        </div>
      </article>
    `
  },

  // 13. FAQ
  {
    path: "/faq",
    title: "Interior Design & Turnkey Cost FAQs | Younick Studio Jaipur",
    description: "Answers to common questions about interior design costs per sq ft, turnkey construction timelines, material warranties, and 3D renders in Jaipur.",
    keywords: "interior design faq jaipur, interior design cost per sq ft jaipur, turnkey timeline rajasthan, interior designer questions jaipur",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/faq#webpage`,
          url: `${SITE_URL}/faq`,
          name: "Interior Design & Turnkey Cost FAQs — Younick Studio",
          mainEntity: [
            {
              "@type": "Question",
              name: "How much does interior design & turnkey execution cost in Jaipur?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Interior design costs in Jaipur typically range from ₹1,200 to ₹2,500+ per sq. ft. for premium turnkey residential projects (including woodwork, false ceiling, lighting, paint, and modular kitchen). Luxury and bespoke villa executions range upwards based on Italian marble, automation, and designer fixtures."
              }
            },
            {
              "@type": "Question",
              name: "What is included in a Turnkey Interior project by Younick Studio?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Turnkey execution means end-to-end responsibility. We handle space planning, 3D visualizations, material procurement (plywood, laminates, hardware, stone), civil modifications, electrical, plumbing, carpentry, painting, and deep cleaning before final handover."
              }
            },
            {
              "@type": "Question",
              name: "What is the typical timeline for a complete residential interior project?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A 3BHK to 4BHK apartment or villa typically requires 6 to 12 weeks from finalized 3D renders to final handover. Commercial fit-outs and retail spaces are fast-tracked within 4 to 8 weeks depending on floor plate size."
              }
            },
            {
              "@type": "Question",
              name: "Do you provide 3D photorealistic visualizations before starting on-site work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! Every project begins with high-fidelity 3D renderings and walkthroughs showing exact materials, textures, lighting, and spatial flow so you experience your space before physical execution begins."
              }
            },
            {
              "@type": "Question",
              name: "Do you take projects outside Jaipur?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! While our primary design studio is located in Civil Lines, Jaipur, we regularly execute luxury villas, commercial gyms, and hospital projects across Sikar, Udaipur, Jodhpur, Kota, and all of Rajasthan, as well as pan-India design consultations."
              }
            },
            {
              "@type": "Question",
              name: "How do you ensure material quality and on-site supervision?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our founders and dedicated project managers conduct structured weekly quality inspections. We use only branded, boiling waterproof (BWR/BWP) plywood, certified electrical cabling, and premium hardware with full warranty documentation."
              }
            }
          ]
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" }
        ]),
        baseOrganizationSchema
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <span>FAQ</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Frequently Asked Questions About Interior Design &amp; Construction in Jaipur
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #ddd; margin-bottom: 32px;">
          Find answers to common questions about interior design costs per square foot, turnkey civil construction timelines, material warranties, and on-site supervision standards in Jaipur.
        </p>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 18px; margin-bottom: 10px;">How much does interior design &amp; turnkey execution cost in Jaipur?</h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7;">Interior design costs in Jaipur typically range from ₹1,200 to ₹2,500+ per sq. ft. for premium turnkey residential projects (including woodwork, false ceiling, lighting, paint, and modular kitchen). Luxury and bespoke villa executions range upwards based on Italian marble, automation, and designer fixtures.</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 18px; margin-bottom: 10px;">What is included in a Turnkey Interior project by Younick Studio?</h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7;">Turnkey execution means end-to-end responsibility. We handle space planning, 3D visualizations, material procurement (plywood, laminates, hardware, stone), civil modifications, electrical, plumbing, carpentry, painting, and deep cleaning before final handover.</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 18px; margin-bottom: 10px;">What is the typical timeline for a complete residential interior project?</h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7;">A 3BHK to 4BHK apartment or villa typically requires 6 to 12 weeks from finalized 3D renders to final handover. Commercial fit-outs and retail spaces are fast-tracked within 4 to 8 weeks depending on floor plate size.</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 18px; margin-bottom: 10px;">Do you provide 3D photorealistic visualizations before starting on-site work?</h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7;">Yes! Every project begins with high-fidelity 3D renderings and walkthroughs showing exact materials, textures, lighting, and spatial flow so you experience your space before physical execution begins.</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 18px; margin-bottom: 10px;">Do you take projects outside Jaipur?</h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7;">Yes! While our primary design studio is located in Civil Lines, Jaipur, we regularly execute luxury villas, commercial gyms, and hospital projects across Sikar, Udaipur, Jodhpur, Kota, and all of Rajasthan, as well as pan-India design consultations.</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E6B566; font-size: 18px; margin-bottom: 10px;">How do you ensure material quality and on-site supervision?</h2>
            <p style="color: #bbb; font-size: 15px; line-height: 1.7;">Our founders and dedicated project managers conduct structured weekly quality inspections. We use only branded, boiling waterproof (BWR/BWP) plywood, certified electrical cabling, and premium hardware with full warranty documentation.</p>
          </div>
        </div>
      </article>
    `
  },

  // 14. PRIVACY POLICY
  {
    path: "/privacy",
    title: "Privacy Policy | Younick Design Studio Jaipur",
    description: "Read the privacy policy of Younick Design Studio regarding client data protection, architectural blueprints, and project confidentiality.",
    keywords: "privacy policy, client confidentiality, data protection, younick design studio",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/privacy#webpage`,
          url: `${SITE_URL}/privacy`,
          name: "Privacy Policy — Younick Design Studio",
          description: "Privacy policy regarding client data protection and architectural blueprint confidentiality.",
          inLanguage: "en-IN"
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" }
        ])
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <span>Privacy Policy</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Privacy Policy — Younick Design Studio
        </h1>
        <p style="font-size: 15px; line-height: 1.8; color: #bbb;">
          At Younick Design Studio, client trust, architectural blueprint confidentiality, and personal data privacy are paramount. Any floor plans, contact details, site photographs, or budget specifications shared with our studio are safeguarded under strict non-disclosure practices.
        </p>
      </article>
    `
  },

  // 15. TERMS OF SERVICE
  {
    path: "/terms",
    title: "Terms of Service & Project Contracts | Younick Studio",
    description: "Review the terms of service, architectural copyright standards, material quality commitments, and turnkey execution guidelines for Younick Studio.",
    keywords: "terms of service, interior design agreement, turnkey contract terms jaipur",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/terms#webpage`,
          url: `${SITE_URL}/terms`,
          name: "Terms of Service — Younick Design Studio",
          description: "Terms of service, architectural execution standards, and client agreements.",
          inLanguage: "en-IN"
        },
        createBreadcrumbs([
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" }
        ])
      ]
    },
    renderBody: () => `
      <article style="max-width: 1200px; margin: 0 auto; padding: 40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #888; margin-bottom: 16px;">
          <a href="/" style="color: #E6B566; text-decoration: none;">Home</a> &gt; <span>Terms of Service</span>
        </nav>
        <h1 style="font-size: 32px; line-height: 1.3; margin-bottom: 20px; color: #E6B566;">
          Terms of Service &amp; Project Execution Guidelines
        </h1>
        <p style="font-size: 15px; line-height: 1.8; color: #bbb;">
          All interior design concepts, 3D renderings, CAD blueprints, and turnkey construction works performed by Younick Design Studio are governed by our written architectural contracts, detailing itemized BOQ specifications, milestone payment schedules, and quality assurance warranties.
        </p>
      </article>
    `
  },

  // 16. 404 NOT FOUND
  {
    path: "/404",
    title: "Page Not Found (404) | Younick Design Studio",
    description: "The requested architectural page could not be located. Explore Younick Design Studio's interior projects, services, and portfolio.",
    keywords: "404 not found, younick design studio",
    image: DEFAULT_IMAGE,
    type: "website",
    noIndex: true,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Page Not Found (404) — Younick Design Studio",
      url: `${SITE_URL}/404`
    },
    renderBody: () => `
      <article style="max-width: 800px; margin: 60px auto; padding: 40px 24px; text-align: center;">
        <h1 style="font-size: 36px; line-height: 1.3; margin-bottom: 16px; color: #E6B566;">
          404 — Architectural Blueprint Not Found
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #bbb; margin-bottom: 24px;">
          The page or blueprint you are looking for has been moved, renamed, or does not exist.
        </p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="/" style="background: #E6B566; color: #070D18; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none;">Return to Homepage</a>
          <a href="/projects" style="background: rgba(255,255,255,0.1); color: #fff; padding: 12px 24px; border-radius: 8px; font-weight: 500; text-decoration: none;">Browse Projects Portfolio</a>
        </div>
      </article>
    `
  }
  ];
}

// Synchronize newly fetched Sanity CMS projects into sitemap.xml automatically
// Synchronize newly fetched Sanity CMS projects and blog articles into sitemap.xml automatically
function syncSitemapWithContent(projectItems, blogItems = []) {
  const sitemapPath = path.resolve(ROOT_DIR, "public", "sitemap.xml");
  const distSitemapPath = path.resolve(DIST_DIR, "sitemap.xml");

  let content = "";
  if (fs.existsSync(sitemapPath)) {
    content = fs.readFileSync(sitemapPath, "utf8");
  } else if (fs.existsSync(distSitemapPath)) {
    content = fs.readFileSync(distSitemapPath, "utf8");
  } else {
    return;
  }

  const now = new Date().toISOString().split("T")[0] + "T12:00:00+00:00";
  let addedCount = 0;

  for (const p of projectItems) {
    const loc = `${SITE_URL}/projects/${p.slug}`;
    if (!content.includes(`<loc>${loc}</loc>`)) {
      const entry = `  <url>\n       <loc>${loc}</loc>\n       <lastmod>${now}</lastmod>\n       <changefreq>daily</changefreq>\n       <priority>0.8500</priority>\n  </url>\n`;
      content = content.replace("</urlset>", `${entry}</urlset>`);
      addedCount++;
    }
  }

  // Ensure /blog hub is in sitemap
  const blogHubLoc = `${SITE_URL}/blog`;
  if (!content.includes(`<loc>${blogHubLoc}</loc>`)) {
    const entry = `  <url>\n       <loc>${blogHubLoc}</loc>\n       <lastmod>${now}</lastmod>\n       <changefreq>daily</changefreq>\n       <priority>0.8500</priority>\n  </url>\n`;
    content = content.replace("</urlset>", `${entry}</urlset>`);
    addedCount++;
  }

  // Ensure all blog articles are in sitemap
  for (const b of blogItems) {
    const loc = `${SITE_URL}/blog/${b.slug}`;
    if (!content.includes(`<loc>${loc}</loc>`)) {
      const entry = `  <url>\n       <loc>${loc}</loc>\n       <lastmod>${now}</lastmod>\n       <changefreq>daily</changefreq>\n       <priority>0.8000</priority>\n  </url>\n`;
      content = content.replace("</urlset>", `${entry}</urlset>`);
      addedCount++;
    }
  }

  if (addedCount > 0) {
    console.log(`  ✓ Automatically synced ${addedCount} new content URLs into sitemap.xml`);
  }
  fs.writeFileSync(sitemapPath, content, "utf8");
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(distSitemapPath, content, "utf8");
  }
}

// Execute pre-rendering process
async function runPrerender() {
  console.log("\n🚀 Starting Build-Time SSG Pre-Rendering Engine...");

  // Dynamically fetch all projects & blog guides from Sanity CMS (falls back to local defaults if offline)
  const projectItems = await fetchSanityProjects();
  const blogItems = await fetchSanityBlogPosts();
  const routes = getRoutes(projectItems, blogItems);

  if (!fs.existsSync(BASE_HTML_PATH)) {
    console.error(`❌ Error: Base HTML template not found at ${BASE_HTML_PATH}`);
    console.error("Make sure 'vite build' runs before this script.");
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(BASE_HTML_PATH, "utf8");

  let generatedCount = 0;

  for (const route of routes) {
    const routeUrl = route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
    let html = baseTemplate;

    // 1. Replace <title>
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // 2. Replace or inject meta description
    if (html.includes('<meta name="description"')) {
      html = html.replace(
        /<meta name="description" content=".*?"\s*\/?>/i,
        `<meta name="description" content="${route.description}" />`
      );
    } else {
      html = html.replace("</head>", `  <meta name="description" content="${route.description}" />\n</head>`);
    }

    // 3. Replace or inject meta keywords
    if (route.keywords) {
      if (html.includes('<meta name="keywords"')) {
        html = html.replace(
          /<meta name="keywords" content=".*?"\s*\/?>/i,
          `<meta name="keywords" content="${route.keywords}" />`
        );
      } else {
        html = html.replace("</head>", `  <meta name="keywords" content="${route.keywords}" />\n</head>`);
      }
    }

    // 4. Update canonical URL
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(
        /<link rel="canonical" href=".*?"\s*\/?>/i,
        `<link rel="canonical" href="${routeUrl}" />`
      );
    } else {
      html = html.replace("</head>", `  <link rel="canonical" href="${routeUrl}" />\n</head>`);
    }

    // 5. Update robots tag (index/follow or noindex)
    const robotsContent = route.noIndex
      ? "noindex, nofollow, noarchive"
      : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

    if (html.includes('<meta name="robots"')) {
      html = html.replace(
        /<meta name="robots" content=".*?"\s*\/?>/i,
        `<meta name="robots" content="${robotsContent}" />`
      );
    } else {
      html = html.replace("</head>", `  <meta name="robots" content="${robotsContent}" />\n</head>`);
    }

    // 6. Update Open Graph Meta Tags
    html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
    html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
    html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/i, `<meta property="og:url" content="${routeUrl}" />`);
    html = html.replace(/<meta property="og:image" content=".*?"\s*\/?>/i, `<meta property="og:image" content="${route.image || DEFAULT_IMAGE}" />`);
    html = html.replace(/<meta property="og:type" content=".*?"\s*\/?>/i, `<meta property="og:type" content="${route.type || 'website'}" />`);

    // 7. Update Twitter Card Meta Tags
    html = html.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
    html = html.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);
    if (html.includes('<meta name="twitter:image"')) {
      html = html.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${route.image || DEFAULT_IMAGE}" />`);
    } else {
      html = html.replace("</head>", `  <meta name="twitter:image" content="${route.image || DEFAULT_IMAGE}" />\n</head>`);
    }

    // 8. Inject Page-Specific JSON-LD Schema
    const schemaScript = `\n    <script type="application/ld+json">\n${JSON.stringify(route.schema, null, 2)}\n    </script>\n`;
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, schemaScript);

    // 9. Inject Semantic Crawlable HTML inside #root
    const pageSemanticHtml = `
      <div id="seo-fallback" style="background: #070D18; color: #fff; min-height: 100vh; font-family: system-ui, -apple-system, sans-serif;">
        ${getNavHtml()}
        <main id="main-content" role="main">
          ${route.renderBody()}
        </main>
        ${getFooterHtml()}
      </div>
    `;

    // Replace the existing content of #root with page-specific semantic HTML
    if (html.includes('<div id="seo-fallback">')) {
      html = html.replace(
        /<div id="seo-fallback">[\s\S]*?<\/div>\s*(?=<\/div>\s*<!-- Vite entry)/i,
        pageSemanticHtml
      );
    } else if (html.includes('<div id="root">')) {
      html = html.replace(
        /<div id="root">[\s\S]*?<\/div>/i,
        `<div id="root">${pageSemanticHtml}</div>`
      );
    }

    // 10. Write the physical .html file(s)
    if (route.path === "/") {
      // Home page
      fs.writeFileSync(path.resolve(DIST_DIR, "index.html"), html, "utf8");
      console.log(`  ✓ Generated / -> dist/index.html`);
      generatedCount++;
    } else if (route.path === "/404") {
      // 404 page
      fs.writeFileSync(path.resolve(DIST_DIR, "404.html"), html, "utf8");
      const dir = path.resolve(DIST_DIR, "404");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.resolve(dir, "index.html"), html, "utf8");
      console.log(`  ✓ Generated /404 -> dist/404.html & dist/404/index.html`);
      generatedCount++;
    } else {
      // Sub-pages like /about, /services/interior-design
      const cleanPath = route.path.replace(/^\//, "");
      const targetDir = path.resolve(DIST_DIR, cleanPath);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Write dist/<cleanPath>/index.html
      const indexPath = path.resolve(targetDir, "index.html");
      fs.writeFileSync(indexPath, html, "utf8");

      // Also write dist/<cleanPath>.html for cleanUrl resolvers
      const flatHtmlPath = path.resolve(DIST_DIR, `${cleanPath}.html`);
      const isParentDirectory = routes.some(r => r.path !== route.path && r.path.startsWith(`${route.path}/`));
      if (!isParentDirectory) {
        const flatDir = path.dirname(flatHtmlPath);
        if (!fs.existsSync(flatDir)) {
          fs.mkdirSync(flatDir, { recursive: true });
        }
        fs.writeFileSync(flatHtmlPath, html, "utf8");
      }

      console.log(`  ✓ Generated ${route.path} -> dist/${cleanPath}/index.html`);
      generatedCount++;
    }
  }

  // Automatically sync any newly discovered projects and blog articles into sitemap.xml
  syncSitemapWithContent(projectItems, blogItems);

  console.log(`\n🎉 SSG Pre-rendering Complete: Successfully generated ${generatedCount} static pages!`);
  console.log("Every single page now has physical, crawlable HTML deployed on Vercel.\n");
}

runPrerender().catch((err) => {
  console.error("❌ Fatal error during SSG pre-rendering:", err);
  process.exit(1);
});
