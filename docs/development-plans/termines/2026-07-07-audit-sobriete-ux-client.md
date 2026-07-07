# Audit sobriete UX client

## Objectif

Supprimer les informations inutiles ou repetees sur le site client tout en gardant une interface esthetique, travaillee et premium dans l'esprit Zara Home.

## Perimetre

- Auditer les pages clientes publiques.
- Supprimer les doublons d'information et les textes qui n'aident pas la cliente.
- Conserver uniquement les informations utiles pour comprendre, choisir, acheter ou corriger une erreur.
- Affiner les sections restantes pour eviter un rendu en blocs simples ou pauvres.
- Mettre a jour le changelog.

## Hors perimetre

- Ne pas changer les regles metier.
- Ne pas modifier l'admin.
- Ne pas modifier les donnees Supabase.
- Ne pas inclure la migration RLS non suivie.

## Verification

- `npm run check:docs`
- `npm test`
- `npm run build`
- Verification locale des pages clientes principales.

## Resultat

- Suppression des compteurs et barres d'information repetes sur les pages categorie et sous-categorie.
- Cartes produit allegees selon le contexte pour eviter de repeter la categorie deja visible.
- Retrait des notes de service repetees sur la fiche produit, le checkout et la confirmation.
- Textes russes inutilises retires de la source de traduction.
- Espacement editorial conserve sur les pages de collection pour garder un rendu premium et travaille.

## Validations effectuees

- `npm run check:docs`
- `npm test`
- `npm run build`
- `curl -I http://localhost:3000`
- `curl -I http://localhost:3000/category/posuda`
