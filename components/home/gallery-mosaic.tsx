import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/brand/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";

const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=900&auto=format&fit=crop",
    alt: "Players driving to the rim under the lights",
    span: "col-span-2 row-span-2",
    drift: 40,
  },
  {
    src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=700&auto=format&fit=crop",
    alt: "Empty arena before tip-off",
    span: "col-span-2 row-span-1 sm:col-span-1",
    drift: -30,
  },
  {
    src: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=700&auto=format&fit=crop",
    alt: "Crowd celebrating a game-winning shot",
    span: "col-span-2 row-span-1 sm:col-span-1",
    drift: 26,
  },
  {
    src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=700&auto=format&fit=crop",
    alt: "Sideline huddle between quarters",
    span: "col-span-2 row-span-1",
    drift: -22,
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=700&auto=format&fit=crop",
    alt: "Vendor plating food at the courtside market",
    span: "col-span-2 row-span-1 sm:col-span-1",
    drift: 34,
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=700&auto=format&fit=crop",
    alt: "Tailgate festival crowd at sunset",
    span: "col-span-2 row-span-1 sm:col-span-1",
    drift: -18,
  },
];

/** Asymmetric photo mosaic with per-tile parallax drift on desktop. */
export function GalleryMosaic() {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-32 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
      <SectionHeader
        title="THE ATMOSPHERE"
        subtitle="Gameday Moments & Community Energy"
        description="Courtside noise, sold-out sidelines, and the market that runs alongside every fixture."
        viewAllHref="/gallery"
        viewAllText="VIEW ALL MEDIA"
      />

      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-6 auto-rows-[26vw] xs:auto-rows-[24vw] sm:auto-rows-[15vw] lg:auto-rows-[11vw] gap-2.5 sm:gap-4">
        {SHOTS.map((shot, index) => (
          <Reveal
            key={shot.src}
            variant="scale"
            delay={index * 90}
            duration={1000}
            className={cn("relative overflow-hidden bg-ink/10 group", shot.span)}
          >
            <Link
              href="/gallery"
              aria-label={`Open the gallery: ${shot.alt}`}
              className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
            >
              <Parallax distance={shot.drift} className="absolute inset-0 -top-[8%] h-[116%]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center transition-transform duration-900 ease-out-expo group-hover:scale-104"
                />
              </Parallax>

              {/* Ink veil lifts on hover to let the shot come through */}
              <span className="absolute inset-0 bg-ink/25 opacity-100 transition-opacity duration-600 group-hover:opacity-0" />
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold origin-left scale-x-0 transition-transform duration-600 ease-out-expo group-hover:scale-x-100" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
