import { NextRequest, NextResponse } from "next/server";
import { connectGoogleAccount } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const adminUrl = new URL("/admin", request.nextUrl.origin);
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    adminUrl.searchParams.set("calendarError", "Connexion Google annulée.");
    return NextResponse.redirect(adminUrl);
  }

  if (!code) {
    adminUrl.searchParams.set("calendarError", "Code d'autorisation manquant.");
    return NextResponse.redirect(adminUrl);
  }

  const redirectUri = new URL("/admin/google/callback", request.nextUrl.origin)
    .toString();

  try {
    await connectGoogleAccount(code, redirectUri);
    adminUrl.searchParams.set("calendarConnected", "1");
  } catch (err) {
    adminUrl.searchParams.set(
      "calendarError",
      err instanceof Error ? err.message : "Échec de la connexion à Google Calendar.",
    );
  }

  return NextResponse.redirect(adminUrl);
}
