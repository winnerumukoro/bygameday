import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface Phase {
  id: string;
  label: string;
  detail: string;
  state: "done" | "active" | "queued";
}

const PHASES: Phase[] = [
  { id: "01", label: "Foundation", detail: "Design system & brand", state: "done" },
  { id: "02", label: "Calendar", detail: "Events, filters & iCal", state: "done" },
  { id: "03", label: "Vendors & Pay", detail: "Applications & Stripe", state: "done" },
  { id: "04", label: "Brackets", detail: "Rosters & tournaments", state: "done" },
  { id: "05", label: "Operations", detail: "Admin console", state: "active" },
];

const COMPLETION = Math.round(
  (PHASES.filter((phase) => phase.state === "done").length / PHASES.length) * 100
);

/** Client-facing delivery tracker with an animated gold progress rule. */
export function RoadmapTracker() {
  return (
    <section className="relative bg-ink text-ivory border-b border-ivory/10 py-12 sm:py-16 px-4 sm:px-6 lg:px-12 grain overflow-hidden">
      <div className="relative max-w-stadium mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7 lg:gap-12">
          <Reveal variant="left" className="max-w-lg">
            <span className="text-[10px] sm:text-xs font-headline uppercase tracking-[0.25em] text-gold">
              Client Project Tracker
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline uppercase text-ivory leading-tight mt-2">
              GAMEDAY Platform Deployment
            </h2>
            <p className="text-xs sm:text-sm text-ivory/60 font-body mt-3 leading-relaxed">
              Every phase ships straight to this live preview. Follow the build as the operations
              console comes online.
            </p>
          </Reveal>

          <Reveal variant="right" delay={120} className="w-full lg:w-[46%] lg:shrink-0">
            <div className="flex items-end justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-headline uppercase tracking-[0.2em] text-ivory/50">
                Delivery Progress
              </span>
              <span className="font-headline text-2xl sm:text-3xl text-gold leading-none">
                {COMPLETION}%
              </span>
            </div>

            {/* Gold as a progress indicator — the sanctioned large-surface use */}
            <div className="h-1 w-full bg-ivory/15 overflow-hidden">
              <div
                className="h-full bg-gold origin-left animate-rule-grow"
                style={{ width: `${COMPLETION}%`, animationDelay: "250ms" }}
              />
            </div>
          </Reveal>
        </div>

        {/* Phase chips: swipeable rail on phones, grid from sm up */}
        <div className="mt-8 sm:mt-10 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto no-scrollbar">
          <ol className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3 min-w-max sm:min-w-0">
            {PHASES.map((phase, index) => (
              <Reveal
                as="li"
                key={phase.id}
                variant="up"
                delay={index * 70}
                className={cn(
                  "relative w-[200px] sm:w-auto shrink-0 border px-4 py-3.5",
                  phase.state === "done" && "border-gold/60 bg-gold/[0.08]",
                  phase.state === "active" && "border-ivory/25 bg-ivory/[0.06]",
                  phase.state === "queued" && "border-ivory/10"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "font-headline text-[10px] tracking-[0.2em]",
                      phase.state === "queued" ? "text-ivory/30" : "text-ivory/50"
                    )}
                  >
                    PHASE {phase.id}
                  </span>

                  {phase.state === "done" && <Check className="h-3.5 w-3.5 text-gold shrink-0" />}
                  {phase.state === "active" && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-gold animate-pulse-ring" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                    </span>
                  )}
                </div>

                <p
                  className={cn(
                    "font-headline uppercase text-sm sm:text-base mt-1.5 leading-tight",
                    phase.state === "queued" ? "text-ivory/40" : "text-ivory"
                  )}
                >
                  {phase.label}
                </p>
                <p className="text-[11px] text-ivory/45 font-body mt-0.5 leading-snug">
                  {phase.detail}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
