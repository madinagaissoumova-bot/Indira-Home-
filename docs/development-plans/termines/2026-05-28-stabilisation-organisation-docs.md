# Stabilisation Organisation Docs - 2026-05-28

## Objectif

Regler durablement les doublons et ambiguities dans l'organisation documentaire du projet.

## Constat

- Des plans de lots actifs existaient a la fois dans `docs/development-plans/` et dans `docs/development-plans/en-cours/`.
- Des fichiers de suivi projet existaient au mauvais endroit dans `docs/development-plans/` alors que leur emplacement canonique est `docs/project-management/`.
- La checklist securite existait au mauvais endroit dans `docs/development-plans/` alors que son emplacement canonique est `docs/security/`.

## Regle cible

- `docs/development-plans/en-cours/` contient les plans actifs.
- `docs/development-plans/termines/` contient les plans termines.
- `docs/project-management/` contient `status.md`, `tickets.md` et `production-plan.md`.
- `docs/security/` contient `security-checklist.md`.
- La racine de `docs/development-plans/` ne contient que `README.md` et les sous-dossiers d'organisation.

## Actions realisees

- Suppression des copies de plans et fichiers de suivi a la racine de `docs/development-plans/`.
- Renforcement des README pour expliciter les sources canoniques.
- Ajout d'une verification automatisee dans `tests/documentation-structure.test.ts`.
- Ajout d'un hook Git local versionne dans `.githooks/pre-commit`.
- Activation locale de `core.hooksPath` vers `.githooks`.

## Validation

- `npm run check:docs` : OK.
- Hook pre-commit local : actif via `core.hooksPath=.githooks`.
- `git status --short` : plus de doublons documentaires a la racine de `docs/development-plans/`.
