# Feature Spec - Confidentialite

## Objectif

Expliquer simplement aux clientes quelles donnees personnelles sont collectees pour traiter une commande, pourquoi elles sont utilisees et comment contacter la boutique.

## Utilisatrices concernees

- Cliente

## Route

- `/privacy`

La page est publique, accessible sans compte et affichee en russe.

## Donnees et contenu obligatoires

La page doit expliquer que la boutique collecte uniquement les informations necessaires au traitement d'une commande :

- prenom et nom ;
- numero de telephone ou WhatsApp ;
- adresse ou zone de livraison ;
- contenu et montant de la commande.

La page doit expliquer que ces donnees servent uniquement a :

- contacter la cliente ;
- confirmer la commande ;
- organiser la livraison ;
- traiter les demandes de modification ou d'annulation.

La page doit rappeler que :

- les donnees de commande ne sont pas affichees sur les pages publiques ;
- l'espace admin est protege ;
- la boutique peut conserver les commandes aussi longtemps que necessaire pour le suivi commercial et les obligations applicables ;
- la cliente peut contacter la boutique sur WhatsApp au `+7 988 906-41-06` pour toute question concernant ses donnees.

## Navigation

- Un lien vers `/privacy` doit etre disponible depuis une zone publique stable, par exemple le footer.
- La cliente doit pouvoir revenir au catalogue.

## Regles metier

- La page ne doit afficher aucune donnee personnelle d'une commande.
- La page ne doit pas promettre une suppression automatique ou un delai de conservation non implemente.
- Le texte doit rester simple, court et en russe.
- Les sauvegardes, exports et commandes restent proteges comme les donnees de production.

## Critères d'acceptation

- `/privacy` est accessible sans connexion.
- La page explique quelles donnees sont collectees et pourquoi.
- La page indique que les donnees ne sont pas publiques.
- Le numero WhatsApp public de la boutique est visible.
- La page ne revele aucune donnee personnelle cliente.
- Les textes visibles sont en russe.
