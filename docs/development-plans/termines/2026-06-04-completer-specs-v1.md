# Plan - Completer Les Specs V1

## Objectif

Completer les specs V1 apres audit afin de supprimer les ambiguities metier, couvrir la page confidentialite et renforcer la tracabilite des exigences critiques.

## Perimetre

- documentation uniquement ;
- formalisation du workflow Development Plan, branche, commit, push, Pull Request et merge ;
- feature spec confidentialite ;
- commande cliente, identite cliente, idempotence et numero de commande ;
- coherence categorie / sous-categorie ;
- transitions de statut commande ;
- images, accueil catalogue et suppression de categories ;
- securite admin et plan de test ;
- suivi des ecarts d'implementation dans les tickets.

## Validation Du Plan

- [x] Le besoin et le contenu du plan ont ete discutes dans la conversation.
- [x] Le perimetre du plan a ete valide explicitement par l'utilisatrice.
- [x] Une nouvelle branche portant un nom correspondant au plan a ete creee depuis `develop`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/` sur la branche dediee.

## Etapes

- [x] 1. Lire le contexte utile et comparer les specs au code actuel.
- [x] 2. Faire les modifications documentaires.
- [x] 3. Verifier la coherence des documents.
- [x] 4. Deplacer ce plan dans `docs/development-plans/termines/`.
- [x] 5. Creer un commit clair.
- [x] 6. Pousser la branche sur GitHub.
- [x] 7. Ouvrir une Pull Request vers `develop`.
- [x] 8. Attendre la validation explicite de l'utilisatrice.
- [ ] 9. Merger la Pull Request.

## Verification

- [x] `npm run check:docs`

## Notes

- Le checkout V1 collecte prenom et nom separement, puis les stocke concatenes dans `Order.customerName`.
- Les nouvelles exigences non encore garanties par le code doivent apparaitre comme tickets a traiter.
- Le commit et le push excluent les modifications applicatives et les plans admin non suivis deja presents dans le worktree.
- La Pull Request `#1` a ete creee via l'API GitHub car `gh` et Homebrew ne sont pas disponibles dans l'environnement.
