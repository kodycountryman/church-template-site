import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Code, Palette, Database, Zap, Layout, Search } from "lucide-react";
import { template } from "@/lib/template";
import { LeadForm } from "@/components/site/lead-form";

export const metadata = {
  title: "Want a site like this?",
};

const features = [
  { icon: <Palette />, title: "Custom design", body: "Built from scratch around your church's voice, not a template skin." },
  { icon: <Code />, title: "Modern stack", body: "Next.js, TypeScript, Tailwind. Fast, accessible, and a joy to maintain." },
  { icon: <Database />, title: "Real CMS", body: "Custom admin dashboard so your team can publish sermons and events without calling me." },
  { icon: <Zap />, title: "Lighthouse 95+", body: "Performance, accessibility, SEO, best practices \u2014 all green out of the box." },
  { icon: <Layout />, title: "Mobile-first", body: "Looks great on the phone in the parking lot, looks great on the projector in the lobby." },
  { icon: <Search />, title: "Found on Google", body: "Local SEO done right \u2014 schema, sitemaps, OG cards, the works." },
];

const tiers = [
  {
    name: "Essentials",
    price: "$3,500",
    summary: "A polished marketing site \u2014 sermons, events, contact \u2014 with editing built-in.",
    items: ["Up to 8 pages", "Custom design system", "Admin dashboard (sermons, events, blog)", "Basic SEO + analytics", "1 round of revisions"],
  },
  {
    name: "Full church",
    price: "$6,500",
    highlight: true,
    summary: "Everything in Essentials plus the full content surface area Kindred has on display.",
    items: ["Up to 20 pages", "Sermon archive + media player", "Online giving (Stripe)", "Event RSVPs + ministry signups", "Advanced SEO + JSON-LD", "Full admin (CRUD on every resource)", "2 rounds of revisions", "30 days post-launch support"],
  },
  {
    name: "Custom",
    price: "Let's talk",
    summary: "Memberships, podcasts, multilingual, app integrations, in-person check-in \u2014 if you can describe it, we can build it.",
    items: ["Discovery call + scoped proposal", "Bespoke integrations", "Ongoing partnership available"],
  },
];

const process = [
  { n: "01", title: "Free 30-min call", body: "We talk about your church, your community, what's working, and what's broken on your current site." },
  { n: "02", title: "Scoped proposal", body: "I send a fixed-price proposal with everything spelled out. No surprises." },
  { n: "03", title: "Design + build", body: "Two-to-six weeks, depending on scope. You see progress weekly." },
  { n: "04", title: "Launch + handoff", body: "I migrate content, train your team on the admin, and stick around for 30 days of free support." },
];

