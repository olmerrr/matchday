"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SITE_NAV,
  navItemActive,
} from "@/components/site-nav-items";

function drawerLinkClass(active: boolean) {
  return `flex min-h-11 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
    active
      ? "bg-teal-700/15 text-teal-800 dark:bg-teal-500/20 dark:text-teal-200"
      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
  }`;
}

function headerBarLinkClass(active: boolean) {
  return `flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
    active
      ? "bg-teal-700/15 text-teal-800 dark:bg-teal-500/20 dark:text-teal-200"
      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
  }`;
}

export function AppNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        className="hidden items-center gap-1 md:flex lg:gap-2"
        aria-label="Main navigation"
      >
        {SITE_NAV.map(({ href, label, Icon }) => {
          const active = navItemActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={headerBarLinkClass(active)}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={
                  active
                    ? "h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300"
                    : "h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-500"
                }
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="md:hidden" suppressHydrationWarning>
      <button
        type="button"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex h-14 items-center justify-between border-b border-zinc-100 px-4 dark:border-zinc-800">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Menu
              </span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-400"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav
              className="flex flex-1 flex-col gap-1 p-3 bg-black"
              aria-label="Main navigation"
            >
              {SITE_NAV.map(({ href, label, Icon }) => {
                const active = navItemActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={drawerLinkClass(active)}
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
          </div>
        </div>
      ) : null}
      </div>
    </>
  );
}
