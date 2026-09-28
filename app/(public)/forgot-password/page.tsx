"use client";

import * as React from "react";
import Link from "next/link";
import { requestPasswordReset, type FormState } from "@/lib/auth/actions";
import { AuthShell, Field, FormNotice, SubmitButton } from "@/components/auth/auth-ui";

export default function ForgotPasswordPage() {
  const [state, action] = React.useActionState<FormState, FormData>(requestPasswordReset, {});

  return (
    <AuthShell
      eyebrow="Your account"
      title="Reset Password"
      intro="Enter the email you signed up with and we'll send you a link to choose a new password."
      footer={
        <Link href="/login" className="font-bold text-ink underline hover:text-gold">
          Back to log in
        </Link>
      }
    >
      {state.message ? (
        <FormNotice tone="success">{state.message}</FormNotice>
      ) : (
        <form action={action} className="flex flex-col gap-5">
          {state.error && <FormNotice tone="error">{state.error}</FormNotice>}
          <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={state.values?.email} />
          <SubmitButton pendingText="Sending...">Send Reset Link</SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
