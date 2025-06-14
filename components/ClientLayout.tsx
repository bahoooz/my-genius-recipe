"use client";

import React from "react";
import { useRecipeStore } from "@/store/recipeStore";
import Image from "next/image";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import RecipeImageFullScreen from "./RecipeImageFullScreen";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpenImageRecipe, imageRecipe, setIsOpenImageRecipe, setDialogOpen } =
    useRecipeStore();
  return (
    <div className="relative h-dvh">
      <RecipeImageFullScreen />
      {children}
    </div>
  );
}
