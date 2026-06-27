# Plan - Nettoyer AGENTS.md

## Objectif

Rendre `AGENTS.md` plus clair en le limitant aux instructions de travail pour les agents, sans dupliquer les specifications produit deja presentes dans `docs/specs/`.

## Perimetre

- Remplacer la liste de documents de la section `Sources De Verite` par une regle generale demandant de lire toutes les specs avant toute action ou changement.
- Retirer de `AGENTS.md` les sections qui decrivent le produit lui-meme, les parcours, routes, statuts, regles metier ou criteres fonctionnels.
- Retirer de `AGENTS.md` le workflow Development Plan detaille et les regles d'implementation qui doivent etre portees par les specs ou les skills.
- Garder dans `AGENTS.md` les informations de mission courte, stack, sources de verite, skills a utiliser et verification minimale.
- Renvoyer explicitement vers `docs/specs/` pour les comportements produit, parcours, routes, statuts, regles metier, UX et criteres de validation.
- Lister les skills utiles et indiquer quand les utiliser, sans recopier leur contenu detaille.
- Reduire la section verification a une consigne generale qui renvoie aux specs et aux tests.
- Versionner les skills utiles dans `codex-skills/` pour que GitHub garde une copie portable sans chemin local vers la machine de l'utilisatrice.

## Hors perimetre

- Aucun changement de code applicatif.
- Aucun changement de comportement produit.
- Aucun changement des specs produit existantes.

## Verifications

- Verifier que les informations retirees de `AGENTS.md` sont deja couvertes par `docs/specs/`.
- Relire `AGENTS.md` pour confirmer qu'il reste un guide de travail et non une copie des specs.
