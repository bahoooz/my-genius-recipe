import Image from "next/image";
import React from "react";
import RecipeExemple from "./RecipeExemple";

type RecipeImagePreviewProps = {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
};

export default function RecipeImagePreview({
  title,
  description,
  ingredients,
  instructions,
  image,
}: RecipeImagePreviewProps) {
  return (
    <div className="min-h-32 max-h-32 overflow-hidden flex justify-center pt-12 items-center relative rounded-md">
      <h4 className="absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 text-white w-full text-center text-xl z-10 font-medium">
        {title}
      </h4>
      <div className="absolute inset-0 bg-black/40"></div>
      <RecipeExemple title={title} description={description} ingredients={ingredients} instructions={instructions} image={image} />
      <Image src={image} width={1536} height={1024} alt="recipe img" />
    </div>
  );
}
