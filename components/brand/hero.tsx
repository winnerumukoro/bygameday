import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { Parallax } from "@/components/motion/parallax";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  /** Optional full title string or split lines */
  title?: string;
  /** Each entry is one masked line of the display headline. */
  titleLines?: string[];
  subtitle?: string;
  eyebrow?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  /** Meta rail pinned to the bottom edge on desktop. */
  stats?: HeroStat[];
}

const DEFAULT_STATS: HeroStat[] = [
  { value: "24", label: "Live Tournaments" },
  { value: "60", label: "Curated Vendors" },
  { value: "1.8K", label: "Rostered Athletes" },
];

export function Hero({
  title,
  titleLines = ["COMPETE.", "CONNECT.", "CELEBRATE."],
  subtitle = "High-octane sports tournaments, single-elimination brackets, and curated community markets. Built for athletes, creators, and fans.",
  eyebrow = "Season 2026 Registration Now Open",
  ctaText = "EXPLORE CALENDAR",
  ctaHref = "#events",
  secondaryCtaText = "ENTER A BRACKET",
  secondaryCtaHref = "/sports",
  imageSrc = "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2400&auto=format&fit=crop",
  stats = DEFAULT_STATS,
}: HeroProps) {
  const displayLines = title
    ? title.includes(". ")
      ? title.split(". ").map((s) => (s.endsWith(".") ? s : `${s}.`))
      : [title]
    : titleLines;
  return (
    <section className="relative min-h-[88svh] md:min-h-screen w-full flex items-end justify-start overflow-hidden bg-ink grain">
      {/* Background plate: slow ken-burns push, parallax drift, grain on top */}
      <div className="absolute inset-0 z-0">
        <Parallax distance={90} className="absolute inset-0 -top-[10%] h-[120%]">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.62] contrast-[1.12] saturate-[0.85] animate-ken-burns motion-reduce:animate-none"
          />
        </Parallax>

        {/* Legibility stack — a vertical fade plus a left-weighted wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />
      </div>

      {/* Vertical hairline grid — structure without decoration */}
      <div className="absolute inset-0 z-[1] hidden lg:block pointer-events-none" aria-hidden="true">
        <div className="max-w-stadium mx-auto h-full px-12 grid grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="border-l border-ivory/[0.07] h-full" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 md:pb-24 pt-28 sm:pt-32">
        <div className="max-w-5xl flex flex-col items-start gap-5 sm:gap-6">
          <Reveal variant="fade" duration={700}>
            <div className="inline-flex items-center gap-2.5 bg-ink/70 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="font-headline text-[10px] xs:text-xs tracking-[0.18em] uppercase text-ivory/90">
                {eyebrow}
              </span>
            </div>
          </Reveal>

          {/* Scoreboard headline, one masked line at a time */}
          <SplitHeadline
            as="h1"
            immediate
            delay={180}
            stagger={110}
            lines={displayLines}
            className="text-ivory font-headline uppercase leading-[0.86] tracking-[-0.03em]"
            lineClassName="[font-size:clamp(2.75rem,12vw,9rem)]"
          />

          <Reveal variant="up" delay={620} duration={800}>
            <p className="text-sm sm:text-base md:text-lg text-ivory/80 font-body max-w-xl leading-relaxed">
              {subtitle}
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={760}
            duration={800}
            className="w-full sm:w-auto pt-1 sm:pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button asChild variant="primary" size="lg" className="tracking-[0.12em] group">
              <Link href={ctaHref}>
                <span>{ctaText}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-450 ease-out-expo group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondaryLight"
              size="lg"
              className="tracking-[0.12em] btn-sweep backdrop-blur-sm"
            >
              <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
            </Button>
          </Reveal>
        </div>

        {/* Meta rail — scrollable on phones, spread on desktop */}
        <Reveal
          variant="up"
          delay={900}
          className="mt-10 sm:mt-14 md:mt-20 border-t border-ivory/15 pt-5 sm:pt-6"
        >
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <dl className="flex items-end gap-6 sm:gap-10 md:gap-16">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-headline text-2xl sm:text-3xl md:text-4xl text-ivory leading-none">
                    {stat.value}
                    <span className="text-gold">+</span>
                  </dd>
                  <span className="mt-1.5 text-[9px] xs:text-[10px] sm:text-xs font-headline uppercase tracking-[0.18em] text-ivory/50">
                    {stat.label}
                  </span>
                </div>
              ))}
            </dl>

            {/* Scroll cue */}
            <div className="hidden md:flex items-center gap-3 text-ivory/45">
              <span className="text-[10px] font-headline uppercase tracking-[0.25em]">Scroll</span>
              <span className="relative block h-10 w-px overflow-hidden bg-ivory/20">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-gold animate-scroll-cue" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
