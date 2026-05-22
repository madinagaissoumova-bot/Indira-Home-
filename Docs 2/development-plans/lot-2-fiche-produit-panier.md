# Lot 2 - Fiche produit et panier

## Objectif

Permettre a la cliente de consulter un produit puis de preparer sa commande dans un panier local.

## Dependances

- Lot 1 termine.
- `Docs/specs/feature-specs/fiche-produit.md`
- `Docs/specs/feature-specs/panier.md`

## Tickets

### PUBLIC-201 - Fiche produit `/product/:slug`

Construire la fiche produit publique.

Inclus :

- photos ;
- nom ;
- prix ;
- description ;
- categorie et sous-categorie ;
- caracteristiques facultatives ;
- badge epuise ;
- controle quantite ;
- retour catalogue.

Validation :

- produit brouillon ou masque inaccessible ;
- produit dans categorie ou sous-categorie masquee inaccessible ;
- produit epuise visible mais non ajoutable ;
- stock exact non affiche.

### PUBLIC-202 - Ajout panier

Implementer l'ajout au panier depuis :

- catalogue ;
- fiche produit.

Regles :

- stocker seulement `productId` et `quantity` dans `localStorage` ;
- minimum 1 ;
- ne pas ajouter un produit epuise ;
- ne pas faire confiance au navigateur pour stock/prix.

Validation :

- le panier persiste au rechargement ;
- le panier ne contient pas de prix comme source fiable.

### PUBLIC-203 - Page panier `/cart`

Construire la page panier.

Inclus :

- lignes panier ;
- photo principale ;
- nom produit ;
- prix serveur actuel ;
- quantite ;
- sous-total ;
- total ;
- retirer ;
- vider ;
- continuer les achats ;
- aller au checkout.

Validation :

- panier vide gere ;
- produit devenu indisponible marque clairement ;
- validation bloquee si panier invalide.

### PUBLIC-204 - Quantites panier

Ajouter les controles :

- augmenter ;
- diminuer ;
- retirer si quantite descend sous 1 ;
- bloquer au-dessus du stock disponible sans afficher le stock exact.

Validation :

- impossible de depasser le stock ;
- impossible de valider une quantite invalide ;
- message russe clair.

## Zones probables

- `app/product/[slug]/page.tsx`
- `app/cart/page.tsx`
- `app/cart/CartClient.tsx`
- `components/AddToCartButton.tsx`
- `app/globals.css`
- `lib/`

## Risques

- dupliquer la logique panier dans plusieurs composants ;
- exposer le stock exact par erreur ;
- laisser un produit masque commandable depuis un panier ancien.
