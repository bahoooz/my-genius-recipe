// app/auth/callback/google/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    console.error('❌ Code manquant dans l’URL.')
    return NextResponse.redirect(new URL('/erreur', request.url))
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('❌ Erreur OAuth exchange :', error)
    return NextResponse.redirect(new URL('/erreur', request.url))
  }

  const user = data.session?.user

  if (user) {
    try {
      const res = await fetch(`${requestUrl.origin}/api/create-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id }),
      })

      if (!res.ok) {
        const body = await res.json()
        console.error('❌ Erreur création profil via API :', body)
        return NextResponse.redirect(new URL('/erreur', requestUrl))
      }

      console.log('✅ Profil utilisateur créé ou existant.')
    } catch (err) {
      console.error('❌ Erreur fetch API /create-profile :', err)
      return NextResponse.redirect(new URL('/erreur', requestUrl))
    }
  }

  return NextResponse.redirect(new URL('/', requestUrl))
}
