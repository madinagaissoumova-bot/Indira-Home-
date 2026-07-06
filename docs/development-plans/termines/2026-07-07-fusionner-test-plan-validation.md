# Fusionner le test plan dans les regles de validation

## Objectif

Supprimer le dossier `docs/testing/` en integrant la checklist utile de `docs/testing/test-plan.md` dans `docs/specs/validation-rules.md`.

## Perimetre

- Integrer les commandes et checklists de verification V1 dans `docs/specs/validation-rules.md`.
- Supprimer `docs/testing/test-plan.md`.
- Mettre a jour les references actives vers `docs/specs/validation-rules.md`.
- Adapter le test de structure documentaire.
- Mettre a jour le changelog par zones.

## Hors perimetre

- Ne pas modifier les tests automatiques dans `tests/`.
- Ne pas modifier le comportement applicatif.
- Ne pas supprimer les criteres de validation V1.

## Verification

- `npm run check:docs`
- `npm test`

## Resultat

- Checklist V1 integree dans `docs/specs/validation-rules.md`.
- `docs/testing/test-plan.md` supprime.
- Dossier `docs/testing/` retire de la structure documentaire attendue.
- References actives mises a jour vers `docs/specs/validation-rules.md`.
