"use client";

import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import Title from "@/components/Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";

export default function Auth() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const defaultTab = tabParam === "signin" ? "signin" : "signup";
  
  const handleTabChange = (value: string) => {
    window.history.pushState(null, '', `/auth?tab=${value}`);
  };
  
  return (
    <div className="px-4 pt-12 pb-32">
      <Title title="Rejoignez nous" />
      <Tabs 
        defaultValue={defaultTab} 
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2 bg-transparent">
          <TabsTrigger className="bg-brown-1 rounded-2xl" value="signup">
            S'inscrire
          </TabsTrigger>
          <TabsTrigger className="bg-brown-1 rounded-2xl" value="signin">
            Se connecter
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <h2 className="my-8 text-lg">Créer ton compte sur My Genius Recipe, c'est super simple !</h2>
          <SignUpForm />
        </TabsContent>
        <TabsContent value="signin">
          <h2 className="my-8 text-lg">Reviens nous voir tu nous manques !</h2>
          <SignInForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
