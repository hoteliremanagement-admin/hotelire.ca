import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/owner")) {
      url.pathname = "/customer/signin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    // ✅ Verify token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    //    url.searchParams.set("debug", JSON.stringify(payload));
    //  return NextResponse.redirect(url);


    const roleId = parseInt(payload.user?.roleid);


    if (url.pathname.startsWith("/admin") && roleId !== 1) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    // if (url.pathname.startsWith("/owner") && roleId !== 2) {
    //   url.pathname = "/unauthorized";
    //   return NextResponse.redirect(url);
    // }


    if (url.pathname.startsWith("/owner")) {

      // 1️⃣ Allow /owner/verification for everyone
      if (url.pathname === "/owner/verification") {
        return NextResponse.next();
      }

      // 2️⃣ For all other /owner/* routes → require roleId = 2
      if (roleId !== 2) {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }


      if (url.pathname.includes("/owner/add-property")) {
        return NextResponse.next();
      }

      // 🔥 Call backend API to verify subscription
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/stripes/subscription/check-subscription`,
          {
            headers: {
              // ⬅️ forward token to backend
              Cookie: `token=${token}`,
            },
          }
        );

        if (url.pathname.includes("/owner/subscription")) {
          return NextResponse.next();
        }


        const data = await res.json();

        if (!data.subscribed) {
          url.pathname = "/owner/subscription";
          return NextResponse.redirect(url);
        }
      } catch (error) {
        console.log("subscription check error", error);
        url.pathname = "/owner/subscription";
        return NextResponse.redirect(url);
      }



      return NextResponse.next();



    }



    return NextResponse.next();

  } catch (err) {
    console.error("JWT verification failed:", err);
    url.pathname = "/customer/signin";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/owner/:path*"],
};
