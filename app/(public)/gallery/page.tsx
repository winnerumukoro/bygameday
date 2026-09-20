"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Lightbox, GalleryItem } from "@/components/gallery/lightbox";
import { cn } from "@/lib/utils";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    type: "image",
    src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1400&auto=format&fit=crop",
    caption: "Championship point on the line during the Austin Men's 5v5 Open final.",
    category: "Basketball",
    eventTitle: "Austin 5v5 Championship",
  },
  {
    id: "g2",
    type: "image",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1400&auto=format&fit=crop",
    caption: "Overtime intensity under the lights at Pan Am Neighborhood Park.",
    category: "Basketball",
    eventTitle: "Pan Am Classic",
  },
  {
    id: "g3",
    type: "video",
    src: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1400&auto=format&fit=crop",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    caption: "Austin Season Highlight Reel: Best plays, buzzer beaters, and crowd energy.",
    category: "Highlights",
    eventTitle: "GAMEDAY Season Reel",
  },
  {
    id: "g4",
    type: "image",
    src: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1400&auto=format&fit=crop",
    caption: "Futsal derby penalty shootout at Austin Sports Center under the arena lights.",
    category: "Soccer",
    eventTitle: "Austin Futsal Cup",
  },
  {
    id: "g5",
    type: "image",
    src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1400&auto=format&fit=crop",
    caption: "Sunset finals at the Zilker Park sand volleyball courts.",
    category: "Volleyball",
    eventTitle: "Zilker Sand Classic",
  },
  {
    id: "g6",
    type: "image",
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1400&auto=format&fit=crop",
    caption: "Local Austin taco and barbecue food trucks on concourse row.",
    category: "Food & Vendors",
    eventTitle: "Austin Vendor Concourse",
  },
  {
    id: "g7",
    type: "image",
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop",
    caption: "Tailgate and viewing party setup at Mueller Lake Park amphitheater.",
    category: "Viewing Parties",
    eventTitle: "Championship Viewing Party",
  },
  {
    id: "g8",
    type: "image",
    src: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1400&auto=format&fit=crop",
    caption: "Crowd reacting to the game-winning kick during the Austin 7v7 final.",
    category: "Fan Energy",
    eventTitle: "Austin 7v7 Summer Bowl",
  },
  {
    id: "g9",
    type: "image",
    src: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1400&auto=format&fit=crop",
    caption: "Krieg Fields Flag Football Championship trophy presentation.",
    category: "Football",
    eventTitle: "Krieg Fields Flag Bowl",
  },
  {
    id: "g10",
    type: "image",
    src: "https://images.unsplash.com/photo-1628891435222-065925dcb365?q=80&w=1400&auto=format&fit=crop",
    caption: "Pickleball open championship matches at South Austin Recreation Center.",
    category: "Pickleball",
    eventTitle: "Austin Pickleball Open",
  },
  {
    id: "g11",
    type: "image",
    src: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1400&auto=format&fit=crop",
    caption: "Community morning warmup run around Lady Bird Lake before first tip-off.",
    category: "Community",
    eventTitle: "Lady Bird Lake 5K Walk/Run",
  },
  {
    id: "g12",
    type: "image",
    src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1400&auto=format&fit=crop",
    caption: "Division winners hoisting the tournament trophy at Pease District Park.",
    category: "Fan Energy",
    eventTitle: "Pease Park Community Clash",
  },
];

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
            High-definition tournament captures, court intensity, curated food vendor setups, and community celebration moments.
          </p>
        </div>

        <div className="text-xs font-headline uppercase tracking-wider text-ink/50 bg-ink/5 px-3 py-2 border border-ink/10 self-start md:self-auto">
          Official Media Archive
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Gallery category filters">
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
