# Work Plan - Indira Home

Ce fichier decoupe le developpement en petites etapes.

## Objectif

Construire la V1 progressivement, en validant chaque partie par rapport aux specifications.

## Phase 0 - Choix technique et initialisation

### Objectif

Mettre en place la base du projet applicatif.

### Taches

- Choisir le framework web.
- Choisir la base de donnees.
- Choisir le stockage des images.
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

### Verification

- Les donnees peuvent etre creees localement.
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
- Ajouter champs nom, telephone/WhatsApp, adresse ou zone.
- Ajouter choix paiement a la livraison ou virement apres confirmation.
- Ajouter recapitulatif de commande.
- Valider les champs obligatoires.
- Reverifier le panier cote serveur.
- Creer la commande avec prix snapshots.
- Diminuer le stock apres validation reussie.
- Afficher la confirmation de commande.

### Verification

- Une commande peut etre creee sans compte et sans paiement en ligne.
- Le stock diminue seulement apres validation reussie.
- Une validation echouee ne diminue pas le stock.
- Les prix de commande sont figes.

## Phase 6 - Authentification admin

### Objectif

Proteger l'espace admin.

### Taches

- Creer la page connexion admin.
- Ajouter session admin.
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
- Afficher les commandes nouvelles.
- Afficher les resumes utiles : produits publies, produits epuises, produits masques.
- Ajouter les acces rapides vers commandes, produits, stock et categories.
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
- Une commande reste lisible si un produit est masque ou supprime.

## Phase 11 - Polish mobile et contenu russe

### Objectif

Rendre l'experience utilisable et professionnelle sur telephone.

### Taches

- Relire tous les textes client en russe.
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
- Verifier les variables d'environnement.
- Verifier sauvegarde/export possible des donnees.
- Preparer deploiement.

### Verification

- Toutes les user stories critiques passent.
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
8. Admin produits/categories.
9. Admin stock.
10. Admin commandes.
11. Mobile polish et tests finaux.

## Definition of Done V1

- Une cliente peut trouver un produit, l'ajouter au panier et envoyer une commande.
- L'admin peut creer les produits, ajuster le stock et traiter les commandes.
- Les produits epuises ne sont jamais commandables.
- Les commandes diminuent le stock uniquement apres validation reussie.
- Les prix des commandes sont figes.
- Les textes client sont en russe.
- Le site est utilisable principalement sur mobile.
