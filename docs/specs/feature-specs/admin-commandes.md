# Feature Spec - Admin commandes

## Objectif

Permettre a l'admin de recevoir, consulter et traiter les commandes envoyees depuis le site Indira Home.

Cette fonctionnalite sert a organiser le suivi des commandes apres validation par une cliente. Elle ne gere pas le paiement bancaire en ligne en V1.

## Utilisatrices concernees

- Admin

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Numero de commande | Identifiant unique de la commande | Oui |
| Date de commande | Moment ou la cliente a valide la commande | Oui |
| Nom de la cliente | Nom renseigne dans le formulaire de commande | Oui |
| Telephone / WhatsApp de la cliente | Numero renseigne par la cliente pour etre contactee | Oui |
| Adresse ou zone de livraison | Adresse ou zone situee en Republique tchetchene | Oui |
| Produits commandes | Produits presents dans la commande validee | Oui |
| Quantites commandees | Quantite de chaque produit commandee | Oui |
| Prix unitaires valides | Prix enregistres au moment de la validation | Oui |
| Total commande | Total en roubles | Oui |
| Mode de paiement prevu | Paiement a la livraison ou virement apres confirmation | Oui |
| Statut de commande | Etat actuel de traitement de la commande | Oui |
| Note admin | Information interne ajoutee par l'admin si besoin | Non |

## Confidentialite

Les commandes contiennent des donnees personnelles : nom, telephone ou WhatsApp, adresse ou zone de livraison.

Ces informations doivent etre visibles uniquement dans l'espace admin protege et uniquement pour traiter la commande.

Elles ne doivent pas apparaitre dans le catalogue public, les pages publiques, les messages d'erreur techniques ou les logs inutiles.

## Statuts de commande

| Enum technique | Label admin | Description |
| --- | --- | --- |
| `NEW` | Nouvelle | Commande recue, pas encore traitee |
| `TO_CONFIRM` | A confirmer | La boutique doit contacter la cliente |
| `CONFIRMED` | Confirmee | La cliente a confirme la commande |
| `PREPARING` | En preparation | La boutique prepare la commande |
| `DELIVERED` | Livree | La commande a ete remise a la cliente |
| `CANCELLED` | Annulee | La commande ne sera pas traitee |

Le statut initial apres validation est `NEW`.

Les valeurs stockees doivent toujours venir de `lib/constants.ts`. Les labels visibles dans l'admin peuvent etre traduits, mais ils ne doivent jamais remplacer les enums techniques en base.

En V1, l'admin peut choisir librement un autre statut parmi les valeurs autorisees. Il n'y a pas de matrice de transitions obligatoire. Cette souplesse permet de corriger une erreur de traitement manuellement. Une annulation demande toujours confirmation. Quand une commande passe pour la premiere fois au statut `CANCELLED`, le stock des lignes associees est remis automatiquement en ligne.

## Actions possibles

L'admin peut :

- Voir la liste des commandes.
- Ouvrir le detail d'une commande.
- Voir les informations de la cliente.
- Voir les produits commandes.
- Voir les quantites commandees.
- Voir le total de la commande.
- Voir le mode de paiement prevu.
- Voir l'adresse ou la zone de livraison.
- Changer le statut de la commande.
- Ajouter une note interne.
- Contacter la cliente par telephone ou WhatsApp avec le numero renseigne dans la commande.
- Marquer une commande comme annulee si elle ne doit pas etre traitee.

La cliente ne peut pas annuler elle-meme sa commande depuis le site. L'annulation est une action admin apres contact avec la boutique.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Voir la commande | Ouvrir le detail d'une commande |
| Marquer a confirmer | Indiquer que la cliente doit etre contactee |
| Marquer confirmee | Indiquer que la cliente a confirme |
| Marquer en preparation | Indiquer que la commande est en preparation |
| Marquer livree | Indiquer que la commande est terminee |
| Annuler la commande | Arreter le traitement de la commande |
| Enregistrer la note | Sauvegarder une note interne |
| Appeler la cliente | Utiliser le numero de telephone de la cliente |
| Contacter sur WhatsApp | Ouvrir un contact WhatsApp si possible |
| Retour aux commandes | Revenir a la liste des commandes |

## Messages

| Situation | Message attendu |
| --- | --- |
| Aucune commande | Aucune commande pour le moment. |
| Commande recue | Nouvelle commande recue. |
| Statut modifie | Statut de commande mis a jour. |
| Note enregistree | Note enregistree. |
| Commande annulee | Commande annulee. |
| Contact impossible | Numero de telephone indisponible ou invalide. |

