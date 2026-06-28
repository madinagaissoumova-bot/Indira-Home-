# Plan - Revoir les feature specs

## Objectif

Nettoyer les feature specs les plus melangees pour retirer les doublons avec les specs fondatrices, les regles techniques ou les autres feature specs, sans changer le comportement V1.

## Perimetre

- Revoir `docs/specs/feature-specs/admin-dashboard.md`.
- Revoir `docs/specs/feature-specs/admin-produits.md`.
- Revoir `docs/specs/feature-specs/admin-stock.md`.
- Revoir `docs/specs/feature-specs/admin-commandes.md`.
- Revoir `docs/specs/feature-specs/admin-auth.md`.
- Revoir `docs/specs/feature-specs/categories-sous-categories.md`.
- Revoir `docs/specs/feature-specs/validation-commande.md`.
- Corriger les recoupements les plus nets avec `functional-map.md`, `validation-rules.md`, `technical/routes-navigation.md` et `technical/admin-auth.md`.

## Hors perimetre

- Aucun changement de code.
- Aucun changement de comportement V1.
- Pas de refonte des specs cliente deja propres dans cette passe.

## Risques

- Ces fichiers se recoupent fortement sur le stock, les statuts et la navigation admin.
- Certaines regles devront rester dans un seul fichier source de verite pour eviter les repetitions.

## Verification

- `npm run check:docs`
- `git diff --check`
- Verifier que chaque regle retiree existe encore dans le bon fichier source.
