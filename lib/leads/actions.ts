"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

/* ────────────────────────────────────────────────────────────
   Public lead capture — mailing list sign-ups and sponsor
   inquiries. Neither table allows anonymous inserts under RLS,
   so these write through the service-role client on the server.
   ──────────────────────────────────────────────────────────── */

export interface LeadResult {
  success: boolean;
  error?: string;
}

const mailingListSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  firstName: z.string().trim().max(80).optional(),
  interests: z.array(z.enum(["tournaments", "vendors", "spectator"])).default([]),
  source: z.string().max(40).default("web"),
});

export async function subscribeToMailingList(
  input: z.input<typeof mailingListSchema>
): Promise<LeadResult> {
  const parsed = mailingListSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid details." };
  }

  const { email, firstName, interests, source } = parsed.data;
  const supabase = createAdminClient();

  // Re-subscribing an existing address clears any earlier unsubscribe.
  const { error } = await supabase.from("mailing_list").upsert(
    {
      email,
      first_name: firstName || null,
      interests,
      source,
      consented_at: new Date().toISOString(),
      unsubscribed_at: null,
    },
    { onConflict: "email" }
  );

  if (error) {
    console.error("mailing_list upsert failed", error);
    return { success: false, error: "We couldn't save your sign-up. Please try again." };
  }

  return { success: true };
}

const sponsorInquirySchema = z.object({
  company: z.string().trim().min(1, "Company is required.").max(160),
  contactName: z.string().trim().min(1, "Your name is required.").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  phone: z.string().trim().max(40).optional(),
  budgetRange: z.string().trim().max(40).optional(),
  message: z.string().trim().max(4000).optional(),
});

export async function submitSponsorInquiry(
  input: z.input<typeof sponsorInquirySchema>
): Promise<LeadResult> {
  const parsed = sponsorInquirySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid details." };
  }

  const { company, contactName, email, phone, budgetRange, message } = parsed.data;
  const supabase = createAdminClient();

  const { error } = await supabase.from("sponsor_inquiries").insert({
    company,
    contact_name: contactName,
    email,
    phone: phone || null,
    budget_range: budgetRange || null,
    message: message || null,
  });

  if (error) {
    console.error("sponsor_inquiries insert failed", error);
    return { success: false, error: "We couldn't send your inquiry. Please try again." };
  }

  return { success: true };
}
