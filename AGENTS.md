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

## Skills A Utiliser

- `development-plan-workflow` : utiliser pour tout travail qui demande un plan, une branche, un commit, une Pull Request, un merge ou une validation explicite avant implementation.
- `indira-spec-workflow` : utiliser pour tout changement lie aux specs, au comportement produit, aux routes, aux regles metier, aux plans, aux tickets ou a la coherence globale Indira Home.
- `frontend-ux` : utiliser pour ameliorer l'ergonomie frontend, les parcours, la navigation, les formulaires, les libelles, les etats vides, erreurs, chargements et confirmations.
- `mobile-first` : utiliser pour concevoir, corriger ou verifier une interface en partant du mobile, des petits ecrans, des actions tactiles et du responsive.
- `indira-client-flow` : utiliser pour le parcours cliente Indira Home, notamment catalogue, categories, fiche produit, panier, checkout, confirmation et confidentialite.
- `indira-admin-flow` : utiliser pour l'espace admin Indira Home, notamment authentification, dashboard, produits, categories, stock et commandes.
- `indira-design-system` : utiliser seulement quand le sujet concerne l'identite visuelle ou les regles graphiques specifiques a Indira Home.
- `indira-qa-release` : utiliser pour les verifications V1, tests, securite, production, release readiness ou controle final.

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

- Dupliquer dans `AGENTS.md` des informations qui appartiennent aux specs produit.
- Recopier dans `AGENTS.md` le contenu detaille des skills.
