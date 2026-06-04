# Technical Spec - Modele De Donnees

## Product

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| slug | Texte | Utilise pour les routes publiques |
| name | Texte | Visible en russe cote client |
| description | Texte | Obligatoire pour publication |
| priceRub | Nombre entier | Prix en roubles, strictement superieur a 0 |
| categoryId | Identifiant | Obligatoire pour publication |
| subcategoryId | Identifiant | Obligatoire pour publication |
| images | Relation `ProductImage[]` | Au moins une image pour publication |
| stockQuantity | Nombre entier | Toujours egal ou superieur a 0 |
| status | Enum | DRAFT, PUBLISHED, HIDDEN |
| isNew | Booleen | Optionnel |
| brand | Texte | Optionnel |
| characteristics | Texte JSON | Optionnel, liste cle/valeur serialisee en V1 |
| displayOrder | Nombre | Optionnel |
| createdAt | Date | Automatique |
| updatedAt | Date | Automatique |

La sous-categorie choisie pour un produit doit toujours appartenir a la categorie choisie. Cette coherence doit etre validee cote serveur lors de la creation, de la modification et de la publication d'un produit.

## ProductImage

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| productId | Identifiant | Produit parent |
| url | Texte | URL `http` ou `https`, ou chemin local `/uploads/...` |
| alt | Texte | Texte alternatif court |
| displayOrder | Nombre | Ordre d'affichage dans la galerie |

Pour la V1, les images produit sont stockees comme URLs dans une table dediee `ProductImage`. La premiere image par `displayOrder` sert d'image principale si aucun champ principal explicite n'existe.

Pour la V1, `characteristics` est stocke comme texte JSON simple afin de rester facile a gerer avec Prisma. Le JSON attendu represente une liste simple de paires cle/valeur, par exemple `[{ "label": "...", "value": "..." }]`. Si les caracteristiques deviennent centrales plus tard, elles pourront etre migrees vers une table dediee ou un champ JSON PostgreSQL.

## Category

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| slug | Texte | Utilise pour les routes publiques |
| name | Texte | Nom visible en russe |
| status | Enum | VISIBLE, HIDDEN |
| displayOrder | Nombre | Ordre client/admin |
| createdAt | Date | Automatique |
| updatedAt | Date | Automatique |

## Subcategory

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| categoryId | Identifiant | Categorie parente |
| slug | Texte | Utilise pour les routes publiques |
| name | Texte | Nom visible en russe |
| status | Enum | VISIBLE, HIDDEN |
| displayOrder | Nombre | Ordre dans la categorie |
| createdAt | Date | Automatique |
| updatedAt | Date | Automatique |

## CartItem

Le panier peut etre stocke cote client tant que la commande n'est pas validee.

| Champ | Type attendu | Notes |
| --- | --- | --- |
| productId | Identifiant | Produit ajoute |
| quantity | Nombre entier | Minimum 1 |

Les prix et stocks doivent etre reverifies cote serveur au moment de l'affichage critique et de la validation.

Pour la V1, le panier est stocke dans `localStorage` cote navigateur sous forme minimale : identifiant produit et quantite. Aucune information de prix, de stock ou de disponibilite stockee dans le navigateur ne doit etre consideree comme fiable. Le serveur recalcule toujours les prix, les etats et le total avant affichage critique et avant validation.

## Order

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| orderNumber | Texte unique | Reference lisible et stable de la commande |
| customerName | Texte | Prenom et nom concatenes apres validation |
| customerPhone | Texte | Telephone ou WhatsApp |
| deliveryAddressOrZone | Texte | Republique tchetchene uniquement en V1 |
| paymentMethod | Enum | CASH_ON_DELIVERY, TRANSFER_AFTER_CONFIRMATION |
| status | Enum | NEW, TO_CONFIRM, CONFIRMED, PREPARING, DELIVERED, CANCELLED |
| totalRub | Nombre entier | Total fige a la validation |
| adminNote | Texte | Optionnel |
| createdAt | Date | Date de validation |
| updatedAt | Date | Automatique |

Le checkout collecte le prenom et le nom dans deux champs distincts pour faciliter la validation et l'ergonomie. La V1 les stocke ensuite dans `customerName` sous la forme `Prenom Nom`.

`orderNumber` doit etre unique en base, genere cote serveur, stable apres creation et ne doit pas contenir de donnee personnelle. Le format V1 est `IH-YYYYMMDD-NNNNNN`, avec une partie aleatoire a six chiffres et une nouvelle tentative en cas de collision.

## OrderItem

| Champ | Type attendu | Notes |
| --- | --- | --- |
| id | Identifiant unique | Interne |
| orderId | Identifiant | Commande parente |
| productId | Identifiant | Reference si le produit existe encore |
| productNameSnapshot | Texte | Nom fige au moment de la commande |
| productImageSnapshot | Image | Image principale au moment de la commande si possible |
| unitPriceRub | Nombre entier | Prix fige au moment de la validation |
| quantity | Nombre entier | Quantite commandee |
| subtotalRub | Nombre entier | Prix unitaire x quantite |
