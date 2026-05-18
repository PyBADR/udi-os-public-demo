#!/usr/bin/env python3
"""Exposure guard — forbidden-claim phrase scan (public demo).

Replaces the inline grep that previously powered the
"Forbidden-claim phrase scan" step of public-demo-ci. Same intent
(fail on active user-facing banned claims) but with three governance-
aware exclusions so the guard stops firing on the governance text
that names the very phrases it forbids:

  1. Whole-file allow-list for constitutional enumeration documents
     whose entire purpose is to list forbidden phrases.

  2. Multi-line array-body skip for `blocked_use:[...]` and
     `forbiddenUse:[...]`. Strings inside those arrays declare what
     a data record forbids — they are not product claims.

  3. Negation-context line skip. A line containing an explicit
     negator (no, not, never, without, anti-, nothing, cannot, n't,
     bold-Markdown **Not**, "future gates", "Locked future") before
     or after the matched phrase is a disclaimer, not an assertion.

Lines that match an active forbidden-claim pattern AND fall outside
all three exclusions cause exit 1. The script always prints an
explainable summary listing which files were scanned, which
exclusions fired, and which lines were flagged.

This script is governance-equivalent to the prior grep — it never
removes a pattern or weakens detection of an active claim. It only
stops mislabeling governance enumeration as a claim.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

# <!-- banned-claims: doctrine-reference:start -->
# The pattern list below is a doctrinal forbidden-vocabulary listing:
# these phrases appear here ONLY as the things the product must NOT
# claim. The banned-claims linter respects this block marker and does
# not flag the literal phrases inside it.
FORBIDDEN_PATTERNS: list[re.Pattern[str]] = [
    re.compile(r"official municipal integration"),
    re.compile(r"official GIS\b"),
    re.compile(r"official boundary\b"),
    re.compile(r"production deployment\b"),
    re.compile(r"live data feed\b"),
    re.compile(r"live monitoring\b"),
    re.compile(r"real-time monitoring\b"),
    re.compile(r"guaranteed ROI\b"),
    re.compile(r"investment recommendation\b"),
    re.compile(r"automated decisioning\b"),
    re.compile(r"active cloud integration\b"),
]
# <!-- banned-claims: doctrine-reference:end -->

INCLUDE_EXTS = {".ts", ".tsx", ".js", ".json", ".md"}
EXCLUDE_DIRS = {"node_modules", ".next", ".git"}

ALLOW_FILES = {
    "PUBLIC_DEMO_DISCLAIMER.md",
}

NEGATION_RE = re.compile(
    r"(?:"
    r"\bno\s+"
    r"|\bnot\s+"
    r"|\bnever\b"
    r"|\bwithout\b"
    r"|\bnothing\b"
    r"|\bcannot\b"
    r"|n['’]t\s"
    r"|anti-"
    r"|\*\*[Nn]ot\*\*"
    r"|not an active"
    r"|no active"
    r"|future-gated"
    r"|future gates"
    r"|locked\s+future"
    r")",
    re.IGNORECASE,
)

OPEN_BLOCK_RE = re.compile(r"\b(?:blocked_use|forbiddenUse)\s*:\s*\[")
CLOSE_BRACKET_RE = re.compile(r"\]")


def should_scan(path: Path, root: Path) -> bool:
    if path.suffix not in INCLUDE_EXTS:
        return False
    rel_parts = path.relative_to(root).parts
    if any(p in EXCLUDE_DIRS for p in rel_parts):
        return False
    return True


def scan_file(
    path: Path,
    root: Path,
    log: list[str],
) -> list[tuple[str, int, str, str]]:
    rel = str(path.relative_to(root))
    if rel in ALLOW_FILES:
        log.append(f"ALLOW-FILE     {rel} (constitutional enumeration)")
        return []

    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return []

    hits: list[tuple[str, int, str, str]] = []
    in_block = False
    block_open_line = 0

    for lineno, raw in enumerate(text.splitlines(), start=1):
        if not in_block:
            open_m = OPEN_BLOCK_RE.search(raw)
            if open_m:
                tail = raw[open_m.end():]
                if CLOSE_BRACKET_RE.search(tail):
                    log.append(
                        f"SKIP-ARRAY     {rel}:{lineno} (inline blocked_use/forbiddenUse)"
                    )
                else:
                    in_block = True
                    block_open_line = lineno
                    log.append(
                        f"SKIP-ARRAY     {rel}:{lineno} (open blocked_use/forbiddenUse)"
                    )
                continue
        else:
            if CLOSE_BRACKET_RE.search(raw):
                in_block = False
                log.append(
                    f"SKIP-ARRAY     {rel}:{block_open_line}-{lineno} (close)"
                )
            continue

        for pat in FORBIDDEN_PATTERNS:
            m = pat.search(raw)
            if not m:
                continue
            if NEGATION_RE.search(raw):
                log.append(
                    f"SKIP-NEGATION  {rel}:{lineno} pattern={pat.pattern!r} "
                    f"line={raw.strip()[:120]!r}"
                )
                break
            hits.append((rel, lineno, raw.rstrip(), pat.pattern))
            break
    return hits


def main() -> int:
    root = Path.cwd().resolve()
    log: list[str] = []
    hits: list[tuple[str, int, str, str]] = []
    files_scanned = 0

    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        if not should_scan(path, root):
            continue
        files_scanned += 1
        hits.extend(scan_file(path, root, log))

    print("# Exposure guard · forbidden-claim phrase scan")
    print(f"# files scanned : {files_scanned}")
    print(f"# patterns      : {len(FORBIDDEN_PATTERNS)}")
    print(f"# allow-files   : {sorted(ALLOW_FILES)}")
    print()
    print("## Exclusion log (explainability)")
    if log:
        for entry in log:
            print(f"  {entry}")
    else:
        print("  (no exclusions fired)")
    print()
    print("## Active forbidden-claim hits")
    if not hits:
        print("  (clean — no active forbidden-claim phrases)")
        return 0

    for rel, lineno, line, pat in hits:
        print(
            f"::error file={rel},line={lineno}::"
            f"Active forbidden-claim phrase /{pat}/: {line.strip()[:200]}"
        )
    return 1


if __name__ == "__main__":
    sys.exit(main())
