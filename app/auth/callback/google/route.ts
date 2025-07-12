import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // Échanger le code pour une session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Déterminer l'URL de redirection basée sur l'environnement
  const getBaseUrl = () => {
    // Si on est en développement local
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000';
    }
    
    // Si on est en production
    if (process.env.NODE_ENV === 'production') {
      // Vérifier si on a une URL de production définie
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
      }
      
      // Essayer de détecter à partir de l'host
      const host = request.headers.get('host');
      if (host) {
        if (host.includes('mygeniusrecipe.com')) {
          return `https://${host}`;
        }
        if (host.includes('vercel.app')) {
          return `https://${host}`;
        }
      }
      
      // Par défaut, utiliser le domaine principal
      return 'https://www.mygeniusrecipe.com';
    }
    
    // Fallback
    return 'https://www.mygeniusrecipe.com';
  };

  // Redirection vers la page d'accueil après connexion
  return NextResponse.redirect(new URL("/", getBaseUrl()));
}
