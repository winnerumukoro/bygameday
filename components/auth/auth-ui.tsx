"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Page frame shared by login, sign-up and password screens. */
export function AuthShell({
  eyebrow,
  title,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-ivory min-h-[80vh]">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <span className="text-xs font-headline tracking-widest uppercase text-gold block mb-1">
          {eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl font-headline uppercase text-ink tracking-tight leading-tighter">
          {title}
        </h1>
        {intro && (
          <p className="text-sm sm:text-base text-ink/70 font-body mt-3 leading-relaxed">{intro}</p>
        )}

        <div className="mt-8 border-2 border-ink/15 bg-white p-6 sm:p-8">{children}</div>

        {footer && <div className="mt-6 text-sm font-body text-ink/70 text-center">{footer}</div>}
      </div>
    </div>
  );
}

export function Field({
  label,
  name,
  type = "text",
  autoComplete,
  defaultValue,
  required = true,
  minLength,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  minLength?: number;
  hint?: string;
}) {
  const id = `field-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-body font-medium uppercase tracking-wider text-ink/70">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required={required}
        minLength={minLength}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="w-full px-3.5 py-3 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold min-h-[48px]"
      />
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-ink/50 font-body">
          {hint}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({ children, pendingText }: { children: React.ReactNode; pendingText: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" className="w-full gap-2" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {pendingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export function FormNotice({ tone, children }: { tone: "error" | "success" | "info"; children: React.ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "p-3.5 border text-sm font-body leading-relaxed",
        tone === "error" && "border-red-300 bg-red-50 text-red-800",
        tone === "success" && "border-gold/60 bg-gold/10 text-ink",
        tone === "info" && "border-ink/15 bg-ink/[0.03] text-ink/80"
      )}
    >
      {children}
    </div>
  );
}
