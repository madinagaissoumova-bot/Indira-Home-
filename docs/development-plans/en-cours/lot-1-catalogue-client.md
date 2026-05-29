# Lot 1 - Catalogue client

## Objectif

Permettre aux clientes de consulter et trouver les produits visibles.

## Dependances

- Lot 0 termine.
- `docs/specs/feature-specs/catalogue-produits.md`
- `docs/specs/feature-specs/categories-sous-categories.md`
- `docs/specs/visual-rules.md`

## Tickets

### PUBLIC-101 - Page catalogue `/`

Etat : implemente.

Construire la page catalogue comme premiere experience utile.

Inclus :

- liste produits publics ;
- cartes produit ;
- prix en roubles ;
- badge nouveaute ;
- badge epuise si stock 0 ;
- action panier desactivee si non commandable.

Validation :

- brouillons et produits masques absents ;
- produits dans categories masquees absents ;
- stock exact jamais affiche.

### PUBLIC-102 - Navigation categories

Etat : implemente.

Construire :

- liste categories visibles ;
- liens `/category/:slug` ;
- liens `/subcategory/:slug` ;
- etats vides en russe.

Validation :

- categorie masquee absente ;
- sous-categorie masquee absente ;
- route directe vers une categorie ou sous-categorie masquee ne montre pas de produits publics.

### PUBLIC-103 - Recherche, filtres et tri

Etat : implemente.

Ajouter :

- recherche par nom ;
- filtre categorie ;
- filtre sous-categorie ;
- filtre en stock uniquement ;
- filtre nouveautes ;
- tri defaut ;
- tri prix croissant ;
- tri prix decroissant ;
- tri nouveautes.

Validation :

- une recherche vide ne casse pas le catalogue ;
- les filtres sans resultats affichent un message russe ;
- les produits epuises sont masques seulement avec le filtre en stock.

### UI-101 - Mobile catalogue

Etat : implemente cote CSS et structure, verification visuelle mobile manuelle encore a finaliser.

Adapter l'experience mobile :

- grille lisible ;
- filtres accessibles sans encombrer l'ecran ;
- menu categories compact ;
- bouton panier accessible ;
- cartes stables.

Validation :

- verification autour de 360 px et 390 px ;
- aucun texte important ne deborde ;
- les actions principales sont faciles a toucher.

## Zones probables

- `app/page.tsx`
- `app/category/[slug]/page.tsx`
- `app/subcategory/[slug]/page.tsx`
- `components/`
- `app/globals.css`
- `lib/`

## Risques

- afficher un produit publie mais dans une categorie masquee ;
- afficher trop de texte sur les cartes ;
- melanger textes russes et textes francais cote cliente.
