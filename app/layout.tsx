import type { Metadata, Viewport } from "next";
import { fontAnton, fontInter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAMEDAY | The Community Sports & Tournament Platform",
  description:
    "High-energy community sports tournaments, 1v1 showdowns, curated local vendor markets, and championship events.",
  keywords: [
    "GAMEDAY",
    "sports tournaments",
    "intramural sports",
    "1v1 basketball",
    "community events",
    "local vendors",
  ],
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
