import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { Project } from "../data/projects";

// Lazy-load the dashboard so it only downloads when authenticated (Security Isolation)
const AdminDashboard = React.lazy(() => import("../components/AdminDashboard"));

// Native cryptographic helper to hash strings using SHA-256
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);

  // Check auth session on mount
  useEffect(() => {
    try {
      const sessionStr = sessionStorage.getItem("younick_admin_session");
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session && session.expiresAt > Date.now()) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem("younick_admin_session");
        }
      }
    } catch (e) {
      console.error("Session verification failed:", e);
    }

    // Load dynamic projects
    try {
      const stored = localStorage.getItem("younick_dynamic_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setDynamicProjects(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const hash = await sha256(password);
      // SHA-256 target signature for "younick2026"
      const TARGET_HASH = "a57a59ea182a8f9d56fa37f11fd902cad3a91d2f49c52abe3a4a49cb44778f65";

      if (hash === TARGET_HASH) {
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const token = Array.from(array).map((n) => n.toString(16)).join("-");

        const session = {
          token,
          expiresAt: Date.now() + 30 * 60 * 1000, // 30 mins session expiry
        };

        sessionStorage.setItem("younick_admin_session", JSON.stringify(session));
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setError("Invalid administrative credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during cryptographic verification.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("younick_admin_session");
    setIsAuthenticated(false);
  };

  const seoForPage = {
    title: "Secure Admin Console | Younick Design Studio",
    description: "Manage portfolio items and update architectural collections.",
    url: "/admin",
  };

  return (
    <>
      <SEOHead seo={seoForPage} type="website" />

      {/* Main Container */}
      <main className="min-h-screen bg-[#09090B] text-white pt-24 pb-12 px-0 font-sans overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-10%,rgba(230,181,102,0.03),transparent)] pointer-events-none" />

        <div className="w-full relative z-10">
          
          {!isAuthenticated ? (
            /* ──────── IMMERSIVE SPLIT-SCREEN LOG-IN SCREEN ──────── */
            <div className="min-h-[80vh] flex flex-col md:flex-row max-w-6xl mx-auto border border-white/5 md:border-white/10 rounded-[32px] overflow-hidden bg-black/40 backdrop-blur-md shadow-2xl m-4 md:m-8">
              
              {/* Left Brand Panel */}
              <div className="md:w-1/2 bg-[#0D0D0F] border-b md:border-b-0 md:border-r border-white/5 relative flex flex-col justify-between p-10 md:p-14 overflow-hidden">
                {/* Blueprint grid lines decoration */}
                <div 
                  className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Subtle soft glowing gold circle */}
                <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-[#E6B566]/[0.03] blur-[80px] pointer-events-none" />
                
                {/* Top Section */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6B566] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#E6B566] uppercase">Younick Design Studio</span>
                  </div>
                </div>

                {/* Middle Content */}
                <div className="relative z-10 py-16 md:py-0 space-y-6">
                  <span className="text-[8px] font-mono tracking-[0.25em] text-gray-500 uppercase block">Console Gate</span>
                  <h2 className="text-4xl lg:text-5xl font-serif text-white/90 leading-tight font-medium">
                    Spaces of <br />
                    <span className="italic text-[#E6B566]">distinction</span> and <br />
                    refined beauty.
                  </h2>
                  <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-light">
                    Decrypt the administrative port to catalog design collections, specify parameters, and curate the client-facing showroom.
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 text-[9px] font-mono text-gray-600 tracking-wider">
                  SYSTEM_AUTH_GATE // SECURED_NODE_V2.0
                </div>
              </div>

              {/* Right Login Panel */}
              <div className="md:w-1/2 flex flex-col justify-center p-8 md:p-14 bg-[#09090B]/80 relative">
                <div className="max-w-md w-full mx-auto relative">
                  
                  {/* Glowing padlock badge */}
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E6B566] to-[#B08D57] flex items-center justify-center shadow-lg shadow-[#E6B566]/10 mb-8">
                    <Lock className="text-[#09090B] w-4.5 h-4.5" />
                  </div>

                  <div className="mb-8">
                    <h1 className="text-2xl font-serif text-white">Administrative Key</h1>
                    <p className="text-gray-500 text-xs mt-2 font-light">
                      Please enter your passcode credentials to initialize the dashboard console.
                    </p>
                  </div>

                  {error && (
                    <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3.5 text-xs text-red-400 flex items-center gap-2.5 animate-pulse">
                      <AlertTriangle size={14} className="flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label htmlFor="admin-pass" className="block text-[9px] uppercase tracking-wider text-gray-400 mb-2.5 font-semibold">
                        Passcode Security Signature
                      </label>
                      <div className="relative group">
                        <input
                          id="admin-pass"
                          name="admin-pass"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-white/[0.02] border border-white/10 hover:border-white/15 focus:border-[#E6B566]/40 focus:bg-white/[0.04] focus:outline-none rounded-xl px-4.5 py-4 text-xs font-mono tracking-widest text-white transition placeholder-gray-800"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white text-[#09090B] font-bold text-xs uppercase tracking-widest hover:bg-[#E6B566] hover:text-[#09090B] transition duration-300 disabled:opacity-50 cursor-pointer shadow-lg shadow-black/25 active:scale-95"
                    >
                      {loading ? "Decrypting Channel..." : "Establish Verification"}
                    </button>
                  </form>

                  <div className="mt-12 pt-6 border-t border-white/5 text-center text-[9px] text-gray-600 font-mono tracking-wider">
                    SHA-256 ONE-WAY HASH VERIFICATION
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* ──────── DYNAMICALLY LOADED AUTHENTICATED MODULE (Decoupled Chunk) ──────── */
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <React.Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center py-32 text-center font-mono text-xs text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border border-white/25 border-t-[#E6B566] mb-4" />
                    Initializing Decrypted Administrative Node...
                  </div>
                }
              >
                <AdminDashboard
                  onLogout={handleLogout}
                  dynamicProjects={dynamicProjects}
                  setDynamicProjects={setDynamicProjects}
                  addActivity={() => {}} // Dummy noop function for compatibility
                />
              </React.Suspense>
            </div>
          )}

        </div>
      </main>
    </>
  );
};

export default Admin;
