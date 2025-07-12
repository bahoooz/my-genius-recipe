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

export function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.error(error);
      alert("Erreur lors du changement de mot de passe.");
    } else {
      setSuccess(true);
    }
    setIsLoading(false);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button size={"lg"} className="bg-[#252525] w-full">
            Changer mot de passe
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit password</DialogTitle>
            <DialogDescription>Update your password here</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">New Password</Label>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="name-1"
                name="name"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Confirm Password</Label>
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="username-1"
                name="username"
              />
            </div>
            {success && ("ça a marché !")}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Exit</Button>
            </DialogClose>
            <Button onClick={handleReset} disabled={isLoading}>
              Change password
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}