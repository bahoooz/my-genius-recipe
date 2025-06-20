import React, { useState } from "react";
import { Button } from "./ui/button";
import { CircleCheck, CircleX, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";
import { useRecipeStore } from "@/store/recipeStore";

export default function RemoveFavoriteButton({ id }: { id: string }) {
  const { user } = useAuth();
  const { setIsToastNotificationOpen, setToastNotification } = useRecipeStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveFromFavorites = async () => {
    if (!user) {
      alert("Vous devez être connecté pour ajouter des favoris");
      return;
    }

    try {
      setIsLoading(true);
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
        setIsToastNotificationOpen(true);
        setToastNotification({
          text: "Recette supprimée des favoris avec succès !",
          icon: <CircleCheck size={24} />,
          bgColor: "#46B366",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setIsToastNotificationOpen(true);
        setToastNotification({
          text: result.error || "Erreur lors de la suppression des favoris",
          icon: <CircleX size={24} />,
          bgColor: "#B34646",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setIsToastNotificationOpen(true);
      setToastNotification({
        text: "Erreur lors de la suppression des favoris",
        icon: <CircleX size={24} />,
        bgColor: "#B34646",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="bg-yellow-btn text-black hover:text-white group hover:scale-105"
      size={"lg"}
      onClick={handleRemoveFromFavorites}
      disabled={isLoading}
    >
      <Star className="min-w-6 min-h-6 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-200" /> Retirer
    </Button>
  );
}
