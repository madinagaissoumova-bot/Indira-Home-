# Development Plans - Indira Home

Ce dossier transforme la roadmap en plans de developpement executables.

## Organisation

- `en-cours/` : plans actifs, lots encore ouverts et verifications en attente.
- `termines/` : plans termines et verifies.
- `status.md` : statut courant des lots.
- `tickets.md` : backlog priorise et etat des tickets.
- `../specs/technical/` : specs techniques, Supabase, production, sauvegarde, rollback et securite.

La racine de `docs/development-plans/` contient seulement les fichiers de suivi (`README.md`, `status.md`, `tickets.md`) et les sous-dossiers d'organisation. Ne pas y copier de plans de lot, de plan de production ou de checklist securite.

Apres validation avec l'utilisatrice et creation de la branche dediee, les nouveaux plans de travail se creent dans `en-cours/`, puis se deplacent dans `termines/` une fois verifies.

Chaque plan de lot contient :

- objectif du lot ;
- dependances ;
- tickets de developpement proposes ;
- fichiers ou zones probables ;
- validations attendues ;
- risques a surveiller.

## Ordre recommande

1. `termines/lot-0-base-donnees.md`
2. `termines/lot-1-catalogue-client.md`
3. `termines/lot-2-fiche-produit-panier.md`
4. `termines/lot-3-commande-client.md`
5. `termines/lot-4-auth-dashboard-admin.md`
6. `termines/lot-5-admin-catalogue.md`
7. `termines/lot-6-admin-stock.md`
8. `termines/lot-7-admin-commandes.md`
9. `termines/lot-8-polish-verification.md`

## Suivi actif / termine

Le statut courant des plans est suivi dans `status.md`.

Le backlog detaille des tickets est suivi dans `tickets.md`.

Pour changer un lot en `TERMINE`, verifier d'abord :

- les criteres de sortie du plan de lot ;
- les criteres d'acceptation des fiches feature liees ;
- la checklist pertinente de `docs/testing/test-plan.md`.

## Documents operationnels

| Fichier | Role |
| --- | --- |
| `status.md` | Suivi actif, termine, a faire ou bloque par lot |
| `tickets.md` | Backlog priorise par ticket |
| `../specs/technical/production-plan.md` | Plan de mise en production, sauvegarde et rollback |
| `../specs/technical/security-checklist.md` | Checklist securite minimale V1 |
| `../specs/content/ru-copy.md` | Base des textes russes cote cliente |

## Regle d'utilisation

Pour chaque nouveau Development Plan :

1. Discuter du besoin et rediger le contenu du plan avec l'utilisatrice dans la conversation.
2. Attendre la validation explicite du plan par l'utilisatrice.
3. Creer une nouvelle branche depuis `develop`, avec un nom qui correspond au plan.
4. Enregistrer le plan valide dans `en-cours/` sur cette branche.
5. Lire les specs et tickets lies.
6. Garder les changements limites au plan actif.
7. Mettre a jour les specs si l'implementation revele une incoherence.

## Cycle De Livraison

Un Development Plan actif correspond toujours a une nouvelle branche Git et a une Pull Request.

Quand le travail est termine :

1. Verifier le comportement, les specs, les tests et les documents de suivi.
2. Deplacer le plan dans `termines/`.
3. Creer un commit clair.
4. Pousser la branche sur GitHub.
5. Ouvrir une Pull Request vers `develop`.
6. Attendre la validation explicite de l'utilisatrice.
7. Merger la Pull Request.

Un seul plan peut etre actif a la fois, sauf instruction contraire explicite. Chaque nouveau plan doit creer une branche qui n'existait pas auparavant, meme si une branche existante concerne le meme sujet ou porte un nom proche. Plusieurs plans independants ne doivent pas etre regroupes dans la meme Pull Request.

## Definition commune de fin de ticket

Un ticket est termine quand :

- le comportement attendu est implemente ;
- les regles serveur critiques sont appliquees cote serveur ;
- les textes visibles par les clientes sont en russe ;
- l'interface fonctionne sur mobile si elle est cote cliente ;
- `npm run build` passe avant livraison d'un lot complet ;
- les regressions evidentes du lot precedent sont verifiees.

## Types de tickets

- `DATA` : schema, seed, constantes, acces donnees.
- `PUBLIC` : experience cliente.
- `ADMIN` : espace admin.
- `SERVER` : actions serveur, validation, transactions.
- `UI` : composants, styles, responsive.
- `QA` : verification, tests, polish.

## Jalons V1

| Jalon | Lots inclus | Resultat |
| --- | --- | --- |
| M1 - Catalogue consultable | Lots 0, 1 | Produits visibles, categories, recherche, filtres |
| M2 - Commande cliente | Lots 2, 3 | Panier et commande fonctionnels |
| M3 - Admin protege | Lot 4 | Connexion admin et dashboard |
| M4 - Admin operationnel | Lots 5, 6, 7 | Produits, categories, stock, commandes gerables |
| M5 - V1 livrable | Lot 8 | Mobile, contenu russe, verification finale |
