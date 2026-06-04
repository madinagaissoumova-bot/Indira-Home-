# Development Status - Indira Home

Ce fichier suit les plans actifs, termines et a faire.

Statuts utilises :

- `TERMINE` : le lot respecte les criteres de sortie connus.
- `ACTIF` : le lot est en cours ou partiellement implemente.
- `A FAIRE` : le lot n'est pas encore implemente de facon fonctionnelle. Un placeholder peut exister.
- `BLOQUE` : le lot attend une decision ou une dependance.

## Vue actuelle

| Lot | Plan | Statut | Resume |
| --- | --- | --- | --- |
| Lot 0 | `lot-0-base-donnees.md` | TERMINE | Constantes, schema Prisma, seed V1, helpers publics, validations serveur communes et garde-fous critiques sont verifies. |
| Lot 1 | `lot-1-catalogue-client.md` | TERMINE | Catalogue d'accueil, routes categorie/sous-categorie, recherche, filtres, tri, mobile CSS et regles publiques sont verifies. |
| Lot 2 | `lot-2-fiche-produit-panier.md` | TERMINE | Fiche produit, galerie, caracteristiques, ajout panier, page panier, corrections de quantites et filtres publics serveur sont verifies. |
| Lot 3 | `lot-3-commande-client.md` | ACTIF | Le parcours fonctionne, mais l'idempotence d'une meme tentative checkout reste a implementer et verifier. |
| Lot 4 | `lot-4-auth-dashboard-admin.md` | ACTIF | L'auth fonctionne, mais la limitation des tentatives de connexion repetees reste a implementer et verifier. |
| Lot 5 | `lot-5-admin-catalogue.md` | TERMINE | Produits, categories et sous-categories admin sont gerables et verifies. |
| Lot 6 | `lot-6-admin-stock.md` | TERMINE | Le stock est consultable, ajoutable, retirable et corrigeable depuis l'interface admin. |
| Lot 7 | `lot-7-admin-commandes.md` | TERMINE | Les commandes peuvent etre consultees, mises a jour, annotees et contactees depuis l'admin. |
| Lot 8 | `lot-8-polish-verification.md` | TERMINE | Textes russes, centralisation contenu, audits mobile public et admin connecte, build production, Supabase, securite et checklist V1 sont verifies. |

## Plans actifs

Aucun plan actif. Le prochain plan doit etre discute et valide avec l'utilisatrice avant creation d'une nouvelle branche.

Les tickets `SERVER-303` et `ADMIN-405` doivent etre traites avant de redeclarer les lots 3 et 4 termines.

## Plans termines

### Completer les specs V1 - 2026-06-04

Validation effectuee :

- audit des specs V1 et suppression des principales ambiguities documentaires ;
- ajout de la feature spec confidentialite et de sa tracabilite dans les user stories et tests ;
- clarification de l'identite cliente, de la taxonomie produit, du numero de commande, des statuts et des images ;
- ajout des exigences d'idempotence checkout et de limitation des tentatives de connexion admin ;
- formalisation du workflow Development Plan, nouvelle branche, Pull Request et validation explicite ;
- `npm run check:docs` passe.

### Lot 0 - Base projet et donnees

Validation effectuee :

- constantes metier alignees avec les specs ;
- schema Prisma compatible V1 ;
- seed execute avec categories, sous-categories, produits publies, produit epuise, produit masque et produits nouveaux ;
- helpers publics et validations serveur communes couverts par tests ;
- `npm run prisma:generate`, `npm run prisma:seed`, `npm test`, `npm run lint` et `npm run build` passent.

### Lot 1 - Catalogue client

Validation effectuee :

- catalogue d'accueil avec recherche, filtres, tri et reset ;
- navigation categorie et sous-categorie ;
- produits publics filtres par helper commun ;
- produits epuisees visibles mais non commandables ;
- stock exact absent cote cliente ;
- routes `/`, `/category/posuda`, `/subcategory/servizy` et `/search?q=serviz` verifiees en HTTP local production avec Supabase ;
- `npm run build`, `npm run lint` et `npm run check:docs` passent.

### Lot 2 - Fiche produit et panier

Validation effectuee :

- fiche produit publique filtree par le helper public commun ;
- produits brouillons, masques ou lies a une taxonomie masquee inaccessibles ;
- produits epuisees visibles mais non commandables ;
- ajout panier depuis catalogue et fiche produit avec quantite bornee ;
- page panier robuste avec produits devenus indisponibles bloques ;
- stock exact absent cote cliente ;
- routes `/product/stolovyi-serviz-white-lui-laren-39`, `/product/test-skrytyi-tovar` et `/cart` verifiees en HTTP local production avec Supabase ;
- `npm test` avec `RUN_DB_INTEGRATION=1`, `npm run build`, `npm run lint` et `npm run check:docs` passent.

### Lot 3 - Commande client

Validation effectuee :

