import posthog from "posthog-js";

const key = import.meta.env.VITE_POSTHOG_KEY || "";
const host = import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com";

export const initAnalytics = () => {
  if (key && !key.startsWith("phx_")) {
    posthog.init(key, {
      api_host: host,
      capture_pageview: true,
      autocapture: true,
    });
  } else {
    // Graceful fallback for mock or unset environment keys
    console.warn("PostHog Analytics: Key is missing, empty or mock. Analytics tracking is disabled.");
  }
};

export default posthog;