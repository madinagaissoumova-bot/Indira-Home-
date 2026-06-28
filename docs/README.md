# Docs

Ce dossier sert de memoire de travail pour Indira Home. Il doit permettre de
comprendre rapidement ce qui est prevu, ce qui est en cours, ce qui est deja
fait, et comment exploiter la V1 en conditions reelles.

## Carte des sections

| Section | Role simple | Quand l'utiliser |
| --- | --- | --- |
| `specs/` | Decrit ce que la V1 doit faire. C'est la source de verite produit, UX, metier et technique. | Avant de changer une route, une regle metier, un parcours client ou une action admin. |
| `specs/feature-specs/` | Detaille chaque grande fonctionnalite. | Pour verifier les criteres d'acceptation d'une page ou d'un flux precis. |
| `specs/technical/` | Explique les choix et contraintes techniques. | Pour comprendre les routes, les actions serveur, le modele de donnees, l'auth admin ou les images. |
| `specs/content/` | Centralise les textes importants, notamment les textes russes visibles cote cliente. | Avant d'ajouter ou modifier du copywriting client. |
| `development-plans/` | Regroupe les plans de travail et le suivi projet. | Pour voir ce qui est actif, termine, bloque, restant, ou pour suivre les tickets. |
| `changelog/` | Retrace les changements deja livres. | Pour consulter l'historique des fonctionnalites et stabilisations de la V1. |
| `testing/` | Regroupe la validation manuelle et technique de la V1. | Avant de declarer un lot termine ou de livrer la V1. |

## Regles de rangement

- Ne pas ajouter de nouveau dossier a la racine de `docs/` sans decision explicite.
- La racine de `docs/` doit rester limitee a `specs/`, `development-plans/`, `changelog/` et `testing/`.
- Mettre les besoins produit, les regles metier et les criteres d'acceptation dans `specs/`.
- Mettre l'avancement, les tickets et le statut courant dans `development-plans/status.md` et `development-plans/tickets.md`.
- Mettre les instructions d'exploitation reelle dans `specs/technical/`.
- Mettre les plans de travail actifs dans `development-plans/en-cours/`.
- Deplacer les plans verifies dans `development-plans/termines/`.
- Garder `development-plans/` sans plans directement a sa racine.

## Sources canoniques

- `specs/global-spec.md` : cadre general V1.
- `specs/functional-map.md` : carte fonctionnelle.
- `specs/work-plan.md` : decoupage initial du travail.
- `development-plans/status.md` : statut courant des lots.
- `development-plans/tickets.md` : backlog et tickets.
- `specs/technical/supabase.md` : notes d'exploitation Supabase.
- `specs/technical/production-plan.md` : preparation de mise en production.
- `specs/technical/security-checklist.md` : checklist securite V1.
- `testing/test-plan.md` : checklist de validation V1.

## A ne pas mettre ici

- code applicatif React, Next.js ou TypeScript ;
- fichiers de configuration runtime ;
- secrets, variables d'environnement ou donnees personnelles ;
- documents sans role clair. Si une section ne sert plus, la supprimer, la fusionner
  avec une section proche ou la laisser hors de `docs/` jusqu'a ce que son role soit clair.
