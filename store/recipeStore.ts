import { create } from 'zustand'

interface RecipeState {
  recipeData: any | null
  isDialogOpen: boolean
  setRecipeData: (data: any) => void
  setDialogOpen: (isOpen: boolean) => void
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipeData: null,
  isDialogOpen: false,
  setRecipeData: (data) => set({ recipeData: data }),
  setDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
})) 