# Docs

Ce dossier regroupe les documents du projet Indira Home.

## Organisation

- `specs/` : source de verite produit, UX, technique et regles metier.
- `development-plans/` : plans de developpement, avec `en-cours/` pour les travaux actifs et `termines/` pour l'historique verifie.
- `project-management/` : tickets, statut projet et plan de production.
- `security/` : checklist securite V1.
- `operations/` : procedures d'exploitation, hebergement, base de donnees et production.
- `roadmap/` : vision et priorites de livraison.
- `testing/test-plan.md` : checklist de verification V1.
- `agents/` : instructions locales pour les assistants de developpement.

## Sources canoniques

- Les plans actifs doivent etre crees dans `development-plans/en-cours/`.
- Les plans termines doivent etre deplaces dans `development-plans/termines/`.
- `development-plans/` ne doit pas contenir de plans de lot directement a sa racine.
- `project-management/status.md`, `project-management/tickets.md` et `project-management/production-plan.md` sont les seules sources de suivi projet.
- `security/security-checklist.md` est la seule checklist securite V1.

## A ne pas mettre ici

- code applicatif React, Next.js ou TypeScript ;
- fichiers de configuration runtime ;
- secrets, variables d'environnement ou donnees personnelles.
