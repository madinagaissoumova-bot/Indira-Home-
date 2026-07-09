# Plan - Correction Workflow AGENTS.md

## Objectif

Reecrire `AGENTS.md` pour rendre obligatoire le workflow une demande = un plan = une branche = une Pull Request, tout en gardant les specifications comme source fonctionnelle et les skills comme source methodologique.

## Perimetre

- Remplacer le contenu de `AGENTS.md` par une version plus stricte centree sur les sources de verite, la gestion des specifications, le workflow de developpement, le respect du perimetre, la communication et la prise de decision.
- Corriger la sequence de fin de workflow pour que le resultat soit presente avant merge, que le merge attende une validation explicite, puis que le plan soit deplace dans `docs/development-plans/termines/` apres le merge.
- Ne toucher qu'a la documentation de workflow necessaire a cette correction.

## Hors Perimetre

- Ne pas modifier les specs produit.
- Ne pas modifier les skills.
- Ne pas modifier le code applicatif.
- Ne pas modifier les routes, regles metier, textes client, statuts ou criteres fonctionnels.
- Ne pas melanger cette correction avec le redesign client en cours sur une autre branche.

## Fichiers Concernes

- `AGENTS.md`
- `docs/development-plans/en-cours/2026-07-09-agents-md-workflow-correction.md`

## Verification Attendue

- Relire le diff final pour confirmer que seules les instructions de workflow sont modifiees.
- Verifier que le plan et la branche dedies existent.
- Lancer `npm run check:docs` si disponible.

## Risques Et Contraintes

- Le repo principal contient des changements en cours sur une autre branche ; cette correction doit rester isolee sur sa propre branche.
- `AGENTS.md` ne doit pas redevenir une copie des specs produit ni du contenu detaille des skills.
- Le workflow doit rester conforme a la decision utilisateur : le resultat doit etre visible avant merge, le merge doit etre valide explicitement, puis le plan doit etre deplace vers `termines/` apres le merge.
