# Visual Rules - Indira Home

Ce fichier definit la direction visuelle et les regles de presentation de la V1.

Il ne definit pas les parcours, les routes, les regles metier, les textes, les statuts ou les criteres fonctionnels. Ces elements sont documentes dans les feature specs, les specs techniques, `docs/specs/content/ru-copy.md` et `docs/specs/validation-rules.md`.

## Intention

L'interface doit inspirer confiance, rester simple a utiliser sur telephone et mettre les produits au premier plan.

Indira Home vend des objets pour la maison. Le rendu doit etre chaleureux, propre, lisible et plus raffine que domestique ordinaire. Les photos produit sont l'element visuel principal.

La direction visuelle doit rester claire, douce, chaleureuse et premium. Les choix de palette detailles sont portes par le skill `indira-design-system`.

## Principes Visuels

- Mobile-first dans la composition visuelle.
- Produit et photo avant decoration.
- Interface claire, aeree et facile a scanner.
- Hierarchie nette entre titre, contenu, prix, action principale et informations secondaires.
- Une seule action principale dominante par zone visuelle.
- Rendu client chaleureux et raffine.
- Rendu admin plus dense, utilitaire et facile a scanner.
- Etats visuels visibles pour chargement, vide, erreur, indisponibilite, succes et action admin reussie.

## Typographie

- Utiliser une police lisible avec bon support cyrillique.
- Garder une hierarchie claire entre titres, sections, noms produits, prix et actions.
- Garder les noms produits lisibles meme quand ils sont longs.
- Rendre les prix faciles a reperer.
- Eviter les tailles enormes hors titre de page ou zone editoriale principale.
- Favoriser une typographie elegante et nette, pas trop clinique.
- Ne pas utiliser de texte trop petit sur mobile.

## Images Et Medias

- Les photos produit doivent etre l'element visuel dominant.
- Les images manquantes doivent etre gerees par un etat visuel propre, sans casser la grille.
- Les futures images de collection ou de categorie doivent pouvoir s'integrer sans changer toute la direction visuelle.

## Mise En Page

- Composer d'abord pour mobile, puis enrichir tablette et desktop.
- Garder les sections lisibles, avec une respiration reguliere.
- Eviter de multiplier les grands blocs pleins largeur sur une meme page.
- Eviter les cartes imbriquees dans d'autres cartes.
- Garder les toolbars, filtres, listes et tableaux visuellement stables.
- Les layouts desktop peuvent etre plus larges, mais ne doivent pas rendre l'information plus difficile a scanner.

## Boutons Et Actions

- Une seule action principale par zone visuelle.
- Les actions dangereuses utilisent un style distinct.
- Les boutons doivent avoir une hauteur confortable sur mobile.
- Les icones peuvent etre utilisees quand elles aident vraiment la comprehension.
- Les etats hover, focus, actif et desactive doivent etre visibles.

## Responsive

### Mobile

- Prioriser une lecture verticale claire.
- Eviter les colonnes trop etroites.
- Garder les actions principales faciles a toucher.
- Les cartes, boutons, champs et compteurs doivent rester stables et lisibles.

### Tablette Et Desktop

- Utiliser l'espace supplementaire pour ameliorer le scan, pas pour ajouter du bruit.
- Les grilles peuvent s'elargir si les images restent lisibles.
- Les tableaux admin peuvent etre plus denses, tout en gardant badges, actions et colonnes lisibles.

## Accessibilite Visuelle

- Contraste suffisant pour textes, prix, boutons, badges et erreurs.
- Les etats ne doivent pas dependre seulement de la couleur.
- Les champs de formulaire doivent avoir des labels.
- Les boutons doivent avoir un texte ou label comprehensible.
- Les images produit doivent avoir un texte alternatif simple quand c'est possible.
- Les focus clavier doivent rester visibles.

## A Eviter

- Ajouter trop de texte explicatif cote interface.
- Utiliser des effets visuels lourds.
- Multiplier les cartes imbriquees.
- Utiliser des boutons minuscules sur mobile.
- Laisser les textes deborder dans les cartes ou boutons.
