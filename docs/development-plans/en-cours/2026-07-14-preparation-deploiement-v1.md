# Plan - Preparation deploiement V1

## Objectif

Preparer le vrai passage en ligne d'Indira Home sans toucher aux donnees par accident et sans exposer de secrets.

## Perimetre valide

- Verifier la configuration Vercel attendue.
- Lister exactement les variables a configurer en production.
- Verifier quelle base Supabase sera utilisee.
- Preparer une procedure de premier deploiement etape par etape.
- Preparer une checklist de test apres mise en ligne.
- Corriger uniquement les petits manques de documentation ou configuration trouves pendant l'audit.

## Hors perimetre

- Aucun changement design.
- Aucune modification produit.
- Aucune vraie migration production sans validation explicite separee.
- Aucun seed production sans validation explicite separee.
- Aucune nouvelle fonctionnalite.

## Validation prevue

- Audit des fichiers de configuration deployment.
- Audit des variables d'environnement attendues par le code.
- Verification des scripts production existants.
- Verification documentaire avec `npm run check:docs`.
- Checks supplementaires adaptes si une modification autre que documentation est necessaire.

## Resultat provisoire

- Aucun `vercel.json` n'est necessaire en V1 : Vercel peut utiliser la detection Next.js et `npm run build`.
- Les variables applicatives obligatoires en production sont `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` et `ADMIN_SESSION_SECRET`.
- `DATABASE_URL` doit pointer vers la base Supabase PostgreSQL de production prevue.
- Les migrations et le seed restent des actions separees qui demandent une validation explicite.
- `production-plan.md` decrit maintenant la configuration Vercel, la procedure de premier deploiement et la verification apres mise en ligne.

## Validations effectuees

- `npm run check:docs` : OK.
- Recherche ciblee de secrets reels dans les fichiers versionnes : OK, aucun match.
- `npm run lint` : OK.
- `npm test` : OK, 37 tests passes, 1 integration DB ignoree sans `RUN_DB_INTEGRATION=1`.
- `npm run build` : OK.
