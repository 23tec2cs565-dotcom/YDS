import posthog from "posthog-js";

const key = import.meta.env.VITE_POSTHOG_KEY || "";
const host = import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com";

export const initAnalytics = () => {
  if (key && !key.startsWith("phx_")) {
    try {
      posthog.init(key, {
        api_host: host,
        capture_pageview: true,
        autocapture: true,
      });
    } catch (e) {
      console.warn("PostHog Analytics init error:", e);
    }
  } else {
    // Graceful fallback for mock or unset environment keys
    console.warn("PostHog Analytics: Key is missing, empty or mock. Analytics tracking is disabled.");
  }
};

export const safeCapture = (event: string, properties?: Record<string, unknown>) => {
  try {
    if (key && !key.startsWith("phx_") && posthog && typeof posthog.capture === "function") {
      posthog.capture(event, properties);
    }
  } catch {
    // Silently ignore analytics errors so UI clicks never fail
  }
};

export default posthog;