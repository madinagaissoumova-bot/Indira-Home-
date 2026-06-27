---
name: frontend-ux
description: Improve frontend usability, interaction design, navigation, forms, conversion flows, labels, feedback, loading and error states, accessibility-minded polish, and responsive user journeys. Use when the user asks for a better frontend UX, clearer flow, smoother interface, less friction, better forms, better states, or a usability audit.
---

# Frontend UX

Use this skill when the problem is how the interface works for a user: clarity, flow, feedback, ergonomics, and confidence.

## Workflow

1. Identify the user's goal and the page or flow that supports it.
2. Map the current path: entry, decision points, action, confirmation, recovery.
3. Fix confusion before decoration: labels, hierarchy, state, navigation, and feedback.
4. Make forms, buttons, tables, filters, and navigation predictable.
5. Verify with realistic data, empty states, errors, and mobile behavior.

## UX Checks

- The next action is obvious and named accurately.
- Primary and secondary actions are visually distinct.
- Forms explain required input only where needed and show errors near fields.
- Loading, empty, disabled, success, and failure states are present and honest.
- Navigation lets the user move forward, back, and recover from dead ends.
- Interface text matches what the system actually does.
- Keyboard focus, labels, contrast, and tap targets are reasonable.

## Implementation Guidance

- Prefer improving existing components and patterns over adding a new design system.
- Keep changes close to the affected flow.
- Use icons only when they clarify the action; otherwise use direct labels.
- Avoid adding explanatory copy inside the app when better structure or labels solve the issue.
- Preserve business rules and backend truth; never make UX imply an action succeeded before it has.

## Guardrails

- Do not optimize visuals while leaving the flow ambiguous.
- Do not add new steps unless they remove larger confusion.
- Do not hide critical actions or errors behind subtle styling.
