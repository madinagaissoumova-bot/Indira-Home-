# ADR-0001: Utiliser le Specification-Driven Development

## Statut

Accepté

## Contexte

Le projet démarre sans code existant. Il est donc possible de définir le comportement attendu, les contraintes et les décisions avant l'implémentation.

## Décision

Le projet utilisera une approche Specification-Driven Development :

- Les besoins sont décrits dans `Docs/specs/`.
- Les exigences ont des identifiants stables.
- Les critères d'acceptation sont écrits avant le code.
- Les décisions techniques importantes sont enregistrées comme ADR.

## Conséquences

- Le démarrage est plus lent qu'un prototype immédiat.
- Les ambiguïtés sont visibles plus tôt.
- Les tests et l'implémentation peuvent être reliés aux exigences.

