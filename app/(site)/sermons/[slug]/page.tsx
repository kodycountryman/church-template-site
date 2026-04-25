import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, Download, Share2, ArrowLeft, BookOpen } from "lucide-react";
import { sermons } from "@/lib/mock";

export function generateStaticParams() {
  return sermons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = sermons.find((x) => x.slug === slug);
  return { title: s?.title ?? "Sermon" };
}

export default async function SermonDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sermon = sermons.find((s) => s.slug === slug);
  if (!sermon) notFound();

  const more = sermons.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* PLAYER HERO */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-20 md:pt-40 md:pb-28">
        <Image
          src={sermon.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />

        <div className="relative mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <Link href="/sermons" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All sermons
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            {/* Player tile */}
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink-700 shadow-[var(--shadow-elevated)]">
              <Image
                src={sermon.cover}
                alt={sermon.title}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <button
                aria-label="Play sermon"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105">
                  <Play className="h-7 w-7 fill-current" />
                </span>
              </button>
            </div>

            {/* Meta */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Series · {sermon.series}
              </div>
              <h1 className="mt-4 h-display text-4xl md:text-6xl text-white">{sermon.title}</h1>
              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">{sermon.excerpt}</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-md">
                <SermonMeta label="Speaker" value={sermon.speaker} />
                <SermonMeta label="Date" value={sermon.date} />
                <SermonMeta label="Duration" value={sermon.duration} />
                <SermonMeta label="Scripture" value={sermon.scripture} />
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <button className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur hover:bg-white/15">
                  <Download className="h-4 w-4" /> Notes (PDF)
                </button>
                <button className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur hover:bg-white/15">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSCRIPT EXCERPT */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[80rem] gap-16 px-6 md:px-10 lg:grid-cols-[2fr_1fr]">
          <article>
            <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <BookOpen className="h-3.5 w-3.5" /> Transcript excerpt
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-ink leading-relaxed font-medium">
                "We measure rest by what we got done before we stopped. Scripture measures rest by
                what God has already finished."
              </p>
              <p className="mt-8 text-lg text-ink-500 leading-relaxed">
                That's the move Hebrews 4 is making, and it's such a quiet move you can almost miss
                it. The author isn't pointing at our schedules. They're pointing at our scoreboards
                — the running tallies in our heads of worth and worthiness, of "did I do enough this
                week to be okay."
              </p>
              <p className="mt-6 text-lg text-ink-500 leading-relaxed">
                Sabbath, in this telling, isn't a pause from work. It's a confession that work was
                never what made us okay in the first place.
              </p>
              <p className="mt-6 text-lg text-ink-500 leading-relaxed">
                The full transcript is available with the message notes — link above.
              </p>
            </div>
          </article>

          {/* sidebar */}
          <aside className="space-y-8">
            <div className="rounded-2xl border border-ink-100 bg-bg-soft p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-3">
                Scripture
              </div>
              <div className="text-lg font-semibold text-ink">{sermon.scripture}</div>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed italic">
                "There remains, then, a Sabbath-rest for the people of God; for anyone who enters
                God's rest also rests from their works..."
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-bg-soft p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-3">
                Discussion questions
              </div>
              <ol className="space-y-3 text-sm text-ink-500 list-decimal pl-4">
                <li>Where do you measure your week — schedule, output, or something else?</li>
                <li>What would honest rest look like for you in the next seven days?</li>
                <li>What's a "scoreboard" you've stopped trusting?</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {/* MORE FROM SERIES */}
      <section className="border-t border-ink-100 bg-bg-soft py-24">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="h-display text-3xl md:text-5xl text-ink">Keep listening.</h2>
            <Link href="/sermons" className="text-sm font-medium text-ink-500 hover:text-ink">
              View archive →
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {more.map((s) => (
              <Link key={s.slug} href={`/sermons/${s.slug}`} className="group">
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-bg">
                  <Image
                    src={s.cover}
                    alt={s.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {s.series}
                </div>
                <div className="mt-2 text-lg font-bold text-ink tracking-tight">{s.title}</div>
                <div className="mt-1 text-sm text-ink-400">{s.speaker} · {s.duration}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SermonMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{label}</div>
      <div className="mt-1 font-medium text-white">{value}</div>
    </div>
  );
}
