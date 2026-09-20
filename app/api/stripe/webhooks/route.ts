import { NextRequest, NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe/client";
import { confirmSlotPayment } from "@/lib/vendors/capacity";

/**
 * Stripe Webhook Handler
 *
 * Processes checkout.session.completed events to confirm vendor slot payments.
 * Verifies the webhook signature to prevent spoofed events.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isStripeConfigured() || !stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || webhookSecret === "whsec_...") {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 503 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const slotId = session.metadata?.slot_id;
      const applicationId = session.metadata?.application_id;
      const purpose = session.metadata?.purpose;

      if (purpose === "vendor_fee" && slotId) {
        // Generate a payment record ID (in production: INSERT into payments table)
        const paymentId = `pay-${Date.now()}`;

        // Confirm the slot
        const result = confirmSlotPayment(slotId, paymentId);

        console.log(
          `[Webhook] Vendor slot confirmed: slotId=${slotId}, applicationId=${applicationId}, paymentId=${paymentId}, success=${result.success}`
        );

        // In production:
        // 1. INSERT into payments (stripe_checkout_session_id, stripe_payment_intent_id, amount_cents, status='paid', purpose='vendor_fee')
        // 2. UPDATE vendor_event_slots SET status='confirmed', payment_id=paymentId WHERE id=slotId
        // 3. Send confirmation email via Resend
      }
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      const slotId = session.metadata?.slot_id;

      if (slotId) {
        console.log(
          `[Webhook] Checkout expired: slotId=${slotId} — slot will be released by cron`
        );
        // The cron job (expireUnpaidSlots) handles releasing expired slots
      }
      break;
    }

    default:
      // Unhandled event type — log but don't error
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
