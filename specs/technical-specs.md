# Technical Specs - Indira Home

Ce fichier transforme les specifications produit en structure technique pour construire la V1.

## Objectif technique V1

Construire un site e-commerce simple pour une boutique unique :

- Catalogue public en russe.
- Parcours mobile-first.
- Panier sans compte cliente.
- Validation de commande sans paiement en ligne.
- Espace admin protege pour gerer produits, categories, stock et commandes.

## Pages publiques

| Page / route | Role |
| --- | --- |
| Accueil / `/` | Afficher les produits publies, les categories, la recherche et les filtres principaux |
| Categorie / `/categorie/:slug` | Afficher les produits d'une categorie visible |
| Sous-categorie / `/sous-categorie/:slug` | Afficher les produits d'une sous-categorie visible |
| Fiche produit / `/produit/:slug` | Afficher les details d'un produit publie et commandable ou epuise |
| Panier / `/panier` | Afficher les produits ajoutes, les quantites, les sous-totaux et le total |
| Validation commande / `/commande/valider` | Collecter les informations cliente et envoyer la commande |
| Confirmation commande / `/commande/confirmation` | Confirmer que la commande a ete envoyee |

Toutes les pages publiques doivent afficher les textes visibles en russe.

## Pages admin

| Page / route | Role |
| --- | --- |
| Connexion admin / `/admin/login` | Authentifier l'admin |
| Tableau de bord admin / `/admin` | Donner acces aux zones produits, categories, stock et commandes |
| Produits / `/admin/produits` | Lister, rechercher, creer, modifier, masquer, publier ou supprimer les produits |
| Edition produit / `/admin/produits/:id` | Modifier les informations produit, photos, prix, categorie, description et statut |
| Categories / `/admin/categories` | Gerer les categories et sous-categories |
| Stock / `/admin/stock` | Voir et ajuster les quantites disponibles |
| Commandes / `/admin/commandes` | Lister les commandes et suivre leur statut |
| Detail commande / `/admin/commandes/:id` | Lire les informations de commande, contacter la cliente, ajouter une note et changer le statut |

## Navigation publique

- Le catalogue est le point d'entree principal.
- La cliente doit pouvoir passer du catalogue a une fiche produit, puis revenir au catalogue.
- Les filtres de catalogue doivent etre conserves si possible au retour depuis une fiche produit.
- Le panier doit etre accessible depuis toutes les pages publiques.
- La validation de commande doit etre accessible uniquement depuis un panier valide.
- Apres validation reussie, la cliente arrive sur une page de confirmation.

## Navigation admin

- Les pages admin sont accessibles uniquement apres connexion.
- Une admin non connectee est redirigee vers la connexion.
- La navigation admin doit separer clairement : produits, categories, stock, commandes.
- L'admin doit pouvoir revenir a la liste apres avoir ouvert un produit ou une commande.
- Le tableau de bord admin est la page d'arrivee apres connexion.
- Le tableau de bord doit donner des acces rapides vers les commandes recentes, les produits et les alertes de stock.
- La liste des commandes recentes du tableau de bord doit afficher les 5 a 10 elements les plus recents, pas tout l'historique.

## Tableau de bord admin

Le tableau de bord doit afficher au minimum :

- Le nombre de commandes nouvelles.
- Le nombre de commandes en cours.
- Le nombre de produits publies.
- Le nombre de produits epuises.
- Le nombre de produits masques.
- Les commandes recentes, avec un lien vers chaque detail.
- Une alerte visuelle si des produits publies sont a stock 0.
- Des raccourcis vers `/admin/commandes`, `/admin/produits`, `/admin/stock` et `/admin/categories`.

## Composants publics

