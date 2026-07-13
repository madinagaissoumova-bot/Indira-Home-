# Plan - Accueil Et Collections Minimalistes

## Objectif

Alléger l'accueil, les pages de catégories et la fiche produit pour obtenir une lecture plus premium, plus aérée et plus cohérente, sans modifier les fonctionnalités V1 existantes.

## Validation Du Plan

- [x] Le besoin et le contenu du plan ont ete discutes dans la conversation.
- [x] Le perimetre du plan a ete valide explicitement par l'utilisatrice.
- [x] Une branche qui n'existait pas auparavant, portant un nom correspondant au plan, a ete creee depuis `main`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/` sur la branche dediee.

## Perimetre

- Auditer les pages clientes visibles dans cette itération: accueil, catégories, sous-catégories, recherche et fiche produit.
- Vérifier et corriger les boutons, liens et actions principales des pages publiques clientes.
- Harmoniser les pages publiques clientes restantes avec la direction visuelle de cette itération: panier, checkout, confirmation, à propos et confidentialité.
- Aligner les specs et le code quand les corrections UI approuvées ont rendu visible une incohérence de routes, de textes ou de contrôles catalogue.
- Documenter l'accès favoris existant comme fonction locale de confort, sans compte cliente et sans nouvelle logique serveur de commande.
- Réduire les éléments redondants ou trop présents visuellement.
- Ajuster les hiérarchies typographiques et les espacements pour éviter les débordements.
- Uniformiser les fonds beige et garder le kaki surtout dans la navigation.
- Garder les textes client en russe.
- Garder une approche mobile-first.
- Garder les fonctionnalités existantes.
- Ne pas laisser de bouton décoratif ou d'action visible qui ne mène à rien.

## Hors Perimetre

- Ne pas ajouter de paiement en ligne.
- Ne pas ajouter de comptes clientes.
- Ne pas ajouter de nouvelle regle metier.
- Ne pas ajouter d'autre route publique ou admin non validée.
- Ne pas ajouter de synchronisation serveur, compte cliente ou persistance distante pour les favoris.
- Ne pas supprimer de donnees.
- Ne pas exposer le stock exact cote cliente.
- Ne pas modifier les statuts, constantes ou regles de commande.
- Ne pas refaire l'admin dans cette itération.
- Ne pas auditer ou redesign l'admin dans cette passe de cohérence publique.

## Etapes

- [x] 1. Lire le contexte utile et auditer les specs design/UX.
- [x] 2. Mettre a jour les specs si elles limitent l'ambition premium.
- [x] 3. Auditer les pages et composants actuels sur une base propre.
- [x] 4. Faire les modifications UI/UX approuvees sans changer la logique metier.
- [x] 5. Verifier les pages publiques et admin en mobile et desktop.
- [x] 5.1. Aligner les specs, les textes et les contrôles catalogue avec les corrections validées.
- [x] 6. Creer un commit clair.
- [x] 7. Pousser la branche sur GitHub.
- [x] 8. Ouvrir une Pull Request vers `main`.
- [ ] 9. Attendre la validation explicite de l'utilisatrice.
- [ ] 10. Merger la Pull Request.
- [ ] 11. Deplacer ce plan dans `docs/development-plans/termines/` apres merge.

## Verification

- [x] `npm run check:docs`
- [x] `npm run lint`
- [x] `npm run build`
- [x] Verification mobile autour de 390 px.
- [x] Verification desktop autour de 1280 px.
- [x] Verification des boutons et liens principaux des routes publiques clientes.
- [x] Captures Playwright des pages principales si possible.
- [x] Controle que les textes client restent en russe.
- [x] Controle que le stock exact n'apparait pas cote cliente.

## Risques Et Contraintes

- Le redesign global touche beaucoup de surfaces : privilegier des changements visuels et structurels controles, sans modifier les actions serveur ni les regles metier.
- Si la base Supabase locale est inaccessible, verifier avec les fallbacks disponibles et signaler la limite.
- Ne pas reutiliser en bloc les changements non planifies sauvegardes avant ce plan.
- Conserver dans `AGENTS.md` la regle bloquante de demarrage demandee avant ce plan, afin de reduire le risque de futur travail hors workflow.

## Notes

La direction retenue dans cette itération est volontairement plus simple: accueil plein écran sans scroll, hiérarchie plus courte, photos visibles, beige dominant dans le contenu, kaki réservé surtout à la barre de navigation.
