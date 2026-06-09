# Plan - Workflow main obligatoire

## Objectif

Faire de `main` la branche officielle de reference pour tous les prochains sujets de travail et rendre explicite le cycle obligatoire : nouvelle branche, nouveau Development Plan, execution du plan, commit, Pull Request vers `main`, validation, merge.

## Perimetre

- Mettre a jour `AGENTS.md`.
- Mettre a jour `docs/development-plans/README.md`.
- Remplacer les mentions de branches de travail depuis `develop` par `main`.
- Rendre explicite qu'une petite correction, une correction documentaire ou une correction de methode est un nouveau sujet si elle n'est pas dans le plan actif.
- Rendre explicite le retour sur `main` et la synchronisation locale apres merge.

## Hors perimetre

- Modifier le code applicatif.
- Nettoyer des branches anciennes.
- Modifier les tickets ou statuts fonctionnels.
- Merger sans validation explicite.

## Validation attendue

- Les documents de workflow indiquent que les nouvelles branches partent de `main`.
- Les Pull Requests visent `main`.
- La regle "un sujet = une branche = un plan = une Pull Request" est explicite, y compris pour les corrections mineures.
- `npm run check:docs` passe.

## Validation effectuee

- Branche dediee `workflow-main-obligatoire` creee depuis `main`.
- `AGENTS.md` indique que chaque nouveau sujet part de `main` et ouvre une Pull Request vers `main`.
- `docs/development-plans/README.md` indique le meme cycle de travail vers `main`.
- Les corrections mineures, documentaires ou de methode sont explicitees comme de nouveaux sujets si elles ne sont pas dans le plan actif.
- `npm run check:docs` passe.
