import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-[100dvh] flex-1 flex-col bg-zinc-50 dark:bg-zinc-950 md:flex-row"
      suppressHydrationWarning
    >
      <AppSidebar />
      <div
        className="flex min-h-[100dvh] min-w-0 flex-1 flex-col"
        suppressHydrationWarning
      >
        <AppHeader />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
