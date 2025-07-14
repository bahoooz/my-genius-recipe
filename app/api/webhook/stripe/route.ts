import { headers } from 'next/headers';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  console.log('🚀 Webhook Stripe appelé - Environnement:', process.env.NODE_ENV);
  console.log('🔑 Variables d\'environnement présentes:', {
    hasStripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 10) + '...',
    webhookSecretPrefix: process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 10) + '...',
  });

  const buffer = await req.arrayBuffer();
  const body = Buffer.from(buffer).toString('utf8');
  
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    console.error('La signature du webhook est manquante.');
    return new Response(JSON.stringify({ error: 'Webhook signature missing' }), { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret ?? "");
  } catch (error: any) {
    console.error(`Échec de la vérification de la signature du webhook. ${error.message}`);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  const { data, type: eventType } = event;

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        console.log('Handling checkout.session.completed event...');
        const session = data.object as Stripe.Checkout.Session;
      
        if (!session.customer) {
          throw new Error('Customer ID manquant dans la session');
        }
      
        const customerId = session.customer as string;
        console.log("Customer ID:", customerId);
        
        const customer = await stripe.customers.retrieve(customerId);
      
        if ('deleted' in customer) {
          throw new Error('Le client est supprimé');
        }
      
        if (!customer.email) {
          throw new Error('Aucun email client fourni');
        }
      
        console.log(`Customer retrieved: ${JSON.stringify(customer)}`);
      
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        
        if (authError) {
          throw new Error(`Erreur lors de la recherche des utilisateurs auth: ${authError.message}`);
        }
        
        const foundAuthUser = authUser.users.find(user => user.email === customer.email);
        
        if (!foundAuthUser) {
          throw new Error(`Utilisateur auth non trouvé pour l'email: ${customer.email}`);
        }
        
        let subscriptionPlan = 'premium';
        if (session.subscription) {
          try {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
            const priceId = subscription.items.data[0]?.price.id;
            
            const priceToPlansMap: { [key: string]: string } = {
              'price_1RZDUKDVNTY8xoRACeuUsEi0': 'premium',
              'price_1RZDXADVNTY8xoRAfnqRzDRc': 'premium',
              'price_1RZE6HDVNTY8xoRAhOgC2Jh6': 'infinite',
              'price_1RZE6dDVNTY8xoRAIRTyLsy3': 'infinite',
            };
            
            subscriptionPlan = priceToPlansMap[priceId] || 'premium';
            console.log(`Plan déterminé: ${subscriptionPlan} pour le prix: ${priceId}`);
          } catch (error) {
            console.error('Erreur lors de la récupération de l\'abonnement:', error);
            console.log('Utilisation du plan par défaut: premium');
          }
        }
        
        const { data: existingProfile, error: findError } = await supabaseAdmin
          .from('user_profiles')
          .select('*')
          .eq('user_id', foundAuthUser.id)
          .single();
        
        if (findError && findError.code !== 'PGRST116') {
          throw new Error(`Erreur lors de la recherche du profil utilisateur: ${findError.message}`);
        }
      
        if (!existingProfile) {
          const { data: newProfile, error: createError } = await supabaseAdmin
            .from('user_profiles')
            .insert([{
              user_id: foundAuthUser.id,
              stripe_customer_id: customerId,
              subscription: subscriptionPlan,
            }])
            .select()
            .single();
          
          if (createError) {
            throw new Error(`Erreur lors de la création du profil utilisateur: ${createError.message}`);
          }
          
          console.log(`Nouveau profil utilisateur créé avec le plan ${subscriptionPlan}: ${JSON.stringify(newProfile)}`);
        } else {
          const { data: updatedProfile, error: updateError } = await supabaseAdmin
            .from('user_profiles')
            .update({
              stripe_customer_id: customerId,
              subscription: subscriptionPlan,
            })
            .eq('user_id', foundAuthUser.id)
            .select()
            .single();
          
          if (updateError) {
            throw new Error(`Erreur lors de la mise à jour du profil utilisateur: ${updateError.message}`);
          }
          
          console.log(`Profil utilisateur mis à jour avec le plan ${subscriptionPlan}: ${JSON.stringify(updatedProfile)}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        console.log('Handling customer.subscription.deleted event...');
        const subscription = data.object as Stripe.Subscription;

        if (!subscription.customer) {
          throw new Error("Informations d'abonnement manquantes");
        }

        const customerId = subscription.customer as string;

        const { data: userProfile, error: findError } = await supabaseAdmin
          .from('user_profiles')
          .select('*')
          .eq('stripe_customer_id', customerId)
          .single();

        if (findError || !userProfile) {
          console.warn(`Profil utilisateur non trouvé pour le client avec ID: ${customerId}. Ceci peut être normal si l'utilisateur n'avait pas encore d'abonnement actif.`);
          return new Response(JSON.stringify({ message: 'Aucun profil utilisateur trouvé - aucune action nécessaire' }), { status: 200 });
        }

        const { data: updatedProfile, error: updateError } = await supabaseAdmin
          .from('user_profiles')
          .update({
            subscription: 'free'
          })
          .eq('user_id', userProfile.user_id)
          .select()
          .single();

        if (updateError) {
          throw new Error(`Erreur lors de la mise à jour du profil utilisateur: ${updateError.message}`);
        }

        console.log(`Abonnement supprimé pour l'utilisateur, retour au plan free: ${JSON.stringify(updatedProfile)}`);

        break;
      }
      default:
        console.log(`Type d'événement non géré: ${eventType}`);
    }    
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Erreur Stripe: ${e.message} | Type d'événement: ${eventType}`);
      return new Response(JSON.stringify({ error: e.message }), { status: 400 });
    } else {
      console.error(`Erreur inconnue: ${e}`);
      return new Response(JSON.stringify({ error: 'Erreur inconnue' }), { status: 400 });
    }
  }

  return new Response(JSON.stringify({ received: true }));
}