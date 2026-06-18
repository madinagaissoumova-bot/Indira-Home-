# Remplacer la roadmap par un changelog

## Objectif

Remplacer la section documentaire `docs/roadmap/` par un changelog qui retrace
uniquement les changements deja realises sur Indira Home.

## Perimetre

- renommer `docs/roadmap/` en `docs/changelog/` ;
- remplacer le contenu de roadmap par un historique des livraisons V1 ;
- supprimer `v2.md` et toute programmation de changements futurs ;
- mettre a jour les references documentaires vers le nouveau dossier ;
- adapter le test qui protege la structure de `docs/`.

## Hors perimetre

- ajouter de nouvelles fonctionnalites ;
- modifier le comportement de l'application ;
- planifier une V2 ou de futurs travaux ;
- changer le statut des tickets ou des lots.

## Fichiers ou zones probables

- `docs/roadmap/`
- `docs/changelog/`
- `README.md`
- `AGENTS.md`
- `docs/README.md`
- `docs/specs/technical/README.md`
- `docs/development-plans/README.md`
- `tests/documentation-structure.test.ts`

## Validations attendues

- aucun dossier `docs/roadmap/` ne subsiste ;
- aucune reference active vers `docs/roadmap/` ne subsiste ;
- le changelog ne contient que des changements deja realises ;
- aucun contenu de planification V2 n'est conserve dans le changelog ;
- le test de structure documentaire passe ;
- `npm run check:docs` et `npm test` passent.

## Risques a surveiller

- laisser une reference obsolete vers la roadmap ;
- presenter un changement futur comme deja livre ;
- dupliquer le suivi detaille deja conserve dans les Development Plans.

## Resultat

- `docs/roadmap/` a ete remplace par `docs/changelog/` ;
- le changelog retrace uniquement les fonctionnalites et stabilisations V1 deja
  realisees ;
- `v2.md` et les projections de changements futurs ont ete supprimes ;
- les index, consignes et tests documentaires utilisent le nouveau chemin ;
- `npm run check:docs` passe avec 5 tests ;
- `npm test` passe avec 33 tests et 1 test d'integration ignore par defaut.
