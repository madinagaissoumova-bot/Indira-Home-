# Lot 8 - Polish mobile et verification V1

## Objectif

Transformer l'application fonctionnelle en V1 livrable.

## Dependances

- Lots 0 a 7 termines.
- `docs/specs/visual-rules.md`
- `docs/testing/test-plan.md`
- `docs/specs/user-stories.md`

## Tickets

### UI-801 - Relecture textes russes

Verifier tous les textes visibles par les clientes :

- catalogue ;
- categories ;
- fiche produit ;
- panier ;
- checkout ;
- confirmation ;
- erreurs ;
- etats vides.

Validation :

- aucun texte client important en francais ;
- messages courts et comprehensibles ;
- numero WhatsApp correct.

### UI-802 - Centralisation contenu client

Centraliser autant que possible les textes client.

Exemple de cible :

- `lib/i18n/ru.ts`

Validation :

- les textes reutilises ne sont pas disperses partout ;
- les enums techniques ne sont pas affiches directement aux clientes.

### UI-803 - Audit mobile public

Verifier et corriger :

- 360 px ;
- 390 px ;
- 768 px ;
- 1280 px.

Parcours :

- catalogue ;
- recherche/filtres ;
- fiche produit ;
- panier ;
- checkout ;
- confirmation.

Validation :

- pas de debordement ;
- boutons faciles a toucher ;
- panier et formulaire lisibles.

### UI-804 - Audit admin

Verifier :

- dashboard ;
- produits ;
- categories ;
- stock ;
- commandes ;
- detail commande.

Validation :

- navigation claire ;
- tableaux lisibles ;
- actions destructives confirmees ;
- statuts visibles.

### QA-801 - Checklist fonctionnelle

Executer `docs/testing/test-plan.md`.

Validation :

- tous les parcours critiques client passent ;
- tous les parcours critiques admin passent ;
- les cas stock et snapshots passent.

### QA-802 - Verification build et production

Executer :

- `npm run prisma:generate`
- `npm run build`

Et si disponibles :

- `npm run lint`
- `npm test`
- `npm run prisma:migrate`
- `npm run prisma:seed`

Validation :

- build passe ;
- variables admin documentees ;
- sauvegarde/export production prevu ;
- pas de paiement en ligne active.

## Zones probables

- `app/globals.css`
- `app/`
- `components/`
- `lib/i18n/ru.ts`
- `docs/testing/test-plan.md`

## Mini-plans d'execution

### Mini-plan 1 - Debloquer l'environnement local

Objectif :

- obtenir une app consultable en local avec Prisma connecte a Supabase.

Execution :

- verifier que `DATABASE_URL` dans `.env` commence par `postgresql://` ou `postgres://` ;
- executer `npm run prisma:generate` ;
- lancer `npm run dev` ;
- verifier par HTTP `/`, `/cart`, `/checkout` et `/admin/login`.

Validation :

- les routes repondent sans erreur Prisma ;
- le serveur local reste stable.

### Mini-plan 2 - Audit mobile public UI-803

Objectif :

- valider le parcours cliente sur 360 px, 390 px, 768 px et 1280 px.

Execution :

- ouvrir le catalogue, une recherche, une fiche produit, le panier et le checkout ;
- corriger les debordements, espacements, boutons ou textes trop longs ;
- garder les textes visibles en russe et ne pas afficher le stock exact.

Validation :

- pas de debordement visible ;
- les actions principales sont faciles a toucher ;
- le panier et le formulaire checkout restent lisibles.

### Mini-plan 3 - Audit admin UI-804

Objectif :

- valider l'admin connecte sur les ecrans V1.

Execution :

- tester connexion, dashboard, produits, categories, stock, commandes et detail commande ;
- corriger les problemes de lisibilite, navigation et libelles ;
- verifier que les actions admin restent protegees cote serveur.

Validation :

- navigation claire ;
- listes et formulaires lisibles ;
- statuts et actions importantes visibles.

### Mini-plan 4 - Checklist V1 QA-801

Objectif :

- executer la checklist fonctionnelle avant cloture V1.

Execution :

