import { Marquee } from "@/components/motion/marquee";

const NOTICES = [
  "LIVE PREVIEW BUILD",
  "PLATFORM IN ACTIVE DEVELOPMENT",
  "PHASE 4 SHIPPED — BRACKETS & ROSTERS",
  "NEXT UP: ADMIN OPERATIONS CONSOLE",
  "REGULAR UPDATES ROLLING OUT",
];

/**
 * Build-status rail. Reads as a scrolling ticker at every breakpoint, so the
 * full status text stays legible on phones instead of wrapping to four lines.
 */
export function AnnouncementTicker() {
  return (
    <aside
      aria-label="Build status"
      // Fixed height so the header knows exactly how far to sit below it
      className="relative z-40 w-full h-9 flex items-center bg-ink text-ivory border-b border-ivory/15 overflow-hidden"
    >
      {/* The rail itself is aria-hidden, so carry the message for screen readers */}
      <p className="sr-only">
        Live preview. The GAMEDAY platform is in active development with regular updates rolling out.
      </p>

      <Marquee speed={38}>
        {NOTICES.map((notice, index) => (
          <span
            key={notice + index}
            className="inline-flex items-center gap-3 px-5 text-[10px] sm:text-xs font-headline uppercase tracking-[0.2em] whitespace-nowrap"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold animate-pulse-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <span className={index % 2 === 0 ? "text-gold" : "text-ivory/80"}>{notice}</span>
          </span>
        ))}
      </Marquee>
    </aside>
  );
}
