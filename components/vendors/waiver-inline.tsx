"use client";

import { cn } from "@/lib/utils";
import { ScrollText, Check } from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Inline Waiver Component
   
   Renders the vendor waiver text in a scrollable container
   with agreement checkbox and signature fields.
   ────────────────────────────────────────────────────────── */

const VENDOR_WAIVER_TEXT = `GAMEDAY VENDOR PARTICIPATION AGREEMENT & RELEASE OF LIABILITY (v1)

By signing this agreement, the Vendor acknowledges and agrees to abide by all GAMEDAY venue safety guidelines, local health department regulations, and load-in / load-out schedules.

SECTION 1 — VENDOR OBLIGATIONS

1.1 The Vendor agrees to arrive at the designated load-in time and have their booth operational at least 30 minutes before the event's posted start time.

1.2 The Vendor is solely responsible for obtaining any required permits, licenses, or health department certifications for the sale of food, beverages, or services.

1.3 The Vendor will maintain a clean, professional booth area throughout the event and will remove all equipment and waste during the designated load-out window.

1.4 The Vendor acknowledges that the assigned booth space is non-transferable and may not be subleased, shared, or assigned to any third party.

SECTION 2 — CATEGORY EXCLUSIVITY

2.1 GAMEDAY enforces subcategory exclusivity to protect the vendor market. Each vendor is assigned a specific subcategory (e.g., "Tacos & Mexican", "Smash Burgers") and no two vendors in the same subcategory will be placed at the same event.

2.2 The Vendor agrees to operate within their assigned subcategory and will not offer products or services that fall outside their designated category without prior written consent from GAMEDAY.

SECTION 3 — PAYMENT & CANCELLATION

3.1 Upon approval, the Vendor will receive a secure payment link valid for 48 hours. Failure to complete payment within this window will result in automatic forfeiture of the assigned slot.

3.2 Vendor slot fees are non-refundable after payment confirmation, except in the case of event cancellation by GAMEDAY.

3.3 In the event of cancellation by GAMEDAY, vendors will receive a full refund processed within 7-10 business days.

SECTION 4 — LIABILITY & INDEMNIFICATION

4.1 The Vendor agrees to indemnify and hold harmless GAMEDAY, its event hosts, venues, and affiliates against any and all claims, liabilities, damages, or losses arising out of the Vendor's operations, products, or services at the event.

4.2 The Vendor maintains sole responsibility for their equipment, inventory, and staff during the event.

4.3 GAMEDAY is not responsible for any loss, damage, or theft of the Vendor's property.

SECTION 5 — MEDIA & PROMOTION

5.1 The Vendor grants GAMEDAY permission to photograph and video record their booth setup and operations for promotional purposes across GAMEDAY's website, social media, and marketing materials.

5.2 The Vendor may promote their participation at GAMEDAY events on their own social media channels and is encouraged to tag @bygameday.`;

interface WaiverInlineProps {
  signerName: string;
  signerEmail: string;
  agreed: boolean;
  onSignerNameChange: (name: string) => void;
  onSignerEmailChange: (email: string) => void;
  onAgreedChange: (agreed: boolean) => void;
  errors?: {
    signerName?: string;
    signerEmail?: string;
    agreed?: string;
  };
}

export function WaiverInline({
  signerName,
  signerEmail,
  agreed,
  onSignerNameChange,
  onSignerEmailChange,
  onAgreedChange,
  errors,
}: WaiverInlineProps) {
  return (
    <div className="space-y-6">
      {/* Waiver header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-ink flex items-center justify-center">
          <ScrollText className="w-5 h-5 text-ivory" />
        </div>
        <div>
          <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
            Vendor Participation Waiver
          </h3>
          <p className="text-xs text-ink/50 font-body">
            Version 1.0 — Please read carefully before signing
          </p>
        </div>
      </div>

      {/* Waiver text in scrollable container */}
      <div className="border-2 border-ink/10 bg-white p-4 sm:p-6 max-h-[400px] overflow-y-auto">
        <pre className="whitespace-pre-wrap text-xs sm:text-sm font-body text-ink/80 leading-relaxed">
          {VENDOR_WAIVER_TEXT}
        </pre>
      </div>

      {/* Signature fields */}
      <div className="border-2 border-ink/10 bg-ink/[0.02] p-4 sm:p-6 space-y-4">
        <p className="text-xs font-headline uppercase tracking-wider text-ink/70">
          Electronic Signature
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="signerName"
              className="block text-xs font-body font-medium text-ink/70 mb-1"
            >
              Full Legal Name *
            </label>
            <input
              id="signerName"
              type="text"
              value={signerName}
              onChange={(e) => onSignerNameChange(e.target.value)}
              placeholder="e.g. Jordan Williams"
              className={cn(
                "w-full px-3 py-2.5 border-2 bg-white text-sm font-body text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
                errors?.signerName ? "border-red-500" : "border-ink/15"
              )}
            />
            {errors?.signerName && (
              <p className="text-xs text-red-600 mt-1 font-body">
                {errors.signerName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signerEmail"
              className="block text-xs font-body font-medium text-ink/70 mb-1"
            >
              Email Address *
            </label>
            <input
              id="signerEmail"
              type="email"
              value={signerEmail}
              onChange={(e) => onSignerEmailChange(e.target.value)}
              placeholder="jordan@yourbrand.com"
              className={cn(
                "w-full px-3 py-2.5 border-2 bg-white text-sm font-body text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
                errors?.signerEmail ? "border-red-500" : "border-ink/15"
              )}
            />
            {errors?.signerEmail && (
              <p className="text-xs text-red-600 mt-1 font-body">
                {errors.signerEmail}
              </p>
            )}
          </div>
        </div>

        {/* Agreement checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              className={cn(
                "w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                agreed
                  ? "bg-gold border-gold"
                  : errors?.agreed
                    ? "border-red-500 bg-white"
                    : "border-ink/20 bg-white group-hover:border-ink/40"
              )}
            >
              {agreed && <Check className="w-3 h-3 text-white" />}
            </div>
            <button
              type="button"
              onClick={() => onAgreedChange(!agreed)}
              className="text-left"
            >
              <span className="text-sm font-body text-ink">
                I have read and agree to the GAMEDAY Vendor Participation Agreement
                & Release of Liability
              </span>
            </button>
          </label>
          {errors?.agreed && (
            <p className="text-xs text-red-600 mt-1.5 ml-8 font-body">
              {errors.agreed}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
