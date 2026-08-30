import React from "react";

export function StudioLogo(props: any) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 8px" }}>
      <img
        src="https://yds-liart.vercel.app/younick-crest.png"
        alt="Younick Crest"
        style={{
          width: "28px",
          height: "32px",
          objectFit: "contain",
          filter: "drop-shadow(0 2px 4px rgba(195,214,228,0.4))",
        }}
        onError={(e: any) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            fontFamily: "serif",
            fontSize: "17px",
            fontWeight: "bold",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          Younick
        </span>
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: "9px",
            fontWeight: 700,
            color: "#C3D6E4",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Design Studio
        </span>
      </div>
    </div>
  );
}
