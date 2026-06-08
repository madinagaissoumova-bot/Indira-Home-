# Plan - ADMIN-405 limitation des tentatives admin

## Objectif

Limiter ou ralentir les tentatives repetees de connexion admin cote serveur afin de fermer l'ecart securite `ADMIN-405` avant de redeclarer le lot 4 termine.

## Perimetre

- Ajouter une protection serveur sur l'action de connexion admin.
- Garder un message d'echec generique qui ne distingue pas identifiant inconnu et mot de passe incorrect.
- Ajouter ou adapter les tests utiles.
- Mettre a jour `docs/development-plans/tickets.md` et `docs/development-plans/status.md`.

## Hors perimetre

- Ajouter des comptes clientes.
- Ajouter une table multi-admin.
- Ajouter un service externe de rate limiting.
- Modifier le parcours client.

## Fichiers ou zones probables

- Authentification admin et actions serveur.
- Tests auth/admin existants ou nouveaux tests unitaires.
- `docs/development-plans/tickets.md`.
- `docs/development-plans/status.md`.

## Validation attendue

- Plusieurs tentatives echouees dans un intervalle court sont limitees ou ralenties.
- Une connexion reussie reste possible avec les bons identifiants hors blocage.
- Le message d'erreur reste generique.
- `npm run lint` passe.
- `npm run build` passe.

## Validation effectuee

- Ajout d'une limite temporaire apres 5 echecs sur un meme identifiant admin.
- Blocage temporaire de 10 minutes dans une fenetre de 15 minutes.
- Message d'echec conserve generique.
- Remise a zero des echecs apres connexion reussie.
- `node --test --require ./tests/register.cjs tests/admin-login-rate-limit.test.ts` passe.
- `npm test` passe.
- `npm run lint` passe.
- `npm run check:docs` passe.
- `npm run build` passe.

## Risques a surveiller

- Ne pas bloquer durablement l'admin apres une erreur isolee.
- Ne pas stocker de mot de passe en clair, ni journaliser les secrets.
- Ne pas introduire d'etat partage incompatible avec le runtime serveur V1.
