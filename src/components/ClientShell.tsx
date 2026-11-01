"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";
import IntroScreen from "./IntroScreen";
import WhatsAppButton from "./WhatsAppButton";
import { Analytics } from "@vercel/analytics/react";
import { initAnalytics } from "../utils/analytics";

const STORAGE_KEY = "younick_intro_v1";

const isSearchBotOrCrawler = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return true;
  const ua = navigator.userAgent || "";
  const botPattern =
    /bot|googlebot|crawler|spider|robot|crawling|lighthouse|headless|headlesschrome|google-inspectiontool|chrome-lighthouse|mediapartners-google|adsbot-google|bingbot|yandex|duckduckbot|slurp|baiduspider|seobility|ahrefs|semrush|ptst|pagespeed|insights/i;
  return (
    botPattern.test(ua) ||
    Boolean(navigator.webdriver) ||
    ua.includes("Headless") ||
    ua.includes("Lighthouse") ||
    ua.includes("PTST")
  );
};

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    setMounted(true);
    initAnalytics();

    // Check if intro should be shown
    if (!isSearchBotOrCrawler()) {
      try {
        const hasExplicitParam =
          window.location.search.includes("intro=true") || window.location.hash.includes("intro");
        const hasSeenIntro = sessionStorage.getItem(STORAGE_KEY);
        if (hasExplicitParam || !hasSeenIntro) {
          setShowIntro(true);
        }
      } catch {
        // Ignore
      }
    }

    // Expose helper to replay intro
    (window as unknown as { replayIntro?: () => void }).replayIntro = () => {
      sessionStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    };
  }, []);

  // GA Page view tracking on route change
  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
      const g = (window as unknown as { gtag: Function }).gtag;
      g("config", "G-EMDN6BRDJH", { page_path: pathname });
      g("config", "G-PZK8FJJXT4", { page_path: pathname });
    }
  }, [pathname]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("intro")) {
        url.searchParams.delete("intro");
        window.history.replaceState({}, "", url.pathname + url.search + url.hash);
      }
    } catch (e) {
      console.error("Failed to clean intro URL param:", e);
    }
  };

  const is404 = pathname === "/404";

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-[100vw]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#E6B566] focus:text-black focus:rounded-md focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Suspense fallback={null}>
        <Navigation />
      </Suspense>

      <main id="main-content" role="main" className="flex-1">
        {children}
      </main>

      {!is404 && <Footer />}
      <WhatsAppButton />
      <Analytics />
    </div>
  );
}
