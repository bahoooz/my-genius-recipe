"use client";

import BeforeDesktopVersion from "@/components/global/BeforeDesktopVersion";
import PricingPlan from "@/components/pricingComponents/PricingPlan";
import Title from "@/components/global/Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPreviousForPricing,
  CarouselNextForPricing,
} from "@/components/ui/carousel";
import pricingPlans from "@/components/pricingComponents/PricingPlans.json";
import React, { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { supabase } from "@/lib/supabase";

export default function PricingPageContent() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<string | null>(null);

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
    <div className="px-4 pt-12 pb-32 md:relative md:h-screen md:overflow-hidden">
      <Title title="Abonnements" className="lg:ml-12 lg:text-center" />
      <div className="flex justify-center items-center gap-12 lg:gap-12 2xl:gap-16 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:min-w-[700px] lg:min-w-[800px] xl:min-w-[900px] lg:ml-12 md:mt-16 lg:mt-20 xl:mt-24">
        <div className="px-4 pt-12 pb-32">
          <div className="flex justify-center">
            <Carousel className="w-full max-w-xs sm:max-w-[580px] md:max-w-[280px] xl:max-w-[340px] 2xl:max-w-[400px]">
              <CarouselContent>
                {pricingPlans.map((plan) => {
                  const isActualPlan = subscription 
                    ? subscription.toLowerCase() === plan.plan.toLowerCase()
                    : false;

                  return (
                    <CarouselItem
                      key={plan.id}
                      className="sm:basis-1/2 md:basis-full md:max-h-[60dvh] xl:max-h-[65dvh] md:overflow-y-auto custom-scrollbar md:pr-1"
                    >
                      <PricingPlan
                        title={plan.plan}
                        description={plan.description}
                        advantages={plan.advantages.map((advantage) => (
                          <p
                            className="flex items-center gap-2"
                            key={advantage.text}
                          >
                            {advantage.isAdvantage ? (
                              <Cookie className="min-h-6 min-w-6 text-yellow-btn" />
                            ) : (
                              <X className="min-h-6 min-w-6 text-red-400" />
                            )}
                            {advantage.text}
                          </p>
                        ))}
                        priceForMonth={plan.priceForMonth}
                        priceForYear={plan.priceForYear}
                        linkForPriceMonth={
                          process.env.NODE_ENV === "development"
                            ? plan.linkForPriceMonthTest || ""
                            : plan.linkForPriceMonth
                        }
                        linkForPriceYear={
                          process.env.NODE_ENV === "development"
                            ? plan.linkForPriceYearTest || ""
                            : plan.linkForPriceYear
                        }
                        isActualPlan={isActualPlan}
                        isFree={plan.isFree}
                        image={plan.image || ""}
                      />
                      <div className="flex justify-center gap-3 text-red mt-4 mb-8 sm:hidden">
                        <CarouselPreviousForPricing />
                        <CarouselNextForPricing />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="justify-center gap-3 text-red mt-4 mb-8 hidden sm:flex">
                <CarouselPreviousForPricing />
                <CarouselNextForPricing />
              </div>
            </Carousel>
          </div>
        </div>
        <BeforeDesktopVersion className="md:mb-24" />
      </div>
    </div>
  );
}
