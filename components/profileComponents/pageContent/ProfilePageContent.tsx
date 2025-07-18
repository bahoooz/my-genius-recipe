"use client";

import ProtectedRoute from "@/components/global/ProtectedRoute";
import Title from "@/components/global/Title";
import { Button } from "@/components/ui/button";
import { BadgeEuro, CircleUserRound, CircleX, Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import BeforeDesktopVersion from "@/components/global/BeforeDesktopVersion";
import FavoriteRecipes from "@/components/profileComponents/FavoriteRecipes";
import { supabase, signOut } from "@/lib/supabase";
import { UpdatePassword } from "../UpdatePassword";
import Link from "next/link";
import { useRecipeStore } from "@/store/recipeStore";

export default function ProfilePageContent() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<string | null>(null);
  const { setIsToastNotificationOpen, setToastNotification } = useRecipeStore();
  const username = user?.user_metadata?.username || "Utilisateur";
  const email = user?.email || "Aucun email";
  const account_type =
    subscription === "free"
      ? "Free"
      : subscription === "premium"
      ? "Premium"
      : subscription === "infinite"
      ? "Infinite"
      : "Unknown";

  useEffect(() => {
    async function getUserSubscription() {
      if (!user?.id) return;

      const { data: existingProfile, error } = await supabase
        .from("user_profiles")
        .select("subscription")
        .eq("user_id", user.id)
        .single();

      if (!existingProfile) {
        async function createUserProfile() {
          const { error: profileError } = await supabase
            .from("user_profiles")
            .insert({
              user_id: user?.id,
              subscription: "free", // Valeur par défaut
            });

          if (profileError) {
            console.error(
              "Erreur lors de la création du profil utilisateur:",
              profileError
            );
          }
        }
        createUserProfile();
      }

      if (error) {
        console.error("Erreur lors de la récupération de l'abonnement:", error);
        return;
      }

      setSubscription(existingProfile?.subscription);
    }

    getUserSubscription();
  }, [user?.id]);

  const handleGeneratePortalSession = async () => {
    const res = await fetch("/api/create-portal-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user?.id }),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      setIsToastNotificationOpen(true);
      setToastNotification({
        text: "Erreur lors du changement du mot de passe",
        icon: <CircleX size={24} />,
        bgColor: "#B34646",
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="px-4 pt-12 mb-32">
        <Title title="Profil" className="lg:ml-12 lg:text-center" />
        <div className="max-w-[400px] mx-auto flex justify-center items-center gap-12 lg:gap-12 xl:gap-16 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:min-w-[600px] lg:min-w-[800px] xl:min-w-[900px] lg:ml-12 lg:mt-4">
          <div className="max-w-full min-w-[300px] md:max-w-[400px] 2xl:max-w-[500px] md:border-none md:p-8 md:py-4 md:border-brown-2 md:overflow-y-scroll md:h-[70dvh] custom-scrollbar">
            <div className=" bg-brown-2 md:max-w-[297.56px] overflow-hidden lg:min-w-[280px] lg:max-w-full text-white flex justify-center items-center h-[180px] rounded-2xl mb-4 p-4">
              <div className="text-lg flex flex-col gap-3 w-full break-words">
                <h3 className="flex gap-2 lg:gap-3">
                  <CircleUserRound
                    strokeWidth={1.5}
                    className="min-w-7 min-h-7"
                  />{" "}
                  {username}
                </h3>
                <h3 className="flex items-center gap-2 lg:gap-3 break-words flex-wrap">
                  <Mail
                    strokeWidth={1.5}
                    className="min-w-7 min-h-7 flex-shrink-0"
                  />
                  <span className="break-words flex-1 min-w-0">{email}</span>
                </h3>
                <h3 className="flex gap-2 lg:gap-3">
                  <BadgeEuro strokeWidth={1.5} className="min-w-7 min-h-7" />{" "}
                  Compte {account_type}
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
              <UpdatePassword />
              {subscription !== "free" ? (
                <>
                  <Button
                    size={"lg"}
                    className="bg-green-400"
                    onClick={handleGeneratePortalSession}
                  >
                    Changer abonnement
                  </Button>
                  <span className="underline text-gray-500 text-center text-xs">
                    Résilier abonnement
                  </span>
                </>
              ) : (
                <>
                  <Link
                    href={"/pricing"}
                    className="inline-flex hover:scale-[102%] items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all outline-none aria-invalid:border-destructive cursor-pointer bg-green-400 h-10 rounded-2xl px-6 has-[>svg]:px-4 text-white"
                  >
                    Passer au plan supérieur
                  </Link>
                </>
              )}
            </div>
          </div>
          <BeforeDesktopVersion />
        </div>
      </div>
    </ProtectedRoute>
  );
}
