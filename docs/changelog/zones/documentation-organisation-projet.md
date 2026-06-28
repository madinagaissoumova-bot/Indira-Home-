# Changelog - Documentation Et Organisation Projet

## 2026-06-28 - Changelog par fichiers de zones

- Remplacement du changelog V1 unique par un index et un fichier par zone de travail.
- Ajout d'une convention d'ecriture dans `docs/changelog/index.md`.
- Repartition de l'historique deja livre dans les fichiers de zones.

## 2026-06-28 - Nettoyage des README et de ru-copy

- Suppression des fichiers `README.md` suivis par Git.
- Suppression de `docs/specs/content/ru-copy.md`.
- Ajout d'un controle documentaire contre le retour de README suivis.

## 2026-06-28 - Retrait de l'ADR de methode redondant

- Suppression de l'ADR de methode redondant.
- Retrait des references actives au dossier `docs/specs/adr/`.

## 2026-06-18 - Remplacement de la roadmap par le changelog

- Remplacement de l'ancienne section roadmap par `docs/changelog/`.
- Conservation d'un historique des changements V1 deja livres.
- Suppression de la planification V2 du changelog.

## 2026-06-09 - Workflow main obligatoire

- Clarification du cycle de livraison vers `main`.
- Formalisation du passage par branche dediee, Pull Request, validation explicite et merge.

## 2026-06-04 - Completion des specs V1

- Audit des specs V1.
- Clarification de l'identite cliente, de la taxonomie produit, du numero de commande, des statuts et des images.
- Ajout des exigences d'idempotence checkout et de limitation des tentatives admin.
