# Plan - Structurer le changelog par zones de travail

## Objectif

Mettre en place un changelog organise par zones de travail pour enregistrer les travaux realises sur les differentes parties de l'application Indira Home.

## Perimetre

- Remplacer `docs/changelog/v1.md` par un index et des fichiers de zones de travail.
- Ajouter une convention simple pour les futures entrees de changelog.
- Reprendre l'historique V1 deja livre et le ranger dans les fichiers de zones proposes.

## Hors perimetre

- Aucun changement de comportement produit.
- Aucun changement de code applicatif.
- Aucun nouveau fichier `README.md`.
- Aucun planning de fonctionnalites futures.

## Validation Du Plan

- [x] Le besoin a ete discute dans la conversation.
- [x] Le perimetre a ete valide explicitement par l'utilisatrice.
- [x] Une branche dediee a ete creee depuis `main`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/` sur la branche dediee.

## Etapes

- [x] 1. Relire le changelog existant et les plans termines utiles.
- [x] 2. Reorganiser le changelog en fichiers par zones de travail.
- [x] 3. Verifier l'absence de README et la structure documentaire.
- [x] 4. Deplacer ce plan dans `docs/development-plans/termines/`.
- [x] 5. Creer un commit clair.
- [x] 6. Pousser la branche sur GitHub.
- [x] 7. Ouvrir une Pull Request vers `main`.
- [x] 8. Attendre la validation explicite de l'utilisatrice.
- [ ] 9. Merger la Pull Request.

## Verification

- [x] `npm run check:docs`
- [x] `npm test`

## Notes

Pull Request ouverte : https://github.com/madinagaissoumova-bot/Indira-Home-/pull/18
