# Work Plan - Indira Home

Ce fichier decoupe le developpement en petites etapes.

## Objectif

Construire une V1 complete avec parcours cliente et admin complet.

La V1 doit permettre aux clientes :

- de voir les produits disponibles ;
- d'ouvrir une fiche produit ;
- de preparer une commande ;
- d'envoyer la commande a la boutique sans compte et sans paiement en ligne.

La V1 doit aussi permettre a l'admin :

- de se connecter ;
- de gerer les produits ;
- de gerer les categories ;
- de gerer le stock ;
- de consulter et traiter les commandes.

## Phase 0 - Choix technique et initialisation

### Objectif

Mettre en place la base du projet applicatif.

### Taches

- Utiliser Next.js App Router comme framework web.
- Utiliser Prisma avec Supabase PostgreSQL.
- Commencer avec des URLs d'images produit en V1.
- Creer la structure du projet.
- Configurer les variables d'environnement.
- Ajouter les outils de qualite : formatage, lint, tests.

### Verification

- Le projet demarre en local.
- Une page de base s'affiche.
- Les commandes de test/verification fonctionnent.

## Phase 1 - Modele de donnees

### Objectif

Creer les donnees centrales avant l'interface.

### Taches

- Creer les modeles Category et Subcategory.
- Creer le modele Product.
- Creer les modeles Order et OrderItem.
- Ajouter les enums de statuts produit et commande.
- Ajouter les contraintes : prix positif, stock entier non negatif, relations categories.
- Preparer des donnees de depart pour categories/sous-categories.
- Bloquer la suppression definitive des produits deja presents dans une commande validee.

### Verification

- Les donnees peuvent etre creees dans Supabase PostgreSQL.
- Un produit publie ne peut pas etre incomplet.
- Un stock negatif est refuse.

## Phase 2 - Catalogue public

### Objectif

Afficher les produits visibles aux clientes.

### Taches

- Creer la page catalogue.
- Afficher les cartes produit.
- Afficher categories et sous-categories visibles.
- Ajouter recherche par nom.
- Ajouter filtres : categorie, sous-categorie, en stock uniquement, nouveautes.
- Ajouter tris : defaut, prix croissant, prix decroissant, nouveautes.
- Gerer les etats vides.
- Gerer les produits epuises.
- Garder l'accueil comme entree editoriale premium avec une grande image et une action principale vers une collection.
- Garder la recherche, les categories et les sous-categories comme entrees principales vers les produits.
- Utiliser les pages categorie comme vraies pages de collection.
- Prevoir un header avec acces principal aux pages du site et au menu categories.
- Prevoir sur les pages categorie une zone visuelle pour les futures photos de collection.

### Verification

- Les produits publies apparaissent.
- Les produits masques ou brouillons n'apparaissent pas.
- Les filtres et tris fonctionnent.
- Un produit epuise est visible mais non commandable.
- Les textes client sont en russe.

## Phase 3 - Fiche produit

### Objectif

Permettre la consultation detaillee d'un produit.

### Taches

- Creer la page fiche produit.
- Afficher galerie photos, nom, prix, description, categorie, sous-categorie.
- Afficher caracteristiques facultatives si presentes.
- Ajouter controle de quantite.
- Bloquer l'ajout si produit epuise.
- Conserver autant que possible le retour au catalogue precedent.
- Garder la fiche produit comme une page separee et plus detaillee que la page categorie.

### Verification

- Une cliente peut ouvrir une fiche depuis le catalogue.
- Un produit epuise affiche un message clair.
- La quantite demandee ne peut pas depasser le stock.

## Phase 4 - Panier

### Objectif

Permettre a la cliente de preparer une commande.

### Taches

- Ajouter l'ajout au panier depuis catalogue et fiche produit.
- Creer la page panier.
- Afficher produits, quantites, prix unitaires, sous-totaux et total.
- Ajouter augmentation, diminution, retrait et vidage panier.
- Reverifier prix et stock avant validation.
- Bloquer la validation si panier vide ou invalide.
- Stocker le panier en `localStorage` avec seulement productId et quantite.

### Verification

- Une cliente peut modifier son panier.
- Le total est correct.
- Le stock exact n'est pas affiche.
- Un produit devenu indisponible bloque la validation.

## Phase 5 - Validation commande

### Objectif

Transformer un panier valide en commande.

### Taches

- Creer le formulaire de commande.
- Ajouter champs prenom, nom, telephone/WhatsApp, adresse ou zone.
- Ajouter choix paiement a la livraison ou virement apres confirmation.
- Ajouter recapitulatif de commande.
- Afficher la livraison limitee a la Republique tchetchene.
- Afficher le delai estime de 4 a 5 jours.
- Afficher que les frais de livraison seront confirmes par la boutique.
- Valider les champs obligatoires.
- Reverifier le panier cote serveur.
- Recalculer prix, disponibilite et total avant validation finale.
- Creer la commande avec prix snapshots.
- Diminuer le stock apres validation reussie.
- Rendre la creation de commande idempotente pour eviter les doubles soumissions.
- Afficher la confirmation de commande.
- Ajouter la page publique de confidentialite.
- Vider ou marquer le panier local comme traite apres validation reussie.

### Verification

