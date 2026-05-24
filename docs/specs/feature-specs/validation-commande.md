# Feature Spec - Validation commande

## Objectif

Permettre a une cliente de transformer son panier valide en commande envoyee a la boutique, sans creer de compte et sans paiement en ligne.

La validation de commande doit enregistrer les informations de la cliente, les produits commandes, les quantites, le total et le mode de paiement prevu. Apres validation, la boutique contacte la cliente par telephone ou WhatsApp pour confirmer la commande.

## Utilisatrices concernees

- Cliente
- Admin, indirectement, car l'admin recevra la commande dans le tableau de bord

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Produits du panier | Produits que la cliente veut commander | Oui |
| Quantites | Quantites choisies pour chaque produit | Oui |
| Prix unitaires | Prix des produits au moment de la validation | Oui |
| Total commande | Total calcule en roubles | Oui |
| Nom de la cliente | Nom renseigne par la cliente | Oui |
| Telephone ou WhatsApp | Numero pour recontacter la cliente | Oui |
| Adresse ou zone de livraison | Adresse ou zone situee en Republique tchetchene | Oui |
| Mode de paiement prevu | Paiement a la livraison ou virement apres confirmation | Oui |
| Statut de commande | Etat initial "nouvelle" apres validation | Oui |
| Date de validation | Moment enregistre automatiquement quand la cliente valide la commande | Oui |

Les formats detailles des champs sont definis dans `docs/specs/validation-rules.md`.

## Livraison V1

La V1 limite la livraison a la Republique tchetchene.

Pour rester simple, le formulaire utilise un champ texte libre pour l'adresse ou la zone de livraison. La validation automatique doit refuser un champ vide et afficher clairement que la livraison est limitee a la Republique tchetchene.

Si une zone hors Republique tchetchene est clairement detectee, la validation doit etre bloquee.

Si la zone est ambigue mais non vide, la commande peut etre recue.

La boutique confirme ensuite manuellement la zone exacte par telephone ou WhatsApp avant de traiter la commande.

En V1, une liste stricte de villes autorisees n'est pas obligatoire. La validation doit surtout refuser les champs vides et bloquer les zones clairement hors perimetre lorsque cette detection est simple et fiable.

## Informations visibles par la cliente avant validation

Avant de valider, la cliente doit voir :

- Les produits du panier.
- Les quantites.
- Le total en roubles.
- Son nom.
- Son telephone ou WhatsApp.
- Son adresse ou zone de livraison.
- Le mode de paiement prevu.
- Un rappel indiquant que la boutique la contactera pour confirmer la commande.

## Actions possibles

La cliente peut :

- Ouvrir le formulaire de commande depuis un panier valide.
- Renseigner son nom.
- Renseigner son telephone ou WhatsApp.
- Renseigner son adresse ou sa zone de livraison en Republique tchetchene.
- Choisir paiement a la livraison.
- Choisir virement apres confirmation.
- Relire le recapitulatif de commande.
- Valider la commande sans paiement en ligne.
- Recevoir une confirmation que la commande a ete envoyee.
- Arriver sur `/checkout/confirmation` apres validation reussie.

Apres validation, la cliente ne peut pas annuler elle-meme sa commande depuis le site. Si elle veut annuler ou modifier sa commande, elle doit contacter la boutique.

L'admin peut, apres validation :

- Voir la nouvelle commande dans le tableau de bord.
- Voir les produits commandes.
- Voir les quantites commandees.
- Voir les informations de contact et de livraison.
- Contacter la cliente par telephone ou WhatsApp.

En V1 obligatoire, aucune notification automatique SMS ou WhatsApp n'est requise pour l'admin. Les commandes doivent arriver uniquement dans l'espace admin. La boutique contactera ensuite la cliente manuellement par telephone ou WhatsApp si necessaire.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Retour au panier | Revenir au panier pour modifier les produits |
| Valider la commande | Envoyer la commande a la boutique |
| Modifier les informations | Corriger les informations cliente avant validation |
| Choisir paiement a la livraison | Definir le paiement prevu a la livraison |
| Choisir virement | Definir le paiement prevu par virement apres confirmation |

## Messages

| Situation | Message attendu |
| --- | --- |
| Commande envoyee | Votre commande a ete envoyee. La boutique vous contactera par telephone ou WhatsApp pour confirmer. |
| Panier invalide | Votre panier contient des produits a corriger avant validation. |
| Champ obligatoire manquant | Veuillez remplir ce champ. |
| Telephone invalide | Veuillez renseigner un numero de telephone ou WhatsApp valide. |
| Zone non livree | La livraison est disponible uniquement en Republique tchetchene pour le moment. |
| Produit epuise avant validation | Un produit de votre panier est maintenant epuise. |
| Quantite indisponible | La quantite demandee n'est plus disponible. |

