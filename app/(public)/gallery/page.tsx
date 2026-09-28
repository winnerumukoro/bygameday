"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Lightbox, GalleryItem } from "@/components/gallery/lightbox";
import { cn } from "@/lib/utils";

/*
 * Empty on purpose. This held twelve stock photographs captioned as GAMEDAY's
 * own past events — trophy presentations at Krieg Fields, sunset finals at
 * Zilker — none of which happened, plus a "season highlight reel" pointing at
 * an unrelated YouTube video. Add real event photography here as it is shot.
 */
const GALLERY_ITEMS: GalleryItem[] = [];

const CATEGORIES = [
  "All",
  "Basketball",
  "Soccer",
  "Volleyball",
  "Viewing Parties",
  "Food & Vendors",
  "Fan Energy",
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = React.useState<number | null>(null);

  const filteredItems = React.useMemo(() => {
    if (activeCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-ink/15 pb-8">
        <div>
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-2">
            Visual Dispatch & Highlights
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-headline uppercase text-ink tracking-tight leading-tighter">
            MEDIA & ATMOSPHERE
          </h1>
          <p className="text-sm sm:text-base text-ink/70 font-body max-w-2xl mt-4 leading-relaxed">
            Photography and video from our tournaments — the courts, the vendor row, and the
            crowd.
          </p>
        </div>

        <div className="text-xs font-headline uppercase tracking-wider text-ink/50 bg-ink/5 px-3 py-2 border border-ink/10 self-start md:self-auto">
          Media Archive
        </div>
      </div>

      {/* Category Filter Chips — only useful once there is something to filter */}
      <div
        className={cn("flex-wrap items-center gap-2 mb-10", GALLERY_ITEMS.length === 0 ? "hidden" : "flex")}
        role="group"
        aria-label="Gallery category filters"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 text-xs font-headline uppercase tracking-wider transition-colors min-h-[40px] border",
                isActive
                  ? "bg-gold text-ink border-gold font-bold"
                  : "bg-ivory text-ink/80 border-ink/20 hover:border-ink"
              )}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="border-2 border-dashed border-ink/20 bg-white py-20 px-6 text-center">
          <h2 className="font-headline text-2xl uppercase tracking-tight text-ink">
            Nothing Shot Yet
          </h2>
          <p className="text-sm text-ink/60 font-body max-w-md mx-auto mt-3">
            Photos and clips go up here after our first tournaments. Come play in one and
            you will probably end up on this page.
          </p>
        </div>
      )}

      {/* Grid of Media Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxIndex(index)}
            className="group relative aspect-[4/3] bg-ink/10 border border-ink/15 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveLightboxIndex(index);
              }
            }}
            aria-label={`View ${item.caption}`}
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
            />

            {/* Video Play Badge if Video */}
            {item.type === "video" && (
              <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-gold text-ink flex items-center justify-center font-bold">
                <Play className="w-5 h-5 fill-ink text-ink ml-0.5" />
              </div>
            )}

            {/* Hover Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 text-ivory">
              <span className="text-[10px] font-headline uppercase tracking-widest text-gold mb-1">
                {item.category}
              </span>
              <p className="text-sm font-headline uppercase leading-tight tracking-tight text-ivory">
                {item.caption}
              </p>
              {item.eventTitle && (
                <span className="text-xs text-ivory/60 font-body mt-1">
                  {item.eventTitle}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIndex) => setActiveLightboxIndex(newIndex)}
      />
    </div>
  );
}
