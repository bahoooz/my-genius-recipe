import { CircleCheckBig } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRecipeStore } from "@/store/recipeStore";

export default function Alert({
  icon = <CircleCheckBig size={24} />,
  text = "Texte par défaut",
  bgColor = "#000000",
}: {
  icon: React.ReactNode;
  text: string;
  bgColor?: string;
}) {
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const setIsToastNotificationOpen = useRecipeStore(
    (state) => state.setIsToastNotificationOpen
  );

  useEffect(() => {
    // Petit délai pour s'assurer que l'animation d'entrée est visible
    const enterTimeout = setTimeout(() => {
      setIsAnimatingIn(true);
    }, 50);

    // Animation de sortie après 4 secondes
    const exitTimeout = setTimeout(() => {
      setIsAnimatingOut(true);

      // Attendre que l'animation se termine avant de fermer complètement
      setTimeout(() => {
        setIsToastNotificationOpen(false);
      }, 300); // Durée de l'animation
    }, 4000);

    // Cleanup
    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, [setIsToastNotificationOpen]);

  return (
    <div
      className={`fixed z-60 p-4 xl:p-6 xl:px-12 w-full md:flex md:justify-end transition-all duration-300 ${
        isAnimatingOut
          ? "-top-12 opacity-0"
          : isAnimatingIn
          ? "top-0 opacity-100"
          : "-top-12 opacity-0"
      }`}
    >
      <div style={{backgroundColor: bgColor}} className="bg-modal-bg relative text-white rounded-2xl flex items-center justify-center gap-3 py-6 md:px-6 font-semibold md:w-fit">
        {" "}
        {icon} <p>{text}</p>
      </div>
    </div>
  );
}
