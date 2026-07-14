# Journal Des Changements - Validation Commande Et Commande Client

## V1 - Validation commande et creation de commande livrees

- Validation commande sans compte et sans paiement en ligne.
- Paiement a la livraison ou virement apres confirmation.
- Livraison limitee a la Republique tchetchene.
- Verification serveur des prix, du stock et de la disponibilite.
- Creation transactionnelle des commandes avec prix et donnees produit figes.
- Decrement du stock uniquement apres validation reussie.

## 2026-06-07 - Idempotence de la validation commande

- Ajout d'une cle technique `checkoutAttemptId` unique sur les commandes.
- Generation d'une cle de tentative de validation commande cote formulaire client sans modifier le format du panier `localStorage`.
- Retour de la commande existante quand une meme tentative de validation commande est renvoyee.
- Protection contre le double decrement de stock pour une meme tentative.

## 2026-06-04 - Exigences de validation commande clarifiees

- Ajout de l'exigence d'idempotence de validation commande dans les specs V1.
- Clarification de l'identite cliente et du numero de commande.
