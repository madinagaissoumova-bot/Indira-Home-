# Specification Fonctionnelle - Fiche produit

## Objectif

Permettre a une cliente de consulter les details d'un produit avant de l'ajouter au panier.

La fiche produit doit aider la cliente a comprendre ce qu'elle achete : photos, prix, etat du produit, description, categorie et informations utiles.

## Utilisatrices concernees

- Cliente
- Admin, indirectement, car les informations affichees viennent de la gestion produit

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Nom du produit | Nom complet du produit | Oui |
| Photos du produit | Photos visibles sur la fiche produit | Oui |
| Prix | Prix affiche en roubles | Oui |
| Categorie | Categorie du produit | Oui |
| Sous-categorie | Sous-categorie du produit | Oui |
| Description | Description detaillee du produit | Oui |
| Etat du produit | Etat calcule a partir du stock : commandable ou epuise | Oui |
| Quantite en stock | Quantite disponible geree par l'admin | Oui |
| Marque | Marque du produit si elle existe | Non |
| Caracteristiques | Informations utiles selon le produit : taille, matiere, volume, puissance, dimensions, contenu du set | Non |
| Statut nouveaute | Indique si le produit est nouveau | Non |
| Statut de publication | Publie, masque ou brouillon | Oui |

## Informations visibles sur la fiche produit

La cliente doit pouvoir voir :

- Nom du produit.
- Photos du produit.
- Prix en roubles.
- Etat du produit si le produit est epuise.
- Description detaillee.
- Categorie.
- Sous-categorie.
- Caracteristiques si elles existent.
- Indication "nouveau" si le produit est marque comme nouveaute.

## Regles visuelles de la fiche

La fiche produit doit donner plus de place a l'objet que les cartes catalogue : grande image principale, galerie stable, prix lisible et action d'achat claire.

La zone achat doit rester calme et lisible. Elle peut etre sticky sur desktop si cela n'occulte pas le contenu, mais elle doit revenir a une lecture verticale simple sur mobile.

Les informations de service, livraison et confirmation doivent rassurer sans devenir un long bloc explicatif. Elles doivent rester secondaires par rapport a la photo, au nom, au prix et a l'action panier.

## Actions possibles

La cliente peut :

- Ouvrir une fiche produit depuis le catalogue.
- Voir plusieurs photos si elles existent.
- Lire la description du produit.
- Voir le prix.
- Voir si le produit est epuise.
- Choisir une quantite a ajouter au panier.
- Ajouter le produit au panier si le produit est en stock.
- Revenir au catalogue.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Ajouter au panier | Ajouter le produit en stock au panier |
| Augmenter la quantite | Ajouter une unite a la quantite choisie |
| Diminuer la quantite | Retirer une unite a la quantite choisie |
| Retour au catalogue | Revenir au catalogue ou aux resultats precedents |
| Voir photo suivante | Voir une autre photo du produit |
| Voir photo precedente | Revenir a la photo precedente |

## Messages

| Situation | Message attendu |
| --- | --- |
| Produit en stock | Ne pas afficher de label "disponible" ; permettre l'ajout au panier. |
| Produit epuise | Produit indisponible ou produit epuise. |
| Produit ajoute au panier | Produit ajoute au panier. |
| Quantite trop elevee | La quantite demandee depasse le stock disponible. |
| Produit introuvable | Produit introuvable. |

Les messages visibles par les clientes devront etre affiches en russe sur le site.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Produit masque | Ne pas afficher la fiche produit a la cliente. |
| Produit en brouillon | Ne pas afficher la fiche produit a la cliente. |
| Categorie masquee | Ne pas afficher la fiche produit a la cliente. |
| Sous-categorie masquee | Ne pas afficher la fiche produit a la cliente. |
| Produit sans prix | Ne pas afficher la fiche produit a la cliente tant que le prix n'est pas renseigne. |
| Produit sans photo | Ne pas afficher la fiche produit a la cliente tant qu'au moins une photo n'est pas ajoutee. |
| Produit sans categorie ou sous-categorie | Ne pas afficher la fiche produit a la cliente tant que l'organisation du produit n'est pas complete. |
| Quantite demandee superieure au stock | Refuser l'ajout au panier et afficher un message clair. |
| Quantite demandee inferieure a 1 | Revenir a une quantite minimale de 1. |

## Cas speciaux

- Si le stock est egal a 0, le produit est epuise et ne peut pas etre ajoute au panier.
- Si le stock est negatif a cause d'une erreur admin, le produit est traite comme epuise.
- Un produit avec un stock egal a 0 ne doit pas etre supprime automatiquement.
- Si un produit publie est epuise, sa fiche doit rester visible tant que l'admin ne le masque pas ou ne le supprime pas.
- Si l'admin remet du stock sur un produit epuise, la fiche produit doit permettre a nouveau l'ajout au panier.
- Un produit en stock ne doit pas afficher de label "disponible".
- Un produit epuise doit afficher un label clair, par exemple "indisponible" ou "produit epuise".
- Si un produit est masque, la cliente ne doit pas acceder a sa fiche produit.
- Si une categorie ou sous-categorie du produit est masquee, le produit ne doit pas etre accessible cote cliente, meme via son URL directe.
- Si une cliente arrive sur une fiche produit qui n'est plus disponible, elle doit voir que le produit ne peut pas etre commande.
- Si la cliente revient au catalogue, les filtres ou la recherche precedents doivent etre conserves si possible.

## Regles metier

- La fiche produit visible par les clientes doit etre en russe.
- Le prix doit etre affiche en roubles.
- Un produit en stock doit avoir un stock superieur a 0.
- Un produit epuise ne peut pas etre ajoute au panier.
- La quantite exacte en stock est une information admin et ne doit pas etre affichee dans la fiche produit client.
- La fiche produit ne doit pas afficher de label "disponible" pour un produit en stock.
- La fiche produit doit afficher un label "indisponible" ou "produit epuise" pour un produit sans stock.
- La quantite ajoutee au panier ne peut pas depasser le stock disponible.
- Un produit epuise reste accessible tant qu'il est publie, que l'admin ne l'a pas masque ou supprime, et que sa categorie et sa sous-categorie restent visibles.
- Un produit epuise peut redevenir commandable si l'admin ajoute une quantite en stock superieure a 0.
- La quantite minimale a ajouter au panier est 1.
- Un produit publie doit avoir un nom, une photo, un prix, une categorie, une sous-categorie, une description et un stock valide.
- Les caracteristiques produit sont facultatives, car elles dependent du type de produit.

## Critères d'acceptation

- Une cliente peut ouvrir une fiche produit depuis le catalogue.
- Une cliente peut voir le nom, les photos, le prix et la description du produit.
- Une cliente peut voir la categorie et la sous-categorie du produit.
- Une cliente peut ajouter un produit en stock au panier.
- Une cliente ne voit pas de label "disponible" sur un produit en stock.
- Une cliente voit clairement quand un produit est indisponible ou epuise.
- Une cliente ne peut pas ajouter un produit epuise au panier.
- Une cliente ne peut pas ajouter une quantite superieure au stock disponible.
- Un produit masque ou en brouillon n'est pas accessible cote cliente.
- Un produit sans prix, sans photo, sans categorie, sans sous-categorie ou sans description n'est pas accessible cote cliente.
- Les textes visibles par les clientes sont en russe.
