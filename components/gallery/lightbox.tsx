"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  videoUrl?: string;
  caption: string;
  category: string;
  eventTitle?: string;
}

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  React.useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < items.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const item = items[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Media lightbox"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs font-headline uppercase tracking-widest text-gold">
            {item.category}
          </span>
          {item.eventTitle && (
            <>
              <span className="text-ivory/30">•</span>
              <span className="text-xs font-headline uppercase tracking-wider text-ivory/80 truncate max-w-xs">
                {item.eventTitle}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-headline tracking-widest uppercase text-ivory/50">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-ivory/80 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Center Media Area */}
      <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
        {/* Prev Button */}
        {hasPrev && (
          <button
            type="button"
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-2 sm:left-6 z-20 p-3 bg-ink/80 border border-ivory/20 text-ivory hover:text-gold hover:border-gold transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Media Content */}
        {item.type === "video" && item.videoUrl ? (
          <div className="w-full max-w-4xl aspect-video bg-ink border border-ivory/20 overflow-hidden">
            <iframe
              src={item.videoUrl}
              title={item.caption}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="relative w-full max-w-5xl h-[65vh] sm:h-[75vh]">
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="90vw"
              priority
              className="object-contain"
            />
          </div>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            type="button"
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-2 sm:right-6 z-20 p-3 bg-ink/80 border border-ivory/20 text-ivory hover:text-gold hover:border-gold transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      <div className="max-w-3xl mx-auto w-full text-center pb-2 z-20">
        <p className="text-sm sm:text-base text-ivory/90 font-body">
          {item.caption}
        </p>
      </div>
    </div>
  );
}
