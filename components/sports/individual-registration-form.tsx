"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type IndividualRegistrationData,
  individualRegistrationSchema,
} from "@/lib/sports/schemas";
import type { Division } from "@/lib/sports/data";
import { registerIndividual } from "@/lib/sports/actions";
import { AthleticWaiverInline } from "./athletic-waiver-inline";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/vendors/data";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";

interface IndividualRegistrationFormProps {
  divisions: Division[];
  initialDivisionId?: string;
}

export function IndividualRegistrationForm({
  divisions,
  initialDivisionId,
}: IndividualRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
  } = useForm<IndividualRegistrationData>({
    resolver: zodResolver(individualRegistrationSchema),
    defaultValues: {
      divisionId: defaultDivisionId,
      name: "",
      email: "",
      phone: "",
      skillLevel: "competitive",
      emergencyContactName: "",
      emergencyContactPhone: "",
      signerName: "",
      signerEmail: "",
      agreed: false,
    },
    mode: "onTouched",
  });

  const formData = watch();
  const selectedDivision = divisions.find((d) => d.id === formData.divisionId);

  const onSubmit = async (data: IndividualRegistrationData) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await registerIndividual(data);
      if (!res.success || !res.data) {
        setErrorMsg(res.error || "Registration failed. Please check your inputs.");
        setIsSubmitting(false);
        return;
      }
      setSubmittedId(res.data.registrationId);
    } catch {
      setErrorMsg("A server error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedId) {
    return (
      <div className="border-2 border-ink/20 bg-white p-6 sm:p-10 text-ink">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gold flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-headline uppercase tracking-widest text-gold block">
              Registration Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
              1V1 SPOT RESERVED
            </h2>
          </div>
        </div>

        <div className="p-4 bg-ink/[0.03] border border-ink/10 flex items-center justify-between text-xs font-mono mb-6">
          <span className="text-ink/60">Competitor Ref Code:</span>
          <span className="font-bold text-ink text-sm uppercase">{submittedId}</span>
        </div>

        <p className="text-sm font-body text-ink/80 leading-relaxed mb-6">
          You are officially confirmed for the <strong>{selectedDivision?.name}</strong>. Your athlete check-in packet, court warm-up schedule, and initial seed bracket will be delivered to your registered email.
        </p>

        <div className="p-4 bg-ink text-ivory text-xs font-body mb-6">
          <span className="font-headline uppercase tracking-wider text-gold block mb-1">
            Game Day Check-In Protocol
          </span>
          <p className="text-ivory/70 leading-relaxed">
            Report to the court registration desk with photo ID 45 minutes prior to your scheduled match time. Jersey numbers and warm-up balls will be issued at the scorer&apos;s table.
          </p>
        </div>

        <Button asChild variant="primary" className="w-full">
          <a href="/sports">Return to Sports Hub</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="border-2 border-ink/20 bg-white p-6 sm:p-10">
      {/* 30-min hold notice banner */}
      <div className="p-4 bg-amber-50 border-l-4 border-amber-500 mb-8 flex items-start gap-3">
        <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs font-body text-amber-900 leading-relaxed">
          <strong className="font-headline uppercase tracking-wider block mb-0.5 text-amber-950">
            30-Minute Checkout Reservation Window
          </strong>
          When you begin registration, your spot in the bracket is temporarily reserved for 30 minutes to ensure fair capacity management.
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-xs font-body text-red-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ────────────── DIVISION SELECTION ────────────── */}
        <div>
          <label className="block text-xs font-headline uppercase tracking-wider text-ink/70 mb-2">
            1. Select 1v1 Tournament Division *
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
                  <span className="text-[11px] text-ink/60 font-body block">
                    {div.courtType}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.divisionId && (
            <p className="text-xs text-red-600 mt-1">{errors.divisionId.message}</p>
          )}
        </div>

        {/* ────────────── ATHLETE CONTACT PROFILE ────────────── */}
        <div>
          <h3 className="text-xs font-headline uppercase tracking-wider text-ink/70 mb-4 pb-2 border-b border-ink/10">
            2. Competitor Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Full Name *
              </label>
              <input
                {...register("name")}
                placeholder="e.g. Kyrie Mitchell"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Email Address *
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="kyrie@email.com"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Phone Number *
              </label>
              <input
                {...register("phone")}
                placeholder="(555) 000-0000"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Experience / Skill Level *
              </label>
              <select
                {...register("skillLevel")}
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              >
                <option value="recreational">Recreational (Casual)</option>
                <option value="intermediate">Intermediate (Local Runs)</option>
                <option value="competitive">Competitive (Club / High School)</option>
                <option value="elite">Elite (College / Semi-Pro)</option>
              </select>
              {errors.skillLevel && (
                <p className="text-xs text-red-600 mt-1">{errors.skillLevel.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* ────────────── EMERGENCY CONTACT ────────────── */}
        <div>
          <h3 className="text-xs font-headline uppercase tracking-wider text-ink/70 mb-4 pb-2 border-b border-ink/10">
            3. Safety & Emergency Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Emergency Contact Name *
              </label>
              <input
                {...register("emergencyContactName")}
                placeholder="e.g. Sarah Mitchell"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.emergencyContactName && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.emergencyContactName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Emergency Contact Phone *
              </label>
              <input
                {...register("emergencyContactPhone")}
                placeholder="(555) 999-9999"
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
              />
              {errors.emergencyContactPhone && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.emergencyContactPhone.message}
                </p>
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

        {/* Fee breakdown & Submit */}
        <div className="pt-6 border-t border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-ink/50 block font-body">Total Entry Fee:</span>
            <span className="font-headline text-3xl text-gold">
              {formatCurrency(selectedDivision?.feeCents ?? 5000)}
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
                Reserving Spot...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Confirm 1v1 Registration
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
