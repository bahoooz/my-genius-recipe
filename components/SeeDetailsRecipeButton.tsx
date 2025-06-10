"use client";

import React from "react";
import { Button } from "./ui/button";
import { CookingPot } from "lucide-react";

interface SeeDetailsRecipeButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function SeeDetailsRecipeButton({
  onClick,
  isOpen,
}: SeeDetailsRecipeButtonProps) {
  return (
    <Button className="bg-red group hover:scale-105" size={"lg"} onClick={onClick}>
      <CookingPot className="min-w-6 min-h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200" /> {isOpen ? "Cacher" : "Voir"}{" "}
      les détails
    </Button>
  );
}
