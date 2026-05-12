# Nouveau projet

Ce dépôt démarre en mode **Specification-Driven Development** : les décisions produit et techniques sont écrites avant l'implémentation, puis le code est construit pour satisfaire ces spécifications.

## Chemin de specification

1. `specs/global-spec.md` : description simple du projet, qui l'utilise, pourquoi, quel probleme il resout, ou ca se passe.
2. `specs/function-map.md` : liste de tout ce que les utilisatrices peuvent faire, sans design ni technique.
3. `specs/feature-specs/` : une fiche detaillee par fonctionnalite.
4. `specs/technical-specs.md` : pages, composants, base de donnees, API, navigation.
5. `specs/visual-rules.md` : style, couleurs, boutons, cartes, responsive mobile.
6. `specs/user-stories.md` : verification des parcours comme une vraie utilisatrice.
7. `specs/work-plan.md` : plan de developpement progressif avant de coder.

## Principe de travail

- Une fonctionnalité commence par une specification.
- Une specification doit avoir des critères d'acceptation vérifiables.
- Une décision importante doit être tracée dans `specs/adr/`.
- Le code ne doit pas introduire de comportement non décrit ou non accepté.
