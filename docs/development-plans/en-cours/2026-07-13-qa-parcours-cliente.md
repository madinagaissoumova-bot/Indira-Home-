# Plan - QA Parcours Cliente

## Objectif

Verifier et corriger le parcours cliente principal de la V1 afin qu'une cliente puisse trouver un produit, le mettre au panier et envoyer une commande sans blocage ni confusion.

## Validation Du Plan

- [x] Le plan a ete propose apres le merge du Plan 1.
- [x] Le perimetre a ete valide par l'utilisatrice.
- [x] Une branche dediee a ete creee depuis `main`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/`.

## Perimetre

- Tester le parcours `accueil -> categorie -> fiche produit -> panier -> checkout -> confirmation`.
- Tester recherche, etat vide et filtres/tris client.
- Tester favoris et panier en `localStorage`.
- Tester produit epuise visible mais non commandable.
- Tester validation checkout, erreurs en russe et confirmation sans donnees personnelles.
- Corriger les bugs ou incoherences trouves dans ce parcours.

## Hors Perimetre

- Ne pas modifier l'admin sauf si un bug client bloque la commande.
- Ne pas preparer la production ou Supabase production.
- Ne pas refaire le design global.
- Ne pas ajouter de nouvelle fonctionnalite hors V1.
- Ne pas merger sans validation explicite de l'utilisatrice.

## Etapes

- [x] 1. Verifier `main`, les plans actifs et les specs pertinentes.
- [x] 2. Auditer les routes publiques du parcours cliente.
- [x] 3. Tester localStorage panier et favoris.
- [x] 4. Tester checkout et confirmation.
- [x] 5. Corriger les problemes trouves dans le perimetre.
- [x] 6. Lancer les checks adaptes.
- [ ] 7. Commit, push et Pull Request apres validation du resultat.

## Verification

- `npm run lint`
- `npm run check:docs`
- `npm test`
- `npm run build`
- Verification Playwright mobile et desktop des routes cliente critiques.
- Verification manuelle ou automatisee du panier, des favoris et du checkout.

## Risques Et Contraintes

- Le panier et les favoris utilisent `localStorage`; les tests doivent verifier l'etat navigateur.
- La creation de commande peut toucher la base locale; eviter de polluer les donnees si ce n'est pas necessaire.
- Le checkout doit rester sans paiement en ligne et sans compte cliente.
