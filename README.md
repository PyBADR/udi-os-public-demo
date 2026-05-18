# GCC Urban Decision Intelligence OS

**Public Demo Preview**

A reviewer-anchored municipal decision support system for Gulf-region urban review. This repository is the **public demo preview** of the platform — it carries only the executive-facing surfaces and the constitutional rails that govern them. It is intentionally a narrow showroom, not a full mirror of the production system.

---

## What this is

* A bilingual (English + Gulf-institutional Arabic) executive surface that turns urban evidence into reviewer-readable readiness signals.
* A cloud-agnostic **Partner Intelligence Backbone** that maps the platform's evidence, geospatial intelligence, AI explanation, governance, and buyer readiness onto partner-ready deployment pathways.
* A constitutional banned-claims linter enforcing the platform's wording rules in CI.
* Reference imagery and JSON-schema-defined evidence-pack formats.

## What this is not

* **Not** a municipal decision-making system. Municipal review remains the sole producer of consequential conclusions.
* **Not** a live data feed. All imagery in this repository is reference-only (USGS / Sentinel public-domain derivatives).
* **Not** an official municipal boundary, an official GIS, or an integration with any GIS authority.
* **Not** an active cloud integration. The platform claims no production deployment with Google Cloud, AWS, Azure, STC Cloud, G42, Oracle, or any named vendor. The Partner Intelligence Backbone is a candidate capability map, not an active partnership.
* **Not** an automated decisioning system. No enforcement, no surveillance, no guaranteed return.
* **Not** the production system. The full platform — including backend, decision engine, audit trail format, and operational evidence pipeline — lives in a separately governed, private source-of-truth repository.

## Demo surfaces

| Route | Surface |
|---|---|
| `/v2/overview` | Executive overview · six-cluster product intelligence read · advisory metrics · Riyadh evidence operating surface · 75-second executive preview |
| `/v2/partner-backbone` | Cloud-agnostic partner intelligence backbone · 4 tabs (A-I workflow, capability mapping, pilot readiness, partner value cards) · advisory architecture only |

## Running locally

```bash
cd frontend
npm ci

# Optional: provision a domain-restricted MapTiler key for the Riyadh map
# surface. Without a key, the surface shows an unobtrusive fallback message.
cp .env.local.example .env.local
# Edit .env.local and add NEXT_PUBLIC_MAPTILER_KEY=<your_key>
# The key should be domain-restricted to your demo origin.

npm run dev -- -p 3456
# Open http://localhost:3456/v2/overview
```

## Repository structure

```
.
├── frontend/                  # Next.js 14 App Router public-demo surface
│   ├── app/                   # /v2/overview and /v2/partner-backbone routes only
│   ├── components/v2/         # V2 surface components (audited Class-A)
│   ├── lib/                   # i18n + V2 data layer + bilingual labels
│   └── public/                # Riyadh reference imagery (USGS-derived, public-domain)
├── tools/                     # Banned-claims linter + policy file
├── docs/
│   ├── ARCHITECTURE_PUBLIC.md     # Top-level public architecture summary
│   ├── GOVERNANCE_BOUNDARY.md     # What the platform claims and does not claim
│   └── PARTNER_BACKBONE_BRIEF.md  # Partner Intelligence Backbone reading
├── LICENSE                    # Apache 2.0
├── PUBLIC_DEMO_DISCLAIMER.md  # Full disclaimer / anti-claims surface
├── SECURITY.md                # Security reporting policy
├── CONTRIBUTING.md            # How to propose changes to the demo
└── .github/workflows/         # public-demo-ci.yml (typecheck · build · linter)
```

## Governance and language posture

This demo enforces a constitutional vocabulary. The banned-claims linter at `tools/lint_banned_claims.py` runs on every push and pull request and rejects any visible string that violates the platform's wording policy. The full constitutional posture is documented in [`PUBLIC_DEMO_DISCLAIMER.md`](PUBLIC_DEMO_DISCLAIMER.md).

The demo's source-of-truth repository (which holds the strategy, governance, sprint history, and operational evidence) **remains private** and is separately governed. This public demo is independently licensed under Apache 2.0 and exists to make the platform's surface read by an external partner / investor / municipal reviewer.

## License

[Apache License 2.0](LICENSE). The patent grant explicitly covers the platform's decision-engine and audit-format concepts.

## Reporting issues

Use GitHub Issues for documentation, accessibility, or UI bugs. For anything that could be a security issue, see [`SECURITY.md`](SECURITY.md) — do not open a public issue.
