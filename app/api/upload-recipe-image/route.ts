import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, userId } = await request.json();

    if (!imageUrl || !userId) {
      return NextResponse.json(
        { error: "URL de l'image et ID utilisateur requis" },
        { status: 400 }
      );
    }

    // Récupérer l'image depuis l'URL
    const res = await fetch(imageUrl);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Impossible de récupérer l'image" },
        { status: 400 }
      );
    }

    const blob = await res.blob();
    const path = `${userId}/recipes/${Date.now()}.png`;

    // Upload vers Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("images")
      .upload(path, blob, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Erreur d'upload de l'image:", uploadError);
      return NextResponse.json(
        { error: "Erreur lors de l'upload de l'image" },
        { status: 500 }
      );
    }

    // Obtenir l'URL publique
    const imagePublicUrl = supabaseAdmin.storage.from("images").getPublicUrl(path)
      .data.publicUrl;

    return NextResponse.json({
      success: true,
      imageUrl: imagePublicUrl,
      uploadData,
    });
  } catch (error) {
    console.error("Erreur dans upload-recipe-image:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 