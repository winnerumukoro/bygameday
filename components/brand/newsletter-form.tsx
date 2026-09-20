"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface NewsletterFormProps {
  buttonText?: string;
  placeholder?: string;
  size?: "default" | "lg";
}

export function NewsletterForm({
  buttonText = "GET NOTIFIED",
  placeholder = "ENTER YOUR EMAIL",
  size = "lg",
}: NewsletterFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 bg-gold/10 border border-gold px-4 py-3 text-gold text-xs font-headline uppercase tracking-wider">
        <Check className="w-4 h-4 text-gold shrink-0" />
        <span>You&apos;re on the priority notification list!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 flex-grow bg-ivory/10 border border-ivory/20 px-5 py-4 text-base text-ivory placeholder:text-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold min-h-[48px] rounded-none"
        aria-label="Email for updates"
      />
      <Button type="submit" variant="primary" size={size} className="shrink-0 whitespace-nowrap">
        {buttonText}
      </Button>
    </form>
  );
}