| Composant | Role |
| --- | --- |
| Header boutique | Afficher le nom Indira Home, l'acces panier et les informations principales |
| Liste categories | Permettre la navigation par categorie et sous-categorie |
| Barre de recherche | Rechercher un produit par nom |
| Filtres catalogue | Filtrer par categorie, sous-categorie, stock et nouveaute |
| Tri catalogue | Trier par defaut, prix croissant, prix decroissant, nouveautes |
| Carte produit | Afficher photo, nom, prix, categorie/sous-categorie, nouveaute et etat epuise, sans quantite exacte |
| Galerie produit | Afficher les photos d'une fiche produit |
| Controle quantite | Augmenter ou diminuer une quantite sans depasser le stock |
| Ligne panier | Afficher produit, prix, quantite, sous-total et etat |
| Recapitulatif panier | Afficher total et action de validation |
| Formulaire commande | Collecter nom, telephone/WhatsApp, adresse/zone et paiement prevu |
| Message de retour | Afficher succes, erreur ou etat vide |

## Composants admin

| Composant | Role |
| --- | --- |
| Formulaire connexion | Connecter l'admin |
| Bandeau navigation admin | Permettre d'aller vers dashboard, produits, stock, categories et commandes |
| Cartes resume dashboard | Afficher compteurs et alertes principales |
| Liste commandes recentes | Afficher les nouvelles commandes depuis le dashboard |
| Tableau produits | Lister les produits avec statut, stock, prix et actions |
| Formulaire produit | Creer ou modifier un produit |
| Gestion photos | Ajouter, remplacer ou supprimer les photos produit |
| Gestion categories | Ajouter, modifier, masquer, afficher, ordonner et supprimer si autorise |
| Ajustement stock | Ajouter, retirer ou corriger une quantite |
| Tableau commandes | Lister les commandes avec statut, date, cliente et total |
| Detail commande | Afficher produits, cliente, paiement, livraison, note et actions de statut |

## Modele de donnees

### Product

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| slug | Texte | Utilise pour les routes publiques |
| name | Texte | Visible en russe cote client |
| description | Texte | Obligatoire pour publication |
| priceRub | Nombre entier | Prix en roubles, strictement superieur a 0 |
| categoryId | Identifiant | Obligatoire pour publication |
| subcategoryId | Identifiant | Obligatoire pour publication |
| images | Liste d'images | Au moins une image pour publication |
| stockQuantity | Nombre entier | Toujours egal ou superieur a 0 |
| status | Enum | draft, published, hidden |
| isNew | Booleen | Optionnel |
| brand | Texte | Optionnel |
| characteristics | Liste cle/valeur | Optionnel |
| displayOrder | Nombre | Optionnel |
| createdAt | Date | Automatique |
| updatedAt | Date | Automatique |

### Category

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| slug | Texte | Utilise pour les routes publiques |
| name | Texte | Nom visible en russe |
| status | Enum | visible, hidden |
| displayOrder | Nombre | Ordre client/admin |
| createdAt | Date | Automatique |
| updatedAt | Date | Automatique |

### Subcategory

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| categoryId | Identifiant | Categorie parente |
| slug | Texte | Utilise pour les routes publiques |
| name | Texte | Nom visible en russe |
| status | Enum | visible, hidden |
| displayOrder | Nombre | Ordre dans la categorie |
| createdAt | Date | Automatique |
| updatedAt | Date | Automatique |

### CartItem

Le panier peut etre stocke cote client tant que la commande n'est pas validee.

| Champ | Type attendu | Notes |
| --- | --- | --- |
| productId | Identifiant | Produit ajoute |
| quantity | Nombre entier | Minimum 1 |

Les prix et stocks doivent etre reverifies cote serveur au moment de l'affichage critique et de la validation.

### Order

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| orderNumber | Texte ou nombre | Lisible par l'admin |
| customerName | Texte | Obligatoire |
| customerPhone | Texte | Telephone ou WhatsApp |
| deliveryAddressOrZone | Texte | Republique tchetchene uniquement en V1 |
| paymentMethod | Enum | cash_on_delivery, transfer_after_confirmation |
| status | Enum | new, to_confirm, confirmed, preparing, delivered, cancelled |
| totalRub | Nombre entier | Total fige a la validation |
| adminNote | Texte | Optionnel |
| createdAt | Date | Date de validation |
| updatedAt | Date | Automatique |

