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
    <div className="relative z-[60] bg-gradient-to-r from-accent via-[#1d4ed8] to-accent bg-[length:200%_100%] animate-[shimmer_4s_ease_infinite] text-white">
      <Link
        href="/template"
        className="group block w-full"
      >
        <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-4 px-6 py-3 md:px-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <p className="text-xs md:text-sm font-medium text-white/95 truncate">
              {template.bannerText}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white transition-all group-hover:bg-white group-hover:text-accent">
              Get yours
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
            <button
              aria-label="Dismiss"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                sessionStorage.setItem(KEY, "1");
                setDismissed(true);
              }}
              className="text-white/60 hover:text-white transition-colors p-0.5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
