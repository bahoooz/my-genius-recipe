"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CircleArrowUp, Eye, EyeOff } from "lucide-react";
import { signIn } from "@/lib/supabase";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        throw error;
      }

      setSuccess("Connexion réussie !");
      
      // Redirection vers la page d'accueil après connexion
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      if (error.message) {
        setError(error.message);
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="bg-[#FFEBDD] py-6 px-4 rounded-2xl border-2 border-brown-2 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label className="text-brown-2 font-medium text-base">Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-brown-2 placeholder:text-gray-500"
          placeholder="Écris ton email ici..."
          required
          type="email"
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <Label className="text-brown-2 font-medium text-base">
          Mot de passe
        </Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-brown-2 placeholder:text-gray-500"
          placeholder="Écris ton mot de passe ici..."
          required
          type={isPasswordVisible ? "text" : "password"}
        />
        <Button onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-0 bottom-0 bg-brown-2/60">{isPasswordVisible ? <EyeOff className="text-black" /> : <Eye className="text-black" />}</Button>
      </div>
      {error && (
        <p className="text-red text-sm font-medium text-center">{error}</p>
      )}
      {success && (
        <p className="text-green-600 font-medium text-center">{success}</p>
      )}
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        size={"lg"}
        className="bg-brown-2 text-white font-medium cursor-pointer"
      >
        <CircleArrowUp className="min-w-6 min-h-6" /> Connecte toi
      </Button>
    </form>
  );
}
