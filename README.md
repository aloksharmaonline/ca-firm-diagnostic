# CA Firm Diagnostic — build kit

Strategic diagnostic for a micro CA firm: **Leader Views** (founder, goal-first RCA) + **Team Opinion** (anonymous staff battery) → auto-scoring workbook → three outputs (root-cause map, intervention table, dashboard). All forms Google Forms; all scoring Google Sheets formulas; nothing manual to enter.

## Files

| File | Role |
|---|---|
| `01_setup.gs` | **The build.** Paste into Apps Script → Run `buildDiagnostic()` → creates both forms + workbook + scoring tabs |
| `02_leader-views.md` | Leader Views spec — founder source of truth (questions, routing, provenance tags, column map) |
| `03_team-opinion.md` | Team Opinion spec — validated battery (COPSOQ III + Edmondson-7), scoring, anonymity, forward message |
| `04_analysis_engine.md` | How scoring works + **dry-run procedure (do before sharing)** + fallback |
| `05_root-cause-map.md` | #8 template — filled in Week 2 |
| `06_intervention-table.md` | #9 template — max 6 rows |
| `07_dashboard.md` | #10 template — baseline lock + 6-month re-check |
| `08_validation-agenda.md` | Your 45-min session script with the founder |

## Deploy (once, ~10 min)

1. Go to **script.google.com** → *New project* → rename `ca-diagnostic`
2. Paste contents of `01_setup.gs` → **Save**
3. **Run** `buildDiagnostic()` → authorize (Review permissions → Advanced → Go to project → Allow)
4. Open **View → Execution log** → copy 3 links: Leader Views (founder), Team Opinion (team), Workbook
5. **Dry-run** exactly per `04_analysis_engine.md` §Dry-run (test submissions → verify numbers → delete test rows)
6. Share: **Leader Views** to the founder (add: "12 minutes, answer alone, honest answers drive the plan"). **Team Opinion** = forward the message in `03_team-opinion.md`, 5-day deadline.

## Timeline

| Week | What | Human effort |
|---|---|---|
| 1 | Build + dry-run + founder fills Leader Views (~12 min) + Team Opinion live 5 days | Founder 12 min; team 5 min each; you forward once |
| 2 | Team Opinion closes (`closeTeamOpinion()`) → analysis → fill #8 + #9 | Me |
| 3 | Validation session (`08_validation-agenda.md`) → lock #10 baseline | You + founder, 45 min |

## Guardrails

- **Run `buildDiagnostic()` once.** Rerun logs "ALREADY BUILT" and stops (use `clearBuild_()` only if a partial build must be redone — it purges current + legacy ID keys).
- Anonymity: no email collection, no sign-in limit, themes-only reporting — never show raw/verbatim responses to the founder.
- Confidence discipline: Team Opinion = strong stream; founder opinions = capped at weak (R4 = "firm numbers" upgrades to medium); confirmed cause = ≥2 streams (see `04_analysis_engine.md`).
- Instrument wording is **verbatim** (COPSOQ III CC BY-NC-ND, Edmondson-7) — never edit Team Opinion item text, in any wave.
- Person-level Link B / Person Records stays **shelved** — strategic-level only, per scope decision.
- Kit lives in `github.com/aloksharmaonline/ca-firm-diagnostic`. **`LINKS.md` is gitignored** (private form edit URLs) — never push it to the public repo.

## Ownership

Me: script, specs, templates, Week-2 analysis fills. You: deploy + forward + validation session. Founder: one Leader Views wizard + one 45-min session. Team: one 5-min Team Opinion.
