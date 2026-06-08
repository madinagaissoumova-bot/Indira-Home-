# Lot 4 - Auth admin et dashboard

## Objectif

Proteger l'espace admin et fournir un tableau de bord central.

## Dependances

- Lot 3 termine.
- `docs/specs/feature-specs/admin-auth.md`
- `docs/specs/feature-specs/admin-dashboard.md`

## Tickets

### ADMIN-401 - Auth admin

Implementer la connexion admin.

Regles :

- `ADMIN_USERNAME` ;
- `ADMIN_PASSWORD_HASH` bcrypt ;
- `ADMIN_SESSION_SECRET` ;
- cookie HTTP-only `indira_admin_session` ;
- `Secure` en production ;
- `SameSite=Lax` ;
- duree limitee.

Validation :

- identifiants invalides refuses ;
- session valide ouvre `/admin` ;
- session invalide redirige vers `/admin/login`.

### ADMIN-402 - Protection routes et actions

Centraliser la verification session admin.

Inclus :

- pages admin ;
- actions admin futures ;
- redirection login ;
- refus des mutations sans session.

Validation :

- `/admin` bloque sans session ;
- une action serveur admin sans session ne modifie rien.

### ADMIN-403 - Logout

Ajouter la deconnexion.

Validation :

- le cookie est supprime ou invalide ;
- revenir sur `/admin` redirige vers login.

### ADMIN-404 - Dashboard `/admin`

Construire le dashboard.

Inclus :

- chiffre d'affaires hors commandes annulees ;
- nombre total de commandes ;
- nombre total de produits ;
- produits publies en rupture ;
- commandes recentes ;
- raccourcis admin.

Validation :

- dashboard accessible apres login ;
- commandes recentes limitees a 5-10 ;
- liens rapides fonctionnent.

Note : ce lot termine a ete aligne avec la version simplifiee du dashboard admin. Les anciens compteurs detailles par statut produit et les alertes separees ne sont plus attendus sur `/admin`.

## Zones probables

- `app/admin/login/page.tsx`
- `app/admin/page.tsx`
- `app/admin/actions.ts`
- `lib/auth.ts`
- `lib/session.ts`
- `app/globals.css`

## Risques

- verifier la session seulement cote interface ;
- stocker le mot de passe en clair ;
- rendre l'admin trop visible depuis le parcours cliente.
