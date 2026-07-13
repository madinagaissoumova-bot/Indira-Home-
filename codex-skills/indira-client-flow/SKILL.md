---
name: indira-client-flow
description: Use when working on Indira Home customer-facing catalogue, categories, product detail, cart, checkout, confirmation, mobile UX, or Russian customer copy.
---

# Indira Client Flow

Use this skill for public customer experience work.

## Read First

Use the relevant files:

- `docs/specs/feature-specs/catalogue-produits.md`
- `docs/specs/feature-specs/categories-sous-categories.md`
- `docs/specs/feature-specs/fiche-produit.md`
- `docs/specs/feature-specs/panier.md`
- `docs/specs/feature-specs/validation-commande.md`
- `docs/specs/feature-specs/confirmation-commande.md`
- `docs/specs/visual-rules.md`
- `lib/i18n/ru.ts`
- relevant files in `docs/changelog/zones/`

## Routes

- `/`
- `/category/:slug`
- `/subcategory/:slug`
- `/product/:slug`
- `/cart`
- `/checkout`
- `/checkout/confirmation`

## Customer Rules

- All customer-visible text is in Russian.
- Prices are displayed in roubles.
- Customers do not create accounts.
- No online payment in V1.
- Delivery is limited to the Chechen Republic.
- Store public WhatsApp: `+7 988 906-41-06`.
- Do not display exact stock to customers.
- Published stock 0 products stay visible but are not orderable.
- Draft or hidden products are not visible.
- Products in hidden categories or subcategories are not visible, even by direct product URL.

## Cart Rules

Store only this in `localStorage`:

- `productId`
- `quantity`

Never trust browser cart data for price, stock, status, category visibility, or total. Recalculate server-side before checkout/order.

## UX Rules

- Mobile-first.
- Catalogue is the first useful screen, not a marketing landing page.
- Keep product cards stable and readable.
- Use clear empty states and errors.
- Do not add long explanations to the customer UI.

## Implementation Checklist

Before finishing customer work:

- customer text is Russian;
- no exact stock appears;
- out-of-stock products cannot be added;
- hidden category/subcategory products are inaccessible;
- checkout has no online payment;
- confirmation exposes no customer phone or address;
- mobile layout does not overflow.
