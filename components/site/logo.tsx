import { cn } from "@/lib/utils";

/**
 * Kindred logomark — geometric K in a blue rounded square.
 * Works at any size; designed on a 32×32 grid.
 */
export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Background */}
      <rect width="32" height="32" rx="7" fill="#2563EB" />

      {/* K — vertical stem */}
      <rect x="6" y="6" width="4.5" height="20" rx="2.25" fill="white" />

      {/*
        Upper arm: a 4.5×18.4 rect anchored at the stem junction (10.5, 16),
        rotated -32.8° so its far end lands near (26, 6).
      */}
      <rect
        x="10.5"
        y="13.75"
        width="18.4"
        height="4.5"
        rx="2.25"
        fill="white"
        transform="rotate(-32.8 10.5 16)"
      />

      {/* Lower arm — mirror of upper */}
      <rect
        x="10.5"
        y="13.75"
        width="18.4"
        height="4.5"
        rx="2.25"
        fill="white"
        transform="rotate(32.8 10.5 16)"
      />
    </svg>
  );
}
