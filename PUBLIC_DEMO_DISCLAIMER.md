# Public Demo Disclaimer

This repository is the **public demo preview** of the GCC Urban Decision Intelligence OS. The purpose of this disclaimer is to be precise about what the platform claims, what it does not claim, and what posture every surface in the demo must preserve.

The disclaimer is constitutional. Any visible string in this repository that contradicts it is a defect.

---

## The platform claims

* It is an **advisory** decision-support layer for Gulf-region municipal review.
* It is **human-reviewed**. Municipal review remains the sole producer of consequential conclusions.
* It is **evidence-backed**. Every reviewer-facing readiness signal traces to the evidence tokens that drove it.
* It is **bilingual**. Every visible string ships in English and Gulf-institutional Arabic.
* It is **cloud-agnostic** at the architecture level. The Partner Intelligence Backbone surface maps the platform's needs onto generic partner capabilities, not onto a specific vendor.

## The platform does NOT claim

* **No active cloud integration.** The platform claims no production integration with Google Cloud, AWS, Azure, STC Cloud, G42, Oracle, or any named partner. The Partner Intelligence Backbone is a *candidate capability mapping only* — not an active partnership, not a deployment, not a procurement endorsement.
* **No official municipal boundary.** Riyadh zone outlines are stylised reference geometry. Not an official municipal boundary register.
* **No official GIS.** Imagery is reference-only (USGS / Sentinel public-domain derivatives). Not an official municipal survey.
* **No official municipal integration.** No data flows from or to any municipal authority through this demo.
* **No automated decisioning.** Readiness signals are advisory. The platform never issues a fine, a penalty, an enforcement action, or any consequential conclusion.
* **No enforcement.** No `enforce`, no `enforcement-approved`, no `confirmed violation`, no `automatic fine`, no `automated penalty`, no `prosecute`.
* **No surveillance.** The platform observes zone-level posture, never individuals. No `surveillance` framing in any visible string.
* **No guaranteed return.** No `guaranteed ROI`, no investment recommendation, no yield model, no price prediction.
* **No live data.** No `live data ingestion`, no `live monitoring`, no `real-time monitoring`, no `live integration`.
* **No production deployment.** The demo runs on Vercel for visual review only. The full platform's production posture, if any, is governed separately in the private repository.

## Posture every surface preserves

Two boundary lines anchor the demo's wording:

1. On `/v2/partner-backbone` (header **and** footer): *Advisory architecture mapping only. No active cloud integration, no official municipal boundary, no automated decisioning, and no guaranteed return is claimed.*
2. On `/v2/overview` (4 cluster — Decision Readiness Panel): *Advisory only. Municipal review remains the source of consequential decision.*

These two sentences carry the constitutional weight of the demo. They appear verbatim in every render. They are the platform's promise.

## Banned vocabulary (enforced by CI)

The banned-claims linter at `tools/lint_banned_claims.py` rejects any visible string in the public demo that contains, in English or Arabic:

* `enforcement`, `enforce`, `enforcement-approved`, `confirmed violation`, `confirmed breach`, `automatic fine`, `automated penalty`, `auto-penalize`, `police`, `military`, `patrol`, `prosecute`, `prosecution`, `guilty`, `convicted`
* `automatic escalation`, `auto-escalate`
* `urgent`, `emergency`, `alarm`, `red flag`, `alert`, `must-act`, `you must`, `do not delay`, `final notice`
* `production deployment`, `live data`, `live integration`, `active cloud integration`, `active integration`, `guaranteed ROI`, `real-time monitoring`, `live monitoring`, `surveillance`
* `official GIS`, `official boundary`, `official municipal integration`, `official municipal record`

The full policy file lives at `tools/banned_claims.yml`. Equivalent Arabic forbidden phrases are included.

## Vendor mention policy

Generic partner *categories* are permitted in visible UI:

* Cloud Partner
* Municipality / Public Sector
* Investor / Developer
* Telecom / Infrastructure
* Insurance / Risk
* Advisory Firm

Specific vendor *names* (Google Cloud, AWS, Azure, STC Cloud, G42, Oracle, Palantir, CARTO, Maxar, UrbanLogiq, Esri, Mapbox) are **not** mentioned anywhere in the visible UI as active integrations. If a vendor name appears in a comment in source code, it must be inside a negated / disclaimer phrase (e.g. *"No active integration with …"*) or it must be removed before publish.

## Imagery posture

All imagery in `frontend/public/demo-assets/riyadh-evidence-pack/` is USGS or Sentinel-derived public-domain reference imagery. No private satellite data, no licensed vendor imagery, no operational municipal-system screenshots.

## Secret posture

The demo's `NEXT_PUBLIC_MAPTILER_KEY` (if configured) is a **separately minted, domain-restricted** key for the public demo origin. It is never the same key as the private repository's MapTiler key. If the public-demo key leaks, revoking it in the MapTiler console has no impact on the private system. The fallback message *"Map basemap unavailable — NEXT_PUBLIC_MAPTILER_KEY is not configured."* renders cleanly when the key is absent.

No other secret, token, credential, or API key is required by this demo at runtime. The CI workflow `.github/workflows/public-demo-ci.yml` runs without secrets.

## Source-of-truth boundary

This public demo is a **showroom**, not a mirror. The platform's source-of-truth — including the backend decision engine, audit-trail format, internal strategy documents, governance memos, sprint history, and operational evidence — lives in a **separately governed private repository** that is not made public.

The public demo is independently licensed under Apache 2.0. Contributions to this demo are accepted under that license. Contributions are not back-ported to the private repository as a matter of course; the private repository is the production-bound system and is governed separately.

*Last updated: 2026-05-18 (IR-CI-05 export).*
