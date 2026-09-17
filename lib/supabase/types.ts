export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "user" | "admin";
export type EventSource = "gameday" | "community";
export type EventStatus = "draft" | "published" | "cancelled";
export type SubmissionStatus = "pending" | "approved" | "rejected";
export type VendorApplicationStatus = "draft" | "submitted" | "under_review" | "rejected" | "withdrawn";
export type VendorSlotStatus = "requested" | "waitlisted" | "approved_pending_payment" | "confirmed" | "expired" | "cancelled" | "rejected";
export type DivisionFormat = "1v1" | "intramural";
export type FeeModel = "per_team" | "per_player";
export type TeamStatus = "pending" | "waitlisted" | "confirmed" | "cancelled";
export type TeamMemberRole = "captain" | "player";
export type TeamMemberStatus = "invited" | "accepted" | "removed";
export type FreeAgentStatus = "available" | "placed" | "withdrawn";
export type RegistrationStatus = "pending_payment" | "waitlisted" | "confirmed" | "cancelled";
export type BracketType = "single_elimination";
export type BracketStatus = "draft" | "published" | "completed";
export type MatchStatus = "scheduled" | "in_progress" | "completed" | "cancelled";
export type ParticipantType = "individual" | "team";
export type SponsorInquiryStatus = "pending" | "approved" | "rejected" | "paid";
export type WaiverAppliesTo = "vendor" | "sports";
export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";
export type PaymentPurpose = "vendor_fee" | "sports_fee" | "sponsorship";
export type MediaType = "image" | "video";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string | null;
          role?: UserRole;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          event_type_id: string;
          source: EventSource;
          status: EventStatus;
          starts_at: string;
          ends_at: string;
          timezone: string;
          venue_name: string;
          address: string;
          map_url: string | null;
          cover_image_path: string | null;
          accepts_vendors: boolean;
          vendor_applications_open_at: string | null;
          vendor_applications_close_at: string | null;
          submitted_by_submission_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      event_vendor_capacity: {
        Row: {
          id: string;
          event_id: string;
          subcategory_id: string;
          max_slots: number;
          fee_cents: number;
          created_at: string;
          updated_at: string;
        };
      };
      divisions: {
        Row: {
          id: string;
          sport_id: string;
          event_id: string | null;
          name: string;
          format: DivisionFormat;
          capacity: number;
          roster_min: number;
          roster_max: number;
          fee_cents: number;
          fee_model: FeeModel;
          registration_opens_at: string;
          registration_closes_at: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
      };
      teams: {
        Row: {
          id: string;
          division_id: string;
          name: string;
          captain_profile_id: string | null;
          captain_email: string;
          status: TeamStatus;
          waitlist_position: number | null;
          invite_code: string;
          payment_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      payments: {
        Row: {
          id: string;
          stripe_checkout_session_id: string | null;
          stripe_payment_intent_id: string | null;
          amount_cents: number;
          currency: string;
          status: PaymentStatus;
          purpose: PaymentPurpose;
          reference_table: string;
          reference_id: string;
          raw_event: Json | null;
          created_at: string;
          updated_at: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
      };
      audit_log: {
        Row: {
          id: string;
          actor_id: string | null;
          action: string;
          table_name: string;
          record_id: string;
          diff: Json | null;
          created_at: string;
        };
      };
    };
  };
}
