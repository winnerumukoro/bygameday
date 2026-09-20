"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type TeamRegistrationData,
  teamRegistrationSchema,
} from "@/lib/sports/schemas";
import type { Division } from "@/lib/sports/data";
import { registerTeam } from "@/lib/sports/actions";
import { AthleticWaiverInline } from "./athletic-waiver-inline";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/vendors/data";
import {
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamRegistrationFormProps {
  divisions: Division[];
  initialDivisionId?: string;
}

export function TeamRegistrationForm({
  divisions,
  initialDivisionId,
}: TeamRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTeam, setCreatedTeam] = useState<{
    teamId: string;
    inviteCode: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const defaultDivisionId =
    initialDivisionId && divisions.some((d) => d.id === initialDivisionId)
      ? initialDivisionId
      : divisions[0]?.id || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TeamRegistrationData>({
    resolver: zodResolver(teamRegistrationSchema),
    defaultValues: {
      divisionId: defaultDivisionId,
      teamName: "",
      captainName: "",
      captainEmail: "",
      captainPhone: "",
      signerName: "",
      signerEmail: "",
      agreed: false,
    },
    mode: "onTouched",
  });

  const formData = watch();
  const selectedDivision = divisions.find((d) => d.id === formData.divisionId);

  const onSubmit = async (data: TeamRegistrationData) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await registerTeam(data);
      if (!res.success || !res.data) {
        setErrorMsg(res.error || "Team registration failed. Please review your details.");
        setIsSubmitting(false);
        return;
      }
      setCreatedTeam(res.data);
    } catch {
      setErrorMsg("A server error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    if (!createdTeam) return;
    const url = `${window.location.origin}/teams/join/${createdTeam.inviteCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (createdTeam) {
    return (
      <div className="border-2 border-ink/20 bg-white p-6 sm:p-10 text-ink">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gold flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-headline uppercase tracking-widest text-gold block">
              Team Created Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
              {formData.teamName.toUpperCase()}
            </h2>
          </div>
        </div>

        <p className="text-sm font-body text-ink/80 leading-relaxed mb-6">
          Your team is registered in the <strong>{selectedDivision?.name}</strong>. Now it&apos;s time to recruit your squad and meet the minimum roster requirement of <strong>{selectedDivision?.rosterMin} players</strong>.
        </p>

        {/* Invite Code Highlight Box */}
        <div className="p-6 bg-ink text-ivory mb-6 border-2 border-ink">
          <span className="text-xs font-headline uppercase tracking-widest text-gold block mb-2">
            Your Private Team Invite Code
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="font-mono text-2xl font-bold tracking-wider text-gold">
              {createdTeam.inviteCode}
            </span>
            <Button
              onClick={handleCopyLink}
              variant="primary"
              size="sm"
              className="gap-2 text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied To Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Teammate Invite Link
                </>
              )}
            </Button>
          </div>
          <p className="text-[11px] text-ivory/60 font-body mt-3">
            Send this link to your teammates so they can sign up on your roster and complete their required athletic waiver.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            variant="primary"
            size="lg"
            className="flex-1 gap-2"
          >
            <a href={`/teams/${createdTeam.inviteCode}`}>
              Enter Captain Dashboard
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="flex-1"
          >
            <a href="/sports">Back to Sports Hub</a>
          </Button>
        </div>
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
        {/* ────────────── DIVISION SELECTOR ────────────── */}
        <div>
          <label className="block text-xs font-headline uppercase tracking-wider text-ink/70 mb-2">
            1. Select Intramural Division *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {divisions.map((div) => {
              const isSelected = formData.divisionId === div.id;
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => setValue("divisionId", div.id, { shouldValidate: true })}
                  className={cn(
                    "p-4 border-2 text-left transition-all",
                    isSelected
                      ? "border-gold bg-gold/10"
                      : "border-ink/15 bg-white hover:border-ink/40"
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-headline text-sm uppercase text-ink">
                      {div.name}
                    </span>
                    <span className="font-headline text-xs text-gold">
                      {formatCurrency(div.feeCents)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink/60 font-body">
                    <span>{div.courtType}</span>
                    <span>•</span>
                    <span>Min {div.rosterMin} Players</span>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.divisionId && (
            <p className="text-xs text-red-600 mt-1">{errors.divisionId.message}</p>
          )}
        </div>

        {/* ────────────── TEAM NAME & CAPTAIN DETAILS ────────────── */}
        <div>
          <h3 className="text-xs font-headline uppercase tracking-wider text-ink/70 mb-4 pb-2 border-b border-ink/10">
            2. Team & Captain Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Team Name *
              </label>
              <input
                {...register("teamName")}
                placeholder="e.g. Uptown Monstars, Brooklyn Flight Squad"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.teamName && (
                <p className="text-xs text-red-600 mt-1">{errors.teamName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Captain Full Name *
                </label>
                <input
                  {...register("captainName")}
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                />
                {errors.captainName && (
                  <p className="text-xs text-red-600 mt-1">{errors.captainName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Captain Email *
                </label>
                <input
                  {...register("captainEmail")}
                  type="email"
                  placeholder="marcus@email.com"
                  className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                />
                {errors.captainEmail && (
                  <p className="text-xs text-red-600 mt-1">{errors.captainEmail.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Captain Phone *
                </label>
                <input
                  {...register("captainPhone")}
                  placeholder="(555) 000-0000"
                  className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                />
                {errors.captainPhone && (
                  <p className="text-xs text-red-600 mt-1">{errors.captainPhone.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ────────────── CAPTAIN ATHLETIC WAIVER ────────────── */}
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

        {/* Total fee & Submit button */}
        <div className="pt-6 border-t border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-ink/50 block font-body">Team Entry Fee:</span>
            <span className="font-headline text-3xl text-gold">
              {formatCurrency(selectedDivision?.feeCents ?? 45000)}
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="gap-2 min-w-[240px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registering Team...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Confirm Team Registration
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
