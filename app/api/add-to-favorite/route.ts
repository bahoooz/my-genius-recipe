import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { data: { user } } = await supabase.auth.getUser();

    const { recipe } = await req.json();

    const { data, error } = await supabase.from("favorite_recipes").insert({
        user_id: user?.id,
        recipe_id: recipe.id,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}
