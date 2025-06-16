"use client";

import React from "react";
import RecipeImageFullScreen from "./RecipeImageFullScreen";
import LoadingRecipeScreen from "./LoadingRecipeScreen";
import { useRecipeStore } from "@/store/recipeStore";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isLoadingRecipeGeneration = useRecipeStore((state) => state.isLoadingRecipeGeneration);

  return (
    <div className="relative h-dvh">
      <RecipeImageFullScreen />
      {isLoadingRecipeGeneration && <LoadingRecipeScreen />}
      {children}
    </div>
  );
}
