# Supprimer les compteurs categories

## Objectif

Supprimer les chiffres affiches a cote des categories dans le menu client, car ils n'apportent pas d'information utile aux clientes.

## Perimetre

- Retirer le compteur de sous-categories dans le menu categories.
- Supprimer le CSS associe.
- Conserver le menu compact et progressif.
- Mettre a jour le changelog.

## Hors perimetre

- Ne pas modifier les produits, le panier, le checkout ou l'admin.
- Ne pas modifier la page categorie.
- Ne pas inclure la migration RLS non suivie.

## Verification

- `npm run check:docs`
- `npm test`
- `npm run build`
- Verification locale du menu categories.

## Resultat

- Compteurs de sous-categories supprimes du menu categories public.
- CSS associe aux compteurs supprime.
- Menu compact et progressif conserve.

## Validations effectuees

- `npm run check:docs`
- `npm test`
- `npm run build`
- `curl -I http://localhost:3000`
- `curl -I http://localhost:3000/category/posuda`
