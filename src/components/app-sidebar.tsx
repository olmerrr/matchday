"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SITE_NAV,
  navItemActive,
} from "@/components/site-nav-items";

function sidebarLinkClass(active: boolean) {
  return `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    active
      ? "bg-teal-700/15 text-teal-800 dark:bg-teal-500/20 dark:text-teal-200"
      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
  }`;
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 z-20 hidden h-[100dvh] w-56 shrink-0 flex-col border-r border-zinc-200/90 bg-white/95 pt-[max(1rem,env(safe-area-inset-top))] pb-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95 md:flex"
      aria-label="Main navigation"
      suppressHydrationWarning
    >
      <div className="px-3 pb-6" suppressHydrationWarning>
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white shadow-sm">
            M
          </span>
          <span className="text-lg font-semibold tracking-tight">Matchday</span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 px-2">
        {SITE_NAV.map(({ href, label, Icon }) => {
          const active = navItemActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={sidebarLinkClass(active)}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={
                  active
                    ? "h-5 w-5 shrink-0 text-teal-700 dark:text-teal-300"
                    : "h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-500"
                }
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
