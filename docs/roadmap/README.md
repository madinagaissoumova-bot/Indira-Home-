# Roadmap - Indira Home

Ce fichier donne une vue produit de la progression du projet.

Le minimum indispensable de la V1 est detaille dans `docs/roadmap/v1.md`.
Les evolutions suivantes sont detaillees dans `docs/roadmap/v2.md`.

Le detail d'execution reste dans `docs/specs/work-plan.md`. Les regles fonctionnelles restent dans les fiches de `docs/specs/feature-specs/`.

## Vue simple V1 / V2

| Version | Objectif | Statut |
| --- | --- | --- |
| V1 | Lancer une boutique fonctionnelle : catalogue, panier, commande sans paiement en ligne, admin complet. | En finalisation |
| V2 | Ajouter le paiement en ligne et ameliorer l'exploitation quotidienne : images, exports, filtres admin, notifications, livraison et confort de gestion. | A planifier apres V1 |

La V1 reste la priorite absolue. La V2 ne doit pas retarder la livraison V1.

## Objectif V1

Livrer une premiere version complete pour une boutique unique :

- catalogue public en russe ;
- navigation par categories et sous-categories ;
- fiche produit ;
- panier local sans compte cliente ;
- validation de commande sans paiement en ligne ;
- confirmation de commande ;
- espace admin protege ;
- gestion produits, categories, stock et commandes ;
- experience mobile-first.

La V1 est consideree terminee seulement quand le parcours cliente et l'admin fonctionnent tous les deux.

## Principes de priorisation

1. Rendre le parcours cliente commandable avant d'ajouter du confort secondaire.
2. Proteger les regles metier critiques : stock, prix figes, produits visibles, commandes.
3. Garder l'admin assez complet pour que la boutique puisse vivre sans intervention technique.
4. Garder les textes visibles par les clientes en russe.
5. Ne pas ajouter de paiement en ligne, compte cliente, marketplace ou livraison hors Republique tchetchene en V1.

## Lots de livraison V1

### Lot 0 - Base projet et donnees

Objectif : poser la base technique et les donnees centrales.

Inclus :

- Next.js App Router ;
- Prisma avec Supabase PostgreSQL ;
- modeles Category, Subcategory, Product, Order, OrderItem ;
- constantes de statuts et modes de paiement ;
- seed de categories et sous-categories ;
- validations serveur de base.

Sortie attendue :

- le projet demarre localement ;
- les donnees principales peuvent etre creees ;
- les statuts et relations sont coherents avec les specs.

### Lot 1 - Catalogue client

Objectif : permettre aux clientes de voir et trouver les produits.

Inclus :

- page `/` ;
- routes `/category/:slug` et `/subcategory/:slug` ;
- cartes produit ;
- recherche par nom ;
- filtres categorie, sous-categorie, en stock, nouveaute ;
- tris par defaut, prix croissant, prix decroissant, nouveautes ;
- gestion des produits epuises ;
- textes client en russe.
- accueil compact servant d'entree vers le catalogue ;
- pages categorie comme pages de collection distinctes ;
- acces rapide aux sous-categories depuis le header et les pages categorie.

Sortie attendue :

- seuls les produits publies et visibles apparaissent ;
- les produits epuises restent visibles mais non commandables ;
- les categories masquees et sous-categories masquees ne sont pas visibles cote cliente.

### Lot 2 - Fiche produit et panier

Objectif : permettre a la cliente de preparer une commande.

Inclus :

- route `/product/:slug` ;
- galerie photos ;
- description, prix, categorie, sous-categorie et caracteristiques ;
- ajout au panier depuis catalogue et fiche produit ;
- stockage panier en `localStorage` avec seulement `productId` et `quantity` ;
- route `/cart` ;
- modification quantites, retrait, vidage panier ;
- verification prix et stock avant validation.

Sortie attendue :

- une cliente peut ajouter et modifier des produits dans son panier ;
- le stock exact n'est jamais affiche cote cliente ;
- un produit epuise, masque, brouillon ou dans une categorie masquee bloque la validation.

### Lot 3 - Commande client

Objectif : transformer un panier valide en commande admin.

Inclus :

- route `/checkout` ;
- champs nom, telephone/WhatsApp, adresse ou zone ;
- choix paiement a la livraison ou virement apres confirmation ;
- recapitulatif de commande ;
- validation serveur du panier et des champs ;
- creation transactionnelle de commande ;
- snapshots nom, image et prix ;
- decrement stock dans la meme transaction ;
- route `/checkout/confirmation` ;
- route `/privacy` ;
- vidage ou marquage du panier local apres validation.

Sortie attendue :

- une commande peut etre envoyee sans compte et sans paiement en ligne ;
- les prix sont figes ;
- le stock diminue uniquement apres validation reussie ;
- recharger la confirmation ne recree pas de commande ;
- une meme tentative checkout ne cree qu'une commande ;
- aucune donnee personnelle n'est exposee sur la page de confirmation.

### Lot 4 - Auth admin et dashboard

