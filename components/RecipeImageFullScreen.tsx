import React from 'react'
import { Button } from './ui/button';
import { Eye } from 'lucide-react';
import { useRecipeStore } from '@/store/recipeStore';
import Image from 'next/image';

export default function RecipeImageFullScreen() {
    const { isOpenImageRecipe, imageRecipe, setIsOpenImageRecipe, setDialogOpen } = useRecipeStore();
  return (
    <div>
        {isOpenImageRecipe && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none w-full h-full">
          <div className="h-full w-full bg-black/80 flex items-center justify-center flex-col p-8 pointer-events-auto">
            <Image
              src={imageRecipe || ""}
              alt="mascotte logo"
              width={512}
              height={512}
              className="aspect-square rounded-2xl object-cover"
            />
            <Button
              size={"lg"}
              className="mt-4 bg-red"
              onClick={() => {
                setDialogOpen(true);
                setIsOpenImageRecipe(false);
              }}
            >
              <Eye className="min-w-5 min-h-5" /> Fermer l'aperçu
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
