import Image from "next/image";
import Link from "next/link";
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
}: EventCardProps) {
  return (
    <Link
      href={`/events/${slug}`}
      className={cn(
        "group block relative overflow-hidden bg-ink/5 border border-ink/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-none",
        className
      )}
    >
      {/* 4:5 Aspect Ratio Image Tile */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/10">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
        />
        {/* Dark subtle overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Vendor Open Tag (if applicable) */}
        {acceptsVendors && (
          <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur-sm border border-ivory/20 px-2 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[10px] font-headline uppercase tracking-widest text-gold">
              Vendors Open
            </span>
          </div>
        )}

        {/* Bottom content overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-1.5 text-ivory">
          {/* Event type in small caps */}
          <span className="text-[11px] font-headline uppercase tracking-widest text-gold">
            {type}
          </span>

          {/* Bold uppercase title */}
          <h3 className="text-xl sm:text-2xl font-headline uppercase leading-tight tracking-tight text-ivory group-hover:text-gold transition-colors">
            {title}
          </h3>

          {/* Date and location in one clean line */}
          <p className="text-xs text-ivory/70 font-body truncate">
            {dateDisplay} • {locationDisplay}
          </p>
        </div>
      </div>
    </Link>
  );
}