Objectif : proteger l'espace admin et donner une vue centrale.

Inclus :

- route `/admin/login` ;
- session admin avec `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET` ;
- cookie HTTP-only `indira_admin_session` ;
- protection des routes et actions admin ;
- deconnexion ;
- route `/admin` ;
- compteurs dashboard ;
- commandes recentes ;
- alertes produits epuises ;
- raccourcis admin.

Sortie attendue :

- une admin connectee accede au dashboard ;
- une session absente ou invalide est refusee ;
- les actions admin ne modifient rien sans session valide.

### Lot 5 - Admin catalogue

Objectif : permettre a la boutique de maintenir les produits et categories.

Inclus :

- `/admin/products` ;
- `/admin/products/:id` ;
- creation et edition produit ;
- brouillon, publication, masquage ;
- suppression seulement si autorisee ;
- gestion URLs d'images ;
- prix, description, stock initial, nouveaute, caracteristiques ;
- `/admin/categories` ;
- creation, edition, masquage, affichage, ordre et suppression autorisee des categories et sous-categories.

Sortie attendue :

- l'admin peut creer un produit complet et le publier ;
- un produit incomplet ne peut pas etre publie ;
- un produit deja present dans une commande validee ne peut pas etre supprime definitivement ;
- les changements admin se refletent cote cliente.

### Lot 6 - Admin stock

Objectif : permettre le suivi quotidien des quantites.

Inclus :

- route `/admin/stock` ;
- vue des stocks produits ;
- ajout de stock ;
- retrait de stock ;
- correction manuelle ;
- refus des valeurs negatives ou non entieres ;
- etat epuise calcule depuis le stock.

Sortie attendue :

- un produit a stock 0 devient epuise cote cliente ;
- un reassort rend le produit commandable si le reste des conditions est valide ;
- les clientes ne voient jamais la quantite exacte.

### Lot 7 - Admin commandes

Objectif : permettre a l'admin de traiter les commandes.

Inclus :

- route `/admin/orders` ;
- route `/admin/orders/:id` ;
- liste commandes avec statut, date, cliente et total ;
- detail commande avec produits, quantites, snapshots, livraison, paiement ;
- changement de statut ;
- note interne ;
- liens telephone/WhatsApp si possible ;
- confirmation avant annulation.

Sortie attendue :

- une commande cliente apparait dans l'admin ;
- l'admin peut suivre son statut ;
- les prix snapshots restent lisibles apres modification produit ;
- une commande reste lisible si un produit est masque.

### Lot 8 - Polish mobile, contenu et verification V1

Objectif : rendre la V1 livrable.

Inclus :

- textes clients russes relus ;
- contenu client centralise autant que possible ;
- responsive mobile, tablette et desktop ;
- verification visuelle des cartes, filtres, panier, checkout ;
- verification des etats vides et erreurs ;
- checklist `docs/testing/test-plan.md` ;
- variables d'environnement ;
- sauvegarde/export prevu avant production.

Sortie attendue :

- une cliente peut commander entierement depuis mobile ;
- les boutons sont utilisables au pouce ;
- aucun texte important ne deborde ;
- la V1 respecte la Definition of Done.

## Definition of Done V1

- Une cliente peut trouver un produit, l'ajouter au panier et envoyer une commande.
- Les produits epuises ne sont jamais commandables.
- Les commandes diminuent le stock uniquement apres validation reussie.
- Les prix des commandes sont figes.
- Les textes client sont en russe.
- Le site est utilisable principalement sur mobile.
- L'admin peut creer les produits, ajuster le stock et traiter les commandes.
- Les routes admin sont protegees par connexion.
- Les donnees de commande restent lisibles dans l'espace admin.
- La checklist `docs/testing/test-plan.md` est passee.

## Hors V1

Ces sujets ne doivent pas bloquer la V1 :

- paiement en ligne ;
- compte cliente ;
- livraison hors Republique tchetchene ;
- marketplace multi-vendeurs ;
- avis clients ;
- programme de fidelite ;
- application mobile native ;
- interface multilingue ;
- notifications automatiques SMS ou WhatsApp ;
- upload image avance vers stockage dedie.

## Roadmap apres V1

### V2 - Paiement en ligne, exploitation et confort

Voir `docs/roadmap/v2.md`.

Objectif : ajouter le paiement en ligne apres une V1 stable, puis rendre la gestion quotidienne plus confortable sans changer le modele simple de boutique unique.

Exemples :

- paiement en ligne avec statuts de paiement separes ;
- upload d'images admin ;
- exports commandes ;
- filtres admin plus avances ;
- notifications automatiques simples ;
- zones et frais de livraison configurables ;
- sauvegardes et operations plus robustes.

## Risques a surveiller

- Stock concurrent sur le dernier produit.
- Images externes cassees ou lentes.
- Donnees personnelles visibles dans logs ou pages publiques.
- Textes client non traduits en russe.
- Admin incomplet qui oblige a modifier les produits dans le code.
- Base Supabase sans sauvegarde ou procedure de restauration verifiee.
