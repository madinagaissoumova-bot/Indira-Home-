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
| Lot 0 | `lot-0-base-donnees.md` | ACTIF | Schema, constantes, seed et base Prisma existent, mais les validations/helpers serveur restent a consolider. |
| Lot 1 | `lot-1-catalogue-client.md` | ACTIF | Catalogue, routes categorie/sous-categorie, recherche, filtres, tri et corrections mobile existent. Verification visuelle responsive reste a finaliser. |
| Lot 2 | `lot-2-fiche-produit-panier.md` | ACTIF | Fiche produit, galerie, caracteristiques, ajout panier, page panier, corrections de quantites et verification serveur existent. Parcours mobile complet reste a tester visuellement. |
| Lot 3 | `lot-3-commande-client.md` | ACTIF | Checkout, action serveur, verification panier centralisee, confirmation et test concurrence existent. Verification manuelle complete reste a finaliser. |
| Lot 4 | `lot-4-auth-dashboard-admin.md` | ACTIF | Auth admin, logout, protection, dashboard et compteurs existent. |
| Lot 5 | `lot-5-admin-catalogue.md` | ACTIF | Produits et categories admin sont gerables depuis l'interface. |
| Lot 6 | `lot-6-admin-stock.md` | ACTIF | Le stock est consultable et corrigeable depuis l'interface admin. |
| Lot 7 | `lot-7-admin-commandes.md` | ACTIF | Les commandes peuvent etre consultees et mises a jour. |
| Lot 8 | `lot-8-polish-verification.md` | ACTIF | Polish mobile public, textes russes, build production et verification HTTP locale effectues. Screenshots responsive et parcours admin connecte restent a finaliser. |

## Plans actifs

### Lot 0 - Base projet et donnees

Pourquoi actif :

- `prisma/schema.prisma` existe ;
- `lib/constants.ts` existe ;
- `prisma/seed.ts` existe ;
- les modeles principaux sont presents.

Reste a faire avant de marquer termine :

- consolider les helpers de lecture publique ;
- centraliser les validations critiques cote serveur ;
- executer la checklist metier complete de `docs/testing/test-plan.md`.

### Lot 1 - Catalogue client

Pourquoi actif :

- `app/page.tsx` affiche un catalogue ;
- `app/category/[slug]/page.tsx` existe ;
- les produits publies et categories visibles sont filtres ;
- les produits epuisees sont affiches non commandables.

Reste a faire avant de marquer termine :

- verifier les etats vides par categorie/sous-categorie ;
- finaliser la verification visuelle responsive avec screenshots.

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

- verifier manuellement toutes les longueurs et formats de `docs/specs/validation-rules.md` ;
- executer les tests manuels commande du `docs/testing/test-plan.md`.

## Plans termines

Aucun lot complet n'est marque `TERMINE` pour le moment.

Raison : plusieurs bases existent deja, mais aucun lot n'a encore ete valide contre tous ses criteres de sortie et contre `docs/testing/test-plan.md`.

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

## Prochain plan actif recommande

Le prochain focus recommande est :

1. terminer les verifications Lot 3 : validation commande stricte et tests stock ;
2. finaliser les screenshots responsive listes dans `docs/development-plans/v1-verification-2026-05-21.md` ;
3. tester l'admin connecte avec les variables `.env` definitives.

Cette sequence garde le parcours client commandable et recentre l'effort sur la verification. L'admin est maintenant presente, mais elle doit encore etre auditee en situation reelle avant d'etre consideree totalement terminee.
