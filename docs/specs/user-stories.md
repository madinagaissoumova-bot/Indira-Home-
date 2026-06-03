# User Stories - Indira Home

Ce fichier sert a verifier les parcours comme si une vraie utilisatrice testait le site.

## Objectif

Verifier que la V1 permet :

- a une cliente de trouver un produit et envoyer une commande simplement ;
- a l'admin de maintenir le catalogue, le stock et les commandes ;
- au site de respecter les regles metier documentees dans les feature specs.

## Cliente - consulter le catalogue

### Story

En tant que cliente, je veux ouvrir le site Indira Home et voir rapidement les produits publies, afin de comprendre ce que la boutique vend.

### Verification

- La cliente arrive sur un catalogue en russe.
- Elle voit le nom Indira Home.
- Elle voit des produits publies.
- Chaque produit visible affiche au minimum photo, nom et prix en roubles.
- Les produits masques ou en brouillon ne sont pas visibles.

## Cliente - naviguer par categorie

### Story

En tant que cliente, je veux parcourir les produits par categorie et sous-categorie, afin de trouver plus vite un type d'article.

### Verification

- La cliente voit les categories visibles.
- Elle peut ouvrir une categorie.
- Elle peut ouvrir une sous-categorie.
- Les categories et sous-categories masquees ne sont pas visibles.
- Une categorie sans produit visible n'est pas proposee ou affiche un etat vide clair.

## Cliente - rechercher un produit

### Story

En tant que cliente, je veux rechercher un produit par son nom, afin de ne pas parcourir tout le catalogue.

### Verification

- La recherche accepte un nom de produit.
- Les resultats correspondent au texte saisi.
- Une recherche vide ne bloque pas le catalogue.
- Si aucun produit ne correspond, un message en russe l'indique.
- La cliente peut effacer la recherche.

## Cliente - filtrer et trier

### Story

En tant que cliente, je veux filtrer les produits en stock, voir les nouveautes et trier par prix, afin de comparer facilement les articles.

### Verification

- Le filtre "en stock uniquement" masque les produits epuises.
- Le filtre nouveaute affiche les produits marques comme nouveaux.
- Le tri prix croissant fonctionne.
- Le tri prix decroissant fonctionne.
- La cliente peut reinitialiser les filtres.

## Cliente - lire une fiche produit

### Story

En tant que cliente, je veux ouvrir une fiche produit, afin de voir les photos, la description et les details avant de commander.

### Verification

- La fiche affiche nom, photos, prix, description, categorie et sous-categorie.
- Les caracteristiques facultatives s'affichent si elles existent.
- Un produit en stock ne montre pas de label "disponible".
- Un produit epuise montre un label clair d'indisponibilite.
- La cliente peut revenir au catalogue.

## Cliente - ajouter au panier

### Story

En tant que cliente, je veux ajouter un produit en stock au panier, afin de preparer ma commande.

### Verification

- L'ajout fonctionne depuis le catalogue ou la fiche produit.
- Le panier affiche le produit ajoute.
- Le total est calcule en roubles.
- La quantite minimale est 1.
- La cliente ne peut pas ajouter un produit epuise.
- La cliente ne voit pas la quantite exacte en stock.

## Cliente - modifier le panier

### Story

En tant que cliente, je veux modifier les quantites ou retirer un produit, afin de corriger ma commande avant validation.

### Verification

- La cliente peut augmenter une quantite tant que le stock le permet.
- La cliente ne peut pas depasser le stock disponible.
- La cliente peut diminuer une quantite.
- La cliente peut retirer un produit.
- La cliente peut vider le panier.
- Un panier vide ne permet pas d'aller a la validation.

## Cliente - produit devenu indisponible

### Story

En tant que cliente, je veux etre informee si un produit de mon panier devient indisponible, afin de corriger ma commande.

### Verification

- Un produit devenu epuise reste visible dans le panier.
- Le panier affiche clairement qu'il est indisponible.
- La validation de commande est bloquee.
- La cliente peut retirer le produit ou corriger la quantite si une quantite reste disponible.

## Cliente - valider une commande

### Story

En tant que cliente, je veux envoyer ma commande sans creer de compte et sans paiement en ligne, afin que la boutique me contacte pour confirmer.

### Verification

- La cliente peut acceder au formulaire depuis un panier valide.
- Elle doit renseigner son nom.
- Elle doit renseigner son telephone ou WhatsApp.
- Elle doit renseigner son adresse ou zone de livraison.
- Elle doit choisir paiement a la livraison ou virement apres confirmation.
- Elle voit un recapitulatif avant validation.
- La commande est creee sans paiement en ligne.
- Le message de confirmation indique que la boutique contactera la cliente.

## Cliente - voir la confirmation

### Story

En tant que cliente, je veux voir une confirmation apres l'envoi de ma commande, afin de savoir que la boutique l'a bien recue.

