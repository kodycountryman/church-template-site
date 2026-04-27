import { ArrowRight, Sparkles } from "lucide-react";
import { template } from "@/lib/template";

export function TemplateBanner() {
  return (
    <div className="relative z-[60] bg-gradient-to-r from-accent via-[#1d4ed8] to-accent bg-[length:200%_100%] animate-[shimmer_4s_ease_infinite] text-white">
      <a
        href="https://kodycountryman.com/church-websites"
        target="_blank"
        rel="noopener noreferrer"
        className="group block w-full"
      >
        <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-4 px-6 py-3 md:px-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <p className="text-xs md:text-sm font-medium text-white/95">
              <span className="sm:hidden">Like this design? Get it for your church.</span>
              <span className="hidden sm:inline">{template.bannerText}</span>
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white transition-all group-hover:bg-white group-hover:text-accent">
            Get yours
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