Les messages admin pourront etre affiches en russe dans l'interface finale.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Commande introuvable | Afficher une erreur et revenir a la liste des commandes. |
| Statut invalide | Refuser la modification du statut. |
| Annulation accidentelle | Demander confirmation avant d'annuler une commande. |
| Telephone invalide | Afficher que le contact direct peut etre impossible. |
| Adresse hors zone V1 | Signaler que la livraison V1 concerne uniquement la Republique tchetchene. |

## Cas speciaux

- Une commande validee par la cliente doit apparaitre dans l'espace admin.
- Le detail commande doit rester lisible en une structure simple et lineaire, sans panneaux d'informations dupliques.
- Les donnees personnelles necessaires au traitement restent visibles uniquement dans l'admin protege, mais l'interface doit eviter les repetitions inutiles.
- Le telephone peut etre presente principalement via les actions de contact `Appeler` et `WhatsApp` pour reduire la surcharge visuelle.
- Une commande conserve les prix enregistres au moment de sa validation, meme si l'admin modifie ensuite le prix d'un produit.
- Une commande conserve les produits et quantites enregistres au moment de sa validation.
- Si un produit commande est ensuite masque, la commande deja validee doit rester lisible par l'admin.
- En V1, un produit deja present dans une commande validee ne doit pas etre supprime definitivement. Si une fiche produit n'existe plus a cause d'une migration, d'une erreur technique ou d'une evolution future, les snapshots de commande doivent quand meme garder la commande lisible.
- Pour garantir cette lisibilite, chaque ligne de commande doit conserver au minimum le nom produit, le prix unitaire, la quantite et si possible l'image principale au moment de la validation.
- Si une commande passe au statut `CANCELLED`, le stock des articles de la commande est remis automatiquement en ligne une seule fois.
- Si une cliente demande une annulation apres validation, l'admin peut passer la commande au statut "Annulee".
- Si une commande est modifiee avec la cliente par telephone ou WhatsApp, l'admin peut corriger le stock manuellement dans `admin-stock.md`.
- L'admin ne recoit pas automatiquement de SMS ou de message WhatsApp en V1 obligatoire ; elle consulte les nouvelles commandes dans l'espace admin.

## Regles metier

- L'admin doit etre connectee pour consulter les commandes.
- Une commande ne peut etre creee que par une validation de commande reussie cote cliente.
- La commande doit contenir les informations de contact de la cliente.
- La commande doit contenir au moins un produit.
- Les montants sont en roubles.
- Les commandes V1 concernent uniquement la Republique tchetchene.
- Une commande validee arrive d'abord avec le statut `NEW`.
- Une commande validee doit apparaitre dans l'espace admin sans action manuelle.
- Les statuts de commande sont modifies manuellement par l'admin.
- Tout changement vers une valeur absente de `lib/constants.ts` est refuse.
- Une commande `DELIVERED` ou `CANCELLED` peut etre corrigee manuellement vers un autre statut autorise en V1.
- Annuler une commande remet automatiquement le stock en ligne uniquement lors du premier passage au statut `CANCELLED`.
- Une commande ne peut pas etre annulee directement par la cliente depuis le site.
- Les clientes ne se connectent pas pour passer commande.
- Les commandes sont confirmees par contact telephone ou WhatsApp apres validation.

## Critères d'acceptation

- L'admin peut voir les nouvelles commandes.
- Une commande validee par une cliente apparait automatiquement dans l'espace admin.
- L'admin peut ouvrir le detail d'une commande.
- L'admin voit le nom, le telephone ou WhatsApp, l'adresse ou la zone de livraison de la cliente.
- Le detail commande presente les informations essentielles sans doublons visuels.
- L'admin voit les produits, quantites, prix unitaires et total.
- L'admin voit le mode de paiement prevu.
- L'admin peut changer le statut d'une commande.
- L'admin peut annuler une commande apres confirmation.
- L'annulation admin remet automatiquement le stock de la commande en ligne une seule fois.
- Une cliente ne peut pas annuler elle-meme une commande validee depuis le site.
- L'admin peut ajouter une note interne.
- Une commande validee conserve ses prix meme si les prix produits changent ensuite.
- Une commande reste lisible meme si un produit commande est ensuite masque, ou si la fiche produit n'existe plus a cause d'une erreur technique ou d'une evolution future.
- Le paiement en ligne n'est pas demande dans l'espace admin V1.
