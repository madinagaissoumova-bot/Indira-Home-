---
name: indira-admin-flow
description: Use when working on Indira Home admin authentication, dashboard, products, categories, stock, orders, admin routes, admin actions, or protected management workflows.
---

# Indira Admin Flow

Use this skill for admin work.

## Read First

Use the relevant files:

- `docs/specs/feature-specs/admin-auth.md`
- `docs/specs/feature-specs/admin-dashboard.md`
- `docs/specs/feature-specs/admin-produits.md`
- `docs/specs/feature-specs/categories-sous-categories.md`
- `docs/specs/feature-specs/admin-stock.md`
- `docs/specs/feature-specs/admin-commandes.md`
- `docs/specs/validation-rules.md`
- `docs/development-plans/lot-4-auth-dashboard-admin.md`
- `docs/development-plans/lot-5-admin-catalogue.md`
- `docs/development-plans/lot-6-admin-stock.md`
- `docs/development-plans/lot-7-admin-commandes.md`

## Routes

- `/admin/login`
- `/admin`
- `/admin/products`
- `/admin/products/:id`
- `/admin/categories`
- `/admin/stock`
- `/admin/orders`
- `/admin/orders/:id`

## Auth Rules

- Admin uses one V1 account from env vars.
- Required env vars: `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`.
- `ADMIN_PASSWORD_HASH` is bcrypt.
- Session cookie: `indira_admin_session`.
- Cookie must be HTTP-only, signed server-side, `SameSite=Lax`, and `Secure` in production.
- All admin pages and actions verify session server-side.
- No admin mutation via GET.

## Admin Product Rules

- Draft can be incomplete.
- Publishing requires name, description, price, image, category, subcategory and valid stock.
- Hidden products are invisible to customers.
- Product already present in a validated order cannot be permanently deleted in V1.
- Use hiding for long-term removal when order history exists.

## Admin Stock Rules

- Stock is exact and admin-only.
- Stock must be an integer >= 0.
- Stock 0 means customer-visible out of stock if product is published and visible.
- Manual corrections after cancellation or phone changes are allowed.
- Automatic stock decrease happens only during successful order validation.

## Admin Order Rules

- Orders contain personal data and are admin-only.
- Order item snapshots must stay readable after product changes.
- Status changes are manual.
- Cancellation does not automatically restore stock in V1.
- Notes are internal only.

## Before Finishing

- verify route/action protection;
- verify customer data is not public;
- verify destructive actions ask confirmation;
- verify constants from `lib/constants.ts` are used.
