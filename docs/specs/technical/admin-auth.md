# Specification Technique - Authentification Admin

## Principes

- Les clientes ne creent pas de compte.
- L'espace admin exige une connexion.
- Les routes/actions admin doivent verifier la session cote serveur.
- La V1 peut commencer avec un seul compte admin.
- Les identifiants admin ne doivent pas etre exposes dans le code client.
- La connexion admin doit utiliser une session server-side ou un cookie de session securise.
- Les pages `/admin` et `/admin/*` doivent rediriger vers `/admin/login` si la session est absente ou expiree.

## Decision V1

Pour la V1, l'authentification admin utilise :

- un identifiant admin stocke dans `ADMIN_USERNAME` ;
- un mot de passe admin stocke sous forme de hash bcrypt dans `ADMIN_PASSWORD_HASH` ;
- un secret de signature stocke dans `ADMIN_SESSION_SECRET` ;
- un cookie HTTP-only nomme `indira_admin_session`, `Secure` en production, `SameSite=Lax`, signe cote serveur ;
- une duree de session limitee, par exemple 7 jours maximum.

Il n'y a pas de table `AdminUser` obligatoire en V1. Si plusieurs admins deviennent necessaires plus tard, une table dediee pourra etre ajoutee.

Les actions admin qui modifient des donnees doivent verifier la session cote serveur a chaque appel. Si l'implementation utilise des formulaires ou actions serveur Next.js, la verification de session serveur est obligatoire avant toute mutation. Si une route API admin est exposee, elle doit refuser les requetes sans cookie valide et eviter les mutations GET.

La connexion admin doit limiter les tentatives repetees dans un intervalle court, ou appliquer un delai progressif equivalent, afin de reduire les essais automatises de mot de passe. Le message d'erreur ne doit pas permettre de distinguer un identifiant inconnu d'un mot de passe incorrect.
