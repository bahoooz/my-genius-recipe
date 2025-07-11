"use client";

import BeforeDesktopVersion from "@/components/global/BeforeDesktopVersion";
import SignInForm from "@/components/authComponents/SignInForm";
import SignUpForm from "@/components/authComponents/SignUpForm";
import Title from "@/components/global/Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const defaultTab = tabParam === "signin" ? "signin" : "signup";

  const handleTabChange = (value: string) => {
    window.history.pushState(null, "", `/auth?tab=${value}`);
  };

  return (
    <div className="px-4 pt-12 pb-32 md:relative md:h-screen">
      <Title title="Rejoignez nous" className="lg:ml-12 lg:text-center" />
      <div className="flex justify-center items-center gap-12 lg:gap-12 xl:gap-16 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:min-w-[600px] lg:min-w-[800px] xl:min-w-[900px] lg:ml-12">
        <Tabs
          defaultValue={defaultTab}
          className="w-full md:max-w-[300px] lg:max-w-[400px]"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-2 bg-transparent">
            <TabsTrigger className="bg-brown-1 rounded-2xl hover:opacity-90 cursor-pointer" value="signup">
              S'inscrire
            </TabsTrigger>
            <TabsTrigger className="bg-brown-1 rounded-2xl hover:opacity-90 cursor-pointer" value="signin">
              Se connecter
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <h2 className="my-8 text-lg">
              Créer ton compte sur My Genius Recipe, c'est super simple !
            </h2>
            <SignUpForm />
          </TabsContent>
          <TabsContent value="signin">
            <h2 className="my-8 text-lg">
              Reviens nous voir tu nous manques !
            </h2>
            <SignInForm />
          </TabsContent>
        </Tabs>
        <BeforeDesktopVersion />
      </div>
    </div>
  );
}

export default function Auth() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <AuthPage />
    </Suspense>
  );
}
