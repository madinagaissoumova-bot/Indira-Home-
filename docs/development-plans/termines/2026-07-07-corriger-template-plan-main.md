# Corriger le template de plan vers main

## Objectif

Aligner `docs/development-plans/en-cours/TEMPLATE.md` avec le workflow actuel qui utilise `main` comme branche cible.

## Perimetre

- Remplacer les mentions de `develop` par `main` dans le template.
- Verifier qu'il n'y a pas d'autre incoherence evidente dans ce template.
- Mettre a jour le changelog documentation.

## Hors perimetre

- Ne pas modifier les plans termines historiques.
- Ne pas modifier le workflow global ailleurs.
- Ne pas toucher au code applicatif.

## Verification

- `npm run check:docs`

## Resultat

- `docs/development-plans/en-cours/TEMPLATE.md` pointe maintenant vers `main`.
- Changelog documentation mis a jour.
