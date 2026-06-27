# Plan - Revoir les specs fondatrices

## Objectif

Nettoyer les specs de base du projet pour supprimer les doublons, les mélanges de responsabilité et les informations mal placees, sans changer le comportement produit.

## Perimetre

- Revoir `docs/specs/global-spec.md`.
- Revoir `docs/specs/functional-map.md`.
- Revoir `docs/specs/visual-rules.md`.
- Revoir `docs/specs/validation-rules.md`.
- Revoir les fichiers techniques transversaux qui portent des regles communes si necessaire.
- Corriger les renvois entre specs quand ils pointent au mauvais endroit.

## Hors perimetre

- Aucun changement de code.
- Aucun changement de comportement V1.
- Pas de refonte des feature specs dans cette passe, sauf si un lien ou un doublon impose une correction minimale.

## Risques

- Certaines regles peuvent etre dupliquees entre plusieurs fichiers ; il faudra choisir le bon fichier source de verite.
- `visual-rules.md` contient deja une retouche locale non commise ; elle fait partie de cette passe.

## Verification

- `npm run check:docs`
- `git diff --check`
- Verifier que chaque regle restante a bien un seul endroit prioritaire.
