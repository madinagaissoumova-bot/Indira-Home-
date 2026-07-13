# Plan - Corriger cadre photo fiche produit

## Objectif

Rendre la photo produit plus naturelle et premium sur les fiches produits en retirant l'effet de cadre trop visible autour de la grande image.

## Perimetre valide

- Alleger ou supprimer le cadre trop present autour de la grande photo.
- Reduire l'effet boite autour de l'image.
- Garder une image grande, propre et bien alignee.
- Verifier le rendu desktop et mobile.

## Hors perimetre

- Aucun changement produit.
- Aucun changement de prix, panier, checkout ou commande.
- Aucun changement de textes metier.
- Aucun changement admin.

## Validation prevue

- Verification locale de la fiche produit.
- `npm run lint`
- `npm test`
- `npm run build`

## Resultat provisoire

- Le fond, la bordure et le padding de cadre autour de la grande photo produit ont ete retires sur la fiche produit.
- La grande photo garde son format et reste alignee avec le panneau d'achat.
- Le rendu desktop et mobile a ete verifie par captures Playwright sur `/product/stolovyi-serviz-pink-floral-32`.

## Validations effectuees

- Fiche produit locale `/product/stolovyi-serviz-pink-floral-32` : HTTP 200.
- Captures Playwright desktop et mobile : OK.
- `npm run lint` : OK.
- `npm test` : OK, 37 tests passes, 1 integration DB ignoree sans `RUN_DB_INTEGRATION=1`.
- `npm run check:docs` : OK.
- `npm run build` : OK.
