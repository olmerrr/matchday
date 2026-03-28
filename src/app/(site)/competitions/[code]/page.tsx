import type { Metadata } from "next";
import Link from "next/link";
import { CompetitionDetail } from "@/components/competition-detail";

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { code } = await props.params;
  const label = decodeURIComponent(code).toUpperCase();
  return { title: label };
}

export default async function CompetitionPage(props: Props) {
  const { code } = await props.params;
  const decoded = decodeURIComponent(code);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-500">
        <Link
          href="/competitions"
          className="text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
        >
          Competitions
        </Link>
        <span className="mx-2 text-zinc-400">/</span>
        <span className="text-zinc-700 dark:text-zinc-300">{decoded}</span>
      </nav>
      <CompetitionDetail code={decoded} />
    </main>
  );
}
