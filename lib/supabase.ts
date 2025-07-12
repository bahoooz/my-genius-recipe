import { createClient } from "@supabase/supabase-js";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error(
    "Les variables d'environnement Supabase ne sont pas définies"
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonctions d'authentification
export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  // Si la création du compte réussit et qu'on a un utilisateur
  if (data.user && !error) {
    // Créer le profil utilisateur dans la table user_profiles
    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        user_id: data.user.id,
        subscription: "free", // Valeur par défaut
      });

    if (profileError) {
      console.error(
        "Erreur lors de la création du profil utilisateur:",
        profileError
      );
      // On peut choisir de retourner cette erreur ou la gérer différemment
      return { data, error: profileError };
    }
  }

  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const signInWithGoogle = async () => {
  // Déterminer l'URL de redirection basée sur l'environnement
  const getRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      
      // Si on est en développement local
      if (origin.includes('localhost')) {
        return `${origin}/auth/callback/google`;
      }
      
      // Si on est en production
      if (origin.includes('mygeniusrecipe.com')) {
        return `${origin}/auth/callback/google`;
      }
      
      // Si on est sur Vercel
      if (origin.includes('vercel.app')) {
        return `${origin}/auth/callback/google`;
      }
      
      // Par défaut, utiliser l'origin actuel
      return `${origin}/auth/callback/google`;
    }
    
    // Fallback pour le rendu côté serveur
    return 'https://www.mygeniusrecipe.com/auth/callback/google';
  };

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getRedirectUrl(),
    },
  });
  return { data, error };
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
