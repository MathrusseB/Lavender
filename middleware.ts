import { NextResponse, type NextRequest } from "next/server";

const MOBILE_UA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet|Silk/i;

const MOBILE_REDIRECTS: Record<string, string> = {
  "/the-ranch": "/#the-ranch",
  "/the-barn": "/#the-barn",
  "/the-cabins": "/#the-cabins",
  "/gatherings": "/#gatherings",
  "/field-notes": "/#field-notes",
  "/inquire": "/#inquire",
};

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  if (!MOBILE_UA.test(ua)) return NextResponse.next();

  const target = MOBILE_REDIRECTS[req.nextUrl.pathname];
  if (!target) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/";
  url.hash = target.split("#")[1];
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/the-ranch", "/the-barn", "/the-cabins", "/gatherings", "/field-notes", "/inquire"],
};
