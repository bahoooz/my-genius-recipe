import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ingredients, filters } = await req.json();

  const {
    cold_recipe,
    hot_recipe,
    sweet_recipe,
    salty_recipe,
    image,
    number_of_versions,
  } = filters;

  const message = `Tu es un expert en cuisine dans toutes les cuisines du monde, en fonction des ingrédients que tu reçois tu dois générer ${number_of_versions} recette(s), si aucun des filtres suivants ne sont indiqués, tu as carte blanche pour le type de recette que tu veux générer, sinon prends en compte les filtres présents dans ta génération de recettes : cold_recipe=${cold_recipe}, hot_recipe=${hot_recipe}, sweet_recipe=${sweet_recipe}, salty_recipe=${salty_recipe}, image=${image}.

  Le plus souvent possible génère des recettes connues déjà existantes en t'appuyant sur ce que tu as comme recettes dans ta base de données, sinon utilise ta créativité pour générer des recettes originales quand c'est compliqué de trouver des recettes connues.
  
  Voici les ingrédients que tu dois utiliser pour générer ta / tes recettes : ${ingredients}.

  Et voici la mise en forme de ta réponse :

  "Titre de la recette qui tient en une assez petite phrase et qui est un titre le plus souvent possible de recette connue et qui doit être encadrée par des *"

  "Description de la recette qui doit être assez détaillée mais assez courte (40 mots max), qui précise les filtres de la recette, par exemple si c'est une recette froide, ou chaude, sucrée ou salée et qui doit être encadrée par des #"

  "Liste des ingrédients nécessaires pour faire la recette, et n'hésite pas à ajouter du détail sur les ingrédients, comme la quantité, la taille, la forme, etc. encadré par des /"

  "Puis les étapes de préparation de la recette, tu dois apporter le plus de détails possible pour chaque étape, l'utilisateur doit pouvoir suivre la recette sans difficultés uniquement avec tes indications, la recette doit être encadrée par des **"

  Pour chaque recette tu dois absolument utiliser tous les ingrédients que tu reçois dans la requête, tu peux également en ajouter d'autres si tu le souhaites pour compléter la recette.

  Si le prompt que tu reçois ne contient pas d'ingrédients mais autre chose que des choses liées à la cuisine, retourne simplement "Erreur".

  Exemple de mise en forme de réponse que tu dois retourner (si pour une recette quelconque tu as besoin d'ajouter plus de détails sur n'importe quelle partie de la recette tu peux le faire) :

  *Salade fraîcheur aux fraises et chocolat*

  #Une salade sucrée-salée parfaite pour les journées chaudes, avec des fraises juteuses, du chocolat fondant et une touche de vinaigrette légère pour un plaisir frais et original.#

  /
  - une dizaine de fraises
  - 100g de chocolat
  - 100g de salade
  - 100g de vinaigrette
  - 3 cuillères à soupe de sucre
  (tu peux utiliser d'autres termes etc pour les ingrédients)
  /

  **Couper les fraises en morceaux**
  **Couper le chocolat en morceaux**
  **Mélanger les fraises et le chocolat**
  **Ajouter la vinaigrette**
  **Mélanger le tout**
  **Servir**
  `;

  try {
    if (!ingredients) {
      return NextResponse.json(
        { error: "Ingredients are required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const recipe = data.choices[0].message.content;

    return NextResponse.json(recipe, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la génération de la recette" },
      { status: 500 }
    );
  }
}
