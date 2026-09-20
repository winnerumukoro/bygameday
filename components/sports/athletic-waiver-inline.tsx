"use client";

import { cn } from "@/lib/utils";
import { ShieldAlert, Check } from "lucide-react";

const ATHLETIC_WAIVER_TEXT = `GAMEDAY ATHLETIC PARTICIPATION & LIABILITY WAIVER (v1)

By signing this agreement, the Athlete acknowledges and agrees to abide by all GAMEDAY tournament rules, facility safety guidelines, and referee decisions.

SECTION 1 — ACKNOWLEDGMENT OF INHERENT RISK

1.1 The Athlete acknowledges that competitive athletics, 1v1 showdowns, intramural team matches, and court tournament play carry inherent risks of severe physical injury, including but not limited to sprains, ligament tears, fractures, head trauma/concussions, or heat exhaustion.

1.2 The Athlete certifies that they are physically fit and capable of participating in high-intensity competitive sports and have not been advised against vigorous physical activity by a medical practitioner.

SECTION 2 — RELEASE & WAIVER OF LIABILITY

2.1 In consideration of being permitted to register, participate, and enter the facility, the Athlete hereby voluntarily assumes all risks of injury or harm associated with tournament participation.

2.2 The Athlete releases, waives, and forever discharges GAMEDAY, its event organizers, referees, staff, volunteers, venue operators, and sponsors from any and all liability, claims, or damages resulting from ordinary tournament play, physical contact, or emergency first aid administered on site.

SECTION 3 — CODE OF CONDUCT & FAIR PLAY

3.1 GAMEDAY maintains a zero-tolerance policy regarding physical fighting, intentional unsportsmanlike fouls, verbal abuse of tournament officials or spectators, and property vandalism.

3.2 Any violation of the code of conduct will result in immediate ejection from the tournament and venue without refund of registration fees.

SECTION 4 — MEDIA RELEASE & PHOTOGRAPHY

4.1 The Athlete consents to being photographed, filmed, and recorded during official GAMEDAY games.

4.2 GAMEDAY and its authorized media partners retain full rights to broadcast, livestream, and publish match footage and highlights for promotional and archival purposes.`;

interface AthleticWaiverInlineProps {
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

export function AthleticWaiverInline({
  signerName,
  signerEmail,
  agreed,
  onSignerNameChange,
  onSignerEmailChange,
  onAgreedChange,
  errors,
}: AthleticWaiverInlineProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-ink flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="font-headline text-sm uppercase tracking-wider text-ink">
            Athletic Participation & Injury Release
          </h3>
          <p className="text-xs text-ink/50 font-body">
            Official Section A Waiver (v1) • Mandatory for all competitors
          </p>
        </div>
      </div>

      {/* Scrollable Terms */}
      <div className="border-2 border-ink/10 bg-white p-4 sm:p-5 max-h-[280px] overflow-y-auto">
        <pre className="whitespace-pre-wrap text-xs font-body text-ink/80 leading-relaxed">
          {ATHLETIC_WAIVER_TEXT}
        </pre>
      </div>

      {/* Signature block */}
      <div className="border-2 border-ink/10 bg-ink/[0.02] p-4 sm:p-6 space-y-4">
        <p className="text-xs font-headline uppercase tracking-wider text-ink/70">
          Electronic Signature & Confirmation
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="athleticSignerName"
              className="block text-xs font-body font-medium text-ink/70 mb-1"
            >
              Full Legal Name *
            </label>
            <input
              id="athleticSignerName"
              type="text"
              value={signerName}
              onChange={(e) => onSignerNameChange(e.target.value)}
              placeholder="e.g. Jordan Williams"
              className={cn(
                "w-full px-3 py-2.5 border-2 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold",
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
              htmlFor="athleticSignerEmail"
              className="block text-xs font-body font-medium text-ink/70 mb-1"
            >
              Signer Email Address *
            </label>
            <input
              id="athleticSignerEmail"
              type="email"
              value={signerEmail}
              onChange={(e) => onSignerEmailChange(e.target.value)}
              placeholder="jordan@domain.com"
              className={cn(
                "w-full px-3 py-2.5 border-2 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold",
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

        {/* Agreement Checkbox */}
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
              <span className="text-xs sm:text-sm font-body text-ink">
                I have read and voluntarily agree to the GAMEDAY Athletic Participation & Liability Waiver. I confirm I am at least 18 years of age and physically capable of participating.
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
