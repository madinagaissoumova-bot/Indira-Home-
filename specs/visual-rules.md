# Visual Rules - Indira Home

Ce fichier fixe les regles visuelles de la V1.

## Intention

Le site doit inspirer confiance, rester simple a utiliser sur telephone et mettre les produits au premier plan.

Indira Home vend des objets pour la maison. L'interface doit donc etre chaleureuse, propre et lisible, avec une sensation plus luxueuse que domestique ordinaire. Les photos produit sont l'element visuel principal.

La direction visuelle doit etre basee sur un rose tres clair, tres doux, presque poudree, accompagne de neutres chauds et d'accents discrets. L'ensemble doit rester raffine, jamais criard.

## Priorite mobile

- Le design est mobile-first.
- Les actions principales doivent etre faciles a toucher au pouce.
- Les cartes produit doivent rester lisibles sur petit ecran.
- Les filtres doivent etre simples a ouvrir, fermer et reinitialiser.
- Le panier et le formulaire de commande doivent eviter les longs blocs confus.
- Les categories sur mobile doivent etre accessibles depuis un menu compact a trois lignes.

## Langue et texte

- Tous les textes visibles par les clientes sont en russe.
- Les textes doivent etre courts, directs et faciles a comprendre.
- Les libelles de boutons doivent decrire l'action exacte.
- Ne pas afficher d'explications longues dans l'interface client.

## Couleurs

La palette doit rester tres claire, douce et premium, sans couleurs agressives.

| Usage | Direction |
| --- | --- |
| Fond principal | Rose tres pale, ivoire rose ou blanc chaud |
| Texte principal | Taupe fonce, brun tres sombre ou gris profond |
| Accent principal | Rose poudree leger pour les actions importantes |
| Accent secondaire | Rose tres douce, champagne ou beige rose pour filtres et badges |
| Erreur / indisponible | Rouge sourd ou brique douce |
| Succes | Rose doux tres discret |
| Bordures | Rosé gris ou neutres tres fines |
| Survol / actif | Rose plus dense ou rose grise selon le composant |

Eviter :

- Une interface dominee par une seule couleur.
- Les roses fluo, vifs ou trop saturés.
- Une couleur d'accent trop sombre ou trop agressive.
- Trop de degrade agressif.
- Les fonds tres sombres pour le catalogue.
- Les effets decoratifs qui prennent plus d'attention que les produits.

## Typographie

- Utiliser une police lisible avec bon support cyrillique.
- Garder une hierarchie claire : titre page, titres sections, noms produits, prix.
- Les noms produits doivent rester lisibles meme s'ils sont longs.
- Les prix doivent etre faciles a reperer.
- Ne pas utiliser de tailles enormes hors page d'accueil ou titre principal.
- Favoriser une typographie elegante et nette, pas trop clinique.

## Mise en page publique

- Le catalogue est la premiere experience utile.
- Les photos produit doivent etre grandes assez pour identifier l'article.
- Les cartes produit doivent avoir des dimensions stables pour eviter les sauts de layout.
- Les informations essentielles sur une carte : photo, nom, prix, etat epuise si necessaire, action.
- La quantite exacte en stock ne doit pas etre affichee.
- Les produits epuises restent visibles mais leur action de commande est desactivee ou impossible.
- Le header public doit rester leger, avec le logo/nom, un bouton panier et une icone client distincte.

## Cartes produit

Chaque carte produit doit :

- Afficher une image nette.
- Afficher le nom produit.
- Afficher le prix en roubles.
- Afficher un badge "nouveau" si applicable.
- Afficher un badge "indisponible" ou "produit epuise" si stock 0.
- Eviter de masquer le produit avec trop de texte.
- Avoir des coins doux et des ombres tres legeres, sans effet carton lourd.
- Utiliser des badges fins, roses poudres ou champagne, pas des blocs epais.

Pour un produit epuise :

- La carte peut etre visuellement adoucie.
- Le badge d'indisponibilite doit rester clair.
- Le bouton d'ajout au panier doit etre desactive ou remplace par une indication non commandable.

## Fiche produit

