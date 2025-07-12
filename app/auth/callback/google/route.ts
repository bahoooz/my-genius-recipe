import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // Échanger le code pour une session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirection vers la page d'accueil après connexion
  return NextResponse.redirect(new URL("/", request.url));
}
