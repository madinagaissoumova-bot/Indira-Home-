# Development Plans - Indira Home

Ce dossier transforme la roadmap en plans de developpement executables.

## Organisation

- `en-cours/` : plans actifs, lots encore ouverts et verifications en attente.
- `termines/` : plans termines et verifies.
- `../project-management/` : tickets, statut projet et plan de production.
- `../security/` : checklist securite V1.

La racine de `docs/development-plans/` ne doit contenir que ce `README.md` et les sous-dossiers d'organisation. Ne pas y copier de plans de lot, de tickets, de statut, de plan de production ou de checklist securite.

Les nouveaux plans de travail quotidiens se creent dans `en-cours/`, puis se deplacent dans `termines/` une fois verifies.

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
5. `en-cours/lot-4-auth-dashboard-admin.md`
6. `en-cours/lot-5-admin-catalogue.md`
7. `en-cours/lot-6-admin-stock.md`
8. `en-cours/lot-7-admin-commandes.md`
9. `termines/lot-8-polish-verification.md`

## Suivi actif / termine

Le statut courant des plans est suivi dans `../project-management/status.md`.

Le backlog detaille des tickets est suivi dans `../project-management/tickets.md`.

Pour changer un lot en `TERMINE`, verifier d'abord :

- les criteres de sortie du plan de lot ;
- les criteres d'acceptation des fiches feature liees ;
- la checklist pertinente de `docs/testing/test-plan.md`.

## Documents operationnels

| Fichier | Role |
| --- | --- |
| `../project-management/status.md` | Suivi actif, termine, a faire ou bloque par lot |
| `../project-management/tickets.md` | Backlog priorise par ticket |
| `../project-management/production-plan.md` | Plan de mise en production, sauvegarde et rollback |
| `../security/security-checklist.md` | Checklist securite minimale V1 |
| `../specs/content/ru-copy.md` | Base des textes russes cote cliente |

## Regle d'utilisation

Avant de commencer un ticket :

1. Lire la fiche feature liee.
2. Verifier les constantes dans `lib/constants.ts`.
3. Garder les changements limites au lot en cours.
4. Mettre a jour les specs seulement si l'implementation revele une incoherence.

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
