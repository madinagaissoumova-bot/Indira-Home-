# Verification V1 - 2026-05-21

Ce fichier consigne les corrections et verifications effectuees pendant le passage QA V1.

## Corrections appliquees

- Mobile public : navigation mobile rendue plus stable, bouton categories agrandi, boutons produits et panier ajustes pour les petits ecrans, grille produits passee en une colonne sous 420 px.
- Checkout mobile : recapitulatif remonte avant le formulaire sur telephone pour rendre le contenu du panier visible avant saisie.
- Admin : libelles de stock, statuts, paiement et detail commande alignes avec les textes russes centralises.
- Textes : les textes visibles par les clientes restent centralises dans `lib/.i18n/ru.ts`; le scan du code ne remonte plus de texte client russe hors fichier de contenu, sauf les signaux internes de validation de zone.

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

- [x] Test responsive public traite pendant le Lot 8 avec corrections CSS anti-debordement et verification HTTP production locale.
- [x] Parcours commande couvert par les validations Lot 8, incluant checkout, confirmation et test d'integration Supabase avec decrement stock.
- [x] Parcours admin connecte verifie pendant le Lot 8 : dashboard, produits, categories, stock, commandes, detail produit et detail commande.
- [x] Checklist metier complete de `docs/testing/test-plan.md` executee pendant le Lot 8.

Le plugin Browser etait disponible dans les instructions, mais l'outil Node REPL requis pour le piloter n'etait pas expose dans cette session. La verification visuelle screenshot automatisee n'a pas ete produite ; la verification V1 finale repose sur les corrections CSS ciblees, les routes HTTP production locale, les tests automatises et l'audit admin connecte consignes dans `docs/development-plans/termines/lot-8-polish-verification.md`.

Cloture documentaire du 2026-06-02 :

- ce plan de verification est cloture par la checklist finale V1 du Lot 8 ;
- il est deplace dans `docs/development-plans/termines/` pour que `docs/development-plans/en-cours/` ne contienne plus d'ancien plan V1 deja resolu.
