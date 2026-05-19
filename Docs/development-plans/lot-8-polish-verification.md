# Lot 8 - Polish mobile et verification V1

## Objectif

Transformer l'application fonctionnelle en V1 livrable.

## Dependances

- Lots 0 a 7 termines.
- `Docs/specs/visual-rules.md`
- `Docs/test-plan.md`
- `Docs/specs/user-stories.md`

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

- `lib/content/ru.ts`

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

Executer `Docs/test-plan.md`.

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
- `lib/content/ru.ts`
- `Docs/test-plan.md`

## Risques

- finir avec un parcours fonctionnel mais peu utilisable sur mobile ;
- laisser des textes client en francais ;
- oublier de verifier les donnees personnelles sur les pages publiques ;
- oublier la sauvegarde avant production.
