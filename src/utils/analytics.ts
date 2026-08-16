// src/utils/analytics.ts
const key = import.meta.env.VITE_POSTHOG_KEY || "";
const host = import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com";

let posthogInstance: { capture?: (event: string, properties?: Record<string, unknown>) => void } | null = null;

export const initAnalytics = async () => {
  if (key && !key.startsWith("phx_")) {
    try {
      const { default: posthog } = await import("posthog-js");
      posthogInstance = posthog;
      posthog.init(key, {
        api_host: host,
        capture_pageview: true,
        autocapture: true,
      });
    } catch (e) {
      console.warn("PostHog Analytics init error:", e);
    }
  }
};

export const safeCapture = (event: string, properties?: Record<string, unknown>) => {
  try {
    if (posthogInstance && typeof posthogInstance.capture === "function") {
      posthogInstance.capture(event, properties);
    }
  } catch {
    // Silently ignore analytics errors
  }
};

export default posthogInstance;