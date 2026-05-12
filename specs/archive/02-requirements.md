# Exigences

## Exigences fonctionnelles

Utiliser des identifiants stables pour pouvoir les relier aux tests et au code.

| ID | Exigence | Priorité | Source |
| --- | --- | --- | --- |
| FR-001 | Le site doit afficher un catalogue de produits en russe. | Must | Global spec |
| FR-002 | Le site doit permettre de classer les produits par categories. | Must | Global spec |
| FR-003 | Chaque produit doit avoir au minimum un nom, une ou plusieurs photos, un prix en roubles, une disponibilite et une description. | Must | Global spec |
| FR-004 | Une cliente doit pouvoir ajouter un ou plusieurs produits a une commande. | Must | Global spec |
| FR-005 | Une cliente doit pouvoir consulter son panier avant validation. | Must | Global spec |
| FR-006 | Une cliente doit pouvoir remplir ses informations de contact et de livraison. | Must | Global spec |
| FR-007 | Le site doit confirmer clairement qu'une commande a ete envoyee. | Must | Global spec |
| FR-008 | L'admin doit pouvoir ajouter, modifier, masquer et supprimer des produits. | Must | Global spec |
| FR-009 | L'admin doit pouvoir gerer les categories de produits. | Should | Global spec |
| FR-010 | L'admin doit pouvoir modifier le stock disponible d'un produit. | Must | Global spec |
| FR-011 | Le stock d'un produit doit diminuer automatiquement apres une commande validee. | Must | Global spec |
| FR-012 | L'admin doit pouvoir corriger manuellement le stock apres une commande, une erreur ou un reassort. | Must | Global spec |
| FR-013 | L'admin doit pouvoir consulter et gerer les commandes depuis un tableau de bord admin. | Must | Global spec |
| FR-014 | La premiere version doit limiter la livraison a la Republique tchetchene. | Must | Global spec |
| FR-015 | Une commande doit pouvoir indiquer le mode de paiement prevu : paiement a la livraison ou virement. | Must | Global spec |
| FR-016 | L'admin doit pouvoir voir les coordonnees necessaires pour recontacter la cliente. | Must | Global spec |
| FR-017 | La V1 doit permettre de valider une commande sans paiement en ligne. | Must | Global spec |
| FR-018 | L'admin doit recevoir les commandes validees dans le tableau de bord admin. | Must | Global spec |
| FR-019 | Le site doit indiquer a la cliente que la boutique la contactera apres validation de la commande. | Must | Global spec |

## Exigences non fonctionnelles

| ID | Exigence | Mesure attendue | Priorité |
| --- | --- | --- | --- |
| NFR-001 | Performance |  | Should |
| NFR-002 | Sécurité |  | Must |
| NFR-003 | Accessibilité |  | Should |
| NFR-004 | Maintenabilité |  | Should |
| NFR-005 | Mobile | Le parcours catalogue et commande doit etre confortable sur telephone. | Must |
| NFR-006 | Langue | Toute l'interface cliente doit etre en russe. | Must |

## Règles métier

| ID | Règle | Exemple |
| --- | --- | --- |
| BR-001 | Les prix sont affiches en roubles. | Un produit coute 2 500 RUB. |
| BR-002 | Un produit sans stock disponible ne doit pas pouvoir etre commande comme disponible. | Si le stock est 0, le produit est indisponible. |
| BR-003 | Une commande validee diminue automatiquement le stock des produits commandes. | Si le stock est 5 et la cliente commande 2 articles, le stock devient 3. |
| BR-004 | L'admin peut modifier le stock manuellement. | Apres un reassort, l'admin passe le stock de 0 a 12. |
| BR-005 | La V1 ne gere pas le paiement bancaire en ligne. | La cliente commande, puis confirme par telephone ou WhatsApp. |
| BR-006 | Une commande livree doit concerner une adresse situee en Republique tchetchene pour la premiere version. | Une adresse hors region n'est pas acceptee ou necessite un message explicatif. |
| BR-007 | Le paiement se fait apres confirmation manuelle. | Paiement a la livraison ou virement apres contact avec la vendeuse. |
| BR-008 | L'admin doit pouvoir suivre le statut manuel d'une commande. | Exemples : nouvelle, a confirmer, confirmee, livree, annulee. |
| BR-009 | Une commande V1 suit le flux panier -> informations cliente -> validation -> tableau de bord admin -> contact boutique. | La cliente ne paie pas sur le site pendant la V1. |

## Decisions prises

- Le nom de la boutique sera defini plus tard.
- Les prix seront en roubles.
- La V1 ne proposera pas de paiement bancaire en ligne integre.
- La V1 proposera un panier, un formulaire d'informations cliente, puis une validation de commande.
- Les commandes validees arriveront dans le tableau de bord admin.
- La boutique contactera ensuite la cliente par telephone ou WhatsApp.
- Le paiement V1 se fera a la livraison ou par virement.
- Le site aura un espace admin complet.
- Les commandes seront consultees et gerees depuis un tableau de bord admin.
- Le stock sera gere par l'admin et diminuera automatiquement apres commande.
- La livraison initiale sera limitee a la Republique tchetchene.

## Hypothèses

- La premiere version n'aura qu'une vendeuse/admin principale.
- Le stock exact doit etre conserve dans le systeme, meme si l'affichage public peut rester simple.

## Questions ouvertes

- Quel numero de telephone ou WhatsApp afficher pour la confirmation des commandes ?

## Evolutions possibles

- Etendre la livraison a d'autres regions plus tard.
- Ajouter plus tard un paiement en ligne integre, par exemple avec YooKassa ou une autre solution russe.
- Evaluer plus tard le statut administratif necessaire pour recevoir des paiements en ligne.
