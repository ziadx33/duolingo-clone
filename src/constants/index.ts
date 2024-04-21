export const PUBLIC_ROUTES = ["/login", "/register"];
export const PROTECTED_ROUTES = ["/learn", "/verification-token"];
export const MIDDLEWARE_ROUTES = [
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
] as const;
