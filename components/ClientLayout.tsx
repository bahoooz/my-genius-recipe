"use client";

import React from "react";
import RecipeImageFullScreen from "./RecipeImageFullScreen";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-dvh">
      <RecipeImageFullScreen />
      {children}
    </div>
  );
}
