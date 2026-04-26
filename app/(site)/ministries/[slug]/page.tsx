import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { ministries } from "@/lib/mock";
import { FaqAccordion } from "@/components/site/faq-accordion";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export function generateStaticParams() {
  return ministries.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = ministries.find((x) => x.slug === slug);
  return {
    title: m ? `${m.title} — Kindred Church` : "Ministry",
    description: m?.summary,
  };
}

export default async function MinistryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = ministries.find((x) => x.slug === slug);
  if (!m) notFound();

  const others = ministries.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85svh] overflow-hidden">
        <Image
          src={m.cover}
          alt={m.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/50 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />

        <div className="relative mx-auto flex min-h-[85svh] w-full max-w-[80rem] flex-col justify-end px-6 pb-24 pt-32 md:px-10 md:pb-32">
          <Link
            href="/ministries"
            className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm hover:bg-white/20 hover:text-white transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All ministries
          </Link>

          {m.tagline && (
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {m.tagline}
            </div>
          )}

          <h1 className="h-display max-w-4xl text-5xl text-white md:text-8xl">{m.title}</h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {m.summary}
          </p>

          <div className="mt-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {m.meets}
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────────────────────────── */}
      {m.stats && (
        <div className="bg-ink">
          <div className="mx-auto grid w-full max-w-[80rem] grid-cols-2 px-6 md:grid-cols-4 md:px-10">
            {m.stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center border-b border-white/10 px-6 py-10 text-center md:border-b-0 md:border-r last:border-r-0"
              >
                <div className="h-display text-4xl text-white md:text-5xl">{s.value}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. ABOUT + SIGNUP ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[80rem] gap-16 px-6 md:px-10 lg:grid-cols-[2fr_1fr]">
          {/* Left: description + steps */}
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              About
            </div>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-ink md:text-2xl">
              {m.description}
            </p>

            {m.steps && (
              <div className="mt-16">
                <h3 className="mb-10 text-sm font-semibold uppercase tracking-[0.2em] text-ink-400">
                  What to expect
                </h3>
                <ol className="space-y-10">
                  {m.steps.map((step, i) => (
                    <li key={i} className="flex gap-6">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <div className="font-bold text-ink">{step.title}</div>
                        <p className="mt-1.5 leading-relaxed text-ink-500">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Right: sticky signup card */}
          <div className="lg:pt-0">
            <aside className="sticky top-24 rounded-3xl border border-ink-100 bg-bg-soft p-8 shadow-[var(--shadow-elevated)]">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Get involved
              </div>
              <div className="text-2xl font-bold tracking-tight text-ink">I'm interested.</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
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
                  className="w-full resize-none rounded-xl border border-ink-100 bg-bg px-4 py-3 text-ink placeholder:text-ink-300 focus:border-accent focus:outline-none"
                />
                <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-accent">
                  Send <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
              <div className="mt-5 flex items-center gap-2 text-xs text-ink-400">
                <Mail className="h-3 w-3" />
                Or email hello@kindred.church
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 4. PROGRAMS ──────────────────────────────────────────────────── */}
      {m.programs && (
        <section className="border-t border-ink-100 bg-bg-soft py-24 md:py-32">
          <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Programs
            </div>
            <h2 className="h-display mb-14 text-4xl text-ink md:text-6xl">
              Programs &amp; opportunities.
            </h2>
            <div
              className={`grid gap-6 ${
                m.programs.length === 4
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {m.programs.map((prog, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-ink-100 bg-bg p-7 shadow-[var(--shadow-card)]"
                >
                  <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {prog.when}
                  </div>
                  <div className="mb-3 font-bold leading-snug text-ink text-lg">{prog.title}</div>
                  <p className="leading-relaxed text-ink-500 text-sm">{prog.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. LEADER QUOTE ──────────────────────────────────────────────── */}
      {m.leader && (
        <section className="bg-ink py-24 md:py-32">
          <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
            <blockquote className="max-w-4xl">
              <p className="h-display-tight text-3xl italic leading-tight text-white md:text-5xl lg:text-6xl">
                &ldquo;{m.leader.quote}&rdquo;
              </p>
              <footer className="mt-12 flex items-center gap-5">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white/20">
                  <Image
                    src={u(m.leader.avatar, 200)}
                    alt={m.leader.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-white">{m.leader.name}</div>
                  <div className="text-sm text-white/50">{m.leader.role}</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* ── 6. GALLERY ───────────────────────────────────────────────────── */}
      {m.gallery && (
        <section className="overflow-hidden py-24 md:py-32">
          <div className="mb-10 flex items-center gap-2 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent md:px-10">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Gallery
          </div>
          {/* Scrollable strip — no scrollbar */}
          <div
            className="flex gap-4 overflow-x-auto px-6 pb-4 md:px-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {m.gallery.map((id, i) => (
              <div
                key={i}
                className="relative aspect-square w-64 shrink-0 overflow-hidden rounded-2xl bg-bg-mute"
              >
                <Image
                  src={u(id, 512)}
                  alt={`${m.title} gallery image ${i + 1}`}
                  fill
                  sizes="256px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 7. FAQ ───────────────────────────────────────────────────────── */}
      {m.faqs && (
        <section className="border-t border-ink-100 bg-bg-soft py-24 md:py-32">
          <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              FAQ
            </div>
            <h2 className="h-display mb-14 text-4xl text-ink md:text-6xl">Common questions.</h2>
            <div className="max-w-3xl">
              <FaqAccordion faqs={m.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* ── 8. OTHER MINISTRIES ──────────────────────────────────────────── */}
      <section className="border-t border-ink-100 bg-bg py-24 md:py-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <h2 className="h-display mb-12 text-3xl text-ink md:text-5xl">
            Other ways to plug in.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/ministries/${o.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-ink"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={o.cover}
                    alt={o.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      {o.meets}
                    </div>
                    <div className="mt-2 text-2xl font-bold tracking-tight text-white">
                      {o.title}
                    </div>
                    {o.tagline && (
                      <div className="mt-1 text-sm text-white/60">{o.tagline}</div>
                    )}
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
