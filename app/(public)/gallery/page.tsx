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
    caption: "Championship point on the line during the 2025 Summer Final at Rucker Park.",
    category: "Basketball",
    eventTitle: "Interhouse 5v5 Championship",
  },
  {
    id: "g2",
    type: "image",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1400&auto=format&fit=crop",
    caption: "Court intensity during fourth quarter overtime in the Brooklyn invitational.",
    category: "Basketball",
    eventTitle: "Metro Classic",
  },
  {
    id: "g3",
    type: "video",
    src: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1400&auto=format&fit=crop",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // Embed preview
    caption: "Official Season Highlight Reel: Best plays, dunks, and crowd reactions.",
    category: "Highlights",
    eventTitle: "GAMEDAY Season Reel",
  },
  {
    id: "g4",
    type: "image",
    src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1400&auto=format&fit=crop",
    caption: "Futsal derby penalty shootout decider under the arena floodlights.",
    category: "Soccer",
    eventTitle: "Queens Cup 5v5 Futsal",
  },
  {
    id: "g5",
    type: "image",
    src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1400&auto=format&fit=crop",
    caption: "Sunset finals at the Hudson River Park sand volleyball courts.",
    category: "Volleyball",
    eventTitle: "Sand Volleyball Classic",
  },
  {
    id: "g6",
    type: "image",
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1400&auto=format&fit=crop",
    caption: "Curated taco and artisan street food vendors on festival row.",
    category: "Food & Vendors",
    eventTitle: "Viewing Party Market",
  },
  {
    id: "g7",
    type: "image",
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop",
    caption: "Tailgate festival vibes on the Pier 57 rooftop overlooking Manhattan.",
    category: "Viewing Parties",
    eventTitle: "Championship Viewing Party",
  },
  {
    id: "g8",
    type: "image",
    src: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1400&auto=format&fit=crop",
    caption: "Fans reacting to a buzzer beater during the NBA Finals mega watch party.",
    category: "Fan Energy",
    eventTitle: "Finals Mega Bash",
  },
  {
    id: "g9",
    type: "image",
    src: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1400&auto=format&fit=crop",
    caption: "Harlem 7v7 Flag Football Summer Bowl trophy presentation ceremony.",
    category: "Football",
    eventTitle: "Harlem Summer Bowl",
  },
  {
    id: "g10",
    type: "image",
    src: "https://images.unsplash.com/photo-1628891435222-065925dcb365?q=80&w=1400&auto=format&fit=crop",
    caption: "Pickleball open championship round at Brooklyn Bridge Park Pier 2.",
    category: "Pickleball",
    eventTitle: "Brooklyn Pickleball Open",
  },
  {
    id: "g11",
    type: "image",
    src: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1400&auto=format&fit=crop",
    caption: "Over 800 runners crossing the finish line at Battery Park harbor sunset.",
    category: "Community",
    eventTitle: "Sunset 5K & Festival",
  },
  {
    id: "g12",
    type: "image",
    src: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1400&auto=format&fit=crop",
    caption: "Neon glow dodgeball champions hoisting the division trophy.",
    category: "Fan Energy",
    eventTitle: "Glow-in-the-Dark Dodgeball",
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
