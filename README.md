# 🧠 My Genius Recipe

Bienvenue sur **My Genius Recipe**, un SaaS alimenté par l'IA, qui génère des recettes de cuisine personnalisées à partir de vos ingrédients, préférences ou idées farfelues ! 🍝✨

## 🌐 Lien vers l'app

🔗 [https://mygeniusrecipe.vercel.app](https://mygeniusrecipe.vercel.app)

## 🚀 Fonctionnalités

- 🧠 Génération de recettes via GPT-4 Turbo
- 📸 Image réaliste de la recette générée
- 🍽️ Jusqu'à **3 recettes** par requête en version premium
- 💾 Favoris illimités (premium)
- 🔒 Authentification avec Supabase (Email + OAuth)
- 🌍 Interface intuitive et responsive
- 📊 Analytics SEO-friendly (Lighthouse optimisé)

## 🛠️ Stack utilisée

- **Frontend** : [Next.js 15 (App Router)](https://nextjs.org/), Tailwind CSS 
- **Backend** : Server Actions, Open AI, Stripe, Supabase Auth + DB + Storage
- **IA** : GPT-4 Turbo (OpenAI API)  
- **Base de données** : Supabase PostgreSQL  
- **Paiement** : Stripe (abonnement premium & infinite)  
- **Déploiement** : Vercel

## 📸 Aperçu
<img width="800" height="auto" alt="Mockup MGR" src="https://github.com/user-attachments/assets/8fa0290a-b2bd-4580-9043-8128bcff4b37" />
<img width="800" height="auto" alt="Mockup MGR 2" src="https://github.com/user-attachments/assets/09f0a6f7-0086-421c-9c26-e173946f8ce7" />
<img width="800" height="auto" alt="Mockup MGR 3" src="https://github.com/user-attachments/assets/0c094d9e-717c-4648-98e6-9c84833dadb0" />

### Installation

```bash
git clone https://github.com/bahoooz/my-genius-recipe.git
cd my-genius-recipe
pnpm install
```

### Variables d’environnement `.env`

```
STRIPE_WEBHOOK_SECRET=your_key
STRIPE_SECRET_KEY=your_url
NEXT_PUBLIC_SUPABASE_URL=your_anon_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_stripe_key
SUPABASE_SERVICE_ROLE_KEY=your_stripe_publishable_key
OPEN_API_KEY=your_webhook_secret
```

### Lancer en local

```bash
pnpm run dev
```

## 💡 À propos

Ce projet est développé par [**Bahoz**](https://bahoz-dev.com), développeur full-stack passionné.  
N'hésitez pas à me suivre ou à me contacter pour toute suggestion, bug ou collaboration !

## ⭐ Support

Si vous aimez le projet, n'hésitez pas à :

- Liker ⭐ le repo
- Me suivre sur GitHub
- Partager l'app à vos amis food lovers 😋

---

🧠 *"Cuisinez avec votre imagination, My Genius Recipe s'occupe du reste."*
