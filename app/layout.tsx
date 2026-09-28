import type { Metadata, Viewport } from "next";
import { fontAnton, fontInter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bygameday.com"),
  title: {
    default: "GAMEDAY | Sports Tournaments",
    template: "%s | GAMEDAY",
  },
  description:
    "Weekend sports brackets in basketball, volleyball, soccer, flag football and pickleball, with local food vendors on site.",
  keywords: [
    "GAMEDAY",
    "sports tournaments",
    "intramural sports",
    "1v1 basketball",
    "flag football tournament",
    "pickleball tournament",
    "tournament brackets",
    "food vendors",
  ],
  authors: [{ name: "GAMEDAY" }],
  creator: "GAMEDAY",
  publisher: "GAMEDAY",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bygameday.com",
    siteName: "GAMEDAY",
    title: "GAMEDAY | Sports Tournaments",
    description:
      "Weekend sports brackets in basketball, volleyball, soccer, flag football and pickleball, with local food vendors on site.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAMEDAY | Sports Tournaments",
    description:
      "Weekend sports brackets in basketball, volleyball, soccer, flag football and pickleball, with local food vendors on site.",
    creator: "@bygameday",
  },
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "any" },
      { url: "/brand/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/brand/apple-touch-icon.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontAnton.variable} ${fontInter.variable}`}>
      <body className="min-h-screen bg-ivory text-ink flex flex-col font-body">
        {children}
      </body>
    </html>
  );
}
