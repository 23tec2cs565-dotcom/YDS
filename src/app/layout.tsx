import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import ClientShell from "@/components/ClientShell";
import { defaultSEO, structuredData } from "@/utils/seo";

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://studioyounick.vercel.app"),
  title: {
    default: defaultSEO.title,
    template: "%s | Younick Design Studio",
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords?.split(", "),
  authors: [{ name: "Younick Design Studio", url: "https://studioyounick.vercel.app" }],
  creator: "Younick Design Studio",
  publisher: "Younick Design Studio",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    siteName: "Younick Design Studio",
    type: "website",
    locale: "en_IN",
    url: "https://studioyounick.vercel.app/",
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [
      {
        url: "https://studioyounick.vercel.app/assets/og/hero-1200.webp",
        width: 1200,
        height: 630,
        alt: "Younick Design Studio Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: ["https://studioyounick.vercel.app/assets/og/hero-1200.webp"],
    creator: "@younickstudio",
    site: "@younickstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur",
    "geo.position": "26.9069;75.7836",
    ICBM: "26.9069, 75.7836",
  },
};

const websiteAndOrgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://studioyounick.vercel.app/#website",
      url: "https://studioyounick.vercel.app/",
      name: "Younick Design Studio",
      alternateName: ["Younick Studio", "Younick Design Studio Jaipur", "YDS"],
      description:
        "Premier luxury interior design, turnkey construction, and 3D architectural visualization studio in Jaipur, Rajasthan.",
      inLanguage: "en-IN",
    },
    structuredData.organization,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KBNVQNPZ');`}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EMDN6BRDJH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EMDN6BRDJH');
            gtag('config', 'G-PZK8FJJXT4');
          `}
        </Script>

        {/* Structured Data: WebSite & LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteAndOrgSchema),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KBNVQNPZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
