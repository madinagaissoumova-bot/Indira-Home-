# Feature Spec - Categories et sous-categories

## Objectif

Permettre a l'admin d'organiser le catalogue Indira Home avec des categories et sous-categories claires, afin que les clientes puissent trouver facilement les produits.

Cette fonctionnalite couvre la gestion des categories et sous-categories. Elle ne couvre pas encore la creation detaillee des produits.

## Utilisatrices concernees

- Admin
- Cliente, indirectement, car elle navigue dans les categories visibles

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Nom de categorie | Nom de la categorie visible dans l'admin et sur le site client | Oui |
| Nom de sous-categorie | Nom de la sous-categorie visible dans l'admin et sur le site client | Oui |
| Slug | Identifiant de route genere automatiquement a partir du nom | Oui, mais jamais saisi directement dans l'interface |
| Statut de categorie | Visible ou masquee | Oui |
| Statut de sous-categorie | Visible ou masquee | Oui |
| Ordre d'affichage | Position de la categorie ou sous-categorie dans le catalogue | Non |
| Categorie parente | Categorie a laquelle appartient une sous-categorie | Oui pour une sous-categorie |
| Nombre de produits associes | Nombre de produits lies a la categorie ou sous-categorie | Oui |

## Structure de depart

La structure de depart vient de la Function Map.

| Categorie | Sous-categories possibles |
| --- | --- |
| Vaisselle | Services de table, saladiers, plats de service, verres, tasses, services a the, couverts, масленица |
| Cuisine | Batteries de cuisine, casseroles, poeles, marmites, mantovarki / мантоварки, faitouts, sauteuses, ustensiles de cuisine, planches a decouper, boites de conservation, accessoires de cuisson |
| Petit electromenager | Bouilloires, grille-pain, mixeurs, blenders, hachoirs, robots de cuisine, appareils a cafe, appareils de cuisson |
| Gros electromenager | Aspirateurs, appareils de nettoyage, nettoyeurs haute pression, nettoyeurs vapeur |
| Decoration | Vases, accessoires de decoration de table |
| Accessoires maison | Accessoires de cuisine, petits objets pratiques pour la maison |

Les noms sont ecrits ici en francais pour la specification. Sur le site client, les noms visibles doivent etre en russe.

## Actions possibles

L'admin peut :

- Voir la liste des categories.
- Voir les sous-categories d'une categorie.
- Ajouter une categorie.
- Modifier une categorie.
- Masquer une categorie.
- Supprimer une categorie si elle ne contient aucun produit et si ses sous-categories ne contiennent aucun produit.
- Ajouter une sous-categorie dans une categorie.
- Modifier une sous-categorie.
- Masquer une sous-categorie.
- Supprimer une sous-categorie si elle ne contient aucun produit.
- Changer l'ordre d'affichage des categories.
- Changer l'ordre d'affichage des sous-categories.
- Associer les produits aux bonnes categories et sous-categories depuis la gestion produit.

La cliente peut :

- Voir les categories visibles.
- Voir les sous-categories visibles.
- Naviguer dans une categorie.
- Naviguer dans une sous-categorie.
- Ne pas voir les categories ou sous-categories masquees.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Ajouter une categorie | Creer une nouvelle categorie |
| Modifier | Modifier le nom ou les informations d'une categorie ou sous-categorie |
| Masquer | Rendre une categorie ou sous-categorie invisible cote cliente |
| Afficher | Rendre une categorie ou sous-categorie visible cote cliente |
| Supprimer | Supprimer une categorie ou sous-categorie autorisee a etre supprimee |
| Ajouter une sous-categorie | Creer une sous-categorie dans une categorie |
| Monter | Remonter une categorie ou sous-categorie dans l'ordre d'affichage |
| Descendre | Descendre une categorie ou sous-categorie dans l'ordre d'affichage |
| Enregistrer | Sauvegarder les changements |
| Annuler | Quitter sans enregistrer |

