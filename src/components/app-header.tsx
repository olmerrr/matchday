import Link from "next/link";
import { AppNavigation } from "@/components/app-navigation";

export function AppHeader() {
  return (
    <header
      className="sticky top-0 z-30 border-b border-zinc-200/90 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90"
      suppressHydrationWarning
    >
      <div
        className="mx-auto flex min-h-14 max-w-5xl items-center justify-between gap-3 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:px-6 sm:pb-3"
        suppressHydrationWarning
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-50"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white shadow-sm"
            aria-hidden
          >
            M
          </span>
          <span className="text-lg font-semibold tracking-tight">Matchday</span>
        </Link>
        <AppNavigation />
      </div>
    </header>
  );
}
