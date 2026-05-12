# Feature Spec - Catalogue produits

## Objectif

Permettre aux clientes de consulter les produits Indira Home, de comprendre rapidement ce qui est vendu, de voir les informations essentielles et de trouver un produit avant de l'ajouter au panier.

Cette fonctionnalite ne gere pas encore le panier en detail. Elle couvre uniquement la consultation du catalogue.

## Utilisatrices concernees

- Cliente
- Admin, indirectement, car les produits visibles dans le catalogue viennent de ce que l'admin a publie

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Nom du produit | Nom affiche dans le catalogue | Oui |
| Photos du produit | Une ou plusieurs images du produit | Oui |
| Prix | Prix affiche en roubles | Oui |
| Categorie | Categorie principale du produit | Oui |
| Sous-categorie | Sous-categorie du produit | Oui |
| Description | Description detaillee visible dans la fiche produit, pas dans le catalogue | Oui |
| Etat du produit | Etat calcule a partir du stock : commandable ou epuise | Oui |
| Quantite en stock | Quantite disponible geree par l'admin | Oui |
| Marque | Marque du produit si elle existe | Non |
| Statut nouveaute | Permet d'identifier un produit nouveau | Non |
| Statut de publication | Produit publie, masque ou brouillon | Oui |
| Ordre d'affichage | Priorite manuelle pour afficher certains produits avant d'autres | Non |

## Informations visibles dans le catalogue

Chaque produit affiche dans le catalogue doit montrer au minimum :

- Photo principale.
- Nom du produit.
- Prix en roubles.
- Categorie ou sous-categorie.
- Indication "nouveau" si le produit est marque comme nouveaute.

La description du produit n'est pas affichee dans le catalogue. Elle sera visible dans la fiche produit.

La quantite exacte en stock n'est pas affichee dans le catalogue client.

Si le produit est en stock, le catalogue ne doit pas afficher de texte "disponible". La cliente doit simplement pouvoir le commander.

Si le produit est epuise, le catalogue doit afficher clairement "indisponible" ou "produit epuise" et l'action de commande ne doit pas fonctionner.

## Affichage par defaut

Par defaut, le catalogue affiche :

1. Les produits publies.
2. Les produits en stock avant les produits epuises.
3. Les produits marques comme nouveautes ou mis en avant avant les autres, si cette information existe.
4. Les autres produits selon l'ordre choisi par l'admin.

Les produits masques ou en brouillon ne doivent pas apparaitre dans le catalogue client.

## Actions possibles

La cliente peut :

- Voir les produits publies.
- Voir les produits par categorie.
- Voir les produits par sous-categorie.
- Rechercher un produit par son nom.
- Voir les produits en stock.
- Voir les produits epuises publies, tant que l'admin ne les masque pas ou ne les supprime pas.
- Voir les nouveautes.
- Trier les produits par prix croissant.
- Trier les produits par prix decroissant.
- Reinitialiser les filtres et revenir au catalogue complet.
- Ouvrir la fiche detaillee d'un produit.

## Filtres et tri

### Filtres V1

La V1 doit proposer des filtres simples :

- Categorie.
- Sous-categorie.
- En stock uniquement.
- Nouveautes.

### Tri V1

La V1 doit proposer ces tris :

- Par defaut.
- Prix croissant.
- Prix decroissant.
- Nouveautes en premier.

### Filtres hors V1

Les filtres suivants ne sont pas necessaires dans la premiere version :

- Couleur.
- Matiere.
- Marque.
- Taille.
- Puissance.
- Note client.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Voir le produit | Ouvrir la fiche detaillee du produit |
| Commander / Ajouter au panier | Ajouter un produit en stock au panier |
| Rechercher | Lancer une recherche par nom de produit |
| Effacer la recherche | Revenir a la liste normale du catalogue |
| Filtrer par categorie | Afficher les produits d'une categorie |
| Filtrer par sous-categorie | Afficher les produits d'une sous-categorie |
| Voir les nouveautes | Afficher les produits marques comme nouveaux |
| En stock uniquement | Afficher seulement les produits en stock |
| Trier par prix croissant | Afficher les produits du moins cher au plus cher |
| Trier par prix decroissant | Afficher les produits du plus cher au moins cher |
| Reinitialiser | Supprimer la recherche, les filtres et le tri choisi |

## Messages

| Situation | Message attendu |
| --- | --- |
| Aucun produit dans le catalogue | Aucun produit a afficher pour le moment. |
| Aucun produit dans une categorie | Aucun produit a afficher dans cette categorie pour le moment. |
| Aucun produit dans une sous-categorie | Aucun produit a afficher dans cette sous-categorie pour le moment. |
| Aucun resultat de recherche | Aucun produit ne correspond a votre recherche. |
| Produit indisponible | Produit indisponible. |
| Produit ajoute au panier | Produit ajoute au panier. |
| Filtres sans resultat | Aucun produit ne correspond aux filtres selectionnes. |

Les messages visibles par les clientes devront etre affiches en russe sur le site.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Recherche vide | Ne pas afficher d'erreur bloquante ; conserver le catalogue normal. |
| Produit epuise ajoute au panier | Refuser l'ajout au panier et indiquer que le produit est indisponible ou epuise. |
| Produit sans prix | Ne pas afficher le produit dans le catalogue client tant que le prix n'est pas renseigne. |
| Produit sans photo | Ne pas publier le produit dans le catalogue client tant qu'au moins une photo n'est pas ajoutee. |
| Produit sans categorie | Ne pas publier le produit dans le catalogue client tant qu'une categorie n'est pas choisie. |
| Produit sans sous-categorie | Ne pas publier le produit dans le catalogue client tant qu'une sous-categorie n'est pas choisie. |
| Prix invalide | Refuser l'affichage client si le prix est vide, negatif ou egal a 0. |
| Stock negatif | Refuser l'affichage comme commandable ; le produit doit etre traite comme epuise jusqu'a correction. |

