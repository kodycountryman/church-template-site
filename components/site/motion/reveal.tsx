"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  once = true,
  amount = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  // Inject delay into the visible transition
  const resolvedVariants: Variants = {
    ...variants,
    visible: {
      ...(typeof variants.visible === "object" ? variants.visible : {}),
      transition: {
        ...(typeof variants.visible === "object" &&
        "transition" in variants.visible &&
        typeof variants.visible.transition === "object"
          ? variants.visible.transition
          : {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
