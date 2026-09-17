import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllText = "VIEW ALL",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12 border-b pb-4",
        dark ? "border-ivory/15" : "border-ink/15",
        className
      )}
    >
      <div className="flex flex-col gap-1.5">
        {subtitle && (
          <span className="text-xs font-headline tracking-widest uppercase text-gold">
            {subtitle}
          </span>
        )}
        <h2
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline uppercase leading-tighter tracking-tight",
            dark ? "text-ivory" : "text-ink"
          )}
        >
          {title}
        </h2>
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className={cn(
            "group inline-flex items-center gap-2 text-xs sm:text-sm font-headline uppercase tracking-wider transition-colors pb-1 self-start sm:self-auto",
            dark ? "text-ivory/80 hover:text-gold" : "text-ink/80 hover:text-gold"
          )}
        >
          <span>{viewAllText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-gold" />
        </Link>
      )}
    </div>
  );
}
