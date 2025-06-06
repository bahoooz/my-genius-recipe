"use client";

import Image from "next/image";
import React from "react";
import RecipeImagePreview from "./RecipeImagePreview";
import { motion } from "framer-motion";

const powerPreviewImages = [
  {
    id: 1,
    path: "/assets/img-power-preview/img-1.png",
    title: "🍉🥓 Melon & Beef Glaze ",
  },
  {
    id: 2,
    path: "/assets/img-power-preview/img-2.png",
    title: "🍩🔥 Spicy Mac Bomb",
  },
  {
    id: 3,
    path: "/assets/img-power-preview/img-3.png",
    title: "🧇🥑 Green Lava Waffles",
  },
  {
    id: 4,
    path: "/assets/img-power-preview/img-4.png",
    title: "🍝🍨 Gelato Fettuccine Verde",
  },
  {
    id: 5,
    path: "/assets/img-power-preview/img-5.png",
    title: "🍓🍕 Pizza Dolce Verde",
  },
  {
    id: 6,
    path: "/assets/img-power-preview/img-6.png",
    title: "🥚🥓 Molten Bacon Bomb",
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
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {powerPreviewImages.map((image) => (
            <RecipeImagePreview
              key={image.id}
              img={image.path}
              title={image.title}
            />
          ))}
          {powerPreviewImages.map((image) => (
            <RecipeImagePreview
              key={`duplicate-${image.id}`}
              img={image.path}
              title={image.title}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
