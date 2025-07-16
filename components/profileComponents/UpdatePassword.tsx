"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useRecipeStore } from "@/store/recipeStore";

export function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsToastNotificationOpen, setToastNotification } = useRecipeStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleReset = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.error(error);
      setIsToastNotificationOpen(true);
      setToastNotification({
        text: "Erreur lors du changement du mot de passe",
        icon: <CircleX size={24} />,
        bgColor: "#B34646",
      });
    } else {
      setIsToastNotificationOpen(true);
      setToastNotification({
        text: "Ton mot de passe a été mis a jour avec succès !",
        icon: <CircleCheckBig size={24} />,
        bgColor: "#05df72",
      });
      setIsDialogOpen(false)
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <form>
        <DialogTrigger asChild>
          <Button size={"lg"} className="bg-[#252525] w-full">
            Changer mot de passe
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-modal-bg gap-5">
          <DialogHeader>
            <DialogTitle className="text-red font-medium text-2xl font-fredoka text-center">
              Modifie ton mot de passe
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-red font-medium text-base">
                Nouveau mot de passe
              </Label>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-2 border-red placeholder:text-red text-red"
                placeholder="Écris ton mot de passe ici..."
                required
                type="email"
              />
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="username-1"
                className="text-red font-medium text-base"
              >
                Confirmer mot de passe
              </Label>
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="username-1"
                name="username"
                placeholder="Confirme ton mot de passe ici..."
                className="border-2 border-red placeholder:text-red text-red"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleReset}
              disabled={isLoading}
              size={"lg"}
              className="bg-red flex gap-2"
            >
              <CircleCheckBig className="min-w-6 min-h-6" /> Confirmer les
              changements
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
