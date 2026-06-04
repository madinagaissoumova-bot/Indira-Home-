# Technical Spec - Routes Et Navigation

## Pages publiques

| Page / route | Role |
| --- | --- |
| Accueil / `/` | Afficher les produits publies, les categories, la recherche et les filtres principaux |
| Categorie / `/category/:slug` | Afficher les produits d'une categorie visible |
| Sous-categorie / `/subcategory/:slug` | Afficher les produits d'une sous-categorie visible |
| Fiche produit / `/product/:slug` | Afficher les details d'un produit publie dans une categorie et sous-categorie visibles, commandable ou epuise |
| Recherche / `/search` | Afficher les resultats d'une recherche produit |
| Panier / `/cart` | Afficher les produits ajoutes, les quantites, les sous-totaux et le total |
| Validation commande / `/checkout` | Collecter les informations cliente et envoyer la commande |
| Confirmation commande / `/checkout/confirmation` | Confirmer que la commande a ete envoyee |
| Confidentialite / `/privacy` | Expliquer les donnees collectees pour traiter les commandes |

Toutes les pages publiques doivent afficher les textes visibles en russe.

Les routes publiques utilisent des segments techniques en anglais pour rester simples et compatibles avec le code Next.js. Les textes visibles, titres, boutons et messages restent en russe cote cliente.

## Pages admin

| Page / route | Role |
| --- | --- |
| Connexion admin / `/admin/login` | Authentifier l'admin |
| Tableau de bord admin / `/admin` | Donner acces aux zones produits, categories, stock et commandes |
| Produits / `/admin/products` | Lister, rechercher, creer, modifier, masquer, publier ou supprimer les produits |
| Edition produit / `/admin/products/:id` | Modifier les informations produit, photos, prix, categorie, description et statut |
| Categories / `/admin/categories` | Gerer les categories et sous-categories |
| Stock / `/admin/stock` | Voir et ajuster les quantites disponibles |
| Commandes / `/admin/orders` | Lister les commandes et suivre leur statut |
| Detail commande / `/admin/orders/:id` | Lire les informations de commande, contacter la cliente, ajouter une note et changer le statut |

## Navigation publique

- Le catalogue est le point d'entree principal.
- Le header public doit contenir les acces principaux aux pages du site et le menu des categories.
- La cliente doit pouvoir passer du catalogue a une fiche produit, puis revenir au catalogue.
- Les filtres de catalogue doivent etre conserves si possible au retour depuis une fiche produit.
- Le panier doit etre accessible depuis toutes les pages publiques.
- La page confidentialite doit etre accessible depuis une zone publique stable, par exemple le footer.
- La validation de commande doit etre accessible uniquement depuis un panier valide.
- Apres validation reussie, la cliente arrive sur une page de confirmation.

## Architecture des pages publiques

- L'accueil doit rester une page d'entree compacte.
- L'accueil doit afficher l'identite de la boutique, les acces principaux et un apercu du catalogue, sans gros blocs successifs.
- Les categories doivent etre accessibles depuis le header via un menu dedie.
- Chaque categorie visible doit disposer de sa propre page publique.
- Chaque page categorie doit pouvoir servir de page de collection avec un espace visuel pour de futures photos, puis un acces rapide aux sous-categories.
- Chaque sous-categorie visible doit disposer de sa propre page publique.
- Les pages sous-categorie et produit doivent rester separees de l'accueil pour eviter de charger la home avec trop de contenu.
- Les fiches produit doivent rester des pages autonomes, accessibles depuis les cartes du catalogue et depuis les pages de categorie et sous-categorie.

## Navigation admin

- Les pages admin sont accessibles uniquement apres connexion.
- Une admin non connectee est redirigee vers la connexion.
- La navigation admin doit separer clairement : dashboard, produits, categories, commandes, clients, stock, parametres.
- Les acces admin ne doivent pas etre dupliques dans plusieurs zones visibles du meme ecran.
- L'admin doit pouvoir revenir a la liste apres avoir ouvert un produit ou une commande.
- Le tableau de bord admin est la page d'arrivee apres connexion.
- Le tableau de bord ne doit pas afficher les sections admin comme gros boutons principaux ; la navigation admin porte cette fonction.
- Les sections admin non implementees en V1 peuvent etre affichees comme elements desactives si elles n'ont pas encore de route.
- La liste des commandes recentes du tableau de bord doit afficher les 5 a 10 elements les plus recents, pas tout l'historique.

## Tableau de bord admin

Le tableau de bord doit afficher au minimum :

- Le chiffre d'affaires, calcule hors commandes annulees.
- Le nombre total de commandes.
- Le nombre total de produits.
- Le nombre de produits publies en rupture de stock.
- Les commandes recentes, avec un lien vers chaque detail.
- Les produits recemment ajoutes.
- Une action de deconnexion disponible, separee des raccourcis metier.

## Composants publics

| Composant | Role |
| --- | --- |
| Header boutique | Afficher le nom Indira Home, les pages principales, le panier et le menu categories |
| Liste categories | Permettre la navigation par categorie et sous-categorie |
| Barre de recherche | Rechercher un produit par nom |
| Filtres catalogue | Filtrer par categorie, sous-categorie, stock et nouveaute |
| Tri catalogue | Trier par defaut, prix croissant, prix decroissant, nouveautes |
| Carte produit | Afficher photo, nom, prix, categorie/sous-categorie, nouveaute et etat epuise, sans quantite exacte |
| Galerie produit | Afficher les photos d'une fiche produit et un rendu plus large que les cartes catalogue |
| Controle quantite | Augmenter ou diminuer une quantite sans depasser le stock |
| Ligne panier | Afficher produit, prix, quantite, sous-total et etat |
| Recapitulatif panier | Afficher total et action de validation |
| Formulaire commande | Collecter nom, telephone/WhatsApp, adresse/zone et paiement prevu |
| Message de retour | Afficher succes, erreur ou etat vide |

## Composants admin

| Composant | Role |
| --- | --- |
| Formulaire connexion | Connecter l'admin |
| Navigation admin | Permettre d'aller vers dashboard, produits, categories, commandes et stock sans doublon |
| Indicateurs dashboard | Afficher chiffre d'affaires, commandes, produits et ruptures |
| Tableau commandes recentes | Afficher numero, cliente, date, statut, total et action d'ouverture |
| Tableau produits recents | Afficher les derniers produits ajoutes |
| Tableau produits | Lister les produits avec statut, stock, prix et actions |
| Formulaire produit | Creer ou modifier un produit |
| Gestion photos | Ajouter, remplacer ou supprimer les photos produit |
| Gestion categories | Ajouter, modifier, masquer, afficher, ordonner et supprimer si autorise |
| Ajustement stock | Ajouter, retirer ou corriger une quantite |
| Tableau commandes | Lister les commandes avec statut, date, cliente et total |
| Detail commande | Afficher produits, cliente, paiement, livraison, note et actions de statut |
