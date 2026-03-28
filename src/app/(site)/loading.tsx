import { ROUTE_LOADING_SPINNER_CLASS } from "@/lib/ui-constants";

export default function Loading() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 px-4">
      <div
        className={ROUTE_LOADING_SPINNER_CLASS}
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Loading…
      </p>
    </div>
  );
}
