import { MIDDLEWARE_ROUTES, PROTECTED_ROUTES } from "@/constants";
import { type User } from "@prisma/client";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie")!,
    },
  };
  const pathname = request.nextUrl.pathname;
  const isIncludingProtectedRoutes = PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );
  const user_data = (await getSession({
    req: requestForNextAuth,
  })) as unknown as { user?: User } | null;
  if (!user_data && isIncludingProtectedRoutes) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    pathname !== "/choose-subjects" &&
    isIncludingProtectedRoutes &&
    user_data?.user?.currentSubjectId === ""
  ) {
    return NextResponse.redirect(new URL("/choose-subjects", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: MIDDLEWARE_ROUTES as string[],
};
