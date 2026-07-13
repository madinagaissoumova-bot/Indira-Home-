# Plan - Preparation mise en production V1

## Objectif

Preparer Indira Home pour une publication V1 sans casser les donnees, sans exposer de secrets, et avec une checklist de mise en production claire.

## Perimetre valide

- Verifier `.env.example` et les variables d'environnement attendues en production.
- Verifier les prerequis Supabase/PostgreSQL.
- Verifier la procedure de migrations et de seed.
- Verifier les points de sauvegarde et de rollback.
- Verifier qu'aucun secret reel n'est versionne.
- Preparer une checklist go-live claire.
- Corriger uniquement les petits manques de documentation ou configuration trouves pendant l'audit.

## Hors perimetre

- Aucun deploiement reel sans validation explicite.
- Aucune migration destructive.
- Aucun changement design.
- Aucune nouvelle fonctionnalite.

## Validation prevue

- Audit des specs et fichiers de configuration production.
- Verification de l'absence de secrets evidents dans les fichiers versionnes.
- Verification des scripts utiles a la preparation production.
- Tests/documentation checks adaptes si une modification est effectuee.

## Resultat provisoire

- `.env.example` clarifie les valeurs attendues sans exposer de secret reel.
- `production-plan.md` contient une checklist go-live ordonnee par configuration, base, verification applicative, commande test, securite et rollback.
- `supabase.md` precise que le seed production se lance seulement sur base vide ou mise a jour catalogue intentionnelle.
- `.env` reste ignore et seul `.env.example` est suivi par Git.
- `prisma/dev.db` existe localement mais n'est pas suivi par Git.

## Validations effectuees

- `npm run check:docs` : OK.
- Recherche ciblee de secrets reels dans les fichiers versionnes : OK, aucun match.
- `npm run lint` : OK.
- `npm test` : OK, 37 tests passes, 1 integration DB ignoree sans `RUN_DB_INTEGRATION=1`.
- `npm run build` : OK.
