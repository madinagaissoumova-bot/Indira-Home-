# Plan - Replacer les regles dans les bons fichiers

## Objectif

Remettre les regles documentaires dans les fichiers qui portent leur responsabilite propre, sans supprimer d'information necessaire.

## Perimetre

- Revoir `docs/specs/functional-map.md`.
- Revoir `docs/specs/technical/routes-navigation.md`.
- Revoir `docs/specs/feature-specs/validation-commande.md`.
- Revoir `docs/specs/feature-specs/confirmation-commande.md`.
- Revoir `docs/specs/feature-specs/confidentialite.md`.
- Revoir `docs/specs/technical/server-actions.md`.
- Revoir `docs/specs/technical/operations.md` si un renvoi technique est plus juste que la spec fonctionnelle.

## Hors perimetre

- Aucun changement de code.
- Aucun changement de comportement V1.
- Pas de nettoyage global de tous les fichiers tant que les regles ne sont pas clairement mal placees.

## Contraintes

- Ne pas supprimer une regle si elle n'existe pas deja dans un fichier plus adapte.
- Garder un seul endroit de reference pour chaque regle quand c'est possible.
- Preferer un simple renvoi plutot qu'une duplication inutile.

## Verification

- `npm run check:docs`
- `git diff --check`
- Verifier que les regles deplacees restent visibles dans le bon fichier.
