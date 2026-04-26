"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { wordContainer, wordChild } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: Tag;
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "div",
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  const words = text.split(" ");

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      // @ts-expect-error – ref works at runtime even if TS complains about overloads
      ref={ref}
      className={className}
      aria-label={text}
      variants={wordContainer(delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            paddingBottom: "0.15em",
            marginBottom: "-0.15em",
            verticalAlign: "bottom",
          }}
        >
          <motion.span className="inline-block" variants={wordChild}>
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
