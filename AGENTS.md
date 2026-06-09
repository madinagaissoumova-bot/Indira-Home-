# AGENTS.md

## Mission

Ce projet est **Indira Home**, une V1 e-commerce simple pour une boutique de vaisselle et de produits maison en Republique tchetchene.

La V1 doit livrer deux surfaces completes :

- un parcours cliente mobile-first ;
- un espace admin protege.

Le site cliente est en russe. L'admin peut etre en russe ou en francais pendant la construction, mais les libelles finaux doivent tendre vers le russe quand ils sont visibles dans l'interface.

## Stack

- Framework : Next.js App Router
- Langage : TypeScript
- ORM : Prisma
- Base : Supabase PostgreSQL
- Styles : CSS global dans `app/globals.css`
- Types partages : `types/`
- Donnees metier : constantes dans `lib/constants.ts`

## Sources De Verite

Avant tout changement important de comportement, lire les documents pertinents :

- `docs/specs/global-spec.md`
- `docs/specs/functional-map.md`
- `docs/specs/work-plan.md`
- `docs/specs/technical/README.md`
- `docs/specs/technical/production-plan.md`
- `docs/specs/technical/security-checklist.md`
- `docs/specs/technical/supabase.md`
- `docs/specs/feature-specs/`
- `docs/development-plans/status.md`
- `docs/development-plans/tickets.md`
- `docs/roadmap/README.md`
- `docs/testing/test-plan.md`

Si le code et les specs se contredisent, preferer les specs, puis aligner le code ou les docs pour garder le projet coherent.

## Fonctionnalites V1

### Parcours Cliente

- catalogue public ;
- navigation par categorie et sous-categorie ;
- recherche ;
- fiche produit ;
- panier en `localStorage` ;
- checkout sans compte ;
- creation de commande ;
- confirmation de commande ;
- page confidentialite.

### Admin

- connexion admin ;
- tableau de bord ;
- gestion produits ;
- gestion categories et sous-categories ;
- gestion stock ;
- gestion commandes ;
- changement de statut commande ;
- notes internes.

## Regles Produit Non Negociables

- Les textes visibles par les clientes doivent etre en russe.
- Les prix sont affiches en roubles.
- Les clientes ne creent pas de compte.
- Il n'y a pas de paiement en ligne en V1.
- La boutique confirme les commandes par telephone ou WhatsApp.
- Numero WhatsApp public : `+7 988 906-41-06`.
- La livraison V1 est limitee a la Republique tchetchene.
- La quantite exacte en stock est reservee a l'admin et ne doit jamais etre affichee cote cliente.
- Un produit publie avec stock `0` reste visible, mais il n'est pas commandable.
- Les produits `DRAFT` ou `HIDDEN` ne sont pas visibles cote cliente.
- Un produit commandable doit etre `PUBLISHED`, non masque, dans une categorie visible, dans une sous-categorie visible, avec un stock superieur a `0`.
- Les prix d'une commande sont figes au moment de la validation.
- Le stock diminue uniquement apres une validation de commande reussie.
- Les donnees personnelles de commande ne sont jamais affichees sur les pages publiques.

## Routes

### Publiques

- `/`
- `/category/:slug`
- `/subcategory/:slug`
- `/product/:slug`
- `/search`
- `/cart`
- `/checkout`
- `/checkout/confirmation`
- `/privacy`

### Admin

- `/admin/login`
- `/admin`
- `/admin/products`
- `/admin/products/:id`
- `/admin/categories`
- `/admin/stock`
- `/admin/orders`
- `/admin/orders/:id`

## Conventions De Donnees

Toujours utiliser `lib/constants.ts` pour les valeurs metier.

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

## Regles D'Implementation