- verification panier serveur centralisee ;
- checkout sans compte et sans paiement en ligne ;
- validation nom, prenom, telephone, adresse ou zone et mode de paiement ;
- livraison limitee a la Republique tchetchene avec messages russes ;
- creation commande transactionnelle avec snapshots prix, image et lignes ;
- decrement de stock dans la transaction uniquement apres validation reussie ;
- test d'integration Supabase couvrant total mis a jour, creation commande et decrement stock ;
- confirmation publique sans donnees personnelles et sans recreation de commande au rechargement ;
- acces direct a `/checkout/confirmation?order=...` affiche un etat neutre sans rendre le numero comme confirmation recente ;
- routes `/checkout`, `/checkout/confirmation` et `/checkout/confirmation?order=IH-TEST-DIRECT` verifiees en HTTP local production avec Supabase ;
- `RUN_DB_INTEGRATION=1 npm test`, `npm run build`, `npm run lint` et `npm run check:docs` passent.

### Lot 4 - Auth admin et dashboard

Validation effectuee :

- connexion admin avec cookie signe HTTP-only ;
- deconnexion admin disponible ;
- routes et actions admin protegees cote serveur ;
- `/admin` redirige vers `/admin/login` sans session ;
- dashboard connecte avec compteurs, commandes recentes, alertes stock et raccourcis ;
- routes `/admin`, `/admin/products`, `/admin/categories`, `/admin/stock` et `/admin/orders` verifiees avec session valide.

### Lot 5 - Admin catalogue

Validation effectuee :

- liste produits admin disponible ;
- creation et edition produit disponibles ;
- actions publication, masquage, remise visible et suppression autorisee disponibles ;
- categories et sous-categories gerables depuis `/admin/categories` ;
- routes detail produit admin verifiees avec session valide ;
- protections admin confirmees sur les ecrans catalogue.

### Lot 6 - Admin stock

Validation effectuee :

- page `/admin/stock` disponible et protegee ;
- stock exact visible uniquement cote admin ;
- ajout, retrait et correction de stock valides par les helpers metier ;
- valeurs negatives ou non entieres refusees ;
- reassort et stock 0 se refletent dans l'etat commandable cote client sans exposer la quantite exacte.

Note :

- `ADMIN-605` historique minimal de stock reste optionnel et hors blocage V1.

### Lot 7 - Admin commandes

Validation effectuee :

- liste commandes `/admin/orders` disponible et protegee ;
- detail commande `/admin/orders/:id` disponible et protege ;
- statuts commande modifiables parmi les valeurs V1 ;
- note interne admin enregistrable et non publique ;
- liens telephone et WhatsApp disponibles dans le detail commande admin ;
- confirmation avant annulation de commande admin ;
- detail commande verifie avec une vraie commande de test Supabase.

### Lot 8 - Polish mobile et verification V1

Validation effectuee :

- textes client russes et contenu client centralise ;
- audit mobile public effectue avec corrections CSS anti-debordement ;
- audit admin connecte effectue sur dashboard, produits, categories, stock, commandes, detail produit et detail commande ;
- liens telephone et WhatsApp disponibles dans le detail commande admin ;
- confirmation avant annulation de commande admin ;
- routes publiques et admin verifiees en HTTP local production ;
- `/admin` redirige vers `/admin/login` sans session ;
- confirmation publique directe affiche un etat neutre sans donnees personnelles ;
- Supabase verifie : migrations appliquees, donnees V1 presentes, commande de test presente ;
- absence de paiement en ligne verifiee ;
- secrets `.env` non suivis par Git ;
- `npm run prisma:generate`, `npm run prisma:migrate`, `RUN_DB_INTEGRATION=1 npm test`, `npm run lint`, `npm run build` et `npm run check:docs` passent.

### Passe navigateur V1 - 2026-06-02

Validation effectuee :

- passe Chromium locale avec captures dans `/private/tmp/indira-browser-qa` ;
- mobile 390 px verifie sur accueil, categorie, sous-categorie, recherche, fiche produit, panier, checkout, confirmation et confidentialite ;
- admin connecte desktop verifie sur dashboard, produits, detail produit, categories, stock, commandes et detail commande ;
- protection admin sans session verifiee : `/admin` redirige vers `/admin/login` ;
- confirmation publique comparee aux donnees de la commande de test Supabase, sans fuite de nom, telephone prive ou adresse ;
- aucun debordement horizontal detecte sur les pages auditees ;
- correction CSS appliquee sur `/admin/stock` pour eviter les boutons d'action coupes.

## Prochain focus recommande

Le prochain focus recommande est :

1. implementer et tester l'idempotence checkout ;
2. limiter les tentatives de connexion admin repetees ;
3. reprendre la preparation de mise en ligne avec sauvegarde Supabase recente.

Cette sequence ferme les nouveaux ecarts de securite et de stock avant la mise en production.
