# Technical Spec - Actions Serveur

## Actions publiques

| Action | Role |
| --- | --- |
| Lister les produits publics | Retourner les produits publies, valides, avec filtres et tri |
| Lire un produit public | Retourner une fiche produit publiee dans une categorie et sous-categorie visibles |
| Lister les categories visibles | Retourner categories et sous-categories visibles |
| Verifier le panier | Recalculer prix, etats, quantites disponibles et total |
| Creer une commande | Valider le panier, figer les prix, diminuer le stock et creer la commande |

## Actions admin

| Action | Role |
| --- | --- |
| Se connecter | Authentifier l'admin |
| Se deconnecter | Fermer la session admin |
| Lire le tableau de bord | Retourner chiffre d'affaires, commandes, produits, ruptures et commandes recentes |
| Gerer les produits | Creer, modifier, publier, masquer, supprimer |
| Gerer les photos | Ajouter, remplacer ou supprimer les images produit |
| Gerer les categories | Creer, modifier, masquer, afficher, supprimer si autorise, ordonner |
| Ajuster le stock | Ajouter, retirer ou corriger une quantite |
| Lister les commandes | Voir les commandes avec filtres simples par statut et par date |
| Lire une commande | Voir le detail complet |
| Modifier statut commande | Changer le statut admin |
| Modifier note commande | Enregistrer une note interne |

## Regles de validation serveur

- Un produit publie doit avoir nom, description, prix valide, au moins une photo, categorie, sous-categorie et stock entier non negatif.
- Le prix doit etre un entier en roubles et strictement superieur a 0.
- Le stock doit etre un entier egal ou superieur a 0.
- Un produit est commandable uniquement s'il est publie, non masque, dans une categorie visible, dans une sous-categorie visible et avec stock superieur a 0.
- Un produit publie avec stock 0 reste visible cote client mais n'est pas commandable.
- La validation de commande doit reverifier tous les produits du panier.
- La validation de commande doit etre transactionnelle : si une ligne echoue, aucune commande n'est creee et aucun stock ne diminue.
- Les prix de commande sont figes au moment de la validation reussie.
- Le panier ne reserve pas le stock.
- Les commandes sont limitees a une adresse ou zone de livraison en Republique tchetchene pour la V1.
- Une commande validee doit creer les lignes `OrderItem` avec snapshots de nom, image et prix.
- Une commande validee doit decrementer le stock dans la meme transaction que la creation de commande, apres les verifications serveur.
- Les listes du dashboard doivent pouvoir afficher au maximum les 10 commandes recentes.

## Concurrence et stock

La creation de commande doit proteger le stock contre les validations concurrentes.

Pour chaque ligne de panier, le serveur doit :

- relire le produit cote serveur dans la transaction ;
- verifier que le produit est commandable au moment de la transaction ;
- decrementer le stock avec une condition atomique du type `stockQuantity >= quantity` ;
- verifier que le decrement a bien touche une ligne ;
- annuler toute la transaction si une ligne ne peut pas etre decrementee.

La commande et ses `OrderItem` ne doivent etre crees que si tous les decrements de stock ont reussi. Si deux clientes essaient de commander le dernier exemplaire, une seule transaction doit reussir.

Les formats detailles des champs, slugs, URLs d'images, paniers et donnees de commande sont definis dans `docs/specs/validation-rules.md`.
