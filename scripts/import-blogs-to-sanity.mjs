// scripts/import-blogs-to-sanity.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defaultBlogItems } from "./prerender.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// Try reading token from environment or from .env file
let token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  const envPath = path.resolve(ROOT_DIR, ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/SANITY_API_TOKEN=(["']?)([^"'\r\n]+)\1/) ||
                  envContent.match(/SANITY_AUTH_TOKEN=(["']?)([^"'\r\n]+)\1/);
    if (match) {
      token = match[2].trim();
    }
  }
}

if (!token) {
  console.error("❌ Error: No Sanity API Token found.");
  console.error("Please set SANITY_API_TOKEN in your .env file or environment variable.");
  process.exit(1);
}

const PROJECT_ID = "b0rnzdhr";
const DATASET = "production";
const API_VERSION = "2024-01-01";

async function pushBlogsToSanity() {
  console.log(`\n🚀 Pushing 5 foundational blog posts to Sanity CMS (${PROJECT_ID} / ${DATASET})...`);

  const mutations = defaultBlogItems.map((b, idx) => ({
    createOrReplace: {
      _id: `blogPost-${b.slug}`,
      _type: "blogPost",
      title: b.title,
      slug: {
        _type: "slug",
        current: b.slug
      },
      subtitle: b.subtitle || "",
      category: b.category,
      excerpt: b.excerpt,
      readingTime: b.readingTime || "7 min read",
      featured: idx === 0, // Flagship guide marked as featured
      publishedAt: b.publishedAt || new Date().toISOString().split("T")[0],
      tags: b.tags || [],
      content: b.content || "",
      faqs: (b.faqs || []).map((faq, fIdx) => ({
        _key: `faq-${fIdx}`,
        question: faq.question,
        answer: faq.answer
      })),
      seoTitle: b.seoTitle || b.title,
      seoDescription: b.seoDescription || b.excerpt,
      seoKeywords: b.seoKeywords || ""
    }
  }));

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ mutations })
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`❌ Sanity API Error (${res.status}):`, errorText);
    process.exit(1);
  }

  const result = await res.json();
  console.log("✅ Successfully published all 5 guides directly into Sanity CMS!");
  console.log("Transaction ID:", result.transactionId);
  console.log("\nAll 5 guides are now live and editable inside your Sanity Studio dashboard at:");
  console.log("https://younickdesignstudio-admin.sanity.studio\n");
}

pushBlogsToSanity().catch((err) => {
  console.error("❌ Fatal Error:", err);
  process.exit(1);
});