## Cas speciaux

- Si un produit a un stock egal a 0, il doit etre considere comme epuise.
- Si un produit a un stock negatif a cause d'une erreur admin, il doit etre considere comme epuise.
- Un produit avec un stock egal a 0 ne doit pas etre supprime automatiquement.
- Si un produit publie est epuise, il doit rester visible dans le catalogue tant que l'admin ne le masque pas ou ne le supprime pas.
- Si l'admin remet du stock sur un produit epuise, le produit redevient commandable.
- Un produit en stock ne doit pas afficher de label "disponible" dans le catalogue client.
- Un produit epuise doit afficher un label clair, par exemple "indisponible" ou "produit epuise".
- Un produit epuise doit avoir une action de commande desactivee ou impossible.
- L'apparence visuelle d'un produit epuise, par exemple carte grisee, sera definie dans `visual-rules.md`.
- Si un produit est masque par l'admin, il ne doit pas apparaitre dans le catalogue client.
- Un produit masque est different d'un produit epuise : un produit masque est invisible pour la cliente ; un produit epuise peut etre visible mais ne peut pas etre commande.
- Si une categorie est masquee, les produits de cette categorie ne doivent pas etre accessibles depuis le catalogue client.
- Si une sous-categorie est masquee, les produits de cette sous-categorie ne doivent pas etre accessibles depuis cette sous-categorie.
- Si un produit appartient a une categorie active mais a une sous-categorie masquee, il ne doit pas apparaitre dans cette sous-categorie.
- Si une categorie ne contient aucun produit visible, elle peut etre masquee du catalogue client.
- Si une sous-categorie ne contient aucun produit visible, elle peut etre masquee du catalogue client.
- Si une recherche est active et que la cliente change de categorie, la recherche doit continuer a s'appliquer dans la categorie choisie, sauf si elle est reinitialisee.
- Si la cliente utilise le site sur mobile, le catalogue doit rester simple a parcourir.

## Mobile

Le catalogue sera principalement utilise sur telephone mobile.

La cliente doit pouvoir :

- Parcourir les categories sans confusion.
- Voir rapidement la photo, le nom, le prix et si le produit est epuise.
- Rechercher un produit sans devoir parcourir tout le catalogue.
- Ajouter un produit en stock au panier depuis le catalogue ou depuis la fiche produit.
- Revenir facilement au catalogue apres avoir consulte un produit.

Les details visuels seront definis plus tard dans `visual-rules.md`.

## Regles metier

- Le catalogue client doit etre en russe.
- Les prix doivent etre affiches en roubles.
- Seuls les produits publies et valides doivent apparaitre dans le catalogue client.
- Un produit en stock doit avoir une quantite en stock superieure a 0.
- La quantite exacte en stock est une information admin et ne doit pas etre affichee dans le catalogue client.
- Le catalogue ne doit pas afficher de label "disponible" pour un produit en stock.
- Le catalogue doit afficher un label "indisponible" ou "produit epuise" pour un produit sans stock.
- Un produit epuise ne doit pas pouvoir etre ajoute au panier.
- Un produit epuise reste visible tant qu'il est publie et que l'admin ne l'a pas masque ou supprime.
- Un produit epuise peut redevenir commandable si l'admin ajoute une quantite en stock superieure a 0.
- Un produit masque ne doit jamais apparaitre dans le catalogue client.
- Un produit en brouillon ne doit jamais apparaitre dans le catalogue client.
- Un produit publie doit avoir au minimum un nom, une photo, un prix, une categorie, une sous-categorie, une description et un stock valide.
- En V1, chaque produit doit etre associe a une categorie et a une sous-categorie.
- Les categories et sous-categories de depart viennent de la Function Map, mais l'admin doit pouvoir les modifier.
- Le catalogue doit pouvoir accueillir de nouvelles categories plus tard.
- Les noms de categories et sous-categories visibles par les clientes doivent etre en russe.
- Les noms de categories en francais dans les specs servent seulement a organiser le projet.

## Critères d'acceptation

- Une cliente peut voir une liste de produits publies.
- Une cliente peut filtrer les produits par categorie.
- Une cliente peut filtrer les produits par sous-categorie.
- Une cliente peut rechercher un produit par son nom.
- Une cliente peut reinitialiser les filtres.
- Une cliente peut voir les nouveautes.
- Une cliente peut trier les produits par prix croissant et decroissant.
- Une cliente peut voir le prix en roubles.
- Une cliente voit clairement quand un produit est indisponible ou epuise.
- Une cliente ne voit pas de label "disponible" sur les produits en stock.
- Une cliente ne peut pas ajouter au panier un produit epuise.
- Un produit sans prix, sans photo, sans categorie, sans sous-categorie ou sans description n'apparait pas dans le catalogue client.
- Un produit masque par l'admin n'apparait pas dans le catalogue client.
- Un produit en brouillon n'apparait pas dans le catalogue client.
- Une categorie ou sous-categorie vide peut etre masquee du catalogue client.
- Les textes visibles par les clientes sont en russe.
