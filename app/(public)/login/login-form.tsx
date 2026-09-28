"use client";

import * as React from "react";
import Link from "next/link";
import { signIn, type FormState } from "@/lib/auth/actions";
import { Field, FormNotice, SubmitButton } from "@/components/auth/auth-ui";

export function LoginForm({ next, notice }: { next: string; notice?: { tone: "error" | "success" | "info"; text: string } }) {
  const [state, action] = React.useActionState<FormState, FormData>(signIn, {});

  return (
    <form action={action} className="flex flex-col gap-5">
      {notice && !state.error && <FormNotice tone={notice.tone}>{notice.text}</FormNotice>}
      {state.error && <FormNotice tone="error">{state.error}</FormNotice>}

      <input type="hidden" name="next" value={next} />
      <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={state.values?.email} />
      <Field label="Password" name="password" type="password" autoComplete="current-password" />

      <div className="-mt-2 text-right">
        <Link href="/forgot-password" className="text-xs font-body text-ink/70 underline hover:text-gold">
          Forgot your password?
        </Link>
      </div>

      <SubmitButton pendingText="Signing in...">Log In</SubmitButton>
    </form>
  );
}
