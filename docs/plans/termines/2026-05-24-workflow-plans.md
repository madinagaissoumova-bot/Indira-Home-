# Plan - Workflow Avec Plan Actif

## Objectif

Mettre en place une methode de travail ou chaque changement significatif commence par un plan, puis se termine par une verification avant push GitHub.

## Contexte

- Zone concernee : organisation projet et consignes agent.
- Regles importantes : ne pas pousser sur GitHub tant que le plan en cours n'est pas termine.
- Fichiers/specs lus : `AGENTS.md`, structure `docs/`.

## Etapes

- [x] 1. Creer la structure `docs/plans/en-cours/` et `docs/plans/termines/`.
- [x] 2. Ajouter un modele de plan reutilisable.
- [x] 3. Ajouter les regles de workflow dans `AGENTS.md`.
- [x] 4. Verifier que les protections docs passent.
- [x] 5. Pousser sur GitHub.

## Verification

- [x] `npm run check:docs`
- [ ] `npm test` - non lance, changement documentaire seulement.
- [ ] `npm run lint` - non lance, changement documentaire seulement.
- [ ] `npm run build` - non lance, changement documentaire seulement.

## Notes

A partir de ce changement, le workflow standard est : plan en cours, execution, verification, plan termine, puis push GitHub.

Commit associe : voir le dernier commit Git apres push.
