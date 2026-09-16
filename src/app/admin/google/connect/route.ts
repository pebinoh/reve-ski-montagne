import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthUrl } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const redirectUri = new URL("/admin/google/callback", request.nextUrl.origin)
    .toString();

  try {
    const url = getGoogleAuthUrl(redirectUri);
    return NextResponse.redirect(url);
  } catch {
    const errorUrl = new URL("/admin", request.nextUrl.origin);
    errorUrl.searchParams.set(
      "calendarError",
      "Google Calendar n'est pas configuré (variables d'environnement manquantes).",
    );
    return NextResponse.redirect(errorUrl);
  }
}
