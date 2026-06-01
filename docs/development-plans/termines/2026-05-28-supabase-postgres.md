# Supabase PostgreSQL - 2026-05-28

## Objectif

Basculer Indira Home completement sur Supabase PostgreSQL.

Statut : termine et verifie le 2026-06-01.

## Decisions

- Utiliser `prisma/schema.prisma` comme schema PostgreSQL principal.
- Remplacer les migrations SQLite par une migration initiale PostgreSQL.
- Ajouter un garde-fou qui refuse les commandes Prisma sans URL PostgreSQL.
- Documenter la variable `DATABASE_URL`.

## Pourquoi un seul schema

Le projet utilise maintenant Supabase comme base principale. Le schema Prisma principal cible donc PostgreSQL.

## Actions realisees

- `prisma/schema.prisma` bascule en PostgreSQL.
- La migration initiale SQLite est remplacee par une migration PostgreSQL.
- Les scripts Prisma principaux utilisent Supabase.
- Les commandes Prisma refusent de s'executer si `DATABASE_URL` n'est pas PostgreSQL.
- `.env.example`, la documentation production et les specs techniques sont mises a jour.
- Le layout est force en dynamique pour eviter une lecture base au build.

## Validation locale

- `npm run prisma:generate` : OK avec `DATABASE_URL` Supabase.
- `npx prisma validate` : OK.
- `npm run lint` : OK.
- `npm run build` : OK.
- `npm run check:docs` : OK.

## Validation Supabase

- `npx prisma migrate status` : OK, schema a jour.
- Lecture compteurs Supabase : 4 categories, 15 sous-categories, 19 produits, 18 produits publies, 2 produits publies epuises, 1 produit masque ou brouillon.
- `RUN_DB_INTEGRATION=1 npm test` : OK, 29 tests passes.

## Notes

- `.env` reste ignore par Git et contient la vraie URL Supabase localement.
- Les tests d'integration DB sont volontaires avec `RUN_DB_INTEGRATION=1`.
- La CI utilise une URL PostgreSQL factice pour valider le format sans dependance a une base distante.
