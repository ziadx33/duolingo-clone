import {
  MIDDLEWARE_ROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
} from "@/constants";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie")!,
    },
  };
  const user_data = await getSession({ req: requestForNextAuth });
  const pathname = request.nextUrl.pathname;
  const isIncludingProtectedRoutes = PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );
  const isIncludingPublicRoutes = PUBLIC_ROUTES.some((r) =>
    pathname.startsWith(r),
  );
  if (!user_data && isIncludingProtectedRoutes)
    return NextResponse.redirect(new URL("/login", request.url));
  if (user_data && isIncludingPublicRoutes)
    return NextResponse.redirect(new URL("/learn", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: MIDDLEWARE_ROUTES,
};
