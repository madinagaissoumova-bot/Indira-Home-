---
name: mobile-first
description: Concevoir, implementer ou auditer les interfaces en partant d'abord de l'experience telephone. Utiliser quand l'utilisateur demande une UI mobile-first, des layouts penses pour telephone, une meilleure ergonomie mobile, un responsive depuis les petits ecrans, de meilleures zones tactiles, une navigation mobile ou des parcours mobile pour validation commande, formulaire ou catalogue.
---

# Priorite Mobile

Utiliser ce skill quand l'experience mobile doit guider les decisions d'interface, et pas seulement etre adaptee apres le desktop.

## Processus

1. Commencer par la tache mobile principale et le plus petit viewport pratique.
2. Placer le contenu dans l'ordre utile sur telephone : identite, contexte, action principale, details secondaires.
3. Concevoir d'abord la structure en une colonne ; ajouter les layouts desktop multi-colonnes seulement apres validation du parcours mobile.
4. Prioriser le confort tactile, le texte lisible, les controles stables et les actions suivantes claires.
5. Verifier que le desktop n'a pas regresse apres les changements mobiles.

## Priorites Mobile

- Garder l'action principale facile a trouver.
- Preferer navigation compacte, drawers, controles segmentes et formulaires empiles sur petits ecrans.
- Eviter les hypotheses desktop uniquement : actions hover-only, grands tableaux, toolbars serrees ou formulaires cote a cote.
- Garder les zones tactiles confortables et separees.
- Garder les cartes produit, lignes de formulaire, compteurs et controles de toolbar dimensionnellement stables.
- Ne pas reduire le texte jusqu'a le rendre difficile a lire ; simplifier d'abord le layout.

## Verification

- Verifier aux largeurs telephone, tablette et desktop quand l'app peut tourner localement.
- Inspecter debordements, labels coupes, retours a la ligne, elements a largeur fixe et scroll horizontal.
- Tester le parcours principal avec des longueurs de contenu realistes.
- Confirmer que les etats vide, chargement, erreur, desactive et succes restent utilisables sur mobile.

## Garde-Fous

- Ne pas transformer un catalogue, tableau de bord, formulaire ou outil en page marketing sous pretexte de mobile.
- Ne pas cacher les informations critiques derriere des icones faibles ou des controles non expliques.
- Ne pas resoudre les problemes mobiles en supprimant une fonctionnalite requise.
