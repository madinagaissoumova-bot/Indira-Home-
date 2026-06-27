# Plan - Clarifier les specs visuelles

## Objectif

Nettoyer `docs/specs/visual-rules.md` pour qu'il contienne uniquement les regles de direction visuelle, sans melanger les specs fonctionnelles, produit, routes ou contenu.

## Perimetre

- Reorganiser `docs/specs/visual-rules.md`.
- Retirer de `visual-rules.md` les doublons deja couverts par les feature specs, `docs/specs/technical/routes-navigation.md`, `docs/specs/content/ru-copy.md` ou `docs/specs/validation-rules.md`.
- Deplacer les regles visuelles specifiques au catalogue vers `docs/specs/feature-specs/catalogue-produits.md`.
- Ajouter une definition claire du role de `visual-rules.md`.
- Mettre a jour les references si necessaire.

## Hors perimetre

- Aucun changement de code applicatif.
- Aucun changement de comportement produit.
- Aucun changement de design reel.

## Verification

- Verifier que les regles retirees existent deja dans les specs adaptees.
- Lancer `npm run check:docs`.
