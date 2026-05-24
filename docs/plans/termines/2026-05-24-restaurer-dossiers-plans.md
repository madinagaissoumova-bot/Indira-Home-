# Plan - Restaurer Les Dossiers De Plans

## Objectif

Revenir a une organisation avec un dossier de plans en cours et un dossier de plans termines.

## Etapes

- [x] 1. Creer `docs/plans/en-cours/`.
- [x] 2. Creer `docs/plans/termines/`.
- [x] 3. Ajouter une explication simple dans `docs/plans/README.md`.
- [x] 4. Ajouter un modele de plan.
- [x] 5. Mettre a jour `AGENTS.md`.
- [x] 6. Verifier.
- [ ] 7. Pousser sur GitHub.

## Verification

- [x] `npm run check:docs`
- [ ] `npm test` - non necessaire si changement documentaire seulement.
- [ ] `npm run lint` - non necessaire si changement documentaire seulement.
- [ ] `npm run build` - non necessaire si changement documentaire seulement.

## Notes

Separation retenue :

- `docs/roadmap/` : direction generale ;
- `docs/development-plans/` : grands lots et statut projet ;
- `docs/plans/` : plans de travail quotidiens.
