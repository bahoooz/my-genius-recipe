import { create } from 'zustand'

interface RecipeState {
  recipeData: any | null
  isDialogOpen: boolean
  setRecipeData: (data: any) => void
  setDialogOpen: (isOpen: boolean) => void
  isOpenImageRecipe: boolean
  setIsOpenImageRecipe: (isOpen: boolean) => void
  imageRecipe: string | null
  setImageRecipe: (image: string) => void
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipeData: null,
  isDialogOpen: false,
  isOpenImageRecipe: false,
  imageRecipe: null,
  setRecipeData: (data) => set({ recipeData: data }),
  setDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
  setIsOpenImageRecipe: (isOpen) => set({ isOpenImageRecipe: isOpen }),
  setImageRecipe: (image) => set({ imageRecipe: image }),
})) 