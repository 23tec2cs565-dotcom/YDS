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
  logo: "https://yds-liart.vercel.app/younick-logo.PNG",
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
  title: "Best Interior Designer in Jaipur, Rajasthan | Younick Design Studio",
  description:
    "Younick Design Studio — Premier luxury interior design, turnkey construction, and 3D architectural visualization studio in Jaipur, Rajasthan. Transform your residential and commercial spaces with expert designers.",
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
    title: "Best Interior Designer in Jaipur — Turnkey Construction & Design | Younick Studio",
    description:
      "Looking for the best interior designer in Jaipur? Younick Design Studio delivers award-winning luxury residential, office & commercial interior design & turnkey construction across Rajasthan.",
    keywords:
      "best interior designer in jaipur, interior design studio jaipur, luxury villa interior design jaipur, turnkey interior contractor jaipur, 3d interior rendering rajasthan",
    url: `${SITE.url}/`,
    image: SITE.logo,
    author: SITE.name,
  },
  projects: {
    title: `${SITE.name} — Projects | Portfolio`,
    description:
      "Explore our portfolio of residential and commercial projects — villas, apartments, offices and boutique hotels designed and executed by Younick Design Studio.",
    url: `${SITE.url}/projects`,
    image: SITE.logo,
    author: SITE.name,
  },
  team: {
    title: `${SITE.name} — Our Team`,
    description:
      "Meet the designers, architects and construction professionals behind Younick Design Studio.",
    url: `${SITE.url}/team`,
    image: SITE.logo,
    author: SITE.name,
  },
  contact: {
    title: `${SITE.name} — Contact`,
    description:
      "Get in touch with Younick Design Studio for interior design, construction, and visualization services. We are based in Jaipur, Rajasthan.",
    url: `${SITE.url}/contact`,
    image: SITE.logo,
    author: SITE.name,
  },
  about: {
    title: "About Younick Design Studio — Our Story, Values & Team",
    description: "Learn about Younick Design Studio — our philosophy, process and the people who bring design to life across Rajasthan.",
    url: `${SITE.url}/about`,
    image: `${SITE.url}/younick-about-hero.jpg`,
    keywords: "about, younick design, interior design studio, rajasthan"
  },
  services: {
    title: "Our Services — Interior Design, Turnkey & 3D Visualization | Younick Design Studio",
    description: "Explore our range of bespoke services including interior design, turnkey construction, renovation, 3D rendering and consultation services across Rajasthan.",
    url: `${SITE.url}/services`,
    image: SITE.logo,
    keywords: "interior design services, turnkey construction, renovation jaipur, 3d design, architectural consultation"
  },
  career: {
    title: 'Career Opportunities — Younick Design Studio',
    description: 'Join our creative team at Younick Design Studio. Explore career opportunities in interior design, architecture, 3D visualization, and construction across Rajasthan.',
    keywords: 'interior design careers, design jobs Jaipur, architecture careers Rajasthan, Younick Design Studio careers',
    url: `${SITE.url}/career`,
    image: `${SITE.url}/younick-about-hero.jpg`,
  }
  // Add more page presets if needed, e.g. blog posts or project detail pages
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
