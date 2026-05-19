---
name: indira-spec-workflow
description: Use for any Indira Home project work that may affect specs, roadmap, development plans, routes, product behavior, data rules, or implementation scope. Ensures changes follow the V1 specification, current roadmap, and active development plan.
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
- `Docs/specs/global-spec.md`
- `Docs/specs/functional-map.md`
- `Docs/specs/technical-specs.md`
- `Docs/specs/work-plan.md`
- `roadmap.md`
- `Docs/development-plans/status.md`
- `Docs/development-plans/tickets.md`
- relevant files in `Docs/specs/feature-specs/`

## Workflow

1. Identify the affected route, feature, or lot.
2. Read the matching feature spec and current ticket status.
3. Keep changes inside the active lot unless the user asks otherwise.
4. Use `lib/constants.ts` for statuses and payment methods.
5. Keep customer-facing text in Russian.
6. Do not add out-of-scope V1 features.
7. If work changes scope or status, update development plan docs.

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
