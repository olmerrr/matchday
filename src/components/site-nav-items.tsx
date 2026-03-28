import type { ComponentType, SVGProps } from "react";

export type NavIconProps = SVGProps<SVGSVGElement>;

function strokeIcon(
  d: string,
  props: NavIconProps,
  opts?: { fill?: boolean }
) {
  const { className, ...rest } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill={opts?.fill ? "currentColor" : "none"}
      stroke={opts?.fill ? "none" : "currentColor"}
      strokeWidth={opts?.fill ? undefined : 1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-5 w-5 shrink-0"}
      aria-hidden
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}

export function NavIconHome(props: NavIconProps) {
  return strokeIcon(
    "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    props
  );
}

export function NavIconCompetitions(props: NavIconProps) {
  return strokeIcon(
    "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.008v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.008v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.008v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    props
  );
}

export function NavIconMatches(props: NavIconProps) {
  return strokeIcon(
    "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5",
    props
  );
}

export function NavIconFavorites(props: NavIconProps) {
  return strokeIcon(
    "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
    props,
    { fill: true }
  );
}

export type SiteNavEntry = {
  href: string;
  label: string;
  Icon: ComponentType<NavIconProps>;
};

export const SITE_NAV: readonly SiteNavEntry[] = [
  { href: "/", label: "Home", Icon: NavIconHome },
  { href: "/competitions", label: "Competitions", Icon: NavIconCompetitions },
  { href: "/matches", label: "Matches", Icon: NavIconMatches },
  { href: "/favorites", label: "Favorites", Icon: NavIconFavorites },
] as const;

export function navItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
