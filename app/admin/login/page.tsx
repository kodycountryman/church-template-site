"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Lock, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";

export default function LoginPage() {
  const login = useAdminStore((s) => s.login);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      login(email);
      toast.success("Welcome back \u2014 you're in.");
      router.push("/admin");
    }, 700);
  }

  function quickDemo() {
    setLoading(true);
    setTimeout(() => {
      login("james@kindred.church", "James Eldridge");
      toast.success("Logged in as James Eldridge");
      router.push("/admin");
    }, 400);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      {/* Left: form */}
      <div className="flex items-center justify-center p-8 md:p-12 bg-bg">
        <div className="w-full max-w-sm">
          <Link href="/" className="text-2xl font-bold text-ink tracking-tight" style={{ letterSpacing: "-0.04em" }}>
            Kindred<span className="text-accent">.</span>
          </Link>

          <div className="mt-12">
            <h1 className="h-display text-4xl text-ink">Sign in</h1>
            <p className="mt-3 text-ink-500 leading-relaxed">
              Welcome back. Use any email and password — this is a portfolio demo.
            </p>
          </div>

          {/* Quick demo button */}
          <button
            onClick={quickDemo}
            disabled={loading}
            className="mt-8 w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white hover:bg-accent-600 transition-colors disabled:opacity-60"
          >
            <Zap className="h-4 w-4 fill-current" /> Enter demo as Pastor James
          </button>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink-300">
            <span className="h-px flex-1 bg-ink-100" />
            or
            <span className="h-px flex-1 bg-ink-100" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Email
              </label>
              <div className="relative mt-2">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@church.org"
                  className="w-full rounded-xl border border-ink-100 bg-bg-soft pl-10 pr-3 py-3 text-ink placeholder:text-ink-300 focus:border-accent focus:bg-bg focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="anything works"
                  className="w-full rounded-xl border border-ink-100 bg-bg-soft pl-10 pr-3 py-3 text-ink placeholder:text-ink-300 focus:border-accent focus:bg-bg focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-accent transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 text-xs text-ink-400 text-center">
            Not your church?{" "}
            <Link href="/template" className="font-semibold text-accent hover:underline">
              Get a site like this
            </Link>
          </div>
        </div>
      </div>

      {/* Right: visual */}
      <div className="relative hidden lg:block bg-ink overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/70 to-accent/30" />

        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md w-fit">
            <Sparkles className="h-3 w-3 text-accent" />
            Live demo · Kindred CMS
          </div>

          <div>
            <h2 className="h-display text-5xl text-white">
              An admin you'll
              <br />
              <span className="text-accent">actually want</span>
              <br />
              to use.
            </h2>
            <p className="mt-6 max-w-md text-white/70 leading-relaxed">
              Publish sermons, edit events, manage the team, watch the inbox. Every screen feels
              like the public site — because it's the same craft.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md text-sm">
              <Stat label="Resources" value="9" />
              <Stat label="Live data" value="Yes" />
              <Stat label="Refresh-safe" value="Session" />
            </div>
          </div>

          <div className="text-xs text-white/40">
            Designed and built by{" "}
            <a href="#" className="text-white/80 hover:text-white">
              Kody Countryman
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">{label}</div>
      <div className="mt-1 font-bold">{value}</div>
    </div>
  );
}
