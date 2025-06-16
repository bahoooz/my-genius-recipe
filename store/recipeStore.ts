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
  isLoadingRecipeGeneration: boolean
  setIsLoadingRecipeGeneration: (isLoading: boolean) => void
  setToastNotification: (notification: any) => void
  ToastNotification: {
    text: string
    icon: React.ReactNode | null
    bgColor?: string
  } | null
  isToastNotificationOpen: boolean
  setIsToastNotificationOpen: (isOpen: boolean) => void
  // Système simple pour les recettes restantes
  remainingRecipes: number
  setRemainingRecipes: (count: number) => void
  getRemainingRecipes: () => number
}

// Fonction simple pour localStorage
const getStoredRecipeCount = (): number => {
  if (typeof window === 'undefined') return 5;
  const stored = localStorage.getItem('remainingRecipes');
  return stored ? parseInt(stored) : 5;
};

export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipeData: null,
  isDialogOpen: false,
  isOpenImageRecipe: false,
  imageRecipe: null,
  isLoadingRecipeGeneration: false,
  ToastNotification: {
    text: "",
    icon: null,
  },
  isToastNotificationOpen: false,
  remainingRecipes: 5,
  
  setRecipeData: (data) => set({ recipeData: data }),
  setDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
  setIsOpenImageRecipe: (isOpen) => set({ isOpenImageRecipe: isOpen }),
  setImageRecipe: (image) => set({ imageRecipe: image }),
  setIsLoadingRecipeGeneration: (isLoading) => set({ isLoadingRecipeGeneration: isLoading }),
  setToastNotification: (notification) => set({ ToastNotification: notification }),
  setIsToastNotificationOpen: (isOpen) => set({ isToastNotificationOpen: isOpen }),
  
  setRemainingRecipes: (count) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('remainingRecipes', count.toString());
    }
    set({ remainingRecipes: count });
  },
  
  getRemainingRecipes: () => {
    return getStoredRecipeCount();
  }
})) 