import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type SectionProps = ComponentProps<"section"> & {
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export function Section({
  className,
  eyebrow,
  title,
  intro,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative py-24 md:py-32", className)}
      {...props}
    >
      {(eyebrow || title || intro) && (
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10 mb-16 md:mb-20">
          {eyebrow && (
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2
              className="h-display text-4xl md:text-6xl lg:text-7xl text-ink max-w-3xl"
            >
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-6 max-w-xl text-lg text-ink-500 leading-relaxed">
              {intro}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
