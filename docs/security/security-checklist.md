# Security Checklist - Indira Home V1

Cette checklist couvre le minimum securite attendu pour la V1.

## Auth admin

- `ADMIN_USERNAME` vient d'une variable d'environnement.
- `ADMIN_PASSWORD_HASH` vient d'une variable d'environnement.
- Le mot de passe admin n'est jamais stocke en clair.
- Le hash utilise bcrypt.
- `ADMIN_SESSION_SECRET` vient d'une variable d'environnement.
- Le cookie admin est HTTP-only.
- Le cookie admin est signe cote serveur.
- Le cookie admin s'appelle `indira_admin_session`.
- Le cookie admin utilise `Secure` en production.
- Le cookie admin utilise `SameSite=Lax`.
- La session a une duree limitee.
- Logout invalide ou supprime la session.

## Protection admin

- `/admin` redirige vers `/admin/login` sans session.
- `/admin/*` redirige vers `/admin/login` sans session.
- Toutes les actions admin verifient la session cote serveur.
- Aucune mutation admin ne se fait via requete GET.
- Une session expiree ne provoque pas d'ecriture partielle.
- Une session falsifiee est refusee.

## Donnees personnelles

- Les pages publiques n'affichent jamais le telephone cliente.
- Les pages publiques n'affichent jamais l'adresse cliente.
- La page confirmation n'affiche pas de donnees personnelles sensibles.
- Les commandes sont visibles seulement dans l'admin protege.
- Les notes admin ne sont jamais visibles cote public.
- Les logs serveur n'ecrivent pas inutilement telephone ou adresse.
- Les erreurs publiques ne montrent pas de stack trace.

## Commandes et stock

- Le panier `localStorage` n'est jamais considere fiable.
- Le serveur recalcule prix, stock et total.
- La commande est creee dans une transaction.
- Le stock est decremente dans la meme transaction.
- Si une ligne echoue, aucune commande n'est creee.
- Si une ligne echoue, aucun stock ne diminue.
- Deux commandes concurrentes sur le dernier stock ne peuvent pas rendre le stock negatif.
- Les prix commandes sont stockes en snapshots.
- Les snapshots commande ne changent pas apres modification produit.

## Catalogue public

- Brouillons invisibles cote cliente.
- Produits masques invisibles cote cliente.
- Categories masquees invisibles cote cliente.
- Sous-categories masquees invisibles cote cliente.
- Produit dans categorie masquee inaccessible meme par URL directe.
- Produit dans sous-categorie masquee inaccessible meme par URL directe.
- Stock exact jamais affiche cote cliente.
- Produit stock 0 visible si publie, mais non commandable.

## Entrees utilisateur

- Nom cliente valide cote serveur.
- Telephone ou WhatsApp valide cote serveur.
- Adresse ou zone validee cote serveur.
- Mode de paiement limite aux constantes autorisees.
- Quantite panier entiere et minimum 1.
- Prix produit entier et strictement superieur a 0.
- Stock entier et superieur ou egal a 0.
- URLs images validees avant publication produit.
- Slugs limites a lettres latines minuscules, chiffres et tirets.

## Secrets et production

- Aucun secret dans le code source.
- Aucun secret dans les logs.
- Variables production differentes du developpement.
- Sauvegarde base disponible avant lancement.
- Migrations executees de facon controlee.
- Rollback documente dans `../project-management/production-plan.md`.

## Verification avant livraison V1

- Tester acces admin sans session.
- Tester action admin sans session.
- Tester commande avec produit masque.
- Tester commande avec categorie masquee.
- Tester commande avec stock insuffisant.
- Tester confirmation ouverte directement.
- Tester logs lors d'une erreur checkout.
