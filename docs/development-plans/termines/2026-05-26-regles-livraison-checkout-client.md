# Plan - Regles Livraison Et Checkout Client

## Objectif

Formaliser et appliquer les regles clientes manquantes pour la livraison, la modification ou annulation de commande, et les changements de prix ou stock entre le panier et le checkout.

## Decisions produit

- La livraison V1 est limitee a la Republique tchetchene.
- Le delai de livraison annonce aux clientes est de 4 a 5 jours.
- Les frais de livraison ne sont pas definis automatiquement dans la V1 ; la boutique les confirme par telephone ou WhatsApp.
- Une commande validee ne peut pas etre modifiee ou annulee par la cliente depuis le site.
- Pour modifier ou annuler une commande, la cliente contacte la boutique par telephone ou WhatsApp.
- Le panier navigateur ne garde que `productId` et `quantity`.
- Le serveur reverifie prix, stock, statut produit et visibilite categorie avant creation de commande.
- Si un prix change, le total recalcule doit etre montre avant validation finale.
- Si un produit devient indisponible ou si la quantite demandee est trop elevee, la commande est bloquee sans afficher le stock exact.
- Le checkout demande prenom, nom, telephone ou WhatsApp, adresse, et mode de paiement.

## Etapes

- [x] 1. Lire le contexte utile.
- [x] 2. Mettre a jour les specs produit et checkout.
- [x] 3. Aligner le code checkout, panier et confirmation avec ces regles.
- [x] 4. Verifier avec lint/build et parcours manuel client.
- [x] 5. Deplacer ce plan dans `docs/development-plans/termines/`.
- [ ] 6. Pousser sur GitHub seulement si demande explicite ou apres plan termine.

## Verification

- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm test`
- [x] Verification HTTP locale `/cart`, `/checkout`, `/checkout/confirmation`.
- [x] Verification automatisee panier serveur avec prix recalcules.
- [x] Verification automatisee stock insuffisant sans exposition du stock exact.
- [x] Verification automatisee telephone et zone de livraison.
- [x] Verification automatisee action checkout pour prenom, nom, telephone, adresse et zone hors livraison.
- [x] Verification integration locale creation commande, prix recalcule, decrement stock et nettoyage donnees de test.
- [x] Verification manuelle navigateur panier avec prix recalcule.
- [x] Verification manuelle navigateur produit devenu indisponible.
- [x] Verification manuelle navigateur checkout avec telephone/adresse invalides.
- [x] Verification manuelle navigateur confirmation sans donnees personnelles.

## Notes

Les textes visibles par les clientes doivent etre en russe dans l'interface. Les specs restent en francais et decrivent les messages attendus.

Cloture documentaire du 2026-06-02 :

- les validations finales du Lot 8 confirment le checkout, la confirmation, les regles de livraison, les prix recalcules, le decrement stock et l'absence de donnees personnelles publiques ;
- le plan est deplace dans `docs/development-plans/termines/` pour supprimer la contradiction avec `docs/development-plans/status.md`.
