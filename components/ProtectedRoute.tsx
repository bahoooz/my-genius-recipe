"use client";

import { useAuth } from "@/lib/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.push("/auth?tab=signin");
    }
  }, [user, loading, router]);

  // Afficher un écran de chargement pendant la vérification
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  // Rendre le contenu si l'utilisateur est connecté
  return user ? <>{children}</> : null;
} 