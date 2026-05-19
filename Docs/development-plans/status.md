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
| Lot 1 | `lot-1-catalogue-client.md` | ACTIF | Catalogue, route categorie, route sous-categorie, recherche, filtres et tri existent. Polish mobile des filtres et verification detaillee restent a finaliser. |
| Lot 2 | `lot-2-fiche-produit-panier.md` | ACTIF | Fiche produit, ajout panier, page panier et corrections de quantites existent. Galerie, caracteristiques et validations panier serveur restent a renforcer. |
| Lot 3 | `lot-3-commande-client.md` | ACTIF | Checkout, action serveur et confirmation existent. Validation stricte, verification panier centralisee et tests concurrence restent a finaliser. |
| Lot 4 | `lot-4-auth-dashboard-admin.md` | ACTIF | Auth admin, logout, protection, dashboard et compteurs existent. |
| Lot 5 | `lot-5-admin-catalogue.md` | ACTIF | Produits et categories admin sont gerables depuis l'interface. |
| Lot 6 | `lot-6-admin-stock.md` | ACTIF | Le stock est consultable et corrigeable depuis l'interface admin. |
| Lot 7 | `lot-7-admin-commandes.md` | ACTIF | Les commandes peuvent etre consultees et mises a jour. |
| Lot 8 | `lot-8-polish-verification.md` | A FAIRE | A faire apres les lots fonctionnels. |

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
- verifier que la suppression definitive produit deja commande est bloquee par la logique applicative ;
- executer `npm run prisma:generate` et `npm run build`.

### Lot 1 - Catalogue client

Pourquoi actif :

- `app/page.tsx` affiche un catalogue ;
- `app/category/[slug]/page.tsx` existe ;
- les produits publies et categories visibles sont filtres ;
- les produits epuisees sont affiches non commandables.

Reste a faire avant de marquer termine :

- verifier les etats vides par categorie/sous-categorie ;
- finaliser l'ergonomie mobile des filtres.

### Lot 2 - Fiche produit et panier

Pourquoi actif :

- `app/product/[slug]/page.tsx` existe ;
- la fiche filtre produit publie, categorie visible, sous-categorie visible ;
- `components/AddToCartButton.tsx` existe ;
- `app/cart/page.tsx` et `app/cart/CartClient.tsx` existent ;
- le panier utilise `localStorage`.

Reste a faire avant de marquer termine :

- afficher toutes les photos ou une vraie galerie ;
- afficher les caracteristiques facultatives ;
- renforcer la verification panier cote serveur ;
- eviter toute exposition du stock exact cote cliente ;
- verifier les produits masques, supprimes ou rendus invisibles par categorie/sous-categorie masquee dans un panier ancien ;
- tester le parcours mobile complet.

### Lot 3 - Commande client

Pourquoi actif :

- `app/checkout/page.tsx` existe ;
- `app/checkout/CheckoutClient.tsx` existe ;
- `app/checkout/actions.ts` cree une commande ;
- la transaction decremente le stock ;
- `app/checkout/confirmation/page.tsx` existe.

Reste a faire avant de marquer termine :

- appliquer toutes les longueurs et formats de `Docs/specs/validation-rules.md` ;
- extraire une verification panier serveur reutilisable ;
- verifier le cas concurrent du dernier stock ;
- garantir que la confirmation ouverte directement, sans commande recente, affiche un etat neutre selon la spec ;
- verifier que la page confirmation n'expose aucune donnee personnelle ;
- executer les tests manuels commande du `Docs/test-plan.md`.

## Plans termines

Aucun lot complet n'est marque `TERMINE` pour le moment.

Raison : plusieurs bases existent deja, mais aucun lot n'a encore ete valide contre tous ses criteres de sortie et contre `Docs/test-plan.md`.

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
2. finaliser Lot 8 : verification fonctionnelle et polish mobile ;
3. garder l'admin en maintenance tant que les retours QA ne remontent pas de regression.

Cette sequence garde le parcours client commandable et recentre l'effort sur la verification. L'admin est maintenant presente, mais elle doit encore etre auditee en situation reelle avant d'etre consideree totalement terminee.
