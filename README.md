# CA Firm Diagnostic — build kit

Strategic diagnostic for a micro CA firm: founder wizard + anonymous staff pulse → auto-scoring workbook → three outputs (root-cause map, intervention table, dashboard). All forms Google Forms; all scoring Google Sheets formulas; nothing manual to enter.

## Files

| File | Role |
|---|---|
| `01_setup.gs` | **The build.** Paste into Apps Script → Run `buildDiagnostic()` → creates both forms + workbook + scoring tabs |
| `02_linkA_wizard.md` | Founder wizard source of truth (questions, routing, column map) |
| `03_linkC_pulse.md` | Staff pulse spec + anonymity protocol + forward message |
| `04_analysis_engine.md` | How scoring works + **dry-run procedure (do before sharing)** + fallback |
| `05_root-cause-map.md` | #8 template — filled in Week 2 |
| `06_intervention-table.md` | #9 template — max 6 rows |
| `07_dashboard.md` | #10 template — baseline lock + 6-month re-check |
| `08_validation-agenda.md` | Your 45-min session script with the founder |

## Deploy (once, ~10 min)

1. Go to **script.google.com** → *New project* → rename `ca-diagnostic`
2. Paste contents of `01_setup.gs` → **Save**
3. **Run** `buildDiagnostic()` → authorize (Review permissions → Advanced → Go to project → Allow)
4. Open **View → Execution log** → copy 3 links: Link A (founder), Link C (pulse), Workbook
5. **Dry-run** exactly per `04_analysis_engine.md` §Dry-run (test submissions → verify numbers → delete test rows)
6. Share: **Link A** to the founder (add: "12 minutes, answer alone, honest answers drive the plan"). **Link C** = forward the message in `03_linkC_pulse.md`, 5-day deadline.

## Timeline

| Week | What | Human effort |
|---|---|---|
| 1 | Build + dry-run + founder fills Link A (~12 min) + pulse live 5 days | Founder 12 min; team 4 min each; you forward once |
| 2 | Pulse closes (`closePulse()`) → analysis → fill #8 + #9 | Me |
| 3 | Validation session (`08_validation-agenda.md`) → lock #10 baseline | You + founder, 45 min |

## Guardrails

- **Run `buildDiagnostic()` once.** Rerun logs "ALREADY BUILT" and stops (use `clearBuild_()` only if a partial build must be redone).
- Anonymity: no email collection, no sign-in limit, themes-only reporting — never show raw/verbatim responses to the founder.
- Confidence discipline: pulse = strong stream; founder opinions = capped at weak; confirmed cause = ≥2 streams (see `04_analysis_engine.md`).
- Exit history / person-level Link B is **shelved** — strategic-level only, per scope decision.
- Not committed to git — files are in `output/ca-firm-diagnostic/`; commit when you say so.

## Ownership

Me: script, specs, templates, Week-2 analysis fills. You: deploy + forward + validation session. Founder: one wizard + one 45-min session. Team: one 4-min pulse.
