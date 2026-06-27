# AGENTS.md

## Mission

Ce projet est **Indira Home**, une V1 e-commerce simple pour une boutique de vaisselle et de produits maison en Republique tchetchene.

Le comportement produit, les parcours, les routes, les statuts, les regles metier, l'UX, les criteres de validation et les textes visibles sont definis dans `docs/specs/`.

## Stack

- Framework : Next.js App Router
- Langage : TypeScript
- ORM : Prisma
- Base : Supabase PostgreSQL
- Styles : CSS global dans `app/globals.css`
- Types partages : `types/`
- Donnees metier : constantes dans `lib/constants.ts`

## Sources De Verite

Avant de faire un changement, une action ou une modification quelconque sur le projet, lire toutes les specs du projet dans `docs/specs/`.

Si le code et les specs se contredisent, preferer les specs, puis aligner le code ou les docs pour garder le projet coherent.

## Regles D'Implementation

- Suivre le workflow Development Plan defini ci-dessous pour tout nouveau sujet de travail.
- Garder les changements concentres sur le besoin en cours.
- Preferer les patterns deja presents dans le projet.
- Ne pas ajouter de grosse abstraction sans benefice clair.
- Mettre les types reutilisables dans `types/`.
- Garder les types strictement locaux dans le composant ou le module concerne.
- Appliquer les constantes, routes, statuts, regles serveur et contraintes produit definis dans `docs/specs/`.
- Ne pas ajouter de comportement hors specs sans nouveau plan valide.

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

- Ajouter de gros refactors sans lien avec la phase en cours.
- Dupliquer dans `AGENTS.md` des informations qui appartiennent aux specs produit.
- Modifier les specs, le changelog ou les plans sans garder le code coherent avec eux.
