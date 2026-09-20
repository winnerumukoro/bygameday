import Image from "next/image";
import { NewsletterForm } from "@/components/brand/newsletter-form";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { Parallax } from "@/components/motion/parallax";

/** Closing sign-up panel. This is the only email capture on the page. */
export function JoinCta() {
  return (
    <section className="relative bg-ink text-ivory overflow-hidden grain border-t border-ivory/10">
      <div className="absolute inset-0 z-0">
        <Parallax distance={60} className="absolute inset-0 -top-[10%] h-[120%]">
          <Image
            src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1600&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.35] contrast-[1.1] saturate-[0.8]"
          />
        </Parallax>
        <div className="absolute inset-0 bg-ink/75" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 py-20 sm:py-24 md:py-32 text-center flex flex-col items-center gap-6">
        <SplitHeadline
          as="h2"
          lines={["KNOW WHEN", "SIGN-UPS OPEN"]}
          stagger={110}
          className="text-[2.1rem] xs:text-5xl sm:text-6xl md:text-7xl font-headline uppercase tracking-[-0.02em] leading-[1.02] text-ivory"
          lineClassName="pb-[0.05em]"
        />

        <Reveal variant="up" delay={200}>
          <p className="text-sm sm:text-base text-ivory/70 font-body max-w-xl leading-relaxed">
            Registration opens a few weeks before each tournament and the popular divisions fill in a
            day or two. Give us your email and we&apos;ll tell you when it goes live.
          </p>
        </Reveal>

        <Reveal variant="up" delay={300} className="w-full max-w-md mt-2">
          <NewsletterForm buttonText="NOTIFY ME" />
        </Reveal>

        <Reveal variant="fade" delay={420}>
          <p className="text-[10px] sm:text-xs text-ivory/40 uppercase tracking-[0.18em]">
            Schedule and registration emails only.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
