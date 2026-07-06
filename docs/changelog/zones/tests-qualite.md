# Changelog - Tests Et Qualite

## V1 - Verification qualite livree

- Tests unitaires sur validations, panier, catalogue public, stock et auth admin.
- Tests d'integration pour les flux critiques quand necessaire.
- Verification navigateur des parcours V1.

## 2026-06-28 - Controle documentaire sans README

- Ajout d'un controle documentaire qui refuse le retour de fichiers `README.md` suivis par Git.
- Verification que `docs/specs/content/ru-copy.md` n'est plus suivi.

## 2026-07-07 - Blocage des anciens fichiers documentaires

- Ajout d'un controle explicite contre le retour des anciens fichiers documentaires supprimes.
- Blocage de `docs/development-plans/status.md`, `docs/development-plans/tickets.md`, `docs/specs/glossary.md`, `docs/specs/content/ru-copy.md` et `docs/changelog/v1.md`.

## 2026-07-07 - Checklist de validation centralisee

- Deplacement de la checklist de verification V1 dans `docs/specs/validation-rules.md`.
- Mise a jour du controle documentaire pour retirer `docs/testing/` de la structure attendue.

## 2026-06-08 - Tests auth admin

- Tests couvrant blocage temporaire, expiration et remise a zero de la limitation de connexion admin.

## 2026-06-07 - Tests stock et checkout

- Test unitaire sur la restauration du stock apres annulation.
- Test d'integration sur le renvoi d'une meme tentative checkout.
