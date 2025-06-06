# Système de Favoris - My Genius Recipe

## Vue d'ensemble

Le système de favoris permet aux utilisateurs connectés de sauvegarder leurs recettes générées et de les retrouver dans leur profil.

## Configuration de la base de données

1. **Exécutez le script SQL** dans l'éditeur SQL de Supabase :
   ```bash
   # Copiez le contenu de database-setup.sql et exécutez-le dans Supabase
   ```

2. **Tables créées** :
   - `recipes` : Stocke les recettes complètes avec leur contenu
   - `favorite_recipes` : Table de liaison entre utilisateurs et recettes favorites

## Fonctionnalités

### 1. Ajouter aux favoris
- **Endpoint** : `POST /api/add-to-favorite`
- **Fonctionnement** :
  1. Génère un ID unique basé sur le contenu de la recette
  2. Sauvegarde la recette complète dans la table `recipes`
  3. Ajoute la relation dans `favorite_recipes`
- **Gestion des doublons** : Empêche l'ajout de la même recette plusieurs fois

### 2. Récupérer les favoris
- **Endpoint** : `GET /api/get-favorites`
- **Retourne** : Liste des recettes favorites avec tous les détails

### 3. Supprimer des favoris
- **Endpoint** : `DELETE /api/remove-from-favorite`
- **Fonctionnement** : Supprime la relation dans `favorite_recipes`

## Structure des données

### Recette générée
```typescript
{
  id: string,           // Hash généré du contenu
  content: string,      // Contenu complet de la recette
  title: string,        // Titre extrait par regex
  description: string,  // Description extraite par regex
  ingredients: string   // Ingrédients extraits par regex
}
```

### Favori
```typescript
{
  id: UUID,
  user_id: UUID,
  recipe_id: string,
  created_at: timestamp,
  recipes: {
    // Détails complets de la recette
  }
}
```

## Sécurité

- **RLS (Row Level Security)** activé sur toutes les tables
- Les utilisateurs ne peuvent voir que leurs propres favoris
- Authentification requise pour toutes les opérations
- Validation des données côté serveur

## Utilisation côté client

Le composant `ResponseRecipe.tsx` gère automatiquement :
- La génération d'ID unique pour chaque recette
- L'extraction des données (titre, description, ingrédients)
- L'appel aux APIs de sauvegarde et favoris
- La gestion des erreurs et feedback utilisateur

## Tests recommandés

1. Générer une recette et l'ajouter aux favoris
2. Vérifier que la recette apparaît dans les favoris
3. Tenter d'ajouter la même recette (doit être bloqué)
4. Supprimer une recette des favoris
5. Tester avec un utilisateur non connecté 