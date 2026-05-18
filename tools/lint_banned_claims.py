#!/usr/bin/env python3
"""
Banned-claims linter for the Urban Municipal Intelligence Platform.

Walks files (default: docs/**/*.md and data/cases/**/*.md), scans each line
against the policy in tools/banned_claims.yml, and prints every hit with
file, line, matched phrase, and a suggested alternative.

Exit code:
    0 — zero hits
    1 — at least one hit
    2 — usage / config error

The linter intentionally does NOT scan its own policy file or this audit
doc's "Banned" reference table — those carry the canonical list. Skip is
controlled via the `--skip` flag; defaults are sensible.
"""
from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List

# stdlib YAML — pyyaml may not be present in CI; we ship a tiny parser
# that handles the very narrow shape of banned_claims.yml.
def _load_simple_yaml(text: str) -> List[dict]:
    """Parse the specific shape of banned_claims.yml (list of dicts under 'banned')."""
    items: List[dict] = []
    cur: dict | None = None
    in_banned = False
    for raw in text.splitlines():
        line = raw.rstrip()
        if not line or line.lstrip().startswith("#"):
            continue
        if line.strip() == "banned:":
            in_banned = True
            continue
        if not in_banned:
            continue
        if line.startswith("  - "):
            if cur:
                items.append(cur)
            cur = {}
            kv = line[4:]
            k, _, v = kv.partition(":")
            cur[k.strip()] = v.strip().strip('"')
        elif line.startswith("    "):
            kv = line.strip()
            k, _, v = kv.partition(":")
            if cur is None:
                continue
            cur[k.strip()] = v.strip().strip('"')
    if cur:
        items.append(cur)
    return items


@dataclass
class Hit:
    path: Path
    line_no: int
    line: str
    phrase: str
    suggested: str
    why: str


def load_policy(yml_path: Path) -> List[dict]:
    if not yml_path.exists():
        print(f"ERROR: policy file not found: {yml_path}", file=sys.stderr)
        sys.exit(2)
    return _load_simple_yaml(yml_path.read_text(encoding="utf-8"))


def compile_patterns(policy: List[dict]) -> List[tuple[re.Pattern, dict]]:
    out = []
    for entry in policy:
        if "phrase" not in entry:
            continue
        pattern = re.compile(entry["phrase"], re.IGNORECASE)
        out.append((pattern, entry))
    return out


DEFAULT_EXTENSIONS = {
    ".md",
    ".ts", ".tsx", ".js", ".jsx",
    ".py",
    ".yml", ".yaml",
    ".json",
}

# Directories the linter never descends into (build artifacts, vendored deps,
# the Python venv, the audit log, the orphan worktree directory). Matched as
# path *components*, so any `node_modules` anywhere in the tree is skipped.
_ALWAYS_SKIP_DIR_COMPONENTS = frozenset({
    "node_modules", ".next", "__pycache__", ".venv", "venv", ".git",
    "dist", "build", ".turbo", ".vercel", ".claude", "public",
})


def _is_skipped_dir(p: Path) -> bool:
    # Skip if any path component is in the always-skip set, OR starts with
    # `.audit` (covers .audit/, .audit_p22/, .audit_check/, etc.).
    return any(
        part in _ALWAYS_SKIP_DIR_COMPONENTS or part.startswith(".audit")
        for part in p.parts
    )


def iter_target_files(
    roots: Iterable[Path],
    skip: set[Path],
    extensions: set[str] | None = None,
) -> Iterable[Path]:
    exts = extensions if extensions is not None else DEFAULT_EXTENSIONS
    for root in roots:
        if not root.exists():
            continue
        if root.is_file():
            if root not in skip and not _is_skipped_dir(root):
                yield root
            continue
        for p in root.rglob("*"):
            if not p.is_file():
                continue
            if p.suffix.lower() not in exts:
                continue
            if _is_skipped_dir(p):
                continue
            if p in skip:
                continue
            yield p


