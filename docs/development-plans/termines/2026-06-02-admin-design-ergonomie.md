# 2026-06-02 - Admin design et ergonomie

## Objectif

Ameliorer l'ergonomie de l'espace admin sans changer les regles metier V1.

## Portee realisee

- Ajout d'un bouton afficher/masquer le mot de passe sur `/admin/login`.
- Navigation admin rendue plus lisible avec etat actif.
- Ajout du bouton global `Выйти` dans la barre admin.
- Amelioration de la lecture des listes commandes, produits, dashboard et stock.
- Renforcement de la hierarchie visuelle des badges, montants et metadonnees admin.

## Hors portee

- Paiement en ligne.
- Changement du modele de donnees.
- Refonte complete du parcours client.
- Modification des regles de stock ou de commande.

## Verification

- `npm run lint` : OK.
- `npm run build` : OK.
- Verification Playwright locale :
  - `/admin/login` mobile : OK, bouton mot de passe `password` vers `text`, aucun debordement.
  - `/admin`, `/admin/products`, `/admin/orders`, `/admin/stock` en 390px et 1280px : OK, aucun debordement horizontal.

