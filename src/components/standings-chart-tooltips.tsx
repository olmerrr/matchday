"use client";

type TooltipEntry = {
  name?: string | number;
  value?: unknown;
  color?: string;
  dataKey?: unknown;
  payload?: unknown;
  type?: string;
};

const shellClass =
  "rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-900";

function teamTitleFromPayload(payload: readonly TooltipEntry[] | undefined) {
  const row = payload?.[0]?.payload as
    | { fullName?: string; name?: string }
    | undefined;
  if (row && typeof row === "object") {
    const t = row.fullName ?? row.name;
    if (typeof t === "string" && t.length > 0) return t;
  }
  return "—";
}

type BaseProps = {
  active?: boolean;
  payload?: readonly TooltipEntry[];
};

export function StandingsWdlTooltipContent({ active, payload }: BaseProps) {
  if (!active || !payload?.length) return null;
  const team = teamTitleFromPayload(payload);

  return (
    <div className={shellClass}>
      <p className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
        {team}
      </p>
      <ul className="m-0 list-none space-y-1 p-0">
        {payload.map((e, i) => {
          if (!e || e.type === "none") return null;
          return (
            <li
              key={String(e.dataKey ?? i)}
              className="text-zinc-700 dark:text-zinc-200"
            >
              <span style={{ color: e.color }}>{e.name}</span>
              <span className="text-zinc-500"> : </span>
              <span>{String(e.value ?? "")}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function StandingsPointsTooltipContent({ active, payload }: BaseProps) {
  if (!active || !payload?.length) return null;
  const team = teamTitleFromPayload(payload);
  const row = payload[0]?.payload as { points?: number } | undefined;
  const pts = row?.points ?? payload[0]?.value;

  return (
    <div className={shellClass}>
      <p className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
        {team}
      </p>
      <p className="m-0 text-zinc-700 dark:text-zinc-200">
        <span className="font-medium text-teal-700 dark:text-teal-400">Pts</span>
        <span className="text-zinc-500"> : </span>
        <span>{String(pts ?? "")}</span>
      </p>
    </div>
  );
}
