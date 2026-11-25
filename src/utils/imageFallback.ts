import type React from "react";

/**
 * Shared image error handler that swaps broken image sources to a safe placeholder once.
 */
export function handleImgError(e: React.SyntheticEvent<HTMLImageElement>): void {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "/assets/Placeholder/Mock-9.avif";
    img.alt = "Younick studio image fallback";
  }
}

/**
 * Shared avatar error handler that renders an inline monogram SVG fallback.
 */
export function handleAvatarError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string,
  size: number,
  fontSize: number
): void {
  const img = e.currentTarget;
  img.onerror = null;
  const initial = (name || "Y").charAt(0).toUpperCase();
  img.src = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><rect width='100%' height='100%' fill='#18181B'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='${fontSize}' fill='#B08D57'>${initial}</text></svg>`
  )}`;
}
