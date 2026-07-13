# Plan - Supprimer les README et ru-copy

## Objectif

Supprimer les fichiers `README.md` suivis par Git et supprimer `docs/specs/content/ru-copy.md`, maintenant que les textes russes visibles sont centralises dans `lib/i18n/ru.ts`.

## Perimetre

- Supprimer tous les fichiers nommes `README.md` suivis par Git.
- Supprimer `docs/specs/content/ru-copy.md`.
- Retirer les references actives restantes a `ru-copy.md`.
- Ajuster les tests documentaires pour interdire le retour de fichiers `README.md`.

## Hors perimetre

- Aucun changement de comportement produit.
- Aucun changement des textes russes applicatifs dans `lib/i18n/ru.ts`.
- Aucun changement des routes ou des regles metier.

## Validation Du Plan

- [x] Le besoin a ete discute dans la conversation.
- [x] Le perimetre a ete valide explicitement par l'utilisatrice.
- [x] Une branche dediee a ete creee depuis `main`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/` sur la branche dediee.

## Etapes

- [x] 1. Lister les README suivis par Git et les references a `ru-copy.md`.
- [x] 2. Supprimer les fichiers README et `ru-copy.md`.
- [x] 3. Ajuster les references actives et tests documentaires.
- [x] 4. Verifier.
- [x] 5. Deplacer ce plan dans `docs/development-plans/termines/`.
- [x] 6. Creer un commit clair.
- [x] 7. Pousser la branche sur GitHub.
- [x] 8. Ouvrir une Pull Request vers `main`.
- [x] 9. Attendre la validation explicite de l'utilisatrice.
- [x] 10. Merger la Pull Request.

## Verification

- [x] `npm run check:docs`
- [x] `npm test`

## Notes

Pull Request ouverte : https://github.com/madinagaissoumova-bot/Indira-Home-/pull/17
