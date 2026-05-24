# Lot 3 - Commande client

## Objectif

Transformer un panier valide en commande enregistree, sans compte cliente et sans paiement en ligne.

## Dependances

- Lot 2 termine.
- `docs/specs/feature-specs/validation-commande.md`
- `docs/specs/feature-specs/confirmation-commande.md`
- `docs/specs/validation-rules.md`

## Tickets

### SERVER-301 - Verification panier serveur

Creer une verification serveur du panier.

Elle doit recalculer :

- existence produit ;
- statut produit ;
- visibilite categorie ;
- visibilite sous-categorie ;
- stock disponible ;
- prix actuel ;
- sous-totaux ;
- total.

Validation :

- un panier contenant un produit invalide est refuse ;
- un produit dans une categorie ou sous-categorie masquee est refuse ;
- un prix modifie est repris depuis la base ;
- aucune valeur sensible du navigateur n'est fiable.

### PUBLIC-301 - Formulaire checkout `/checkout`

Construire le formulaire :

- nom ;
- telephone ou WhatsApp ;
- adresse ou zone ;
- paiement a la livraison ;
- virement apres confirmation ;
- recapitulatif panier.

Validation :

- champs obligatoires refuses si vides ;
- messages clients en russe ;
- pas de paiement en ligne.

### SERVER-302 - Creation commande transactionnelle

Creer l'action serveur de commande.

Regles :

- reverifier le panier ;
- valider les donnees cliente ;
- creer `Order` ;
- creer `OrderItem` avec snapshots ;
- decrementer le stock dans la meme transaction ;
- echouer sans ecriture partielle si une ligne est invalide.

Validation :

- stock diminue uniquement apres commande reussie ;
- une erreur ne cree pas de commande ;
- les prix de commande restent figes.

### PUBLIC-302 - Confirmation `/checkout/confirmation`

Construire la confirmation.

Inclus :

- message commande envoyee ;
- rappel contact telephone/WhatsApp ;
- numero public `+7 988 906-41-06` ;
- retour catalogue ;
- lien WhatsApp si simple ;
- aucun detail personnel.

Validation :

- rechargement ne recree pas de commande ;
- acces direct affiche un etat neutre ;
- panier local vide ou marque traite apres validation.

### QA-301 - Scenario concurrence dernier stock

Prevoir un test manuel ou automatise :

- produit avec stock 1 ;
- deux validations concurrentes ;
- une seule commande reussit ;
- stock final jamais negatif.

## Zones probables

- `app/checkout/page.tsx`
- `app/checkout/CheckoutClient.tsx`
- `app/checkout/actions.ts`
- `app/checkout/confirmation/page.tsx`
- `lib/`
- `prisma/schema.prisma`

## Risques

- decrementer le stock hors transaction ;
- exposer telephone ou adresse sur la confirmation ;
- valider une commande avec un produit devenu masque.
