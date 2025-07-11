"use client";

import { useAuth } from "@/lib/useAuth";
import LogoutButton from "./LogoutButton";

export default function UserProfile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-[#FFEBDD] p-4 rounded-2xl border-2 border-brown-2">
      <h2 className="text-xl font-medium mb-2">Profil Utilisateur</h2>
      <div className="mb-4">
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        {user.user_metadata?.username && (
          <p>
            <span className="font-medium">Nom d'utilisateur:</span>{" "}
            {user.user_metadata.username}
          </p>
        )}
      </div>
      <LogoutButton />
    </div>
  );
} 