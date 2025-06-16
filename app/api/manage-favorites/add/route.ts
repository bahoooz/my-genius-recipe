import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Récupérer le token depuis les headers
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.replace("Bearer ", "");

        if (!token) {
            return NextResponse.json({ error: "Token d'authentification manquant" }, { status: 401 });
        }

        // Utiliser le token pour authentifier l'utilisateur
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
        }

        const { recipe } = await req.json();

        // Vérifier si l'utilisateur a déjà cette recette dans ses favoris
        if (recipe.title) {
            const { data: existingRecipe, error: checkError } = await supabase
                .from("favorite_recipes")
                .select("id")
                .eq("user_id", user.id)
                .eq("title", recipe.title)
                .single();

            if (checkError && checkError.code !== 'PGRST116') {
                return NextResponse.json({ error: "Erreur lors de la vérification des favoris" }, { status: 500 });
            }

            if (existingRecipe) {
                return NextResponse.json({ error: "Cette recette est déjà dans vos favoris" }, { status: 409 });
            }
        }

        if (!recipe || !recipe.content) {
            return NextResponse.json({ error: "Données de recette invalides" }, { status: 400 });
        }

        const { error } = await supabase.from("favorite_recipes").insert({
            user_id: user.id,
            title: recipe.title || "Recette sans titre",
            description: recipe.description || "",
            ingredients: recipe.ingredients || "",
            instructions: recipe.instructions,
            image: recipe.image,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ 
            message: "Recette ajoutée aux favoris avec succès"
        }, { status: 201 });

    } catch (error) {
        console.error("Erreur lors de l'ajout aux favoris:", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}
