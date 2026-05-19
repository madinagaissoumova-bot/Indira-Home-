# Indira Home

Site e-commerce Next.js pour la boutique **Indira Home** : catalogue public, fiches produits, panier, commande sans paiement en ligne et interface admin.

Le projet suit une approche **Specification-Driven Development** : les décisions produit et techniques sont écrites dans `Docs/specs/`, puis le code est construit pour satisfaire ces spécifications.

## Organisation Des Fichiers

- `app/` : routes Next.js App Router.
- `app/category/[slug]/` : pages catégories.
- `app/subcategory/[slug]/` : pages sous-catégories.
- `app/product/[slug]/` : fiches produits.
- `app/cart/` : panier cliente.
- `app/checkout/` : validation de commande.
- `app/search/` : recherche produit.
- `app/admin/` : espace admin.
- `components/cart/` : composants liés au panier.
- `components/navigation/` : composants de navigation partagés.
- `Docs/` : documents du projet, specs, plans, roadmap, tests et instructions agent.
- `lib/` : constantes, formatage, Prisma et helpers visuels.
- `prisma/` : schéma, base locale et seed.
- `public/uploads/brand/` : visuels de marque.
- `public/uploads/products/` : photos produits.
- `Docs/agents/` : instructions locales pour les assistants de developpement.
- `Docs/specs/` : source de vérité produit, UX et technique.
- `Docs/development-plans/` : lots de developpement, tickets, statut, securite et production.
- `Docs/roadmap/` : vision et sequence globale de la V1.
- `Docs/test-plan.md` : checklist de verification V1.

## Chemin de specification

1. `Docs/specs/global-spec.md` : description simple du projet, qui l'utilise, pourquoi, quel probleme il resout, ou ca se passe.
2. `Docs/specs/functional-map.md` : liste de tout ce que les utilisatrices peuvent faire, sans design ni technique.
3. `Docs/specs/feature-specs/` : une fiche detaillee par fonctionnalite.
4. `Docs/specs/technical/README.md` : index des specs techniques, avec pages, composants, base de donnees, API et navigation.
5. `Docs/specs/visual-rules.md` : style, couleurs, boutons, cartes, responsive mobile.
6. `Docs/specs/user-stories.md` : verification des parcours comme une vraie utilisatrice.
7. `Docs/specs/work-plan.md` : plan de developpement progressif avant de coder.
8. `Docs/development-plans/` : execution et suivi des lots.
9. `Docs/roadmap/` : priorites et sequence globale de la V1.
10. `Docs/test-plan.md` : validation finale et verifications manuelles.

## Principe de travail

- Une fonctionnalité commence par une specification.
- Une specification doit avoir des critères d'acceptation vérifiables.
- Une décision importante doit être tracée dans `Docs/specs/adr/`.
- Le code ne doit pas introduire de comportement non décrit ou non accepté.

## Commandes Utiles

- `npm run dev`
- `npm run build`
- `npm run prisma:seed`
