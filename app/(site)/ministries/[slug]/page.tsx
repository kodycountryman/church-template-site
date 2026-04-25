import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { ministries } from "@/lib/mock";

export function generateStaticParams() {
  return ministries.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = ministries.find((x) => x.slug === slug);
  return { title: m?.title ?? "Ministry" };
}

export default async function MinistryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = ministries.find((x) => x.slug === slug);
  if (!m) notFound();

  const others = ministries.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[70svh] overflow-hidden">
        <Image src={m.cover} alt={m.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/40 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[70svh] w-full max-w-[80rem] flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28">
          <Link href="/ministries" className="mb-8 inline-flex w-fit items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All ministries
          </Link>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{m.meets}</div>
          <h1 className="mt-3 h-display text-white text-5xl md:text-8xl max-w-4xl">{m.title}</h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed">{m.summary}</p>
        </div>
      </section>

      {/* DETAILS + SIGNUP */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[80rem] gap-16 px-6 md:px-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              About
            </div>
            <p className="text-xl text-ink leading-relaxed font-medium max-w-2xl">{m.description}</p>
            <p className="mt-6 text-lg text-ink-500 leading-relaxed max-w-2xl">
              No experience required, no audition needed. Reach out and we'll connect you with the
              point person — usually within 48 hours.
            </p>
          </div>

          <aside className="rounded-3xl border border-ink-100 bg-bg-soft p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-3">
              Get involved
            </div>
            <div className="text-2xl font-bold text-ink tracking-tight">I'm interested.</div>
            <p className="mt-2 text-ink-500 leading-relaxed text-sm">
              Drop your info and someone from this team will reach out personally.
            </p>
            <form className="mt-6 space-y-3">
              <input
                placeholder="Name"
                className="w-full rounded-xl border border-ink-100 bg-bg px-4 py-3 text-ink placeholder:text-ink-300 focus:border-accent focus:outline-none"
              />
              <input
                placeholder="Email"
                type="email"
                className="w-full rounded-xl border border-ink-100 bg-bg px-4 py-3 text-ink placeholder:text-ink-300 focus:border-accent focus:outline-none"
              />
              <textarea
                placeholder="Tell us a bit about you (optional)"
                rows={3}
                className="w-full rounded-xl border border-ink-100 bg-bg px-4 py-3 text-ink placeholder:text-ink-300 focus:border-accent focus:outline-none resize-none"
              />
              <button className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-accent transition-colors">
                Send <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-5 flex items-center gap-2 text-xs text-ink-400">
              <Mail className="h-3 w-3" /> Or email hello@kindred.church
            </div>
          </aside>
        </div>
      </section>

      {/* OTHERS */}
      <section className="border-t border-ink-100 bg-bg-soft py-24">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <h2 className="h-display text-3xl md:text-5xl text-ink mb-12">Other ways to plug in.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/ministries/${o.slug}`} className="group relative overflow-hidden rounded-2xl bg-ink">
                <div className="relative aspect-[4/5]">
                  <Image src={o.cover} alt={o.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{o.meets}</div>
                    <div className="mt-2 text-2xl font-bold text-white tracking-tight">{o.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
