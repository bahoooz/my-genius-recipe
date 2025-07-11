import { supabase } from "./supabase";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface getUserSubscriptionTypes {
  user: any
  setSubscription: (subscription: string) => void
}

export async function getUserSubscription({user, setSubscription}: getUserSubscriptionTypes) {
  if (!user?.id) return;
  
  const { data, error } = await supabase
    .from("user_profiles")
    .select("subscription")
    .eq("user_id", user.id)
    .maybeSingle(); // ✅ Accepte 0 ou 1 ligne sans exploser
  
  if (error) {
    console.error("Erreur lors de la récupération de l'abonnement:", error);
    return;
  }
  
  setSubscription(data?.subscription);
}