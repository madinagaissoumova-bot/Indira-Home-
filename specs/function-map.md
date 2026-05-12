# Function Map - Indira Home

Ce fichier liste ce que les utilisatrices peuvent faire sur le site.

Il ne decrit pas le design, les pages, les composants, la base de donnees ou la technique.

Les noms de categories et sous-categories sont decrits ici en francais pour la specification, mais ils devront etre affiches en russe sur le site client.

## Roles

### Cliente

Femme de tout age qui consulte le site, principalement depuis un telephone mobile, pour trouver des produits pour la maison et passer commande.

### Admin

Personne qui gere la boutique Indira Home, met a jour les produits et traite les commandes.

## Fonctions cliente

### Comprendre la boutique

La cliente peut :

- Identifier que le site appartient a Indira Home.
- Identifier que la boutique vend des articles pour la maison.
- Voir que les produits concernent principalement la vaisselle, l'electromenager, la decoration et les objets du quotidien.
- Voir que le site est en russe.
- Voir que la livraison initiale concerne la Republique tchetchene.
- Utiliser le site principalement depuis un telephone mobile.

### Consulter le catalogue

La cliente peut :

- Voir la liste des produits disponibles.
- Parcourir les produits par categorie.
- Parcourir les produits par sous-categorie.
- Voir les produits d'une categorie.
- Voir les produits d'une sous-categorie.
- Voir si un produit est disponible ou indisponible.
- Voir le prix d'un produit en roubles.
- Voir les photos d'un produit.
- Lire la description d'un produit.

### Categories et sous-categories de depart

Le catalogue peut etre organise avec ces categories et sous-categories :

| Categorie | Sous-categories possibles |
| --- | --- |
| Vaisselle | Services de table, saladiers, plats de service, verres, tasses, services a the, couverts, масленица |
| Cuisine | Batteries de cuisine, casseroles, poeles, marmites, mantovarki / мантоварки, faitouts, sauteuses, ustensiles de cuisine, planches a decouper, boites de conservation, accessoires de cuisson |
| Petit electromenager | Bouilloires, grille-pain, mixeurs, blenders, hachoirs, robots de cuisine, appareils a cafe, appareils de cuisson |
| Gros electromenager | Aspirateurs, appareils de nettoyage, nettoyeurs haute pression, nettoyeurs vapeur |
| Decoration | Vases, accessoires de decoration de table |
| Accessoires maison | Accessoires de cuisine, petits objets pratiques pour la maison |

Cette liste sert de structure de depart. L'admin doit pouvoir l'ajuster si la boutique ajoute d'autres types de produits.

### Rechercher ou trouver un produit

La cliente peut :

- Rechercher un produit par son nom.
- Trouver un produit en naviguant dans les categories.
- Trouver un produit en naviguant dans les sous-categories.
- Reperer rapidement les produits disponibles.
- Revenir au catalogue apres avoir consulte un produit.

### Preparer une commande

La cliente peut :

- Preparer une commande sans creer de compte et sans se connecter.
- Ajouter un produit disponible au panier.
- Ajouter plusieurs produits au panier.
- Modifier la quantite d'un produit dans le panier.
- Retirer un produit du panier.
- Voir le contenu du panier.
- Voir le total de la commande.

### Envoyer une commande

La cliente peut :

- Renseigner son nom.
- Renseigner son numero de telephone ou WhatsApp.
- Renseigner son adresse ou sa zone de livraison en Republique tchetchene.
- Choisir un mode de paiement hors ligne : paiement a la livraison ou virement apres confirmation.
- Valider la commande sans paiement en ligne.
- Recevoir une confirmation que la commande a ete envoyee.
- Voir que la boutique la contactera par telephone ou WhatsApp pour confirmer la commande au +7 988 906-41-06.

### Apres la commande

La cliente peut :

- Attendre le contact de la boutique.
- Confirmer ou ajuster la commande avec la boutique.
- Payer a la livraison ou par virement selon ce qui est convenu avec la boutique.

## Fonctions admin

### Acceder a l'espace admin

L'admin peut :

- Se connecter a l'espace admin.
- Se deconnecter de l'espace admin.
- Acceder aux fonctions de gestion uniquement apres connexion.

### Gerer les produits

L'admin peut :

- Ajouter un produit.
- Modifier un produit.
- Masquer un produit.
- Supprimer un produit si necessaire.
- Ajouter ou modifier le nom d'un produit.
- Ajouter ou modifier la description d'un produit.
- Ajouter ou modifier le prix en roubles.
- Ajouter ou modifier les photos d'un produit.
- Definir si un produit est disponible ou indisponible.
- Definir la quantite en stock d'un produit.
- Ajouter du stock a un produit.
- Retirer du stock a un produit.
- Corriger manuellement le stock d'un produit.
- Associer un produit a une categorie et a une sous-categorie.

### Gerer les categories

L'admin peut :

- Ajouter une categorie.
- Modifier une categorie.
- Supprimer une categorie seulement si elle ne contient aucun produit et aucune sous-categorie avec produits.
- Masquer une categorie si necessaire.
- Ajouter une sous-categorie.
- Modifier une sous-categorie.
- Supprimer une sous-categorie seulement si elle ne contient aucun produit.
- Masquer une sous-categorie si necessaire.
- Organiser les produits par categorie.
- Organiser les produits par sous-categorie.
- Ajouter plus tard de nouvelles categories si la boutique evolue.
- Masquer une categorie ou sous-categorie si elle contient encore des produits mais ne doit plus etre visible.

### Gerer le stock

L'admin peut :

- Definir la quantite disponible d'un produit.
- Ajouter une quantite au stock existant.
- Retirer une quantite du stock existant.
- Modifier manuellement la quantite disponible.
- Voir si un produit est en stock ou indisponible.
- Corriger le stock apres une erreur, une modification de commande, une annulation ou un reassort.
- Voir le stock diminuer automatiquement lorsqu'une commande est validee sur le site.
- Exemple : si le stock d'un produit est N et qu'une cliente commande 1 unite, le stock devient N - 1.

### Gerer les commandes

L'admin peut :

- Voir les nouvelles commandes.
- Voir les produits commandes.
- Voir les quantites commandees.
- Voir le total de la commande.
- Voir le nom de la cliente.
- Voir le numero de telephone ou WhatsApp de la cliente.
- Voir l'adresse ou la zone de livraison de la cliente.
- Voir le mode de paiement prevu : paiement a la livraison ou virement.
- Suivre l'etat d'une commande.
- Marquer une commande comme a confirmer.
- Marquer une commande comme confirmee.
- Marquer une commande comme livree.
- Marquer une commande comme annulee.
- Contacter la cliente par telephone ou WhatsApp avec le numero +7 988 906-41-06 pour confirmer la commande.

### Gerer la boutique

L'admin peut :

- Gerer les informations principales de la boutique.
- Verifier que les produits visibles sont corrects.
- Garder le catalogue a jour.
- Adapter le catalogue si de nouvelles categories sont ajoutees plus tard.

## Fonctions hors V1

Ces fonctions ne sont pas prevues dans la premiere version, mais peuvent etre ajoutees plus tard :

- Paiement en ligne integre.
- Livraison vers d'autres regions que la Republique tchetchene.
- Avis clients.
- Programme de fidelite.
- Application mobile native.
- Interface en plusieurs langues.

## Hors perimetre du projet

- Marketplace avec plusieurs vendeurs.

## Informations connues

- Numero de telephone / WhatsApp pour confirmer les commandes : +7 988 906-41-06.
