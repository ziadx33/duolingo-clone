import { MIDDLEWARE_ROUTES, PROTECTED_ROUTES } from "@/constants";
import { type User } from "@prisma/client";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "./trpc/server";

export async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie")!,
    },
  };
  const user_data = (await getSession({
    req: requestForNextAuth,
  })) as unknown as { data?: { user: User } };
  const pathname = request.nextUrl.pathname;
  const isIncludingProtectedRoutes = PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );
  if (!user_data && isIncludingProtectedRoutes)
    return NextResponse.redirect(new URL("/login", request.url));
  if (user_data?.data?.user.subjectIds.length === 0)
    return NextResponse.redirect(new URL("/choose-languages", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: MIDDLEWARE_ROUTES,
};
