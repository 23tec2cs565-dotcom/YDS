import React from "react";
import { Link as RouterLink } from "react-router-dom";

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | { pathname?: string; query?: Record<string, string | number> };
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean | "none" | "intent" | "render" | "viewport";
  children?: React.ReactNode;
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, replace, scroll, prefetch, ...props }, ref) => {
    const to = typeof href === "string" ? href : href?.pathname || "/";
    // For external protocols or anchor tags, render standard <a>
    if (
      typeof href === "string" &&
      (href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#"))
    ) {
      return <a ref={ref} href={href} {...props} />;
    }
    return <RouterLink ref={ref} to={to} replace={replace} {...props} />;
  }
);

Link.displayName = "NextLinkCompat";

export default Link;
