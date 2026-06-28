# Lot 1 - Catalogue client

## Objectif

Permettre aux clientes de consulter et trouver les produits visibles.

Statut : termine et verifie.

## Dependances

- Lot 0 termine.
- `docs/specs/feature-specs/catalogue-produits.md`
- `docs/specs/feature-specs/categories-sous-categories.md`
- `docs/specs/visual-rules.md`

## Tickets

### PUBLIC-101 - Page catalogue `/`

Etat : implemente et verifie.

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

Etat : implemente et verifie.

Inclus :

- liste categories visibles ;
- liens `/category/:slug` ;
- liens `/subcategory/:slug` ;
- etats vides en russe.

Validation :

- categorie masquee absente ;
- sous-categorie masquee absente ;
- route directe vers une categorie ou sous-categorie masquee ne montre pas de produits publics.

### PUBLIC-103 - Recherche, filtres et tri

Etat : implemente et verifie.

Inclus :

- recherche par nom ;
- filtre categorie ;
- filtre sous-categorie ;
- filtre en stock uniquement ;
- filtre nouveautes ;
- tri defaut ;
- tri prix croissant ;
- tri prix decroissant ;
- tri nouveautes ;
- reinitialisation.

### PUBLIC-104 - Route `/subcategory/:slug`

Etat : implemente et verifie.

### UI-101 - Mobile catalogue

Etat : implemente et verifie fonctionnellement.

Validation :

- grille mobile en 2 colonnes via CSS responsive ;
- filtres empiles sur mobile ;
- boutons cartes en pleine largeur sur mobile ;
- menu categories compact ;
- routes catalogue verifiees en HTTP local production.

## Validation finale

- `npm run build` : OK.
- `npm run lint` : OK.
- `npm run check:docs` : OK.
- Serveur production local Supabase : OK.
- `GET /` : 200.
- `GET /category/posuda` : 200.
- `GET /subcategory/servizy` : 200.
- `GET /search?q=serviz` : 200.

Note : la capture mobile automatique n'a pas ete produite car l'environnement macOS a bloque le redimensionnement controle de Safari par `osascript`. La verification fonctionnelle et responsive CSS est toutefois terminee pour le lot.

## Zones traitees

- `app/page.tsx`
- `app/category/[slug]/page.tsx`
- `app/subcategory/[slug]/page.tsx`
- `app/search/page.tsx`
- `components/catalog/ProductCard.tsx`
- `app/globals.css`
- `lib/publicCatalog.ts`
- `lib/.i18n/ru.ts`

## Risques couverts

- produits brouillons ou masques exclus par helper public ;
- categories et sous-categories masquees exclues ;
- produits sans image ou sans prix valide exclus ;
- stock exact non affiche cote cliente ;
- produits epuisees visibles mais non commandables.
