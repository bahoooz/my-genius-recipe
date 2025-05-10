import PricingPlan from "@/components/PricingPlan";
import Title from "@/components/Title";
import {
  Carousel,
  CarouselNext,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Cookie, X } from "lucide-react";
import React from "react";

const pricingPlans = [
  {
    id: 1,
    title: "MGR Free",
    description:
      "L’abonnement de base inclut un accès limité à MGR mais avec tout de même de bonnes performances dans la génération de recettes",
    advantages: [
      <span className="flex items-center gap-2">
        <X className="min-h-6 min-w-6 text-red-400" />
        Génération de recettes avec image
      </span>,
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        Possibilité d’avoir jusqu’à 2 recettes générées en même temps
      </span>,
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        Limite de 10 recettes générées par mois
      </span>,
      <span className="flex items-center gap-2">
        <X className="min-h-6 min-w-6 text-red-400" />
        IA plus puissante et précise pour la génération de recettes
      </span>,
      <span className="flex items-center gap-2">
        <X className="min-h-6 min-w-6 text-red-400" />
        IA plus créative pour les recettes complexes
      </span>,
      <span className="flex items-center gap-2">
        <X className="min-h-6 min-w-6 text-red-400" />
        Consignes de préparations de recettes plus complètes
      </span>,
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        Limite de 25 recettes en favoris
      </span>,
    ],
    price: 0,
    isActualPlan: true,
  },
  {
    id: 2,
    title: "MGR Premium",
    description:
      "L’abonnement Premium vous offre une expérience totalement exclusive avec MGR, vous offrant une totale liberté sur notre IA !",
    advantages: [
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        Génération de recettes avec image
      </span>,
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        Possibilité d’avoir jusqu’à 5 recettes générées en même temps
      </span>,
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        Limite de 100 recettes générées par mois
      </span>,
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        IA plus puissante et précise pour la génération de recettes
      </span>,
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        IA plus créative pour les recettes complexes
      </span>,
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        Consignes de préparations de recettes plus complètes
      </span>,
      <span className="flex items-center gap-2">
        <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
        Aucune limite max de recettes en favoris
      </span>,
    ],

    price: 4.99,
    isActualPlan: false,
  },
];

export default function Pricing() {
  return (
    <div className="px-4 pt-12 pb-32">
      <Title title="Abonnements" />
      <div className="flex justify-center">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {pricingPlans.map((plan) => (
              <CarouselItem key={plan.id}>
                <PricingPlan
                  title={plan.title}
                  description={plan.description}
                  advantages={plan.advantages}
                  price={plan.price}
                  isActualPlan={plan.isActualPlan}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
