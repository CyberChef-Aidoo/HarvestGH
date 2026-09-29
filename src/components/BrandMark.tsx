import Link from "next/link";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg" | "hero";
  light?: boolean;
  className?: string;
}

const SIZE = {
  sm: "h-8",
  md: "h-11",
  lg: "h-14",
  hero: "h-[clamp(3.5rem,12vw,5.5rem)]",
} as const;

const LOGO_SRC = "/images/Agrobridge_logo.png";

/** Full Agrobridge wordmark (leaf + agro Bridge). */
export default function BrandMark({
  size = "md",
  light = false,
  className = "",
}: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="Agrobridge"
        className={`${SIZE[size]} w-auto max-w-[min(220px,55vw)] object-contain object-left ${light ? "brightness-110" : ""}`}
        decoding="async"
      />
    </span>
  );
}

export function BrandLink({
  size = "md",
  light = false,
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  light?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="Agrobridge home">
      <BrandMark size={size} light={light} />
    </Link>
  );
}
