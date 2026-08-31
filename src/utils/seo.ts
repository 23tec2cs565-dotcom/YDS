// src/utils/seo.ts
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
  url: "https://yds-liart.vercel.app",
  logo: "https://yds-liart.vercel.app/younick-logo.webp",
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
    "Award-winning interior design, turnkey construction, and 3D architectural visualization studio in Civil Lines, Jaipur. Contact Younick Design Studio.",
  keywords:
    "best interior designer in jaipur, interior design jaipur, turnkey interior contractor jaipur, luxury interior designers rajasthan, commercial gym interior jaipur, hospital design consultancy jaipur, villa interior designers civil lines, home renovation jaipur, 3d visualization studio jaipur",
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
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService"],
    name: SITE.name,
    alternateName: "Younick Studio Jaipur",
    description: "Award-winning interior design, turnkey construction, and 3D spatial visualization studio based in Civil Lines, Jaipur, Rajasthan.",
    image: SITE.logo,
    url: SITE.url,
    logo: "https://yds-liart.vercel.app/android-chrome-512x512.png",
    telephone: SITE.telephone,
    email: SITE.email,
    priceRange: "₹₹₹",
    hasMap: "https://maps.google.com/?q=Orbit+Mall+Civil+Lines+Jaipur",
    sameAs: SITE.sameAs,
    founder: {
      "@type": "Person",
      name: "Nikhil Sain",
      jobTitle: "Founder & Lead Interior Designer",
      worksFor: {
        "@type": "Organization",
        name: SITE.name
      }
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
      { "@type": "City", name: "Sikar" },
      { "@type": "City", name: "Udaipur" },
      { "@type": "City", name: "Jodhpur" },
      { "@type": "City", name: "Kota" },
      { "@type": "State", name: "Rajasthan" }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1"
    },
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
    title: "Luxury Interior Designers & Architects in Jaipur | Younick",
    description:
      "Award-winning luxury interior design, architecture, and turnkey construction studio in Jaipur. From 3D rendering to handover. Book a consultation.",
    keywords:
      "interior designers in jaipur, best interior designer jaipur, luxury villa interior design jaipur, turnkey interior contractor jaipur, 3d architectural rendering rajasthan",
    url: `${SITE.url}/`,
    image: SITE.logo,
    author: SITE.name,
  },
  projects: {
    title: "Interior Design & Architecture Projects in Jaipur | Younick",
    description:
      "Explore our portfolio of luxury residential villas, turnkey commercial spaces, and bespoke interior renovations executed by Younick Studio in Jaipur.",
    url: `${SITE.url}/projects`,
    image: SITE.logo,
    author: SITE.name,
  },
  team: {
    title: "Our Architects & Interior Designers in Jaipur | Younick",
    description:
      "Meet the principal architects, interior designers, 3D visualizers, and turnkey civil engineers behind Younick Design Studio in Civil Lines, Jaipur.",
    url: `${SITE.url}/team`,
    image: SITE.logo,
    author: SITE.name,
  },
  contact: {
    title: "Contact Luxury Interior Designers in Jaipur | Younick Studio",
    description:
      "Connect with Younick Design Studio for villa interior design, turnkey construction, and 3D architectural rendering in Orbit Mall, Civil Lines, Jaipur.",
    url: `${SITE.url}/contact`,
    image: SITE.logo,
    author: SITE.name,
  },
  about: {
    title: "About Our Luxury Architecture & Interior Studio in Jaipur",
    description:
      "Learn about Younick Design Studio in Jaipur — our turnkey craftsmanship, architectural philosophy, and the interior designers crafting luxury spaces.",
    url: `${SITE.url}/about`,
    image: `${SITE.url}/younick-about-hero.webp`,
    keywords: "about younick design studio, interior designer profile jaipur, luxury architects rajasthan"
  },
  services: {
    title: "Turnkey Interior Design & Construction Services in Jaipur",
    description:
      "Bespoke residential interior design, turnkey civil construction, villa renovation, 3D visualization, and architectural consultation in Jaipur, Rajasthan.",
    url: `${SITE.url}/services`,
    image: SITE.logo,
    keywords: "interior design services jaipur, turnkey construction rajasthan, home renovation jaipur, 3d visualization studio"
  },
  career: {
    title: "Careers in Interior Design & Architecture | Younick Jaipur",
    description:
      "Explore job openings and career opportunities for interior designers, architects, and 3D visualizers at Younick Design Studio in Civil Lines, Jaipur.",
    keywords: "interior design careers jaipur, architecture jobs rajasthan, 3d visualizer vacancy jaipur",
    url: `${SITE.url}/career`,
    image: `${SITE.url}/younick-about-hero.webp`,
  },
  privacy: {
    title: "Privacy Policy | Younick Design Studio Jaipur",
    description:
      "Read the privacy policy of Younick Design Studio regarding client data protection, architectural blueprints, and project confidentiality.",
    url: `${SITE.url}/privacy`,
    image: SITE.logo,
    keywords: "privacy policy, client confidentiality, data protection, younick design studio"
  },
  terms: {
    title: "Terms of Service & Project Contracts | Younick Studio",
    description:
      "Review the terms of service, architectural copyright standards, material quality commitments, and turnkey execution guidelines for Younick Studio.",
    url: `${SITE.url}/terms`,
    image: SITE.logo,
    keywords: "terms of service, interior design agreement, turnkey contract terms jaipur"
  },
  faq: {
    title: "Interior Design & Turnkey Cost FAQs | Younick Studio Jaipur",
    description:
      "Answers to common questions about interior design costs per sq ft, turnkey construction timelines, material warranties, and 3D renders in Jaipur.",
    url: `${SITE.url}/faq`,
    image: SITE.logo,
    keywords: "interior design faq jaipur, interior design cost per sq ft jaipur, turnkey timeline rajasthan"
  }
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

export default {
  SITE,
  defaultSEO,
  structuredData,
  pageSEO,
  buildPageSchema,
};
