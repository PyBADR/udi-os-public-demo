# Architecture — Public Demo

This document is the **public-facing architecture summary** of the GCC Urban Decision Intelligence OS demo. It is deliberately concise and constitutional. It does not name vendors, does not claim integrations, and does not commit to deployment posture beyond what the demo itself shows.

## Layered model

```
   ┌────────────────────────────────────────────────────────────┐
   │ Executive Surface (this demo)                              │
   │   /v2/overview · /v2/partner-backbone                      │
   │   bilingual EN + AR · advisory only · human-reviewed       │
   └──────────────────────────────┬─────────────────────────────┘
                                  │
   ┌──────────────────────────────┴─────────────────────────────┐
   │ Bilingual Content Layer                                    │
   │   frontend/lib/v2/data/bilingualBusinessLabels.ts          │
   │   one source of truth for every visible string             │
   └──────────────────────────────┬─────────────────────────────┘
                                  │
   ┌──────────────────────────────┴─────────────────────────────┐
   │ Decision Readiness Surfacing (advisory)                    │
   │   reads from in-memory fixtures · no live data ingest      │
   │   no automated decisioning · municipal review is the       │
   │   sole producer of consequential conclusions               │
   └──────────────────────────────┬─────────────────────────────┘
                                  │
   ┌──────────────────────────────┴─────────────────────────────┐
   │ Constitutional Linter (CI)                                 │
   │   tools/lint_banned_claims.py · tools/banned_claims.yml    │
   │   blocks forbidden vocabulary in visible strings           │
   └────────────────────────────────────────────────────────────┘
```

## Demo surfaces in detail

### `/v2/overview`

Six executive clusters on first read:

1. **Executive Intelligence Strip** — title *GCC Urban Decision Intelligence OS*, subtitle *From urban signals to evidence-backed decision readiness*, four advisory metrics (Signals Ingested · Evidence Objects · Readiness Paths · Buyer Packs).
2. **Product Intelligence Flow** — five-step flow: Urban Signals → Evidence Layer → Mathematical Core → Decision Readiness → Buyer Pack.
3. **Urban Signal Fusion Layer** — five compact cards covering Population & Mobility, Real Estate & Economy, Municipal & Planning, Infrastructure & Telecom, Insurance & Risk.
4. **Decision Readiness Panel** — five readiness states (Ready for Reference · Review Pending · Governance Limited · Insufficient Evidence · Blocked from Decision Use) + boundary line *Advisory only. Municipal review remains the source of consequential decision.*
5. **Buyer Pack Layer** — five buyer-lens cards (Municipality · Investor · Insurance · Telecom · Cloud).
6. **75-Second Executive Preview** — single CTA + five time-stamped lines.

Below the six clusters: an analyst-depth `<details>` collapse holds the deeper analyst surfaces. Reviewers who want depth open it.

### `/v2/partner-backbone`

A cloud-agnostic architecture mapping. Four tabs:

* **Intelligence Workflow (A–I)** — Evidence Intake → Classification → Transform → Buyer Intelligence → Satellite/Earth Evidence → Mathematical Core → AI Explanation → Decision Surface → Governance. Each step: short description, input, output, and a governance caveat where governance-relevant.
* **Cloud Capability Mapping** — eight platform needs mapped onto generic partner capabilities (object storage, analytical warehouse, spatial query engine, earth observation layer, foundation model / agent layer, BI / embedded analytics, IAM / logs / policy, cloud environment). No vendor name appears in any row.
* **Pilot Readiness** — eight rows (Riyadh evidence lane · Saudi expansion · Kuwait baseline · GCC expansion · Cloud deployment · Governance · Human review · Production integration) with safe status labels.
* **Partner Value** — six partner-value cards (Cloud Partner · Municipality · Investor · Telecom · Insurance · Advisory Firm) with cares-about / provides / output / boundary.

The constitutional boundary line is rendered in both the page header and the page footer, so it remains in view at every tab.

## Constitutional rails (enforced in CI)

* **Banned-claims linter** — runs on every PR. Rejects forbidden English and Gulf-institutional Arabic phrases. The policy file `tools/banned_claims.yml` is the authoritative list.
* **i18n key validator** (if present) — ensures every visible string is sourced from the bilingual labels module rather than hard-coded in JSX.
* **TypeScript type-check** — strict.
* **Next.js build** — must compile successfully.

## What is NOT in the public demo

* No backend. The platform's FastAPI decision engine, audit verifier, and operational evidence pipeline are in the private source-of-truth repository.
* No production data. All imagery is reference-only (USGS / Sentinel public-domain derivatives).
* No secrets. The single optional environment variable (`NEXT_PUBLIC_MAPTILER_KEY`) is a domain-restricted public-demo key and falls back gracefully to an unobtrusive message when unset.
* No internal sprint history, no strategy documents, no governance memos. The demo is a showroom; the operational record is governed separately.

## Where to go next

* [`PUBLIC_DEMO_DISCLAIMER.md`](../PUBLIC_DEMO_DISCLAIMER.md) — full disclaimer and anti-claims surface.
* [`GOVERNANCE_BOUNDARY.md`](GOVERNANCE_BOUNDARY.md) — what the platform claims and does not claim, in tabular form.
* [`PARTNER_BACKBONE_BRIEF.md`](PARTNER_BACKBONE_BRIEF.md) — concise read for a partner architect.
