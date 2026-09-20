"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "fade"
  | "scale"
  | "blur"
  | "curtain";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Motion direction. Styles live in globals.css under [data-reveal]. */
  variant?: RevealVariant;
  /** Milliseconds to hold before running in — use for stagger. */
  delay?: number;
  /** Override the default 900ms run. */
  duration?: number;
  /** Fraction of the element that must be on screen to trigger. */
  threshold?: number;
  /** Replay every time the element re-enters the viewport. */
  repeat?: boolean;
  as?: React.ElementType;
  children: React.ReactNode;
}

/**
 * Scroll-triggered entrance. Renders the element in its "out" state and
 * flips data-visible once the IntersectionObserver fires, letting CSS do
 * the interpolation so nothing runs on the main thread per frame.
 */
export function Reveal({
  variant = "up",
  delay = 0,
  duration,
  threshold = 0.15,
  repeat = false,
  as: Tag = "div",
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Honour reduced motion by showing content immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!repeat) observer.unobserve(entry.target);
        } else if (repeat) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, repeat]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible={visible ? "true" : "false"}
      className={cn(className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          ...(duration ? { "--reveal-duration": `${duration}ms` } : {}),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
