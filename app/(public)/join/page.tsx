"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscribeToMailingList } from "@/lib/leads/actions";

type Interest = "tournaments" | "vendors" | "spectator";

export default function JoinPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [interests, setInterests] = React.useState<Interest[]>([]);

  const toggleInterest = (val: Interest) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setPending(true);
    setError(null);
    const result = await subscribeToMailingList({ email, firstName, interests, source: "join_page" });
    setPending(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
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
          JOIN THE MAILING LIST
        </h1>
        <p className="text-base text-ink/70 font-body mt-3 leading-relaxed">
          We email when registration opens for a tournament and when vendor slots go live.
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
            Thanks, <strong className="text-ivory">{firstName}</strong>. We&apos;ll email {email} when registration or vendor slots open.
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
              {([
                { id: "tournaments", label: "Playing / Sports" },
                { id: "vendors", label: "Vendor Marketplace" },
                { id: "spectator", label: "Attending / Fan" },
              ] as { id: Interest; label: string }[]).map((opt) => {
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
              I agree to receive emails from GAMEDAY about events and registration. You can unsubscribe at any time.
            </label>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 font-body">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidthMobile={true} disabled={pending}>
            {pending ? "Saving..." : "Confirm Subscription"}
          </Button>
        </form>
      )}
    </div>
  );
}
