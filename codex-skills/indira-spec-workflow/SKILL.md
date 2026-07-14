---
name: indira-spec-workflow
description: Utiliser pour tout travail Indira Home qui peut toucher les specs, le changelog, les plans de developpement, les routes, le comportement produit, les regles de donnees ou le perimetre d'implementation. Garantit que les changements suivent la specification V1 et le plan actif.
---

# Processus Specs Indira

Utiliser ce skill pour le travail general Indira Home.

## Regle Centrale

Avant de changer un comportement important, lire d'abord les specs pertinentes. Si le code et les specs se contredisent, preferer les specs, puis aligner le code ou les specs.

## Contexte Projet

Indira Home est un site e-commerce simple pour produits maison en Republique tchetchene.

La V1 inclut :

- catalogue public ;
- navigation par categorie et sous-categorie ;
- fiche produit ;
- panier dans `localStorage` ;
- validation commande ;
- confirmation;
- admin protege ;
- gestion des produits, categories, stock et commandes.

La V1 exclut :

- comptes clientes ;
- paiement en ligne ;
- fonctionnement marketplace ;
- livraison hors Republique tchetchene.

## References Requises

Lire seulement ce qui est pertinent :

- `AGENTS.md`
- `docs/specs/global-spec.md`
- `docs/specs/functional-map.md`
- `docs/specs/work-plan.md`
- `docs/specs/technical/routes-navigation.md`
- `docs/specs/technical/data-model.md`
- `docs/changelog/index.md`
- fichiers pertinents dans `docs/changelog/zones/`
- fichiers pertinents dans `docs/specs/feature-specs/`

## Processus

1. Identifier la route, fonctionnalite ou le lot concerne.
2. Lire la specification fonctionnelle correspondante et la zone de changelog quand c'est utile.
3. Suivre le processus de plan de developpement dans `AGENTS.md`.
4. Garder les changements dans le plan actif sauf demande contraire de l'utilisateur.
5. Utiliser `lib/constants.ts` pour les statuts et modes de paiement.
6. Garder les textes visibles par les clientes en russe.
7. Ne pas ajouter de fonctionnalites hors perimetre V1.
8. Si le travail livre change l'historique documente, mettre a jour la zone de changelog correspondante.

## Regle De Livraison

`AGENTS.md` est la source de verite pour validation de plan, creation de branche, commit, push, Pull Request, validation utilisateur et merge.

Chaque nouveau plan de developpement exige une nouvelle branche. Ne jamais reutiliser une branche existante pour un nouveau plan, meme si le sujet est proche.

## Invariants Critiques

- Statuts produit : `DRAFT`, `PUBLISHED`, `HIDDEN`.
- Statuts de visibilite : `VISIBLE`, `HIDDEN`.
- Modes de paiement : `CASH_ON_DELIVERY`, `TRANSFER_AFTER_CONFIRMATION`.
- Statuts commande : `NEW`, `TO_CONFIRM`, `CONFIRMED`, `PREPARING`, `DELIVERED`, `CANCELLED`.
- Un produit commandable doit etre publie, dans une categorie et une sous-categorie visibles, avec stock superieur a 0.
- Un produit avec stock 0 reste visible s'il est publie, mais il ne peut pas etre commande.
- Le stock exact est reserve a l'admin.
- Les prix de commande sont figes a la validation.
- Le stock diminue seulement apres validation reussie de commande.
