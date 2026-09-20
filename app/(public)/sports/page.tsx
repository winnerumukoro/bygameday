import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/brand/section-header";
import { SportsHubBrowser } from "@/components/sports/sports-hub-browser";
import { getSports, getDivisions } from "@/lib/sports/data";
import {
  Trophy,
  Users,
  User,
  ArrowRight,
  UserPlus,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sports & Tournaments — GAMEDAY",
  description:
    "Register for GAMEDAY intramural leagues and 1v1 showdowns across basketball, volleyball, futsal, flag football, and pickleball.",
};

export default function SportsPage() {
  const sports = getSports();
  const divisions = getDivisions();

  return (
    <div className="pt-24 pb-24 bg-ivory">
      {/* ────────────── HERO SECTION ────────────── */}
      <section className="relative overflow-hidden bg-ink text-ivory py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-stadium mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-3.5 py-1.5 mb-6 text-gold">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-headline uppercase tracking-widest">
              Athletic Competition Engine
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-headline uppercase tracking-tight leading-tighter text-ivory max-w-5xl">
            COMPETE AT <span className="text-gold">GAMEDAY</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-ivory/80 font-body max-w-2xl leading-relaxed">
            Step onto the hardwood, sand, turf, and asphalt. 16-team intramural brackets, king-of-the-court 1v1 showdowns, electronic scoreboards, and certified referee crews.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/sports/register/team">Register A Team</Link>
            </Button>
            <Button asChild variant="secondaryLight" size="lg">
              <Link href="/sports/register/individual">1v1 Showdowns</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-ivory/30 text-ivory hover:bg-ivory hover:text-ink">
              <Link href="/sports/free-agents" className="gap-2">
                <UserPlus className="w-4 h-4 text-gold" />
                Free Agent Pool
              </Link>
            </Button>
          </div>

          {/* Metrics Strip */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-ivory/15 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <span className="block text-3xl sm:text-4xl font-headline text-gold">5</span>
              <span className="text-xs font-headline uppercase tracking-wider text-ivory/60 mt-1 block">
                Competitive Sports
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-headline text-gold">1,800+</span>
              <span className="text-xs font-headline uppercase tracking-wider text-ivory/60 mt-1 block">
                Rostered Athletes
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-headline text-gold">100%</span>
              <span className="text-xs font-headline uppercase tracking-wider text-ivory/60 mt-1 block">
                Electronic Scoring
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-headline text-gold">Live</span>
              <span className="text-xs font-headline uppercase tracking-wider text-ivory/60 mt-1 block">
                Interactive Brackets
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── DIVISIONS & SPORTS BROWSER ────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 max-w-stadium mx-auto border-b border-ink/15">
        <SectionHeader
          subtitle="Spring & Summer 2026"
          title="ACTIVE TOURNAMENT DIVISIONS"
        />

        <SportsHubBrowser sports={sports} divisions={divisions} />
      </section>

      {/* ────────────── TOURNAMENT FORMATS ────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 max-w-stadium mx-auto border-b border-ink/15">
        <SectionHeader
          subtitle="How We Play"
          title="COMPETITIVE FORMATS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Format 1: 1v1 King of Court */}
          <div className="border-2 border-ink/15 bg-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold/15 text-ink border border-gold/30 px-3 py-1 text-xs font-headline uppercase tracking-wider mb-4">
                <User className="w-3.5 h-3.5 text-gold" />
                Individual Showdown
              </div>

              <h3 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink mb-3">
                1V1 KING OF THE COURT
              </h3>

              <p className="text-sm font-body text-ink/70 leading-relaxed mb-6">
                Single-elimination duel under the lights. Half-court timed possessions, sudden-death match points, and live MC commentary. Winner takes the division trophy and cash purse.
              </p>

              <ul className="space-y-2.5 text-xs font-body text-ink/80 mb-8">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span>32-competitor single elimination bracket</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span>Instant 30-minute spot reservation hold window</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span>Electronic athletic liability waiver completed at registration</span>
                </li>
              </ul>
            </div>

            <Button asChild variant="secondary" className="gap-2">
              <Link href="/sports/register/individual">
                Register For 1v1
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Format 2: Intramural Squads */}
          <div className="border-2 border-ink/15 bg-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-ink text-ivory px-3 py-1 text-xs font-headline uppercase tracking-wider mb-4">
                <Users className="w-3.5 h-3.5 text-gold" />
                Team Competition
              </div>

              <h3 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink mb-3">
                INTRAMURAL TEAM BRACKETS
              </h3>

              <p className="text-sm font-body text-ink/70 leading-relaxed mb-6">
                Gather your squad. Full-court team play across 5v5 basketball, 4v4 sand volleyball, and 7v7 flag football. Certified referees, digital scoreboards, and courtside DJ sets.
              </p>

              <ul className="space-y-2.5 text-xs font-body text-ink/80 mb-8">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span>Captain registers the team and receives a shareable invite link</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span>Teammates join via invite code and electronically sign their waiver</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span>Roster requirement check ensures teams are game-ready before seedings</span>
                </li>
              </ul>
            </div>

            <Button asChild variant="primary" className="gap-2">
              <Link href="/sports/register/team">
                Create A Team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ────────────── FREE AGENTS BANNER ────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-stadium mx-auto">
        <div className="border-2 border-ink bg-ink text-ivory p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs font-headline uppercase tracking-widest mb-2">
              <UserPlus className="w-4 h-4" />
              <span>Looking For A Squad?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline uppercase tracking-tight text-ivory">
              JOIN THE FREE AGENT POOL
            </h2>
            <p className="text-xs sm:text-sm text-ivory/70 font-body max-w-xl mt-2 leading-relaxed">
              Don&apos;t have a full roster? Register as a solo free agent. Team captains actively draft free agents to meet division minimums, or we group free agents into new tournament squads.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <Button asChild variant="primary" size="lg">
              <Link href="/sports/free-agents">Sign Up As Free Agent</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
