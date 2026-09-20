import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EventCardProps {
  slug: string;
  title: string;
  type: string;
  dateDisplay: string;
  locationDisplay: string;
  imageSrc: string;
  className?: string;
  acceptsVendors?: boolean;
  /** Renders an editorial index number in the corner, e.g. 01. */
  index?: number;
  /** Lets above-the-fold cards opt into eager loading. */
  priority?: boolean;
}

export function EventCard({
  slug,
  title,
  type,
  dateDisplay,
  locationDisplay,
  imageSrc,
  className,
  acceptsVendors,
  index,
  priority = false,
}: EventCardProps) {
  return (
    <Link
      href={`/events/${slug}`}
      className={cn(
        "group block relative overflow-hidden bg-ink border border-ink/10 rounded-none",
        "transition-colors duration-450 ease-out-expo hover:border-ink/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/10">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-900 ease-out-expo group-hover:scale-104"
        />

        {/* Base legibility wash, deepened on hover so the copy lifts forward */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-85 transition-opacity duration-450 group-hover:opacity-95" />

        {index !== undefined && (
          <span className="absolute top-3 right-3 font-headline text-3xl sm:text-4xl leading-none text-outline-ivory transition-colors duration-450">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        {acceptsVendors && (
          <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur-sm border border-ivory/20 px-2 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[9px] sm:text-[10px] font-headline uppercase tracking-[0.2em] text-gold">
              Vendors Open
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-1.5 text-ivory">
          <span className="text-[10px] sm:text-[11px] font-headline uppercase tracking-[0.2em] text-gold">
            {type}
          </span>

          <h3 className="text-lg sm:text-xl md:text-2xl font-headline uppercase leading-[0.95] tracking-tight text-ivory">
            {title}
          </h3>

          <p className="text-[11px] sm:text-xs text-ivory/65 font-body truncate">
            {dateDisplay} • {locationDisplay}
          </p>

          {/*
            Slides up from behind the meta line on hover. Kept out of the flow
            with a collapsing max-height so card heights stay uniform.
          */}
          <span className="flex items-center gap-2 text-[10px] font-headline uppercase tracking-[0.2em] text-ivory overflow-hidden max-h-0 opacity-0 transition-all duration-450 ease-out-expo group-hover:max-h-8 group-hover:opacity-100 group-hover:mt-1.5 motion-reduce:transition-none">
            View Event
            <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
          </span>
        </div>

        {/* Gold rule that wipes across the base of the tile on hover */}
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold origin-left scale-x-0 transition-transform duration-600 ease-out-expo group-hover:scale-x-100" />
      </div>
    </Link>
  );
}
