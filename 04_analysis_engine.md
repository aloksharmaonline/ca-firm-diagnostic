# Analysis Engine — what runs automatically, and how to verify it

## Workbook tabs

| Tab | What it is | Auto? |
|---|---|---|
| `LeaderViews_Responses` | Raw founder responses (48 cols: A=Timestamp, B..AV=questions) | Auto (Forms) |
| `TeamOpinion_Responses` | Raw staff battery (23 cols: A=Timestamp, B..U=20 scales, V/W=open text) | Auto (Forms) |
| `TeamOpinion_Scoring` | 11 dimension scores (official 0–100 + health), psych-safety mean, n, flags | Auto (formulas) |
| `Dashboard` | Headline: goal, lag target, vision, psych safety, dimension table, context strip | Auto (formulas) |

Column contracts: `02_leader-views.md` (Leader Views map) and `03_team-opinion.md` (battery map).

## Scoring logic (TeamOpinion_Scoring)

- **COPSOQ item value** = `(5 − answer) × 25` → official 0–100 anchors (1→100 … 5→0). Dimension = mean of its items. Scored in the direction of the scale name — so **QD and WF are risk-direction** (high = worse), everything else protective.
- **Health** (used for ranking): protective = official; QD/WF = `100 − official`. Higher health = better, always.
- **Psychological safety:** PS1/PS3/PS5 reversed (`8 − answer`), mean of 7 → 1–7 (row 14), health = `(mean − 1) / 6 × 100` (row 12).
- **Flags:** `Rank` = `COUNTIF(health range, "<" & this) + 1` (ascending, ties share rank); **bottom 2 → `FLAG`**. Within-firm relative only — no invented cutoffs.
- **n** = `COUNT` of a required response column → header-safe.
- Empty workbook (no submissions yet): every score cell shows `""`, flags blank — that is correct, not an error.

## Dashboard logic

- **B2 founder goal** / **B4 vision** — `LOOKUP(2,1/(col<>""),col)` → last non-empty row (he may edit/resubmit → latest wins).
- **B3 lag target** — same pull nested across the five S3 columns (G, N, U, AB, AI); only the routed branch carries data.
- **B5/B6** psych safety + n — direct refs to `TeamOpinion_Scoring!B14/B15`.
- **Dimension table (rows 9–19)** — mirrors Scoring health + flags.
- **Context strip (rows 22–29)** — partners/staff/articled/qualified from AP–AS, leverage = staff/partner, revenue AU, exits AV, service lines AT.

## Confidence weighting (used when building #8)

| Stream | Weight | Why |
|---|---|---|
| Team Opinion (anonymous staff) | **Strong** | Owner-bias-proof; current-state truth |
| Leader Views — facts (profile, R1 domains, capacity) | **Medium** | Direct observation, low skew |
| Leader Views — opinions (R2 why-text, R3 constraint pick) | **Low**, upgraded to **Medium** if his R4 = "Firm numbers or records" | Attribution/self-serving bias; self-tagged evidence is the only upgrade path |
| Exits-24mo number (F7) | **Low** — founder estimate | Memory reconstruction |

**Rule:** a cause enters #8 as **Confirmed** only if ≥2 streams point the same way. Team Opinion alone beats founder-alone. Founder-alone caps at **Weak**.

---

## Dry-run procedure (BEFORE sharing any link)

**Purpose:** prove forms → tabs → formulas wiring works with zero manual data entry.

1. Open the workbook from the build log. Confirm tabs: `LeaderViews_Responses`, `TeamOpinion_Responses`, `TeamOpinion_Scoring`, `Dashboard`. If response tabs missing/misnamed → submit ONE dummy response to each form, then re-run `bindResponseSheets()` in the editor.
2. Open **Team Opinion edit URL → Preview →** answer everything: all 13 five-point items (QD2…SW1) = **2**; psychological safety: answer **1** to PS1, PS3, PS5 (the negatively worded ones) and **7** to PS2, PS4, PS6, PS7; add any text in the two comments. Submit.
3. Open **Leader Views edit URL → Preview** → fill vision, fill the 12-month goal, pick *Growing revenue* → RCA (S1/S2 any text, S3 = *"revenue up 20%"*, R1 tick two boxes, R2 any, R3 any, R4 = *My own judgment*) → values → profile: partners=3, staff=12, articled=8, qualified=3, service lines tick one, revenue=Flat, exits=4. Submit.
4. Check `TeamOpinion_Scoring`: n = **1**; QD official **75** → health **25** → FLAG; WF same **25** → FLAG; every protective dimension health **75** (rank 3, no flag); psych-safety mean **7.00** → health **100**; exactly **2 FLAGs** (QD, WF).
5. Check `Dashboard`: B2 = your goal text; B3 = *revenue up 20%*; B4 = vision text; B5 = **7.00**; B6 = **1**; rows 9–19 mirror the scoring tab (QD/WF flagged); leverage = **4.0** (12/3); revenue = Flat; exits = **4**.
6. If any cell shows `-`, `#DIV/0!`, or wrong numbers → check tab names first (formulas reference exact names), then column order (02/03 docs are the contract).
7. **Clean up:** select row 2 in each response tab → right-click → *Delete row*. Scoring resets to blank/`-`. Then share links.

## Fallback (if the script fails mid-build)

- Error line is logged in the Apps Script editor (View → Logs).
- `bindResponseSheets()` and `clearBuild_()` are safe to re-run.
- Full manual build spec: `02_leader-views.md` + `03_team-opinion.md` (exact texts, order, routing tables) — build both forms by hand in Forms UI (branching: select question → "Go to section based on answer"), link both to one Sheet, and re-create the two formula tabs by copying the formulas in this file's logic sections above.

## Manual step that automation cannot do

Closing Team Opinion after day 5: run `closeTeamOpinion()` in the editor (or Form UI → *Accepting responses* off). Then proceed to Week 2 analysis with `05_root-cause-map.md`.
