import type { MatchesErrorHelp } from "@/lib/matches-error-copy";

type MatchesErrorAlertProps = {
  help: MatchesErrorHelp;
};

export function MatchesErrorAlert({ help }: MatchesErrorAlertProps) {
  return (
    <div
      className="rounded-2xl border border-amber-200/90 bg-amber-50/90 p-4 text-sm dark:border-amber-900/50 dark:bg-amber-950/30"
      role="alert"
    >
      <p className="font-medium text-amber-950 dark:text-amber-100">
        {help.title}
      </p>
      {help.detail ? (
        <p className="mt-2 text-xs leading-relaxed text-amber-900/85 dark:text-amber-200/90">
          {help.detail}
        </p>
      ) : null}
      <ul className="mt-3 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-amber-950/90 dark:text-amber-100/85">
        {help.tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
