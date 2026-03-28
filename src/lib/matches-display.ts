export function formatMatchKickoffUtc(iso: string) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(d);
  } catch {
    return iso;
  }
}

export function matchStatusLabel(s: string) {
  switch (s) {
    case "SCHEDULED":
      return "Scheduled";
    case "FINISHED":
      return "FT";
    case "LIVE":
    case "IN_PLAY":
      return "Live";
    case "PAUSED":
      return "Pause";
    case "POSTPONED":
      return "Postp.";
    default:
      return s;
  }
}

export function matchStatusClass(s: string) {
  if (s === "FINISHED") {
    return "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100";
  }
  if (s === "LIVE" || s === "IN_PLAY") {
    return "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-200";
  }
  return "bg-teal-100 text-teal-900 dark:bg-teal-950/50 dark:text-teal-200";
}
