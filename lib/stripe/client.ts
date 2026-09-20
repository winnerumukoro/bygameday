import Stripe from "stripe";

/**
 * Stripe server-side SDK instance.
 * Only used in server components, API routes, and server actions.
 *
 * Falls back gracefully when STRIPE_SECRET_KEY is not set —
 * payment flows will show user-friendly "not configured" messages.
 */

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

function createStripeClient(): Stripe | null {
  if (!stripeSecretKey || stripeSecretKey === "sk_test_...") {
    return null;
  }
  return new Stripe(stripeSecretKey, {
    apiVersion: "2026-08-26.dahlia",
    typescript: true,
  });
}

export const stripe = createStripeClient();

/** Check if Stripe is configured and available */
export function isStripeConfigured(): boolean {
  return stripe !== null;
}
