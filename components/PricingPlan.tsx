import React from "react";
import { Button } from "./ui/button";
import { BadgeEuro } from "lucide-react";

interface PricingPlanProps {
  title: string;
  description: string;
  advantages?: (string | React.ReactNode)[];
  price: number;
  isActualPlan?: boolean;
  otherContent?: React.ReactNode;
}

export default function PricingPlan({
  title,
  description,
  advantages,
  price,
  isActualPlan = false,
  otherContent,
}: PricingPlanProps) {
  return (
    <div className="bg-brown-2 rounded-2xl text-white px-4 py-6 text-center">
      <div>
        <h2 className="text-2xl font-fredoka font-medium mb-6">{title}</h2>
        <p className="text-lg mb-6">{description}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl mb-6">⭐ Avantages ⭐</h3>
        <ul className="flex flex-col gap-4 text-start">
          {advantages?.map((advantage, i) => (
            <li key={i}>{advantage}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          disabled={isActualPlan}
          size={"lg"}
          className="bg-yellow-btn text-black"
        >
          {isActualPlan ? (
            "Abonnement actuel"
          ) : (
            <>
              <BadgeEuro className="min-w-6 min-h-6" strokeWidth={1.5} />
              Souscrire - {price}€/mois
            </>
          )}
        </Button>
        <span className="text-sm">Résiliable à tout moment</span>
      </div>
      {otherContent}
    </div>
  );
}
