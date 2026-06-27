---
name: indira-design-system
description: Utiliser pour concevoir ou améliorer l'interface Indira Home, le style visuel, le responsive mobile, le CSS, les layouts, les composants, les pages clientes, les écrans admin, les cartes produit, les formulaires, le checkout ou le polish visuel.
---

# Indira Design System

Utiliser ce skill pour le travail visuel et UX sur Indira Home.

## Lire D'abord

Lire seulement les fichiers pertinents :

- `docs/specs/visual-rules.md`
- `docs/specs/content/ru-copy.md`
- `docs/specs/feature-specs/catalogue-produits.md`
- `docs/specs/feature-specs/fiche-produit.md`
- `docs/specs/feature-specs/panier.md`
- `docs/specs/feature-specs/validation-commande.md`
- `docs/specs/feature-specs/confirmation-commande.md`
- la fiche admin pertinente si le travail concerne l'interface admin

## Direction Visuelle

Indira Home doit donner une impression :

- chaleureuse ;
- propre ;
- raffinee ;
- mobile-first;
- centree sur les produits ;
- plus premium qu'une boutique maison ordinaire.

Les photos produit sont l'element visuel principal. Ne pas transformer le catalogue en landing page marketing.

## Palette

Palette recommandee :

| Usage | Direction |
| --- | --- |
| Fond principal | Rose tres pale, ivoire rose ou blanc chaud |
| Texte principal | Taupe fonce, brun tres sombre ou gris profond |
| Accent principal | Rose poudre leger pour les actions importantes |
| Accent secondaire | Rose tres doux, champagne ou beige rose pour filtres et badges |
| Erreur / indisponible | Rouge sourd ou brique douce |
| Succes | Ton doux et discret, sans vert agressif |
| Bordures | Rose gris ou neutres tres fins |
| Survol / actif | Rose plus dense ou rose grise selon le composant |

Eviter :

- rose vif, fuchsia, sature ou enfantin ;
- palettes tres sombres ;
- contrastes agressifs hors messages d'erreur ;
- degrades agressifs ;
- palettes dominees par une seule couleur ;
- blobs/orbes decoratifs ;
- effets qui detournent l'attention des produits.

## Typographie

- Utiliser des polices lisibles avec support cyrillique.
- Garder une hierarchie claire et pratique.
- Les noms produits doivent rester lisibles meme quand ils sont longs.
- Les prix doivent etre faciles a reperer.
- Ne pas utiliser de tres grands textes dans les cartes, sidebars, formulaires ou panneaux compacts.
- Ne pas dimensionner les polices avec la largeur du viewport.
- Le letter spacing doit rester a `0`.

## Regles Interface Cliente

- Les textes visibles par les clientes doivent etre en russe.
- Ne jamais afficher la quantite exacte en stock cote cliente.
- Les produits epuises restent visibles mais non commandables.
- Les actions principales doivent etre faciles a toucher au pouce sur mobile.
- Garder les textes courts ; eviter les longues explications dans l'interface.
- Utiliser des etats vides et erreurs de champs clairs.
- Ne pas afficher les liens admin de facon trop visible dans le parcours cliente.

## Regles De Layout

- Mobile-first.
- Le catalogue est le premier ecran utile.
- Les cartes produit doivent avoir des dimensions stables.
- Utiliser des sections pleine largeur ou des layouts non encadres ; eviter les cartes imbriquees.
- Les cartes servent aux produits, items admin repetes, modales ou outils encadres.
- Garder le rayon des cartes a 8px ou moins, sauf si le CSS existant impose autre chose.
- Verifier que le texte ne deborde jamais des boutons, cartes ou champs.

## Cartes Produit

Chaque carte produit doit afficher :

- image ;
- nom produit ;
- prix en roubles ;
- categorie/sous-categorie si utile ;
- badge `Новинка` si nouveau ;
- `Нет в наличии` ou equivalent si stock 0 ;
- action d'ajout au panier seulement si commandable.

Ne pas afficher :

- stock exact ;
- longues descriptions produit ;
- statuts techniques ou valeurs d'enums.

## Formulaires

Formulaires clientes :

- empiles sur mobile ;
- labels clairs ;
- erreurs proches des champs ;
- options de paiement presentees clairement ;
- rappel au checkout que la boutique confirme par telephone ou WhatsApp.

Formulaires admin :

- plus denses que l'interface cliente ;
- separes en sections logiques ;
- actions destructives visuellement distinctes et confirmees.

## Responsive QA

Verifier au minimum :

- 360px;
- 390px;
- 768px;
- 1280px.

Verifier :

- aucun debordement de texte ;
- cartes produit stables ;
- filtres utilisables ;
- lignes panier lisibles ;
- champs checkout faciles a remplir ;
- tableaux admin faciles a scanner.

## Avant De Finir

- Scanner `app/globals.css` pour detecter une derive de palette.
- Verifier que les textes clientes sont en russe.
- Verifier que les pages clientes n'exposent pas le stock exact.
- Verifier le layout mobile de la page modifiee.
- Lancer `npm run build` pour les changements UI significatifs quand c'est faisable.
