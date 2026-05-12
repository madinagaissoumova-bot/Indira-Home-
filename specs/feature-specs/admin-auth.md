# Feature Spec - Admin auth

## Objectif

Permettre a l'admin d'acceder a l'espace de gestion Indira Home de maniere securisee.

Cette fonctionnalite protege les fonctions sensibles comme les produits, le stock, les categories et les commandes.

## Utilisatrices concernees

- Admin

## Donnees necessaires

| Donnee | Description | Obligatoire |
| --- | --- | --- |
| Identifiant admin | Identifiant de connexion de l'admin | Oui |
| Mot de passe | Mot de passe de connexion | Oui |
| Session active | Etat de connexion maintenu apres authentification | Oui |

## Actions possibles

L'admin peut :

- Se connecter a l'espace admin.
- Se deconnecter de l'espace admin.
- Acceder aux fonctions admin uniquement si elle est connectee.
- Rester connectee pendant une session normale.
- Etre redirigee vers la connexion si la session expire.

## Boutons / commandes

| Bouton / commande | Role |
| --- | --- |
| Se connecter | Ouvrir la session admin |
| Se deconnecter | Fermer la session admin |
| Annuler | Quitter l'ecran de connexion |

## Messages

| Situation | Message attendu |
| --- | --- |
| Connexion reussie | Connexion reussie. |
| Deconnexion reussie | Vous etes deconnectee. |
| Identifiant ou mot de passe invalide | Identifiant ou mot de passe incorrect. |
| Session expiree | Votre session a expiree. Veuillez vous reconnecter. |
| Acces refuse | Vous devez etre connectee pour acceder a cette page. |

Les messages admin pourront etre affiches en russe dans l'interface finale.

## Erreurs

| Erreur | Comportement attendu |
| --- | --- |
| Identifiant vide | Refuser la connexion et demander l'identifiant. |
| Mot de passe vide | Refuser la connexion et demander le mot de passe. |
| Identifiant ou mot de passe incorrect | Refuser la connexion sans donner acces a l'espace admin. |
| Session inexistante | Rediriger vers la page de connexion. |

## Cas speciaux

- Une cliente ne doit jamais acceder a l'espace admin.
- L'admin ne doit pas pouvoir utiliser les fonctions de gestion sans etre connectee.
- Si la session expire, l'admin doit se reconnecter avant de continuer.
- La connexion admin ne concerne qu'un compte de gestion, pas un compte cliente.
- La fonctionnalite ne doit pas creer de compte pour les clientes.
- En V1, il n'y a qu'un seul compte admin.

## Regles metier

- L'admin doit etre connectee pour acceder aux fonctions de gestion.
- Un seul compte admin suffit pour la V1.
- Les clientes ne se connectent pas pour commander.
- L'espace admin doit etre isole du parcours client.
- Une fois deconnectee, l'admin ne doit plus acceder aux pages sensibles sans nouvelle connexion.
- Les identifiants de connexion ne sont pas visibles cote cliente.

## Critères d'acceptation

- L'admin peut se connecter.
- L'admin peut se deconnecter.
- La V1 fonctionne avec un seul compte admin.
- L'admin ne peut pas acceder aux fonctions sensibles sans connexion.
- Une session expiree renvoie vers la connexion.
- Une cliente ne peut pas acceder a l'espace admin.
