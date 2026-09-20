import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  direction?: "left" | "right";
  /** Freeze the rail while the pointer is over it. */
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Infinite horizontal rail. The children are rendered twice and the track
 * translates -50%, so the loop is seamless with a pure CSS animation.
 */
export function Marquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", pauseOnHover && "marquee-pause", className)}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
