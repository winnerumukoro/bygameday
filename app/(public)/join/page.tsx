"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JoinPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [interests, setInterests] = React.useState<string[]>([]);

  const toggleInterest = (val: string) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 sm:px-6 min-h-[75vh] flex flex-col justify-center">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-headline uppercase tracking-wider text-ink/70 hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <span className="text-xs font-headline tracking-widest uppercase text-gold block mb-1">
          Stay Connected
        </span>
        <h1 className="text-4xl sm:text-6xl font-headline uppercase text-ink tracking-tight leading-tighter">
          JOIN THE GAMEDAY DISPATCH
        </h1>
        <p className="text-base text-ink/70 font-body mt-3 leading-relaxed">
          Get first access to team registration drops, vendor marketplace slots, and ticket releases before they open to the public.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-ink text-ivory border border-gold/40 flex flex-col items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold">
            <CheckCircle2 className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-2xl font-headline uppercase text-ivory">
            YOU&apos;RE ON THE LIST
          </h2>
          <p className="text-sm text-ivory/80 font-body leading-relaxed">
            Thank you for registering, <strong className="text-ivory">{firstName || "Athlete"}</strong> ({email}). We&apos;ll notify you the moment 2026 tournament brackets and vendor slots go live.
          </p>
          <Button asChild variant="primary" size="default" className="mt-2">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-ink/5 p-6 sm:p-8 border border-ink/10">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-headline uppercase tracking-wider text-ink/80">
              First Name
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="YOUR NAME"
              className="bg-ivory border border-ink/20 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-headline uppercase tracking-wider text-ink/80">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="NAME@EXAMPLE.COM"
              className="bg-ivory border border-ink/20 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-headline uppercase tracking-wider text-ink/80">
              I am interested in (select all that apply):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {[
                { id: "tournaments", label: "Playing / Sports" },
                { id: "vendors", label: "Vendor Marketplace" },
                { id: "spectator", label: "Attending / Fan" },
              ].map((opt) => {
                const active = interests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleInterest(opt.id)}
                    className={`py-3 px-3 border text-xs font-headline uppercase tracking-wider transition-colors min-h-[48px] flex items-center justify-center text-center ${
                      active
                        ? "bg-gold text-ink border-gold font-bold"
                        : "bg-ivory text-ink/80 border-ink/20 hover:border-ink"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="consent"
              required
              className="mt-1 h-4 w-4 rounded-none border-ink/40 text-gold focus:ring-gold"
            />
            <label htmlFor="consent" className="text-xs text-ink/70 font-body leading-tight">
              I agree to receive event updates, tournament drop alerts, and news from GAMEDAY. You can unsubscribe at any time.
            </label>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidthMobile={true}>
            Confirm Subscription
          </Button>
        </form>
      )}
    </div>
  );
}
