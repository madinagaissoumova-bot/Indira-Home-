# Validation Rules - Indira Home

Ce fichier precise les validations communes a appliquer cote serveur. Les validations cote interface peuvent aider l'utilisatrice, mais elles ne remplacent jamais la validation serveur.

## Principes

- Les donnees saisies par une cliente ou une admin ne sont jamais considerees comme fiables.
- Les erreurs visibles par les clientes doivent etre en russe.
- Les messages techniques internes ne doivent pas etre affiches tels quels aux clientes.
- Les espaces en debut et fin de champ doivent etre ignores.
- Les champs texte ne doivent pas accepter uniquement des espaces.
- Les longueurs ci-dessous sont des limites V1 pour eviter les donnees vides, inutilisables ou excessives.

## Cliente - commande

| Champ | Regle V1 |
| --- | --- |
| Prenom cliente | Obligatoire, 2 a 80 caracteres apres trim |
| Nom cliente | Obligatoire, 2 a 80 caracteres apres trim |
| Telephone ou WhatsApp | Obligatoire, 7 a 20 chiffres apres suppression des espaces, parentheses, tirets et `+` |
| Adresse ou zone | Obligatoire, 10 a 240 caracteres apres trim |
| Mode de paiement | Obligatoire, uniquement `CASH_ON_DELIVERY` ou `TRANSFER_AFTER_CONFIRMATION` |

Le telephone peut etre saisi avec espaces, tirets, parentheses ou prefixe `+`. Le serveur doit normaliser ou verifier le numero avant enregistrement. Pour une cliente en V1, le format attendu doit rester compatible avec un numero russe exploitable par la boutique, par exemple un numero commencant par `+7` ou `8`, sans bloquer inutilement les espaces ou tirets de saisie.

L'adresse reste un champ texte libre en V1. Le libelle ou placeholder doit guider la cliente vers une adresse exploitable, par exemple : ville, rue, maison, appartement ou repere.

Pour la V1, la validation de zone doit :

- refuser un champ vide ;
- refuser une adresse trop courte ou manifestement inexploitable ;
- accepter une zone ambigue mais non vide ;
- bloquer uniquement les zones clairement hors Republique tchetchene si une detection simple existe ;
- afficher un message clair indiquant que la livraison V1 est limitee a la Republique tchetchene.

Une liste stricte de villes autorisees n'est pas obligatoire en V1.

## Produits admin

| Champ | Regle V1 |
| --- | --- |
| Nom produit | Obligatoire pour publication, 2 a 120 caracteres |
| Slug produit | Obligatoire ou genere automatiquement, unique, lettres latines minuscules, chiffres et tirets |
| Description | Obligatoire pour publication, 10 a 2000 caracteres |
| Prix | Entier en roubles, strictement superieur a 0 |
| Stock | Entier, superieur ou egal a 0 |
| Image URL | Au moins une URL valide pour publication, protocole `http` ou `https`, ou chemin local `/uploads/...` |
| Marque | Optionnelle, maximum 80 caracteres |
| Caracteristiques | Optionnelles, cles et valeurs texte courtes |
| Ordre d'affichage | Optionnel, entier |

Un brouillon peut etre incomplet. La publication doit etre refusee si un champ obligatoire de publication manque.

Les URLs d'images doivent etre stockees comme texte. En V1, il n'est pas obligatoire de telecharger ou proxyfier les images. Les images deja presentes dans `public/uploads/` peuvent etre referencees avec un chemin `/uploads/...`. Une URL vide ou mal formee ne permet pas la publication.

## Categories et sous-categories

| Champ | Regle V1 |
| --- | --- |
| Nom categorie | Obligatoire, 2 a 80 caracteres |
| Nom sous-categorie | Obligatoire, 2 a 80 caracteres |
| Slug categorie | Obligatoire ou genere automatiquement, unique parmi les categories, lettres latines minuscules, chiffres et tirets |
| Slug sous-categorie | Obligatoire ou genere automatiquement, unique parmi toutes les sous-categories, lettres latines minuscules, chiffres et tirets |
| Statut | Uniquement `VISIBLE` ou `HIDDEN` |
| Ordre d'affichage | Optionnel, entier |

Une sous-categorie doit toujours appartenir a une categorie existante.

Lorsqu'un produit contient a la fois `categoryId` et `subcategoryId`, la sous-categorie doit appartenir a cette categorie. Toute combinaison incoherente doit etre refusee cote serveur.

## Slugs

Les slugs servent aux routes publiques. Pour la V1 :

- ils doivent etre uniques pour le type concerne ;
- les slugs de sous-categories doivent etre uniques globalement, car la route publique est `/subcategory/:slug` ;
- ils doivent rester stables autant que possible apres publication ;
- ils peuvent etre generes depuis le nom par translitteration ou saisis par l'admin ;
- ils ne doivent contenir que `a-z`, `0-9` et `-` ;
- ils ne doivent pas commencer ou finir par `-` ;
- deux tirets consecutifs doivent etre evites.

Si un slug public change, l'ancien lien peut retourner une page introuvable en V1. Les redirections d'anciens slugs ne sont pas obligatoires.

## Commandes et panier

| Donnee | Regle V1 |
| --- | --- |
| Ligne panier | `productId` existant et `quantity` entiere |
| Quantite panier | Minimum 1, maximum stock disponible au moment de la verification |
| Total commande | Calcule cote serveur uniquement |
| Prix commande | Snapshot du prix produit au moment de la validation reussie |
| Statut commande | Uniquement les statuts definis dans `lib/constants.ts` |
| Numero commande | Genere cote serveur, unique, stable et sans donnee personnelle |

Le serveur doit refuser une commande si :

