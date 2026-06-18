# Plan - Restaurer Les Dossiers De Plans

## Objectif

Revenir a une organisation avec un dossier de plans en cours et un dossier de plans termines.

## Etapes

- [x] 1. Creer `docs/development-plans/en-cours/`.
- [x] 2. Creer `docs/development-plans/termines/`.
- [x] 3. Ajouter une explication simple dans `docs/development-plans/README.md`.
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

- `docs/changelog/` : historique des changements livres ;
- `docs/development-plans/en-cours/` : grands lots, statut projet et plans de travail actifs ;
- `docs/development-plans/termines/` : plans de travail termines.