### Verification

- La cliente arrive sur `/checkout/confirmation` apres une commande reussie.
- La page indique que la commande a ete envoyee.
- La page affiche le numero WhatsApp public de la boutique : +7 988 906-41-06.
- La page propose de revenir au catalogue.
- La page ne propose pas de paiement en ligne.
- La page ne propose pas d'annulation cliente.
- La page n'affiche pas l'adresse complete ou le telephone de la cliente.
- Recharger la page ne cree pas une nouvelle commande.

## Cliente - livraison hors zone V1

### Story

En tant que cliente, je veux comprendre si ma zone n'est pas livree, afin de ne pas envoyer une commande impossible.

### Verification

- Le formulaire demande une adresse ou zone en Republique tchetchene.
- Une zone hors perimetre V1 bloque la validation si elle est clairement detectee.
- Une zone ambigue mais non vide peut etre recue puis confirmee manuellement par la boutique.
- Le message indique que la livraison V1 est limitee a la Republique tchetchene.

## Admin - connexion

### Story

En tant qu'admin, je veux me connecter a un espace protege, afin de gerer la boutique.

### Verification

- Une admin non connectee ne peut pas acceder aux pages admin.
- Une connexion valide ouvre le tableau de bord.
- L'admin peut se deconnecter.

## Admin - tableau de bord

### Story

En tant qu'admin, je veux voir un tableau de bord central apres connexion, afin d'acceder rapidement aux commandes, aux produits, au stock et aux categories.

### Verification

- Le tableau de bord affiche chiffre d'affaires, nombre de commandes, nombre de produits et produits en rupture.
- Le tableau de bord affiche les commandes recentes dans un tableau.
- Le tableau de bord affiche les produits recemment ajoutes.
- L'admin peut ouvrir les commandes recentes depuis le tableau de bord.
- L'admin peut acceder rapidement aux produits, categories, commandes et stock via la navigation admin.
- Une cliente ne voit jamais ce tableau de bord.

## Admin - gerer un produit

### Story

En tant qu'admin, je veux creer et publier un produit complet, afin qu'il apparaisse dans le catalogue.

### Verification

- L'admin peut creer un produit en brouillon.
- La publication est impossible sans nom, photo, prix, categorie, sous-categorie, description et stock valide.
- Un produit publie apparait cote cliente.
- Un produit masque n'apparait plus cote cliente.
- Un produit supprime n'apparait plus cote cliente.
- Un produit deja present dans une commande validee ne peut pas etre supprime definitivement en V1.

## Admin - gerer categories et sous-categories

### Story

En tant qu'admin, je veux organiser les produits par categories et sous-categories, afin que le catalogue reste clair.

### Verification

- L'admin peut ajouter, modifier, masquer et afficher une categorie.
- L'admin peut ajouter, modifier, masquer et afficher une sous-categorie.
- La suppression d'une categorie avec produits est refusee.
- La suppression d'une sous-categorie avec produits est refusee.
- Les categories masquees ne sont pas visibles cote cliente.

## Admin - gerer le stock

### Story

En tant qu'admin, je veux ajuster le stock d'un produit, afin que le catalogue reflete les quantites disponibles.

### Verification

- L'admin peut ajouter du stock.
- L'admin peut retirer du stock.
- L'admin peut corriger le stock.
- Le stock negatif est refuse.
- Un produit a stock 0 devient epuise cote cliente.
- Un produit epuise redevient commandable apres ajout de stock.

## Admin - recevoir une commande

### Story

En tant qu'admin, je veux voir les nouvelles commandes, afin de contacter les clientes et organiser la livraison.

### Verification

- Une commande validee apparait automatiquement dans l'espace admin.
- L'admin voit nom, telephone/WhatsApp, adresse ou zone de livraison.
- L'admin voit produits, quantites, prix unitaires et total.
- L'admin voit le mode de paiement prevu.
- L'admin peut ouvrir le detail de la commande.

## Admin - suivre une commande

### Story

En tant qu'admin, je veux changer le statut d'une commande, afin de suivre son traitement.

### Verification

- Le statut initial stocke est `NEW`, affiche comme "Nouvelle" dans l'admin.
- L'admin peut passer une commande a confirmer, confirmee, en preparation, livree ou annulee.
- L'annulation demande confirmation.
- La cliente ne peut pas annuler elle-meme depuis le site.
- L'admin peut ajouter une note interne.

## Regles transverses a verifier

- Les prix visibles sont en roubles.
- Les textes client sont en russe.
- Le site est utilisable sur mobile.
- Le stock diminue uniquement apres validation reussie d'une commande.
- Une validation echouee ne diminue pas le stock.
- Les prix d'une commande validee restent figes meme si le prix produit change ensuite.
- Une commande reste lisible meme si un produit est masque plus tard.
- Un produit deja present dans une commande validee ne peut pas etre supprime definitivement en V1.
