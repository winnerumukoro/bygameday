"use client";

import * as React from "react";
import Link from "next/link";
import { signUp, type FormState } from "@/lib/auth/actions";
import { Field, FormNotice, SubmitButton } from "@/components/auth/auth-ui";

export function SignupForm({ next }: { next: string }) {
  const [state, action] = React.useActionState<FormState, FormData>(signUp, {});

  if (state.message) {
    return (
      <div className="flex flex-col gap-4">
        <FormNotice tone="success">{state.message}</FormNotice>
        <p className="text-xs text-ink/60 font-body leading-relaxed">
          No email after a few minutes? Check your spam folder. If you already have an account,{" "}
          <Link href="/login" className="underline hover:text-gold">
            log in
          </Link>{" "}
          instead.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && <FormNotice tone="error">{state.error}</FormNotice>}

      <input type="hidden" name="next" value={next} />
      <Field label="Full name" name="fullName" autoComplete="name" defaultValue={state.values?.fullName} />
      <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={state.values?.email} />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        hint="At least 8 characters."
      />
      <Field label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} />

      <p className="text-xs text-ink/60 font-body leading-relaxed">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="underline hover:text-gold">Terms</Link> and{" "}
        <Link href="/privacy" className="underline hover:text-gold">Privacy Policy</Link>.
      </p>

      <SubmitButton pendingText="Creating account...">Create Account</SubmitButton>
    </form>
  );
}
