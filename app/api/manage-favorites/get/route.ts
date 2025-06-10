import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
        }

        // Récupérer les recettes favorites
        const { data, error } = await supabase
            .from("favorite_recipes")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erreur lors de la récupération des favoris:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ 
            favorites: data || [],
            count: data?.length || 0
        }, { status: 200 });

    } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
} 