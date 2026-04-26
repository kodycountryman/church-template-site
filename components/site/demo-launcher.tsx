"use client";

import Link from "next/link";
import { LayoutDashboard, Globe } from "lucide-react";

export function DemoLauncher({ mode }: { mode: "public" | "admin" }) {
  const isAdmin = mode === "admin";

  return (
    <Link
      href={isAdmin ? "/" : "/admin"}
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 rounded-full bg-ink pl-4 pr-5 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all hover:bg-accent hover:shadow-[0_4px_32px_rgba(37,99,235,0.4)] active:scale-95"
      aria-label={isAdmin ? "Go to live site" : "Open demo admin"}
    >
      {isAdmin
        ? <Globe className="h-4 w-4 shrink-0 text-white/70 group-hover:text-white transition-colors" />
        : <LayoutDashboard className="h-4 w-4 shrink-0 text-white/70 group-hover:text-white transition-colors" />
      }
      <span>{isAdmin ? "View live site" : "Explore the backend"}</span>
      <span className="ml-1 text-white/50 group-hover:text-white/80 transition-colors">→</span>
    </Link>
  );
}