# IR-24B — Doctrine-reference block markers.
#
# A document may explicitly mark a narrow region as a doctrinal
# forbidden-vocabulary listing (e.g., Appendix C "Permitted vs.
# Banned Vocabulary", Authority Vocabulary §6 "Forbidden
# vocabulary on V2 surfaces", Section 18A.10 / 18C.8 / 18D.10
# / 18E.11 / 18F.13 Governance Boundaries). Inside such a
# region, banned vocabulary may appear ONLY as the things-the-
# product-must-NOT-say — never as a product claim. The linter
# treats lines inside these regions as out-of-scope for pattern
# matching.
#
# Markers are HTML-comment style so they survive Markdown
# rendering invisibly:
#
#     <!-- banned-claims: doctrine-reference:start -->
#     ... forbidden vocabulary listing ...
#     <!-- banned-claims: doctrine-reference:end -->
#
# Rules:
# - Every start marker MUST have a matching end marker in the
#   same file. Mismatched markers raise a hard config error
#   (exit code 2) so a stale or stripped marker fails CI loudly.
# - Markers are detected on a per-line basis; the marker line
#   itself is also skipped (so the marker comment text cannot
#   trip the linter).
# - Block scope is narrow: only the lines between matched start
#   and end markers (inclusive) are skipped. Everything outside
#   continues to be scanned strictly.
# - Nesting is forbidden; a second start marker before a close
#   raises the same hard config error.
# - The markers are NOT a file-wide opt-out. Wrapping an entire
#   file is allowed by the syntax but discouraged by policy and
#   should be reviewed on PR.
_DOCTRINE_REF_START = "<!-- banned-claims: doctrine-reference:start -->"
_DOCTRINE_REF_END = "<!-- banned-claims: doctrine-reference:end -->"


class DoctrineMarkerError(ValueError):
    """Raised when doctrine-reference markers in a file are unbalanced or nested."""


def _doctrine_reference_skip_lines(text: str, path: Path) -> set[int]:
    """Return the set of 1-indexed line numbers inside doctrine-reference blocks.

    Raises DoctrineMarkerError on mismatched / nested / unclosed markers,
    so a stale marker fails CI loudly rather than silently disabling
    enforcement.
    """
    skip: set[int] = set()
    in_block = False
    block_start_line = 0
    for n, raw in enumerate(text.splitlines(), start=1):
        line = raw.strip()
        if _DOCTRINE_REF_START in line:
            if in_block:
                raise DoctrineMarkerError(
                    f"{path}:{n}: nested doctrine-reference start marker "
                    f"(previous start at line {block_start_line} not yet closed)"
                )
            in_block = True
            block_start_line = n
            skip.add(n)
            continue
        if _DOCTRINE_REF_END in line:
            if not in_block:
                raise DoctrineMarkerError(
                    f"{path}:{n}: doctrine-reference end marker without "
                    f"a preceding start marker"
                )
            in_block = False
            block_start_line = 0
            skip.add(n)
            continue
        if in_block:
            skip.add(n)
    if in_block:
        raise DoctrineMarkerError(
            f"{path}:{block_start_line}: unclosed doctrine-reference block "
            f"(start marker at line {block_start_line} has no matching end marker)"
        )
    return skip


def scan_file(path: Path, patterns) -> List[Hit]:
    hits: List[Hit] = []
    text = path.read_text(encoding="utf-8", errors="replace")
    # IR-24B: compute doctrine-reference skip set once per file.
    # Marker errors propagate as DoctrineMarkerError so main()
    # can print a clear failure and exit with the config-error
    # code.
    skip_line_set = _doctrine_reference_skip_lines(text, path)
    for n, line in enumerate(text.splitlines(), start=1):
        if n in skip_line_set:
            continue
        for pat, entry in patterns:
            for m in pat.finditer(line):
                hits.append(Hit(
                    path=path, line_no=n, line=line.strip(),
                    phrase=m.group(0),
                    suggested=entry.get("suggested", ""),
                    why=entry.get("why", ""),
                ))
    return hits


