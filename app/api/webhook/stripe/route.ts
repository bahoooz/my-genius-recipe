import { headers } from 'next/headers';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Initialisation de l'instance Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
// Chargement de la clé secrète du webhook Stripe depuis les variables d'environnement
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {

  // Extraction du corps de la requête en tant que texte brut
  const body = await req.text();
  // Récupération de la signature Stripe depuis les en-têtes de la requête
  const signature = (await headers()).get('stripe-signature');

  // Vérification si la signature est présente dans les en-têtes
  if (!signature) {
    console.error('La signature du webhook est manquante.');
    return new Response(JSON.stringify({ error: 'Webhook signature missing' }), { status: 400 });
  }

  let event;

  try {
    // Construction de l'événement Stripe à partir du corps, de la signature et de la clé secrète
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret ?? "");
  } catch (error: any) {
    // Gestion des erreurs liées à la vérification de la signature
    console.error(`Échec de la vérification de la signature du webhook. ${error.message}`);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  // Extraction des données et du type d'événement
  const { data, type: eventType } = event;

  try {
    // Gestion des différents types d'événements Stripe
    switch (eventType) {
      // Traitement de l'événement de session de paiement complété
      case 'checkout.session.completed': {
        console.log('Handling checkout.session.completed event...');
        const session = data.object as Stripe.Checkout.Session;
      
        if (!session.customer) {
          throw new Error('Customer ID manquant dans la session');
        }
      
        const customerId = session.customer as string;
        console.log("Customer ID:", customerId);
        
        // Récupération des informations du client depuis Stripe
        const customer = await stripe.customers.retrieve(customerId);
      
        if ('deleted' in customer) {
          throw new Error('Le client est supprimé');
        }
      
        if (!customer.email) {
          throw new Error('Aucun email client fourni');
        }
      
        console.log(`Customer retrieved: ${JSON.stringify(customer)}`);
      
        // Recherche de l'utilisateur auth par email
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        
        if (authError) {
          throw new Error(`Erreur lors de la recherche des utilisateurs auth: ${authError.message}`);
        }
        
        const foundAuthUser = authUser.users.find(user => user.email === customer.email);
        
        if (!foundAuthUser) {
          throw new Error(`Utilisateur auth non trouvé pour l'email: ${customer.email}`);
        }
        
        // Récupération des détails de l'abonnement pour déterminer le plan
        let subscriptionPlan = 'premium'; // Par défaut
        if (session.subscription) {
          try {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
            const priceId = subscription.items.data[0]?.price.id;
            
            // Mappage des prix Stripe vers les noms de plans
            const priceToPlansMap: { [key: string]: string } = {
              'price_1RZDUKDVNTY8xoRACeuUsEi0': 'premium', // Premium mensuel
              'price_1RZDXADVNTY8xoRAfnqRzDRc': 'premium', // Premium annuel
              'price_1RZE6HDVNTY8xoRAhOgC2Jh6': 'infinite', // Infinite mensuel
              'price_1RZE6dDVNTY8xoRAIRTyLsy3': 'infinite', // Infinite annuel
            };
            
            subscriptionPlan = priceToPlansMap[priceId] || 'premium';
            console.log(`Plan déterminé: ${subscriptionPlan} pour le prix: ${priceId}`);
          } catch (error) {
            console.error('Erreur lors de la récupération de l\'abonnement:', error);
            console.log('Utilisation du plan par défaut: premium');
          }
        }
        
        // Recherche du profil utilisateur
        const { data: existingProfile, error: findError } = await supabaseAdmin
          .from('user_profiles')
          .select('*')
          .eq('user_id', foundAuthUser.id)
          .single();
        
        if (findError && findError.code !== 'PGRST116') {
          throw new Error(`Erreur lors de la recherche du profil utilisateur: ${findError.message}`);
        }
      
        // Si le profil n'existe pas encore, création d'un nouveau profil
        if (!existingProfile) {
          const { data: newProfile, error: createError } = await supabaseAdmin
            .from('user_profiles')
            .insert([{
              user_id: foundAuthUser.id,
              stripe_customer_id: customerId,
              subscription: subscriptionPlan, // Enregistrement du nom du plan
            }])
            .select()
            .single();
          
          if (createError) {
            throw new Error(`Erreur lors de la création du profil utilisateur: ${createError.message}`);
          }
          
          console.log(`Nouveau profil utilisateur créé avec le plan ${subscriptionPlan}: ${JSON.stringify(newProfile)}`);
        } else {
          // Mise à jour des informations du profil utilisateur existant
          const { data: updatedProfile, error: updateError } = await supabaseAdmin
            .from('user_profiles')
            .update({
              stripe_customer_id: customerId,
              subscription: subscriptionPlan, // Mise à jour avec le nom du plan
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

      // Traitement de l'événement de suppression d'abonnement
      case 'customer.subscription.deleted': {
        console.log('Handling customer.subscription.deleted event...');
        const subscription = data.object as Stripe.Subscription;

        if (!subscription.customer) {
          throw new Error("Informations d'abonnement manquantes");
        }

        const customerId = subscription.customer as string;

        // Recherche du profil utilisateur associé au client dans la base de données
        const { data: userProfile, error: findError } = await supabaseAdmin
          .from('user_profiles')
          .select('*')
          .eq('stripe_customer_id', customerId)
          .single();

        if (findError || !userProfile) {
          console.warn(`Profil utilisateur non trouvé pour le client avec ID: ${customerId}. Ceci peut être normal si l'utilisateur n'avait pas encore d'abonnement actif.`);
          // Ne pas lancer d'erreur - retourner succès silencieusement
          return new Response(JSON.stringify({ message: 'Aucun profil utilisateur trouvé - aucune action nécessaire' }), { status: 200 });
        }

        // Mise à jour des informations du profil utilisateur pour refléter la suppression de l'abonnement
        const { data: updatedProfile, error: updateError } = await supabaseAdmin
          .from('user_profiles')
          .update({
            subscription: 'free' // Retour au plan gratuit
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
      // Gestion des événements non pris en charge
      default:
        console.log(`Type d'événement non géré: ${eventType}`);
    }



    
  } catch (e) {
    // Gestion des erreurs générales
    if (e instanceof Error) {
      console.error(`Erreur Stripe: ${e.message} | Type d'événement: ${eventType}`);
      return new Response(JSON.stringify({ error: e.message }), { status: 400 });
    } else {
      console.error(`Erreur inconnue: ${e}`);
      return new Response(JSON.stringify({ error: 'Erreur inconnue' }), { status: 400 });
    }
  }

  // Réponse réussie pour le webhook
  return new Response(JSON.stringify({ received: true }));
}