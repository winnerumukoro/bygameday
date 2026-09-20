import { stripe, isStripeConfigured } from "./client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export interface CreateVendorCheckoutParams {
  slotId: string;
  applicationId: string;
  email: string;
  eventTitle: string;
  subcategoryName: string;
  feeCents: number;
}

export interface CheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}

/**
 * Create a Stripe Checkout Session for a vendor slot payment.
 *
 * The session includes metadata linking back to the vendor_event_slots
 * record so the webhook handler can confirm the correct slot.
 */
export async function createVendorCheckoutSession(
  params: CreateVendorCheckoutParams
): Promise<CheckoutResult> {
  if (!isStripeConfigured() || !stripe) {
    return {
      success: false,
      error:
        "Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables.",
    };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: params.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: params.feeCents,
            product_data: {
              name: `Vendor Slot: ${params.subcategoryName}`,
              description: params.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        slot_id: params.slotId,
        application_id: params.applicationId,
        purpose: "vendor_fee",
      },
      success_url: `${siteUrl}/vendors/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/vendors/apply?cancelled=true`,
      expires_at: Math.floor(Date.now() / 1000) + 48 * 60 * 60, // 48 hours
    });

    return {
      success: true,
      checkoutUrl: session.url ?? undefined,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create checkout session";
    return { success: false, error: message };
  }
}
