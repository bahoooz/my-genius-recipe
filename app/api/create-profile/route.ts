import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { user_id } = await req.json()
  console.log('➡️ Appel API /api/create-profile avec user_id :', user_id)

  if (!user_id) {
    return NextResponse.json({ error: 'user_id manquant' }, { status: 400 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Clé admin
  )

  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('user_profiles')
    .select('id')
    .eq('user_id', user_id)
    .maybeSingle()

  console.log('🔍 Résultat vérification profil :', existing)
  if (fetchError) {
    console.error('❌ Erreur vérif user_profiles :', fetchError)
    return NextResponse.json({ error: 'Erreur vérif' }, { status: 500 })
  }

  if (existing) {
    console.log('✅ Profil déjà existant, rien à faire.')
    return NextResponse.json({ success: true, message: 'Profil déjà existant' })
  }

  const { error: insertError } = await supabaseAdmin
    .from('user_profiles')
    .insert({
      user_id,
      subscription: 'free',
    })

  if (insertError) {
    console.error('❌ Erreur insert profil :', insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  console.log('✅ Profil inséré avec succès.')
  return NextResponse.json({ success: true })
}
