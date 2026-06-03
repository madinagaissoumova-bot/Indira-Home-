# Stabilisation Organisation Docs - 2026-05-28

## Objectif

Regler durablement les doublons et ambiguities dans l'organisation documentaire du projet.

## Constat

- Des plans de lots actifs existaient a la fois dans `docs/development-plans/` et dans `docs/development-plans/en-cours/`.
- Des fichiers de suivi projet existaient au mauvais endroit dans `docs/development-plans/`; apres simplification, leur emplacement canonique est revenu dans `docs/development-plans/`.
- La checklist securite existait au mauvais endroit dans `docs/development-plans/`; son emplacement canonique actuel est `docs/specs/technical/`.

## Regle cible

- `docs/development-plans/en-cours/` contient les plans actifs.
- `docs/development-plans/termines/` contient les plans termines.
- `docs/development-plans/` contient `status.md` et `tickets.md`.
- `docs/specs/technical/` contient `security-checklist.md`.
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
