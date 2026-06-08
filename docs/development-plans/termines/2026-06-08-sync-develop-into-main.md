# Plan - Synchroniser develop vers main

## Objectif

Integrer dans `main` le travail deja valide et present dans `develop`, afin que `main` devienne la branche complete de reference avant de basculer le workflow futur vers `main`.

## Perimetre

- Creer une branche dediee depuis `main`.
- Integrer l'etat actuel de `develop`.
- Conserver les changements deja valides dans `develop`, dont `ADMIN-405`, les corrections checkout/stock et les plans termines.
- Ouvrir une Pull Request vers `main`.

## Hors perimetre

- Modifier le workflow permanent dans `AGENTS.md`.
- Ajouter de nouvelles fonctionnalites.
- Nettoyer les branches anciennes.

## Fichiers ou zones probables

- Tous les fichiers differents entre `main` et `develop`.
- `docs/development-plans/`.

## Validation attendue

- La branche contient l'etat de `develop` au-dessus de `main`.
- `npm run check:docs` passe.
- `npm run lint` passe.
- `npm run build` passe.
- Une Pull Request est ouverte vers `main`.

## Validation effectuee

- Branche dediee `sync-develop-into-main` creee depuis `main`.
- `origin/develop` integre dans la branche sans conflit.
- Le plan actif a ete deplace dans `termines`.
- `npm run check:docs` passe.
- `npm run lint` passe.
- `npm run build` passe.
