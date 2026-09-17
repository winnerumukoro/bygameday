"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Events", href: "/events" },
  { label: "Sports", href: "/sports" },
  { label: "Vendors", href: "/vendors" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Gallery", href: "/gallery" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  // On home, start transparent with light logo; when scrolled or on other pages, solid ivory with dark logo
  const isLightMode = isScrolled || !isHome;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isLightMode
            ? "bg-ivory/95 backdrop-blur-md border-b border-ink/10 py-3.5 shadow-sm"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Logo variant={isLightMode ? "dark" : "light"} />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-headline uppercase tracking-wider transition-colors duration-150 relative py-1",
                    isLightMode
                      ? isActive
                        ? "text-gold font-bold"
                        : "text-ink/80 hover:text-ink"
                      : isActive
                      ? "text-gold font-bold"
                      : "text-ivory/90 hover:text-ivory"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="primary" size="default">
              <Link href="/join">Join Now</Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "p-2 min-h-[48px] min-w-[48px] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm",
                isLightMode ? "text-ink" : "text-ivory"
              )}
              aria-label="Open mobile navigation"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink text-ivory flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Mobile Overlay Header */}
          <div className="flex items-center justify-between">
            <Logo variant="light" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 min-h-[48px] min-w-[48px] text-ivory hover:text-gold inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Close navigation"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Big Uppercase Nav Links */}
          <nav className="flex flex-col gap-6 my-auto" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-4xl sm:text-5xl font-headline uppercase tracking-tight py-2 transition-colors",
                    isActive ? "text-gold" : "text-ivory hover:text-gold"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Action in Mobile Overlay */}
          <div className="flex flex-col gap-4 pt-6 border-t border-ivory/10">
            <Button asChild variant="primary" size="lg" fullWidthMobile={true}>
              <Link href="/join">Join Now</Link>
            </Button>
            <p className="text-xs text-ivory/50 uppercase tracking-widest text-center mt-2">
              GAMEDAY Platform • All Rights Reserved
            </p>
          </div>
        </div>
      )}
    </>
  );
}
