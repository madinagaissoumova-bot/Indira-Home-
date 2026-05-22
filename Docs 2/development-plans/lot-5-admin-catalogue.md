# Lot 5 - Admin catalogue

## Objectif

Permettre a l'admin de maintenir les produits, categories et sous-categories sans modifier le code.

## Dependances

- Lot 4 termine.
- `Docs/specs/feature-specs/admin-produits.md`
- `Docs/specs/feature-specs/categories-sous-categories.md`
- `Docs/specs/validation-rules.md`

## Tickets

### ADMIN-501 - Liste produits `/admin/products`

Construire la liste admin produits.

Inclus :

- nom ;
- statut ;
- categorie ;
- sous-categorie ;
- prix ;
- stock ;
- epuise ou commandable ;
- actions modifier, masquer, publier si possible.

Validation :

- page protegee ;
- produits masques et brouillons visibles cote admin ;
- scan rapide possible.

### ADMIN-502 - Formulaire produit `/admin/products/:id`

Construire creation et edition produit.

Champs :

- nom ;
- slug ;
- description ;
- prix ;
- images URL ;
- categorie ;
- sous-categorie ;
- stock actuel du produit, avec ajustements detailles traites dans le Lot 6 ;
- statut ;
- nouveaute ;
- marque ;
- caracteristiques ;
- ordre.

Validation :

- brouillon peut etre incomplet ;
- publication incomplete refusee ;
- prix doit etre entier > 0 ;
- stock entier >= 0 ;
- au moins une image valide pour publication.

### ADMIN-503 - Actions produit

Ajouter :

- enregistrer brouillon ;
- publier ;
- masquer ;
- remettre visible ;
- supprimer si autorise.

Validation :

- confirmation avant suppression ;
- suppression bloquee si produit present dans une commande validee ;
- suppression d'un produit dans un panier ancien bloque ensuite la validation.

### ADMIN-504 - Gestion categories `/admin/categories`

Construire gestion categories et sous-categories.

Inclus :

- ajouter ;
- modifier ;
- masquer ;
- afficher ;
- changer ordre ;
- supprimer si autorise ;
- associer sous-categorie a categorie.

Validation :

- categorie avec produits non supprimable ;
- sous-categorie avec produits non supprimable ;
- masquer une categorie cache les produits cote cliente ;
- slugs coherents avec `/category/:slug` et `/subcategory/:slug`.

## Zones probables

- `app/admin/products/page.tsx`
- `app/admin/products/[id]/page.tsx`
- `app/admin/products/actions.ts`
- `app/admin/categories/page.tsx`
- `app/admin/categories/actions.ts`
- `lib/`
- `app/globals.css`

## Risques

- permettre la publication d'un produit incomplet ;
- casser les commandes en supprimant un produit deja commande ;
- laisser un produit accessible cote cliente via une sous-categorie visible mais une categorie masquee.
