# Lot 0 - Base projet et donnees

## Objectif

Stabiliser la base technique et les donnees metier avant de developper les parcours.

## Dependances

- `specs/technical-specs.md`
- `specs/validation-rules.md`
- `lib/constants.ts`
- `prisma/schema.prisma`

## Tickets

### DATA-001 - Verifier constantes metier

Verifier que `lib/constants.ts` expose les valeurs suivantes :

- statuts produit : `DRAFT`, `PUBLISHED`, `HIDDEN` ;
- statuts visibilite : `VISIBLE`, `HIDDEN` ;
- modes de paiement : `CASH_ON_DELIVERY`, `TRANSFER_AFTER_CONFIRMATION` ;
- statuts commande : `NEW`, `TO_CONFIRM`, `CONFIRMED`, `PREPARING`, `DELIVERED`, `CANCELLED`.

Validation :

- aucune valeur en minuscule n'est utilisee comme valeur de stockage ;
- les specs et le code utilisent les memes valeurs.

### DATA-002 - Verifier modele Prisma V1

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

## Zones probables

- `lib/constants.ts`
- `lib/db.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- nouveaux fichiers possibles dans `lib/`

## Risques

- laisser des valeurs de statut libres dans le code ;
- oublier de bloquer les stocks negatifs cote serveur ;
- rendre un produit accessible par URL directe alors que sa categorie est masquee.
