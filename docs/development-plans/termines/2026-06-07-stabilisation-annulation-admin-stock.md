# Plan - Stabilisation Annulation Admin Et Stock

## Objectif

Stabiliser l'annulation de commande admin en gardant le bouton dedie `Annuler la commande`, en garantissant que le stock est remis en ligne une seule fois lorsqu'une commande passe au statut `CANCELLED`, et en alignant les specs et tests avec ce comportement.

## Validation Du Plan

- [x] Le besoin et le contenu du plan ont ete discutes dans la conversation.
- [x] Le perimetre du plan a ete valide explicitement par l'utilisatrice.
- [x] Une branche qui n'existait pas auparavant, portant un nom correspondant au plan, a ete creee depuis `develop`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/` sur la branche dediee.

## Perimetre

- Conserver le bouton admin `Annuler la commande`.
- Securiser l'action serveur pour restaurer le stock quand une commande non annulee devient `CANCELLED`, quel que soit le chemin UI utilise.
- Eviter toute double restauration si la commande etait deja `CANCELLED`.
- Aligner `admin-stock.md` avec les specs commandes et operations.
- Ajouter une verification automatisee ciblee sur la restauration du stock.
- Ne pas retirer les changements admin/categories deja presents dans la branche.

## Etapes

- [x] 1. Lire le contexte utile.
- [x] 2. Faire les modifications.
- [x] 3. Verifier.
- [x] 4. Deplacer ce plan dans `docs/development-plans/termines/`.
- [ ] 5. Creer un commit clair.
- [ ] 6. Pousser la branche sur GitHub.
- [ ] 7. Ouvrir une Pull Request vers `develop`.
- [ ] 8. Attendre la validation explicite de l'utilisatrice.
- [ ] 9. Merger la Pull Request.

## Verification

- [x] `npm run check:docs`
- [x] `npm test`
- [x] `npm run lint`
- [x] `npm run build`

## Notes

- Le bouton admin reste le chemin principal pour les cas ou la cliente ne repond pas apres appel et message vocal WhatsApp.
- La protection serveur doit rester plus forte que l'interface : si un autre formulaire envoie `CANCELLED`, le stock doit rester coherent.
- Verification passee le 2026-06-07 : docs, tests, lint et build.
