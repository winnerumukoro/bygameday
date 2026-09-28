import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  href?: string;
  priority?: boolean;
}

export function Logo({
  variant = "dark",
  className,
  href = "/",
  priority = true,
}: LogoProps) {
  // Raster lockups: the brand-kit SVGs set the wordmark as live text in a
  // font visitors don't have, so they render in a fallback face.
  const src = variant === "light" ? "/brand/logo-web-light.png" : "/brand/logo-web-dark.png";

  const content = (
    <div className={cn("relative inline-flex items-center", className)}>
      <Image
        src={src}
        alt="GAMEDAY"
        width={2274}
        height={240}
        priority={priority}
        className="h-5 sm:h-6 w-auto object-contain transition-opacity duration-200"
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm" aria-label="GAMEDAY Home">
        {content}
      </Link>
    );
  }

  return content;
}
