"use client";

import * as React from "react";
import { Check, ShieldCheck, Users, Eye, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const SPONSOR_TIERS = [
  {
    id: "supporter",
    name: "OFFICIAL SUPPORTER",
    price: "$1,500",
    description: "Ideal for local brands, beverage producers, and community gyms seeking targeted athletic reach.",
    benefits: [
      "Logo placement on GAMEDAY website & digital schedules",
      "Physical sideline banner at 2 championship tournaments",
      "5 VIP tournament passes with hospitality access",
      "Social media welcome post across official channels",
      "Inclusion in post-tournament recap emails",
    ],
  },
  {
    id: "community",
    name: "COMMUNITY PARTNER",
    price: "$4,000",
    popular: true,
    description: "Comprehensive activation for brands looking for on-site presence, sampling, and direct engagement.",
    benefits: [
      "All Official Supporter benefits included",
      "Dedicated 10x10 on-site booth space at 4 flagship events",
      "Exclusive product sampling / distribution rights",
      "Branded team division jerseys for 1 intramural season",
      "Mid-court PA announcements and DJ shoutouts",
      "Dedicated email blast to our 5,000+ subscriber dispatch",
    ],
  },
  {
    id: "title",
    name: "TITLE PARTNER",
    price: "$10,000",
    description: "The premier branding partnership with naming rights, digital dominance, and broadcast integration.",
    benefits: [
      "Full season tournament circuit naming rights ('[Brand] GAMEDAY Series')",
      "Center-court floor decal and main entrance archway branding",
      "Primary jersey crest on all tournament finalists",
      "Dedicated livestream title segment & broadcast graphics",
      "VIP private suite for corporate team & guests",
      "First right of refusal for next season title partnership",
    ],
  },
];

export default function SponsorsPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [selectedTier, setSelectedTier] = React.useState("COMMUNITY PARTNER");
  const [formData, setFormData] = React.useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    budgetRange: "$2,500 - $5,000",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory text-ink min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-20 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 border-b border-ink/15">
        <div className="max-w-4xl">
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-3">
            Austin Local Partnerships
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-headline uppercase text-ink tracking-tight leading-tighter">
            SPONSOR A TOURNAMENT
          </h1>
          <p className="text-base sm:text-xl text-ink/80 font-body max-w-2xl mt-6 leading-relaxed">
            For Austin businesses and local brands that want their name on a weekend bracket. We put your product and signage in front of players, spectators, and local crowds across Austin parks.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="primary" size="lg">
              <a href="#inquire">Talk to us about sponsoring</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#tiers">View Partnership Tiers</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Deliverables Grid */}
      <section className="py-20 bg-ink text-ivory border-b border-ivory/15">
        <div className="max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-12">
            <span className="text-xs font-headline tracking-widest uppercase text-gold">
              What You Get
            </span>
            <h2 className="text-3xl sm:text-5xl font-headline uppercase text-ivory mt-2">
              REAL COURTSIDE PRESENCE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-ivory/5 border border-ivory/10 flex flex-col justify-between min-h-[180px]">
              <Users className="w-8 h-8 text-gold mb-4" />
              <div>
                <span className="text-2xl sm:text-3xl font-headline text-ivory block uppercase">
                  On-Site Pitch
                </span>
                <span className="text-xs font-body text-ivory/60 mt-2 block leading-relaxed">
                  Dedicated tent or booth space at Austin tournament venues on game days.
                </span>
              </div>
            </div>

            <div className="p-6 bg-ivory/5 border border-ivory/10 flex flex-col justify-between min-h-[180px]">
              <Target className="w-8 h-8 text-gold mb-4" />
              <div>
                <span className="text-2xl sm:text-3xl font-headline text-ivory block uppercase">
                  Bracket Signage
                </span>
                <span className="text-xs font-body text-ivory/60 mt-2 block leading-relaxed">
                  Brand placement on physical tournament bracket boards and court barriers.
                </span>
              </div>
            </div>

            <div className="p-6 bg-ivory/5 border border-ivory/10 flex flex-col justify-between min-h-[180px]">
              <Eye className="w-8 h-8 text-gold mb-4" />
              <div>
                <span className="text-2xl sm:text-3xl font-headline text-ivory block uppercase">
                  Product Sampling
                </span>
                <span className="text-xs font-body text-ivory/60 mt-2 block leading-relaxed">
                  Direct rights to hand out beverages, snacks, or apparel to competing athletes.
                </span>
              </div>
            </div>

            <div className="p-6 bg-ivory/5 border border-ivory/10 flex flex-col justify-between min-h-[180px]">
              <ShieldCheck className="w-8 h-8 text-gold mb-4" />
              <div>
                <span className="text-2xl sm:text-3xl font-headline text-ivory block uppercase">
                  PA Shoutouts
                </span>
                <span className="text-xs font-body text-ivory/60 mt-2 block leading-relaxed">
                  Live announcements from the courtside MC during division semifinals and finals.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiered Packages */}
      <section id="tiers" className="py-20 md:py-32 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-16">
          <span className="text-xs font-headline tracking-widest uppercase text-gold">
            Investment Packages
          </span>
          <h2 className="text-4xl sm:text-6xl font-headline uppercase text-ink mt-2">
            2026 PARTNERSHIP TIERS
          </h2>
          <p className="text-sm sm:text-base text-ink/70 font-body max-w-2xl mt-4">
            Customizable packages engineered for brand visibility, experiential activations, and lasting community goodwill.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPONSOR_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between p-8 border ${
                tier.popular
                  ? "bg-ink text-ivory border-ink shadow-lg"
                  : "bg-ivory text-ink border-ink/20"
              }`}
            >
              <div>
                {tier.popular && (
                  <span className="bg-gold text-ink text-[10px] font-headline uppercase tracking-widest px-2.5 py-1 font-bold inline-block mb-4">
                    Most Popular Activation
                  </span>
                )}
                <h3
                  className={`text-2xl sm:text-3xl font-headline uppercase tracking-tight ${
                    tier.popular ? "text-ivory" : "text-ink"
                  }`}
                >
                  {tier.name}
                </h3>
                <div className="mt-4 mb-6">
                  <span
                    className={`text-4xl sm:text-5xl font-headline ${
                      tier.popular ? "text-gold" : "text-ink"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-xs uppercase tracking-wider font-headline ml-2 ${
                      tier.popular ? "text-ivory/60" : "text-ink/60"
                    }`}
                  >
                    / Season Circuit
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm font-body leading-relaxed mb-8 ${
                    tier.popular ? "text-ivory/70" : "text-ink/70"
                  }`}
                >
                  {tier.description}
                </p>

                {/* Benefits List */}
                <ul className="flex flex-col gap-3 pt-6 border-t border-ink/10 dark:border-ivory/15">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span className={tier.popular ? "text-ivory/90" : "text-ink/90"}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-ink/10 dark:border-ivory/15">
                <Button
                  variant={tier.popular ? "primary" : "secondary"}
                  size="default"
                  className="w-full"
                  onClick={() => {
                    setSelectedTier(tier.name);
                    const formElement = document.getElementById("inquire");
                    if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Select {tier.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquire" className="bg-ink text-ivory py-20 md:py-32 border-t border-ivory/15">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-headline tracking-widest uppercase text-gold block mb-2">
              Get In Touch
            </span>
            <h2 className="text-4xl sm:text-6xl font-headline uppercase text-ivory">
              SPONSORSHIP INQUIRY
            </h2>
            <p className="text-sm sm:text-base text-ivory/70 font-body max-w-xl mx-auto mt-3">
              Our partnership directors respond within 24 hours with activation proposals and custom tier decks.
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
                Thank you for contacting us, <strong>{formData.contactName || "Partner"}</strong>. We have received your inquiry for <strong>{selectedTier}</strong> and will follow up with your deck and proposal shortly.
              </p>
              <Button
                variant="primary"
                size="default"
                onClick={() => setSubmitted(false)}
                className="mt-4"
              >
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-ivory/5 p-6 sm:p-10 border border-ivory/15">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="E.G. NIKE ATHLETICS"
                    className="bg-ivory/10 border border-ivory/20 px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="YOUR FULL NAME"
                    className="bg-ivory/10 border border-ivory/20 px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="NAME@COMPANY.COM"
                    className="bg-ivory/10 border border-ivory/20 px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="bg-ivory/10 border border-ivory/20 px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Tier of Interest
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="bg-ink border border-ivory/20 px-4 py-3 text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
                  >
                    <option value="OFFICIAL SUPPORTER">Official Supporter ($1,500)</option>
                    <option value="COMMUNITY PARTNER">Community Partner ($4,000)</option>
                    <option value="TITLE PARTNER">Title Partner ($10,000)</option>
                    <option value="CUSTOM">Custom Activation Package</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                    Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="bg-ink border border-ivory/20 px-4 py-3 text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
                  >
                    <option value="Under $2,500">Under $2,500</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-headline uppercase tracking-wider text-ivory/80">
                  Goals / Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your brand and what you hope to achieve (e.g. sampling, booth space, signage, digital reach)..."
                  className="bg-ivory/10 border border-ivory/20 px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold rounded-none"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidthMobile={true}>
                Submit Partnership Inquiry
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
