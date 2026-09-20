import { Hero } from "@/components/brand/hero";
import { CredentialRail } from "@/components/home/credential-rail";
import { Pillars } from "@/components/home/pillars";
import { HowItWorks } from "@/components/home/how-it-works";
import { JoinCta } from "@/components/home/join-cta";

/*
 * Sections deliberately not on this page yet, pending real material:
 *  - Upcoming calendar  — the seed events are fabricated New York venues.
 *  - "The Atmosphere"   — waiting on the event photo portfolio.
 *  - Stats band         — the figures were invented; removed permanently.
 *  - Project tracker    — internal delivery status, not public-facing.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-ivory text-ink overflow-x-clip">
      <Hero />

      {/* Scrolling keyword rail */}
      <CredentialRail />

      {/* Play / sell / sponsor */}
      <Pillars />

      {/* Sign-up path */}
      <HowItWorks />

      {/* Single email capture */}
      <JoinCta />
    </div>
  );
}
