import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts } from "@/lib/mock";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return { title: p?.title ?? "Post" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article>
      {/* TITLE */}
      <section className="pt-40 pb-12 md:pt-48">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-ink mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{p.tag}</div>
          <h1 className="mt-4 h-display text-4xl md:text-6xl lg:text-7xl text-ink">{p.title}</h1>
          <div className="mt-8 flex items-center gap-4">
            <Image src={p.authorAvatar} alt={p.author} width={48} height={48} className="rounded-full" />
            <div>
              <div className="font-semibold text-ink">{p.author}</div>
              <div className="text-sm text-ink-400">{p.date} · {p.readTime} read</div>
            </div>
          </div>
        </div>
      </section>

      {/* COVER */}
      <section className="pb-16">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-bg-soft">
            <Image src={p.cover} alt={p.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="pb-32">
        <div className="mx-auto w-full max-w-2xl px-6 md:px-10 space-y-6 text-lg text-ink-700 leading-relaxed">
          <p className="text-2xl text-ink leading-relaxed font-medium">{p.excerpt}</p>
          <p>
            We say it on the website. We say it from the stage. We say it in welcome emails: belong
            before you believe. The phrase is short enough to fit on a sticker, which is part of why
            it's been so portable — and part of why it's been so easy to misread.
          </p>
          <p>
            It does <em>not</em> mean we're indifferent about belief. It does <em>not</em> mean
            theology is a downgrade. It does <em>not</em> mean we'll quietly shelve the parts of
            Scripture that make us uncomfortable in the hope that someone will stick around long
            enough to bump into them.
          </p>
          <h2 className="font-bold text-ink text-3xl tracking-tight pt-6">What it does mean</h2>
          <p>
            It means the welcome table is open before the membership form is signed. It means we'll
            love you, learn your name, and sit next to you in the hard seasons whether or not you
            ever join us in saying the creed.
          </p>
          <p>
            Belonging is not a reward for orthodoxy. It's the soil orthodoxy grows in.
          </p>
          <h2 className="font-bold text-ink text-3xl tracking-tight pt-6">What it doesn't mean</h2>
          <p>
            It doesn't mean every voice carries equal weight in how the church is shepherded. It
            doesn't mean leadership is a popularity contest. It doesn't mean we're nervous about
            calling sin sin, or grace grace.
          </p>
          <p>
            We're not embarrassed about the gospel. We're just convinced it's most clearly seen by
            people who've already been loved.
          </p>
        </div>
      </section>
    </article>
  );
}
