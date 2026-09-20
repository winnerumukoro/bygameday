import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/brand/section-header";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    id: "01",
    title: "FIND A DATE",
    body: "Pick the sport and the weekend that works. Each listing tells you the venue, the division and what it costs.",
    href: "/events",
    linkText: "See what's coming up",
  },
  {
    id: "02",
    title: "SIGN UP AND PAY",
    body: "Captains register the team; solo players register themselves. Fee and waiver are done in one go.",
    href: "/sports",
    linkText: "Start a registration",
  },
  {
    id: "03",
    title: "TURN UP AND PLAY",
    body: "We post the bracket before the first whistle and keep the scores updated through the final.",
    href: "/sports",
    linkText: "Look at a bracket",
  },
];

/** Three-step path with a gold connector that draws across on scroll. */
export function HowItWorks() {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-28 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
      {/* Second and last eyebrow on the page */}
      <SectionHeader title="HOW IT WORKS" subtitle="Sign-up to first whistle" />

      <div className="relative">
        {/* Connector rule behind the cards, desktop only */}
        <Reveal
          variant="fade"
          className="hidden md:block absolute left-0 right-0 top-[34px] h-px bg-ink/10"
        >
          <span className="block h-px w-full origin-left bg-gold/60 animate-rule-grow" />
        </Reveal>

        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 lg:gap-12">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.id} variant="up" delay={index * 130} className="group">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 sm:h-[68px] sm:w-[68px] shrink-0 items-center justify-center border border-ink/15 bg-ivory font-headline text-xl sm:text-2xl text-ink transition-colors duration-450 ease-out-expo group-hover:border-gold group-hover:text-gold">
                  {step.id}
                </span>
                <span className="h-px flex-grow bg-ink/10 md:hidden" />
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl md:text-[1.7rem] font-headline uppercase leading-[1.02] tracking-tight text-ink">
                {step.title}
              </h3>

              <p className="mt-3 text-sm text-ink/65 font-body leading-relaxed max-w-sm">
                {step.body}
              </p>

              <Link
                href={step.href}
                className="mt-4 inline-flex items-center gap-2 text-[11px] font-headline uppercase tracking-[0.18em] text-ink transition-colors duration-450 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                <span className="link-wipe">{step.linkText}</span>
                <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform duration-450 ease-out-expo group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
