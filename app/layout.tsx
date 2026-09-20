import type { Metadata, Viewport } from "next";
import { fontAnton, fontInter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bygameday.com"),
  title: {
    default: "GAMEDAY | The Community Sports & Tournament Platform",
    template: "%s | GAMEDAY",
  },
  description:
    "High-energy community sports tournaments, 1v1 showdowns, curated local vendor markets, and championship events. Built for athletes, creators, and fans.",
  keywords: [
    "GAMEDAY",
    "sports tournaments",
    "intramural sports",
    "1v1 basketball",
    "community events",
    "local vendors",
    "tournament brackets",
    "Austin sports",
  ],
  authors: [{ name: "GAMEDAY Operations Team" }],
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
    title: "GAMEDAY | The Community Sports & Tournament Platform",
    description:
      "High-energy community sports tournaments, 1v1 showdowns, curated local vendor markets, and championship events.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAMEDAY | The Community Sports & Tournament Platform",
    description:
      "High-energy community sports tournaments, 1v1 showdowns, curated local vendor markets, and championship events.",
    creator: "@bygameday",
  },
  icons: {
    icon: "/brand/logo-dark.svg",
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
