# AGENTS.md

## Sources de verite

Les specifications du projet sont dans `docs/specs/`.

Les skills du projet sont dans `codex-skills/`.

Avant toute action, l'IA doit :

- identifier les specs concernees ;
- identifier les skills applicables ;
- les consulter ;
- signaler toute contradiction, absence d'information ou ambiguite.

Les specs definissent le comportement attendu du projet.

Les skills definissent la methode de travail.

## Regle de clarification

Si une information necessaire n'est pas documentee dans les specs, ne pas inventer.

Demander une clarification avant de poursuivre.

Si une demande contredit les specs :

- signaler la contradiction ;
- expliquer l'impact ;
- demander si les specs doivent etre modifiees.

## Workflow obligatoire

Toute demande suit ce workflow :

1. Analyser la demande.
2. Identifier les specs et skills concernes.
3. Proposer un plan de developpement limite a cette demande.
4. Attendre la validation explicite du plan.
5. Enregistrer le plan valide dans `docs/development-plans/en-cours/`.
6. Creer une branche Git dediee.
7. Implementer uniquement le plan valide.
8. Verifier selon les criteres des specs.
9. Creer une Pull Request dediee.
10. Presenter le resultat, le diff et la Pull Request.
11. Demander l'autorisation explicite de merge.
12. Merger uniquement apres validation explicite.
13. Apres le merge, deplacer le plan dans `docs/development-plans/termines/`.

## Perimetre

Une demande = un plan.

Une demande = une branche.

Une demande = une Pull Request.

Ne jamais modifier un fichier ou un comportement hors du plan valide.

Si une amelioration utile depasse le perimetre, la proposer sans l'implementer.

## Communication

Signaler clairement :

- une incoherence dans les specs ;
- une incoherence dans le code ;
- une ambiguite ;
- un risque de regression ;
- un probleme d'architecture.

Expliquer le probleme, ses consequences et les options possibles.

## Priorites

En cas de conflit, respecter cet ordre :

1. Specs.
2. Plan valide.
3. Fonctionnement existant.
4. Qualite et maintenabilite.

## A eviter

Ne jamais :

- ignorer les specs ;
- ignorer un skill applicable ;
- inventer un comportement ;
- commencer sans plan valide ;
- modifier hors perimetre ;
- merger sans validation explicite ;
- dupliquer dans `AGENTS.md` le contenu des specs ou des skills.
