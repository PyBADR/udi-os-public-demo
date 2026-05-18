# Contributing to the Public Demo

Thank you for considering a contribution. This repository is the public demo preview of the GCC Urban Decision Intelligence OS — a narrow, deliberately-constrained showroom. Contributions are welcome within that scope.

## What contributions we accept

* **Bug fixes** in the two demo surfaces (`/v2/overview`, `/v2/partner-backbone`) — rendering glitches, RTL/bidi issues, accessibility defects, broken links, build failures.
* **Documentation improvements** in `README.md`, `PUBLIC_DEMO_DISCLAIMER.md`, `SECURITY.md`, `docs/*.md`.
* **Translation refinements** to the Gulf-institutional Arabic content in `frontend/lib/v2/data/bilingualBusinessLabels.ts`. These should be reviewed by a Gulf-institutional Arabic editor before merge; do not machine-translate.
* **Lint policy refinements** to `tools/banned_claims.yml` that strengthen (never weaken) the constitutional vocabulary.

## What contributions we do not accept

* **New product features** that change the demo surface beyond its current scope (the two demo routes). The public demo is intentionally narrow; broader product development happens in the private source-of-truth repository.
* **Dependency upgrades** that touch `package.json` outside what's already pinned. Open an issue first to discuss.
* **Workflow changes** to `.github/workflows/public-demo-ci.yml` that require a secret to run, change the runner label away from `ubuntu-latest`, or remove any of the four jobs.
* **Anything that weakens the disclaimer.** Removing a negation, softening a constitutional caveat, or introducing a vendor name in visible UI as an active integration are all immediately rejected.

## How to propose a change

1. **Open an issue first** for anything larger than a typo. State the route or file you intend to touch and the intended outcome in plain language.
2. **Fork the repository** and create a branch named after the issue (`fix/123-rtl-isolation-on-tab-c`, `docs/124-readme-clarification`, etc.).
3. **Run the local checks** before pushing:

   ```bash
   cd frontend && npm ci
   npm run type-check
   npm run build
   cd ..
   python3 tools/lint_banned_claims.py
   ```

   All four must pass.
4. **Open a pull request** against `main`. Reference the issue. Describe what changed and why in plain language.
5. **CI runs automatically** on the public-demo-ci workflow. Wait for it to be green.
6. **Maintainer review.** The maintainer will respond within a few business days. Substantive review touches the constitutional posture, the bilingual rendering, and the build health.

## Code style

* TypeScript with `strict: true` (the project's tsconfig enforces it).
* React function components only; no class components.
* Tailwind CSS with **logical direction utilities only** (`ms-*`, `me-*`, `ps-*`, `pe-*`, `border-s-*`, `border-e-*`, `start-*`, `end-*`). Never `ml-*` / `pl-*` / `border-l-*` for anything that should mirror in RTL.
* Bilingual EN + AR side-by-side rendering. AR wrapped in `<span lang="ar" dir="rtl" className="[unicode-bidi:isolate]">…</span>` so RTL flows are isolated.
* Comments only when the *why* is non-obvious. Don't restate what well-named identifiers already say.

## License

By contributing, you agree that your contribution is licensed under the Apache License 2.0 (see `LICENSE`).

## Conduct

Be considerate. Disagreement is welcome; harassment is not. Discussion happens in the open (issues and PRs) so that future contributors can trace the reasoning.
