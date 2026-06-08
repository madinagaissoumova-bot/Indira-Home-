# Supabase PostgreSQL

## Role

Supabase est la base PostgreSQL principale du projet. SQLite n'est plus le mode normal de developpement.

## Connexions

Variables attendues :

- `DATABASE_URL` : URL PostgreSQL utilisee par l'application et Prisma.

Avec Supabase, utiliser l'ecran **Connect** du projet pour recuperer les chaines PostgreSQL. Pour Prisma, la documentation Supabase recommande la chaine **Supavisor Session pooler** sur le port `5432` pour un backend persistant. Pour un environnement serverless ou autoscaling, Supabase indique que la chaine transaction mode utilise le port `6543`; dans ce cas il faut tenir compte des limites autour des prepared statements.

Ne jamais commiter les vraies valeurs.

## Commandes

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Les commandes Prisma refusent de s'executer si `DATABASE_URL` n'est pas une URL PostgreSQL. Cela evite d'utiliser accidentellement une ancienne base SQLite locale.

Les tests d'integration qui ecrivent en base se lancent seulement avec :

```bash
RUN_DB_INTEGRATION=1 npm test
```

## Procedure initiale Supabase

1. Creer le projet Supabase.
2. Copier la connection string PostgreSQL depuis Supabase.
3. Configurer `DATABASE_URL` dans l'environnement de deploiement.
4. Executer `npm run prisma:migrate`.
5. Executer `npm run prisma:seed` si la base est vide.
6. Verifier les categories, sous-categories, produits, images et commandes.

Note : les anciennes migrations SQLite locales ont ete remplacees par une migration initiale PostgreSQL.

## Sauvegarde

Avant toute migration Supabase :

- creer une sauvegarde ou export de la base ;
- verifier que la restauration est possible ;
- ne pas lancer de migration destructive sans backup recent.

## References

- Supabase Prisma guide: https://supabase.com/docs/guides/database/prisma
- Supabase connection strings: https://supabase.com/docs/reference/postgres/connection-strings
