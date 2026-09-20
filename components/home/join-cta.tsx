import Image from "next/image";
import { Calendar } from "lucide-react";
import { NewsletterForm } from "@/components/brand/newsletter-form";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { Parallax } from "@/components/motion/parallax";

/** Closing conversion panel — full-bleed plate behind a centred mailing-list block. */
export function JoinCta() {
  return (
    <section className="relative bg-ink text-ivory overflow-hidden grain border-t border-ivory/10">
      <div className="absolute inset-0 z-0">
        <Parallax distance={60} className="absolute inset-0 -top-[10%] h-[120%]">
          <Image
            src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2000&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.35] contrast-[1.1] saturate-[0.8]"
          />
        </Parallax>
        <div className="absolute inset-0 bg-ink/75" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32 text-center flex flex-col items-center gap-5 sm:gap-6">
        <Reveal variant="fade" duration={600}>
          <div className="inline-flex items-center gap-2 bg-ivory/10 backdrop-blur-sm px-3 py-1.5 border border-ivory/20">
            <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="text-[10px] sm:text-xs font-headline uppercase tracking-[0.2em] text-gold">
              Priority Launch Access
            </span>
          </div>
        </Reveal>

        <SplitHeadline
          as="h2"
          lines={["NEVER MISS A", "TOURNAMENT DROP"]}
          stagger={110}
          className="text-[2.1rem] xs:text-5xl sm:text-6xl md:text-7xl font-headline uppercase tracking-[-0.03em] leading-[0.88] text-ivory"
        />

        <Reveal variant="up" delay={200}>
          <p className="text-sm sm:text-base text-ivory/70 font-body max-w-xl leading-relaxed">
            Team rosters fill within hours. Join the official GAMEDAY dispatch for early
            registration windows, bracket reveals, and exclusive vendor drops.
          </p>
        </Reveal>

        <Reveal variant="up" delay={300} className="w-full max-w-md mt-2 sm:mt-4">
          <NewsletterForm buttonText="GET NOTIFIED" />
        </Reveal>

        <Reveal variant="fade" delay={420}>
          <p className="text-[10px] sm:text-xs text-ivory/40 uppercase tracking-[0.18em]">
            No spam. Strictly tournament drops and schedule alerts.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
