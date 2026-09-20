"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type JoinTeamData, joinTeamSchema } from "@/lib/sports/schemas";
import type { Team, Division } from "@/lib/sports/data";
import { joinTeamWithInviteCode } from "@/lib/sports/actions";
import { AthleticWaiverInline } from "./athletic-waiver-inline";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

interface JoinTeamFormProps {
  team: Team;
  division: Division;
}

export function JoinTeamForm({ team, division }: JoinTeamFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JoinTeamData>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: {
      playerName: "",
      playerEmail: "",
      playerPhone: "",
      jerseyNumber: "",
      signerName: "",
      signerEmail: "",
      agreed: false,
    },
    mode: "onTouched",
  });

  const formData = watch();

  const onSubmit = async (data: JoinTeamData) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await joinTeamWithInviteCode(team.inviteCode, data);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to join team roster. Please try again.");
        setIsSubmitting(false);
        return;
      }
      setIsJoined(true);
    } catch {
      setErrorMsg("A server error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isJoined) {
    return (
      <div className="border-2 border-ink/20 bg-white p-6 sm:p-10 text-ink">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gold flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-headline uppercase tracking-widest text-gold block">
              Roster Spot Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
              YOU&apos;RE ON THE SQUAD
            </h2>
          </div>
        </div>

        <p className="text-sm font-body text-ink/80 leading-relaxed mb-6">
          You have successfully joined the <strong>{team.name}</strong> roster for the <strong>{division.name}</strong> tournament. Your signed athletic liability waiver has been recorded.
        </p>

        <div className="p-4 bg-ink/[0.03] border border-ink/10 text-xs font-body text-ink/70 mb-6">
          <span>Captain: <strong>{team.captainName}</strong> ({team.captainEmail})</span>
        </div>

        <Button asChild variant="primary" className="w-full gap-2">
          <a href={`/teams/${team.inviteCode}`}>
            View Team Roster Dashboard
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="border-2 border-ink/20 bg-white p-6 sm:p-10">
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-xs font-body text-red-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-xs font-headline uppercase tracking-wider text-ink/70 mb-4 pb-2 border-b border-ink/10">
            1. Player Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Your Full Name *
              </label>
              <input
                {...register("playerName")}
                placeholder="e.g. Tariq Owens"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.playerName && (
                <p className="text-xs text-red-600 mt-1">{errors.playerName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Email Address *
              </label>
              <input
                {...register("playerEmail")}
                type="email"
                placeholder="tariq@email.com"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.playerEmail && (
                <p className="text-xs text-red-600 mt-1">{errors.playerEmail.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Phone Number *
              </label>
              <input
                {...register("playerPhone")}
                placeholder="(555) 000-0000"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.playerPhone && (
                <p className="text-xs text-red-600 mt-1">{errors.playerPhone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Preferred Jersey # (Optional)
              </label>
              <input
                {...register("jerseyNumber")}
                placeholder="e.g. 7 or 23"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.jerseyNumber && (
                <p className="text-xs text-red-600 mt-1">{errors.jerseyNumber.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* ────────────── ATHLETIC WAIVER ────────────── */}
        <div className="pt-2">
          <AthleticWaiverInline
            signerName={formData.signerName}
            signerEmail={formData.signerEmail}
            agreed={formData.agreed}
            onSignerNameChange={(val) => setValue("signerName", val, { shouldValidate: true })}
            onSignerEmailChange={(val) => setValue("signerEmail", val, { shouldValidate: true })}
            onAgreedChange={(val) => setValue("agreed", val, { shouldValidate: true })}
            errors={{
              signerName: errors.signerName?.message,
              signerEmail: errors.signerEmail?.message,
              agreed: errors.agreed?.message,
            }}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full gap-2 text-sm uppercase tracking-wider font-headline"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Joining Squad...
            </>
          ) : (
            <>
              Confirm & Join {team.name}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
