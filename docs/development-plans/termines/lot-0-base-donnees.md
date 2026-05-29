# Lot 0 - Base projet et donnees

## Objectif

Stabiliser la base technique et les donnees metier avant de developper les parcours.

Statut : termine et verifie.

## Dependances

- `docs/specs/technical/README.md`
- `docs/specs/validation-rules.md`
- `lib/constants.ts`
- `prisma/schema.prisma`

## Tickets

### DATA-001 - Verifier constantes metier

Etat : implemente et verifie.

Verifier que `lib/constants.ts` expose les valeurs suivantes :

- statuts produit : `DRAFT`, `PUBLISHED`, `HIDDEN` ;
- statuts visibilite : `VISIBLE`, `HIDDEN` ;
- modes de paiement : `CASH_ON_DELIVERY`, `TRANSFER_AFTER_CONFIRMATION` ;
- statuts commande : `NEW`, `TO_CONFIRM`, `CONFIRMED`, `PREPARING`, `DELIVERED`, `CANCELLED`.

Validation :

- aucune valeur en minuscule n'est utilisee comme valeur de stockage ;
- les specs et le code utilisent les memes valeurs.

### DATA-002 - Verifier modele Prisma V1

Etat : implemente et verifie.

Verifier ou ajuster les modeles :

- `Category`
- `Subcategory`
- `Product`
- `ProductImage`
- `Order`
- `OrderItem`

Points critiques :

- `Product.stockQuantity` entier et jamais negatif cote validation ;
- `Product.status` compatible constantes ;
- `Category.status` et `Subcategory.status` compatibles constantes ;
- `OrderItem` conserve les snapshots nom, image, prix, quantite ;
- suppression definitive produit deja commande bloquee par logique applicative.

Validation :

- `npm run prisma:generate` passe ;
- les relations Prisma permettent les lectures catalogue, panier et admin.

### DATA-003 - Seed categories et produits de test

Etat : implemente et verifie.

Creer ou verifier le seed de depart :

- categories de depart ;
- sous-categories de depart ;
- quelques produits publies ;
- au moins un produit epuise ;
- au moins un produit masque ou brouillon ;
- au moins un produit nouveau.

Validation :

- `npm run prisma:seed` cree des donnees utiles pour tester le catalogue ;
- les noms visibles cote cliente sont en russe ou clairement remplacables par du russe.

### SERVER-001 - Helpers de lecture publique

Etat : implemente et verifie.

Preparer des fonctions de lecture serveur :

- lister produits publics ;
- lire produit public par slug ;
- lister categories visibles ;
- verifier si un produit est commandable.

Regles :

- produit public = `PUBLISHED`, categorie `VISIBLE`, sous-categorie `VISIBLE` ;
- stock 0 visible mais non commandable ;
- brouillon et masque invisibles.

Validation :

- les helpers peuvent etre reutilises dans catalogue, fiche produit, panier et checkout.

### SERVER-002 - Validations serveur communes

Etat : implemente et verifie.

Centraliser les validations serveur :

- statuts produit ;
- statuts de visibilite ;
- modes de paiement ;
- statuts commande ;
- entiers positifs et entiers superieurs ou egaux a zero ;
- slugs ;
- URLs d'images produit ;
- telephone cliente et zone de livraison.

Validation :

- les helpers sont testes dans `tests/validation.test.ts` ;
- les actions admin produits, categories, stock et commandes utilisent les helpers communs.

## Validation finale

- `npm run prisma:generate` : OK.
- `npm run prisma:seed` : OK.
- Verification base locale apres seed : 4 categories, 15 sous-categories, 18 produits publies, 1 produit publie epuise, 1 produit masque ou brouillon, 17 produits nouveaux.
- `npm test` : OK.
- `npm run lint` : OK.
- `npm run build` : OK.
- `npm run check:docs` : OK.

## Zones traitees

- `lib/constants.ts`
- `lib/publicCatalog.ts`
- `lib/serverCart.ts`
- `lib/validation.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `tests/public-catalog.test.ts`
- `tests/validation.test.ts`

## Risques couverts

- valeurs de statut libres remplacees par helpers constants ;
- stocks negatifs refuses cote serveur ;
- produits publics et commandables verifies par helpers communs ;
- produits epuise et masque presents dans les donnees de test.
