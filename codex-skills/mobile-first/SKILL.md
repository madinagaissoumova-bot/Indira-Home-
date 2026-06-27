---
name: mobile-first
description: Design, implement, or audit interfaces from the phone experience first. Use when the user asks for mobile-first UI, phone-first layouts, mobile ergonomics, responsive behavior starting from small screens, tap target improvements, mobile navigation, or mobile checkout/form/catalogue flows.
---

# Mobile First

Use this skill when the mobile experience must drive the interface decisions, not merely be adapted after desktop.

## Workflow

1. Start from the primary mobile task and the smallest practical viewport.
2. Place content in the order a phone user needs it: identity, context, primary action, supporting details.
3. Design one-column structure first; add multi-column desktop layouts only after the mobile flow works.
4. Prioritize tap comfort, readable text, stable controls, and clear next actions.
5. Verify that desktop did not regress after mobile changes.

## Mobile Priorities

- Keep the main action reachable without hunting.
- Prefer compact navigation, drawers, segmented controls, and stacked forms on small screens.
- Avoid desktop-only assumptions such as hover-only actions, wide tables, cramped toolbars, or side-by-side forms.
- Keep tap targets comfortable and separated.
- Keep product cards, form rows, counters, and toolbar controls dimensionally stable.
- Do not shrink text until it becomes hard to read; simplify layout first.

## Verification

- Check at phone, tablet, and desktop widths when the app can run locally.
- Inspect overflow, clipped labels, text wrapping, fixed-width elements, and horizontal scroll.
- Test the main path with realistic content length.
- Confirm that empty, loading, error, disabled, and success states remain usable on mobile.

## Guardrails

- Do not turn a catalogue, dashboard, form, or tool into a marketing page just because it is mobile.
- Do not hide critical information behind weak icons or unexplained controls.
- Do not solve mobile problems by removing required functionality.
