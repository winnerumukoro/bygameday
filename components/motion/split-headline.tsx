"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SplitHeadlineProps {
  /** Each entry becomes one masked line that slides up from below. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  /** Milliseconds between consecutive lines. */
  stagger?: number;
  /** Milliseconds before the first line runs. */
  delay?: number;
  /** Run on mount instead of waiting for the viewport (hero headlines). */
  immediate?: boolean;
  as?: React.ElementType;
}

/**
 * Masked, line-by-line headline entrance — each line sits in an
 * overflow-hidden track and slides up into place with a small rotation.
 */
export function SplitHeadline({
  lines,
  className,
  lineClassName,
  stagger = 90,
  delay = 0,
  immediate = false,
  as: Tag = "h2",
}: SplitHeadlineProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    if (immediate) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag ref={ref} data-visible={visible ? "true" : "false"} className={cn(className)}>
      {lines.map((line, index) => (
        <span key={line + index} className={cn("headline-line", lineClassName)}>
          <span style={{ "--line-delay": `${delay + index * stagger}ms` } as React.CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
