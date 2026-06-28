# Feature Spec - Admin stock

## Objectif

Permettre a l'admin de gerer les quantites en stock des produits Indira Home.

## Utilisatrices concernees

- Admin

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Produit | Produit concerne par le stock | Oui |
| Quantite en stock | Quantite actuellement disponible | Oui |
| Variation de stock | Quantite ajoutee ou retiree | Oui lors d'un ajustement |
| Motif d'ajustement | Raison de la modification : reassort, correction, erreur, annulation, autre | Non |
| Alerte stock faible | Produit publie avec stock bas, par exemple inferieur ou egal a 2 | Non |
| Date d'ajustement | Moment ou l'ajustement est effectue | Recommande |
| Admin responsable | Admin qui effectue l'ajustement | Recommande si plusieurs admins existent plus tard |

## Historique de stock

La V1 peut fonctionner sans historique complet de stock, mais un journal minimal est recommande si l'implementation reste simple.

Chaque mouvement de stock pourrait enregistrer :

- produit concerne ;
- quantite avant ;
- variation ;
- quantite apres ;
- motif ;
- date.

Cet historique aide a comprendre les corrections, reassorts, annulations ou erreurs.

## Actions possibles

L'admin peut :

- Voir la quantite en stock d'un produit.
- Ajouter du stock a un produit.
- Retirer du stock a un produit.
- Modifier manuellement la quantite en stock.
- Corriger une erreur de stock.
- Remettre du stock sur un produit epuise.
- Voir si un produit est en stock ou epuise.
- Voir les produits a stock faible.
- Voir quand une commande diminue le stock.
- Verifier que le stock a ete remis automatiquement apres une annulation de commande.
- Corriger le stock apres une modification de commande.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Ajouter du stock | Augmenter la quantite disponible |
| Retirer du stock | Diminuer la quantite disponible |
| Corriger le stock | Remplacer la quantite actuelle par une nouvelle valeur |
| Enregistrer | Sauvegarder la modification |
| Annuler | Quitter sans modifier le stock |

## Messages

| Situation | Message attendu |
| --- | --- |
| Stock ajoute | Stock ajoute avec succes. |
| Stock retire | Stock retire avec succes. |
| Stock corrige | Stock corrige avec succes. |
| Produit epuise | Le produit est maintenant epuise. |
| Produit redevenu commandable | Le produit est de nouveau commandable. |
| Stock insuffisant | La quantite demandee est superieure au stock disponible. |

Les messages admin pourront etre affiches en russe dans l'interface finale.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Quantite vide | Refuser l'enregistrement et demander une quantite. |
| Quantite invalide | Refuser les valeurs non numeriques. |
| Quantite non entiere | Refuser les nombres a virgule. |
| Stock negatif | Refuser une correction qui rendrait le stock negatif. |
| Retrait superieur au stock | Refuser le retrait si la quantite retiree depasse le stock actuel. |
| Produit introuvable | Ne pas enregistrer de modification. |

## Cas speciaux

- Si le stock devient 0, le produit reste publie mais devient epuise cote cliente.
- Si le stock est faible, l'admin peut voir une alerte interne sans afficher cette information aux clientes.
- Si le stock passe de 0 a une quantite superieure a 0, le produit redevient commandable.
- Si une commande est modifiee par l'admin, le stock peut etre corrige manuellement.
- Si un historique de stock existe, les corrections manuelles doivent y etre tracees.
- La quantite exacte en stock ne doit pas etre affichee aux clientes.
- Un produit masque peut avoir du stock, mais il reste invisible cote cliente.
- Un produit supprime ne doit plus etre gere comme un produit commandable.

## Regles metier

- Le stock doit toujours etre egal ou superieur a 0.
- Le stock doit etre un nombre entier.
- Un produit avec stock superieur a 0 est commandable seulement s'il est publie, non masque, dans une categorie visible et dans une sous-categorie visible.
- Un produit avec stock egal a 0 est epuise.
- Un seuil stock faible V1 peut etre fixe a 2 pour les alertes admin.
- Un produit epuise ne peut pas etre commande.
- Un produit epuise n'est pas supprime automatiquement.
- L'admin peut remettre du stock sur un produit epuise.
- Les corrections apres erreur ou modification de commande restent manuelles.
- Le stock est une information admin et ne doit pas etre affiche aux clientes.

## Critères d'acceptation

- L'admin peut voir le stock d'un produit.
- L'admin peut ajouter du stock.
- L'admin peut retirer du stock.
- L'admin peut corriger manuellement le stock.
- L'admin ne peut pas enregistrer un stock negatif.
- Un produit avec stock 0 devient epuise.
- Un produit epuise reste visible s'il est publie et non masque.
- Un produit epuise redevient commandable si l'admin ajoute du stock.
- Les clientes ne voient pas la quantite exacte en stock.
