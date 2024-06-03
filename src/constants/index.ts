export const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/verification-token",
  "/choose-subjects",
];
export const PROTECTED_ROUTES = [
  "/learn",
  "/lesson",
  "/shop",
  "/leaderboard",
  "/profile",
];
export const MIDDLEWARE_ROUTES = [
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
] as const;
export const SIDEBAR_LINKS: { name: string; href: string }[] = [
  {
    name: "learn",
    href: "/learn",
  },
  {
    name: "leaderboards",
    href: "/leaderboard",
  },
  {
    name: "shop",
    href: "/shop",
  },
  {
    name: "profile",
    href: "/profile",
  },
];
