# Plan - Nettoyer La Fiche Produit

## Objectif

Supprimer les elements visuels ambigus de la fiche produit afin que la cliente comprenne clairement ce qui est interactif et ce qui est seulement informatif.

## Validation Du Plan

- [x] Le besoin a ete signale par l'utilisatrice apres verification visuelle.
- [x] Le perimetre du plan a ete valide explicitement par l'utilisatrice.
- [x] Une branche dediee a ete creee depuis `origin/main`.
- [x] Ce fichier a ete enregistre dans `docs/development-plans/en-cours/`.

## Perimetre

- Enlever les etoiles de notation sur la fiche produit.
- Enlever les petits carres decoratifs qui peuvent etre compris comme des cases a cocher.
- Rendre le controle de quantite plus clair et plus calme visuellement.
- Enlever le bloc de caracteristiques visibles qui ajoute du bruit sans aider l'achat.
- Corriger les sections d'information de la fiche produit pour ne pas afficher de texte generique incoherent.
- Alleger les blocs secondaires de la fiche produit pour donner plus de poids au produit et a l'achat.
- Mettre la description et les informations utiles dans la colonne achat, puis remonter les produits similaires.
- Ameliorer les details visuels directement lies a la lisibilite de la fiche produit.
- Repasser les pages publiques restantes pour corriger les ecarts visuels evidents avec le style approuve.
- Rendre les pages `about` et `privacy` plus editoriales et moins proches d'un formulaire.
- Remplacer les symboles geometriques ambigus de la bande de services par des pictogrammes sobres.
- Garder les textes visibles cote cliente en russe.

## Hors Perimetre

- Ne pas changer les regles de stock, panier, prix ou commande.
- Ne pas ajouter de notes clientes.
- Ne pas ajouter de nouvelle fonctionnalite produit.
- Ne pas modifier l'admin.
- Ne pas modifier le catalogue hors elements partages strictement necessaires.
- Ne pas refaire le contenu, les routes ou le parcours des pages informatives.

## Etapes

- [x] 1. Verifier la branche, le working tree, les plans actifs et les specs.
- [x] 2. Nettoyer le rendu de la fiche produit.
- [x] 3. Verifier la fiche produit en mobile et desktop.
- [x] 4. Lancer les checks adaptes.
- [x] 4.1. Auditer et aligner les pages publiques informatives restantes.
- [ ] 5. Commit, push et Pull Request apres validation du resultat.

## Verification

- `npm run lint`
- `npm run check:docs`
- `npm test`
- `npm run build`
- Verification visuelle mobile de la fiche produit.
- Verification visuelle mobile et desktop des pages publiques principales.

## Risques Et Contraintes

- Le controle de quantite est partage avec le panier: limiter les changements visuels aux variantes de fiche produit si necessaire.
- Les elements informatifs doivent rester lisibles sans ressembler a des champs ou cases a cocher.
