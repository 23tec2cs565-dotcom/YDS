import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import IntroScreen from "./components/IntroScreen";
const STORAGE_KEY = "younick_intro_v1";
const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const OurTeam = React.lazy(() => import("./pages/OurTeam"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const About = React.lazy(() => import("./pages/About"));
const Services = React.lazy(() => import("./pages/Services"));
const Career = React.lazy(() => import("./pages/Career"));
const ServiceDetails = React.lazy(() => import("./pages/ServiceDetails"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Admin = React.lazy(() => import("./pages/Admin"));
import ErrorBoundary from "./components/ErrorBoundary";
import { initAnalytics } from "./utils/analytics";

function AppContent() {
  const location = useLocation();

  // Debug trigger to preview the Error Boundary Runtime Error view
  if (location.search.includes("trigger-error=true")) {
    throw new Error(
      "Simulated Runtime Error: This is a demo error triggered via query parameter to preview the architectural blueprint error page."
    );
  }

  const is404Page = location.pathname === "/404" || (
    ![
      "/",
      "/home",
      "/about",
      "/projects",
      "/team",
      "/contact",
      "/faq",
      "/services",
      "/career",
      "/admin",
    ].includes(location.pathname) &&
    !location.pathname.startsWith("/services/")
  );

  const handleSearch = () => {
    // No-op: search is handled via url searchParams navigation inside Navigation component
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation onSearch={handleSearch} />

      <main role="main" className="flex-1">
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
            <Route path="/faq" element={<FAQ />} />

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
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function App() {
  // Show intro only once per browser session, or if explicit ?intro=true parameter is provided
  const [showIntro, setShowIntro] = useState<boolean>(() => {
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
        <ErrorBoundary>
          {/* Intro overlay — fixed on top, unmounts after exit animation */}
          {showIntro && (
            <IntroScreen onComplete={handleIntroComplete} />
          )}
          <ScrollToTop />
          <AppContent />
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;