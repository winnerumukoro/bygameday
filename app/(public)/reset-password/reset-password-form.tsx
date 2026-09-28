"use client";

import * as React from "react";
import { updatePassword, type FormState } from "@/lib/auth/actions";
import { Field, FormNotice, SubmitButton } from "@/components/auth/auth-ui";

export function ResetPasswordForm() {
  const [state, action] = React.useActionState<FormState, FormData>(updatePassword, {});

  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && <FormNotice tone="error">{state.error}</FormNotice>}
      <Field
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        hint="At least 8 characters."
      />
      <Field label="Confirm new password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} />
      <SubmitButton pendingText="Saving...">Save Password</SubmitButton>
    </form>
  );
}
