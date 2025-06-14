const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

import { createClient } from "@supabase/supabase-js";

// Client admin pour les fonctions serveur (webhooks, etc)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  throw new Error("La clé de service Supabase n'est pas définie");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);