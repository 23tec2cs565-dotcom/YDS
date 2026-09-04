// api/sitemap.ts
// Dynamic Serverless XML Sitemap generated live from Sanity CMS

const SITE_URL = process.env.VITE_SITE_URL || "https://yds-liart.vercel.app";
const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || "b0rnzdhr";
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || "production";
const SANITY_API_VERSION = process.env.VITE_SANITY_API_VERSION || "2024-01-01";

interface StaticRoute {
  path: string;
  priority: string;
  changefreq: string;
}

const STATIC_ROUTES: StaticRoute[] = [
  { path: "", priority: "1.0000", changefreq: "daily" },
  { path: "/services", priority: "0.9000", changefreq: "daily" },
  { path: "/services/interior-design", priority: "0.9000", changefreq: "daily" },
  { path: "/services/construction", priority: "0.9000", changefreq: "daily" },
  { path: "/services/renovation", priority: "0.9000", changefreq: "daily" },
  { path: "/services/3d-visualization", priority: "0.9000", changefreq: "daily" },
  { path: "/services/consultation", priority: "0.8500", changefreq: "daily" },
  { path: "/projects", priority: "0.9000", changefreq: "daily" },
  { path: "/blog", priority: "0.9000", changefreq: "daily" },
  { path: "/about", priority: "0.8000", changefreq: "daily" },
  { path: "/team", priority: "0.8000", changefreq: "daily" },
  { path: "/contact", priority: "0.8000", changefreq: "daily" },
  { path: "/faq", priority: "0.8000", changefreq: "daily" },
  { path: "/career", priority: "0.7000", changefreq: "daily" },
  { path: "/privacy", priority: "0.3000", changefreq: "monthly" },
  { path: "/terms", priority: "0.3000", changefreq: "monthly" },
];

export async function fetchLiveContent() {
  const query = `{
    "projects": *[_type == "project"] {
      "slug": slug.current,
      _updatedAt,
      _createdAt
    },
    "blogs": *[_type == "blogPost"] {
      "slug": slug.current,
      _updatedAt,
      publishedAt
    }
  }`;

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(4500) });
    if (res.ok) {
      const data = await res.json();
      return data.result || { projects: [], blogs: [] };
    }
  } catch (err) {
    console.warn("Dynamic sitemap failed to query Sanity, using fallback:", err);
  }

  return { projects: [], blogs: [] };
}

export async function generateSitemapXml(): Promise<string> {
  const today = new Date().toISOString();
  const { projects, blogs } = await fetchLiveContent();

  const urlEntries: string[] = [];

  // 1. Static Core Pages
  for (const route of STATIC_ROUTES) {
    urlEntries.push(`  <url>
       <loc>${SITE_URL}${route.path}</loc>
       <lastmod>${today}</lastmod>
       <changefreq>${route.changefreq}</changefreq>
       <priority>${route.priority}</priority>
  </url>`);
  }

  // 2. Dynamic Projects from Sanity
  const seenProjects = new Set<string>();
  if (Array.isArray(projects) && projects.length > 0) {
    for (const p of projects) {
      if (p && p.slug && !seenProjects.has(p.slug)) {
        seenProjects.add(p.slug);
        const lastmod = p._updatedAt || p._createdAt || today;
        urlEntries.push(`  <url>
       <loc>${SITE_URL}/projects/${p.slug}</loc>
       <lastmod>${lastmod}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.8500</priority>
  </url>`);
      }
    }
  }

  // 3. Dynamic Blogs from Sanity
  const seenBlogs = new Set<string>();
  if (Array.isArray(blogs) && blogs.length > 0) {
    for (const b of blogs) {
      if (b && b.slug && !seenBlogs.has(b.slug)) {
        seenBlogs.add(b.slug);
        const lastmod = b._updatedAt || (b.publishedAt ? `${b.publishedAt}T12:00:00Z` : today);
        urlEntries.push(`  <url>
       <loc>${SITE_URL}/blog/${b.slug}</loc>
       <lastmod>${lastmod}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.8500</priority>
  </url>`);
      }
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/css" href="https://www.xml-sitemaps.com/css/sitemap.css"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join("\n")}
</urlset>`;
}

export default async function handler(req: any, res: any) {
  try {
    const xml = await generateSitemapXml();

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    // Cache on Edge CDN for 30 minutes, background revalidate for 1 day
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1800, stale-while-revalidate=86400"
    );
    res.status(200).send(xml);
  } catch (error) {
    console.error("Failed to generate dynamic sitemap:", error);
    res.status(500).send("Error generating dynamic sitemap");
  }
}
