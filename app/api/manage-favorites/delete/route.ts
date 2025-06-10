import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        // Récupérer le token d'autorisation depuis les en-têtes
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: "Token d'autorisation manquant" }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        
        // Utiliser le token pour récupérer l'utilisateur
        const { data: { user }, error: userError } = await supabase.auth.getUser(token);

        if (userError || !user) {
            return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
        }

        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID de recette requis" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("favorite_recipes")
            .delete()
            .eq("user_id", user.id)
            .eq("id", id);

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