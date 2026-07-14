---
name: frontend-ux
description: Ameliorer l'utilisabilite frontend, les interactions, la navigation, les formulaires, les parcours de conversion, les libelles, les retours, les etats de chargement et d'erreur, l'accessibilite pratique et les parcours responsive. Utiliser quand l'utilisateur demande une meilleure UX frontend, un parcours plus clair, une interface plus fluide, moins de friction, de meilleurs formulaires, de meilleurs etats ou un audit d'utilisabilite.
---

# Frontend UX

Utiliser ce skill quand le probleme concerne le fonctionnement de l'interface pour l'utilisateur : clarte, parcours, retours, ergonomie et confiance.

## Processus

1. Identifier l'objectif de l'utilisateur et la page ou le parcours qui le soutient.
2. Cartographier le chemin actuel : entree, points de decision, action, confirmation, recuperation.
3. Corriger la confusion avant la decoration : libelles, hierarchie, etat, navigation et retours.
4. Rendre les formulaires, boutons, tableaux, filtres et navigations previsibles.
5. Verifier avec des donnees realistes, des etats vides, des erreurs et le comportement mobile.

## Verifications UX

- L'action suivante est evidente et correctement nommee.
- Les actions principales et secondaires sont visuellement distinctes.
- Les formulaires expliquent les champs requis seulement quand c'est utile et affichent les erreurs pres des champs.
- Les etats chargement, vide, desactive, succes et echec sont presents et honnetes.
- La navigation permet d'avancer, de revenir et de sortir des impasses.
- Les textes d'interface correspondent a ce que le systeme fait vraiment.
- Le focus clavier, les labels, le contraste et les zones tactiles restent raisonnables.

## Conseils De Mise En Oeuvre

- Preferer l'amelioration des composants et patterns existants plutot que l'ajout d'un nouveau design system.
- Garder les changements proches du parcours concerne.
- Utiliser des icones seulement si elles clarifient l'action ; sinon utiliser des libelles directs.
- Eviter d'ajouter du texte explicatif dans l'app quand une meilleure structure ou de meilleurs libelles resolvent le probleme.
- Preserver les regles metier et la verite backend ; ne jamais laisser l'UX faire croire qu'une action a reussi avant que ce soit vrai.

## Garde-Fous

- Ne pas optimiser le visuel en laissant le parcours ambigu.
- Ne pas ajouter de nouvelles etapes sauf si elles retirent une confusion plus importante.
- Ne pas cacher des actions ou erreurs critiques derriere un style trop discret.
