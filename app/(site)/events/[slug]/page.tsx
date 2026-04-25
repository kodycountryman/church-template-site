import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { events } from "@/lib/mock";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  return { title: e?.title ?? "Event" };
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const d = new Date(event.starts);
  const date = d.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const time = d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[60svh] overflow-hidden">
        <Image src={event.cover} alt={event.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/40 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[60svh] w-full max-w-[80rem] flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-24">
          <Link href="/events" className="mb-8 inline-flex w-fit items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{event.category}</div>
          <h1 className="mt-3 h-display text-white text-4xl md:text-7xl max-w-4xl">{event.title}</h1>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[80rem] gap-16 px-6 md:px-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              About this event
            </div>
            <p className="text-xl text-ink leading-relaxed font-medium max-w-2xl">
              {event.description}
            </p>
            <p className="mt-6 text-lg text-ink-500 leading-relaxed max-w-2xl">
              Doors open thirty minutes early. Childcare is provided for ages 0–6. Questions? Email
              us — a real person responds within a day.
            </p>
          </div>

          {/* sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-ink-100 bg-bg-soft p-6">
              <Detail icon={<Calendar />} label="Date" value={date} />
              <Detail icon={<Calendar />} label="Time" value={time} />
              <Detail icon={<MapPin />} label="Location" value={event.location} />
              {event.rsvp && <Detail icon={<Users />} label="RSVP" value="Required — limited capacity" />}
            </div>

            {event.rsvp ? (
              <button className="w-full inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-6 text-base font-semibold text-white hover:bg-accent transition-colors">
                Reserve your seat
              </button>
            ) : (
              <Link href="/visit" className="block w-full text-center rounded-full bg-ink px-6 py-4 text-base font-semibold text-white hover:bg-accent transition-colors">
                Get directions
              </Link>
            )}
            <button className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink-100 px-6 text-sm font-medium text-ink hover:border-ink-300">
              Add to calendar
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0 border-b border-ink-100 last:border-0">
      <div className="text-accent mt-0.5">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</div>
        <div className="mt-0.5 font-medium text-ink">{value}</div>
      </div>
    </div>
  );
}
