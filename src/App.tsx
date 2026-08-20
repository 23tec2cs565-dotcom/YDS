import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import IntroScreen from "./components/IntroScreen";
import WhatsAppButton from "./components/WhatsAppButton";
const STORAGE_KEY = "younick_intro_v1";
const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const OurTeam = React.lazy(() => import("./pages/OurTeam"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const About = React.lazy(() => import("./pages/About"));
const Services = React.lazy(() => import("./pages/Services"));
const Career = React.lazy(() => import("./pages/Career"));
const ServiceDetails = React.lazy(() => import("./pages/ServiceDetails"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Admin = React.lazy(() => import("./pages/Admin"));
import ErrorBoundary from "./components/ErrorBoundary";
import { initAnalytics } from "./utils/analytics";
import { Analytics } from "@vercel/analytics/react";

function AppContent() {
  const location = useLocation();

  // Track page views in Google Analytics on route changes
  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
      (window as unknown as { gtag: Function }).gtag("config", "G-PZK8FJJXT4", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search]);

  // Debug trigger to preview the Error Boundary Runtime Error view
  if (location.search.includes("trigger-error=true")) {
    throw new Error(
      "Simulated Runtime Error: This is a demo error triggered via query parameter to preview the architectural blueprint error page."
    );
  }

  const cleanPath = location.pathname.replace(/\/+$/, "") || "/";
  const validRoutes = [
    "/",
    "/home",
    "/index.html",
    "/about",
    "/projects",
    "/team",
    "/contact",
    "/faq",
    "/services",
    "/career",
    "/admin",
  ];
  const is404Page =
    cleanPath === "/404" ||
    (!validRoutes.includes(cleanPath) && !cleanPath.startsWith("/services/"));

  const handleSearch = () => {
    // No-op: search is handled via url searchParams navigation inside Navigation component
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-[100vw]">
      <Navigation onSearch={handleSearch} />

      <main id="main-content" role="main" className="flex-1">
        <React.Suspense fallback={
          <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E6B566] animate-pulse">
              Younick Design Studio
            </div>
            <div className="w-16 h-[1px] bg-white/10 mt-4 overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#B08D57] rounded-full animate-marquee" style={{ animationDuration: "1.5s" }} />
            </div>
          </div>
        }>
          <Routes>
            {/* Primary routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Additional pages */}
            <Route path="/services" element={<Services />} />
            <Route path="/career" element={<Career />} />
            <Route path="/admin" element={<Admin />} />

            {/* 404 */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </main>

      {!is404Page && <Footer />}
      <WhatsAppButton />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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

function App() {
  // Show intro only once per browser session for human users; bypass immediately for Googlebot & crawlers
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (isSearchBotOrCrawler()) return false;
    const hasIntroParam = window.location.search.includes("intro=true") || window.location.hash.includes("intro");
    return hasIntroParam || !sessionStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    initAnalytics();
    // Expose a helper to replay the intro from the browser console
    (window as unknown as { replayIntro?: () => void }).replayIntro = () => {
      sessionStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    };
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Clean up ?intro=true from the URL without reloading the page
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

  return (
    <HelmetProvider>
      <Router>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#E6B566] focus:text-black focus:rounded-md focus:font-semibold focus:shadow-lg">
          Skip to main content
        </a>
        <ErrorBoundary>
          {/* Intro overlay — fixed on top, unmounts after exit animation */}
          {showIntro && (
            <IntroScreen onComplete={handleIntroComplete} />
          )}
          <ScrollToTop />
          <AppContent />
          <Analytics />
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;