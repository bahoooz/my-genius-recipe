import React from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";

export default function RemoveFavoriteButton({ id }: { id: string }) {
  const { user } = useAuth();

  const handleRemoveFromFavorites = async () => {
    if (!user) {
      alert("Vous devez être connecté pour ajouter des favoris");
      return;
    }

    try {
      // Récupérer le token d'authentification
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch("/api/manage-favorites/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Recette supprimée des favoris avec succès !");
      } else {
        alert(result.error || "Erreur lors de la suppression des favoris");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression des favoris");
    }
  };

  return (
    <Button
      className="bg-yellow-btn text-black hover:text-white group hover:scale-105"
      size={"lg"}
      onClick={handleRemoveFromFavorites}
    >
      <Star className="min-w-6 min-h-6 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-200" /> Retirer
    </Button>
  );
}
