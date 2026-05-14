# Lot 7 - Admin commandes

## Objectif

Permettre a l'admin de consulter et traiter les commandes recues.

## Dependances

- Lot 4 termine pour la protection admin.
- Lot 3 termine pour la creation de commandes.
- `specs/feature-specs/admin-commandes.md`

## Tickets

### ADMIN-701 - Liste commandes `/admin/orders`

Construire la liste commandes.

Inclus :

- numero commande ;
- date ;
- cliente ;
- statut ;
- total ;
- mode paiement ;
- filtre simple par statut ;
- lien detail.

Validation :

- page protegee ;
- nouvelles commandes visibles ;
- donnees personnelles visibles seulement admin.

### ADMIN-702 - Detail commande `/admin/orders/:id`

Construire le detail commande.

Inclus :

- nom cliente ;
- telephone/WhatsApp ;
- adresse ou zone ;
- produits commandes ;
- quantites ;
- prix unitaires snapshots ;
- total ;
- paiement prevu ;
- statut ;
- note interne.

Validation :

- prix snapshots inchanges apres modification produit ;
- commande lisible si produit masque ;
- telephone et adresse jamais exposes cote public.

### ADMIN-703 - Changement statut

Permettre les statuts :

- `NEW`
- `TO_CONFIRM`
- `CONFIRMED`
- `PREPARING`
- `DELIVERED`
- `CANCELLED`

Validation :

- statut invalide refuse ;
- annulation demande confirmation ;
- annulation ne remet pas automatiquement le stock.

### ADMIN-704 - Note interne

Ajouter edition note admin.

Validation :

- note visible seulement admin ;
- sauvegarde sans modifier les snapshots commande.

### ADMIN-705 - Contact telephone et WhatsApp

Ajouter si simple :

- lien telephone ;
- lien WhatsApp.

Validation :

- numero invalide affiche un message admin ;
- aucune notification automatique requise.

## Zones probables

- `app/admin/orders/page.tsx`
- `app/admin/orders/[id]/page.tsx`
- `app/admin/orders/actions.ts`
- `lib/`
- `app/globals.css`

## Risques

- exposer des donnees personnelles publiquement ;
- modifier les snapshots au lieu de lire les valeurs figees ;
- remettre automatiquement le stock lors d'une annulation alors que la V1 prevoit une correction manuelle.
