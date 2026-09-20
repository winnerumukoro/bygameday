import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Store, Trophy, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { Tilt } from "@/components/motion/tilt";

const PILLARS = [
  {
    id: "01",
    href: "/sports",
    icon: Trophy,
    title: ["PLAY", "A BRACKET"],
    body: "Enter as a team, or enter alone and we'll put you on one. We handle seeding, scheduling and refs; you show up and play.",
    cta: "See divisions and dates",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    href: "/vendors/apply",
    icon: Store,
    title: ["SELL", "AT AN EVENT"],
    body: "We take one vendor per food category per event, so you're not parked next to three other taco trucks. Apply free; you only pay if we give you the slot.",
    cta: "Apply for a slot",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    href: "/sponsors",
    icon: Users,
    title: ["SPONSOR", "A TOURNAMENT"],
    body: "For local businesses that want their name on a weekend bracket. We'll tell you who turns up and what you get for it.",
    cta: "Talk to us about it",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop",
  },
];

/** Three ways into GAMEDAY — play, sell, or sponsor. */
export function Pillars() {
  return (
    <section className="relative bg-ink text-ivory py-16 sm:py-20 md:py-32 w-full grain overflow-hidden">
      <div className="relative max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12 sm:mb-16 md:mb-24 max-w-4xl">
          {/* One of the two eyebrows kept on this page */}
          <Reveal variant="fade" duration={600}>
            <span className="flex items-center gap-2.5 text-[10px] sm:text-xs font-headline tracking-[0.25em] uppercase text-gold">
              <span className="h-px w-6 bg-gold shrink-0" />
              Three ways in
            </span>
          </Reveal>

          <SplitHeadline
            as="h2"
            lines={["PLAY, SELL,", "OR BACK A BRACKET"]}
            stagger={100}
            className="text-[2rem] xs:text-4xl sm:text-6xl lg:text-7xl font-headline uppercase tracking-[-0.02em] leading-[1.02] text-ivory mt-3"
            lineClassName="pb-[0.05em]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 perspective-1000">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.id} variant="up" delay={index * 130} duration={950}>
                <Tilt max={4} className="h-full">
                  <Link
                    href={pillar.href}
                    className="group relative flex h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[480px] flex-col justify-between overflow-hidden border border-ivory/12 bg-ivory/[0.04] p-5 sm:p-7 transition-colors duration-450 ease-out-expo hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {/* Image plate fades in behind the copy on hover */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-900 ease-out-expo group-hover:opacity-100">
                      <Image
                        src={pillar.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center scale-105 transition-transform duration-900 ease-out-expo group-hover:scale-100"
                      />
                      <div className="absolute inset-0 bg-ink/78" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-gold transition-transform duration-600 ease-out-expo group-hover:-translate-y-1" />
                        <span className="font-headline text-4xl sm:text-5xl leading-none text-outline-ivory">
                          {pillar.id}
                        </span>
                      </div>

                      <h3 className="mt-7 sm:mt-9 text-[1.75rem] xs:text-3xl sm:text-4xl font-headline uppercase text-ivory leading-[1.02] tracking-tight">
                        {pillar.title.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>

                      <p className="text-[13px] sm:text-sm text-ivory/70 font-body mt-4 leading-relaxed max-w-sm">
                        {pillar.body}
                      </p>
                    </div>

                    <div className="relative z-10 pt-6 sm:pt-8 mt-6 border-t border-ivory/12 flex items-center justify-between gap-3">
                      <span className="link-wipe text-[10px] sm:text-xs font-headline uppercase tracking-[0.18em] text-gold">
                        {pillar.cta}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-gold transition-transform duration-450 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </Link>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
