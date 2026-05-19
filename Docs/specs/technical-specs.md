# Technical Specs - Indira Home

Ce fichier transforme les specifications produit en structure technique pour construire la V1.

## Objectif technique V1

Construire un site e-commerce simple pour une boutique unique :

- Catalogue public en russe.
- Parcours mobile-first.
- Panier sans compte cliente.
- Validation de commande sans paiement en ligne.
- Espace admin protege pour gerer produits, categories, stock et commandes.

La V1 inclut le parcours cliente complet et l'admin complet. Le developpement peut rester progressif, mais le projet n'est considere complet que lorsque les deux parties fonctionnent.

## Pages publiques

| Page / route | Role |
| --- | --- |
| Accueil / `/` | Afficher les produits publies, les categories, la recherche et les filtres principaux |
| Categorie / `/category/:slug` | Afficher les produits d'une categorie visible |
| Sous-categorie / `/subcategory/:slug` | Afficher les produits d'une sous-categorie visible |
| Fiche produit / `/product/:slug` | Afficher les details d'un produit publie dans une categorie et sous-categorie visibles, commandable ou epuise |
| Panier / `/cart` | Afficher les produits ajoutes, les quantites, les sous-totaux et le total |
| Validation commande / `/checkout` | Collecter les informations cliente et envoyer la commande |
| Confirmation commande / `/checkout/confirmation` | Confirmer que la commande a ete envoyee |

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
- Le nombre de produits visibles cote cliente si different du nombre de produits publies.
- Le nombre de produits epuises.
- Le nombre de produits masques.
- Les commandes recentes, avec un lien vers chaque detail.
- Une alerte visuelle si des produits publies sont a stock 0.
- Des raccourcis vers `/admin/orders`, `/admin/products`, `/admin/stock` et `/admin/categories`.

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
| status | Enum | DRAFT, PUBLISHED, HIDDEN |
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
| status | Enum | VISIBLE, HIDDEN |
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
| status | Enum | VISIBLE, HIDDEN |
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

Pour la V1, le panier est stocke dans `localStorage` cote navigateur sous forme minimale : identifiant produit et quantite. Aucune information de prix, de stock ou de disponibilite stockee dans le navigateur ne doit etre consideree comme fiable. Le serveur recalcule toujours les prix, les etats et le total avant affichage critique et avant validation.

### Order

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| orderNumber | Texte ou nombre | Lisible par l'admin |
| customerName | Texte | Obligatoire |
| customerPhone | Texte | Telephone ou WhatsApp |
| deliveryAddressOrZone | Texte | Republique tchetchene uniquement en V1 |
| paymentMethod | Enum | CASH_ON_DELIVERY, TRANSFER_AFTER_CONFIRMATION |
| status | Enum | NEW, TO_CONFIRM, CONFIRMED, PREPARING, DELIVERED, CANCELLED |
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
| Lire un produit public | Retourner une fiche produit publiee dans une categorie et sous-categorie visibles |
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
- Une commande validee doit decrementer le stock dans la meme transaction que la creation de commande, apres les verifications serveur.
- Les listes du dashboard doivent pouvoir afficher au maximum les 10 commandes recentes.

Les formats detailles des champs, slugs, URLs d'images, paniers et donnees de commande sont definis dans `Docs/specs/validation-rules.md`.

## Authentification

- Les clientes ne creent pas de compte.
- L'espace admin exige une connexion.
- Les routes/actions admin doivent verifier la session cote serveur.
- La V1 peut commencer avec un seul compte admin.
- Les identifiants admin ne doivent pas etre exposes dans le code client.
- La connexion admin doit utiliser une session server-side ou un cookie de session securise.
- Les pages `/admin` et `/admin/*` doivent rediriger vers `/admin/login` si la session est absente ou expiree.

### Decision V1

Pour la V1, l'authentification admin utilise :

- un identifiant admin stocke dans `ADMIN_USERNAME` ;
- un mot de passe admin stocke sous forme de hash bcrypt dans `ADMIN_PASSWORD_HASH` ;
- un secret de signature stocke dans `ADMIN_SESSION_SECRET` ;
- un cookie HTTP-only nomme `indira_admin_session`, `Secure` en production, `SameSite=Lax`, signe cote serveur ;
- une duree de session limitee, par exemple 7 jours maximum.

Il n'y a pas de table `AdminUser` obligatoire en V1. Si plusieurs admins deviennent necessaires plus tard, une table dediee pourra etre ajoutee.

Les actions admin qui modifient des donnees doivent verifier la session cote serveur a chaque appel. Si l'implementation utilise des formulaires ou actions serveur Next.js, la verification de session serveur est obligatoire avant toute mutation. Si une route API admin est exposee, elle doit refuser les requetes sans cookie valide et eviter les mutations GET.

## Gestion des images

