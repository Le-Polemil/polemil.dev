import { NextRequest, NextResponse } from "next/server"

// Bump this whenever the persisted client cache shape changes (Apollo cache,
// i18next localstorage, etc.). On the first request from a visitor whose
// cookie doesn't match, we send Clear-Site-Data: "storage" + set the cookie.
// Subsequent requests skip this header.
const CACHE_VERSION = "v2-bo2"
const COOKIE_NAME = "cache-version"

export function middleware(req: NextRequest) {
  if (req.cookies.get(COOKIE_NAME)?.value === CACHE_VERSION) {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  // "storage" clears localStorage, sessionStorage, IndexedDB. Cookies are
  // untouched (only the "cookies" value clears them), so the marker we set
  // below sticks.
  res.headers.set("Clear-Site-Data", '"storage"')
  res.cookies.set(COOKIE_NAME, CACHE_VERSION, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return res
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon|locales/|icon/).*)"],
}
