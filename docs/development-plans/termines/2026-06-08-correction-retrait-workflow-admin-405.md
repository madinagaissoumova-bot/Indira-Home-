# Plan - Correction retrait workflow hors perimetre ADMIN-405

## Objectif

Retirer du merge `ADMIN-405` les modifications de workflow ajoutees dans `AGENTS.md` et `docs/development-plans/README.md`, car elles auraient du etre traitees dans une branche et une Pull Request dediees.

## Perimetre

- Supprimer uniquement les paragraphes ajoutes sur les alternatives a `gh` pour l'ouverture de Pull Request.
- Conserver intacte l'implementation `ADMIN-405` de limitation des tentatives de connexion admin.
- Conserver intact le nettoyage `.gitignore`.

## Hors perimetre

- Modifier l'auth admin.
- Modifier les statuts de tickets.
- Reintroduire la regle workflow dans cette branche.

## Fichiers concernes

- `AGENTS.md`
- `docs/development-plans/README.md`

## Validation attendue

- Les deux paragraphes hors perimetre sont retires.
- `npm run check:docs` passe.
- Le correctif est livre dans une branche et une Pull Request dediees vers `develop`.

## Validation effectuee

- Branche dediee `correction-retrait-workflow-admin-405` creee depuis `develop`.
- Paragraphes hors perimetre retires de `AGENTS.md` et `docs/development-plans/README.md`.
- Implementation `ADMIN-405` et `.gitignore` conserves.
- `npm run check:docs` passe.