def format_hits(hits: List[Hit]) -> str:
    if not hits:
        return ""
    chunks = []
    for h in hits:
        chunks.append(
            f"  {h.path}:{h.line_no}\n"
            f"    matched: \"{h.phrase}\"\n"
            f"    line:    {h.line[:140]}\n"
            f"    use:     \"{h.suggested}\"\n"
            f"    why:     {h.why}\n"
        )
    return "\n".join(chunks)


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]

    ap = argparse.ArgumentParser(description="Banned-claims linter")
    ap.add_argument("paths", nargs="*", default=None,
                    help="Files or directories to scan. Defaults: docs/, data/cases/")
    ap.add_argument("--policy", default=str(repo_root / "tools" / "banned_claims.yml"),
                    help="Path to banned_claims.yml")
    ap.add_argument("--skip", action="append", default=[],
                    help="Paths to skip (can be passed multiple times)")
    args = ap.parse_args()

    policy = load_policy(Path(args.policy))
    patterns = compile_patterns(policy)

    roots: List[Path]
    if args.paths:
        roots = [Path(p).resolve() for p in args.paths]
    else:
        # Phase 31C-S0: extended scan surface to cover DAL contracts,
        # frontend i18n strings, and ai_agents scaffold.
        # Phase P5.0: expanded to backend/app/ (was backend/app/intelligence)
        # so backend API strings (routers/), audit-emitting strings (core/),
        # and service docstrings (services/) are linted. Build artifacts and
        # caches are auto-skipped via _ALWAYS_SKIP_DIR_COMPONENTS.
        # The constitutional reference docs that enumerate the banned list
        # are added to the auto-skip set below so they don't trip themselves.
        roots = [
            repo_root / "docs",
            repo_root / "data" / "cases",
            repo_root / "frontend" / "lib" / "i18n.ts",
            repo_root / "frontend" / "app",
            repo_root / "frontend" / "components",
            repo_root / "contracts",
            repo_root / "backend" / "app",
            repo_root / "ai_agents",
            repo_root / "tools",
            # Phase P5X: specs/ holds the Card Contract and (post-sign-off)
            # per-card YAMLs. Per-card YAMLs MUST lint clean — they encode
            # buyer-facing card content. The contract spec itself names
            # banned terms in its banned-wording risk section and is on
            # the canonical-skip set below.
            repo_root / "specs",
            # Evidence Library (P5X-adjacent): per-pack manifests and
            # per-item source logs / narrative notes / metadata MUST
            # lint clean (the capture protocol mandates self-lint
            # before commit). Top-level governance docs in docs/evidence
            # name banned terms in negation context and are on the
            # canonical-skip set below.
            repo_root / "data" / "gcc_evidence",
        ]

    # Always skip the policy file and any reference table that catalogs the
    # banned terms (they are the canonical list, by definition full of hits).
    skip = {Path(args.policy).resolve()}
    for s in args.skip:
        skip.add(Path(s).resolve())

    # Canonical reference / legacy-doc skip set. Each of these either is the
    # canonical enumeration of banned terms (CLAUDE.md, governance_rules.md,
    # ui_language_dictionary.md, the badge brief, the schema lock) or is a
    # legacy doc preserved only for history (PHASE12_AUDIT.md, DEMO_KIMBERLY.md,
    # ROADMAP_V2.md, decision_intelligence_layer.md, case_operations_layer.md,
    # ARCHITECTURE.md, audit_reality_alignment.md). The Phase 29.5 constitution
    # explicitly designates the legacy set as non-authoritative.
    _CANONICAL_AND_LEGACY_SKIPS = (
        "CLAUDE.md",
        "tools/lint_banned_claims.py",
        "docs/PHASE12_AUDIT.md",
        "docs/DEMO_KIMBERLY.md",
        "docs/ROADMAP_V2.md",
        "docs/ARCHITECTURE.md",
        "docs/architecture.md",
        "docs/decision_intelligence_layer.md",
        "docs/case_operations_layer.md",
        "docs/governance_rules.md",
        "docs/ui_language_dictionary.md",
        "docs/audit_reality_alignment.md",
        "docs/intelligence_engine_architecture.md",
        "docs/design/dal_activation_badge_system.md",
        "docs/design/decision_basis_block.md",
        "docs/architecture/dal_schema_lock.md",
        "docs/architecture/dal_v01_architecture.md",
        "docs/architecture/mil_v01_architecture.md",
        "docs/architecture/outcome_roi_architecture.md",
        # Phase P5.0: P5 architectural reference memos. Same character as the
        # DAL/MIL/OID reference docs above — they catalog the banned terms by
        # design (memo §10 banned-claims policy extension, memo §7 risk
        # register R1/R2, memo §11 acceptance criteria all enumerate the
        # forbidden vocabulary). User-facing copy lives in i18n.ts and route
        # pages, which remain in scope.
        "docs/architecture/p5_financial_outcome_layer.md",
        "docs/architecture/p5_municipal_outcome_layer.md",
        "docs/architecture/p5_municipal_outcome_execution.md",
        "docs/architecture/p5_municipal_outcome_execution_memo.md",
        # Phase P5X: Product Packaging Layer reference memo. Catalogs the
        # eight use-case cards and per-card `banned_wording_risks` fields
        # which inherently name the forbidden vocabulary. User-facing
        # card titles, captions and caveats live in frontend/lib/i18n.ts
        # under outcome.cards.* and remain in scope.
        "docs/architecture/p5x_municipal_product_packaging.md",
        # Phase P5X gate artifact 2: Card Contract v0. Specifies the
        # `safe_language.banned_wording_risks[]` field whose
        # `pattern_examples_en/ar` lists are constructive evidence that
        # the P5.0 lint catches each risk. Naming the patterns is the
        # point of the field, so the doc itself is on the skip list.
        # Per-card YAMLs (forthcoming) remain in scope and MUST lint clean.
        "specs/card-contract.v0.md",
        # Phase P5X gate artifact 3: Anchor Pilot Municipality v0.
        # Names banned terms in negation context inside the frozen
        # non-action commitment language ("no automatic enforcement",
        # "no automatic penalty or fine", "no confirmed-violation
        # labels"). The negation is the point. Per-pilot decision
        # records (when authored, currently embedded in §15 of the
        # spec itself) inherit the same skip rationale.
        "specs/anchor-pilot-municipality.v0.md",
        # Phase P5X buyer-facing brief: 60-Day Municipal Intelligence
        # Pilot Brief. Reproduces the frozen non-action commitment
        # language verbatim (EN+AR) and lists the constitutional
        # negations in §9. Same skip rationale as the anchor-pilot
        # spec it derives from.
        "docs/product/municipal_intelligence_pilot_brief.md",
        # One-page executive extract from the brief. Same
        # constitutional negations in §5 ("will not classify… as
        # non-compliant or in violation", "will not recommend any
        # enforcement, fine, penalty…"). Skip-list inclusion mirrors
        # the parent brief.
        "docs/product/municipal_intelligence_pilot_one_pager.md",
        # GCC Visual Evidence Library — governance reference docs.
        # Each names banned terms in negation context inside the
        # constitutional caveat text or the banned/permitted-framing
        # tables. The negation is the load-bearing content. Per-pack
        # READMEs (data/gcc_evidence/<country>/<city>/README.md) and
        # per-item capture artifacts (sources/, narrative/, metadata/)
        # remain in scope and MUST lint clean.
        "docs/evidence/gcc_evidence_library_strategy.md",
        "docs/evidence/evidence_pack_template.v0.md",
        "docs/evidence/templates/caveat_note.template.md",
        "docs/evidence/templates/capture_metadata.template.json",
        "docs/evidence/templates/narrative_note.template.md",
        # Launch review/reference docs. These documents intentionally
        # catalog rejected wording, banned-token examples, and governance
        # review notes. They are not buyer-facing copy surfaces.
        "docs/launch/cinematic_command_entry_review.md",
        "docs/launch/global_inspired_command_surface_pass_review.md",
        "docs/launch/master_execution_strategy.md",
        "docs/launch/mathematical_modeling_layer_productization_review.md",
        "docs/launch/scenario_demo_productization_review.md",

        # Phase P5X Go-to-Pilot package (canonical naming:
        # "GCC Urban & Municipal Intelligence Pilot" /
        # "تجربة الذكاء الحضري والبلدي في الخليج"). Each doc names
        # banned terms in negation context — the one-pager in §6
        # constitutional negations, the outreach bundle in its
        # frozen "no enforcement, no currency claims" lines, and
        # the meeting script in §6 ("How to handle concerns about
        # enforcement, automatic penalties, confirmed violations").
        # The negation is the load-bearing content. Skip-list
        # treatment is the same pattern used for prior governance
        # reference docs.
        "docs/product/gcc_urban_municipal_intelligence_one_pager.md",
        "docs/product/gcc_urban_municipal_intelligence_outreach_message.md",
        "docs/product/gcc_urban_municipal_intelligence_meeting_script.md",
        "docs/phase_log.md",
        # Annex A — Cumulative Forbidden Vocabulary catalogue (file path
        # reserved; authored under a separate phase). The catalogue's
        # substantive purpose is to enumerate the cumulative forbidden
        # vocabulary verbatim across every merged amendment, charter, and
        # layer (Methodology v1.1, Data Science / ModelOps Lite / Deep
        # Learning Charter, Slice 0 Strategy Grounding Pack, Commercial
        # Readiness Layer, Buyer Decision Logic Layer, AI Assistant
        # Architecture & Guardrails, Surveillance / Non-Executory-Action
        # Guard, Reviewer-of-Record Register, Conditional Ratification).
        # The negation-list contents are the load-bearing material; same
        # skip rationale as governance_rules.md and ui_language_dictionary.md.
        "docs/strategy/Annex_A_Cumulative_Forbidden_Vocabulary.md",
        # Riyadh Evidence Pack — Co-Work-ratified governance / reference
        # documents. Each enumerates prohibited language in negation context
        # within the pack's constitutional caveat sections (e.g. "this pack
        # does not claim: - automated enforcement", "No enforcement claim.")
        # or in interpretive question framing ("what official evidence
        # supports it"). Same skip rationale as CLAUDE.md, governance_rules.md,
        # ui_language_dictionary.md, and the other governance reference docs
        # listed above. README.md is intentionally excluded — it is linter-
        # clean and remains in scope so future edits stay protected.
        "docs/evidence/riyadh_evidence_pack/MASTER_EVIDENCE_INDEX.md",
        "docs/evidence/riyadh_evidence_pack/DECISION_ENGINE_EVIDENCE_MAP.md",
        "docs/evidence/riyadh_evidence_pack/EVIDENCE_FOUNDATION_LOCK_MEMO.md",
        "docs/evidence/riyadh_evidence_pack/PRODUCT_TRANSLATION_BLUEPRINT.md",
        "docs/evidence/riyadh_evidence_pack/DECISION_ENGINE_SCHEMA.md",
        "docs/evidence/riyadh_evidence_pack/EVIDENCE_LAYER_LOGIC.md",
        "docs/evidence/riyadh_evidence_pack/MVP_PRODUCT_CONTRACT.md",
        "docs/evidence/riyadh_evidence_pack/MVP_PRODUCT_CONTRACT_AUDIT.md",
        "docs/evidence/riyadh_evidence_pack/COWORK_MINOR_FIXES_AMENDMENT.md",
        # Pre-DAL fixture data: authored before the DAL banned-affordances
        # list existed. The case bundle's "notice" field uses safety
        # negation phrasing ("No confirmed violation. No automatic fines.")
        # that the linter naively treats as a hit. Tracked for cleanup in a
        # future fixture-refresh phase, not in S0 (which is contracts-only).
        "data/cases/URB-KW-SURRA-0001/case.json",
        "data/cases/URB-KW-SURRA-0001/observation_brief.md",
        # Frontend page authored pre-DAL with "All enforcement decisions
        # require a registered case ID." Out of scope for S0 (no UI changes
        # per the phase brief). Cleanup tracked for Phase 31C-S1.
        "frontend/app/not-found.tsx",
        # IR-27A — V2 product canon. Constitutional governance reference
        # that catalogs banned vocabulary in disallowed-list / forbidden-
        # phrasing context (§4 / §5 enumerate the disallowed phrase set
        # and the negative-disclaimer rule). Same character as
        # CLAUDE.md, governance_rules.md, ui_language_dictionary.md, and
        # Annex_A_Cumulative_Forbidden_Vocabulary.md.
        "docs/strategy/v2_product_canon_and_v1_archive_boundary.md",
        # IR-27B — V2 governance / legal / commercial readiness pack.
        # The three documents below catalog approved + disallowed
        # phrases, name the forbidden vocabulary as the things the
        # product must NOT say, and provide negation-form sales-safe
        # one-liners. Same skip rationale as the IR-27A canon and the
        # other governance reference docs listed above. The user-facing
        # surfaces (i18n.ts, frontend/app, frontend/components) remain
        # in scope.
        "docs/strategy/v2_governance_legal_commercial_readiness_pack.md",
        "docs/strategy/v2_buyer_readiness_matrix.md",
        "docs/strategy/v2_commercial_value_language.md",
        # V2 architecture reference docs — each names banned terms in
        # negation / boundary context inside the constitutional doctrine
        # block (e.g. "Boundary: no UI may surface a numeric financial-
        # return claim, an enforcement label, or a live-monitoring
        # claim.", "no ROI, no yield, no payback, no certified savings,
        # no guaranteed return language anywhere on V2 surfaces.").
        # Same skip rationale as v2_master_architecture.md and the
        # other architecture reference docs already on this list. The
        # user-facing V2 surfaces (route pages, components, i18n.ts)
        # remain in scope.
        "docs/architecture/v2_tooling_architecture.md",
        "docs/architecture/v2_design_reference_system.md",
        "docs/architecture/v2_financial_value_intelligence.md",
        "docs/architecture/v2_governance_audit_controls.md",
        # IR-26B Riyadh Strategic Authority & Project Intelligence
        # Layer reference doc — names banned terms inside the
        # constitutional non-claims block ("no enforcement", "no
        # guaranteed ROI", "no production decisioning"). Same skip
        # rationale as v2_master_architecture.md and the other
        # architecture / strategy reference docs already on this list.
        # The runtime fixture (frontend/lib/v2/riyadhStrategicLayers.ts)
        # and the surface page remain in scope.
        "docs/strategy/v2_riyadh_strategic_authority_and_project_layers.md",
    )
    for rel in _CANONICAL_AND_LEGACY_SKIPS:
        skip.add((repo_root / rel).resolve())

    files = list(iter_target_files(roots, skip))

    total_hits: List[Hit] = []
    marker_errors: list[str] = []
    for f in files:
        try:
            total_hits.extend(scan_file(f, patterns))
        except DoctrineMarkerError as e:
            # IR-24B: a stale or stripped doctrine-reference marker
            # must NOT silently disable enforcement. We collect every
            # marker error and exit with the config-error code so CI
            # fails loudly with a clear, actionable message.
            marker_errors.append(str(e))

    print(f"Scanned {len(files)} files against {len(patterns)} banned patterns.")
    print(f"Hits: {len(total_hits)}")
    if total_hits:
        print()
        print(format_hits(total_hits))

    if marker_errors:
        print()
        print("DOCTRINE-REFERENCE MARKER ERRORS:", file=sys.stderr)
        for msg in marker_errors:
            print(f"  {msg}", file=sys.stderr)
        return 2

    if total_hits:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
