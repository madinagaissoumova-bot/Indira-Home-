---
name: development-plan-workflow
description: Follow a strict development plan workflow for scoped project work. Use when the user asks to create, validate, execute, move, commit, push, open, or merge a development plan; when project instructions require branch-per-plan work; or when a task needs plan approval before implementation.
---

# Development Plan Workflow

Use this skill when work must be controlled by a validated plan, branch, commit, and Pull Request.

## Workflow

1. Check the current branch and working tree.
2. Move to `main` and verify the local `main` status against `origin/main` when possible.
3. Discuss the need and write the plan content in the conversation.
4. Wait for explicit user validation before implementation.
5. Create a new branch from `main`; do not reuse old branches for new plans.
6. Save the validated plan in the active plans folder used by the project.
7. Implement only the approved scope.
8. Run the relevant checks and update tracking docs if the project requires it.
9. Move the plan to the completed plans folder when the work is done.
10. Commit, push the branch, and open a Pull Request.
11. Wait for explicit user validation before merging.
12. After merge, return to `main` and synchronize it.

## Plan Content

Include only what helps execution:

- objective;
- scope;
- out of scope;
- likely files or areas;
- expected verification;
- risks or constraints.

## Discipline

- Treat a small correction as a new subject if it was not included in the active plan.
- Keep one plan equal to one branch and one Pull Request unless the user explicitly says otherwise.
- Do not expand scope silently while implementing.
- If project-specific instructions define folders or statuses, follow those instructions over generic defaults.

## Verification

- Check the final diff against the approved scope.
- Run documentation checks for docs-only work.
- Run lint/build/tests according to the files changed and the project instructions.
- State clearly if any expected check could not be run.
