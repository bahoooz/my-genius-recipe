"use client";

import Image from "next/image";
import React from "react";
import RecipeImagePreview from "./RecipeImagePreview";
import { motion } from "framer-motion";

export const powerPreviewImages = [
  {
    image: "/assets/img-power-preview/img-1.png",
    title: "🍝🧀 Spaghetti alla Carbonara",
    description:
      "Un plat chaud et salé, emblématique de la cuisine italienne, parfait pour un dîner savoureux et rapide.",
    ingredients: [
      "250g de spaghetti",
      "100g de pancetta (ou lardons fumés)",
      "2 œufs",
      "50g de parmesan râpé",
      "Poivre noir fraîchement moulu",
      "Sel",
    ],
    instructions: [
      "1. Faire cuire les spaghetti al dente dans une grande casserole d’eau salée.",
      "2. Pendant ce temps, faire revenir la pancetta dans une poêle sans ajouter de matière grasse.",
      "3. Dans un bol, battre les œufs avec le parmesan et une généreuse pincée de poivre noir.",
      "4. Égoutter les pâtes (sans les rincer), puis les verser dans la poêle avec la pancetta hors du feu.",
      "5. Ajouter rapidement le mélange œufs-fromage et bien mélanger pour enrober les pâtes sans faire coaguler les œufs.",
      "6. Servir immédiatement avec un peu de parmesan et de poivre en plus.",
    ],
  },
  {
    image: "/assets/img-power-preview/img-2.png",
    title: "🥗🫒 Salade grecque classique",
    description:
      "Une recette froide et salée, fraîche et croquante, idéale pour les repas d'été",
    ingredients: [
      "2 tomates mûres",
      "1 concombre",
      "1/2 oignon rouge",
      "100g de feta",
      "50g d’olives noires",
      "Huile d’olive, sel, origan séché",
    ],
    instructions: [
      "1. Laver et couper les tomates en quartiers.",
      "2. Éplucher le concombre, le couper en demi-rondelles.",
      "3. Émincer l’oignon rouge finement.",
      "4. Couper la feta en gros dés.",
      "5. Mélanger tous les légumes dans un saladier, ajouter les olives.",
      "6. Arroser d’huile d’olive, saupoudrer d’origan et de sel, mélanger doucement.",
    ],
  },
  {
    image: "/assets/img-power-preview/img-3.png",
    title: "🍪🍫 Cookies au chocolat crousti-moelleux",
    description:
      "Une recette chaude et sucrée, parfaite pour le goûter ou un dessert réconfortant.",
    ingredients: [
      "150g de beurre doux",
      "100g de sucre roux",
      "50g de sucre blanc",
      "1 œuf",
      "200g de farine",
      "1/2 sachet de levure",
      "150g de pépites de chocolat noir",
      "Une pincée de sel",
    ],
    instructions: [
      "1. Préchauffer le four à 180°C.",
      "2. Faire fondre le beurre au micro-ondes ou à la casserole.",
      "3. Dans un saladier, mélanger les sucres avec le beurre fondu.",
      "4. Ajouter l’œuf, bien mélanger.",
      "5. Ajouter la farine, la levure, le sel et mélanger jusqu’à obtenir une pâte homogène.",
      "6. Incorporer les pépites de chocolat.",
      "7. Former des boules de pâte et les disposer sur une plaque avec papier cuisson.",
      "8. Enfourner 10 à 12 minutes jusqu’à ce que les bords soient dorés.",
    ],
  },
  {
    image: "/assets/img-power-preview/img-4.png",
    title: "🍫🍨 Mousse au chocolat express",
    description:
      "Une recette froide, sucrée, ultra gourmande avec seulement 2 ingrédients !",
    ingredients: ["200g de chocolat noir", "4 œufs frais"],
    instructions: [
      "1. Faire fondre le chocolat au bain-marie ou au micro-ondes.",
      "2. Séparer les blancs des jaunes.",
      "3. Incorporer les jaunes un à un dans le chocolat tiède.",
      "4. Monter les blancs en neige bien ferme avec une pincée de sel.",
      "5. Incorporer délicatement les blancs en neige au chocolat à l’aide d’une spatule.",
      "6. Répartir dans des ramequins et placer au frais minimum 2h.",
    ],
  },
  {
    image: "/assets/img-power-preview/img-5.png",
    title: "🥑🍳 Tartines avocat-œuf poché",
    description:
      "Une recette salée, chaude et froide à la fois, parfaite pour un brunch stylé ou un repas léger.",
    ingredients: [
      "2 tranches de pain complet",
      "1 avocat mûr",
      "2 œufs",
      "1 cuillère à soupe de vinaigre blanc",
      "Sel",
      "Poivre",
      "Paprika",
      "Un filet de citron",
    ],
    instructions: [
      "1. Faire griller les tranches de pain au grille-pain ou à la poêle.",
      "2. Écraser l’avocat avec du sel, poivre, paprika et un peu de jus de citron.",
      "3. Porter une casserole d’eau à frémissement avec le vinaigre.",
      "4. Casser un œuf dans une tasse, créer un tourbillon dans l’eau et y plonger l’œuf pour 2 à 3 minutes.",
      "5. Égoutter l’œuf poché délicatement avec une écumoire.",
      "6. Tartiner l’avocat sur le pain, poser l’œuf poché par-dessus. Servir immédiatement.",
    ],
  },
];

export default function PowerPreview() {
  return (
    <div className="px-4 py-8 mt-12 mb-32 md:mb-0 border-[6px] md:border-none border-[var(--color-brown-2)] rounded-2xl">
      <div className="relative max-w-[220px] mx-auto h-[95px] mb-8">
        <h2 className="font-fredoka text-3xl font-medium text-[var(--color-brown-2)] leading-10">
          Un aperçu de la <br /> puissance de
        </h2>
        <Image
          src="/assets/mascot.png"
          alt="logo"
          width={1024}
          height={1024}
          className="absolute w-12 aspect-square -right-2 bottom-1"
        />
      </div>
      <div className="h-[500px] overflow-hidden relative">
        <motion.div
          className="flex flex-col gap-4"
          animate={{
            y: [0, -1000],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {powerPreviewImages.map((image, i) => (
            <RecipeImagePreview
              key={i}
              image={image.image}
              title={image.title}
              description={image.description}
              ingredients={image.ingredients}
              instructions={image.instructions}
            />
          ))}
          {powerPreviewImages.map((image, i) => (
            <RecipeImagePreview
              key={i}
              image={image.image}
              title={image.title}
              description={image.description}
              ingredients={image.ingredients}
              instructions={image.instructions}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
