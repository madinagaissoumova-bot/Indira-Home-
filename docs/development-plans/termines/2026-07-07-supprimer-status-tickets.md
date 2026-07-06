# Supprimer status.md et tickets.md

## Objectif

Supprimer les fichiers racine `docs/development-plans/status.md` et `docs/development-plans/tickets.md`, maintenant que le suivi utile est couvert par les plans termines, les specs et le changelog par zones.

## Perimetre

- Supprimer `docs/development-plans/status.md`.
- Supprimer `docs/development-plans/tickets.md`.
- Mettre a jour le test de structure documentaire.
- Ajouter un garde-fou contre le retour des anciens fichiers documentaires supprimes.
- Nettoyer les references actives des skills projet vers ces anciens fichiers ou vers des fichiers deja supprimes.

## Hors perimetre

- Ne pas modifier le comportement applicatif.
- Ne pas recreer de backlog global.
- Ne pas supprimer les plans termines historiques.

## Verification

- `npm run check:docs`
- `npm test`

## Resultat

- `docs/development-plans/status.md` supprime.
- `docs/development-plans/tickets.md` supprime.
- References actives des skills projet mises a jour.
- Test de structure documentaire adapte.
- Liste noire des anciens fichiers documentaires ajoutee au test.
