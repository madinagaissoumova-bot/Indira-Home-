# Plan - Supprimer le glossaire inutile

## Objectif

Supprimer `docs/specs/glossary.md`, devenu un document generaliste non reference et sans regle produit, technique, UX ou metier utile pour la V1.

## Perimetre

- Supprimer `docs/specs/glossary.md`.
- Verifier qu'aucune reference active ne depend de ce fichier.
- Conserver les specs produit, techniques, visuelles et de validation.

## Hors perimetre

- Aucun changement de comportement produit.
- Aucun changement de code applicatif.
- Aucun changement du changelog par zones.

## Validation Du Plan

- [x] Le besoin a ete discute dans la conversation.
- [x] Le perimetre a ete valide explicitement par l'utilisatrice.
- [x] Une branche dediee a ete creee depuis `main`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/` sur la branche dediee.

## Etapes

- [x] 1. Verifier le contenu et les references au glossaire.
- [x] 2. Supprimer `docs/specs/glossary.md`.
- [x] 3. Verifier.
- [x] 4. Deplacer ce plan dans `docs/development-plans/termines/`.
- [x] 5. Creer un commit clair.
- [x] 6. Pousser la branche sur GitHub.
- [x] 7. Ouvrir une Pull Request vers `main`.
- [ ] 8. Attendre la validation explicite de l'utilisatrice.
- [ ] 9. Merger la Pull Request.

## Verification

- [x] `npm run check:docs`
- [x] `npm test`

## Notes

Pull Request ouverte : https://github.com/madinagaissoumova-bot/Indira-Home-/pull/19
