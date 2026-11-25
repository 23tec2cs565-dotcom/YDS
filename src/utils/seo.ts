// src/utils/seo.ts
// Keywords derived from competitor analysis:
// Livspace Jaipur, HomeLane Jaipur, local studios (Endless Interiors, AK Interiors,
// Kalpkrit, Rupankana Interiors, NBP Interiors, DdecorArch), Justdial & Sulekha listings.
export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

const SITE = {
  name: "Younick Design Studio",
  url: "https://studioyounick.vercel.app",
  logo: "https://studioyounick.vercel.app/younick-logo.webp",
  telephone: "+91 8854883058",
  email: "studioyounick@gmail.com",
  address: {
    street: "3008, Third Floor, Orbit Mall, Civil Lines",
    locality: "Jaipur",
    region: "Rajasthan",
    postalCode: "302001",
    country: "IN",
  },
  sameAs: [
    "https://www.instagram.com/studio.younick",
    "https://www.facebook.com/studioyounick",
    "https://www.youtube.com/@Younickdesignstudio",
    "https://wa.me/918854883058",
  ],
};

export const defaultSEO: SEOData = {
  title: "Best Interior Designer in Jaipur | Younick Design Studio",
  description:
    "Award-winning interior design, turnkey construction, and 3D architectural visualization studio in Civil Lines, Jaipur. Book a free consultation with Younick Design Studio.",
  keywords:
    "best interior designer in jaipur, interior design company jaipur, top interior decorators jaipur, turnkey interior contractor jaipur, luxury interior designers rajasthan, interior designer civil lines jaipur, home interior design jaipur, commercial gym interior jaipur, hospital design consultancy jaipur, villa interior designers jaipur, home renovation jaipur, 3d visualization studio jaipur, interior design cost jaipur, modular kitchen jaipur, interior designers near me jaipur",
  url: SITE.url,
  image: SITE.logo,
  author: SITE.name,
};

/**
 * Structured data — LocalBusiness & Organization (JSON-LD)
 * Formatted for Google Rich Results & Local Knowledge Graph.
 */
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService", "InteriorDesignBusiness"],
    name: SITE.name,
    alternateName: ["Younick Studio Jaipur", "Younick Interior Design Jaipur"],
    description: "Award-winning interior design, turnkey construction, modular kitchen design, 3D architectural visualization, and commercial fit-out studio based in Civil Lines, Jaipur, Rajasthan. Serving luxury residential villas, healthcare facilities, gyms, and commercial spaces.",
    image: SITE.logo,
    url: SITE.url,
    logo: "https://studioyounick.vercel.app/android-chrome-512x512.png",
    telephone: SITE.telephone,
    email: SITE.email,
    priceRange: "₹₹₹",
    hasMap: "https://maps.google.com/?q=Orbit+Mall+Civil+Lines+Jaipur",
    sameAs: SITE.sameAs,
    founder: {
      "@type": "Person",
      name: "Nikhil Sain",
      jobTitle: "Founder & Lead Interior Designer",
      url: `${SITE.url}/team`,
      image: `${SITE.url}/assets/team/Nikhil/Nikhil-1024.jpeg`,
      sameAs: [
        "https://www.linkedin.com/in/nikhil-sain-300351156",
        "https://www.instagram.com/studio.younick",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Arch College of Design and Business",
      },
      worksFor: {
        "@type": "Organization",
        name: SITE.name,
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.9069,
      longitude: 75.7836,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        opens: "10:00",
        closes: "19:00"
      }
    ],
    areaServed: [
      { "@type": "City", name: "Jaipur" },
      { "@type": "AdministrativeArea", name: "Civil Lines, Jaipur" },
      { "@type": "AdministrativeArea", name: "C-Scheme, Jaipur" },
      { "@type": "AdministrativeArea", name: "Mansarovar, Jaipur" },
      { "@type": "AdministrativeArea", name: "Vaishali Nagar, Jaipur" },
      { "@type": "AdministrativeArea", name: "Malviya Nagar, Jaipur" },
      { "@type": "AdministrativeArea", name: "Pratap Nagar, Jaipur" },
      { "@type": "AdministrativeArea", name: "Jagatpura, Jaipur" },
      { "@type": "AdministrativeArea", name: "Tonk Road, Jaipur" },
      { "@type": "AdministrativeArea", name: "Raja Park, Jaipur" },
      { "@type": "AdministrativeArea", name: "Bani Park, Jaipur" },
      { "@type": "AdministrativeArea", name: "Ajmer Road, Jaipur" },
      { "@type": "AdministrativeArea", name: "Patrakar Colony, Jaipur" },
      { "@type": "AdministrativeArea", name: "Shyam Nagar, Jaipur" },
      { "@type": "AdministrativeArea", name: "Vidhyadhar Nagar, Jaipur" },
      { "@type": "City", name: "Sikar" },
      { "@type": "City", name: "Udaipur" },
      { "@type": "City", name: "Jodhpur" },
      { "@type": "City", name: "Kota" },
      { "@type": "State", name: "Rajasthan" }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior Design, Architecture & Turnkey Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential & Luxury Villa Interior Design",
            description: "Bespoke interior architecture, custom woodwork, modular kitchens, and curated finishes for luxury homes in Jaipur and Rajasthan."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial & Retail Interior Fit-outs",
            description: "Turnkey design and execution for fitness gyms, retail showrooms, jewellery boutiques, and corporate offices."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Healthcare & Hospital Design Consultancy",
            description: "Clinical space planning, patient circulation optimization, and ergonomic healthcare facility design."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Turnkey Execution with Material",
            description: "Complete end-to-end site management, civil engineering, contractor supervision, and material procurement with zero quality compromise."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "3D Photorealistic Architectural Visualization",
            description: "High-fidelity 3D modeling, lighting simulation, walkthrough animations, and CAD construction drawings."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Modular Kitchen & Wardrobe Design",
            description: "Custom modular kitchen design in laminate, acrylic, and PU finish; sliding wardrobe systems and storage solutions for homes in Jaipur."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Space Planning & 3D Interior Layouts",
            description: "Detailed space planning, 2D/3D floor plans, false ceiling design, lighting layout, and material finish boards for residential and commercial interiors."
          }
        }
      ]
    }
  } as Record<string, unknown>,
};

