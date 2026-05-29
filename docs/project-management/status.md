# Development Status - Indira Home

Ce fichier suit les plans actifs, termines et a faire.

Statuts utilises :

- `TERMINE` : le lot respecte les criteres de sortie connus.
- `ACTIF` : le lot est en cours ou partiellement implemente.
- `A FAIRE` : le lot n'est pas encore implemente de facon fonctionnelle. Un placeholder peut exister.
- `BLOQUE` : le lot attend une decision ou une dependance.

## Vue actuelle

| Lot | Plan | Statut | Resume |
| --- | --- | --- | --- |
| Lot 0 | `lot-0-base-donnees.md` | TERMINE | Constantes, schema Prisma, seed V1, helpers publics, validations serveur communes et garde-fous critiques sont verifies. |
| Lot 1 | `lot-1-catalogue-client.md` | ACTIF | Catalogue d'accueil, routes categorie/sous-categorie, recherche, filtres, tri et regles publiques sont en place. Verification visuelle responsive manuelle reste a finaliser. |
| Lot 2 | `lot-2-fiche-produit-panier.md` | ACTIF | Fiche produit, galerie, caracteristiques, ajout panier, page panier, corrections de quantites et verification serveur existent. Parcours mobile complet reste a tester visuellement. |
| Lot 3 | `lot-3-commande-client.md` | ACTIF | Checkout, action serveur, verification panier centralisee, confirmation, tests d'integration et etats d'erreur sont en place. Verification mobile finale reste a finaliser. |
| Lot 4 | `lot-4-auth-dashboard-admin.md` | ACTIF | Auth admin, logout, protection, dashboard et compteurs existent. |
| Lot 5 | `lot-5-admin-catalogue.md` | ACTIF | Produits et categories admin sont gerables depuis l'interface. |
| Lot 6 | `lot-6-admin-stock.md` | ACTIF | Le stock est consultable et corrigeable depuis l'interface admin. |
| Lot 7 | `lot-7-admin-commandes.md` | ACTIF | Les commandes peuvent etre consultees et mises a jour. |
| Lot 8 | `lot-8-polish-verification.md` | ACTIF | Polish mobile public, textes russes, build production et verification HTTP locale effectues. Screenshots responsive et parcours admin connecte restent a finaliser. |

## Plans actifs

### Lot 1 - Catalogue client

Pourquoi actif :

- `app/page.tsx` affiche un catalogue ;
- `app/category/[slug]/page.tsx` existe ;
- les produits publies et categories visibles sont filtres ;
- les produits epuisees sont affiches non commandables.
- les filtres d'accueil, le tri, la recherche et la reinitialisation existent.

Reste a faire avant de marquer termine :

- finaliser la verification visuelle responsive avec screenshots 360 px et 390 px.

### Lot 2 - Fiche produit et panier

Pourquoi actif :

- `app/product/[slug]/page.tsx` existe ;
- la fiche filtre produit publie, categorie visible, sous-categorie visible ;
- `components/AddToCartButton.tsx` existe ;
- `app/cart/page.tsx` et `app/cart/CartClient.tsx` existent ;
- le panier utilise `localStorage`.

Reste a faire avant de marquer termine :

- verifier les produits masques, supprimes ou rendus invisibles par categorie/sous-categorie masquee dans un panier ancien ;
- tester le parcours mobile complet dans le navigateur.

### Lot 3 - Commande client

Pourquoi actif :

- `app/checkout/page.tsx` existe ;
- `app/checkout/CheckoutClient.tsx` existe ;
- `app/checkout/actions.ts` cree une commande ;
- la transaction decremente le stock ;
- `app/checkout/confirmation/page.tsx` existe.

Reste a faire avant de marquer termine :

- verifier le parcours complet sur mobile ;
- executer les tests manuels commande du `docs/testing/test-plan.md`.

## Plans termines

### Lot 0 - Base projet et donnees

Validation effectuee :

- constantes metier alignees avec les specs ;
- schema Prisma compatible V1 ;
- seed execute avec categories, sous-categories, produits publies, produit epuise, produit masque et produits nouveaux ;
- helpers publics et validations serveur communes couverts par tests ;
- `npm run prisma:generate`, `npm run prisma:seed`, `npm test`, `npm run lint` et `npm run build` passent.

## Suivi des lots

### Lot 4 - Auth admin et dashboard

Priorite : haute.

Premiers tickets :

- `ADMIN-401` Auth admin ;
- `ADMIN-402` Protection routes/actions ;
- `ADMIN-404` Dashboard avec vrais compteurs.

### Lot 5 - Admin catalogue

Priorite : haute.

Premiers tickets :

- `ADMIN-501` Liste produits ;
- `ADMIN-502` Formulaire produit ;
- `ADMIN-504` Gestion categories.

### Lot 6 - Admin stock

Priorite : moyenne-haute.

Premier ticket :

- `ADMIN-601` Page stock.

### Lot 7 - Admin commandes

Priorite : haute apres creation commande.

Premiers tickets :

- `ADMIN-701` Liste commandes ;
- `ADMIN-702` Detail commande ;
- `ADMIN-703` Changement statut.

### Lot 8 - Polish mobile et verification V1

Priorite : finale.

Premier ticket :

- `QA-801` Checklist fonctionnelle.

## Prochain focus recommande

Le prochain focus recommande est :

1. finir l'audit mobile public Lot 8 ;
2. lancer l'audit admin connecte ;
3. garder la checklist fonctionnelle V1 comme filtre final avant V1.

Cette sequence garde le parcours client stable et recentre maintenant l'effort sur l'admin et la verification finale. Le lot 3 est implante et automatise, mais la validation mobile doit encore etre vue en conditions reelles.
