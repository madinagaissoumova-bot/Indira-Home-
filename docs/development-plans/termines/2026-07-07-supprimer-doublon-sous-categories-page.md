# Supprimer doublon sous-categories page categorie

## Objectif

Supprimer la section sous-categories ajoutee sur les pages categorie afin d'eviter les informations en double sur le site client.

## Perimetre

- Retirer le bloc public de sous-categories sur la page categorie.
- Retirer l'indication du nombre de sous-categories dans le hero de categorie.
- Supprimer les styles publics devenus inutiles.
- Conserver le menu categories compact et progressif dans le header.
- Mettre a jour le changelog.

## Hors perimetre

- Ne pas modifier les produits, le panier, le checkout ou l'admin.
- Ne pas modifier les donnees Supabase.
- Ne pas inclure la migration RLS non suivie.

## Verification

- `npm run check:docs`
- `npm test`
- `npm run build`
- Verification locale de `/category/posuda`.

## Resultat

- Bloc sous-categories supprime des pages categorie.
- Mention du nombre de sous-categories retiree du hero de categorie.
- Styles publics du bloc sous-categories supprimes.
- Menu categories compact conserve comme point d'acces aux sous-categories.

## Validations effectuees

- `npm run check:docs`
- `npm test`
- `npm run build`
- `curl -I http://localhost:3000`
- `curl -I http://localhost:3000/category/posuda`
- `curl -s http://localhost:3000/category/posuda | rg "Подкатегории|Выберите раздел|subcategory-panel|subcategory-card"`