## Messages

| Situation | Message attendu |
| --- | --- |
| Categorie creee | Categorie creee avec succes. |
| Categorie modifiee | Categorie modifiee avec succes. |
| Categorie masquee | Categorie masquee. Elle n'est plus visible sur le site client. |
| Categorie affichee | Categorie visible sur le site client. |
| Categorie supprimee | Categorie supprimee. |
| Sous-categorie creee | Sous-categorie creee avec succes. |
| Sous-categorie modifiee | Sous-categorie modifiee avec succes. |
| Sous-categorie masquee | Sous-categorie masquee. Elle n'est plus visible sur le site client. |
| Sous-categorie affichee | Sous-categorie visible sur le site client. |
| Sous-categorie supprimee | Sous-categorie supprimee. |

Les messages visibles par les clientes doivent etre en russe. Les messages admin pourront aussi etre en russe dans l'interface finale.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Nom vide | Refuser l'enregistrement et demander un nom. |
| Nom deja utilise dans le meme niveau | Refuser l'enregistrement pour eviter les doublons. |
| Suppression d'une categorie contenant des produits ou des sous-categories avec produits | Refuser la suppression et proposer de masquer ou de deplacer les produits. |
| Suppression d'une sous-categorie contenant des produits | Refuser la suppression et proposer de masquer ou de deplacer les produits. |
| Sous-categorie sans categorie parente | Refuser l'enregistrement. |
| Ordre d'affichage invalide | Conserver l'ordre actuel et demander une correction. |

## Cas speciaux

- Une categorie masquee ne doit pas apparaitre sur le site client.
- Une sous-categorie masquee ne doit pas apparaitre sur le site client.
- Les produits d'une categorie masquee ne doivent pas etre accessibles via cette categorie.
- Les produits d'une sous-categorie masquee ne doivent pas etre accessibles via cette sous-categorie.
- Masquer une categorie ne supprime pas les produits associes.
- Masquer une sous-categorie ne supprime pas les produits associes.
- Une categorie vide peut etre masquee automatiquement ou rester visible selon le choix de l'admin.
- Une sous-categorie vide peut etre masquee automatiquement ou rester visible selon le choix de l'admin.
- Supprimer une categorie doit etre impossible si elle contient des produits ou des sous-categories avec produits.
- Si une categorie contient seulement des sous-categories vides, ces sous-categories peuvent etre supprimees automatiquement avec la categorie.
- Supprimer une sous-categorie doit etre impossible si elle contient des produits.

## Regles metier

- Chaque produit publie doit avoir une categorie et une sous-categorie en V1.
- L'admin peut modifier l'organisation du catalogue sans intervention technique.
- Une suppression ne doit pas laisser de produits sans categorie ou sans sous-categorie.
- Masquer est l'option recommandee quand une categorie ou sous-categorie contient deja des produits.
- Les categories et sous-categories visibles par les clientes doivent etre en russe.
- Les categories peuvent etre elargies plus tard si la boutique ajoute d'autres types de produits.

## Critères d'acceptation

- L'admin peut ajouter une categorie.
- L'admin peut modifier une categorie.
- L'admin peut masquer et afficher une categorie.
- L'admin peut supprimer une categorie vide.
- L'admin ne peut pas supprimer une categorie contenant des produits.
- L'admin peut supprimer une categorie contenant uniquement des sous-categories vides.
- L'admin peut ajouter une sous-categorie.
- L'admin peut modifier une sous-categorie.
- L'admin peut masquer et afficher une sous-categorie.
- L'admin peut supprimer une sous-categorie vide.
- L'admin ne peut pas supprimer une sous-categorie contenant des produits.
- La cliente voit uniquement les categories et sous-categories visibles.
- Les categories et sous-categories masquees ne sont pas visibles dans le catalogue client.
- Les textes visibles par les clientes sont en russe.
- Le slug de categorie et de sous-categorie est genere automatiquement a partir du nom.
