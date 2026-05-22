# Production Plan - Indira Home V1

Ce fichier liste les decisions et verifications necessaires avant mise en production.

## Objectif

Mettre en ligne la V1 sans perdre de donnees, sans exposer les commandes et sans ajouter de fonctionnalites hors V1.

## Decisions V1

| Sujet | Decision |
| --- | --- |
| Framework | Next.js App Router |
| ORM | Prisma |
| Base locale | SQLite |
| Base production | PostgreSQL compatible Prisma |
| Images V1 | URLs externes stables |
| Upload image | Hors V1 |
| Optimisation images | `next/image` avec `unoptimized` tant que les URLs admin sont libres |
| Secrets | Variables d'environnement uniquement |
| Paiement en ligne | Hors V1 |
| Comptes clientes | Hors V1 |

SQLite en production est seulement acceptable temporairement si l'hebergeur garantit un disque persistant, une sauvegarde et aucune perte au redeploiement.

## Variables d'environnement

Obligatoires :

- `DATABASE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- `ADMIN_SESSION_SECRET`

Recommandees :

- `NODE_ENV=production`

Regles :

- aucun secret ne doit etre commite ;
- `ADMIN_PASSWORD_HASH` doit etre un hash bcrypt ;
- `ADMIN_SESSION_SECRET` doit etre long, aleatoire et different du developpement ;
- changer un secret de session deconnecte les sessions admin existantes.

## Preparation base de donnees

Avant mise en ligne :

1. Creer la base PostgreSQL.
2. Configurer `DATABASE_URL`.
3. Executer les migrations Prisma.
4. Executer `npm run prisma:generate`.
5. Executer le seed initial si necessaire.
6. Verifier que categories et sous-categories sont presentes.
7. Verifier qu'au moins un compte admin est configurable via variables.

## Migration depuis SQLite locale

Si des donnees reelles existent deja dans SQLite :

1. Exporter les donnees SQLite.
2. Creer un backup du fichier `prisma/dev.db`.
3. Importer ou recreer les donnees dans PostgreSQL avec un script controle.
4. Verifier les relations produits, images, categories, commandes.
5. Comparer les compteurs avant/apres.

Si les donnees locales sont seulement des donnees de test, ne pas migrer les commandes de test en production.

## Sauvegardes

Avant lancement :

- verifier qu'une sauvegarde manuelle PostgreSQL est possible ;
- documenter ou automatiser une sauvegarde reguliere ;
- tester au moins une restauration sur un environnement non production si possible.

Avant operation sensible :

- migration schema ;
- import produits ;
- changement important admin ;
- suppression massive.

Faire une sauvegarde.

## Build et verification

Commandes minimales :

- `npm run prisma:generate`
- `npm run build`

Si disponibles :

- `npm run lint`
- `npm test`
- `npm run prisma:migrate`
- `npm run prisma:seed`

Verification manuelle :

- catalogue public ;
- fiche produit ;
- panier ;
- checkout ;
- confirmation ;
- login admin ;
- dashboard admin ;
- gestion produits ;
- gestion stock ;
- gestion commandes.

## Donnees personnelles

Verifier avant production :

- aucune page publique n'affiche telephone cliente ;
- aucune page publique n'affiche adresse cliente ;
- les erreurs publiques ne montrent pas de stack trace ;
- les logs serveur ne contiennent pas inutilement telephone ou adresse ;
- l'admin commandes est protege.

## Rollback

Prevoir :

- derniere version stable du code ;
- derniere sauvegarde base ;
- procedure de restauration base ;
- procedure de retour a la version precedente.

Une migration destructive ne doit pas etre lancee sans sauvegarde recente.

## Checklist go-live

- `DATABASE_URL` production configure.
- `ADMIN_USERNAME` configure.
- `ADMIN_PASSWORD_HASH` bcrypt configure.
- `ADMIN_SESSION_SECRET` configure.
- Build production passe.
- Migrations appliquees.
- Categories de depart presentes.
- Produit de test commande avec succes.
- Stock diminue apres commande.
- Commande visible dans admin.
- Routes admin bloquees sans session.
- Textes client en russe.
- Paiement en ligne absent.
- Livraison limitee a la Republique tchetchene visible.
- Sauvegarde production disponible.
- Page confidentialite publique disponible.

## Etat local du 2026-05-21

Verifie pendant la passe QA V1 :

- `npm run lint` passe.
- `npm run prisma:generate` passe.
- `npm run build` passe.
- Les routes publiques principales repondent en HTTP local.
- `/admin` sans session redirige vers `/admin/login`.
- `.env.example` documente les variables attendues par le code : `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`.
- Le `.env` local de developpement a ete migre vers les variables admin actuelles.

Point a corriger avant go-live :

- remplacer les identifiants admin locaux par un vrai mot de passe de production, un hash bcrypt neuf et un `ADMIN_SESSION_SECRET` long et aleatoire.
