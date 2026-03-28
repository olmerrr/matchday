import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=2400&q=80";

export function HomeHero() {
  return (
    <section
      className="relative mb-10 min-h-[220px] overflow-hidden rounded-2xl border border-zinc-200/90 shadow-lg dark:border-zinc-800 sm:min-h-[300px]"
      aria-label="Hero"
      suppressHydrationWarning
    >
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="(max-width: 1280px) 100vw, 1152px"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/45 to-zinc-900/25"
        aria-hidden
        suppressHydrationWarning
      />
      <div
        className="relative flex min-h-[220px] flex-col justify-end p-6 sm:min-h-[300px] sm:p-10"
        suppressHydrationWarning
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300/95">
          Matchday
        </p>
        <h1 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-4xl sm:leading-tight">
          Football schedules, results, and leagues
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-200 sm:text-base">
          Live league data and standings in one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3" suppressHydrationWarning>
          <Link
            href="/competitions"
            className="inline-flex min-h-12 min-w-[44px] items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 active:scale-[0.98]"
          >
            Competitions
          </Link>
          <Link
            href="/matches"
            className="inline-flex min-h-12 min-w-[44px] items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-[0.98]"
          >
            Matches
          </Link>
        </div>
      </div>
    </section>
  );
}
