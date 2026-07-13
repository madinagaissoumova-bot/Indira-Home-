# Plan - Arrondi photo fiche produit

## Objectif

Adoucir tres legerement la grande photo de fiche produit avec un arrondi discret, sans recreer d'effet cadre.

## Perimetre valide

- Ajouter un petit `border-radius` sur la grande photo de fiche produit.
- Garder le fond transparent autour de l'image.
- Ne pas remettre de bordure, ombre ou padding.
- Verifier desktop et mobile.

## Hors perimetre

- Aucun changement de layout general.
- Aucun changement produit.
- Aucun changement panier, checkout ou commande.
- Aucun changement admin.

## Validation prevue

- Verification locale desktop/mobile.
- `npm run lint`
- `npm test`
- `npm run build`

## Resultat provisoire

- La grande photo de fiche produit utilise un arrondi discret de `4px`.
- Aucun fond, cadre, padding ou ombre n'a ete ajoute autour de l'image.
- Le rendu desktop et mobile a ete verifie par captures Playwright sur `/product/stolovyi-serviz-pink-floral-32`.

## Validation realisee

- Route produit locale `/product/stolovyi-serviz-pink-floral-32` : HTTP 200.
- Captures Playwright desktop et mobile : rendu conforme, arrondi discret, pas de cadre visible.
- `npm run lint` : OK.
- `npm test` : OK, 37 tests passes, 1 test integration DB ignore sans `RUN_DB_INTEGRATION=1`.
- `npm run check:docs` : OK.
- `npm run build` : OK.
