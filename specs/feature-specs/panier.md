# Feature Spec - Panier

## Objectif

Permettre a une cliente de preparer sa commande avant de remplir ses informations et de la valider.

Le panier doit contenir les produits choisis, les quantites et le total de la commande. Il ne gere pas le paiement en ligne.

## Utilisatrices concernees

- Cliente

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Produit | Produit ajoute au panier | Oui |
| Nom du produit | Nom affiche dans le panier | Oui |
| Photo principale | Image du produit dans le panier | Oui |
| Prix unitaire | Prix du produit en roubles | Oui |
| Quantite choisie | Quantite que la cliente veut commander | Oui |
| Stock disponible | Quantite disponible cote admin, utilisee pour verifier le panier | Oui |
| Sous-total produit | Prix unitaire multiplie par la quantite | Oui |
| Total panier | Somme des sous-totaux | Oui |
| Etat du produit | Commandable ou epuise | Oui |

La quantite exacte en stock ne doit pas etre affichee a la cliente. Elle sert seulement a verifier que la quantite choisie peut etre commandee.

## Informations visibles dans le panier

La cliente doit voir :

- Les produits ajoutes.
- La photo principale de chaque produit.
- Le nom de chaque produit.
- Le prix unitaire.
- La quantite choisie.
- Le sous-total de chaque produit.
- Le total de la commande.
- Un label clair sur le produit si un produit du panier est devenu epuise ou impossible a commander.

Si un produit du panier devient epuise, la photo ou la ligne du produit doit afficher clairement "indisponible" ou "produit epuise".

## Actions possibles

La cliente peut :

- Ajouter un produit en stock au panier depuis le catalogue ou la fiche produit.
- Voir le contenu du panier.
- Augmenter la quantite d'un produit.
- Diminuer la quantite d'un produit.
- Retirer un produit du panier.
- Vider le panier.
- Continuer ses achats.
- Passer a l'etape de validation de commande si le panier est valide.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Ajouter au panier | Ajouter un produit en stock au panier |
| Augmenter la quantite | Ajouter une unite au produit dans le panier |
| Diminuer la quantite | Retirer une unite au produit dans le panier |
| Retirer | Supprimer un produit du panier |
| Vider le panier | Supprimer tous les produits du panier |
| Continuer les achats | Revenir au catalogue |
| Valider la commande | Passer au formulaire de commande |

## Messages

| Situation | Message attendu |
| --- | --- |
| Produit ajoute | Produit ajoute au panier. |
| Produit retire | Produit retire du panier. |
| Panier vide | Votre panier est vide. |
| Panier vide apres suppression | Tous les produits ont ete retires du panier. |
| Quantite trop elevee | La quantite demandee n'est pas disponible. |
| Produit epuise dans le panier | Ce produit est epuise et ne peut pas etre commande. |
| Panier invalide | Certains produits du panier doivent etre corriges avant validation. |

Les messages visibles par les clientes doivent etre affiches en russe.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Ajout d'un produit epuise | Refuser l'ajout et indiquer que le produit est indisponible ou epuise. |
| Quantite inferieure a 1 | Revenir a une quantite minimale de 1 ou retirer le produit si la cliente diminue depuis 1. |
| Quantite superieure au stock | Refuser l'augmentation et indiquer que la quantite demandee n'est pas disponible. |
| Produit masque apres ajout au panier | Bloquer la validation et demander de retirer le produit du panier. |
| Produit supprime apres ajout au panier | Bloquer la validation et demander de retirer le produit du panier. |
| Prix modifie apres ajout au panier | Mettre a jour le prix dans le panier avant validation. |
| Panier vide | Ne pas permettre d'aller au formulaire de commande. |

## Cas speciaux

- Si un produit passe a stock 0 apres avoir ete ajoute au panier, il reste visible dans le panier mais ne peut pas etre commande.
- Si un produit du panier est epuise, il doit etre marque clairement sur sa photo ou sa ligne produit avec un label "indisponible" ou "produit epuise".
- Si un produit devient epuise dans le panier, la cliente doit le retirer ou reduire la quantite si une partie du stock reste disponible.
- Si la quantite choisie devient superieure au stock disponible, la cliente doit corriger la quantite avant validation.
- La cliente ne doit pas pouvoir augmenter la quantite au-dessus du stock disponible.
- Exemple : si le stock disponible est 5 et que la quantite dans le panier est deja 5, l'action d'augmentation ne doit pas permettre de passer a 6.
- Si l'admin remet du stock sur un produit epuise, la cliente peut a nouveau l'ajouter au panier.
- Si un produit est masque ou supprime par l'admin apres ajout au panier, il ne peut plus etre commande.
- Si le prix change avant validation de commande, le panier doit utiliser le prix actuel.
- Le panier ne doit pas reserver definitivement le stock tant que la commande n'est pas validee.
- Le stock diminue seulement lorsque la cliente valide la commande.

## Regles metier

- Le panier ne doit contenir que des produits commandables pour pouvoir etre valide.
- Un produit epuise ne peut pas etre ajoute au panier.
- Un produit epuise deja present dans le panier bloque la validation.
- Un produit epuise deja present dans le panier doit etre visuellement identifie comme indisponible ou epuise.
- La quantite minimale d'un produit dans le panier est 1.
- La quantite maximale d'un produit dans le panier ne peut pas depasser le stock disponible.
- L'interface doit bloquer l'augmentation de quantite des que la quantite choisie atteint le stock disponible.
- La quantite exacte en stock ne doit pas etre affichee a la cliente.
- Le total du panier est calcule en roubles.
- Le panier ne gere pas de paiement en ligne.
- Le panier est accessible sans compte cliente.
- La validation de commande se fait dans une autre Feature Spec.

## Critères d'acceptation

- Une cliente peut ajouter un produit en stock au panier.
- Une cliente ne peut pas ajouter un produit epuise au panier.
- Une cliente peut voir les produits de son panier.
- Une cliente peut modifier les quantites.
- Une cliente peut retirer un produit.
- Une cliente peut vider le panier.
- Une cliente voit le total du panier en roubles.
- Une cliente ne voit pas la quantite exacte en stock.
- Une cliente ne peut pas valider un panier vide.
- Une cliente ne peut pas valider un panier contenant un produit epuise, masque ou supprime.
- Une cliente voit clairement dans le panier si un produit est devenu indisponible ou epuise.
- Une cliente ne peut pas valider une quantite superieure au stock disponible.
- Le stock ne diminue pas quand le produit est seulement ajoute au panier.
- Le stock diminue seulement apres validation de la commande.
- Les textes visibles par les clientes sont en russe.
