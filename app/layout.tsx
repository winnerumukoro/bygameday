import type { Metadata, Viewport } from "next";
import { fontAnton, fontInter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bygameday.com"),
  title: {
    default: "GAMEDAY | Austin Sports Tournaments",
    template: "%s | GAMEDAY",
  },
  description:
    "Weekend sports brackets around Austin — basketball, volleyball, soccer, flag football and pickleball — with local food vendors on site.",
  keywords: [
    "GAMEDAY",
    "Austin sports tournaments",
    "Austin intramural sports",
    "1v1 basketball Austin",
    "Austin pickup soccer",
    "Austin local food trucks",
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
    title: "GAMEDAY | Austin Sports Tournaments",
    description:
      "Weekend sports brackets around Austin — basketball, volleyball, soccer, flag football and pickleball — with local food vendors on site.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAMEDAY | Austin Sports Tournaments",
    description:
      "Weekend sports brackets around Austin — basketball, volleyball, soccer, flag football and pickleball — with local food vendors on site.",
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
