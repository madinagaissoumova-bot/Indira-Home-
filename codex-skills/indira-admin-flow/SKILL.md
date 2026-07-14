---
name: indira-admin-flow
description: Utiliser pour travailler sur l'authentification admin Indira Home, le tableau de bord, les produits, les categories, le stock, les commandes, les routes admin, les actions admin ou les processus de gestion proteges.
---

# Parcours Admin Indira

Utiliser ce skill pour le travail admin.

## Lire D'Abord

Lire les fichiers pertinents :

- `docs/specs/feature-specs/admin-auth.md`
- `docs/specs/feature-specs/admin-dashboard.md`
- `docs/specs/feature-specs/admin-produits.md`
- `docs/specs/feature-specs/categories-sous-categories.md`
- `docs/specs/feature-specs/admin-stock.md`
- `docs/specs/feature-specs/admin-commandes.md`
- `docs/specs/validation-rules.md`
- `docs/development-plans/termines/lot-4-auth-dashboard-admin.md`
- `docs/development-plans/termines/lot-5-admin-catalogue.md`
- `docs/development-plans/termines/lot-6-admin-stock.md`
- `docs/development-plans/termines/lot-7-admin-commandes.md`

## Routes

- `/admin/login`
- `/admin`
- `/admin/products`
- `/admin/products/:id`
- `/admin/categories`
- `/admin/stock`
- `/admin/orders`
- `/admin/orders/:id`

## Regles Auth

- L'admin utilise un seul compte V1 configure par variables d'environnement.
- Variables d'environnement requises : `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`.
- `ADMIN_PASSWORD_HASH` utilise bcrypt.
- Cookie de session : `indira_admin_session`.
- Le cookie doit etre HTTP-only, signe cote serveur, `SameSite=Lax` et `Secure` en production.
- Toutes les pages et actions admin verifient la session cote serveur.
- Aucune mutation admin via GET.

## Regles Produits Admin

- Un brouillon peut etre incomplet.
- La publication exige nom, description, prix, image, categorie, sous-categorie et stock valide.
- Les produits masques sont invisibles pour les clientes.
- Un produit deja present dans une commande validee ne peut pas etre supprime definitivement en V1.
- Utiliser le masquage pour un retrait durable quand un historique de commande existe.

## Regles Stock Admin

- Le stock exact est reserve a l'admin.
- Le stock doit etre un entier >= 0.
- Un stock 0 signifie epuise cote cliente si le produit est publie et visible.
- Les corrections manuelles apres annulation ou changement par telephone sont autorisees.
- La diminution automatique du stock arrive seulement pendant une validation de commande reussie.

## Regles Commandes Admin

- Les commandes contiennent des donnees personnelles et sont reservees a l'admin.
- Les snapshots de lignes de commande doivent rester lisibles apres modification produit.
- Les changements de statut sont manuels.
- L'annulation remet automatiquement le stock en ligne seulement selon les regles documentees dans les specs.
- Les notes sont internes uniquement.

## Avant De Finir

- verifier la protection des routes et actions ;
- verifier que les donnees clientes ne sont pas publiques ;
- verifier que les actions destructives demandent confirmation ;
- verifier que les constantes de `lib/constants.ts` sont utilisees.
