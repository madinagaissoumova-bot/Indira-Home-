# Plan - Centraliser les textes russes

## Objectif

Retirer les traductions recopiees dans les specs et centraliser les textes visibles par les clientes dans une source i18n unique et portable, sans changer le comportement produit.

## Perimetre

- Deplacer ou conserver la source russe de l'application dans un dossier i18n cache du projet.
- Mettre a jour les imports de l'application pour utiliser cette source unique.
- Retirer des specs les tableaux de traductions exactes et les remplace par des renvois ou des regles de centralisation.
- Garder dans les specs les regles produit, pas les libelles exacts.

## Hors perimetre

- Aucun changement de comportement fonctionnel.
- Aucun changement de design.
- Aucun ajout de nouvelle langue.

## Validation Du Plan

- [x] Le besoin et le contenu du plan ont ete discutes dans la conversation.
- [x] Le perimetre du plan a ete valide explicitement par l'utilisatrice.
- [x] Une branche qui n'existait pas auparavant, portant un nom correspondant au plan, a ete creee depuis `main`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/` sur la branche dediee.

## Etapes

- [x] 1. Lire la structure i18n et les specs qui recopient des traductions.
- [x] 2. Deplacer la source i18n vers un dossier cache et mettre a jour les imports.
- [x] 3. Nettoyer les specs pour retirer les traductions exactes.
- [x] 4. Verifier.
- [ ] 5. Deplacer ce plan dans `docs/development-plans/termines/`.
- [ ] 6. Creer un commit clair.
- [ ] 7. Pousser la branche sur GitHub.
- [ ] 8. Ouvrir une Pull Request vers `main`.
- [ ] 9. Attendre la validation explicite de l'utilisatrice.
- [ ] 10. Merger la Pull Request.

## Verification

- [ ] `npm run check:docs`
- [ ] `npm run lint`
- [ ] `npm run build`

## Notes

La source i18n actuelle existe deja dans `lib/i18n/ru.ts`. Le travail consiste a la rendre invisible au niveau de l'arborescence courante et a supprimer les duplications de traduction dans les specs.
