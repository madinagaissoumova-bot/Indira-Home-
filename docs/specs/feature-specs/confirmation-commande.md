# Feature Spec - Confirmation commande

## Objectif

Confirmer a la cliente que sa commande a bien ete envoyee apres une validation reussie.

Cette page doit rassurer la cliente, rappeler que la commande sera confirmee manuellement par telephone ou WhatsApp, et permettre de revenir au catalogue sans exposer de donnees personnelles sensibles.

## Utilisatrices concernees

- Cliente
- Admin, indirectement, car la commande confirmee apparait ensuite dans l'espace admin

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Etat de validation | Indique que la commande vient d'etre creee avec succes | Oui |
| Numero de commande | Reference lisible de la commande, si disponible | Non |
| Total commande | Total fige en roubles, si disponible dans le retour de validation | Non |
| Numero WhatsApp boutique | Numero public de contact de la boutique | Oui |

La page de confirmation ne doit pas dependre de donnees personnelles stockees dans l'URL.

## Mecanisme de confirmation V1

Apres une validation reussie, l'action de creation de commande retourne uniquement des donnees non sensibles pour la confirmation :

- `orderNumber` ;
- `totalRub` si utile ;
- un indicateur de succes.

Ces donnees peuvent etre stockees temporairement dans `sessionStorage` cote navigateur avant la redirection vers `/checkout/confirmation`.

La page de confirmation ne doit pas recuperer les donnees personnelles de la commande cote public. Si `sessionStorage` ne contient pas de confirmation recente, la page affiche un etat neutre avec retour au catalogue.

L'URL de confirmation ne doit pas contenir le nom, le telephone, l'adresse ou toute autre donnee personnelle. Le numero de commande peut etre affiche, mais il ne doit pas permettre d'acceder aux details de commande sans authentification admin.

## Informations visibles par la cliente

La cliente doit voir :

- Un message clair indiquant que la commande a ete envoyee.
- Un rappel indiquant que la boutique contactera la cliente par telephone ou WhatsApp pour confirmer.
- Le numero WhatsApp public de la boutique : +7 988 906-41-06.
- Un rappel que la livraison est limitee a la Republique tchetchene.
- Le delai de livraison estime de 4 a 5 jours.
- Une indication que les frais de livraison seront confirmes par la boutique.
- Un lien ou bouton pour revenir au catalogue.
- Un lien ou bouton pour contacter la boutique sur WhatsApp, si l'implementation le permet simplement.

La page peut afficher le numero de commande si cela aide l'admin et la cliente a se comprendre pendant l'appel.

La page ne doit pas afficher l'adresse complete de livraison, le numero de telephone de la cliente ou d'autres donnees personnelles sensibles.

## Actions possibles

La cliente peut :

- Lire la confirmation.
- Revenir au catalogue.
- Contacter la boutique via WhatsApp si un lien est propose.

La cliente ne peut pas :

- Payer en ligne.
- Modifier la commande depuis cette page.
- Annuler la commande depuis cette page.
- Voir l'historique de ses commandes, car il n'y a pas de compte cliente en V1.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Retour au catalogue | Revenir a la page catalogue |
| Contacter sur WhatsApp | Ouvrir WhatsApp avec le numero public de la boutique, si possible |

## Messages

| Situation | Message attendu |
| --- | --- |
| Confirmation normale | Votre commande a ete envoyee. La boutique vous contactera par telephone ou WhatsApp pour confirmer. |
| Numero de commande affiche | Numero de commande : ... |
| Contact boutique | Vous pouvez aussi contacter la boutique sur WhatsApp : +7 988 906-41-06. |
| Livraison | Livraison en Republique tchetchene, delai estime 4 a 5 jours. Les frais seront confirmes par la boutique. |
| Modification ou annulation | Pour modifier ou annuler votre commande, contactez la boutique par WhatsApp. |
| Acces direct sans commande recente | Aucune commande recente a confirmer. |

Les messages visibles par les clientes doivent etre affiches en russe.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Page ouverte directement sans commande recente | Afficher un etat neutre et proposer le retour au catalogue. |
| Commande introuvable | Ne pas exposer d'erreur technique ; afficher un message neutre et proposer le retour au catalogue. |
| Donnees de confirmation expirees | Afficher un message neutre et proposer de contacter la boutique si besoin. |

## Cas speciaux

- Si la cliente recharge la page, aucune nouvelle commande ne doit etre creee.
- Si la cliente revient en arriere vers le formulaire, la commande deja creee ne doit pas etre recreee automatiquement.
- Si le navigateur renvoie la meme tentative apres une reponse reseau perdue, le serveur ne doit pas creer une seconde commande.
- Si le panier a ete valide avec succes, le panier local doit etre vide ou marque comme traite pour eviter un renvoi accidentel.
- Si la page est ouverte sans contexte de commande recente, elle ne doit pas afficher de donnees d'une autre commande.
- Le numero de commande peut etre affiche seulement s'il ne permet pas d'acceder a des donnees personnelles sans authentification.
- La confirmation publique ne remplace pas l'espace admin : les details complets de commande restent accessibles uniquement cote admin.

## Regles metier

- La page de confirmation est affichee uniquement apres une validation de commande reussie ou avec un etat neutre si elle est ouverte directement.
- Aucune donnee personnelle de la cliente ne doit etre exposee publiquement.
- Le paiement reste hors ligne.
- La boutique confirme la commande manuellement par telephone ou WhatsApp.
- La cliente ne peut pas annuler ou modifier elle-meme la commande depuis la page de confirmation.
- Toute modification ou annulation apres validation passe par contact direct avec la boutique, puis traitement admin.
- Les textes visibles par les clientes doivent etre en russe.

## Critères d'acceptation

- Apres une commande reussie, la cliente arrive sur `/checkout/confirmation`.
- La page indique que la commande a ete envoyee.
- La page indique que la boutique contactera la cliente par telephone ou WhatsApp.
- Le numero WhatsApp public +7 988 906-41-06 est visible.
- La page indique le delai de livraison estime de 4 a 5 jours et que les frais seront confirmes par la boutique.
- La page propose un retour au catalogue.
- La page ne propose aucun paiement en ligne.
- La page ne propose pas d'annulation cliente.
- La page ne revele pas l'adresse complete ou le telephone de la cliente.
- Recharger la page ne cree pas de nouvelle commande.
- Ouvrir la page directement affiche un etat neutre et un retour au catalogue.
