# Ameliorer les categories clientes

## Objectif

Rendre la navigation categories plus lisible, plus premium et plus confortable sur mobile.

## Perimetre

- Ameliorer le menu categories du header.
- Ameliorer la page categorie publique.
- Presenter les sous-categories de facon plus claire.
- Conserver les regles V1 : textes client en russe, categories masquees invisibles, aucun stock exact cote cliente.
- Mettre a jour le changelog.

## Hors perimetre

- Ne pas modifier les produits, le panier, le checkout ou l'admin.
- Ne pas modifier la migration RLS non suivie.
- Ne pas changer les donnees Supabase.

## Verification

- `npm run check:docs`
- `npm test`
- `npm run build`
- Verification locale des pages categorie si la base Supabase repond.

## Resultat

- Menu categories public restructure pour rendre les categories et sous-categories plus faciles a scanner.
- Page categorie enrichie avec des indicateurs de collection et des cartes de sous-categories.
- Responsive mobile ajuste pour une navigation tactile horizontale sur les sous-categories.
- Changelog mis a jour dans les zones categories/sous-categories et UX mobile/interface.

## Validations effectuees

- `npm run check:docs`
- `npm test`
- `npm run build`
- `curl -I http://localhost:3000`
- `curl -I http://localhost:3000/category/posuda`
