"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CircleArrowUp, Eye, EyeOff } from "lucide-react";
import { signIn, signInWithGoogle } from "@/lib/supabase";

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

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      const { error } = await signInWithGoogle();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Erreur de connexion Google:", error);
      setError("Erreur lors de la connexion avec Google");
    }
  };

  return (
    <div>
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
          <Button
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-0 bottom-0 bg-brown-2/60"
          >
            {isPasswordVisible ? (
              <EyeOff className="text-black" />
            ) : (
              <Eye className="text-black" />
            )}
          </Button>
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
      <div className="mt-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-full h-0.5 bg-brown-2"></div>
          OU
          <div className="w-full h-0.5 bg-brown-2"></div>
        </div>
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          size={"lg"}
          className="bg-brown-2 w-full"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuer avec Google
        </Button>
      </div>
    </div>
  );
}
