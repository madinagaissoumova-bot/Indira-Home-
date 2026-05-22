# Verification V1 - 2026-05-21

Ce fichier consigne les corrections et verifications effectuees pendant le passage QA V1.

## Corrections appliquees

- Mobile public : navigation mobile rendue plus stable, bouton categories agrandi, boutons produits et panier ajustes pour les petits ecrans, grille produits passee en une colonne sous 420 px.
- Checkout mobile : recapitulatif remonte avant le formulaire sur telephone pour rendre le contenu du panier visible avant saisie.
- Admin : libelles de stock, statuts, paiement et detail commande alignes avec les textes russes centralises.
- Textes : les textes visibles par les clientes restent centralises dans `lib/i18n/ru.ts`; le scan du code ne remonte plus de texte client russe hors fichier de contenu, sauf les signaux internes de validation de zone.

## Verifications automatiques

Commandes passees :

- `npm run lint`
- `npm run prisma:generate`
- `npm run build`

Resultat : OK.

## Verifications HTTP locales

Serveur local utilise : `http://localhost:3000`.

Routes verifiees :

- `/` : HTTP 200.
- `/category/posuda` : HTTP 200.
- `/product/stolovyi-serviz-white-lui-laren-39` : HTTP 200.
- `/cart` : HTTP 200.
- `/checkout` : HTTP 200.
- `/admin` sans session : HTTP 307 vers `/admin/login`.
- `/admin/login` : HTTP 200.

## Admin local

Le `.env` local a ete migre vers les variables attendues par le code :

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- `ADMIN_SESSION_SECRET`

Le hash bcrypt local a ete verifie avec le mot de passe de developpement. En production, le mot de passe, le hash et le secret de session doivent etre remplaces.

## Points encore a verifier manuellement

- Test visuel responsive reel a 360 px, 390 px, 768 px et 1280 px avec screenshots.
- Parcours commande complet dans le navigateur : ajout panier, checkout, confirmation, vidage panier.
- Parcours admin connecte complet dans le navigateur : dashboard, produits, categories, stock, commandes.
- Checklist metier complete de `Docs/testing/test-plan.md`, surtout snapshots prix/images et transaction avec ligne invalide.

Le plugin Browser etait disponible dans les instructions, mais l'outil Node REPL requis pour le piloter n'etait pas expose dans cette session. La verification visuelle screenshot reste donc a faire dans une session ou le navigateur integre est pilotable.
