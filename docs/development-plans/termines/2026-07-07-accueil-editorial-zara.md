# Accueil editorial style Zara

## Objectif

Transformer la page d'accueil en entree visuelle premium tres simple : une grande photo, la marque, un seul bouton, sans grille de produits sous le hero.

## Perimetre

- Retirer la section catalogue et la grille produits de `/`.
- Supprimer le doublon de boutons dans le hero.
- Garder un seul bouton vers une entree catalogue pertinente.
- Ajuster le CSS de l'accueil pour une composition editoriale mobile-first.
- Mettre a jour la spec catalogue pour aligner le comportement attendu.
- Mettre a jour le changelog.
- Ajouter un garde-fou documentaire contre les dossiers/fichiers inattendus dans les zones sensibles de `docs/`.

## Hors perimetre

- Ne pas modifier les pages categorie, sous-categorie, recherche, produit, panier, checkout ou admin.
- Ne pas supprimer de produits ni de donnees.
- Ne pas refaire tout le design du site dans cette PR.

## Verification

- `npm run check:docs`
- `npm test`
- `npm run build`
- Verification locale de `/` en desktop et mobile si possible.

## Note

La verification locale en navigateur depend de la disponibilite de la base Supabase configuree dans `.env`.

## Resultat

- Accueil simplifie autour d'une image principale.
- Grille produits retiree de `/`.
- Un seul bouton conserve dans le hero.
- Specs et changelog alignes.
- Garde-fou documentaire ajoute contre les dossiers/fichiers inattendus.