- le panier est vide ;
- un produit n'existe plus ;
- un produit est masque ou brouillon ;
- une categorie ou sous-categorie du produit est masquee ;
- la sous-categorie du produit n'appartient pas a sa categorie ;
- le stock est insuffisant ;
- un prix est invalide ;
- une donnee cliente obligatoire manque.

La validation commande collecte le prenom et le nom separement. Apres validation, le serveur les concatene dans `Order.customerName` sous la forme `Prenom Nom`.

La creation de commande doit etre idempotente pour une meme tentative de validation. Un double clic, un retry reseau ou un renvoi du meme formulaire ne doit pas creer deux commandes ni decrementer deux fois le stock.

## Securite des entrees

- Les champs texte doivent etre echappes lors de l'affichage.
- Les URLs doivent etre validees comme URLs, pas concatenees dans du HTML brut.
- Les donnees personnelles ne doivent pas etre ecrites inutilement dans les logs.
- Les actions admin doivent refuser toute requete sans session valide.

## Checklist de verification V1

Cette checklist transforme les criteres d'acceptation en verifications de sortie V1.

### Commandes a executer

Avant livraison V1, executer au minimum :

- `npm run prisma:generate`
- `npm run build`

Si les scripts existent et sont adaptes au changement, executer aussi :

- `npm run lint`
- `npm test`
- `npm run prisma:migrate`
- `npm run prisma:seed`

### Parcours client a verifier

| Parcours | Verification |
| --- | --- |
| Catalogue | Les produits publies apparaissent, les brouillons et masques n'apparaissent pas |
| Recherche | Une recherche par nom retourne les bons produits et un etat vide si aucun resultat |
| Categories | Les routes categorie et sous-categorie affichent seulement les produits visibles |
| Produit epuise | Le produit reste visible mais ne peut pas etre ajoute au panier |
| Fiche produit | Photos, prix, description, categorie et action panier sont visibles |
| Panier | Ajout, retrait, augmentation, diminution et vidage fonctionnent |
| Stock panier | Une quantite superieure au stock est bloquee sans afficher le stock exact |
| Validation commande | Les champs obligatoires sont valides et les erreurs sont en russe |
| Livraison | Une zone vide est refusee et le message mentionne la Republique tchetchene |
| Livraison hors zone | Une zone clairement hors Republique tchetchene est refusee |
| Commande reussie | La commande est creee, le stock diminue et la confirmation s'affiche |
| Confirmation | Recharger la page ne recree pas de commande et ne montre pas de donnees personnelles |
| Confidentialite | `/privacy` explique les donnees collectees, reste publique et ne montre aucune donnee cliente |

### Parcours admin a verifier

| Parcours | Verification |
| --- | --- |
| Connexion | Une session valide ouvre le tableau de bord |
| Protection | Une session absente ou expiree redirige vers `/admin/login` |
| Action protegee | Une action admin appelee sans session ne modifie aucune donnee |
| Deconnexion | Apres logout, les pages admin redeviennent bloquees |
| Tableau de bord | Compteurs, commandes recentes et alertes stock sont coherents |
| Annulation admin | Le bouton d'annulation admin passe la commande a `CANCELLED` et remet le stock en ligne une seule fois |
| Produits | Creation brouillon, publication complete, masquage et suppression autorisee fonctionnent |
| Publication | Un produit incomplet ne peut pas etre publie |
| Images | Un produit sans image valide ne peut pas etre publie |
| Categories | Creation, masquage, affichage et suppression autorisee fonctionnent |
| Suppression categorie | Une categorie ou sous-categorie avec produits ne peut pas etre supprimee |
| Stock | Ajouter, retirer et corriger refusent les valeurs negatives ou non entieres |
| Commandes | Une commande cliente apparait dans la liste et le detail admin |
| Statuts | Le statut commande peut etre change parmi les statuts autorises |
| Statut invalide | Une valeur absente de `lib/constants.ts` est refusee |
| Notes | La note interne admin peut etre enregistree sans etre visible cote public |

### Donnees et regles metier a verifier

| Regle | Verification |
| --- | --- |
| Prix snapshots | Modifier le prix produit apres commande ne modifie pas la commande |
| Image snapshot | Modifier ou supprimer l'image produit ne casse pas le detail commande |
| Produit masque | Un produit masque disparait du catalogue mais reste lisible dans les commandes |
| Suppression produit commande | Un produit deja present dans une commande validee ne peut pas etre supprime definitivement |
| Dernier stock | Deux validations concurrentes sur le dernier produit ne creent qu'une commande reussie |
| Double soumission | Une meme tentative de validation commande envoyee plusieurs fois ne cree qu'une commande et ne diminue le stock qu'une fois |
| Transaction | Une ligne invalide annule toute la commande et aucun stock ne diminue |
| Taxonomie produit | Une sous-categorie qui n'appartient pas a la categorie choisie est refusee |
| Numero commande | Le numero est unique, stable et ne contient aucune donnee personnelle |
| Panier local | Le panier ne contient que `productId` et `quantity` |
| Client russe | Les textes visibles par les clientes sont en russe |
| Donnees personnelles | Nom, telephone et adresse ne sont jamais affiches sur une page publique |

### Responsive a verifier

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
- le formulaire de validation commande est empile et clair ;
- l'admin reste utilisable sur desktop et acceptable sur tablette.

### Definition de sortie V1

La V1 peut etre consideree prete lorsque :

- les commandes de verification passent ;
- tous les parcours critiques client et admin passent manuellement ;
- aucune donnee personnelle n'est exposee cote public ;
- les textes clients sont en russe ;
- le paiement en ligne est absent ;
- la livraison V1 est clairement limitee a la Republique tchetchene ;
- les secrets admin sont configures uniquement via variables d'environnement ;
- une sauvegarde ou export de la base de production est prevu avant mise en ligne.
