# Changelog - Admin Authentification

## V1 - Authentification admin livree

- Connexion admin avec cookie signe HTTP-only.
- Deconnexion admin.
- Protection serveur des pages et actions admin.

## 2026-06-08 - Limitation des tentatives admin

- Ajout d'une limitation temporaire apres tentatives repetees de connexion admin echouees.
- Conservation d'un message d'erreur generique pour ne pas reveler si l'identifiant existe.
- Remise a zero de la limitation apres connexion reussie.

## 2026-06-02 - Verification protection admin

- Redirection de `/admin` vers `/admin/login` verifiee sans session.
- Routes admin verifiees avec session valide.
