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

## Suivi correctifs - 2026-05-22

- `npm run lint` : OK.
- `npm run build` : OK.
- `/cart` et `/checkout` sont maintenant rendues dynamiquement par Next.js.
- Verifications HTTP locales sur `http://localhost:3001` : `/`, `/category/posuda`, `/product/stolovyi-serviz-white-lui-laren-39`, `/cart` et `/checkout` repondent en 200.
- Verification screenshot responsive : toujours bloquee dans cette session. Le navigateur integre ne fournit pas l'outil de pilotage requis, et macOS refuse le redimensionnement Safari par AppleScript sans autorisation d'accessibilite.

## Suivi zones grises - 2026-05-22

- Brouillons incomplets : un produit brouillon ou masque peut etre enregistre sans informations publiques completes. S'il manque categorie ou sous-categorie, il est rattache a une categorie systeme masquee `system-drafts`.
- Publication produit : seul le statut `PUBLISHED` impose les champs publics complets, un prix strictement positif, une categorie, une sous-categorie et une image `http` ou `https`.
- Confirmation commande : le total affiche apres validation vient maintenant du total serveur retourne par la transaction.
- Panier serveur : les quantites manipulees sont bornees a un entier sur et a 99 unites par produit avant verification stock.
- Admin : les suppressions produit, categorie et sous-categorie demandent une confirmation navigateur avant soumission.
- Admin produit : la sous-categorie affichee depend maintenant de la categorie selectionnee.
- Numero commande : la partie aleatoire utilise maintenant un tirage cryptographique a 6 chiffres, avec retry en cas de collision unique.
- Documentation : la checklist V1 est centralisee dans `Docs/testing/test-plan.md`; les references `Docs/test-plan.md` ont ete remplacees.
- Verification HTTP locale sur `http://localhost:3000` : `/`, `/admin/login`, `/cart` et `/checkout` repondent en 200 apres les correctifs.
- Reste dependante de l'environnement : captures responsive 360 / 390 / 768 / 1280 px et parcours navigateur complet admin + commande.

## Verification coherente - 2026-05-22

- `npm run prisma:generate` : OK.
- `npm test` : OK, 8 tests passent sur validation slug/image, parsing panier, verification panier serveur, total serveur et refus stock/prix invalides.
- `npm run lint` : OK.
- `npm run build` : OK.
- Routes HTTP locales verifiees sur `http://localhost:3000` : `/`, `/category/posuda`, `/product/stolovyi-serviz-white-lui-laren-39`, `/cart`, `/checkout`, `/admin/login` repondent en 200.
- Protection admin locale : `/admin` sans session repond en 307 vers `/admin/login`.
- Coherence image : la validation admin accepte maintenant `http`, `https` et les chemins locaux `/uploads/...`, alignes avec le seed et les assets existants.
- Publication produit : une categorie ou sous-categorie masquee bloque la publication, y compris la categorie systeme `system-drafts`.
- Verification responsive automatisee : non terminee. Le navigateur integre ne fournit pas l'outil requis, Safari ne peut pas etre redimensionne par AppleScript sans permission d'accessibilite, et Playwright CLI n'est pas disponible localement.
