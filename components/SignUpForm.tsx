"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { BadgePlus } from "lucide-react";
import { signUp } from "@/lib/supabase";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Le nom d'utilisateur doit contenir au moins 3 caractères");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, username);

      if (error) {
        throw error;
      }

      setSuccess(
        "Ton compte a été créé avec succès ! Tu peux désormais générer un max de recettes 🥣"
      );

      // Redirection avec rechargement complet de la page après 3 secondes
      setTimeout(() => {
        window.location.href = "/auth?tab=signin";
      }, 3000);
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      if (error.message) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue lors de la création du compte");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="bg-[#FFEBDD] py-6 px-4 rounded-2xl border-2 border-brown-2 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label className="text-brown-2 font-medium text-base">
          Nom d'utilisateur
        </Label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-brown-2 placeholder:text-gray-500"
          placeholder="Écris ton nom d'utilisateur ici..."
          required
          type="text"
        />
      </div>
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-brown-2 font-medium text-base">
            Mot de passe
          </Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-brown-2 placeholder:text-gray-500"
            placeholder="Écris ton mot de passe ici..."
            required
            type="password"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-brown-2 font-medium text-base">
            Confirmer
          </Label>
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-2 border-brown-2 placeholder:text-gray-500"
            placeholder="Confirme ton mot de passe ici..."
            required
            type="password"
          />
        </div>
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
        <BadgePlus className="min-w-6 min-h-6" /> Créer ton compte
      </Button>
    </form>
  );
}
