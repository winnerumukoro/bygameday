import { Hero } from "@/components/brand/hero";
import { AnnouncementTicker } from "@/components/home/announcement-ticker";
import { CredentialRail } from "@/components/home/credential-rail";
import { RoadmapTracker } from "@/components/home/roadmap-tracker";
import { FeaturedEvents } from "@/components/home/featured-events";
import { Pillars } from "@/components/home/pillars";
import { HowItWorks } from "@/components/home/how-it-works";
import { StatsBand } from "@/components/home/stats-band";
import { GalleryMosaic } from "@/components/home/gallery-mosaic";
import { JoinCta } from "@/components/home/join-cta";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-ivory text-ink overflow-x-clip">
      {/* Build status rail */}
      <AnnouncementTicker />

      {/* Full-bleed hero */}
      <Hero
        titleLines={["COMPETE.", "CONNECT.", "CELEBRATE."]}
        subtitle="High-octane sports tournaments, single-elimination brackets, and curated community markets. Built for athletes, creators, and fans."
        ctaText="EXPLORE CALENDAR"
        ctaHref="#events"
        secondaryCtaText="ENTER A BRACKET"
        secondaryCtaHref="/sports"
      />

      {/* Scrolling keyword rail */}
      <CredentialRail />

      {/* Client delivery tracker */}
      <RoadmapTracker />

      {/* Next four fixtures */}
      <FeaturedEvents />

      {/* Three core product pillars */}
      <Pillars />

      {/* Sign-up path */}
      <HowItWorks />

      {/* Animated figures */}
      <StatsBand />

      {/* Photo mosaic */}
      <GalleryMosaic />

      {/* Mailing list conversion panel */}
      <JoinCta />
    </div>
  );
}