/**
 * Page-specific SEO presets (useful to pass into SEOHead as pageSEO.home etc.)
 * Edit titles/descriptions as you refine content.
 */
export const pageSEO: Record<string, SEOData> = {
  home: {
    title: "Best Interior Designers & Architects in Jaipur | Younick",
    description:
      "14+ projects delivered, 4.9★ rated. Luxury interior design, architecture & turnkey construction in Civil Lines, Jaipur. 5 services from ₹1,200/sq.ft. Book a free consultation.",
    keywords:
      "best interior designers in jaipur, interior design company jaipur, top interior decorators jaipur, luxury villa interior design jaipur, turnkey interior contractor jaipur, home interior design jaipur, interior designers civil lines jaipur, 3d architectural rendering rajasthan, interior design studio jaipur, full home interior design jaipur, residential interior designers jaipur, interior designer near me jaipur, interior design cost jaipur, modular kitchen designers jaipur, commercial interior decorators jaipur",
    url: `${SITE.url}/`,
    image: SITE.logo,
    author: SITE.name,
  },
  projects: {
    title: "Interior Design Portfolio & Projects in Jaipur | Younick",
    description:
      "Explore our portfolio of luxury residential villas, commercial fitness gyms, healthcare facilities, jewellery showrooms, and turnkey interior renovations by Younick Studio in Jaipur.",
    keywords:
      "interior design portfolio jaipur, luxury villa interior design jaipur, commercial interior projects jaipur, residential interior designers jaipur, gym interior design jaipur, hospital interior design jaipur, jewellery showroom design jaipur, turnkey interior projects rajasthan, 3bhk interior design jaipur, home renovation projects jaipur, interior architects jaipur, bespoke interior design jaipur, interior fit-out jaipur",
    url: `${SITE.url}/projects`,
    image: SITE.logo,
    author: SITE.name,
  },
  team: {
    title: "Architects & Interior Designers in Jaipur | Younick Team",
    description:
      "Meet the principal architects, interior designers, 3D visualizers, and turnkey civil engineers behind Younick Design Studio in Civil Lines, Jaipur. 10+ skilled professionals.",
    keywords:
      "interior designers jaipur team, architects in jaipur, 3d visualizer jaipur, civil engineer interior jaipur, interior design professionals jaipur, best architects civil lines jaipur, interior design firm team rajasthan, luxury interior architects jaipur, younick design studio team",
    url: `${SITE.url}/team`,
    image: SITE.logo,
    author: SITE.name,
  },
  contact: {
    title: "Book Free Consultation — Interior Designers Jaipur | Younick",
    description:
      "Get a free interior design consultation at Younick Design Studio, Orbit Mall, Civil Lines, Jaipur. Contact us for villa interior design, turnkey construction & 3D visualization.",
    keywords:
      "free interior design consultation jaipur, contact interior designer jaipur, hire interior designer jaipur, interior design estimate jaipur, interior designer orbit mall civil lines jaipur, book interior designer jaipur, interior design quote jaipur, younick design studio contact, turnkey contractor contact jaipur",
    url: `${SITE.url}/contact`,
    image: SITE.logo,
    author: SITE.name,
  },
  about: {
    title: "About Younick — Luxury Interior Design Studio in Jaipur",
    description:
      "Learn about Younick Design Studio in Jaipur — our story, turnkey craftsmanship, architectural philosophy, and the award-winning interior designers crafting luxury spaces since 2018.",
    keywords:
      "about younick design studio, interior designer profile jaipur, luxury interior design studio jaipur, interior design firm jaipur, architects jaipur civil lines, top interior design studio rajasthan, interior design philosophy jaipur, younick studio story, award winning interior designers jaipur",
    url: `${SITE.url}/about`,
    image: `${SITE.url}/younick-about-hero.webp`,
    author: SITE.name,
  },
  services: {
    title: "Interior Design Services in Jaipur | Turnkey & 3D | Younick",
    description:
      "Bespoke residential & villa interior design, turnkey civil construction, home renovation, 3D visualization, healthcare & commercial fit-outs in Jaipur, Rajasthan. Starting ₹1,200/sq.ft.",
    keywords:
      "interior design services jaipur, turnkey construction rajasthan, home renovation jaipur, 3d visualization studio jaipur, modular kitchen jaipur, luxury villa interior services, residential interior design services, commercial interior fit-out jaipur, hospital interior design services jaipur, gym interior design services jaipur, office interior design jaipur, interior design consultation jaipur, full home interior jaipur, space planning jaipur",
    url: `${SITE.url}/services`,
    image: SITE.logo,
    author: SITE.name,
  },
  career: {
    title: "Interior Design & Architecture Jobs in Jaipur | Younick",
    description:
      "Explore job openings for interior designers, architects, 3D visualizers, site supervisors & project managers at Younick Design Studio, Civil Lines, Jaipur.",
    keywords:
      "interior design careers jaipur, architecture jobs rajasthan, 3d visualizer vacancy jaipur, interior designer job jaipur, architect job civil lines jaipur, design studio jobs jaipur, site supervisor interior design jaipur, project manager interior design job, fresher interior design job jaipur",
    url: `${SITE.url}/career`,
    image: `${SITE.url}/younick-about-hero.webp`,
    author: SITE.name,
  },
  privacy: {
    title: "Privacy Policy | Younick Design Studio Jaipur",
    description:
      "Read the privacy policy of Younick Design Studio regarding client data protection, architectural blueprints, project confidentiality, and digital information handling.",
    keywords:
      "privacy policy younick design studio, client confidentiality interior design, data protection interior designer jaipur, younick studio privacy",
    url: `${SITE.url}/privacy`,
    image: SITE.logo,
    author: SITE.name,
  },
  terms: {
    title: "Terms of Service & Project Contracts | Younick Studio",
    description:
      "Review the terms of service, architectural copyright standards, material quality commitments, payment milestones, and turnkey execution guidelines for Younick Design Studio.",
    keywords:
      "terms of service interior design jaipur, interior design contract jaipur, turnkey contract terms jaipur, interior design agreement rajasthan, younick studio terms",
    url: `${SITE.url}/terms`,
    image: SITE.logo,
    author: SITE.name,
  },
  faq: {
    title: "Interior Design Cost & Turnkey FAQs in Jaipur | Younick",
    description:
      "Answers to common questions: interior design cost per sq ft in Jaipur, modular kitchen prices, turnkey timelines, 3D render fees, Vastu guidelines, and material warranties.",
    keywords:
      "interior design faq jaipur, interior design cost per sq ft jaipur, modular kitchen cost jaipur, turnkey timeline rajasthan, interior design price list jaipur, 3d rendering cost jaipur, vastu interior design jaipur, interior design warranty jaipur, how to hire interior designer jaipur, interior design consultation fee jaipur",
    url: `${SITE.url}/faq`,
    image: SITE.logo,
    author: SITE.name,
  },
  blog: {
    title: "Interior Design Blog — Cost Guides & Trends | Younick Jaipur",
    description:
      "Expert 2025 cost guides, Vastu rules, modular kitchen material comparisons, luxury villa design tips, and turnkey civil construction insights for homes in Jaipur, Rajasthan.",
    keywords:
      "interior design blog jaipur, interior design cost jaipur 2025, modular kitchen material jaipur, vastu guidelines luxury villa jaipur, turnkey civil contractor jaipur, 3d architectural rendering jaipur, architecture blog jaipur, interior design trends rajasthan, home renovation tips jaipur, false ceiling design ideas jaipur, wardrobe design jaipur, living room interior ideas jaipur",
    url: `${SITE.url}/blog`,
    image: SITE.logo,
    author: SITE.name,
  },
};

