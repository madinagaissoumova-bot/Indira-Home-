# Specification Fonctionnelle - Admin auth

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
| Secret de session | Secret serveur pour signer la session | Oui |

## Decision V1

La V1 utilise un seul compte admin configure par variables d'environnement :

- `ADMIN_USERNAME` pour l'identifiant ;
- `ADMIN_PASSWORD_HASH` pour le mot de passe hashe avec bcrypt ;
- `ADMIN_SESSION_SECRET` pour signer la session.

La session admin est conservee dans un cookie HTTP-only signe cote serveur. En production, le cookie doit utiliser `Secure` et `SameSite=Lax`.

Le cookie de session V1 doit etre nomme `indira_admin_session`.

La duree de session doit etre limitee, par exemple 7 jours maximum.

Le mot de passe en clair ne doit jamais etre stocke dans le code, dans la base ou dans les logs. La comparaison du mot de passe doit se faire cote serveur avec le hash configure.

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
| Session invalide ou falsifiee | Supprimer le cookie si possible et rediriger vers la connexion. |
| Requete admin sans session | Refuser l'action cote serveur. |

## Cas speciaux

- Une cliente ne doit jamais acceder a l'espace admin.
- L'admin ne doit pas pouvoir utiliser les fonctions de gestion sans etre connectee.
- Si la session expire, l'admin doit se reconnecter avant de continuer.
- La connexion admin ne concerne qu'un compte de gestion, pas un compte cliente.
- La fonctionnalite ne doit pas creer de compte pour les clientes.
- En V1, il n'y a qu'un seul compte admin.
- Si plusieurs admins deviennent necessaires plus tard, une table `AdminUser` pourra etre ajoutee.
- Les actions de modification admin ne doivent pas etre executees avec des requetes GET.
- Une action admin qui echoue pour cause de session expiree ne doit pas appliquer de modification partielle.
- Les tentatives de connexion repetees doivent etre limitees ou ralenties cote serveur.

## Regles metier

- L'admin doit etre connectee pour acceder aux fonctions de gestion.
- Un seul compte admin suffit pour la V1.
- Les clientes ne se connectent pas pour commander.
- L'espace admin doit etre isole du parcours client.
- Une fois deconnectee, l'admin ne doit plus acceder aux pages sensibles sans nouvelle connexion.
- Les identifiants de connexion ne sont pas visibles cote cliente.
- Le mot de passe admin ne doit pas etre stocke en clair.
- Les routes et actions admin doivent verifier la session cote serveur, pas seulement cote interface.
- Le hash de mot de passe admin utilise bcrypt.
- Le cookie admin est HTTP-only et signe cote serveur.
- Le cookie admin utilise `Secure` en production.
- Les mutations admin doivent verifier la session avant toute ecriture.
- Les erreurs de connexion ne doivent pas reveler si l'identifiant admin existe.

## Critères d'acceptation

- L'admin peut se connecter.
- L'admin peut se deconnecter.
- La V1 fonctionne avec un seul compte admin.
- L'admin ne peut pas acceder aux fonctions sensibles sans connexion.
- Une session expiree renvoie vers la connexion.
- Une cliente ne peut pas acceder a l'espace admin.
- Une requete de modification admin sans session valide ne modifie aucune donnee.
- Des tentatives de connexion repetees dans un intervalle court sont limitees ou ralenties.
