import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
}

export function Hero({
  title = "COMPETE. CONNECT. CELEBRATE.",
  subtitle = "High-octane tournaments, streetball showdowns, and curated community festivals. Experience the new standard of game day.",
  ctaText = "EXPLORE EVENTS",
  ctaHref = "/events",
  imageSrc = "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2000&auto=format&fit=crop", // High-impact basketball court / arena
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-end justify-start overflow-hidden bg-ink">
      {/* Background Image with optimized dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="GAMEDAY Arena Atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100 filter brightness-75 contrast-110"
        />
        {/* Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="absolute inset-0 bg-ink/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 pb-16 md:pb-24 pt-32">
        <div className="max-w-4xl flex flex-col items-start gap-4 md:gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-ink/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="font-headline text-xs tracking-widest uppercase text-ivory/90">
              Season 2026 Registration Now Open
            </span>
          </div>

          {/* Stadium Scoreboard Headline */}
          <h1
            className="text-ivory font-headline uppercase leading-tightest tracking-tighter"
            style={{
              fontSize: "clamp(3.25rem, 9.5vw, 8.75rem)",
            }}
          >
            {title}
          </h1>

          {/* Subline */}
          <p className="text-base sm:text-lg md:text-xl text-ivory/85 font-body max-w-2xl leading-relaxed">
            {subtitle}
          </p>

          {/* Single Gold CTA */}
          <div className="pt-2 w-full sm:w-auto">
            <Button asChild variant="primary" size="lg" fullWidthMobile={true} className="text-base tracking-wider">
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
