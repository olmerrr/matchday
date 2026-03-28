"use client";

import type { LeagueOption } from "@/lib/fallback-leagues";

type HomeChartsLeagueToolbarProps = {
  options: LeagueOption[];
  code: string;
  onCodeChange: (code: string) => void;
};

export function HomeChartsLeagueToolbar({
  options,
  code,
  onCodeChange,
}: HomeChartsLeagueToolbarProps) {
  return (
    <div className="mt-4 space-y-3">
      <label className="block md:hidden">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
          League
        </span>
        <select
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          className="h-12 w-full cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-base text-zinc-900 shadow-sm outline-none ring-teal-600/30 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        >
          {options.map((o) => (
            <option key={o.code} value={o.code}>
              {o.name} ({o.code})
            </option>
          ))}
        </select>
      </label>

      <div
        className="hidden md:flex md:flex-wrap md:gap-2"
        role="group"
        aria-label="League selection"
      >
        {options.map((o) => {
          const active = o.code === code;
          return (
            <button
              key={o.code}
              type="button"
              onClick={() => onCodeChange(o.code)}
              className={`min-h-11 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition active:scale-[0.98] ${
                active
                  ? "border-teal-600 bg-teal-600 text-white shadow-sm dark:border-teal-500 dark:bg-teal-600"
                  : "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-teal-500/40 hover:bg-teal-50/50 dark:border-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-100 dark:hover:border-teal-500/30"
              }`}
            >
              <span className="block leading-tight">{o.name}</span>
              <span
                className={`mt-0.5 block text-xs font-normal ${
                  active ? "text-white/85" : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {o.code}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
