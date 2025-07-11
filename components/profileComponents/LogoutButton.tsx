"use client";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/supabase";
import { useState } from "react";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      // Rediriger vers la page d'accueil après déconnexion
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleLogout} 
      disabled={isLoading}
      variant="outline"
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      <span>Déconnexion</span>
    </Button>
  );
} 