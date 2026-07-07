# Navigation categories progressive

## Objectif

Corriger le menu categories client pour afficher d'abord les categories principales, puis les sous-categories seulement apres ouverture de la categorie choisie.

## Perimetre

- Modifier le menu categories du header.
- Afficher les categories principales sans leurs sous-categories au premier niveau.
- Afficher les sous-categories uniquement dans la categorie ouverte.
- Conserver un lien vers la page categorie complete.
- Garder les textes visibles cote cliente en russe.
- Mettre a jour le changelog.

## Hors perimetre

- Ne pas modifier les produits, le panier, le checkout ou l'admin.
- Ne pas modifier les donnees Supabase.
- Ne pas inclure la migration RLS non suivie.

## Verification

- `npm run check:docs`
- `npm test`
- `npm run build`
- Verification locale du menu categories.

## Resultat

- Menu categories client corrige en navigation progressive.
- Premier niveau limite aux categories principales.
- Sous-categories affichees uniquement apres ouverture de la categorie concernee.
- Lien vers toute la categorie conserve dans le panneau ouvert.

## Validations effectuees

- `npm run check:docs`
- `npm test`
- `npm run build`
- `curl -I http://localhost:3000`
- `curl -I http://localhost:3000/category/posuda`
