import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { signOut } from "next-auth/react";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const isIndexpage = request.nextUrl.pathname === "/";
    const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    const isVerifyRoute = verifyRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    const isGuestRoute = guestRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    
    console.log("token from middleware ->>>>>>> \n" + JSON.stringify(token))

    if (!token && (isAuthRoute || isVerifyRoute)) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("callbackUrl", request.nextUrl.href);
      return NextResponse.redirect(redirectUrl);
    }

    if (token) {
      if(token.status && token.status.id != "1"){
        if(!isVerifyRoute){
          return NextResponse.redirect(new URL("/confirm-email", request.url));
        }
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

const authRoutes = ["/generate" , "/allassets"];
const verifyRoutes = ["/request-email-verification", "/verify-email","/confirm-email"];
const guestRoutes = ["/forgot-password", "/login", "/password-reset", "/signup"];
