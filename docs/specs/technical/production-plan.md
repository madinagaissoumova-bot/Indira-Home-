# Production Plan - Indira Home V1

Ce fichier liste les decisions et verifications necessaires avant mise en production.

## Objectif

Mettre en ligne la V1 sans perdre de donnees, sans exposer les commandes et sans ajouter de fonctionnalites hors V1.

## Decisions V1

| Sujet | Decision |
| --- | --- |
| Framework | Next.js App Router |
| ORM | Prisma |
| Base | Supabase PostgreSQL compatible Prisma |
| Images V1 | URLs externes stables |
| Upload image | Hors V1 |
| Optimisation images | `next/image` avec `unoptimized` tant que les URLs admin sont libres |
| Secrets | Variables d'environnement uniquement |
| Paiement en ligne | Hors V1 |
| Comptes clientes | Hors V1 |

SQLite n'est plus le mode courant du projet. Les commandes Prisma attendent une URL PostgreSQL Supabase.

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

1. Creer le projet Supabase PostgreSQL.
2. Configurer `DATABASE_URL`.
3. Verifier que `DATABASE_URL` pointe vers la base cible avant toute commande.
4. Faire une sauvegarde ou un export si la base contient deja des donnees.
5. Executer `npm run prisma:migrate` pour initialiser ou mettre a jour le schema PostgreSQL.
6. Executer `npm run prisma:generate`.
7. Executer le seed initial seulement si la base est vide ou si la mise a jour du catalogue est intentionnelle.
8. Verifier que categories et sous-categories sont presentes.
9. Verifier qu'au moins un compte admin est configurable via variables.

## Migration depuis ancienne SQLite locale

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

### Configuration

- `DATABASE_URL` Supabase production configure et verifie.
- `ADMIN_USERNAME` configure.
- `ADMIN_PASSWORD_HASH` bcrypt configure, sans mot de passe en clair.
- `ADMIN_SESSION_SECRET` long, aleatoire et different du developpement.
- Aucune valeur reelle de production n'est commitee.

### Base et donnees

- Sauvegarde ou export disponible avant migration.
- Migrations appliquees avec `npm run prisma:migrate`.
- Seed lance seulement si la base est vide ou si la mise a jour du catalogue est voulue.
- Categories et sous-categories de depart presentes.
- Produits publics visibles, produits masques invisibles.

### Verification applicative

- `npm run prisma:generate` passe.
- `npm run lint` passe si disponible.
- `npm test` passe si disponible.
- `npm run build` passe.
- Catalogue public verifie.
- Fiche produit verifiee.
- Panier verifie.
- Checkout verifie.
- Confirmation verifiee sans donnees personnelles sensibles.
- Login admin verifie.
- Dashboard admin verifie.
- Gestion produits, stock et commandes verifiee.

### Commande test

- Produit de test commande avec succes.
- Stock diminue apres commande.
- Double soumission de la meme tentative ne cree qu'une commande.
- Commande visible dans admin.

### Securite et contenu public

- Routes admin bloquees sans session.
- Tentatives de connexion admin repetees limitees ou ralenties.
- Textes client en russe.
- Paiement en ligne absent.
- Livraison limitee a la Republique tchetchene visible.
- Page confidentialite publique disponible.

### Rollback

- Derniere version stable du code identifiee.
- Sauvegarde base recente disponible.
- Procedure de restauration base connue.
- Procedure de retour a la version precedente connue.

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
