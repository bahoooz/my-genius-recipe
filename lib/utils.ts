import { createClient } from "@supabase/supabase-js"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
    .single();
  
  if (error) {
    console.error("Erreur lors de la récupération de l'abonnement:", error);
    return;
  }
  
  setSubscription(data?.subscription);
}