# Security Policy

## Reporting a vulnerability

If you find a security issue in this public demo — including credential exposure, exploitable XSS, server-side request forgery, prototype pollution, supply-chain compromise, or any defect that could affect data integrity of a reviewer's session — **do not open a public issue.**

Instead, email the maintainer:

* Maintainer: **PyBADR** (the public-demo repository owner)
* Channel: GitHub's private vulnerability reporting on this repository (Issues → Security → Report a vulnerability), or open a private security advisory.

Include in your report:

1. The route or file where the issue lives (`/v2/overview`, `frontend/lib/...`, etc.).
2. A minimal reproducer.
3. The impact in plain language (what an attacker could do).
4. Your suggested mitigation, if any.

We will acknowledge within 72 hours and provide a remediation timeline depending on severity.

## What is in scope

* The public-demo Next.js application under `frontend/`.
* The banned-claims linter under `tools/`.
* The public-demo CI workflow under `.github/workflows/public-demo-ci.yml`.
* The constitutional posture documented in `PUBLIC_DEMO_DISCLAIMER.md` — if a visible string in the demo violates the disclaimer, that is a defect.

## What is NOT in scope

* The private source-of-truth repository (the production system). The public demo intentionally carries no backend, no secrets, no production data, and no operational evidence. The private repository is governed separately and is not part of this advisory channel.
* Vulnerabilities in upstream dependencies (Next.js, MapLibre, React, Tailwind) — those should be reported upstream. We will, however, advance the lockfile here as upstream fixes land.
* Self-discovered issues in the user's own demo deployment (e.g. a leaked MapTiler key from your own MapTiler console) — those are your operational concern and not a defect in this repository.

## Coordinated disclosure

We follow a 90-day coordinated disclosure window from the day a confirmed report is received. Reporters who wait for the fix before public disclosure are credited in the release notes.

## No bounty

This public demo does not currently offer a financial bug bounty. Maintainer-level acknowledgement and a credit line in the release notes are the recognition channel.
