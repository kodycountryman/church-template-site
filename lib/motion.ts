import type { Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Easing curves
// ---------------------------------------------------------------------------
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_CINEMATIC: [number, number, number, number] = [0.83, 0, 0.17, 1];

// ---------------------------------------------------------------------------
// Shared variants
// ---------------------------------------------------------------------------

/** Opacity 0→1, y 32→0 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
};

/** Opacity 0→1, y 16→0, blur 12px→0 */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_EXPO },
  },
};

/** Opacity 0→1 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

/** Opacity 0→1, scale 0.94→1 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

// ---------------------------------------------------------------------------
// Factory functions
// ---------------------------------------------------------------------------

/** Returns a stagger container variant with configurable stagger + delay */
export function staggerContainer(
  staggerChildren = 0.1,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

/** Word-level stagger container */
export function wordContainer(delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.065, delayChildren: delay },
    },
  };
}

/** Word child — slides up from overflow-hidden clip */
export const wordChild: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
};

// ---------------------------------------------------------------------------
// Hover
// ---------------------------------------------------------------------------

/** Pass to `whileHover` on any motion element */
export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 },
};
