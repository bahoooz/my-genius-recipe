"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import {
  BadgeEuro,
  CircleUserRound,
  Mail,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import BeforeDesktopVersion from "@/components/BeforeDesktopVersion";
import FavoriteRecipes from "@/components/FavoriteRecipes";
import { supabase, signOut } from "@/lib/supabase";

export default function ProfilePage() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<string | null>(null);
  const username = user?.user_metadata?.username || "Utilisateur";
  const email = user?.email || "Aucun email";
  const account_type = subscription === "free" ? "gratuit" : "Premium";

  useEffect(() => {
    async function getUserSubscription() {
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
    
    getUserSubscription();
  }, [user?.id]);

  return (
    <ProtectedRoute>
      <div className="px-4 pt-12 mb-32">
        <Title title="Profil" className="lg:ml-12 lg:text-center" />
        <div className="max-w-[400px] mx-auto flex justify-center items-center gap-12 lg:gap-12 xl:gap-16 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:min-w-[600px] lg:min-w-[800px] xl:min-w-[900px] lg:ml-12 lg:mt-4">
          <div className="max-w-full min-w-[300px] md:max-w-[400px] 2xl:max-w-[500px] md:border-none md:p-8 md:py-4 md:border-brown-2 md:overflow-y-scroll md:h-[70dvh] custom-scrollbar">
            <div className=" bg-brown-2 lg:min-w-[280px] text-white flex justify-center items-center h-[180px] rounded-2xl mb-4">
              <div className="text-lg flex flex-col gap-3">
                <h3 className="flex gap-2 lg:gap-3">
                  <CircleUserRound
                    strokeWidth={1.5}
                    className="min-w-7 min-h-7"
                  />{" "}
                  {username}
                </h3>
                <h3 className="flex gap-2 lg:gap-3 items-center">
                  <Mail strokeWidth={1.5} className="min-w-7 min-h-7" /> 
                  {email}
                </h3>
                <h3 className="flex gap-2 lg:gap-3">
                  <BadgeEuro strokeWidth={1.5} className="min-w-7 min-h-7" />{" "}
                  Plan {account_type}
                </h3>
              </div>
            </div>
            <FavoriteRecipes />
            <div className="flex flex-col gap-4">
              <Button
                onClick={async () => {
                  await signOut();
                  window.location.href = "/";
                }}
                size={"lg"}
                className="bg-red-400"
              >
                Se déconnecter
              </Button>
              <Button size={"lg"} className="bg-[#252525]">
                Changer mot de passe
              </Button>
              <Button size={"lg"} className="bg-green-400">
                Changer abonnement
              </Button>
              <span className="underline text-gray-500 text-center text-xs">
                Résilier abonnement
              </span>
            </div>
          </div>
          <BeforeDesktopVersion />
        </div>
      </div>
    </ProtectedRoute>
  );
}
