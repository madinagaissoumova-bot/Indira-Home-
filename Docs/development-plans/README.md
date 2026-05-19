# Development Plans - Indira Home

Ce dossier transforme la roadmap en plans de developpement executables.

Chaque plan de lot contient :

- objectif du lot ;
- dependances ;
- tickets de developpement proposes ;
- fichiers ou zones probables ;
- validations attendues ;
- risques a surveiller.

## Ordre recommande

1. `lot-0-base-donnees.md`
2. `lot-1-catalogue-client.md`
3. `lot-2-fiche-produit-panier.md`
4. `lot-3-commande-client.md`
5. `lot-4-auth-dashboard-admin.md`
6. `lot-5-admin-catalogue.md`
7. `lot-6-admin-stock.md`
8. `lot-7-admin-commandes.md`
9. `lot-8-polish-verification.md`

## Suivi actif / termine

Le statut courant des plans est suivi dans `status.md`.

Le backlog detaille des tickets est suivi dans `tickets.md`.

Pour changer un lot en `TERMINE`, verifier d'abord :

- les criteres de sortie du plan de lot ;
- les criteres d'acceptation des fiches feature liees ;
- la checklist pertinente de `Docs/test-plan.md`.

## Documents operationnels

| Fichier | Role |
| --- | --- |
| `status.md` | Suivi actif, termine, a faire ou bloque par lot |
| `tickets.md` | Backlog priorise par ticket |
| `production-plan.md` | Plan de mise en production, sauvegarde et rollback |
| `security-checklist.md` | Checklist securite minimale V1 |
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