### OrderItem

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| orderId | Identifiant | Commande parente |
| productId | Identifiant | Reference si le produit existe encore |
| productNameSnapshot | Texte | Nom fige au moment de la commande |
| productImageSnapshot | Image | Image principale au moment de la commande si possible |
| unitPriceRub | Nombre entier | Prix fige au moment de la validation |
| quantity | Nombre entier | Quantite commandee |
| subtotalRub | Nombre entier | Prix unitaire x quantite |

## API / actions serveur

Les noms exacts peuvent varier selon le framework, mais la V1 doit couvrir ces actions.

### Public

| Action | Role |
| --- | --- |
| Lister les produits publics | Retourner les produits publies, valides, avec filtres et tri |
| Lire un produit public | Retourner une fiche produit accessible cote client |
| Lister les categories visibles | Retourner categories et sous-categories visibles |
| Verifier le panier | Recalculer prix, etats, quantites disponibles et total |
| Creer une commande | Valider le panier, figer les prix, diminuer le stock et creer la commande |

### Admin

| Action | Role |
| --- | --- |
| Se connecter | Authentifier l'admin |
| Se deconnecter | Fermer la session admin |
| Lire le tableau de bord | Retourner les compteurs, commandes recentes et alertes de stock |
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
- Une commande validee doit decrementer le stock apres la transaction reussie.
- Les listes du dashboard doivent pouvoir afficher au maximum les 10 commandes recentes.

## Authentification

- Les clientes ne creent pas de compte.
- L'espace admin exige une connexion.
- Les routes/actions admin doivent verifier la session cote serveur.
- La V1 peut commencer avec un seul compte admin.
- Les identifiants admin ne doivent pas etre exposes dans le code client.
- La connexion admin doit utiliser une session server-side ou un cookie de session securise.
- Les pages `/admin` et `/admin/*` doivent rediriger vers `/admin/login` si la session est absente ou expiree.

## Gestion des images

- Chaque produit publie doit avoir au moins une photo.
- Une photo principale doit etre definie par la premiere image ou un champ equivalent.
- Les images doivent etre optimisees pour mobile.
- Les images manquantes ne doivent pas permettre la publication.
- Les commandes peuvent garder une reference ou un snapshot de l'image principale pour rester lisibles apres modification produit.
- Les uploads admin doivent limiter les formats image acceptes aux formats standards du framework retenu.
- Les images supprimees d'un produit deja commande ne doivent pas casser l'affichage du snapshot de commande.
- Les photos, noms, descriptions, prix et categories des produits doivent etre geres par l'admin depuis l'espace admin, sans intervention technique.

## Internationalisation

- Les textes visibles par les clientes sont en russe.
- Les categories et sous-categories visibles par les clientes sont en russe.
- Les specs restent en francais.
- L'admin peut aussi etre en russe dans l'interface finale, meme si la specification documente les comportements en francais.
- Les identifiants techniques, enums et champs de donnees peuvent rester en anglais dans la base et l'API.

## Hebergement et configuration

La decision finale dependra du framework choisi, mais la V1 doit prevoir :

- Une base de donnees persistante.
- Un stockage d'images.
- Des variables d'environnement pour les secrets.
- Un environnement de production protege.
- Des sauvegardes ou export possible des donnees commandes/produits.
- Un mecanisme de migration de schema.
- Un journal minimal des erreurs serveur pour depister les echecs de validation ou de session.

## Tests attendus

- Filtrage, recherche et tri catalogue.
- Produit epuise non commandable.
- Produit masque invisible.
- Panier avec quantite maximale bloquee.
- Validation impossible avec panier invalide.
- Validation reussie qui cree une commande et diminue le stock.
- Concurrence sur dernier produit : une seule commande doit reussir.
- Tableau de bord admin : compteurs, commandes recentes et liens rapides.
- Authentification admin : acces refuse sans session.
- Admin produit : publication impossible si champs obligatoires manquants.
- Admin categorie : suppression impossible si produits associes.
- Admin commande : changement de statut et conservation des prix snapshots.
