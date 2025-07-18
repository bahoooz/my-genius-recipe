// app/api/create-portal-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const { user_id } = await req.json();

  // Récupère l'utilisateur dans Supabase pour avoir le stripe_customer_id
  const { data: profile, error } = await supabaseAdmin
    .from('user_profiles')
    .select('stripe_customer_id')
    .eq('user_id', user_id)
    .single();

  if (error || !profile?.stripe_customer_id) {
    return NextResponse.json(
      { error: 'Utilisateur ou stripe_customer_id introuvable' },
      { status: 400 }
    );
  }

  // Crée la session du Billing Portal
  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: 'https://mygeniusrecipe.com/profile', // 🟢 lien vers ta page profil en prod
  });

  return NextResponse.json({ url: session.url });
}