Les messages visibles par les clientes doivent etre affiches en russe.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Panier vide | Bloquer la validation et renvoyer vers le panier. |
| Produit epuise dans le panier | Bloquer la validation et demander de retirer ou corriger le produit. |
| Produit masque ou supprime | Bloquer la validation et demander de retirer le produit. |
| Quantite superieure au stock | Bloquer la validation et demander de corriger la quantite. |
| Nom vide | Bloquer la validation et demander le nom. |
| Telephone ou WhatsApp vide | Bloquer la validation et demander un numero. |
| Adresse ou zone vide | Bloquer la validation et demander l'information de livraison. |
| Adresse hors Republique tchetchene | Bloquer la validation et indiquer que la livraison V1 est limitee a la Republique tchetchene. |
| Mode de paiement manquant | Bloquer la validation et demander de choisir paiement a la livraison ou virement. |

## Cas speciaux

- La cliente ne doit pas avoir besoin de creer un compte pour valider une commande.
- La validation de commande ne doit pas demander de paiement en ligne.
- Le stock doit etre reverifie au moment de la validation.
- Le stock diminue uniquement lorsque la commande est validee avec succes.
- Si deux clientes essaient de commander le meme dernier produit, seule la premiere validation reussie doit diminuer le stock.
- Si la validation echoue, le stock ne doit pas diminuer.
- Si une commande est validee, le stock diminue selon les quantites commandees.
- Exemple : si le stock est 5 et que la cliente valide une commande de 2 unites, le stock devient 3.
- Si le stock tombe a 0 apres validation, le produit reste publie mais devient epuise et non commandable.
- Si la cliente revient en arriere avant validation, la commande ne doit pas etre creee.
- Si le prix a change avant validation, le recapitulatif doit utiliser le prix actuel avant envoi.
- Une fois la commande validee, les prix enregistres dans cette commande ne doivent plus changer automatiquement si l'admin modifie les prix produit plus tard.
- Une fois la commande validee, la cliente ne peut pas l'annuler directement depuis le site.
- Si l'adresse saisie est ambigue mais non vide, la commande peut etre recue et la boutique confirme manuellement la livraison avec la cliente.
- Apres validation reussie, le panier local doit etre vide ou marque comme traite pour eviter une nouvelle validation accidentelle.

## Regles metier

- Une commande ne peut etre validee que depuis un panier valide.
- Le panier est valide uniquement s'il contient au moins un produit commandable.
- Tous les produits commandes doivent etre en stock au moment de la validation.
- La quantite commandee ne peut pas depasser le stock disponible.
- La validation de commande diminue le stock.
- Le stock ne diminue pas avant la validation.
- Les prix de la commande sont figes au moment de la validation reussie.
- La commande initiale doit avoir le statut "nouvelle".
- Le paiement se fait hors ligne : paiement a la livraison ou virement apres confirmation.
- La livraison V1 est limitee a la Republique tchetchene.
- La boutique doit contacter la cliente avec le numero renseigne dans la commande.
- Le numero WhatsApp public de la boutique affiche aux clientes est +7 988 906-41-06.
- Les informations de commande doivent etre visibles dans le tableau de bord admin.
- Une annulation apres validation doit etre traitee par contact avec la boutique, puis par l'admin dans l'espace admin.
- Les donnees personnelles de commande servent uniquement au traitement de la commande et ne doivent jamais etre affichees cote public.

## Critères d'acceptation

- Une cliente peut valider une commande sans compte.
- Une cliente peut valider une commande sans paiement en ligne.
- Une cliente doit renseigner son nom.
- Une cliente doit renseigner son telephone ou WhatsApp.
- Une cliente doit renseigner son adresse ou zone de livraison.
- Une cliente doit choisir paiement a la livraison ou virement.
- Une cliente ne peut pas valider un panier vide.
- Une cliente ne peut pas valider un panier contenant un produit epuise, masque ou supprime.
- Une cliente ne peut pas valider une quantite superieure au stock disponible.
- Le stock diminue seulement apres validation reussie.
- Le stock ne diminue pas si la validation echoue.
- Apres validation, la commande apparait dans le tableau de bord admin.
- Apres validation, la cliente voit un message indiquant que la boutique la contactera.
- Apres validation, la cliente ne voit pas de bouton pour annuler elle-meme sa commande.
- L'admin n'a pas besoin de recevoir une notification SMS ou WhatsApp automatique en V1 obligatoire.
- Les textes visibles par les clientes sont en russe.
