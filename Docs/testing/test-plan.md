# Test Plan - Indira Home

Ce fichier transforme les criteres d'acceptation en checklist de verification V1.

## Commandes a executer

Avant livraison V1, executer au minimum :

- `npm run prisma:generate`
- `npm run build`

Si des scripts de lint, test ou migration existent dans `package.json`, executer aussi :

- `npm run lint`
- `npm test` ou la commande de test equivalente
- `npm run prisma:migrate`
- `npm run prisma:seed`

## Tests manuels client

| Parcours | Verification |
| --- | --- |
| Catalogue | Les produits publies apparaissent, les brouillons et masques n'apparaissent pas |
| Recherche | Une recherche par nom retourne les bons produits et un etat vide si aucun resultat |
| Categories | Les routes categorie et sous-categorie affichent seulement les produits visibles |
| Produit epuise | Le produit reste visible mais ne peut pas etre ajoute au panier |
| Fiche produit | Photos, prix, description, categorie et action panier sont visibles |
| Panier | Ajout, retrait, augmentation, diminution et vidage fonctionnent |
| Stock panier | Une quantite superieure au stock est bloquee sans afficher le stock exact |
| Checkout | Les champs obligatoires sont valides et les erreurs sont en russe |
| Livraison | Une zone vide est refusee et le message mentionne la Republique tchetchene |
| Commande reussie | La commande est creee, le stock diminue et la confirmation s'affiche |
| Confirmation | Recharger la page ne recree pas de commande et ne montre pas de donnees personnelles |

## Tests manuels admin

| Parcours | Verification |
| --- | --- |
| Connexion | Une session valide ouvre le dashboard |
| Protection | Une session absente ou expiree redirige vers `/admin/login` |
| Deconnexion | Apres logout, les pages admin redeviennent bloquees |
| Dashboard | Compteurs, commandes recentes et alertes stock sont coherents |
| Produits | Creation brouillon, publication complete, masquage et suppression autorisee fonctionnent |
| Publication | Un produit incomplet ne peut pas etre publie |
| Images | Un produit sans image valide ne peut pas etre publie |
| Categories | Creation, masquage, affichage et suppression autorisee fonctionnent |
| Suppression categorie | Une categorie ou sous-categorie avec produits ne peut pas etre supprimee |
| Stock | Ajouter, retirer et corriger refusent les valeurs negatives ou non entieres |
| Commandes | Une commande cliente apparait dans la liste et le detail admin |
| Statuts | Le statut commande peut etre change parmi les statuts autorises |
| Notes | La note interne admin peut etre enregistree sans etre visible cote public |

## Tests de donnees et metier

| Regle | Verification |
| --- | --- |
| Prix snapshots | Modifier le prix produit apres commande ne modifie pas la commande |
| Image snapshot | Modifier ou supprimer l'image produit ne casse pas le detail commande |
| Produit masque | Un produit masque disparait du catalogue mais reste lisible dans les commandes |
| Suppression produit commande | Un produit deja present dans une commande validee ne peut pas etre supprime definitivement |
| Dernier stock | Deux validations concurrentes sur le dernier produit ne creent qu'une commande reussie |
| Transaction | Une ligne invalide annule toute la commande et aucun stock ne diminue |
| Panier local | Le panier ne contient que `productId` et `quantity` |
| Client russe | Les textes visibles par les clientes sont en russe |
| Donnees personnelles | Nom, telephone et adresse ne sont jamais affiches sur une page publique |

## Tests responsive

Verifier au minimum :

- mobile etroit autour de 360 px ;
- mobile standard autour de 390 px ;
- tablette autour de 768 px ;
- desktop autour de 1280 px.

Les points a verifier :

- aucun texte important ne deborde ;
- les boutons principaux sont faciles a toucher ;
- les filtres catalogue restent utilisables ;
- le panier reste lisible ;
- le formulaire checkout est empile et clair ;
- l'admin reste utilisable sur desktop et acceptable sur tablette.

## Definition de sortie V1

La V1 peut etre consideree prete lorsque :

- les commandes de verification passent ;
- tous les parcours critiques client et admin passent manuellement ;
- aucune donnee personnelle n'est exposee cote public ;
- les textes clients sont en russe ;
- le paiement en ligne est absent ;
- la livraison V1 est clairement limitee a la Republique tchetchene ;
- les secrets admin sont configures uniquement via variables d'environnement ;
- une sauvegarde ou export de la base de production est prevu avant mise en ligne.
