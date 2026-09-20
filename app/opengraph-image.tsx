import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GAMEDAY — The Community Sports & Tournament Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          color: "#F5F4EB",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle accent border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#C89A2B",
          }}
        />

        {/* Top Header Tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#F5F4EB",
                textTransform: "uppercase",
              }}
            >
              GAMEDAY
            </div>
            <div
              style={{
                backgroundColor: "rgba(200, 154, 43, 0.2)",
                border: "1px solid #C89A2B",
                color: "#C89A2B",
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "0.2em",
                padding: "4px 12px",
                textTransform: "uppercase",
              }}
            >
              SEASON 2026
            </div>
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "rgba(245, 244, 235, 0.6)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            BYGAMEDAY.COM
          </div>
        </div>

        {/* Headline & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "#F5F4EB",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>COMPETE. CONNECT.</span>
            <span style={{ color: "#C89A2B" }}>CELEBRATE.</span>
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "rgba(245, 244, 235, 0.8)",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            The premier community sports, intramural tournament, and curated vendor operations platform.
          </div>
        </div>

        {/* Stadium Meta Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(245, 244, 235, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, color: "#F5F4EB" }}>24</span>
              <span style={{ fontSize: "11px", color: "rgba(245, 244, 235, 0.5)", textTransform: "uppercase" }}>
                Tournaments
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, color: "#C89A2B" }}>1,840+</span>
              <span style={{ fontSize: "11px", color: "rgba(245, 244, 235, 0.5)", textTransform: "uppercase" }}>
                Athletes
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, color: "#F5F4EB" }}>60+</span>
              <span style={{ fontSize: "11px", color: "rgba(245, 244, 235, 0.5)", textTransform: "uppercase" }}>
                Curated Vendors
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#C89A2B",
            }}
          >
            <span>LIVE OPERATIONAL ENGINE</span>
            <span>→</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
