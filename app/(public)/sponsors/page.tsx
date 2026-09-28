"use client";

import * as React from "react";
import { Check, Users, Eye, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitSponsorInquiry } from "@/lib/leads/actions";

/*
 * No published tiers or prices. The earlier $1,500 / $4,000 / $10,000
 * packages (naming rights, VIP suite, livestream) were invented. Packages
 * are agreed per sponsor until the client sets real ones.
 */
const OPTIONS = [
  {
    icon: Users,
    title: "Booth Space",
    body: "A tent or table at the event on game day.",
  },
  {
    icon: Target,
    title: "Signage",
    body: "Your banner or logo at the venue and on our website.",
  },
  {
    icon: Eye,
    title: "Sampling",
    body: "Hand out your drinks, snacks, or products to players and spectators.",
  },
];

const inputClass =
  "bg-ivory/10 border border-ivory/20 px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none";

export default function SponsorsPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    budgetRange: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    const result = await submitSponsorInquiry(formData);
    setPending(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-ivory text-ink min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-20 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 border-b border-ink/15">
        <div className="max-w-4xl">
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-3">
            Local Partnerships
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-headline uppercase text-ink tracking-tight leading-tighter">
            SPONSOR A TOURNAMENT
          </h1>
          <p className="text-base sm:text-xl text-ink/80 font-body max-w-2xl mt-6 leading-relaxed">
            For local businesses and brands that want their name on a weekend bracket. We put your product and signage in front of players and spectators at our tournaments.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="primary" size="lg">
              <a href="#inquire">Talk to us about sponsoring</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What we can offer */}
      <section className="py-20 bg-ink text-ivory border-b border-ivory/15">
        <div className="max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-12">
            <span className="text-xs font-headline tracking-widest uppercase text-gold">
              What we can offer
            </span>
            <h2 className="text-3xl sm:text-5xl font-headline uppercase text-ivory mt-2">
              BUILT AROUND YOU
            </h2>
            <p className="text-sm sm:text-base text-ivory/70 font-body max-w-2xl mt-4">
              Every sponsorship is put together with you. Tell us what you want to do and we&apos;ll work out a package and price.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {OPTIONS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="p-6 bg-ivory/5 border border-ivory/10 flex flex-col justify-between min-h-[180px]"
              >
                <Icon className="w-8 h-8 text-gold mb-4" />
                <div>
                  <span className="text-2xl sm:text-3xl font-headline text-ivory block uppercase">
                    {title}
                  </span>
                  <span className="text-xs font-body text-ivory/60 mt-2 block leading-relaxed">
                    {body}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquire" className="bg-ink text-ivory py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-headline tracking-widest uppercase text-gold block mb-2">
              Get In Touch
            </span>
            <h2 className="text-4xl sm:text-6xl font-headline uppercase text-ivory">
              SPONSORSHIP INQUIRY
            </h2>
            <p className="text-sm sm:text-base text-ivory/70 font-body max-w-xl mx-auto mt-3">
              Tell us about your business and what you have in mind. We&apos;ll get back to you by email.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-12 bg-ivory/5 border border-gold/40 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-gold/20 border border-gold flex items-center justify-center text-gold">
                <Check className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-3xl font-headline uppercase text-ivory">
                INQUIRY RECEIVED
              </h3>
              <p className="text-sm sm:text-base text-ivory/80 font-body max-w-lg">
                Thanks, <strong>{formData.contactName}</strong>. We have your inquiry and will reply to{" "}
                <strong>{formData.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-ivory/5 p-6 sm:p-10 border border-ivory/15">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Company / Organization *
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contactName" className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Contact Name *
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="budgetRange" className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                  Budget Range
                </label>
                <select
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="bg-ink border border-ivory/20 px-4 py-3 text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
                >
                  <option value="">Not sure yet</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000 - $2,500">$1,000 – $2,500</option>
                  <option value="$2,500 - $5,000">$2,500 – $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                  What do you have in mind?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Booth space, signage, sampling, something else..."
                  className="bg-ivory/10 border border-ivory/20 px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold rounded-none"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-400 font-body">
                  {error}
                </p>
              )}

              <Button type="submit" variant="primary" size="lg" fullWidthMobile={true} disabled={pending}>
                {pending ? "Sending..." : "Send Inquiry"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
