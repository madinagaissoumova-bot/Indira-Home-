# Specification Fonctionnelle - Admin produits

## Objectif

Permettre a l'admin de creer, modifier, masquer, publier et supprimer les produits de la boutique Indira Home.

Cette fonctionnalite sert a maintenir le catalogue a jour sans intervention technique.

L'admin doit pouvoir ajouter elle-meme les noms, les photos, les prix, les descriptions, les categories et le stock des produits. Les produits reels de la boutique seront donc saisis depuis l'espace admin, pas directement dans le code.

## Utilisatrices concernees

- Admin

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Nom du produit | Nom complet du produit | Oui |
| Photos du produit | Une ou plusieurs photos | Oui pour publier |
| Prix | Prix en roubles | Oui pour publier |
| Categorie | Categorie principale | Oui pour publier |
| Sous-categorie | Sous-categorie | Oui pour publier |
| Description | Description detaillee visible sur la fiche produit | Oui pour publier |
| Quantite initiale en stock | Quantite disponible au moment de la creation ou de la publication | Oui pour publier |
| Statut de publication | Brouillon, publie ou masque | Oui |
| Marque | Marque du produit si elle existe | Non |
| Caracteristiques | Taille, matiere, volume, puissance, dimensions, contenu du set ou autre information utile | Non |
| Statut nouveaute | Indique si le produit doit apparaitre comme nouveaute | Non |
| Ordre d'affichage | Priorite d'affichage dans le catalogue | Non |

Cette fiche garde seulement la quantite initiale necessaire pour publier un produit. La gestion detaillee du stock, des reassorts, des retraits et de la baisse automatique apres commande est decrite dans `admin-stock.md`.

## Statuts produit

| Statut | Description |
| --- | --- |
| Brouillon | Produit en preparation, invisible cote cliente |
| Publie | Produit visible cote cliente |
| Masque | Produit volontairement cache cote cliente sans etre supprime |

Le statut epuise n'est pas un statut manuel de publication. Il est calcule automatiquement a partir du stock.

Le statut `archive` n'est pas obligatoire en V1. Un produit retire durablement mais deja present dans une commande doit etre masque, et sa suppression definitive doit etre bloquee.

## Actions possibles

L'admin peut :

- Voir la liste des produits.
- Ajouter un nouveau produit.
- Enregistrer un produit en brouillon.
- Publier un produit si les informations obligatoires sont completes.
- Modifier un produit existant.
- Modifier les photos d'un produit.
- Modifier le prix.
- Modifier la description.
- Modifier la categorie et la sous-categorie.
- Modifier les caracteristiques facultatives.
- Marquer ou demarquer un produit comme nouveaute.
- Modifier l'ordre d'affichage.
- Masquer un produit.
- Remettre visible un produit masque.
- Supprimer un produit uniquement s'il n'a jamais ete present dans une commande validee.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Ajouter un produit | Creer une nouvelle fiche produit |
| Enregistrer en brouillon | Sauvegarder un produit sans le rendre visible cote cliente |
| Publier | Rendre le produit visible cote cliente |
| Modifier | Modifier un produit existant |
| Enregistrer | Sauvegarder les modifications |
| Masquer | Cacher le produit cote cliente |
| Remettre visible | Publier a nouveau un produit masque |
| Supprimer | Supprimer le produit uniquement si l'historique de commande le permet |
| Annuler | Quitter sans enregistrer les changements |

## Messages

| Situation | Message attendu |
| --- | --- |
| Produit cree | Produit cree avec succes. |
| Produit enregistre en brouillon | Produit enregistre en brouillon. |
| Produit publie | Produit publie. |
| Produit modifie | Produit modifie avec succes. |
| Produit masque | Produit masque. Il n'est plus visible sur le site client. |
| Produit remis visible | Produit visible sur le site client. |
| Produit supprime | Produit supprime. |
| Publication impossible | Completez les informations obligatoires avant de publier. |

Les messages admin pourront etre affiches en russe dans l'interface finale.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Nom manquant | Refuser la publication et demander un nom. |
| Photo manquante | Refuser la publication tant qu'au moins une photo n'est pas ajoutee. |
| Prix manquant | Refuser la publication et demander un prix. |
| Prix invalide | Refuser un prix vide, negatif ou egal a 0. |
| Categorie manquante | Refuser la publication et demander une categorie. |
| Sous-categorie manquante | Refuser la publication et demander une sous-categorie. |
| Sous-categorie incompatible | Refuser l'enregistrement si la sous-categorie n'appartient pas a la categorie choisie. |
| Description manquante | Refuser la publication et demander une description. |
| Stock initial invalide | Refuser un stock negatif ou non entier avant publication. |
| Suppression accidentelle | Demander confirmation avant suppression. |

## Cas speciaux

- Un produit peut etre enregistre en brouillon meme si toutes les informations obligatoires ne sont pas encore remplies.
- Un produit ne peut etre publie que si les informations obligatoires sont completes.
- La sous-categorie choisie doit appartenir a la categorie choisie.
- Un produit masque n'apparait pas cote cliente, meme s'il a du stock.
- Un produit supprime ne doit plus apparaitre cote cliente.
- Si un produit est supprime alors qu'il existe dans un panier client, la validation de ce panier doit etre bloquee.
- Si un produit existe dans une commande validee, la suppression definitive doit etre bloquee. L'admin doit le masquer si elle veut le retirer du catalogue.
- Si le prix est modifie, les paniers non valides doivent utiliser le nouveau prix avant validation.
- Les commandes deja validees conservent les prix enregistres au moment de la validation.
- Les cas de stock 0, produit epuise et reassort sont traites dans `admin-stock.md`.

## Regles metier

- L'admin doit etre connectee pour gerer les produits.
- Un produit publie doit avoir un nom, une photo, un prix, une categorie, une sous-categorie, une description et un stock valide.
- Un produit ne peut pas etre enregistre avec une categorie et une sous-categorie incoherentes.
- La quantite exacte en stock est geree cote admin et n'est pas affichee aux clientes.
- Le stock determine si un produit est commandable ou epuise, selon les regles de `admin-stock.md`.
- Masquer un produit est different de supprimer un produit.
- Masquer est recommande si l'admin veut retirer temporairement un produit du site client.
- Supprimer est une action definitive ou exceptionnelle.
- En V1, masquer est aussi utilise pour retirer durablement un produit qui a deja existe dans des commandes.
- Les textes visibles par les clientes doivent etre en russe.

## Critères d'acceptation

- L'admin peut ajouter un produit.
- L'admin peut renseigner elle-meme le nom, les photos, le prix, la description, la categorie et le stock.
- L'admin peut enregistrer un produit en brouillon.
- L'admin peut publier un produit complet.
- L'admin ne peut pas publier un produit incomplet.
- L'admin peut modifier un produit existant.
- L'admin peut masquer un produit.
- L'admin peut remettre visible un produit masque.
- L'admin peut supprimer un produit apres confirmation uniquement s'il n'a jamais ete present dans une commande validee.
- L'admin ne peut pas supprimer definitivement un produit deja present dans une commande validee.
- Un produit masque n'apparait pas cote cliente.
- Un produit avec un stock invalide ne peut pas etre publie.
- Une categorie et une sous-categorie incompatibles sont refusees cote serveur.
- Les commandes deja validees ne changent pas si l'admin modifie le prix du produit ensuite.
