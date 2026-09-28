import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GAMEDAY — Sports tournaments with local food vendors";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await fetch(new URL("../public/brand/logo-web-light.png", import.meta.url)).then((res) =>
    res.arrayBuffer()
  );

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
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            // Satori accepts an ArrayBuffer as the image source.
            src={logo as unknown as string}
            width={417}
            height={44}
          />

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
            <span>SPORTS</span>
            <span style={{ color: "#C89A2B" }}>TOURNAMENTS</span>
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "rgba(245, 244, 235, 0.8)",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            Weekend brackets in basketball, volleyball, soccer, flag football and pickleball, with local food vendors on site.
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
          <div
            style={{
              display: "flex",
              gap: "28px",
              fontSize: "15px",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245, 244, 235, 0.7)",
            }}
          >
            <span>Basketball</span>
            <span>Volleyball</span>
            <span>Soccer</span>
            <span>Flag Football</span>
            <span>Pickleball</span>
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
            <span>ENTER A BRACKET</span>
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
