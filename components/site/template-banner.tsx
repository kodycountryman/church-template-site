"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, X, Sparkles } from "lucide-react";
import { template } from "@/lib/template";

const KEY = "kindred-template-banner-dismissed";

export function TemplateBanner() {
  const [dismissed, setDismissed] = useState(true); // hydration-safe

  useEffect(() => {
    setDismissed(typeof window !== "undefined" && sessionStorage.getItem(KEY) === "1");
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative z-[60] bg-ink text-white">
      <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-4 px-6 py-2.5 md:px-10">
        <Link
          href="/template"
          className="group flex items-center gap-2.5 text-xs md:text-sm font-medium"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-white/90">{template.bannerText}</span>
          <span className="hidden md:inline-flex items-center gap-1 text-accent font-semibold transition-transform group-hover:translate-x-0.5">
            See how <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
        <button
          aria-label="Dismiss"
          onClick={() => {
            sessionStorage.setItem(KEY, "1");
            setDismissed(true);
          }}
          className="text-white/50 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