- Une commande peut etre creee sans compte et sans paiement en ligne.
- Le stock diminue seulement apres validation reussie.
- Une validation echouee ne diminue pas le stock.
- Les prix de commande sont figes.
- La page de confirmation ne recree pas la commande au rechargement.
- Une meme tentative envoyee plusieurs fois ne cree qu'une commande.
- La page de confirmation n'expose pas les donnees personnelles de la cliente.
- La page confidentialite explique les donnees collectees sans exposer de commande.

## Phase 6 - Authentification admin

### Objectif

Proteger l'espace admin.

### Taches

- Creer la page connexion admin.
- Ajouter session admin.
- Configurer `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` et `ADMIN_SESSION_SECRET`.
- Proteger les routes/actions admin.
- Ajouter deconnexion.

### Verification

- Une admin non connectee est redirigee.
- Une admin connectee accede au tableau de bord.
- Les actions admin refusent les sessions invalides.

## Phase 7 - Tableau de bord admin

### Objectif

Donner a l'admin une vue centrale apres connexion.

### Taches

- Creer la page tableau de bord admin.
- Afficher les indicateurs essentiels : chiffre d'affaires hors commandes annulees, nombre de commandes, nombre de produits et produits en rupture.
- Afficher les commandes recentes dans un tableau.
- Afficher les produits recemment ajoutes.
- Ajouter une navigation admin simple vers dashboard, produits, categories, commandes, clients, stock et parametres.
- Ajouter la deconnexion depuis le tableau de bord.

### Verification

- Une admin connectee arrive sur le tableau de bord.
- Une cliente ne peut pas acceder au tableau de bord.
- Les commandes recentes sont visibles.
- Les raccourcis vers les zones admin fonctionnent.

## Phase 8 - Admin produits et categories

### Objectif

Permettre a l'admin de maintenir le catalogue.

### Taches

- Creer la liste produits admin.
- Creer le formulaire produit.
- Ajouter brouillon, publication, masquage et suppression avec confirmation.
- Ajouter gestion des photos.
- Ajouter edition prix, description, categorie, sous-categorie, nouveaute, caracteristiques.
- Creer la gestion categories et sous-categories.
- Bloquer les suppressions qui laisseraient des produits orphelins.

### Verification

- L'admin peut creer et publier un produit complet.
- La publication incomplete est refusee.
- Les changements admin se refletent dans le catalogue.
- Les categories masquees disparaissent cote cliente.

## Phase 9 - Admin stock

### Objectif

Permettre le suivi des quantites disponibles.

### Taches

- Afficher le stock dans l'admin.
- Ajouter actions ajouter, retirer et corriger.
- Refuser les stocks negatifs ou non entiers.
- Mettre a jour l'etat commandable/epuise cote client.

### Verification

- Un produit a stock 0 devient epuise.
- Un produit reassorti redevient commandable.
- Le stock exact reste cache cote cliente.

## Phase 10 - Admin commandes

### Objectif

Permettre a l'admin de traiter les commandes.

### Taches

- Creer la liste commandes.
- Creer le detail commande.
- Afficher cliente, livraison, paiement, produits, quantites, prix et total.
- Ajouter changement de statut.
- Ajouter note interne.
- Ajouter liens telephone/WhatsApp si possible.
- Ajouter confirmation pour annulation.

### Verification

- Une commande cliente apparait dans l'admin.
- L'admin peut changer le statut.
- Les prix snapshots restent lisibles apres modification produit.
- Une commande reste lisible si un produit est masque.
- Un produit deja present dans une commande validee ne peut pas etre supprime definitivement en V1.

## Phase 11 - Polish mobile et contenu russe

### Objectif

Rendre l'experience utilisable et professionnelle sur telephone.

### Taches

- Relire tous les textes client en russe.
- Centraliser les textes client russes dans un fichier de contenu ou de constantes.
- Tester les parcours sur petit ecran.
- Ajuster cartes produit, filtres, panier et formulaire.
- Verifier les etats vides et erreurs.
- Optimiser les images produit.

### Verification

- Une cliente peut commander entierement depuis mobile.
- Aucun texte important ne deborde.
- Les boutons sont faciles a toucher.
- Les messages d'erreur sont comprehensibles.

## Phase 12 - Tests finaux et preparation production

### Objectif

Verifier la V1 avant mise en ligne.

### Taches

- Executer tests unitaires et integration.
- Tester manuellement les user stories.
- Suivre la checklist de `docs/specs/validation-rules.md`.
- Verifier les variables d'environnement.
- Verifier sauvegarde/export possible des donnees.
- Preparer deploiement.

### Verification

- Toutes les user stories critiques passent.
- La checklist de `docs/specs/validation-rules.md` est passee.
- Le catalogue, le panier, la commande et l'admin fonctionnent.
- Aucun paiement en ligne n'est demande en V1.
- La livraison est limitee a la Republique tchetchene.

## Ordre recommande

1. Initialisation technique.
2. Donnees et regles metier.
3. Catalogue public.
4. Fiche produit.
5. Panier.
6. Validation commande.
7. Auth admin.
8. Tableau de bord admin.
9. Admin produits/categories.
10. Admin stock.
11. Admin commandes.
12. Mobile polish et textes russes.
13. Tests finaux.

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
