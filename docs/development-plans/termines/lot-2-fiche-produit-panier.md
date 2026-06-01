# Lot 2 - Fiche produit et panier

## Objectif

Permettre a la cliente de consulter un produit puis de preparer sa commande dans un panier local.

## Dependances

- Lot 1 termine.
- `docs/specs/feature-specs/fiche-produit.md`
- `docs/specs/feature-specs/panier.md`

## Tickets

### PUBLIC-201 - Fiche produit `/product/:slug`

Statut : termine.

Inclus :

- photos ;
- nom ;
- prix ;
- description ;
- categorie et sous-categorie ;
- caracteristiques facultatives ;
- badge epuise ;
- controle quantite ;
- retour catalogue.

Validation :

- produit brouillon ou masque inaccessible ;
- produit dans categorie ou sous-categorie masquee inaccessible ;
- produit epuise visible mais non ajoutable ;
- stock exact non affiche.

### PUBLIC-202 - Ajout panier

Statut : termine.

Ajout implemente depuis :

- catalogue ;
- fiche produit.

Regles :

- le navigateur stocke seulement `productId` et `quantity` dans `localStorage` ;
- quantite minimum 1 ;
- produit epuise non ajoutable ;
- le navigateur n'est pas source fiable pour prix, stock ou statut.

Validation :

- le panier persiste au rechargement ;
- le panier ne contient pas de prix comme source fiable ;
- la fiche produit permet de choisir une quantite avant ajout.

### PUBLIC-203 - Page panier `/cart`

Statut : termine.

Inclus :

- lignes panier ;
- photo principale ;
- nom produit ;
- prix serveur actuel ;
- quantite ;
- sous-total ;
- total ;
- retirer ;
- vider ;
- continuer les achats ;
- aller au checkout.

Validation :

- panier vide gere ;
- produit devenu indisponible marque clairement ;
- validation bloquee si panier invalide.

### PUBLIC-204 - Quantites panier

Statut : termine.

Controles :

- augmenter ;
- diminuer ;
- retirer si quantite descend sous 1 ;
- bloquer au-dessus du stock disponible sans afficher le stock exact.

Validation :

- impossible de depasser le stock ;
- impossible de valider une quantite invalide ;
- message russe clair.

## Zones touchees

- `app/product/[slug]/page.tsx`
- `app/cart/page.tsx`
- `app/cart/CartClient.tsx`
- `components/cart/AddToCartButton.tsx`
- `app/globals.css`
- `lib/publicCatalog.ts`

## Validation finale

- `npm run lint` passe.
- `npm run build` passe.
- `npm run check:docs` passe.
- `RUN_DB_INTEGRATION=1 npm test` passe contre Supabase.
- `/product/stolovyi-serviz-white-lui-laren-39` repond en HTTP local production.
- `/product/test-skrytyi-tovar` repond en `404`, ce qui confirme l'exclusion publique du produit masque.
- `/cart` repond en HTTP local production.
- Le scan client ne montre pas d'affichage public du stock exact.

## Risques surveilles

- La logique panier reste limitee au stockage local `{ productId, quantity }`.
- Les prix, statuts, disponibilites et stocks restent recalcules cote serveur avant commande.
- Les produits masques, brouillons ou rendus invisibles par categorie/sous-categorie ne restent pas commandables depuis un panier ancien.
