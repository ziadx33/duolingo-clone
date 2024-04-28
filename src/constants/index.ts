export const PUBLIC_ROUTES = ["/login", "/register", "/verification-token"];
export const PROTECTED_ROUTES = ["/learn"];
export const MIDDLEWARE_ROUTES = [
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
] as const;
