"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/admin/sidebar";
import { useAdminStore } from "@/lib/admin/store";
import { TemplateBanner } from "@/components/site/template-banner";
import { DemoLauncher } from "@/components/site/demo-launcher";

type AdminLayoutCtx = { openMobileNav: () => void };
const Ctx = createContext<AdminLayoutCtx | null>(null);
export function useAdminLayout() {
  return useContext(Ctx);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const authed = useAdminStore((s) => s.authed);
  const isLogin = pathname === "/admin/login";
  const [hydrated, setHydrated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsub = useAdminStore.persist.onFinishHydration(() => setHydrated(true));
    if (useAdminStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    if (hydrated && !isLogin && !authed) router.replace("/admin/login");
  }, [hydrated, authed, isLogin, router]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isLogin) {
    return (
      <>
        <Toaster position="top-right" richColors closeButton />
        {children}
      </>
    );
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-soft">
        <div className="h-8 w-8 rounded-full border-2 border-ink-100 border-t-accent animate-spin" />
      </div>
    );
  }

  if (!authed) return null;

  return (
    <Ctx.Provider value={{ openMobileNav: () => setMobileOpen(true) }}>
      <div className="flex flex-col min-h-screen">
        <TemplateBanner />
        <div className="flex flex-1 bg-bg-soft">
          <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
          <div className="flex-1 min-w-0 flex flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </div>
        <Toaster position="top-right" richColors closeButton />
        <DemoLauncher mode="admin" />
      </div>
    </Ctx.Provider>
  );
}
