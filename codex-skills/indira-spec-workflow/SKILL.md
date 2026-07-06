---
name: indira-spec-workflow
description: Use for any Indira Home project work that may affect specs, changelog, development plans, routes, product behavior, data rules, or implementation scope. Ensures changes follow the V1 specification and active development plan.
---

# Indira Spec Workflow

Use this skill for general Indira Home work.

## Core Rule

Before changing important behavior, read the relevant specs first. If code and specs conflict, prefer specs, then align code or specs.

## Project Context

Indira Home is a simple e-commerce site for home goods in the Chechen Republic.

V1 includes:

- public catalogue;
- category and subcategory navigation;
- product detail;
- cart in `localStorage`;
- checkout;
- confirmation;
- protected admin;
- products, categories, stock and orders management.

V1 excludes:

- customer accounts;
- online payment;
- marketplace behavior;
- delivery outside the Chechen Republic.

## Required References

Read only what is relevant:

- `AGENTS.md`
- `docs/specs/global-spec.md`
- `docs/specs/functional-map.md`
- `docs/specs/work-plan.md`
- `docs/specs/technical/routes-navigation.md`
- `docs/specs/technical/data-model.md`
- `docs/changelog/index.md`
- relevant files in `docs/changelog/zones/`
- relevant files in `docs/specs/feature-specs/`

## Workflow

1. Identify the affected route, feature, or lot.
2. Read the matching feature spec and changelog zone when useful.
3. Follow the Development Plan workflow in `AGENTS.md`.
4. Keep changes inside the active plan unless the user asks otherwise.
5. Use `lib/constants.ts` for statuses and payment methods.
6. Keep customer-facing text in Russian.
7. Do not add out-of-scope V1 features.
8. If delivered work changes documented history, update the matching changelog zone.

## Delivery Rule

`AGENTS.md` is the source of truth for plan approval, branch creation, commit, push, Pull Request, user validation, and merge.

Every new Development Plan requires a newly created branch. Never reuse an existing branch for a new plan, even when it covers a similar subject.

## Critical Invariants

- Product statuses: `DRAFT`, `PUBLISHED`, `HIDDEN`.
- Visibility statuses: `VISIBLE`, `HIDDEN`.
- Payment methods: `CASH_ON_DELIVERY`, `TRANSFER_AFTER_CONFIRMATION`.
- Order statuses: `NEW`, `TO_CONFIRM`, `CONFIRMED`, `PREPARING`, `DELIVERED`, `CANCELLED`.
- A commandable product must be published, in visible category and subcategory, and have stock greater than 0.
- A stock 0 product remains visible if published, but cannot be ordered.
- Exact stock is admin-only.
- Order prices are frozen at validation.
- Stock decreases only after successful order validation.
