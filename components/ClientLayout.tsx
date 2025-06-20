"use client";

import React from "react";
import RecipeImageFullScreen from "./RecipeImageFullScreen";
import LoadingRecipeScreen from "./LoadingRecipeScreen";
import { useRecipeStore } from "@/store/recipeStore";
import FavoriteRecipeAlert from "./FavoriteRecipeAlert";
import RecipesRemaining from "./RecipesRemaining";



export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoadingRecipeGeneration = useRecipeStore(
    (state) => state.isLoadingRecipeGeneration
  );
  const ToastNotification = useRecipeStore((state) => state.ToastNotification);
  const isToastNotificationOpen = useRecipeStore(
    (state) => state.isToastNotificationOpen
  );

  

  return (
    <div className="relative min-h-dvh">
      {/* Affichage du compteur pour les utilisateurs non-connectés */}
      <RecipesRemaining />

      {isToastNotificationOpen && (
        <FavoriteRecipeAlert
          text={ToastNotification?.text || ""}
          icon={ToastNotification?.icon || null}
          bgColor={ToastNotification?.bgColor || "#000000"}
        />
      )}
      <RecipeImageFullScreen />
      {isLoadingRecipeGeneration && <LoadingRecipeScreen />}
      {children}
    </div>
  );
}
