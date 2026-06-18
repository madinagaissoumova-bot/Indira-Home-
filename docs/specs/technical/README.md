# Technical Specs - Indira Home

Ce dossier contient les specs techniques de la V1. Ce fichier sert d'index central ; les details sont decoupes en specs ciblees pour eviter un seul gros document difficile a maintenir.

## Objectif technique V1

Construire un site e-commerce simple pour une boutique unique :

- Catalogue public en russe.
- Parcours mobile-first.
- Panier sans compte cliente.
- Validation de commande sans paiement en ligne.
- Espace admin protege pour gerer produits, categories, stock et commandes.

La V1 inclut le parcours cliente complet et l'admin complet. Le developpement peut rester progressif, mais le projet n'est considere complet que lorsque les deux parties fonctionnent.

## Specs techniques

| Fichier | Role |
| --- | --- |
| `docs/specs/technical/routes-navigation.md` | Routes publiques/admin, navigation et structure des pages |
| `docs/specs/technical/data-model.md` | Modeles Product, Category, Subcategory, CartItem, Order et OrderItem |
| `docs/specs/technical/server-actions.md` | Actions serveur publiques/admin et regles transactionnelles |
| `docs/specs/technical/admin-auth.md` | Authentification admin, session et protection des routes |
| `docs/specs/technical/images-content.md` | Images produit, contenu russe et snapshots de commande |
| `docs/specs/technical/operations.md` | Suppression, livraison, confidentialite, hebergement et tests |
| `docs/specs/technical/supabase.md` | Connexion Supabase PostgreSQL, commandes Prisma et sauvegardes base |
| `docs/specs/technical/production-plan.md` | Preparation production, variables d'environnement, backup et rollback |
| `docs/specs/technical/security-checklist.md` | Checklist securite V1 avant livraison |

## Regles techniques transversales

- Utiliser Next.js App Router.
- Utiliser Prisma pour acceder a la base.
- Utiliser Supabase PostgreSQL comme base principale.
- Utiliser les constantes de `lib/constants.ts` pour les statuts et modes de paiement.
- Garder les textes visibles par les clientes en russe.
- Stocker le panier cote client avec seulement `productId` et `quantity`.
- Recalculer les prix, les disponibilites et le stock cote serveur avant toute commande.
- Creer les commandes et decrementer le stock dans une transaction unique.
- Proteger toutes les routes et actions admin cote serveur.
- Ne jamais exposer la quantite exacte de stock cote cliente.

## References liees

- `docs/specs/global-spec.md`
- `docs/specs/functional-map.md`
- `docs/specs/validation-rules.md`
- `docs/specs/visual-rules.md`
- `docs/specs/work-plan.md`
- `docs/specs/feature-specs/`
- `docs/development-plans/`
- `docs/changelog/README.md`
- `docs/testing/test-plan.md`
