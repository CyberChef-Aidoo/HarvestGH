import Link from "next/link";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg" | "hero";
  light?: boolean;
  withText?: boolean;
  className?: string;
}

const SIZE = {
  sm: "h-7",
  md: "h-9",
  lg: "h-11",
  hero: "h-[clamp(3.5rem,12vw,5.5rem)]",
} as const;

/** Logo mark; optionally paired with bold green wordmark. */
export default function BrandMark({
  size = "md",
  light = false,
  withText = false,
  className = "",
}: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt=""
        className={`${SIZE[size]} w-auto object-contain ${light ? "brightness-0 invert" : ""}`}
      />
      {withText ? (
        <span
          className={[
            "font-display font-extrabold tracking-tight leading-none text-green",
            size === "sm" ? "text-[1.05rem]" : "text-[1.25rem]",
            light ? "!text-white" : "",
          ].join(" ")}
        >
          Agro Bridge
        </span>
      ) : null}
    </span>
  );
}

export function BrandWordmark({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span
      className={[
        "font-display font-extrabold tracking-tight text-green",
        light ? "!text-white" : "",
        className,
      ].join(" ")}
    >
      Agro Bridge
    </span>
  );
}

export function BrandLink({
  size = "md",
  light = false,
  withText = false,
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  light?: boolean;
  withText?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="Agro Bridge home">
      <BrandMark size={size} light={light} withText={withText} />
    </Link>
  );
}
