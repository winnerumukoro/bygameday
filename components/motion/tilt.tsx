"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Maximum rotation in degrees at the corners. */
  max?: number;
  className?: string;
}

/**
 * Pointer-reactive 3D tilt with a soft light sweep tracking the cursor.
 * No-ops on touch devices and under reduced motion.
 */
export function Tilt({ children, max = 5, className, ...rest }: TiltProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    setEnabled(!reduced && !coarse);
  }, []);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || !enabled) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    node.style.transform = `rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg)`;
    node.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
    node.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("transition-transform duration-450 ease-out-expo", className)}
      style={{ transformStyle: "preserve-3d" }}
      {...rest}
    >
      {children}
    </div>
  );
}
