# Lot 4 - Auth admin et dashboard

## Objectif

Proteger l'espace admin et fournir un tableau de bord central.

## Dependances

- Lot 3 termine.
- `Docs/specs/feature-specs/admin-auth.md`
- `Docs/specs/feature-specs/admin-dashboard.md`

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

- commandes nouvelles ;
- commandes en cours ;
- produits publies ;
- produits visibles cote cliente si different ;
- produits epuises ;
- produits masques ;
- commandes recentes ;
- alertes stock 0 ;
- raccourcis admin.

Validation :

- dashboard accessible apres login ;
- commandes recentes limitees a 5-10 ;
- liens rapides fonctionnent.

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
