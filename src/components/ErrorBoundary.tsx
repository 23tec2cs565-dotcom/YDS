import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, WifiOff, RefreshCw, Home, Terminal, ChevronDown } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isOffline: boolean;
  isRetrying: boolean;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    isOffline: !navigator.onLine || (typeof window !== "undefined" && window.location.search.includes("trigger-offline=true")),
    isRetrying: false,
    showDetails: false,
  };

  private handleOnline = () => {
    this.setState({ isOffline: false });
    window.location.reload();
  };

  private handleOffline = () => {
    this.setState({ isOffline: true });
  };

  public componentDidMount() {
    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
    window.addEventListener("unhandledrejection", this.handlePromiseRejection);
  }

  public componentWillUnmount() {
    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
    window.removeEventListener("unhandledrejection", this.handlePromiseRejection);
  }

  private handlePromiseRejection = (event: PromiseRejectionEvent) => {
    if (event.reason && (
      event.reason.name === "ChunkLoadError" ||
      /failed to fetch/i.test(event.reason.message || "")
    )) {
      this.setState({
        hasError: true,
        error: new Error("Network connection disrupted. Failed to load page assets."),
        isOffline: !navigator.onLine
      });
    }
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleCheckConnection = () => {
    this.setState({ isRetrying: true });
    setTimeout(() => {
      if (navigator.onLine) {
        this.setState({ isOffline: false, isRetrying: false });
        window.location.reload();
      } else {
        this.setState({ isRetrying: false });
      }
    }, 800);
  };

  public render() {
    const { isOffline, hasError, error, errorInfo, showDetails, isRetrying } = this.state;

    // ── 1. NETWORK DISRUPTION VIEW (Dark, connectivity-themed) ──
    if (isOffline) {
      return (
        <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6 text-white font-sans selection:bg-[#E6B566]/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,rgba(230,181,102,0.06),transparent)] pointer-events-none" />
          <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-[#E6B566]/5 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute w-20 h-20 rounded-full bg-[#E6B566]/10 animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-[#E6B566]/10 border border-[#E6B566]/20 flex items-center justify-center relative">
                <WifiOff className="text-[#E6B566] w-7 h-7" />
              </div>
            </div>

            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E6B566] uppercase mb-3">Connection Disrupted</span>
            <h1 className="text-3xl font-serif text-white mb-4">You are offline</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              It looks like your internet connection was interrupted. We will restore the page automatically as soon as your device reconnects.
            </p>

            <div className="flex flex-col gap-3 w-full sm:w-auto min-w-[200px]">
              <button
                onClick={this.handleCheckConnection}
                disabled={isRetrying}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#0B1220] font-medium text-xs uppercase tracking-wider hover:bg-gray-100 transition duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRetrying ? "animate-spin" : ""}`} />
                {isRetrying ? "Checking..." : "Retry Connection"}
              </button>

              <a
                href="/"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium text-xs uppercase tracking-wider transition duration-300"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </a>
            </div>

            <div className="mt-12 flex items-center gap-2 text-[10px] text-gray-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6B566] animate-pulse" />
              <span>Monitoring network connectivity...</span>
            </div>
          </div>
        </div>
      );
    }

    // ── 2. RUNTIME ERROR VIEW (Light cream, blueprint-break theme) ──
    if (hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] relative overflow-hidden font-sans selection:bg-[#E6B566]/20">
          {/* Warm ambient glow */}
          <div className="absolute top-[-15rem] right-[-10rem] w-[40rem] h-[40rem] rounded-full bg-[#E6B566]/[0.06] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10rem] left-[-8rem] w-[30rem] h-[30rem] rounded-full bg-[#B08D57]/[0.04] blur-[100px] pointer-events-none" />

          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Broken diagonal line — a design "fracture" across the page */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 900">
            <line x1="0" y1="900" x2="720" y2="350" stroke="#B08D57" strokeWidth="0.5" opacity="0.12" strokeDasharray="12 8" />
            <line x1="720" y1="350" x2="730" y2="370" stroke="#E6B566" strokeWidth="1.5" opacity="0.2" />
            <line x1="730" y1="370" x2="1440" y2="0" stroke="#B08D57" strokeWidth="0.5" opacity="0.12" strokeDasharray="12 8" />
          </svg>

          {/* Top-right status badge */}
          <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20 rounded-full border border-red-200/60 bg-white/80 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-red-400 backdrop-blur-lg shadow-sm">
            Runtime Error • Application Halted
          </div>

          {/* Main content */}
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
            <div className="max-w-2xl w-full flex flex-col items-center text-center">

              {/* Broken blueprint icon cluster */}
              <div className="relative mb-10">
                {/* Outer architectural ring */}
                <div className="absolute inset-[-16px] rounded-full border border-dashed border-[#B08D57]/15 animate-[spin_30s_linear_infinite]" />
                {/* Inner ring */}
                <div className="absolute inset-[-6px] rounded-full border border-[#E6B566]/10" />
                {/* Central icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 flex items-center justify-center shadow-lg shadow-red-500/[0.06]">
                  <AlertTriangle className="text-red-400 w-9 h-9" strokeWidth={1.5} />
                </div>
                {/* Subtle corner markers like a blueprint alignment target */}
                <div className="absolute -top-3 -left-3 w-2 h-2 border-t border-l border-[#B08D57]/25" />
                <div className="absolute -top-3 -right-3 w-2 h-2 border-t border-r border-[#B08D57]/25" />
                <div className="absolute -bottom-3 -left-3 w-2 h-2 border-b border-l border-[#B08D57]/25" />
                <div className="absolute -bottom-3 -right-3 w-2 h-2 border-b border-r border-[#B08D57]/25" />
              </div>

              {/* Label */}
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#B08D57] uppercase mb-4">
                Application Error
              </span>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-serif text-[#18181B] tracking-tight leading-tight mb-5">
                Something <span className="italic text-[#B08D57] font-normal">broke</span>.
              </h1>

              {/* Description */}
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg mb-10">
                An unexpected rendering issue has halted this page. Don't worry — your data is safe. You can reload the page or head back to our homepage.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  onClick={this.handleReset}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#18181B] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B08D57] transition-all duration-300 shadow-lg shadow-black/10"
                >
                  <RefreshCw className="w-4 h-4 group-hover:animate-spin" />
                  Reload Page
                </button>

                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-transparent border border-gray-200 text-[#18181B] text-xs font-bold uppercase tracking-widest hover:border-[#B08D57] hover:text-[#B08D57] transition-all duration-300"
                >
                  <Home className="w-4 h-4" />
                  Return Home
                </a>
              </div>

              {/* Expandable Developer Diagnostics */}
              <div className="w-full max-w-xl text-left bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => this.setState({ showDetails: !showDetails })}
                  className="w-full px-6 py-4 flex items-center justify-between text-xs text-gray-400 hover:text-[#18181B] font-mono hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Terminal size={14} className="text-[#B08D57]" />
                    <span className="uppercase tracking-wider">Diagnostics</span>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`} />
                </button>

                {showDetails && (
                  <div className="border-t border-gray-100 px-6 py-5 font-mono text-[11px] text-gray-500 overflow-x-auto max-h-[260px] leading-relaxed select-text bg-[#FAFAF8]">
                    <div className="text-red-500 font-semibold mb-3">
                      {error && error.toString()}
                    </div>
                    {errorInfo && (
                      <pre className="whitespace-pre text-gray-400 mt-2 scrollbar-thin overflow-y-auto">
                        {errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Bottom brand bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-300">
            <span>Younick Design Studio</span>
            <div className="h-3 w-px bg-gray-200" />
            <span>Designing Spaces. Creating Experiences.</span>
          </div>

          {/* Animations */}
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
