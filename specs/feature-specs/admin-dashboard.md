# Feature Spec - Admin dashboard

## Objectif

Permettre a l'admin de voir une vue centrale de l'activite de la boutique Indira Home apres connexion.

Le tableau de bord sert de point d'entree vers les commandes, les produits, le stock et les categories.

## Utilisatrices concernees

- Admin

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Nombre de commandes nouvelles | Nombre de commandes a traiter | Non |
| Nombre de commandes en cours | Nombre de commandes deja prises en charge | Non |
| Nombre de produits publies | Nombre de produits avec statut publie | Non |
| Nombre de produits visibles cote cliente | Nombre de produits publies dans des categories et sous-categories visibles | Non |
| Nombre de produits epuises | Nombre de produits publies mais sans stock | Non |
| Nombre de produits masques | Nombre de produits caches cote cliente | Non |
| Nombre de categories | Nombre de categories actives ou gerees | Non |
| Nombre de sous-categories | Nombre de sous-categories gerees | Non |
| Alertes stock | Produits a surveiller, par exemple stock faible ou zero | Non |
| Commandes recentes | Liste des dernieres commandes recues | Non |

## Actions possibles

L'admin peut :

- Voir un resume de l'activite de la boutique.
- Voir les nouvelles commandes.
- Ouvrir une commande depuis le tableau de bord.
- Ouvrir la gestion des produits.
- Ouvrir la gestion du stock.
- Ouvrir la gestion des categories.
- Ouvrir la liste des commandes.
- Ouvrir la liste des produits.
- Ouvrir la liste des categories.
- Se deconnecter.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Voir les commandes | Aller vers la liste des commandes |
| Voir les produits | Aller vers la gestion des produits |
| Voir le stock | Aller vers la gestion du stock |
| Voir les categories | Aller vers la gestion des categories |
| Nouvelle commande | Ouvrir le detail de la commande la plus recente |
| Deconnexion | Quitter la session admin |

## Messages

| Situation | Message attendu |
| --- | --- |
| Tableau de bord vide | Aucun element a afficher pour le moment. |
| Nouvelle commande recue | Nouvelle commande a traiter. |
| Session expiree | Votre session a expiree. Veuillez vous reconnecter. |
| Donnees indisponibles | Certaines informations ne peuvent pas etre chargees pour le moment. |

Les messages admin pourront etre affiches en russe dans l'interface finale.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Acces sans connexion | Rediriger vers la page de connexion. |
| Donnees de tableau de bord manquantes | Afficher les sections disponibles sans bloquer toute la page. |
| Commande recemment creee introuvable | Rester sur le tableau de bord et afficher un message d'erreur simple. |

## Cas speciaux

- Le tableau de bord n'est accessible qu'apres connexion.
- Les compteurs et listes doivent se mettre a jour apres creation, modification ou suppression d'un element.
- Les commandes recentes visibles depuis le tableau de bord doivent renvoyer vers la commande correspondante.
- Les alertes de stock sont purement informatives et ne remplacent pas la fiche `admin-stock.md`.
- Le tableau de bord ne remplace pas `admin-commandes.md`, `admin-produits.md`, `admin-stock.md` ou `categories-sous-categories.md`.

## Regles metier

- L'admin doit etre connectee pour acceder au tableau de bord.
- Le tableau de bord est une vue centrale, pas une source de donnees distincte.
- Les informations affichees proviennent des modules de gestion existants.
- Les clientes ne voient pas le tableau de bord admin.
- Les compteurs ne doivent pas etre presents si une donnee n'existe pas encore.

## Critères d'acceptation

- L'admin peut voir un resume de l'activite de la boutique.
- L'admin peut voir les nouvelles commandes.
- L'admin peut ouvrir une commande depuis le tableau de bord.
- L'admin peut acceder aux produits, au stock et aux categories depuis le tableau de bord.
- L'admin peut se deconnecter depuis le tableau de bord.
- Une cliente ne peut pas acceder au tableau de bord.
