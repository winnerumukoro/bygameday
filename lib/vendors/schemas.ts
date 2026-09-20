import { z } from "zod";

/* ─────────────── Vendor Application Schema ──────────────── */

export const vendorBusinessInfoSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name is required")
    .max(120, "Business name must be 120 characters or fewer"),
  contactName: z
    .string()
    .min(2, "Contact name is required")
    .max(80, "Contact name must be 80 characters or fewer"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long"),
  city: z
    .string()
    .min(2, "City is required")
    .max(80, "City name must be 80 characters or fewer"),
  description: z
    .string()
    .min(20, "Please describe your business (at least 20 characters)")
    .max(500, "Description must be 500 characters or fewer"),
  instagram: z.string().max(60).optional().or(z.literal("")),
  tiktok: z.string().max(60).optional().or(z.literal("")),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

export const vendorCategorySchema = z.object({
  categoryId: z.string().uuid("Please select a category"),
  subcategoryId: z.string().uuid("Please select a subcategory"),
  eventIds: z
    .array(z.string().uuid())
    .min(1, "Please select at least one event"),
});

export const vendorWaiverSchema = z.object({
  signerName: z
    .string()
    .min(2, "Please enter your full legal name"),
  signerEmail: z.string().email("Please enter a valid email address"),
  agreed: z
    .boolean()
    .refine((val) => val === true, "You must agree to the waiver to continue"),
});

/** Combined schema for the full vendor application */
export const vendorApplicationSchema = vendorBusinessInfoSchema
  .merge(vendorCategorySchema)
  .merge(vendorWaiverSchema);

export type VendorBusinessInfo = z.infer<typeof vendorBusinessInfoSchema>;
export type VendorCategorySelection = z.infer<typeof vendorCategorySchema>;
export type VendorWaiverAgreement = z.infer<typeof vendorWaiverSchema>;
export type VendorApplicationData = z.infer<typeof vendorApplicationSchema>;
