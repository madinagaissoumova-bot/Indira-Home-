---
name: development-plan-workflow
description: Suivre un processus strict de plan de developpement pour un travail delimite. Utiliser quand l'utilisateur demande de creer, valider, executer, deplacer, commit, push, ouvrir ou merger un plan de developpement ; quand les instructions projet exigent une branche par plan ; ou quand une tache demande validation du plan avant implementation.
---

# Processus De Plan De Developpement

Utiliser ce skill quand le travail doit etre controle par un plan valide, une branche, un commit et une Pull Request.

## Processus

1. Verifier la branche courante et le working tree.
2. Passer sur `main` et verifier l'etat local de `main` par rapport a `origin/main` quand c'est possible.
3. Discuter le besoin et ecrire le contenu du plan dans la conversation.
4. Attendre la validation explicite de l'utilisateur avant implementation.
5. Creer une nouvelle branche depuis `main` ; ne pas reutiliser d'anciennes branches pour de nouveaux plans.
6. Enregistrer le plan valide dans le dossier des plans actifs du projet.
7. Implementer uniquement le perimetre approuve.
8. Lancer les verifications pertinentes et mettre a jour les documents de suivi si le projet l'exige.
9. Deplacer le plan dans le dossier des plans termines quand le travail est fait.
10. Commit, push la branche et ouvrir une Pull Request.
11. Attendre la validation explicite de l'utilisateur avant merge.
12. Apres merge, revenir sur `main` et synchroniser.

## Contenu Du Plan

Inclure uniquement ce qui aide l'execution :

- objectif ;
- perimetre ;
- hors perimetre ;
- fichiers ou zones probables ;
- verification attendue ;
- risques ou contraintes.

## Discipline

- Traiter une petite correction comme un nouveau sujet si elle n'etait pas incluse dans le plan actif.
- Garder un plan egal a une branche et une Pull Request sauf demande explicite contraire de l'utilisateur.
- Ne pas elargir le perimetre silencieusement pendant l'implementation.
- Si les instructions du projet definissent des dossiers ou statuts, suivre ces instructions avant les valeurs generiques.

## Verification

- Comparer le diff final au perimetre approuve.
- Lancer les verifications documentaires pour un travail uniquement documentaire.
- Lancer lint, build ou tests selon les fichiers modifies et les instructions du projet.
- Dire clairement si une verification attendue n'a pas pu etre lancee.
