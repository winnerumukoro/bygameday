import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
  dark?: boolean;
  /** Supporting paragraph below the title. */
  description?: string;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllText = "VIEW ALL",
  className,
  dark = false,
  description,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-8 mb-8 md:mb-12 border-b pb-5",
        dark ? "border-ivory/15" : "border-ink/15",
        className
      )}
    >
      <div className="flex flex-col gap-2 min-w-0">
        {subtitle && (
          <Reveal variant="fade" duration={600}>
            <span className="flex items-center gap-2.5 text-[10px] sm:text-xs font-headline tracking-[0.25em] uppercase text-gold">
              <span className="h-px w-6 bg-gold shrink-0" />
              {subtitle}
            </span>
          </Reveal>
        )}

        <SplitHeadline
          as="h2"
          lines={[title]}
          stagger={0}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline uppercase leading-[0.9] tracking-tight",
            dark ? "text-ivory" : "text-ink"
          )}
        />

        {description && (
          <Reveal variant="up" delay={120}>
            <p
              className={cn(
                "text-sm sm:text-base font-body leading-relaxed max-w-xl mt-1",
                dark ? "text-ivory/65" : "text-ink/65"
              )}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>

      {viewAllHref && (
        <Reveal variant="fade" delay={180} className="self-start sm:self-auto shrink-0">
          <Link
            href={viewAllHref}
            className={cn(
              "group inline-flex items-center gap-2 text-[11px] sm:text-sm font-headline uppercase tracking-[0.15em] pb-1 transition-colors duration-450",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
              dark ? "text-ivory/80 hover:text-gold" : "text-ink/80 hover:text-gold"
            )}
          >
            <span className="link-wipe">{viewAllText}</span>
            <ArrowRight className="h-4 w-4 text-gold transition-transform duration-450 ease-out-expo group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
