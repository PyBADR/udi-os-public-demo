# Governance Boundary

A single-page reading of what the GCC Urban Decision Intelligence OS public demo claims and does not claim. Use this table as the authoritative reference when reviewing copy, components, or contributions.

## Claims and non-claims

| Topic | Claim | Non-claim |
|---|---|---|
| Decision authority | Advisory layer | Not a decision-making authority |
| Reviewer of record | Municipal review | Not the platform |
| Authority posture | Advisory only | No authority-execution vocabulary in visible UI. No assertions of a violation. No claim of any penalty or judicial outcome. |
| Surveillance | None | Zone-level posture only; never individuals |
| Cloud integration | Cloud-agnostic architecture mapping | No active integration with Google Cloud, AWS, Azure, STC Cloud, G42, Oracle, or any named vendor |
| Municipal integration | None active | No `official municipal integration`, no `official municipal record` |
| Boundary register | None | Stylised reference geometry only; not an `official municipal boundary` |
| GIS posture | None | Reference imagery only; not an `official GIS` |
| Data feed | Reference imagery (USGS / Sentinel) | No `live data`, no `live integration`, no `real-time monitoring`, no `live monitoring` |
| Decisioning | Human-reviewed | No machine-driven decisioning posture. No self-initiated escalation. No self-triggering consequence. |
| Return / outcomes | Bounded readiness bands | No outcome-guarantee framing. No advice on investment. No yield model. No price-trajectory claim. |
| Deployment | Demo preview (Vercel) | No `production deployment` claim |
| Imagery | Public-domain reference (USGS / Sentinel) | No private satellite data, no licensed vendor imagery, no operational municipal-system screenshots |
| Bilingual | EN + Gulf-institutional AR | No machine translation; AR is human-authored |
| Direction | Logical RTL/LTR utilities (`ms-*`, `pe-*`, `border-s-*`) | No physical direction utilities for mirrored layout |

## Constitutional boundary lines

Two sentences carry the platform's promise. They appear in the demo verbatim, in both English and Arabic, in every render:

* **Partner Intelligence Backbone (header + footer):** the advisory-architecture boundary line — see the rendered text at `/v2/partner-backbone` and the source at `frontend/components/v2/partner-backbone/PartnerBackboneSurface.tsx`.
* **Overview (Decision Readiness Panel):** the advisory-only · municipal-review-required boundary line — see the rendered text at `/v2/overview` and the source at `frontend/components/v2/overview/OverviewProductIntelligence.tsx`.

These two boundary lines are constitutional. Their authoritative source is the rendered UI text plus the React component that emits it. Other documentation references them by location rather than re-quoting, so the linter can perform vocabulary checks without flagging the constitutional disclaimers themselves.

## Vendor mention policy

Generic partner *categories* are permitted in visible UI:

* Cloud Partner · Municipality / Public Sector · Investor / Developer · Telecom / Infrastructure · Insurance / Risk · Advisory Firm

Specific vendor *names* are not mentioned anywhere in the visible UI as active integrations. The Partner Intelligence Backbone is a candidate capability mapping framework — never an active partnership claim.

## Constitutional vocabulary check (this document)

The banned-claims linter at `tools/lint_banned_claims.py` runs on every CI execution and rejects any visible string that breaches the vocabulary boundary. A single hit fails the build. The policy file `tools/banned_claims.yml` is the canonical reference for restricted phrases — read it directly rather than reproducing its contents here.

## Amendments

This boundary document is constitutional for the public demo. Changes require a pull request that explicitly explains which line is being amended, why, and how the change preserves (or strengthens) the demo's overall posture. Weakening the boundary is rejected on review.

*Last updated: 2026-05-18 (IR-CI-05 export).*
