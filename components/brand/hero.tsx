import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { Parallax } from "@/components/motion/parallax";

interface HeroProps {
  /** Each entry is one masked line of the display headline. */
  titleLines?: string[];
  /** Legacy single-string title; split on sentence breaks. */
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
}

export function Hero({
  title,
  titleLines = ["AUSTIN", "SPORTS", "TOURNAMENTS"],
  subtitle = "We run weekend brackets across Austin — basketball, volleyball, soccer, flag football and pickleball — with local food vendors on site. Enter with a team or on your own.",
  ctaText = "SEE THE SCHEDULE",
  ctaHref = "/events",
  secondaryCtaText = "ENTER A BRACKET",
  secondaryCtaHref = "/sports",
  imageSrc = "/tmp-verify/hero-b.jpg",
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
            className="object-cover object-center brightness-[1.05] contrast-[1.05] saturate-[0.9] animate-ken-burns motion-reduce:animate-none"
          />
        </Parallax>

        {/* Legibility stack — a vertical fade plus a left-weighted wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
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
      <div className="relative z-10 w-full max-w-stadium mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-28 pt-32 sm:pt-36">
        <div className="max-w-5xl flex flex-col items-start gap-7 sm:gap-8">
          {/*
            Display type. Anton is very tall, so the mask needs headroom or
            the descenders of one line clip the caps of the next. Line height
            sits just above 1 and the clamp is capped so it never crowds the
            right edge on wide screens.
          */}
          <SplitHeadline
            as="h1"
            immediate
            delay={120}
            stagger={110}
            lines={displayLines}
            className="text-ivory font-headline uppercase tracking-[-0.01em]"
            lineClassName="[font-size:clamp(2.5rem,9vw,7rem)] leading-[1.04] pb-[0.06em]"
          />

          <Reveal variant="up" delay={560} duration={800}>
            <p className="text-base sm:text-lg text-ivory/80 font-body max-w-xl leading-relaxed">
              {subtitle}
            </p>
          </Reveal>

          <Reveal
            variant="up"
            delay={700}
            duration={800}
            className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 sm:gap-4"
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
      </div>
    </section>
  );
}