- suivre `docs/testing/test-plan.md` ;
- verifier les cas stock, snapshots, confidentialite et absence de paiement en ligne ;
- mettre a jour `docs/project-management/tickets.md` et `docs/project-management/status.md`.

Validation :

- tous les parcours critiques passent ;
- les tickets Lot 8 peuvent etre marques termines ;
- le plan peut etre deplace dans `docs/development-plans/termines/`.

## Journal d'execution

### 2026-05-29 - Preparation Lot 8

- Mini-plans d'execution ajoutes pour piloter la fin du Lot 8 par petits blocs.
- Correction de l'accueil : le hero conserve une hauteur de premiere vue sans bloquer le scroll vers le catalogue.
- Remplacement des derniers libelles admin visibles en francais par des libelles russes.
- Centralisation de libelles admin supplementaires dans `lib/i18n/ru.ts`.
- Ajout de helpers de libelles admin pour statuts commande, produit et visibilite.
- Ajout de `tests/admin-labels.test.ts` pour verrouiller l'affichage russe des statuts admin.

Validations executees :

- `npm run lint` : OK.
- `npm run build` : OK.
- `npm test` : OK, 28 tests passent, integration checkout DB ignoree sans `RUN_DB_INTEGRATION=1`.
- `npm run check:docs` : OK.

Blocage restant :

- Mini-plan 1 partiellement debloque : `npm run prisma:generate` passe apres chargement de `.env` par `scripts/require-supabase-url.mjs`.
- L'audit visuel reel sur navigateur et l'audit admin connecte restent bloques par l'authentification Supabase : la base repond, mais refuse les identifiants de `DATABASE_URL`.

### 2026-06-01 - Reprise verification V1

- Verification de l'etat Git : aucun changement local avant reprise.
- `npm run prisma:generate` passe avec la configuration locale.
- `npm run lint` passe.
- `npm test` passe : 28 tests OK, integration checkout DB ignoree sans `RUN_DB_INTEGRATION=1`.
- `npm run build` passe.
- `npm run prisma:migrate` atteint Supabase avec acces reseau, mais echoue encore avec `P1000 Authentication failed`.

Blocage restant :

- Mini-plan 1 reste bloque par les identifiants Supabase de `DATABASE_URL`.
- Tant que l'authentification DB echoue, `npm run prisma:migrate`, `npm run prisma:seed`, l'audit admin connecte et la checklist V1 avec donnees reelles ne peuvent pas etre termines.

### 2026-06-01 - Supabase debloque

- Remplacement local de `DATABASE_URL` par la connexion directe Supabase valide.
- Suppression du dossier local vide non suivi `prisma/migrations/20260512120000_init`, qui bloquait Prisma avec `P3015`.
- `npm run prisma:migrate` passe : migration `20260529090000_init_supabase` appliquee sur Supabase.
- `npm run prisma:seed` passe : donnees V1 creees dans la base.

Validation :

- Mini-plan 1 est debloque cote base de donnees.
- La suite peut reprendre avec le lancement local, l'audit mobile public et l'audit admin connecte.

### 2026-06-01 - Verification locale apres seed

- `npm run dev` demarre sur `http://localhost:3000`.
- Routes publiques verifiees en HTTP 200 : `/`, `/category/posuda`, `/subcategory/servizy`, `/product/stolovyi-serviz-white-lui-laren-39`, `/search?q=serviz`, `/cart`, `/checkout`, `/admin/login`.
- Protection admin verifiee : `/admin` redirige vers `/admin/login` sans session.
- Donnees seed verifiees dans Supabase : 4 categories, 15 sous-categories, 19 produits, 18 produits publies, 0 commande initiale.

Reste a faire :

- audit visuel responsive reel sur mobile et desktop ;
- connexion admin et verification des ecrans admin avec les variables admin locales ;
- checklist fonctionnelle complete `docs/testing/test-plan.md`.

## Risques

- finir avec un parcours fonctionnel mais peu utilisable sur mobile ;
- laisser des textes client en francais ;
- oublier de verifier les donnees personnelles sur les pages publiques ;
- oublier la sauvegarde avant production.
