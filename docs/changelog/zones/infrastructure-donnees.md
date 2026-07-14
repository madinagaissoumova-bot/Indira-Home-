# Journal Des Changements - Infrastructure Et Donnees

## V1 - Base technique livree

- Application Next.js App Router en TypeScript.
- Prisma avec Supabase PostgreSQL.
- Modeles et relations pour categories, sous-categories, produits, commandes et lignes de commande.
- Constantes metier partagees pour les statuts et modes de paiement.
- Seeds et migrations V1.

## 2026-06-07 - Migration idempotence validation commande

- Ajout d'une migration Prisma pour `checkoutAttemptId`.
- Migration Supabase appliquee lors de la verification du lot.

## 2026-05-28 - Supabase PostgreSQL

- Mise en place et verification de Supabase PostgreSQL pour la V1.
