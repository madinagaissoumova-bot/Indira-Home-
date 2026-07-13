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

Pour generer les valeurs admin de production localement :

```bash
npm run admin:generate-secrets
```

Le script demande le mot de passe admin sans l'afficher, puis imprime `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` et `ADMIN_SESSION_SECRET` a copier dans les variables Production Vercel. Il n'ecrit aucun fichier.

Pour un usage non interactif, definir temporairement `ADMIN_PASSWORD` dans l'environnement local de la commande, sans l'ajouter a `.env.example`, aux specs ou a Git.

## Configuration Vercel

Le projet n'a pas besoin de `vercel.json` en V1. Vercel peut detecter Next.js et lancer le script `npm run build`.

Reglages attendus :

- framework preset : Next.js ;
- install command : valeur par defaut Vercel ou `npm ci` ;
- build command : `npm run build` ;
- output directory : valeur par defaut Next.js ;
- Node.js : version compatible avec la CI, idealement Node 22 ;
- variables d'environnement configurees dans l'environnement Production Vercel :
  - `DATABASE_URL` ;
  - `ADMIN_USERNAME` ;
  - `ADMIN_PASSWORD_HASH` ;
  - `ADMIN_SESSION_SECRET`.

Ne pas ajouter de vraie valeur dans `.env.example`, dans les specs ou dans l'historique Git.

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

## Procedure premier deploiement

Cette procedure prepare la mise en ligne sans executer d'action destructive par reflexe.

1. Verifier que la PR de release est mergee dans `main`.
2. Verifier que la CI GitHub est verte sur `main`.
3. Creer ou choisir le projet Supabase PostgreSQL de production.
4. Recuperer la connection string PostgreSQL Supabase prevue pour l'application.
5. Configurer les variables Production dans Vercel.
6. Verifier que `DATABASE_URL` dans Vercel pointe vers la base Supabase de production prevue.
7. Generer les valeurs admin avec `npm run admin:generate-secrets`.
8. Copier `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` et `ADMIN_SESSION_SECRET` dans les variables Production Vercel.
9. Creer une sauvegarde ou un export si la base contient deja des donnees.
10. Lancer `npm run prisma:migrate` seulement apres validation explicite.
11. Lancer `npm run prisma:seed` seulement si la base est vide ou si la mise a jour catalogue est intentionnelle.
12. Declencher ou attendre le deploiement Vercel de `main`.
13. Ouvrir l'URL de production et effectuer la verification apres mise en ligne.

Les commandes de migration et de seed doivent toujours etre lancees avec la bonne `DATABASE_URL`. Le script `scripts/require-supabase-url.mjs` refuse les URLs non PostgreSQL et les placeholders.

## Verification apres mise en ligne

Verifier sur l'URL production :

- page d'accueil accessible ;
- page categorie accessible ;
- page sous-categorie accessible ;
- recherche accessible ;
- fiche produit accessible ;
- favoris locaux fonctionnels ;
- panier local fonctionnel ;
- checkout accessible ;
- commande test possible uniquement avec accord de la boutique ;
- page confirmation sans telephone ni adresse affichee publiquement ;
- page confidentialite accessible ;
- `/admin` redirige vers `/admin/login` sans session ;
- login admin possible avec les variables production ;
- dashboard admin accessible apres connexion ;
- nouvelle commande visible dans l'admin si une commande test a ete creee ;
- produit epuise non commandable ;
- produit masque non visible cote cliente ;
- logs production sans secret, telephone ou adresse complete inutile.

Quand l'URL production est disponible et que les variables admin/base sont configurees localement pour la verification, le smoke test navigateur peut etre lance avec :

```bash
QA_BASE_URL=https://example.com npm run qa:browser
```

Cette commande lit le catalogue, verifie des routes publiques et admin, controle le redirect admin sans session et capture des screenshots dans `/private/tmp/indira-browser-qa` par defaut. Elle ne remplace pas la verification manuelle de la commande test avec accord de la boutique.

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
