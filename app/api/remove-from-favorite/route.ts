import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
        }

        const { recipeId } = await req.json();

        if (!recipeId) {
            return NextResponse.json({ error: "ID de recette requis" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("favorite_recipes")
            .delete()
            .eq("user_id", user.id)
            .eq("recipe_id", recipeId);

        if (error) {
            console.error("Erreur lors de la suppression du favori:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ 
            message: "Recette retirée des favoris avec succès"
        }, { status: 200 });

    } catch (error) {
        console.error("Erreur lors de la suppression du favori:", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
} 