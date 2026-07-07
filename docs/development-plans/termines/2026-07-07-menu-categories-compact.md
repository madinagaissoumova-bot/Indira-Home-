# Menu categories compact

## Objectif

Rendre le menu categories client plus compact, en liste verticale, sans gros blocs visuels.

## Perimetre

- Remplacer l'apparence en cartes du menu categories par une liste fine.
- Garder les categories les unes sous les autres.
- Garder les sous-categories repliees et visibles seulement apres ouverture.
- Adapter le rendu mobile sans grands blocs.
- Mettre a jour le changelog.

## Hors perimetre

- Ne pas modifier les produits, le panier, le checkout ou l'admin.
- Ne pas modifier la page categorie.
- Ne pas modifier les donnees Supabase.
- Ne pas inclure la migration RLS non suivie.

## Verification

- `npm run check:docs`
- `npm test`
- `npm run build`
- Verification locale du menu categories.

## Resultat

- Menu categories converti en liste verticale compacte.
- Suppression de l'effet cartes/gros blocs dans le panneau categories.
- Largeur du panneau reduite et alignement ouvert cote gauche.
- Sous-categories conservees en navigation progressive sous la categorie ouverte.

## Validations effectuees

- `npm run check:docs`
- `npm test`
- `npm run build`
- `curl -I http://localhost:3000`
- `curl -I http://localhost:3000/category/posuda`
