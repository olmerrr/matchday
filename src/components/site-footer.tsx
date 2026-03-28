export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-zinc-200/90 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
      <p>© {year} Matchday</p>
      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-600">
        <a
          href="https://www.linkedin.com/in/yaroslav-dombrovskiy-b7762a141/"
          className="underline-offset-2 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Yaroslav Dombrovskiy
        </a>
      </p>
    </footer>
  );
}
