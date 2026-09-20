"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationSteps } from "./application-steps";
import { CategorySelector } from "./category-selector";
import { EventSelector } from "./event-selector";
import { WaiverInline } from "./waiver-inline";
import { Button } from "@/components/ui/button";
import {
  type VendorApplicationData,
  vendorApplicationSchema,
  vendorBusinessInfoSchema,
  vendorCategorySchema,
  vendorWaiverSchema,
} from "@/lib/vendors/schemas";
import {
  type VendorCategory,
  type VendorSubcategory,
  type VendorAcceptingEvent,
  formatCurrency,
} from "@/lib/vendors/data";
import { submitVendorApplication } from "@/lib/vendors/actions";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  Calendar,
  FileCheck,
  Loader2,
  Edit3,
} from "lucide-react";
import { format } from "date-fns";

interface VendorApplicationFormProps {
  categories: VendorCategory[];
  subcategories: VendorSubcategory[];
  events: VendorAcceptingEvent[];
  initialEventId?: string;
}

export function VendorApplicationForm({
  categories,
  subcategories,
  events,
  initialEventId,
}: VendorApplicationFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Initialize react-hook-form with full schema
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<VendorApplicationData>({
    resolver: zodResolver(vendorApplicationSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      city: "",
      description: "",
      instagram: "",
      tiktok: "",
      website: "",
      categoryId: "",
      subcategoryId: "",
      eventIds: initialEventId ? [initialEventId] : [],
      signerName: "",
      signerEmail: "",
      agreed: false,
    },
    mode: "onTouched",
  });

  const formData = watch();

  // Step 1 -> Step 2 validation
  const validateStep1 = () => {
    const step1Data = {
      businessName: formData.businessName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      description: formData.description,
      instagram: formData.instagram,
      tiktok: formData.tiktok,
      website: formData.website,
    };

    const result = vendorBusinessInfoSchema.safeParse(step1Data);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          setError(err.path[0] as keyof VendorApplicationData, {
            type: "manual",
            message: err.message,
          });
        }
      });
      return false;
    }

    clearErrors([
      "businessName",
      "contactName",
      "email",
      "phone",
      "city",
      "description",
      "instagram",
      "tiktok",
      "website",
    ]);
    return true;
  };

  // Step 2 -> Step 3 validation
  const validateStep2 = () => {
    const step2Data = {
      categoryId: formData.categoryId,
      subcategoryId: formData.subcategoryId,
      eventIds: formData.eventIds,
    };

    const result = vendorCategorySchema.safeParse(step2Data);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          setError(err.path[0] as keyof VendorApplicationData, {
            type: "manual",
            message: err.message,
          });
        }
      });
      return false;
    }

    clearErrors(["categoryId", "subcategoryId", "eventIds"]);
    return true;
  };

  // Step 3 -> Step 4 validation
  const validateStep3 = () => {
    const step3Data = {
      signerName: formData.signerName,
      signerEmail: formData.signerEmail,
      agreed: formData.agreed,
    };

    const result = vendorWaiverSchema.safeParse(step3Data);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          setError(err.path[0] as keyof VendorApplicationData, {
            type: "manual",
            message: err.message,
          });
        }
      });
      return false;
    }

    clearErrors(["signerName", "signerEmail", "agreed"]);
    return true;
  };

  // Step navigation
  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        // Pre-fill signer fields from step 1 if not yet filled
        if (!formData.signerName && formData.contactName) {
          setValue("signerName", formData.contactName);
        }
        if (!formData.signerEmail && formData.email) {
          setValue("signerEmail", formData.email);
        }
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 3) {
      if (validateStep3()) {
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleToggleEvent = (eventId: string) => {
    const current = formData.eventIds || [];
    const exists = current.includes(eventId);
    const updated = exists
      ? current.filter((id) => id !== eventId)
      : [...current, eventId];
    setValue("eventIds", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: VendorApplicationData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await submitVendorApplication(data);

      if (!response.success || !response.applicationId) {
        setSubmitError(
          "An error occurred while submitting your application. Please check your inputs and try again."
        );
        setIsSubmitting(false);
        return;
      }

      router.push(`/vendors/confirmation/${response.applicationId}`);
    } catch {
      setSubmitError(
        "A network or server error occurred. Please try again or reach out to vendor support."
      );
      setIsSubmitting(false);
    }
  };

  // Selected details for review
  const selectedCategory = categories.find((c) => c.id === formData.categoryId);
  const selectedSubcategory = subcategories.find(
    (s) => s.id === formData.subcategoryId
  );
  const selectedEvents = events.filter((e) =>
    (formData.eventIds || []).includes(e.id)
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress tracker */}
      <div className="mb-10 sm:mb-12">
        <ApplicationSteps currentStep={currentStep} />
      </div>

      {submitError && (
        <div className="mb-8 p-4 bg-red-50 border-2 border-red-500 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-900 font-body">
            <p className="font-semibold mb-0.5">Submission Failed</p>
            <p>{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ────────────── STEP 1: Business Information ────────────── */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
                Business & Contact Profile
              </h2>
              <p className="text-sm text-ink/70 font-body mt-1">
                Tell us about your brand. This information is used for curation and venue operations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Business Name *
                </label>
                <input
                  {...register("businessName")}
                  placeholder="e.g. Gotham Smash Burgers"
                  className="w-full px-3.5 py-3 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                />
                {errors.businessName && (
                  <p className="text-xs text-red-600 mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Primary Contact Name *
                </label>
                <input
                  {...register("contactName")}
                  placeholder="e.g. Jordan Williams"
                  className="w-full px-3.5 py-3 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                />
                {errors.contactName && (
                  <p className="text-xs text-red-600 mt-1">{errors.contactName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Email Address *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="jordan@brand.com"
                  className="w-full px-3.5 py-3 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Phone Number *
                </label>
                <input
                  {...register("phone")}
                  placeholder="(555) 000-0000"
                  className="w-full px-3.5 py-3 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                  Operating City *
                </label>
                <input
                  {...register("city")}
                  placeholder="New York, NY"
                  className="w-full px-3.5 py-3 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                />
                {errors.city && (
                  <p className="text-xs text-red-600 mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-ink/70 mb-1">
                Business Description & Menu / Product Summary *
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Describe your menu items, apparel lines, or services offered, including electrical/setup requirements."
                className="w-full px-3.5 py-3 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold resize-none"
              />
              <div className="flex justify-between text-xs text-ink/50 mt-1">
                <span>Minimum 20 characters</span>
                <span>{formData.description?.length || 0} / 500</span>
              </div>
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="pt-2 border-t border-ink/10">
              <label className="block text-xs font-headline uppercase tracking-wider text-ink/70 mb-3">
                Online Presence (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <input
                    {...register("instagram")}
                    placeholder="Instagram (@handle)"
                    className="w-full px-3 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <input
                    {...register("tiktok")}
                    placeholder="TikTok (@handle)"
                    className="w-full px-3 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <input
                    {...register("website")}
                    placeholder="Website (https://...)"
                    className="w-full px-3 py-2.5 border-2 border-ink/15 bg-white text-sm font-body text-ink focus:outline-none focus:border-gold"
                  />
                  {errors.website && (
                    <p className="text-xs text-red-600 mt-1">{errors.website.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ────────────── STEP 2: Category & Events ────────────── */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
                Market Category & Tournament Selection
              </h2>
              <p className="text-sm text-ink/70 font-body mt-1">
                GAMEDAY protects vendor sales through strict category exclusivity. Choose your exact specialty to view eligible tournament dates.
              </p>
            </div>

            <CategorySelector
              categories={categories}
              subcategories={subcategories}
              selectedCategoryId={formData.categoryId}
              selectedSubcategoryId={formData.subcategoryId}
              onCategoryChange={(catId) => setValue("categoryId", catId, { shouldValidate: true })}
              onSubcategoryChange={(subId) => setValue("subcategoryId", subId, { shouldValidate: true })}
            />
            {errors.categoryId && (
              <p className="text-xs text-red-600">{errors.categoryId.message}</p>
            )}
            {errors.subcategoryId && (
              <p className="text-xs text-red-600">{errors.subcategoryId.message}</p>
            )}

            {formData.subcategoryId && (
              <div className="pt-4 border-t border-ink/10">
                <EventSelector
                  events={events}
                  selectedEventIds={formData.eventIds || []}
                  selectedSubcategoryId={formData.subcategoryId}
                  onToggleEvent={handleToggleEvent}
                />
                {errors.eventIds && (
                  <p className="text-xs text-red-600 mt-2">{errors.eventIds.message}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* ────────────── STEP 3: Waiver Agreement ────────────── */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
                Vendor Terms & Liability Release
              </h2>
              <p className="text-sm text-ink/70 font-body mt-1">
                Review our venue regulations, category exclusivity commitments, and electronic release.
              </p>
            </div>

            <WaiverInline
              signerName={formData.signerName}
              signerEmail={formData.signerEmail}
              agreed={formData.agreed}
              onSignerNameChange={(name) => setValue("signerName", name, { shouldValidate: true })}
              onSignerEmailChange={(email) => setValue("signerEmail", email, { shouldValidate: true })}
              onAgreedChange={(val) => setValue("agreed", val, { shouldValidate: true })}
              errors={{
                signerName: errors.signerName?.message,
                signerEmail: errors.signerEmail?.message,
                agreed: errors.agreed?.message,
              }}
            />
          </div>
        )}

        {/* ────────────── STEP 4: Review & Submit ────────────── */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-headline uppercase tracking-tight text-ink">
                Review Your Application
              </h2>
              <p className="text-sm text-ink/70 font-body mt-1">
                Please verify all details below before submitting to the curation committee.
              </p>
            </div>

            {/* Section 1 summary */}
            <div className="border-2 border-ink/15 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gold" />
                  <span className="font-headline text-sm uppercase tracking-wider text-ink">
                    Business Profile
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-headline uppercase text-gold hover:text-ink transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm font-body">
                <div>
                  <span className="text-xs text-ink/50 block">Business Name</span>
                  <span className="font-semibold text-ink">{formData.businessName}</span>
                </div>
                <div>
                  <span className="text-xs text-ink/50 block">Contact Person</span>
                  <span className="text-ink">{formData.contactName}</span>
                </div>
                <div>
                  <span className="text-xs text-ink/50 block">Email & Phone</span>
                  <span className="text-ink">{formData.email} • {formData.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-ink/50 block">Operating City</span>
                  <span className="text-ink">{formData.city}</span>
                </div>
                <div className="sm:col-span-2 pt-2">
                  <span className="text-xs text-ink/50 block">Description</span>
                  <p className="text-ink/80 text-xs mt-0.5 leading-relaxed">{formData.description}</p>
                </div>
              </div>
            </div>

            {/* Section 2 summary */}
            <div className="border-2 border-ink/15 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span className="font-headline text-sm uppercase tracking-wider text-ink">
                    Selected Specialty & Tournaments
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1 text-xs font-headline uppercase text-gold hover:text-ink transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>

              <div className="mb-4">
                <span className="text-xs text-ink/50 block">Market Category & Specialty</span>
                <span className="font-semibold text-ink text-base">
                  {selectedCategory?.name} — <span className="text-gold">{selectedSubcategory?.name}</span>
                </span>
              </div>

              <div>
                <span className="text-xs text-ink/50 block mb-2">Requested Event Dates ({selectedEvents.length})</span>
                <div className="space-y-2">
                  {selectedEvents.map((evt) => {
                    const slot = evt.slots.find((s) => s.subcategoryId === formData.subcategoryId);
                    return (
                      <div
                        key={evt.id}
                        className="flex items-center justify-between p-3 border border-ink/10 bg-ink/[0.02]"
                      >
                        <div>
                          <p className="font-headline text-xs uppercase tracking-wide text-ink">
                            {evt.title}
                          </p>
                          <p className="text-[11px] text-ink/60 font-body">
                            {format(new Date(evt.startsAt), "MMM d, yyyy")} • {evt.venueName}
                          </p>
                        </div>
                        {slot && (
                          <span className="font-headline text-xs uppercase text-gold">
                            {formatCurrency(slot.feeCents)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 3 summary */}
            <div className="border-2 border-ink/15 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-ink/10">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-gold" />
                  <span className="font-headline text-sm uppercase tracking-wider text-ink">
                    Signed Agreement
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-1 text-xs font-headline uppercase text-gold hover:text-ink transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-ink font-body">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>
                  Signed electronically by <strong>{formData.signerName}</strong> ({formData.signerEmail})
                </span>
              </div>
            </div>

            {/* Information notice */}
            <div className="p-4 bg-gold/10 border-l-4 border-gold text-xs text-ink/80 font-body leading-relaxed">
              <strong className="font-headline uppercase tracking-wider text-ink block mb-0.5">
                No Fee Charged Today
              </strong>
              Submitting an application is 100% free. Once your application is reviewed and approved by the GAMEDAY curation committee, you will receive a secure payment link valid for 48 hours to confirm your spot.
            </div>
          </div>
        )}

        {/* ────────────── Form Controls ────────────── */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-ink/10">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrev}
              disabled={isSubmitting}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              className="gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="gap-2 min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