/**
 * Helper: build a simple page schema for e.g. article or web page
 * You can import and customize this when you need page-specific structured data.
 */
export const buildPageSchema = (opts: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) => {
  const {
    title = defaultSEO.title,
    description = defaultSEO.description,
    url = defaultSEO.url,
    image = defaultSEO.image,
    datePublished,
    dateModified,
    authorName = defaultSEO.author,
  } = opts;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    ...(image ? { image } : {}),
  };

  if (datePublished) {
    schema.datePublished = datePublished;
  }
  if (dateModified) {
    schema.dateModified = dateModified;
  }
  if (authorName) {
    schema.author = {
      "@type": "Person",
      name: authorName,
    };
  }
  return schema;
};

export const PROJECT_SEO_TITLES: Record<string, string> = {
  "hera-mahal": "Hera Mahal — Turnkey Civil Construction | Younick Studio",
  "six-eleven-gym": "Six Eleven Gym — Commercial Fitness | Younick Studio",
  "dlmeh-hospital": "DLMEH Eye Hospital — Healthcare Design | Younick Studio",
  "pcp-sikar": "PCP Sikar Campus — Institutional Design | Younick Studio",
  "chhoti-bai-jewellers": "Chhoti Bai Jewellers — Luxury Showroom | Younick Studio",
  "foyer": "Entrance Foyer Renovation in Jaipur | Younick Studio",
  "himani-residence": "Himani Residence — Luxury Bedroom Design | Younick Studio",
  "the-coffee-crust-caffe": "The Coffee Crust Caffe — Cafe Interior | Younick Studio",
  "jk-lon": "JK LON Hospital — Healthcare Renovation | Younick Studio",
  "home-dharmendra": "Dharmendra Villa — Luxury Residential | Younick Studio",
  "detailing-devils": "Detailing Devils — Commercial Studio | Younick Studio",
  "goyal-renovation": "Goyal Residence — Exterior Renovation | Younick Studio",
  "rawat-light-studio": "Rawat Light Studio — Commercial Fitout | Younick Studio",
  "sharma-residency": "Sharma Residency — Residential Design | Younick Studio",
};

export const getProjectSeoTitle = (slug?: string, title?: string, category?: string): string => {
  if (slug && PROJECT_SEO_TITLES[slug]) {
    return PROJECT_SEO_TITLES[slug];
  }
  const cleanTitle = (title || "Project").split("—")[0].trim();
  const candidate = `${cleanTitle} — ${category || "Interior"} | Younick Studio`;
  if (candidate.length >= 50 && candidate.length <= 60) return candidate;
  if (candidate.length < 50) {
    const longer = `${cleanTitle} — ${category || "Interior Design"} | Younick Studio`;
    if (longer.length >= 50 && longer.length <= 60) return longer;
  }
  return candidate.length > 60 ? candidate.slice(0, 57).trim() + "..." : candidate;
};

export default {
  SITE,
  defaultSEO,
  structuredData,
  pageSEO,
  buildPageSchema,
  PROJECT_SEO_TITLES,
  getProjectSeoTitle,
};
