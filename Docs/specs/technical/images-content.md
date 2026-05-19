# Technical Spec - Images Et Contenu

## Gestion des images

- Chaque produit publie doit avoir au moins une photo.
- Une photo principale doit etre definie par la premiere image ou un champ equivalent.
- Les images doivent etre optimisees pour mobile.
- Les images manquantes ne doivent pas permettre la publication.
- Les commandes peuvent garder une reference ou un snapshot de l'image principale pour rester lisibles apres modification produit.
- Les uploads admin doivent limiter les formats image acceptes aux formats standards du framework retenu.
- Les images supprimees d'un produit deja commande ne doivent pas casser l'affichage du snapshot de commande.
- Les photos, noms, descriptions, prix et categories des produits doivent etre geres par l'admin depuis l'espace admin, sans intervention technique.

## Decision V1 images

Pour eviter de bloquer le developpement sur un systeme d'upload, la V1 peut commencer avec des URLs d'images saisies ou collees dans l'admin. Les images doivent etre servies depuis une source stable et optimisee.

Dans le code Next.js, les images produit peuvent etre rendues avec `next/image` en mode `unoptimized` tant que l'admin peut saisir des URLs libres. Si la boutique choisit plus tard un fournisseur stable, les domaines devront etre declares dans `next.config.ts` pour beneficier de l'optimisation Next.js.

Une evolution ulterieure pourra ajouter un vrai upload admin vers un stockage dedie comme Cloudinary, S3 ou un stockage equivalent. Les regles de formats acceptes s'appliquent seulement si cet upload est ajoute.

## Internationalisation

- Les textes visibles par les clientes sont en russe.
- Les categories et sous-categories visibles par les clientes sont en russe.
- Les specs restent en francais.
- L'admin peut aussi etre en russe dans l'interface finale, meme si la specification documente les comportements en francais.
- Les identifiants techniques, enums et champs de donnees peuvent rester en anglais dans la base et l'API.

Pour la V1, les textes d'interface client doivent etre centralises autant que possible dans un fichier de contenu ou de constantes, par exemple `lib/content/ru.ts`, afin d'eviter des traductions dispersees dans tout le code.
