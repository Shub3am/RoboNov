import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.cookies.get("next-auth.session-token") !== undefined) {
    NextResponse.rewrite(new URL("http://localhost:3000/dashboard"));
  } else {
    NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/auth/:path*",
};
