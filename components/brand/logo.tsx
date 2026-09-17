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
  const src = variant === "light" ? "/brand/logo-light.svg" : "/brand/logo-dark.svg";

  const content = (
    <div className={cn("relative inline-flex items-center", className)}>
      <Image
        src={src}
        alt="GAMEDAY"
        width={180}
        height={30}
        priority={priority}
        className="h-7 w-auto object-contain transition-opacity duration-200"
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
