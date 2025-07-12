"use client";

import React from "react";
import { Button } from "../ui/button";
import { BadgeEuro } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PricingPlanProps {
  title: string;
  description: string;
  advantages?: (string | React.ReactNode)[];
  priceForMonth: number | string;
  priceForYear: number | string;
  linkForPriceMonth: string;
  linkForPriceYear: string;
  isActualPlan?: boolean;
  otherContent?: React.ReactNode;
  isResilable?: boolean;
  isFree?: boolean;
  image?: string;
}

export default function PricingPlan({
  title,
  description,
  advantages,
  priceForMonth,
  priceForYear,
  linkForPriceMonth,
  linkForPriceYear,
  isActualPlan = false,
  otherContent,
  isResilable = true,
  isFree = false,
  image,
}: PricingPlanProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handlePurchaseMonth = () => {
    if (!user) {
      router.push("/auth?tab=signin");
      return
    }

    console.log("lien ouvert !")

    window.open(linkForPriceMonth, "_blank");
  };

  const handlePurchaseYear = () => {
    if (!user) {
      router.push("/auth?tab=signin");
      return
    }

    console.log("lien ouvert !")

    window.open(linkForPriceYear, "_blank");
  };

  return (
    <div className="bg-brown-2 rounded-2xl text-white px-4 py-6 text-center md:max-w-[400px] relative">
      {image && (
        <Image
          src={image}
          alt={title}
          width={1024}
          height={1024}
          className="absolute w-20 h-20 translate-x-0 translate-y-0 right-0 top-0"
        />
      )}
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
      {!isFree && (
        <div className="flex flex-col gap-4">
          <Button
            disabled={isActualPlan}
            size={"lg"}
            className="bg-yellow-btn text-black"
            onClick={handlePurchaseMonth}
          >
            {isActualPlan ? (
              "Abonnement actuel"
            ) : (
              <>
                <BadgeEuro className="min-w-6 min-h-6" strokeWidth={1.5} />
                Souscrire - {priceForMonth}€/mois
              </>
            )}
          </Button>
          {!isActualPlan && (
            <Button
              disabled={isActualPlan}
              size={"lg"}
              className="bg-[#252525] text-white border-2 border-yellow-btn"
              onClick={handlePurchaseYear}
            >
              <>
                <BadgeEuro className="min-w-6 min-h-6" strokeWidth={1.5} />
                Souscrire - {priceForYear}€/an
              </>
            </Button>
          )}
          <span className="text-sm text-yellow-btn">-10% sur l’abonnement annuel comparé au mensuel 🍻 </span>
          {isResilable && (
            <span className="text-sm">Résiliable à tout moment</span>
          )}
        </div>
      )}
      {otherContent}
    </div>
  );
}
