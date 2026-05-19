# AGENTS.md

## Contexte Du Projet

Ce projet est **Indira Home**, un site e-commerce simple pour une boutique qui vend de la vaisselle et des produits pour la maison en Republique tchetchene.

La V1 doit inclure le parcours cliente et un admin complet :

- catalogue public de produits ;
- page detail produit ;
- panier ;
- formulaire de commande ;
- page de confirmation ;
- connexion admin ;
- tableau de bord admin ;
- gestion produits ;
- gestion categories ;
- gestion stock ;
- gestion commandes ;
- pas de compte cliente ;
- pas de paiement en ligne ;
- textes visibles par les clientes en russe ;
- experience mobile-first.

Le parcours cliente et l'admin complet font tous les deux partie de la V1.

## Stack

- Framework : Next.js App Router
- Langage : TypeScript
- ORM base de donnees : Prisma
- Base locale : SQLite
- Styles : CSS global dans `app/globals.css`

## Source De Verite

Lire ces specs avant de modifier un comportement important :

- `Docs/specs/global-spec.md`
- `Docs/specs/functional-map.md`
- `Docs/specs/technical/README.md`
- `Docs/specs/work-plan.md`
- fiches dans `Docs/specs/feature-specs/`
- `Docs/development-plans/status.md`
- `Docs/development-plans/tickets.md`
- `Docs/roadmap/README.md`
- `Docs/test-plan.md`

Si le code et les specs se contredisent, preferer les specs, puis aligner le code ou les specs pour garder le projet coherent.

## Priorite Actuelle

Construire la V1 complete dans cet ordre :

1. page catalogue ;
2. navigation par categorie ;
3. page detail produit ;
4. panier stocke dans `localStorage` ;
5. formulaire de commande ;
6. creation de commande ;
7. page de confirmation ;
8. connexion admin ;
9. tableau de bord admin ;
10. gestion produits et categories ;
11. gestion stock ;
12. gestion commandes ;
13. polish mobile et textes russes.

## Regles Produit

- Le site cliente doit etre en russe.
- Les prix sont affiches en roubles.
- Les clientes ne creent pas de compte.
- Il n'y a pas de paiement en ligne en V1.
- Les commandes sont confirmees ensuite par telephone ou WhatsApp.
- Numero WhatsApp public : `+7 988 906-41-06`.
- La livraison V1 est limitee a la Republique tchetchene.
- La quantite exacte en stock est reservee a l'admin et ne doit pas etre affichee aux clientes.
- Un produit avec stock `0` reste visible s'il est publie, mais il n'est pas commandable.
- Les produits masques ou en brouillon ne sont pas visibles cote cliente.
- Un produit commandable doit etre publie, non masque, dans une categorie visible, dans une sous-categorie visible, et avoir un stock superieur a `0`.
- Les prix d'une commande doivent etre figes au moment de la validation.
- Le stock diminue uniquement apres une validation de commande reussie.

## Routes

Routes publiques :

- `/`
- `/category/:slug`
- `/subcategory/:slug`
- `/product/:slug`
- `/search`
- `/cart`
- `/checkout`
- `/checkout/confirmation`
- `/privacy`

Routes admin :

- `/admin/login`
- `/admin`
- `/admin/products`
- `/admin/products/:id`
- `/admin/categories`
- `/admin/stock`
- `/admin/orders`
- `/admin/orders/:id`

## Conventions De Donnees

Utiliser les constantes de `lib/constants.ts` pour les statuts et les modes de paiement.

Statuts produit :

- `DRAFT`
- `PUBLISHED`
- `HIDDEN`

Statuts de visibilite :

- `VISIBLE`
- `HIDDEN`

Modes de paiement :

- `CASH_ON_DELIVERY`
- `TRANSFER_AFTER_CONFIRMATION`

Statuts de commande :

- `NEW`
- `TO_CONFIRM`
- `CONFIRMED`
- `PREPARING`
- `DELIVERED`
- `CANCELLED`

## Notes D'Implementation

- Garder les changements concentres sur la phase en cours.
- Preferer les patterns deja presents dans le projet.
- Garder l'interface cliente mobile-first.
- Stocker le panier cote client avec seulement `productId` et `quantity`.
- Recalculer les prix et le stock cote serveur avant la commande.
- Utiliser des URLs d'images pour les produits dans la premiere version.
- Ne pas exposer les donnees personnelles des clientes sur les pages publiques.
- Ne pas afficher un lien admin de facon trop visible dans le parcours cliente.

## Commandes Utiles

- `npm run dev`
- `npm run build`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:seed`

## A Eviter

- Construire une marketplace.
- Ajouter le paiement en ligne dans la premiere version.
- Demander une connexion cliente.
- Afficher la quantite exacte en stock aux clientes.
- Ajouter de gros refactors sans lien avec la phase en cours.
