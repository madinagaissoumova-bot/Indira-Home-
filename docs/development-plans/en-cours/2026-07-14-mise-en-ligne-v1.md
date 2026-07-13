# Plan - Mise en ligne V1

## Objectif

Preparer et accompagner la mise en ligne complete d'Indira Home V1, sans exposer de secrets et sans toucher a la base par erreur.

## Perimetre valide

- Generer localement les valeurs admin production sans les committer.
- Documenter ou mettre `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` et `ADMIN_SESSION_SECRET`.
- Verifier la configuration Vercel attendue.
- Verifier la base Supabase choisie.
- Encadrer migration et seed avec validation separee.
- Preparer le smoke test production apres deploiement.
- Documenter le resultat final.

## Hors perimetre

- Aucun changement design.
- Aucune modification produit.
- Aucune migration sans validation explicite.
- Aucun seed sans validation explicite.
- Aucun secret committe.

## Garde-fous

- Les vraies valeurs admin production ne doivent pas etre ecrites dans Git.
- Les migrations et seed production sont des actions sensibles separees.
- La mise en ligne doit garder les exclusions V1 : pas de paiement en ligne, pas de comptes clientes, pas de livraison hors Republique tchetchene.

## Validation prevue

- `npm run check:docs`
- `npm run lint`
- `npm test`
- `npm run build`
- Smoke test production quand l'URL sera disponible.

## Resultat provisoire

- `npm run admin:generate-secrets` genere localement `ADMIN_PASSWORD_HASH` et `ADMIN_SESSION_SECRET` sans ecrire de fichier.
- `production-plan.md` documente l'usage du generateur de secrets, les variables Vercel et les validations de migration/seed.
- `npm run qa:browser` expose le smoke test navigateur existant.
- Le smoke test navigateur peut utiliser `QA_BASE_URL` pour viser une URL de production.
- Aucune migration, aucun seed et aucune vraie valeur de secret n'ont ete lances ou committes.

## Validations effectuees

- `npm run admin:generate-secrets -- --help` : OK.
- Generation test avec mot de passe factice via `ADMIN_PASSWORD` : OK, aucun fichier ecrit.
- `npm run check:docs` : OK.
- Recherche ciblee de secrets reels dans les fichiers versionnes : OK, aucun match.
- `npm run lint` : OK.
- `npm test` : OK, 37 tests passes, 1 integration DB ignoree sans `RUN_DB_INTEGRATION=1`.
- `npm run build` : OK.

## Reste a faire hors commit

- Generer les vraies valeurs admin production au moment de la mise en ligne.
- Configurer les variables Production dans Vercel.
- Confirmer la base Supabase production avant toute migration.
- Lancer migration et seed seulement apres validation explicite separee.
- Executer le smoke test production quand l'URL sera disponible.
