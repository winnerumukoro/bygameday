import { Marquee } from "@/components/motion/marquee";

const WORDS = [
  "BASKETBALL",
  "VOLLEYBALL",
  "SOCCER",
  "FLAG FOOTBALL",
  "PICKLEBALL",
  "1V1",
  "FOOD VENDORS",
  "AUSTIN, TX",
];

/**
 * Oversized word rail sitting between the hero and the calendar. Pure CSS
 * motion, so it costs nothing on scroll and keeps the page feeling alive.
 */
export function CredentialRail() {
  return (
    <section
      aria-hidden="true"
      className="relative bg-ivory border-y border-ink/10 py-5 sm:py-8 overflow-hidden"
    >
      <Marquee speed={46}>
        {WORDS.map((word, index) => (
          <span key={word + index} className="inline-flex items-center whitespace-nowrap">
            <span className="px-4 sm:px-7 font-headline uppercase text-2xl sm:text-4xl md:text-5xl tracking-tight text-ink/85">
              {word}
            </span>
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gold shrink-0" />
          </span>
        ))}
      </Marquee>

      {/* Feather both edges into the page background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-32 bg-gradient-to-r from-ivory to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-32 bg-gradient-to-l from-ivory to-transparent" />
    </section>
  );
}
