// api/webhook.ts
// Automated Sanity CMS Webhook Endpoint for instant sync and revalidation

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed. Sanity Webhooks require POST.",
    });
  }

  try {
    const body = req.body;
    const documentType = body?._type || "unknown";
    const documentId = body?._id || "unknown";

    console.log(`[Sanity Webhook] Event received for [${documentType}] (ID: ${documentId})`);

    // Optional: Trigger Vercel Deploy Hook if configured
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (deployHookUrl) {
      console.log("[Sanity Webhook] Triggering Vercel Deploy Hook for full SSG regeneration...");
      await fetch(deployHookUrl, { method: "POST" });
    }

    return res.status(200).json({
      success: true,
      message: `Sanity webhook processed successfully for document type [${documentType}]`,
      documentId,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[Sanity Webhook Error]:", error);
    return res.status(500).json({
      error: "Failed to process Sanity webhook",
      details: error.message,
    });
  }
}