- Chaque produit publie doit avoir au moins une photo.
- Une photo principale doit etre definie par la premiere image ou un champ equivalent.
- Les images doivent etre optimisees pour mobile.
- Les images manquantes ne doivent pas permettre la publication.
- Les commandes peuvent garder une reference ou un snapshot de l'image principale pour rester lisibles apres modification produit.
- Les uploads admin doivent limiter les formats image acceptes aux formats standards du framework retenu.
- Les images supprimees d'un produit deja commande ne doivent pas casser l'affichage du snapshot de commande.
- Les photos, noms, descriptions, prix et categories des produits doivent etre geres par l'admin depuis l'espace admin, sans intervention technique.

### Decision V1

Pour eviter de bloquer le developpement sur un systeme d'upload, la V1 peut commencer avec des URLs d'images saisies ou collees dans l'admin. Les images doivent etre servies depuis une source stable et optimisee.

Une evolution ulterieure pourra ajouter un vrai upload admin vers un stockage dedie comme Cloudinary, S3 ou un stockage equivalent. Les regles de formats acceptes s'appliquent seulement si cet upload est ajoute.

## Suppression et archivage

- Masquer un produit est l'action normale pour le retirer du catalogue client.
- Supprimer definitivement un produit est autorise seulement si cela ne casse pas l'historique.
- Si un produit a deja ete commande, la suppression definitive est bloquee en V1.
- Si l'admin veut retirer durablement un produit deja commande, elle doit le masquer.
- Les commandes doivent rester lisibles grace aux snapshots de nom, image, prix et quantite.
- Les categories et sous-categories contenant des produits ne doivent pas etre supprimees.

Pour la V1, le comportement recommande est :

- produit actif mais non visible : statut `HIDDEN` ;
- produit en preparation : statut `DRAFT` ;
- produit visible : statut `PUBLISHED` ;
- produit retire durablement mais lie a un historique : statut `HIDDEN`, avec suppression definitive bloquee.

Le statut `archived` n'est pas obligatoire en V1. Il pourra etre ajoute plus tard si la boutique a besoin de distinguer les produits temporairement masques des produits retires durablement.

## Livraison V1

- La livraison V1 est limitee a la Republique tchetchene.
- Le formulaire demande une adresse ou une zone en texte libre.
- La validation automatique doit au minimum refuser un champ vide.
- Si une zone hors Republique tchetchene est clairement detectee, la validation doit etre bloquee.
- Si la zone est ambigue mais non vide, la commande peut etre recue et la boutique confirme manuellement la livraison.
- Le site affiche clairement que la livraison est limitee a la Republique tchetchene.
- La confirmation finale de la zone se fait manuellement par la boutique lors du contact telephone ou WhatsApp.

Une liste stricte de villes ou zones autorisees pourra etre ajoutee plus tard si la boutique veut automatiser ce controle.

## Internationalisation

- Les textes visibles par les clientes sont en russe.
- Les categories et sous-categories visibles par les clientes sont en russe.
- Les specs restent en francais.
- L'admin peut aussi etre en russe dans l'interface finale, meme si la specification documente les comportements en francais.
- Les identifiants techniques, enums et champs de donnees peuvent rester en anglais dans la base et l'API.

Pour la V1, les textes d'interface client doivent etre centralises autant que possible dans un fichier de contenu ou de constantes, par exemple `lib/content/ru.ts`, afin d'eviter des traductions dispersees dans tout le code.

## Confidentialite des donnees

- Le site collecte uniquement les informations necessaires a la commande : nom, telephone ou WhatsApp, adresse ou zone de livraison.
- Ces donnees servent uniquement a traiter, confirmer et livrer la commande.
- Les informations cliente ne doivent pas etre affichees cote public.
- L'espace admin doit etre protege avant toute consultation de commandes.
- Les logs serveur ne doivent pas exposer inutilement les numeros de telephone ou adresses.
- Un export ou une sauvegarde des commandes doit rester protege.

## Hebergement et configuration

La decision finale dependra du framework choisi, mais la V1 doit prevoir :

- Une base de donnees persistante.
- Un stockage d'images.
- Des variables d'environnement pour les secrets.
- Un environnement de production protege.
- Des sauvegardes ou export possible des donnees commandes/produits.
- Un mecanisme de migration de schema.
- Un journal minimal des erreurs serveur pour depister les echecs de validation ou de session.

### Decision V1

- Framework : Next.js App Router.
- Base locale : SQLite avec Prisma pendant le developpement.
- Base production V1 : PostgreSQL compatible Prisma.
- SQLite en production est seulement acceptable comme solution temporaire si l'hebergeur garantit un disque persistant, une sauvegarde et aucune perte au redeploiement.
- Images V1 : URLs externes stables, puis stockage dedie plus tard.
- Secrets : uniquement via variables d'environnement.
- Deploiement : environnement Node.js compatible Next.js App Router et Prisma.
- Sauvegarde : export regulier de la base de donnees avant et apres changements importants.
- Logs : erreurs serveur generales autorisees, mais sans numero de telephone, adresse complete ou secrets.

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

La checklist complete de verification V1 est definie dans `Docs/test-plan.md`.
