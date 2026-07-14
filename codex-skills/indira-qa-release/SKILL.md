---
name: indira-qa-release
description: Utiliser pour verifier Indira Home V1, lancer la QA, controler la preparation de mise en production, la securite, la configuration production, les tests, le comportement mobile ou la conformite aux specs V1.
---

# QA Et Mise En Production Indira

Utiliser ce skill pour la QA, les revues et la preparation de mise en production.

## Lire D'Abord

- `docs/specs/validation-rules.md`
- `docs/specs/technical/security-checklist.md`
- `docs/specs/technical/production-plan.md`
- `docs/changelog/index.md`
- fichiers pertinents dans `docs/changelog/zones/`
- specifications fonctionnelles pertinentes pour la zone auditee

## Commandes De Verification

Lancer quand c'est pertinent :

- `npm run prisma:generate`
- `npm run build`

Si disponible :

- `npm run lint`
- `npm test`
- `npm run prisma:migrate`
- `npm run prisma:seed`

## Zones QA Critiques

Cliente :

- le catalogue affiche seulement les produits publics ;
- les categories et sous-categories masquees ne laissent pas apparaitre leurs produits ;
- les produits avec stock 0 sont visibles mais non commandables ;
- le panier stocke seulement `productId` et `quantity` ;
- la validation commande recalcule cote serveur ;
- la confirmation n'expose ni telephone ni adresse cliente ;
- tous les textes clientes sont en russe.

Admin :

- les routes admin exigent une session ;
- les actions admin exigent une session cote serveur ;
- la validation de publication produit fonctionne ;
- la suppression des produits deja commandes est bloquee ;
- le stock ne peut pas devenir negatif ;
- les snapshots de commande restent stables ;
- les donnees personnelles des commandes sont reservees a l'admin.

Mise en production :

- `DATABASE_URL` production est configure ;
- les variables d'environnement admin sont configurees ;
- aucun secret n'est dans le code ;
- sauvegarde et rollback sont prevus ;
- aucun paiement en ligne n'est present ;
- la limite de livraison a la Republique tchetchene est visible.

## Style De Rapport

Commencer par les blocages et regressions. Inclure des references de fichiers pendant les reviews de code. Garder les resumes courts et concrets.
