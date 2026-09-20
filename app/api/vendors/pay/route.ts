import { NextRequest, NextResponse } from "next/server";
import { createVendorCheckoutSession } from "@/lib/stripe/checkout";

/**
 * POST /api/vendors/pay
 *
 * Accepts a payment token from the admin-generated payment link,
 * validates it, and redirects the vendor to Stripe Checkout.
 *
 * In production the payment token is looked up from vendor_event_slots
 * to get the slot details. For now we accept the details directly.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { slotId, applicationId, email, eventTitle, subcategoryName, feeCents } =
      body as {
        paymentToken?: string;
        slotId: string;
        applicationId: string;
        email: string;
        eventTitle: string;
        subcategoryName: string;
        feeCents: number;
      };

    // In production:
    // 1. Look up paymentToken in vendor_event_slots
    // 2. Validate token hasn't expired (48hr window)
    // 3. Get slot details from the DB record

    if (!slotId || !email || !feeCents) {
      return NextResponse.json(
        { error: "Missing required payment details" },
        { status: 400 }
      );
    }

    const result = await createVendorCheckoutSession({
      slotId,
      applicationId: applicationId ?? "unknown",
      email,
      eventTitle: eventTitle ?? "GAMEDAY Event",
      subcategoryName: subcategoryName ?? "Vendor Slot",
      feeCents,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 503 }
      );
    }

    return NextResponse.json({ checkoutUrl: result.checkoutUrl });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
