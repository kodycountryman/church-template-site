"use client";

import { Search, Bell, Plus, Menu } from "lucide-react";
import Link from "next/link";
import { useAdminLayout } from "@/app/admin/layout";

type Props = {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
};

export function Topbar({ title, subtitle, cta }: Props) {
  const ctx = useAdminLayout();
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-ink-100 bg-bg/85 px-4 backdrop-blur-xl md:px-6 lg:px-10">
      {/* Mobile menu */}
      {ctx && (
        <button
          onClick={ctx.openMobileNav}
          className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-md text-ink-500 hover:bg-bg-soft hover:text-ink"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      <div className="min-w-0 flex-1 lg:flex-initial">
        <div className="truncate text-base font-semibold text-ink">{title}</div>
        {subtitle && <div className="truncate text-xs text-ink-400">{subtitle}</div>}
      </div>

      <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            placeholder="Search... (⌘K)"
            className="w-full rounded-lg border border-ink-100 bg-bg-soft pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-400 focus:border-accent focus:bg-bg focus:outline-none"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-bg px-1.5 py-0.5 text-[10px] font-mono text-ink-400 border border-ink-100">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative h-9 w-9 inline-flex items-center justify-center rounded-lg text-ink-500 hover:bg-bg-soft hover:text-ink">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
        {cta && (
          <Link
            href={cta.href}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-3 text-xs font-semibold text-white hover:bg-accent"
          >
            <Plus className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{cta.label}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
