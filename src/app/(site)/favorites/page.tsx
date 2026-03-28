import type { Metadata } from "next";
import { FavoritesClient } from "@/components/favorites-client";

export const metadata: Metadata = {
  title: "Favorites",
};

export default function FavoritesPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Favorite competitions
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
        Quick access to leagues you save on Matchday.
      </p>
      <div className="mt-8" suppressHydrationWarning>
        <FavoritesClient />
      </div>
    </main>
  );
}
