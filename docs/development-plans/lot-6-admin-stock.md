# Lot 6 - Admin stock

## Objectif

Permettre a l'admin de suivre et ajuster les quantites disponibles.

## Dependances

- Lot 5 termine.
- `docs/specs/feature-specs/admin-stock.md`

## Tickets

### ADMIN-601 - Page stock `/admin/stock`

Construire la page stock.

Inclus :

- liste produits ;
- statut publication ;
- categorie ;
- stock actuel ;
- etat epuise ;
- actions ajouter, retirer, corriger.

Validation :

- page protegee ;
- produits masques visibles cote admin ;
- stock exact visible uniquement admin.

### ADMIN-602 - Ajouter du stock

Action :

- saisir une quantite positive ;
- augmenter `stockQuantity`.

Validation :

- quantite non entiere refusee ;
- quantite negative refusee ;
- produit epuise redevient commandable si toutes les conditions sont valides.

### ADMIN-603 - Retirer du stock

Action :

- saisir une quantite positive ;
- diminuer sans passer sous 0.

Validation :

- retrait superieur au stock refuse ;
- stock 0 rend le produit epuise cote cliente.

### ADMIN-604 - Corriger stock

Action :

- remplacer la quantite actuelle par une nouvelle valeur.

Validation :

- valeur entiere >= 0 ;
- correction visible immediatement cote client ;
- message admin clair.

### ADMIN-605 - Historique minimal optionnel

Si simple a ajouter, enregistrer :

- produit ;
- quantite avant ;
- variation ;
- quantite apres ;
- motif ;
- date.

Validation :

- ce ticket ne bloque pas la V1 si le reste du stock fonctionne.

## Zones probables

- `app/admin/stock/page.tsx`
- `app/admin/stock/actions.ts`
- `lib/`
- `prisma/schema.prisma` si historique ajoute

## Risques

- laisser le stock devenir negatif ;
- afficher le stock exact cote cliente ;
- oublier qu'une commande validee est le seul decrement automatique.
