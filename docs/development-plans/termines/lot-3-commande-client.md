# Lot 3 - Commande client

## Objectif

Transformer un panier valide en commande enregistree, sans compte cliente et sans paiement en ligne.

## Dependances

- Lot 2 termine.
- `docs/specs/feature-specs/validation-commande.md`
- `docs/specs/feature-specs/confirmation-commande.md`
- `docs/specs/validation-rules.md`

## Tickets

### SERVER-301 - Verification panier serveur

Statut : termine.

La verification serveur recalcule :

- existence produit ;
- statut produit ;
- visibilite categorie ;
- visibilite sous-categorie ;
- stock disponible ;
- prix actuel ;
- sous-totaux ;
- total.

### PUBLIC-301 - Formulaire checkout `/checkout`

Statut : termine.

Le formulaire couvre :

- prenom ;
- nom ;
- telephone ou WhatsApp ;
- adresse ou zone ;
- paiement a la livraison ;
- virement apres confirmation ;
- recapitulatif panier ;
- livraison limitee a la Republique tchetchene ;
- delai estime 4 a 5 jours ;
- frais de livraison confirmes par la boutique.

### SERVER-302 - Creation commande transactionnelle

Statut : termine.

L'action serveur :

- reverifie le panier ;
- recalcule prix, disponibilite, stock et total avant validation finale ;
- valide les donnees cliente ;
- cree `Order` ;
- cree `OrderItem` avec snapshots ;
- decremente le stock dans la meme transaction ;
- echoue sans ecriture partielle si une ligne est invalide.

### PUBLIC-302 - Confirmation `/checkout/confirmation`

Statut : termine.

La confirmation :

- affiche un message de commande envoyee ;
- rappelle le contact telephone/WhatsApp ;
- affiche le numero public `+7 988 906-41-06` ;
- propose un retour catalogue ;
- propose un lien WhatsApp ;
- n'affiche aucune donnee personnelle.

### QA-301 - Scenario concurrence dernier stock

Statut : termine.

Le test d'integration Supabase couvre la creation transactionnelle avec decrement de stock. La mise a jour conditionnelle du stock bloque les validations concurrentes qui depasseraient le stock restant.

### QA-302 - Confirmation sans donnees personnelles

Statut : termine.

La page de confirmation utilise uniquement les donnees non sensibles stockees temporairement en `sessionStorage`. Un acces direct, meme avec un numero dans l'URL, affiche un etat neutre.

## Zones touchees

- `app/checkout/page.tsx`
- `app/checkout/CheckoutClient.tsx`
- `app/checkout/actions.ts`
- `app/checkout/confirmation/page.tsx`
- `app/checkout/confirmation/ConfirmationClient.tsx`
- `lib/serverCart.ts`
- `lib/publicCatalog.ts`

## Validation finale

- `npm run lint` passe.
- `npm run build` passe.
- `npm run check:docs` passe.
- `npm test` passe.
- `RUN_DB_INTEGRATION=1 npm test` passe contre Supabase.
- `/checkout` repond en HTTP local production.
- `/checkout/confirmation` repond en HTTP local production.
- `/checkout/confirmation?order=IH-TEST-DIRECT` repond en HTTP local production avec etat neutre cote rendu.

## Risques surveilles

- Le panier navigateur n'est pas source fiable pour prix, stock, statut ou total.
- Le stock diminue uniquement dans la transaction de creation de commande.
- La confirmation publique ne recupere pas de details de commande et n'expose aucune donnee personnelle.
- Le paiement reste hors ligne en V1.
