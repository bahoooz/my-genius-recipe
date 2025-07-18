// app/api/create-portal-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
    try {
      const { user_id } = await req.json();
  
      const { data: profile, error } = await supabaseAdmin
        .from('user_profiles')
        .select('stripe_customer_id')
        .eq('user_id', user_id)
        .single();
  
      if (error || !profile?.stripe_customer_id) {
        console.error("Erreur Supabase :", error);
        return NextResponse.json(
          { error: 'Utilisateur ou stripe_customer_id introuvable' },
          { status: 400 }
        );
      }
  
      const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: 'https://mygeniusrecipe.com/profile',
      });
  
      return NextResponse.json({ url: session.url });
    } catch (err) {
      console.error("❌ Erreur API create-portal-session :", err);
      return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 });
    }
  }
  
