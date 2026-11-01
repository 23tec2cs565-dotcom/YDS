import { createClient, type ClientConfig } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const projectId =
  (typeof process !== "undefined" && (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID)) ||
  "b0rnzdhr";
export const dataset =
  (typeof process !== "undefined" && (process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET)) ||
  "production";
export const apiVersion =
  (typeof process !== "undefined" && (process.env.NEXT_PUBLIC_SANITY_API_VERSION || process.env.SANITY_API_VERSION || process.env.VITE_SANITY_API_VERSION)) ||
  "2024-01-01";

export const isSanityConfigured = Boolean(
  projectId && projectId.trim() !== "" && projectId !== "your_project_id_here"
);

const config: ClientConfig = {
  projectId: isSanityConfigured ? projectId : "b0rnzdhr",
  dataset,
  apiVersion,
  useCdn: false, // Ensures published changes in Sanity reflect INSTANTLY on the site
};

export const sanityClient = createClient(config);

const builder = createImageUrlBuilder(sanityClient);

/**
 * Generates an optimized image URL from Sanity image asset reference or object.
 */
export function urlFor(source: any) {
  if (!source) return "";
  if (typeof source === "string" && (source.startsWith("/") || source.startsWith("http"))) {
    return source;
  }
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return typeof source === "string" ? source : "";
  }
}