- Suivre le workflow Development Plan defini ci-dessous pour tout nouveau sujet de travail.
- Garder les changements concentres sur le besoin en cours.
- Preferer les patterns deja presents dans le projet.
- Ne pas ajouter de grosse abstraction sans benefice clair.
- Mettre les types reutilisables dans `types/`.
- Garder les types strictement locaux dans le composant ou le module concerne.
- Stocker le panier navigateur avec seulement `productId` et `quantity`.
- Ne jamais faire confiance au panier navigateur pour les prix, le stock ou les statuts.
- Recalculer prix, disponibilite, total et stock cote serveur avant creation de commande.
- Utiliser des URLs d'images produit en V1.
- Proteger toutes les pages et actions admin cote serveur.
- Ne pas exposer de lien admin de facon trop visible dans le parcours cliente.

## Workflow Development Plan

Pour chaque nouveau sujet de travail :

1. Verifier la branche courante et se placer sur `main`.
2. Verifier que `main` est synchronisee avec `origin/main`.
3. Discuter du besoin et rediger le contenu du Development Plan avec l'utilisatrice dans la conversation.
4. Attendre la validation explicite du plan par l'utilisatrice avant toute implementation.
5. Creer une nouvelle branche depuis `main`, avec un nom qui correspond clairement au plan.
6. Enregistrer le plan valide dans `docs/development-plans/en-cours/` sur cette branche.
7. Implementer uniquement le perimetre du plan actif.
8. Verifier le comportement, les specs, les tests et les documents de suivi.
9. Deplacer le plan dans `docs/development-plans/termines/`.
10. Creer un commit clair contenant le travail du plan.
11. Pousser la branche sur GitHub.
12. Ouvrir une Pull Request correspondant au plan vers `main`.
13. Attendre la validation explicite de l'utilisatrice avant de merger la Pull Request.
14. Merger la Pull Request vers `main`.
15. Revenir sur `main` et synchroniser la branche locale avec `origin/main`.

Un seul Development Plan peut etre actif a la fois, sauf instruction contraire explicite. Chaque nouveau Development Plan exige la creation d'une nouvelle branche qui n'existait pas auparavant, meme si une branche existante concerne le meme sujet ou porte un nom proche. Un Development Plan actif = une nouvelle branche = une Pull Request. Ne pas reutiliser une ancienne branche pour un nouveau plan et ne pas regrouper plusieurs plans independants dans une meme Pull Request.

Une petite correction, une correction de methode, une modification documentaire ou un ajustement annexe est un nouveau sujet si ce n'etait pas explicitement prevu dans le plan actif. Dans ce cas, il faut repartir de `main`, creer une nouvelle branche, rediger un nouveau Development Plan, puis suivre tout le cycle commit, Pull Request et merge vers `main`.

## Frontend Et UX

- Mobile-first pour le parcours cliente.
- Interface cliente chaleureuse, propre, raffinee, centree produit.
- Admin plus dense, plus utilitaire, facile a scanner.
- Les boutons principaux doivent etre faciles a toucher sur mobile.
- Les cartes produit ne doivent pas afficher de longues descriptions.
- Les etats vides, erreurs et indisponibilites doivent etre clairs.
- Ne pas transformer le catalogue en landing page marketing.
- Ne pas afficher le stock exact cote cliente.

## Verification

Commandes utiles :

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:seed`

Avant de terminer un changement significatif :

- lancer `npm run lint` si le changement touche TypeScript ou React ;
- lancer `npm run build` si le changement touche routes, actions serveur, Prisma, CSS global ou configuration ;
- mettre a jour `docs/development-plans/tickets.md` et `docs/development-plans/status.md` si un ticket ou lot change d'etat ;
- utiliser `docs/testing/test-plan.md` pour la validation V1 ;
- verifier que le travail correspond aux specs ;
- effectuer les tests necessaires.

## A Eviter

- Construire une marketplace.
- Ajouter le paiement en ligne en V1.
- Demander une connexion cliente.
- Afficher la quantite exacte en stock aux clientes.
- Exposer telephone, adresse ou notes admin sur une page publique.
- Ajouter de gros refactors sans lien avec la phase en cours.
- Modifier les specs, la roadmap ou les plans sans garder le code coherent avec eux.
