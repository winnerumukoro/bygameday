"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ApplicationStepsProps {
  currentStep: number;
  totalSteps?: number;
  labels?: string[];
}

const DEFAULT_LABELS = [
  "Business Info",
  "Category & Events",
  "Waiver",
  "Review & Submit",
];

export function ApplicationSteps({
  currentStep,
  totalSteps = 4,
  labels = DEFAULT_LABELS,
}: ApplicationStepsProps) {
  return (
    <div className="w-full">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex items-center flex-1 last:flex-initial">
              {/* Step circle */}
              <div
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-headline border-2 transition-colors",
                  isCompleted &&
                    "bg-gold border-gold text-white",
                  isCurrent &&
                    "bg-ink border-ink text-ivory",
                  !isCompleted &&
                    !isCurrent &&
                    "bg-transparent border-ink/20 text-ink/40"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step
                )}
              </div>

              {/* Connector line */}
              {step < totalSteps && (
                <div
                  className={cn(
                    "flex-1 h-[2px] mx-2 sm:mx-3 transition-colors",
                    isCompleted ? "bg-gold" : "bg-ink/10"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step labels */}
      <div className="flex justify-between">
        {labels.map((label, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <span
              key={label}
              className={cn(
                "text-[10px] sm:text-xs font-body transition-colors text-center",
                step === totalSteps ? "text-right" : step === 1 ? "text-left" : "text-center",
                isCompleted && "text-gold font-medium",
                isCurrent && "text-ink font-semibold",
                !isCompleted && !isCurrent && "text-ink/40"
              )}
              style={{ flex: step < labels.length ? 1 : undefined }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
