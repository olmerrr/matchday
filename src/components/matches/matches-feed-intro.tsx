import Link from "next/link";

export function MatchesFeedIntro() {
  return (
    <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
      Live fixtures come from an external feed. If the list is empty or fails,
      you can still use{" "}
      <Link
        href="/competitions"
        className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
      >
        Competitions
      </Link>{" "}
      for tables and league pages.
    </p>
  );
}
