# Plan - Idempotence Checkout SERVER-303

## Objectif

Rendre la creation de commande idempotente pour une meme tentative checkout, afin qu'un double clic, un retry reseau ou un renvoi du meme formulaire ne cree pas deux commandes et ne diminue pas le stock deux fois.

## Validation Du Plan

- [x] Le besoin et le contenu du plan ont ete discutes dans la conversation.
- [x] Le perimetre du plan a ete valide explicitement par l'utilisatrice.
- [x] Une branche qui n'existait pas auparavant, portant un nom correspondant au plan, a ete creee depuis `develop`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/` sur la branche dediee.

## Perimetre

- Ajouter une cle de tentative checkout stable et unique par validation cliente.
- Transmettre cette cle du formulaire checkout vers l'action serveur.
- Enregistrer cette cle cote commande avec contrainte d'unicite.
- Retourner la commande existante si la meme tentative est renvoyee.
- Garantir que le stock ne diminue qu'une seule fois pour une meme tentative.
- Ajouter les tests necessaires.
- Mettre a jour les specs, tickets et status du lot 3.

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

- La cle de tentative ne doit pas contenir de donnee personnelle.
- Le panier navigateur reste limite a `productId` et `quantity`; la cle de tentative checkout est un champ de formulaire separe.
- `npm run prisma:migrate` a applique la migration `20260607000000_add_checkout_attempt_id`.
- `RUN_DB_INTEGRATION=1 npm test` passe apres migration.
