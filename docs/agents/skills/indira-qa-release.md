---
name: indira-qa-release
description: Use when verifying Indira Home V1, running QA, reviewing release readiness, checking security, production setup, tests, mobile behavior, or compliance with the V1 specs.
---

# Indira QA Release

Use this skill for QA, review, and release readiness.

## Read First

- `docs/testing/test-plan.md`
- `docs/security/security-checklist.md`
- `docs/project-management/production-plan.md`
- `docs/project-management/status.md`
- `docs/project-management/tickets.md`
- relevant feature specs for the area under review

## Verification Commands

Run when appropriate:

- `npm run prisma:generate`
- `npm run build`

If available:

- `npm run lint`
- `npm test`
- `npm run prisma:migrate`
- `npm run prisma:seed`

## Critical QA Areas

Customer:

- catalogue shows only public products;
- hidden categories/subcategories do not leak products;
- stock 0 visible but not orderable;
- cart stores only `productId` and `quantity`;
- checkout recalculates server-side;
- confirmation exposes no customer phone or address;
- all customer text is Russian.

Admin:

- admin routes require session;
- admin actions require session server-side;
- product publication validation works;
- deletion of ordered products is blocked;
- stock cannot become negative;
- order snapshots remain stable;
- order personal data is admin-only.

Release:

- `DATABASE_URL` production is set;
- admin env vars are set;
- no secrets in code;
- backup/rollback is planned;
- no online payment is present;
- delivery limit to the Chechen Republic is visible.

## Reporting Style

Lead with blockers and regressions. Include file references when reviewing code. Keep summaries short and concrete.
