# Tickets - Indira Home V1

Ce fichier suit les tickets de developpement V1.

Statuts :

- `DONE` : termine et verifie.
- `ACTIVE` : en cours.
- `TODO` : a faire.
- `BLOCKED` : bloque.

Priorites :

- `P0` : bloque la V1.
- `P1` : important pour une V1 propre.
- `P2` : utile mais peut attendre si necessaire.

## Prochain focus recommande

1. Limiter les tentatives de connexion admin repetees.
2. Reprendre les preparatifs de mise en ligne V1.

## Lot 0 - Base projet et donnees

| Ticket | Priorite | Statut | Description |
| --- | --- | --- | --- |
| DATA-001 | P0 | DONE | Verifier constantes metier et valeurs de stockage. |
| DATA-002 | P0 | DONE | Verifier modele Prisma V1 et relations. |
| DATA-003 | P1 | DONE | Seed categories, sous-categories et produits de test. |
| SERVER-001 | P0 | DONE | Creer helpers de lecture publique reutilisables. |
| SERVER-002 | P0 | DONE | Centraliser les validations serveur communes. |
| SERVER-003 | P0 | DONE | Bloquer suppression definitive produit deja commande. |

## Lot 1 - Catalogue client

| Ticket | Priorite | Statut | Description |
| --- | --- | --- | --- |
| PUBLIC-101 | P0 | DONE | Page catalogue `/` avec cartes produit. |
| PUBLIC-102 | P0 | DONE | Navigation categories visibles. |
| PUBLIC-103 | P0 | DONE | Recherche, filtres et tri catalogue. |
| PUBLIC-104 | P0 | DONE | Route `/subcategory/:slug`. |
| UI-101 | P1 | DONE | Mobile catalogue et filtres compacts. |

## Lot 2 - Fiche produit et panier

| Ticket | Priorite | Statut | Description |
| --- | --- | --- | --- |
| PUBLIC-201 | P0 | DONE | Fiche produit `/product/:slug`. |
| PUBLIC-202 | P0 | DONE | Ajout panier depuis catalogue et fiche. |
| PUBLIC-203 | P0 | DONE | Page panier `/cart`. |
| PUBLIC-204 | P0 | DONE | Quantites panier robustes et corrections invalides. |
| PUBLIC-205 | P1 | DONE | Galerie produit et caracteristiques facultatives. |

## Lot 3 - Commande client

| Ticket | Priorite | Statut | Description |
| --- | --- | --- | --- |
| SERVER-301 | P0 | DONE | Verification panier serveur reutilisable. |
| PUBLIC-301 | P0 | DONE | Formulaire checkout `/checkout`. |
| SERVER-302 | P0 | DONE | Creation commande transactionnelle. |
| SERVER-303 | P0 | DONE | Rendre la creation de commande idempotente pour une meme tentative checkout. |
| PUBLIC-302 | P0 | DONE | Confirmation `/checkout/confirmation`. |
| QA-301 | P0 | DONE | Test concurrence dernier stock. |
| QA-302 | P0 | DONE | Test confirmation sans donnees personnelles. |

## Lot 4 - Auth admin et dashboard

| Ticket | Priorite | Statut | Description |
| --- | --- | --- | --- |
| ADMIN-401 | P0 | DONE | Auth admin avec cookie signe HTTP-only. |
| ADMIN-402 | P0 | DONE | Protection routes et actions admin. |
| ADMIN-403 | P0 | DONE | Deconnexion admin. |
| ADMIN-404 | P0 | DONE | Dashboard avec vrais compteurs et commandes recentes. |
| ADMIN-405 | P1 | TODO | Limiter ou ralentir les tentatives de connexion admin repetees. |

## Lot 5 - Admin catalogue

| Ticket | Priorite | Statut | Description |
| --- | --- | --- | --- |
| ADMIN-501 | P0 | DONE | Liste produits `/admin/products`. |
| ADMIN-502 | P0 | DONE | Formulaire produit `/admin/products/:id`. |
| ADMIN-503 | P0 | DONE | Actions publier, masquer, remettre visible, supprimer si autorise. |
| ADMIN-504 | P0 | DONE | Gestion categories `/admin/categories`. |

## Lot 6 - Admin stock

| Ticket | Priorite | Statut | Description |
| --- | --- | --- | --- |
| ADMIN-601 | P0 | DONE | Page stock `/admin/stock`. |
| ADMIN-602 | P0 | DONE | Ajouter du stock. |
| ADMIN-603 | P0 | DONE | Retirer du stock. |
| ADMIN-604 | P0 | DONE | Corriger stock. |
| ADMIN-605 | P2 | TODO | Historique minimal de stock optionnel, hors blocage V1. |

## Lot 7 - Admin commandes

| Ticket | Priorite | Statut | Description |
| --- | --- | --- | --- |
| ADMIN-701 | P0 | DONE | Liste commandes `/admin/orders`. |
| ADMIN-702 | P0 | DONE | Detail commande `/admin/orders/:id`. |
| ADMIN-703 | P0 | DONE | Changement statut commande. |
| ADMIN-704 | P1 | DONE | Note interne admin. |
| ADMIN-705 | P1 | DONE | Liens telephone et WhatsApp. |

## Lot 8 - Polish et verification

| Ticket | Priorite | Statut | Description |
| --- | --- | --- | --- |
| UI-801 | P0 | DONE | Relecture textes russes client. |
| UI-802 | P1 | DONE | Centralisation contenu client russe. |
| UI-803 | P0 | DONE | Audit mobile public et navigation header. |
| UI-804 | P1 | DONE | Audit admin. |
| QA-801 | P0 | DONE | Checklist fonctionnelle V1. |
| QA-802 | P0 | DONE | Build et verification production. |

## Regle de mise a jour

Quand un ticket change de statut, mettre aussi a jour `docs/development-plans/status.md` si cela change l'etat d'un lot complet.
