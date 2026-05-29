# Supabase PostgreSQL - 2026-05-28

## Objectif

Basculer Indira Home completement sur Supabase PostgreSQL.

## Decisions

- Utiliser `prisma/schema.prisma` comme schema PostgreSQL principal.
- Remplacer les migrations SQLite par une migration initiale PostgreSQL.
- Ajouter un garde-fou qui refuse les commandes Prisma sans URL PostgreSQL.
- Documenter la variable `DATABASE_URL`.

## Pourquoi un seul schema

Le projet doit maintenant utiliser Supabase comme base principale. Le schema Prisma principal cible donc PostgreSQL.

## Actions

- Basculer `prisma/schema.prisma` en PostgreSQL.
- Remplacer la migration initiale SQLite par une migration PostgreSQL.
- Faire utiliser les scripts Prisma principaux par Supabase.
- Ajouter un garde-fou qui refuse les commandes Prisma si `DATABASE_URL` n'est pas PostgreSQL.
- Mettre a jour `.env.example` et la documentation production.
- Ne pas lancer de migration distante sans `DATABASE_URL` Supabase.

## Validation locale

- validation schema Prisma PostgreSQL
- `npm test`
- `npm run lint`
- `npm run build`

## Validation Supabase a faire avec identifiants

- Configurer `DATABASE_URL` avec la chaine pooler Supabase compatible Prisma.
- Configurer `DATABASE_URL` avec la chaine Supabase PostgreSQL.
- Lancer `npm run prisma:migrate`.
- Lancer `npm run prisma:seed`.
- Verifier les compteurs categories, sous-categories et produits.
