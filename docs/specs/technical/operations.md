# Technical Spec - Operations

## Suppression et archivage

- Masquer un produit est l'action normale pour le retirer du catalogue client.
- Supprimer definitivement un produit est autorise seulement si cela ne casse pas l'historique.
- Si un produit a deja ete commande, la suppression definitive est bloquee en V1.
- Si l'admin veut retirer durablement un produit deja commande, elle doit le masquer.
- Les commandes doivent rester lisibles grace aux snapshots de nom, image, prix et quantite.
- Les categories et sous-categories contenant des produits ne doivent pas etre supprimees.

Pour la V1, le comportement recommande est :

- produit actif mais non visible : statut `HIDDEN` ;
- produit en preparation : statut `DRAFT` ;
- produit visible : statut `PUBLISHED` ;
- produit retire durablement mais lie a un historique : statut `HIDDEN`, avec suppression definitive bloquee.

Le statut `archived` n'est pas obligatoire en V1. Il pourra etre ajoute plus tard si la boutique a besoin de distinguer les produits temporairement masques des produits retires durablement.

## Livraison V1

- La livraison V1 est limitee a la Republique tchetchene.
- Le formulaire demande une adresse ou une zone en texte libre.
- La validation automatique doit au minimum refuser un champ vide.
- Si une zone hors Republique tchetchene est clairement detectee, la validation doit etre bloquee.
- Si la zone est ambigue mais non vide, la commande peut etre recue et la boutique confirme manuellement la livraison.
- Le site affiche clairement que la livraison est limitee a la Republique tchetchene.
- La confirmation finale de la zone se fait manuellement par la boutique lors du contact telephone ou WhatsApp.

Une liste stricte de villes ou zones autorisees pourra etre ajoutee plus tard si la boutique veut automatiser ce controle.

## Traitement manuel des commandes V1

- La boutique traite les commandes depuis l'espace admin et contacte les clientes par telephone ou WhatsApp.
- En V1, la livraison est effectuee par l'admin. Elle remet la commande et recupere l'argent en especes lorsque le mode de paiement est `CASH_ON_DELIVERY`.
- Si une commande preparee ne peut pas etre remise car la cliente ne repond pas a l'appel ou est absente, l'admin laisse un message vocal sur WhatsApp et attend 24 heures.
- Sans reponse de la cliente apres ce delai de 24 heures, l'admin annule la commande, ajoute une note interne et corrige le stock manuellement pour remettre les articles en ligne si besoin.
- Si un paiement a deja ete recu, la boutique doit organiser manuellement une nouvelle remise ou un remboursement hors site avant de cloturer la commande.
- Les paiements V1 sont uniquement hors ligne : especes a la remise ou virement apres confirmation.
- La V1 ne verifie pas automatiquement les paiements et ne gere pas de preuves televersees obligatoires.
- La note interne de commande sert de trace minimale pour les confirmations de paiement, annulations, remboursements manuels, remplacements et corrections.
- Si un produit manque apres confirmation ou si une erreur de prix est decouverte, la boutique contacte la cliente. Les options V1 sont remplacement accepte, retrait du produit avec ajustement manuel, ou annulation.

## Hors perimetre operationnel V1

La V1 ne contient pas :

- de samovyvoz / retrait en boutique ;
- de QR-code de paiement, retrait ou suivi ;
- de gestion de coursiers, livreurs, tournees ou affectations ;
- de commission plateforme ;
- de paiement en ligne ;
- de statut de paiement separe ;
- de reconciliation bancaire automatique ;
- de remboursement automatise ;
- de calcul complexe des frais de livraison.

Ces sujets ne doivent pas etre implementes par deduction. Ils pourront etre ajoutes seulement dans un plan futur valide.

## Confidentialite des donnees

- Le site collecte uniquement les informations necessaires a la commande : nom, telephone ou WhatsApp, adresse ou zone de livraison.
- Ces donnees servent uniquement a traiter, confirmer et livrer la commande.
- Les informations cliente ne doivent pas etre affichees cote public.
- L'espace admin doit etre protege avant toute consultation de commandes.
- Les logs serveur ne doivent pas exposer inutilement les numeros de telephone ou adresses.
- Un export ou une sauvegarde des commandes doit rester protege.
- Une page publique de confidentialite doit expliquer simplement quelles donnees sont collectees et pourquoi.
- La page confidentialite ne doit pas promettre un delai de suppression automatique non implemente.
- Les commandes peuvent etre conservees aussi longtemps que necessaire pour le suivi commercial et les obligations applicables.

## Hebergement et configuration

La decision finale dependra du framework choisi, mais la V1 doit prevoir :

- Une base de donnees persistante.
- Un stockage d'images.
- Des variables d'environnement pour les secrets.
- Un environnement de production protege.
- Des sauvegardes ou export possible des donnees commandes/produits.
- Un mecanisme de migration de schema.
- Un journal minimal des erreurs serveur pour depister les echecs de validation ou de session.

## Decision V1 hebergement

- Framework : Next.js App Router.
- Base V1 : Supabase PostgreSQL compatible Prisma.
- SQLite n'est plus le mode de base courant du projet.
- Images V1 : URLs externes stables, puis stockage dedie plus tard.
- Secrets : uniquement via variables d'environnement.
- Deploiement : environnement Node.js compatible Next.js App Router, Prisma et Supabase PostgreSQL.
- Sauvegarde : export regulier de la base de donnees Supabase avant et apres changements importants.
- Logs : erreurs serveur generales autorisees, mais sans numero de telephone, adresse complete ou secrets.

## Sauvegarde et export V1

Avant la mise en production, la boutique doit disposer au minimum :

- d'une procedure d'export manuel de la base ;
- d'une sauvegarde avant chaque migration ;
- d'une sauvegarde avant import massif ou suppression importante ;
- d'un test de restauration sur un environnement non production si possible.

Pour la V1, un export CSV des commandes depuis l'admin peut etre ajoute plus tard, mais il doit rester protege par session admin.

## Tests attendus

- Filtrage, recherche et tri catalogue.
- Produit epuise non commandable.
- Produit masque invisible.
- Panier avec quantite maximale bloquee.
- Validation impossible avec panier invalide.
- Validation reussie qui cree une commande et diminue le stock.
- Concurrence sur dernier produit : une seule commande doit reussir.
- Tableau de bord admin : compteurs, commandes recentes et liens rapides.
- Authentification admin : acces refuse sans session.
- Admin produit : publication impossible si champs obligatoires manquants.
- Admin categorie : suppression impossible si produits associes.
- Admin commande : changement de statut et conservation des prix snapshots.

La checklist complete de verification V1 est definie dans `docs/testing/test-plan.md`.
