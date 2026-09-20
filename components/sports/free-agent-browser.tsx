"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FreeAgentData, freeAgentSchema } from "@/lib/sports/schemas";
import type { FreeAgent, Sport } from "@/lib/sports/data";
import { registerFreeAgent } from "@/lib/sports/actions";
import { AthleticWaiverInline } from "./athletic-waiver-inline";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FreeAgentBrowserProps {
  sports: Sport[];
  initialFreeAgents: FreeAgent[];
}

export function FreeAgentBrowser({
  sports,
  initialFreeAgents,
}: FreeAgentBrowserProps) {
  const [activeTab, setActiveTab] = useState<"directory" | "register">("directory");
  const [selectedSportId, setSelectedSportId] = useState<string>("all");
  const [agents, setAgents] = useState<FreeAgent[]>(initialFreeAgents);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FreeAgentData>({
    resolver: zodResolver(freeAgentSchema),
    defaultValues: {
      sportId: sports[0]?.slug || "basketball",
      name: "",
      email: "",
      phone: "",
      skillLevel: "competitive",
      preferredPosition: "",
      notes: "",
      signerName: "",
      signerEmail: "",
      agreed: false,
    },
    mode: "onTouched",
  });

  const formData = watch();

  const filteredAgents = agents.filter((a) => {
    if (selectedSportId === "all") return true;
    return a.sportId === selectedSportId || a.sportName.toLowerCase().includes(selectedSportId);
  });

  const onSubmit = async (data: FreeAgentData) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await registerFreeAgent(data);
      if (!res.success || !res.data) {
        setErrorMsg("Failed to register as free agent. Please check your information.");
        setIsSubmitting(false);
        return;
      }

      // Add to local state
      const sportObj = sports.find((s) => s.slug === data.sportId);
      const newAgent: FreeAgent = {
        id: res.data.agentId,
        sportId: data.sportId,
        sportName: sportObj?.name || "Basketball",
        name: data.name,
        email: data.email,
        phone: data.phone,
        skillLevel: data.skillLevel,
        preferredPosition: data.preferredPosition,
        notes: data.notes || "",
        status: "available",
        waiverSigned: true,
        createdAt: new Date().toISOString(),
      };

      setAgents((prev) => [newAgent, ...prev]);
      setSuccessMsg("You have been added to the official Free Agent Pool! Team captains can now view your profile.");
      reset();
      setActiveTab("directory");
    } catch {
      setErrorMsg("A server error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex border-b-2 border-ink/20">
        <button
          onClick={() => setActiveTab("directory")}
          className={cn(
            "px-6 py-3.5 font-headline uppercase text-sm tracking-wider border-b-2 -mb-0.5 transition-colors",
            activeTab === "directory"
              ? "border-gold text-ink font-bold bg-white"
              : "border-transparent text-ink/60 hover:text-ink"
          )}
        >
          Available Free Agents ({filteredAgents.length})
        </button>

        <button
          onClick={() => setActiveTab("register")}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3.5 font-headline uppercase text-sm tracking-wider border-b-2 -mb-0.5 transition-colors",
            activeTab === "register"
              ? "border-gold text-ink font-bold bg-white"
              : "border-transparent text-ink/60 hover:text-ink"
          )}
        >
          <UserPlus className="w-4 h-4 text-gold" />
          Join The Pool (Free Signup)
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-50 border-2 border-green-500 text-xs sm:text-sm font-body text-green-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ────────────── TAB 1: DIRECTORY ────────────── */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          {/* Sports filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedSportId("all")}
              className={cn(
                "px-3.5 py-1.5 text-xs font-headline uppercase tracking-wider border transition-colors",
                selectedSportId === "all"
                  ? "bg-ink text-ivory border-ink"
                  : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
              )}
            >
              All Sports
            </button>
            {sports.map((sp) => (
              <button
                key={sp.id}
                onClick={() => setSelectedSportId(sp.slug)}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-headline uppercase tracking-wider border transition-colors",
                  selectedSportId === sp.slug
                    ? "bg-ink text-ivory border-ink"
                    : "bg-white text-ink/70 border-ink/15 hover:border-ink/40"
                )}
              >
                {sp.name}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="border-2 border-ink/15 bg-white p-5 flex flex-col justify-between hover:border-ink transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-headline uppercase tracking-wider bg-gold/15 text-ink px-2 py-0.5 border border-gold/30">
                      {agent.sportName}
                    </span>
                    <span className="text-[10px] font-headline uppercase tracking-wider bg-ink/5 px-2 py-0.5 text-ink/60">
                      {agent.skillLevel}
                    </span>
                  </div>

                  <h4 className="font-headline text-lg uppercase tracking-tight text-ink mb-1">
                    {agent.name}
                  </h4>

                  <span className="text-xs font-headline text-gold block mb-3">
                    {agent.preferredPosition}
                  </span>

                  <p className="text-xs text-ink/70 font-body leading-relaxed mb-4">
                    &ldquo;{agent.notes || "Ready to run. High energy, good communication, committed to game schedule."}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-xs font-body text-ink/60">
                  <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    Waiver Signed
                  </span>
                  <a
                    href={`mailto:${agent.email}?subject=GAMEDAY Roster Invite from Captain`}
                    className="inline-flex items-center gap-1 text-ink font-headline uppercase hover:text-gold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Contact
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ────────────── TAB 2: REGISTER ────────────── */}
      {activeTab === "register" && (
        <div className="border-2 border-ink/20 bg-white p-6 sm:p-10">
          <div className="mb-8">
            <h3 className="text-2xl font-headline uppercase tracking-tight text-ink mb-1">
              FREE AGENT SIGNUP
            </h3>
            <p className="text-xs sm:text-sm font-body text-ink/70">
              Sign up as an unattached athlete. Team captains looking to hit roster minimums browse this directory to invite players directly.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-xs font-body text-red-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Sport of Interest *
                </label>
                <select
                  {...register("sportId")}
                  className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                >
                  {sports.map((sp) => (
                    <option key={sp.id} value={sp.slug}>
                      {sp.name}
                    </option>
                  ))}
                </select>
                {errors.sportId && (
                  <p className="text-xs text-red-600 mt-1">{errors.sportId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Your Full Name *
                </label>
                <input
                  {...register("name")}
                  placeholder="e.g. Cameron Wright"
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
                  placeholder="cameron@email.com"
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
                  Skill Level *
                </label>
                <select
                  {...register("skillLevel")}
                  className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                >
                  <option value="recreational">Recreational</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="competitive">Competitive</option>
                  <option value="elite">Elite</option>
                </select>
                {errors.skillLevel && (
                  <p className="text-xs text-red-600 mt-1">{errors.skillLevel.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Preferred Position / Role *
                </label>
                <input
                  {...register("preferredPosition")}
                  placeholder="e.g. Point Guard, Outside Hitter, Midfielder"
                  className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                />
                {errors.preferredPosition && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.preferredPosition.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Bio / Athletic Experience Notes (Optional)
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                placeholder="Mention past teams, height, playstyle, or schedule availability."
                className="w-full px-3.5 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold resize-none"
              />
              {errors.notes && (
                <p className="text-xs text-red-600 mt-1">{errors.notes.message}</p>
              )}
            </div>

            {/* Athletic Waiver */}
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
                  Adding to Pool...
                </>
              ) : (
                <>
                  Join Free Agent Pool
                  <UserPlus className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
