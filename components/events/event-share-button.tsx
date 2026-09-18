"use client";

import * as React from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventShareButtonProps {
  title: string;
}

export function EventShareButton({ title }: EventShareButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${title} on GAMEDAY`,
          url,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Button
      type="button"
      variant="secondaryLight"
      size="sm"
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-xs min-h-[38px]"
      aria-label="Share this event"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-gold" />
          <span>Link Copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-gold" />
          <span>Share</span>
        </>
      )}
    </Button>
  );
}
