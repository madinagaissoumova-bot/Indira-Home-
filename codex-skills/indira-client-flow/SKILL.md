---
name: indira-client-flow
description: Utiliser pour travailler sur le parcours cliente Indira Home : catalogue, categories, fiche produit, panier, validation commande, confirmation, UX mobile ou textes clientes en russe.
---

# Parcours Cliente Indira

Utiliser ce skill pour le travail sur l'experience cliente publique.

## Lire D'Abord

Lire les fichiers pertinents :

- `docs/specs/feature-specs/catalogue-produits.md`
- `docs/specs/feature-specs/categories-sous-categories.md`
- `docs/specs/feature-specs/fiche-produit.md`
- `docs/specs/feature-specs/panier.md`
- `docs/specs/feature-specs/validation-commande.md`
- `docs/specs/feature-specs/confirmation-commande.md`
- `docs/specs/visual-rules.md`
- `lib/i18n/ru.ts`
- fichiers pertinents dans `docs/changelog/zones/`

## Routes

- `/`
- `/category/:slug`
- `/subcategory/:slug`
- `/product/:slug`
- `/cart`
- `/checkout`
- `/checkout/confirmation`

## Regles Cliente

- Tous les textes visibles par les clientes sont en russe.
- Les prix sont affiches en roubles.
- Les clientes ne creent pas de compte.
- Pas de paiement en ligne en V1.
- La livraison est limitee a la Republique tchetchene.
- WhatsApp public de la boutique : `+7 988 906-41-06`.
- Ne pas afficher le stock exact aux clientes.
- Les produits publies avec stock 0 restent visibles mais non commandables.
- Les brouillons et produits masques ne sont pas visibles.
- Les produits dans des categories ou sous-categories masquees ne sont pas visibles, meme par URL produit directe.

## Regles Panier

Stocker uniquement ceci dans `localStorage` :

- `productId`
- `quantity`

Ne jamais faire confiance aux donnees panier du navigateur pour prix, stock, statut, visibilite categorie ou total. Recalculer cote serveur avant validation commande ou commande.

## Regles UX

- Mobile-first.
- Le catalogue est le premier ecran utile, pas une landing page marketing.
- Garder les cartes produit stables et lisibles.
- Utiliser des etats vides et erreurs clairs.
- Ne pas ajouter de longues explications dans l'UI cliente.

## Liste De Verification De Mise En Oeuvre

Avant de finir un travail cliente :

- les textes clientes sont en russe ;
- aucun stock exact n'apparait ;
- les produits epuises ne peuvent pas etre ajoutes ;
- les produits de categories ou sous-categories masquees sont inaccessibles ;
- la validation commande n'a pas de paiement en ligne ;
- la confirmation n'expose ni telephone ni adresse cliente ;
- le layout mobile ne deborde pas.
