# Changelog - Checkout Et Commande Client

## V1 - Checkout et creation de commande livres

- Checkout sans compte et sans paiement en ligne.
- Paiement a la livraison ou virement apres confirmation.
- Livraison limitee a la Republique tchetchene.
- Verification serveur des prix, du stock et de la disponibilite.
- Creation transactionnelle des commandes avec prix et donnees produit figes.
- Decrement du stock uniquement apres validation reussie.

## 2026-06-07 - Idempotence du checkout

- Ajout d'une cle technique `checkoutAttemptId` unique sur les commandes.
- Generation d'une cle de tentative checkout cote formulaire client sans modifier le format du panier `localStorage`.
- Retour de la commande existante quand une meme tentative checkout est renvoyee.
- Protection contre le double decrement de stock pour une meme tentative.

## 2026-07-07 - Checkout allege

- Notes checkout reduites aux informations utiles au moment de commander.
- Confirmation client simplifiee pour eviter les repetitions autour de WhatsApp et de la livraison.

## 2026-06-04 - Exigences checkout clarifiees

- Ajout de l'exigence d'idempotence checkout dans les specs V1.
- Clarification de l'identite cliente et du numero de commande.
