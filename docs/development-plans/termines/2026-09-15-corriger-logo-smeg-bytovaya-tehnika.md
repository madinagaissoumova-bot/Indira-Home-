# Plan - Corriger le logo Smeg sur Бытовая техника

## Objectif

Faire apparaitre correctement le logo ou visuel Smeg sur les produits concernes de la page categorie `Бытовая техника`, notamment la bouilloire et le grille-pain.

## Perimetre valide

- Diagnostiquer la source image utilisee pour les produits Smeg.
- Corriger le mapping, les donnees fallback/seed ou le rendu de carte produit selon la cause reelle.
- Garder les textes clientes en russe.
- Preserver la stabilite mobile des cartes produit.

## Hors perimetre

- Aucun changement du panier.
- Aucun changement du checkout.
- Aucun changement de l'espace admin.
- Aucun changement sur les autres categories non concernees par le bug.

## Fichiers ou zones probables

- `app/category/[slug]/page.tsx`
- `app/subcategory/[slug]/page.tsx`
- `lib/categoryVisuals.ts`
- `lib/fallbackCatalog.ts`
- `prisma/seed.ts`
- `app/globals.css`

## Validation prevue

- Controler `/category/bytovaya-tehnika`.
- Verifier que les images produits restent stables sur mobile.
- Lancer le check ou build pertinent si possible.

## Resultat

- La page categorie `Бытовая техника` utilise maintenant l'image `home-strict-tehnika-smeg-logo.png`, qui affiche le logo Smeg sur la bouilloire et le grille-pain.
- Le changement est limite au mapping visuel de la categorie.

## Validation realisee

- `git diff --check` : OK.
- `./node_modules/.bin/next build` avec le lien temporaire vers les dependances locales existantes : OK.
- `npm run build` n'a pas pu etre utilise tel quel dans le worktree, car `prisma generate` a tente une installation `npm i prisma@5.22.0 -D --silent` en l'absence de `node_modules` local.

## Risques et contraintes

- Ne pas afficher le stock exact cote cliente.
- Ne pas introduire de texte cliente hors russe.
- Ne pas melanger ce correctif avec le plan documentaire deja actif.