- La galerie photo est prioritaire.
- Le prix et l'action d'ajout au panier doivent etre visibles rapidement.
- Les caracteristiques facultatives doivent etre organisees sous forme lisible.
- Le bouton retour doit ramener au catalogue ou aux resultats precedents.
- Sur mobile, l'action d'ajout au panier peut rester proche du bas de l'ecran si cela ameliore l'ergonomie.

## Panier

- Le panier doit etre simple et rassurant.
- Chaque ligne affiche photo, nom, prix, quantite, sous-total et action de retrait.
- Les controles de quantite doivent etre grands et stables.
- Le total doit etre clair.
- Le bouton de validation doit etre visible apres le recapitulatif.
- Un panier invalide doit expliquer clairement quel produit bloque la validation.
- Les boutons du panier doivent etre arrondis, elegants et faciles a distinguer.

## Formulaire commande

- Les champs doivent etre empiles sur mobile.
- Les champs obligatoires doivent etre evidents.
- Les erreurs doivent etre placees pres du champ concerne.
- Le choix du paiement doit etre presente comme deux options claires :
  - paiement a la livraison ;
  - virement apres confirmation.
- Le recapitulatif avant validation doit rappeler que la boutique contactera la cliente.
- Les champs doivent conserver un rendu premium, avec espaces aeres et labels discrets.

## Espace admin

- L'admin doit etre plus dense et efficace que le site client.
- Les listes produits et commandes doivent etre faciles a scanner.
- Les statuts doivent etre visibles par badges.
- Les actions destructives comme supprimer ou annuler doivent demander confirmation.
- Les formulaires admin doivent separer les blocs : informations produit, photos, prix, categorie, stock, publication.
- L'espace admin peut rester plus neutre visuellement que le site client, mais doit reprendre la meme logique de badges et d'accent rose poudre.

## Boutons et actions

- Une seule action principale par zone visuelle.
- Les boutons principaux servent aux actions comme ajouter au panier, valider la commande, publier, enregistrer.
- Les actions secondaires restent plus discretes.
- Les actions dangereuses utilisent un style distinct et une confirmation.
- Les boutons doivent avoir une hauteur confortable sur mobile.
- Les boutons principaux doivent utiliser un rose tres doux ou un rose poudree leger, avec texte tres lisible.
- Les boutons secondaires doivent etre clairs, bordes ou en ton sur ton.
- Les icones doivent etre utilisees dans les boutons quand elles aident vraiment la comprehension.

## Etats et messages

Prevoir des etats visuels pour :

- Chargement.
- Liste vide.
- Aucun resultat.
- Produit epuise.
- Panier invalide.
- Erreur formulaire.
- Commande envoyee.
- Action admin reussie.

## Responsive

### Mobile

- Catalogue en une colonne ou grille tres lisible selon taille d'ecran.
- Filtres accessibles sans prendre toute la page en permanence.
- Panier en liste verticale.
- Formulaire commande en une colonne.
- Les categories doivent s'ouvrir depuis un menu hamburger a trois lignes sur mobile, plutot que d'etre toutes affichees en permanence.
- Le bouton panier doit utiliser un petit pictogramme de panier.
- Le point d'entree client doit utiliser un pictogramme de profil/bonhomme distinct du panier.

### Tablette / desktop

- Catalogue en grille plus large.
- Filtres visibles sur le cote si utile.
- Panier avec recapitulatif lateral possible.
- Admin en tableaux plus denses.

## Accessibilite

- Contraste suffisant pour textes, prix, boutons et erreurs.
- Les boutons doivent avoir un texte ou label comprehensible.
- Les etats ne doivent pas dependre seulement de la couleur.
- Les champs de formulaire doivent avoir des labels.
- Les images produit doivent avoir un texte alternatif simple quand c'est possible.

## A eviter

- Catalogue transforme en page marketing sans produits visibles.
- Trop de texte explicatif cote cliente.
- Effets visuels lourds.
- Cartes imbriquees dans d'autres cartes.
- Boutons minuscules sur mobile.
- Textes qui debordent dans les cartes ou boutons.
- Afficher la quantite exacte en stock aux clientes.
- Rose trop vif, fuchsia, rose soutenu ou rendu trop enfantin.
- Une couleur d'accent trop lourde qui rendrait le site sombre ou militaire.
