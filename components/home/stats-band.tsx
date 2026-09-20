import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";

const STATS = [
  { value: 24, suffix: "+", label: "Events & Tournaments" },
  { value: 60, suffix: "+", label: "Curated Vendors" },
  { value: 1800, suffix: "+", label: "Rostered Athletes" },
  { value: 100, suffix: "%", label: "Capacity Guaranteed" },
];

/** Figures count up the first time the band scrolls into view. */
export function StatsBand() {
  return (
    <section className="relative bg-ink text-ivory py-14 sm:py-20 md:py-28 border-y border-ivory/10 grain overflow-hidden">
      <div className="relative max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-8 md:gap-12">
          {/* Hairline dividers sit between columns only, never on a row's first cell */}
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              variant="up"
              delay={index * 110}
              className="flex flex-col items-center text-center px-2 border-l border-ivory/10 [&:nth-child(odd)]:border-l-0 md:[&:nth-child(odd)]:border-l md:first:border-l-0"
            >
              <dd className="font-headline text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-ivory leading-none tracking-tight">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-3 text-[10px] sm:text-xs font-headline uppercase tracking-[0.22em] text-ivory/50 max-w-[12ch] sm:max-w-none">
                {stat.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
