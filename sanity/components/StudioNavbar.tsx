import React from "react";

export function StudioNavbar(props: any) {
  return (
    <div>
      {/* Top Banner Bar */}
      <div
        style={{
          backgroundColor: "#070D18",
          borderBottom: "1px solid rgba(195, 214, 228, 0.2)",
          padding: "6px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 8px #10B981",
            }}
          />
          <span style={{ color: "#94A3B8", fontWeight: 500 }}>
            Live Production CMS
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#94A3B8",
              textDecoration: "none",
              padding: "3px 10px",
              borderRadius: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.2s",
            }}
          >
            Local Preview ↗
          </a>
          <a
            href="https://yds-liart.vercel.app"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#0B1220",
              textDecoration: "none",
              padding: "3px 12px",
              borderRadius: "6px",
              backgroundColor: "#C3D6E4",
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(195, 214, 228, 0.3)",
              transition: "all 0.2s",
            }}
          >
            View Live Website ↗
          </a>
        </div>
      </div>

      {/* Default Sanity Navbar */}
      {props.renderDefault(props)}
    </div>
  );
}
