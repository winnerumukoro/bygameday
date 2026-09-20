"use client";

import { useState } from "react";
import { dispatchBroadcastAlert } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Megaphone, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BroadcastModal({ isOpen, onClose }: BroadcastModalProps) {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"info" | "warning" | "emergency">("warning");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await dispatchBroadcastAlert(message, severity);
      if (!res.success) {
        setError(res.error || "Failed to dispatch alert.");
        setIsSubmitting(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
        onClose();
      }, 1500);
    } catch {
      setError("Server communication error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border-2 border-ink max-w-lg w-full p-6 text-ink relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink/50 hover:text-ink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-gold">
          <Megaphone className="w-5 h-5" />
          <span className="text-xs font-headline uppercase tracking-widest text-ink">
            Courtside PA & Banner Alert
          </span>
        </div>

        <h3 className="text-2xl font-headline uppercase tracking-tight text-ink mb-2">
          Dispatch Tournament Announcement
        </h3>
        <p className="text-xs text-ink/60 font-body mb-6">
          This announcement immediately broadcasts to venue displays, live scoring monitors, and the spectator banner strip.
        </p>

        {success ? (
          <div className="p-6 bg-green-50 border-2 border-green-500 text-center text-green-900 font-body">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-headline uppercase text-base">Announcement Dispatched</p>
            <p className="text-xs text-green-700 mt-1">Live boards updated across venue.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-headline uppercase tracking-wider text-ink/70 mb-1">
                Alert Severity Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSeverity("info")}
                  className={`py-2 text-xs font-headline uppercase tracking-wider border-2 transition-colors ${
                    severity === "info"
                      ? "border-ink bg-ink text-ivory"
                      : "border-ink/15 bg-white text-ink/70 hover:border-ink/40"
                  }`}
                >
                  Informational
                </button>
                <button
                  type="button"
                  onClick={() => setSeverity("warning")}
                  className={`py-2 text-xs font-headline uppercase tracking-wider border-2 transition-colors ${
                    severity === "warning"
                      ? "border-amber-500 bg-amber-500 text-white font-bold"
                      : "border-ink/15 bg-white text-ink/70 hover:border-ink/40"
                  }`}
                >
                  Game Delay
                </button>
                <button
                  type="button"
                  onClick={() => setSeverity("emergency")}
                  className={`py-2 text-xs font-headline uppercase tracking-wider border-2 transition-colors ${
                    severity === "emergency"
                      ? "border-red-600 bg-red-600 text-white font-bold"
                      : "border-ink/15 bg-white text-ink/70 hover:border-ink/40"
                  }`}
                >
                  Urgent / Evac
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-headline uppercase tracking-wider text-ink/70 mb-1">
                Announcement Text *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="e.g. Court 3 match delayed 15 minutes due to floor cleaning. Next scheduled match moves to 2:15 PM."
                className="w-full p-3 border-2 border-ink/15 text-xs font-body focus:outline-none focus:border-gold resize-none"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-ink/10">
              <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting || !message.trim()} className="gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Broadcasting...
                  </>
                ) : (
                  <>
                    <Megaphone className="w-4 h-4" />
                    Broadcast Now
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
