# Feature Spec - Admin dashboard

## Objectif

Permettre a l'admin de voir une vue centrale de l'activite de la boutique Indira Home apres connexion.

Le tableau de bord sert de resume simple de l'activite. La navigation admin separee sert de point d'entree vers les sections de gestion.

## Utilisatrices concernees

- Admin

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Chiffre d'affaires | Somme des commandes non annulees | Oui |
| Nombre de commandes | Total des commandes recues | Oui |
| Nombre de produits | Total des produits geres | Oui |
| Produits en rupture | Nombre de produits publies avec stock `0` | Oui |
| Commandes recentes | Liste des dernieres commandes recues | Oui |
| Produits recemment ajoutes | Liste courte des derniers produits crees | Oui |

## Actions possibles

L'admin peut :

- Voir les indicateurs essentiels de la boutique.
- Ouvrir une commande depuis le tableau de bord.
- Voir les derniers produits ajoutes.
- Utiliser la navigation admin pour aller vers les produits, categories, commandes, stock et autres sections.
- Se deconnecter.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Ligne de commande recente | Ouvrir le detail de la commande correspondante |
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
- Les indicateurs et listes doivent se mettre a jour apres creation, modification ou suppression d'un element.
- Les commandes recentes visibles depuis le tableau de bord doivent renvoyer vers la commande correspondante.
- Le tableau de bord ne remplace pas `admin-commandes.md`, `admin-produits.md`, `admin-stock.md` ou `categories-sous-categories.md`.
- Les raccourcis metier ne doivent pas etre affiches comme gros boutons principaux sur le dashboard.
- La navigation admin doit rester simple et claire : Dashboard, Produits, Categories, Commandes, Clients, Stock, Parametres.
- Les sections non implementees en V1 peuvent apparaitre comme elements desactives, sans creer de route inutile.
- La deconnexion peut etre placee a part des raccourcis metier, par exemple en bas a droite de l'interface admin.

## Regles metier

- L'admin doit etre connectee pour acceder au tableau de bord.
- Le tableau de bord est une vue centrale, pas une source de donnees distincte.
- Les informations affichees proviennent des modules de gestion existants.
- Les clientes ne voient pas le tableau de bord admin.
- Le chiffre d'affaires du dashboard exclut les commandes annulees.
- Le dashboard doit rester simple et lineaire : indicateurs essentiels, commandes recentes, produits recemment ajoutes.
- Les statistiques doivent etre affichees sous forme de cartes propres et alignees.
- Les commandes recentes doivent etre affichees en tableau avec numero, cliente, date, statut, total et action d'ouverture.

## Critères d'acceptation

- L'admin peut voir le chiffre d'affaires, le nombre de commandes, le nombre de produits et le nombre de produits en rupture.
- L'admin peut voir les commandes recentes dans un tableau clair.
- L'admin peut voir les produits recemment ajoutes.
- L'admin peut ouvrir une commande depuis le tableau de bord.
- L'admin peut acceder aux produits, categories, commandes et stock via la navigation admin.
- L'admin peut se deconnecter depuis le tableau de bord.
- Une cliente ne peut pas acceder au tableau de bord.
