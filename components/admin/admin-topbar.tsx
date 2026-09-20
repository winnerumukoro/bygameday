"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { BroadcastModal } from "./broadcast-modal";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Radio,
  MapPin,
  Megaphone,
  Trophy,
} from "lucide-react";

interface AdminTopbarProps {
  currentRole?: string;
}

export function AdminTopbar({ currentRole = "Tournament Director" }: AdminTopbarProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(format(now, "h:mm:ss a"));
      setCurrentDate(format(now, "EEE, MMM d"));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="min-h-16 bg-white border-b-2 border-ink/15 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sticky top-0 z-20 shadow-xs">
        {/* Left Venue & Match Telemetry Strip */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-body min-w-0">
          {/* Active Venue Indicator */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
            <div className="flex items-center gap-1.5 text-ink font-bold min-w-0">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span className="font-headline uppercase tracking-wide text-xs sm:text-sm truncate">
                Rucker Park Arena
              </span>
            </div>
          </div>

          <span className="hidden md:inline text-ink/20">|</span>

          {/* Live Tournament Ticker */}
          <div className="hidden lg:flex items-center gap-2 text-ink/75 bg-ink/[0.03] px-2.5 py-1 border border-ink/10">
            <span className="px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-headline uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              LIVE
            </span>
            <span className="font-headline uppercase tracking-wider text-[11px] text-ink truncate max-w-[280px]">
              Interhouse 5v5 Semifinals • Court 1 & 2
            </span>
          </div>
        </div>

        {/* Right Controls: Stadium Clock, Fast Actions, Staff Identity */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Precision Stadium Master Clock */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-ink/5 border border-ink/15 text-xs text-ink">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="font-bold text-ink">{currentTime || "12:00:00 PM"}</span>
              <span className="text-[10px] text-ink/50 uppercase">EST</span>
              <span className="text-[10px] text-ink/40 hidden md:inline">({currentDate || "Today"})</span>
            </div>
          </div>

          {/* Quick Tournament Control Link */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1.5 text-xs font-headline uppercase tracking-wider border-ink/20 hover:border-gold h-8 px-2.5"
          >
            <Link href="/admin/tournaments">
              <Trophy className="w-3.5 h-3.5 text-gold" />
              <span>Scoreboards</span>
            </Link>
          </Button>

          {/* Emergency Courtside Broadcast Alert Trigger */}
          <Button
            onClick={() => setIsBroadcastOpen(true)}
            variant="secondary"
            size="sm"
            className="gap-1.5 text-xs font-headline uppercase tracking-wider border-2 border-ink bg-white hover:bg-gold hover:text-ink hover:border-gold h-8 transition-colors shadow-2xs"
          >
            <Megaphone className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Broadcast</span>
            <span>Alert</span>
          </Button>

          {/* Staff Profile Badge */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l-2 border-ink/15">
            <div className="w-8 h-8 bg-ink text-gold font-headline text-xs flex items-center justify-center font-bold border border-gold/40 shadow-xs">
              OPS
            </div>
            <div className="hidden xl:block text-left text-xs font-body leading-tight">
              <div className="flex items-center gap-1">
                <span className="font-headline uppercase text-[11px] text-ink">Command Console</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] text-ink/60 uppercase font-headline tracking-wide block">
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
