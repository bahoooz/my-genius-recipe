"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import {
  BadgeEuro,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  CookingPot,
  Mail,
  Star,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { useAuth } from "@/lib/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  const username = user?.user_metadata?.username || "Utilisateur";
  const email = user?.email || "Aucun email";
  const account_type = "Premium"; // À adapter avec votre logique d'abonnement
  const image = "/assets/img-power-preview/img-1.png"; // Exemple d'image
  const title = "Melon & Beef Glaze"; // Exemple de titre

  return (
    <ProtectedRoute>
      <div className="px-4 pt-12 mb-32">
        <Title title="Profil" />
        <div className="bg-brown-2 text-white flex justify-center items-center h-[150px] rounded-2xl mb-4">
          <div className="text-lg flex flex-col gap-3">
            <h3 className="flex gap-2">
              <CircleUserRound strokeWidth={1.5} className="min-w-7 min-h-7" />{" "}
              {username}
            </h3>
            <h3 className="flex gap-2">
              <Mail strokeWidth={1.5} className="min-w-7 min-h-7" /> {email}
            </h3>
            <h3 className="flex gap-2">
              <BadgeEuro strokeWidth={1.5} className="min-w-7 min-h-7" /> Compte{" "}
              {account_type}
            </h3>
          </div>
        </div>
        <div className="bg-brown-1 rounded-2xl p-4 flex flex-col gap-4">
          <h2 className="font-fredoka text-2xl text-white font-medium">Recettes favorites</h2>
          <Image src={image} alt="image recette" width={1536} height={1024} className="rounded-md" />
          <h3 className="text-white text-xl font-medium">{title}</h3>
          <div className="flex justify-between">
            <Button className="bg-red" size={"lg"}>
              <CookingPot className="min-w-6 min-h-6" /> Voir la recette
            </Button>
            <Button className="bg-yellow-btn text-black" size={"lg"}>
              <Star className="min-w-6 min-h-6" /> Retirer
            </Button>
          </div>
        </div>
        <div className="flex justify-center gap-3 text-red mt-4 mb-8">
          <ChevronLeft />
          <ChevronRight />
        </div>
        <div className="flex flex-col gap-4">
          <Button 
            onClick={async () => {
              const { signOut } = await import("@/lib/supabase");
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
    </ProtectedRoute>
  );
}