export default function TemplatePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 60% at 50% -10%, rgba(37,99,235,0.10), transparent 60%)",
          }}
        />
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            For pastors + church admins
          </div>
          <h1 className="h-display text-5xl md:text-7xl lg:text-8xl text-ink max-w-5xl">
            {template.pitchHeadline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-500 leading-relaxed">
            {template.pitchSub}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink px-8 text-base font-semibold text-white transition-all hover:bg-accent"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-ink-200 px-8 text-base font-medium text-ink hover:border-ink-400"
            >
              Try the admin demo
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-ink-100 pt-8 md:grid-cols-4">
            <Stat label="Starting at" value={template.startingAt} />
            <Stat label="Typical timeline" value="2–6 weeks" />
            <Stat label="Lighthouse" value="95+ all metrics" />
            <Stat label="Revisions" value="Included" />
          </div>
        </div>
      </section>

      {/* SCREENSHOT STRIP */}
      <section className="pb-24">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-ink-100 bg-ink shadow-[var(--shadow-elevated)]">
            <Image
              src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=2400&q=80"
              alt="Site preview"
              fill
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-ink/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                  Live demo
                </div>
                <div className="h-display text-3xl md:text-5xl text-white max-w-xl">
                  Everything you're looking at — yours.
                </div>
              </div>
              <Link
                href="/"
                className="hidden md:inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink hover:bg-accent hover:text-white transition-colors"
              >
                Tour the site <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-ink-100 bg-bg-soft py-24 md:py-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-16 max-w-3xl">
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              What's included
            </div>
            <h2 className="h-display text-4xl md:text-6xl text-ink">
              Designed and built like a product, not a side project.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-ink-100 bg-bg p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 text-accent">
                  {f.icon}
                </div>
                <div className="mt-5 text-xl font-bold text-ink tracking-tight">{f.title}</div>
                <p className="mt-2 text-ink-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-16 max-w-3xl">
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Pricing
            </div>
            <h2 className="h-display text-4xl md:text-6xl text-ink">Three honest tiers.</h2>
            <p className="mt-6 max-w-xl text-lg text-ink-500 leading-relaxed">
              Fixed-price packages. No hourly billing, no scope creep, no surprise invoices.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={
                  t.highlight
                    ? "relative rounded-3xl bg-ink p-10 text-white shadow-[var(--shadow-elevated)]"
                    : "rounded-3xl border border-ink-100 bg-bg p-10"
                }
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-10 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    Most popular
                  </div>
                )}
                <div className={t.highlight ? "text-white/70 text-sm font-semibold uppercase tracking-[0.18em]" : "text-ink-400 text-sm font-semibold uppercase tracking-[0.18em]"}>
                  {t.name}
                </div>
                <div className={t.highlight ? "mt-3 h-display text-5xl text-white" : "mt-3 h-display text-5xl text-ink"}>
                  {t.price}
                </div>
                <p className={t.highlight ? "mt-4 text-white/70 leading-relaxed" : "mt-4 text-ink-500 leading-relaxed"}>
                  {t.summary}
                </p>
                <ul className="mt-8 space-y-3">
                  {t.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <Check className={t.highlight ? "h-4 w-4 mt-0.5 text-accent flex-shrink-0" : "h-4 w-4 mt-0.5 text-accent flex-shrink-0"} />
                      <span className={t.highlight ? "text-white/85" : "text-ink-700"}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className={
                    t.highlight
                      ? "mt-10 w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink hover:bg-accent hover:text-white transition-colors"
                      : "mt-10 w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-accent transition-colors"
                  }
                >
                  Start a conversation <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-ink-100 bg-bg-soft py-24 md:py-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-16 max-w-3xl">
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              How it works
            </div>
            <h2 className="h-display text-4xl md:text-6xl text-ink">Four steps. No mystery.</h2>
          </div>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <li key={p.n} className="rounded-2xl border border-ink-100 bg-bg p-7">
                <div className="font-mono text-sm font-semibold text-accent">{p.n}</div>
                <div className="mt-4 text-xl font-bold text-ink tracking-tight">{p.title}</div>
                <p className="mt-2 text-ink-500 leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="contact" className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Let's talk
              </div>
              <h2 className="h-display text-4xl md:text-6xl text-ink">
                Tell me about your church.
              </h2>
              <p className="mt-6 max-w-md text-lg text-ink-500 leading-relaxed">
                Drop a few details and I'll reply within a day with next steps. No pressure, no
                sales pitch — just a real conversation.
              </p>
              <div className="mt-10 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                  Or email directly
                </div>
                <a
                  href={`mailto:${template.designerEmail}`}
                  className="text-2xl font-bold text-ink tracking-tight hover:text-accent"
                >
                  {template.designerEmail}
                </a>
                <div className="pt-2 text-sm text-ink-500">
                  Designed and built by{" "}
                  <a href={template.portfolioUrl} className="font-semibold text-ink hover:text-accent">
                    {template.designerName}
                  </a>
                </div>
              </div>
            </div>

            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</div>
      <div className="mt-2 text-xl font-bold text-ink tracking-tight">{value}</div>
    </div>
  );
}
