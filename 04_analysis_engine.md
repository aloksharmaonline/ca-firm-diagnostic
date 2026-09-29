# Analysis Engine — what runs automatically, and how to verify it

## Workbook tabs

| Tab | What it is | Auto? |
|---|---|---|
| `LinkA_Responses` | Raw founder wizard responses (30 cols, A=Timestamp, B..AE=questions) | Auto (Forms) |
| `LinkC_Responses` | Raw pulse responses (A=Timestamp, B..K=10 scales, L/M=open text) | Auto (Forms) |
| `Pulse_Scoring` | Per-question favorable %, block averages, n | Auto (formulas) |
| `Dashboard` | Headline: priority, "solved" definition, 5 metrics, flags, context strip | Auto (formulas) |

## Scoring logic (Pulse_Scoring)

- **Favorable %** per question = `COUNTIF(range,">=4") / COUNT(range)` → share answering Agree/Strongly agree. `COUNT` counts numeric only → header row can't corrupt n.
- **Block score** = average of its 3 questions (`Growth`=C13, `Workload`=C14, `Support`=C15).
- **Turnover intent** = T1 favorable (row 16).
- **Flags:** block < 50% → `RED`; turnover intent ≥ 30% → `WATCH` (computed on Dashboard).

## Dashboard logic

- Founder's priority + "solved" definition pulled with `LOOKUP(2,1/(col<>""),col)` → **last non-empty row**, i.e. his latest submission (he may edit/resubmit).
- Context strip (partners, staff, leverage = staff/partner, revenue direction, exits-24mo) — same pull, from profile columns Y/Z/AA/AB/AD/AE.

## Confidence weighting (used when building #8)

| Stream | Weight | Why |
|---|---|---|
| Pulse (anonymous staff) | **Strong** | Owner-bias-proof; current-state truth |
| Founder wizard — facts (profile, capacity, caught-errors) | **Medium** | Direct observation, low skew |
| Founder wizard — opinions (P4 why-they-leave, P3 provenance) | **Low** unless P3 = "proper exit conversation" | Attribution/self-serving bias |
| Exits-24mo number (F7) | **Low** — founder estimate | Memory reconstruction |

**Rule:** a cause enters #8 as **Confirmed** only if ≥2 streams point the same way. Pulse alone beats founder-alone. Founder-alone caps at **Weak**.

---

## Dry-run procedure (BEFORE sharing any link)

**Purpose:** prove forms → tabs → formulas wiring works with zero manual data entry.

1. Open the workbook from the build log. Confirm tabs: `LinkA_Responses`, `LinkC_Responses`, `Pulse_Scoring`, `Dashboard`. If response tabs missing/misnamed → submit ONE dummy response to each form, then re-run `bindResponseSheets()` in the editor.
2. Open **Link C edit URL → Preview →** answer all 10 scales: make Q1..Q3 = 5, Q4..Q6 = 2, Q7..Q9 = 4, Q10 = 5. Submit.
3. Open **Link A edit URL → Preview** → pick *Growing revenue* → answer branch (any) → vision/reality/profile: partners=3, staff=12, articled=8, qualified=3, revenue=Flat, exits=4. Submit.
4. Check `Pulse_Scoring`: n = **1**; G1 favorable = **100%**; W1 favorable = **0%**; S1 = **100%**; T1 = **100%**; Growth block = 100%, Workload = 0%, Support = 100%.
5. Check `Dashboard`: priority = *Growing revenue...*; "solved" = your W2 text; Overall favorable = **70%** (avg of 7×100% + 3×0% = 7/10); Leverage = 4.0 (12/3); Exits = 4; Flags: Overall OK (≥50%), Workload **RED**, Turnover **WATCH**.
6. If any cell shows `-`, `#DIV/0!`, or wrong numbers → check tab names first (formulas reference exact names), then column order (02/03 docs are the contract).
7. **Clean up:** select both response rows (row 2 in each tab) → right-click → *Delete row*. Scoring resets to blank/`-`. Then share links.

## Fallback (if the script fails mid-build)

- Error line is logged in the Apps Script editor (View → Logs).
- `bindResponseSheets()` and `clearBuild_()` are safe to re-run.
- Full manual build spec: `02_linkA_wizard.md` + `03_linkC_pulse.md` (exact texts, order, routing tables) — build both forms by hand in Forms UI (branching: select question → "Go to section based on answer"), link both to one Sheet, and re-create the two formula tabs by copying formulas from this file's logic section above.

## Manual step that automation cannot do

Closing the pulse after day 5: run `closePulse()` in the editor (or Form UI → *Accepting responses* off). Then proceed to Week 2 analysis with `05_root-cause-map.md`.
