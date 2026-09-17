# Plan - Harmoniser les documents en francais

## Objectif

Harmoniser la langue des documents projet pour que la documentation humaine soit en francais de maniere coherente.

## Perimetre valide

- Traduire en francais les titres et consignes anglaises restantes dans `docs/specs/`.
- Traduire en francais les copies versionnees des skills dans `codex-skills/`.
- Traduire en francais les metadonnees utilisateur des agents de skills dans `codex-skills/**/agents/openai.yaml`.
- Garder les documents de changelog et plans coherents avec cette convention.
- Ajouter une note de convention si necessaire pour clarifier ce qui doit rester technique.

## Hors perimetre

- Aucun changement de code applicatif.
- Aucun changement de comportement produit.
- Aucun changement de design.
- Aucun changement de contenu visible cote cliente en russe.
- Aucune traduction des routes, commandes, variables d'environnement, enums, noms de fichiers, noms de scripts ou identifiants techniques.

## Fichiers ou zones probables

- `codex-skills/**/SKILL.md`
- `codex-skills/**/agents/openai.yaml`
- `docs/specs/*.md`
- `docs/specs/feature-specs/*.md`
- `docs/specs/technical/*.md`
- `docs/changelog/**/*.md`

## Validation prevue

- Rechercher les titres et consignes anglaises restantes dans `docs/`, `codex-skills/` et `AGENTS.md`.
- Verifier que les textes clientes restent en russe et que les identifiants techniques ne sont pas traduits.
- `npm run check:docs`

## Resultat provisoire

- Les titres principaux des specs ont ete harmonises en francais.
- Le journal des changements utilise des titres francais.
- Les skills versionnes dans `codex-skills/` ont ete traduits en francais.
- `AGENTS.md` garde son role de document de workflow, avec des libelles francais.
- Les noms de routes, fichiers, variables d'environnement, enums, commandes et noms de skills restent techniques et inchanges.

## Validation realisee

- Scan des expressions anglaises principales dans `AGENTS.md`, `codex-skills/`, `docs/specs/`, `docs/changelog/` et le plan actif.
- Les occurrences restantes correspondent aux routes, chemins de fichiers ou noms techniques a conserver.
- `npm run check:docs` : OK.

## Risques et contraintes

- Ne pas traduire les termes qui doivent rester exacts pour le code ou les outils.
- Ne pas deplacer la verite produit hors de `docs/specs/`.
- Garder `AGENTS.md` comme document de processus, sans y ajouter de specification produit detaillee.
