"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { BroadcastModal } from "./broadcast-modal";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Radio,
  MapPin,
  Megaphone,
} from "lucide-react";

interface AdminTopbarProps {
  currentRole?: string;
}

export function AdminTopbar({ currentRole = "Tournament Director" }: AdminTopbarProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  useEffect(() => {
    setCurrentTime(format(new Date(), "h:mm:ss a 'EST'"));
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), "h:mm:ss a 'EST'"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="min-h-16 bg-white border-b-2 border-ink/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sticky top-0 z-20">
        {/* Left Venue / Event Context */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-body min-w-0">
          <div className="flex items-center gap-1.5 text-ink font-semibold min-w-0">
            <MapPin className="w-4 h-4 text-gold shrink-0" />
            <span className="truncate">Rucker Park Courtside Operations</span>
          </div>

          <span className="hidden sm:inline text-ink/30">•</span>

          <div className="hidden sm:flex items-center gap-1.5 text-ink/70">
            <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span className="font-headline uppercase tracking-wider text-[11px]">
              Active: Interhouse 5v5 Basketball
            </span>
          </div>
        </div>

        {/* Right Controls: Live Clock, Broadcast Button, Staff Badge */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Live Stadium Clock */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-ink/5 border border-ink/10 font-mono text-xs text-ink font-semibold">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>{currentTime || "12:00:00 PM EST"}</span>
          </div>

          {/* Emergency Courtside Alert Trigger */}
          <Button
            onClick={() => setIsBroadcastOpen(true)}
            variant="secondary"
            size="sm"
            className="gap-1.5 text-xs font-headline uppercase tracking-wider border-ink"
          >
            <Megaphone className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Broadcast</span> Alert
          </Button>

          {/* Staff Profile Avatar */}
          <div className="hidden xs:flex items-center gap-2 pl-2 border-l border-ink/15">
            <div className="w-8 h-8 bg-ink text-gold font-headline text-xs flex items-center justify-center font-bold">
              OPS
            </div>
            <div className="hidden lg:block text-left text-xs font-body leading-tight">
              <span className="font-semibold text-ink block">Staff Console</span>
              <span className="text-[10px] text-ink/60 uppercase font-headline tracking-wide">
                {currentRole}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Broadcast Announcement Modal */}
      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
      />
    </>
  );
}
