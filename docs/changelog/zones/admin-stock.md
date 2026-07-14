# Journal Des Changements - Stock Admin

## V1 - Gestion stock livree

- Consultation du stock exact cote admin.
- Ajout, retrait et correction du stock.
- Refus des valeurs negatives ou non entieres.

## 2026-06-07 - Restauration du stock apres annulation

- Restauration automatique du stock lors du premier passage d'une commande au statut `CANCELLED`.
- Protection contre une double remise en stock si la commande etait deja annulee.

## 2026-06-02 - Verification admin stock

- Page `/admin/stock` verifiee avec session valide.
- Correction CSS appliquee pour eviter les boutons d'action coupes.
