# Team Opinion — anonymous staff battery (v2, validated instruments)

**Purpose:** the unfiltered evidence stream — current-state truth from the team, invisible to the founder. Feeds #8 root-cause map as the HIGH-confidence stream (owner-bias counterweight).

**Settings:** 22 questions (~20 rating + 2 optional comments), 5–6 minutes, 5-day window.

**Instrument backbone:** COPSOQ III core items (free, CC BY-NC-ND) + Edmondson Psychological Safety 7. Wording is **verbatim — never paraphrase, never reword between waves** (license + comparability rule).

---

## Form description (shown at top)

> **Team Opinion — about 5 minutes, anonymous.**
> 20 quick rating questions plus 2 optional comments. This is anonymous: no email is collected and no names are asked. Please don't write anyone's names in the text answers — including your own. Honest answers help the firm fix the right things. Nothing you write will be attributed to you.

---

## Battery (creation order = column order)

Anchor sets (shown in each scale's help text, endpoints on the scale itself):

- **FREQ** — `1 = Always · 2 = Often · 3 = Sometimes · 4 = Seldom · 5 = Never or hardly ever`
- **EXT** — `1 = To a very large extent · 2 = To a large extent · 3 = Somewhat · 4 = To a small extent · 5 = To a very small extent`
- **SAT** — `1 = Very satisfied · 2 = Satisfied · 3 = Neither/Nor · 4 = Unsatisfied · 5 = Very unsatisfied`
- **AG7** — `1 = Strongly disagree … 7 = Strongly agree`

### Section 1 — Your work (cols B–G)

| Col | Code | Item (verbatim) | Anchors |
|---|---|---|---|
| B | QD2 | How often do you not have time to complete all your work tasks? | FREQ |
| C | QD3 | Do you get behind with your work? | FREQ |
| D | WF2 | Do you feel that your work drains so much of your energy that it has a negative effect on your private life? | EXT |
| E | WF3 | Do you feel that your work takes so much of your time that it has a negative effect on your private life? | EXT |
| F | PD2 | Do you have the possibility of learning new things through your work? | EXT |
| G | JS4 | Regarding your work in general. How pleased are you with your job as a whole, everything taken into consideration? | SAT |

### Section 2 — How you're managed (cols H–M)

| Col | Code | Item (verbatim) | Anchors |
|---|---|---|---|
| H | SS | How often do you get help and support from your immediate supervisor, if needed? | FREQ |
| I | CL1 | Does your work have clear objectives? | EXT |
| J | RE1 | Is your work recognized and appreciated by the management? | EXT |
| K | JU1 | Are conflicts resolved in a fair way? | EXT |
| L | JU4 | Is the work distributed fairly? | EXT |
| M | TMX2 | Can the employees trust the information that comes from the management? | EXT |

### Section 3 — Your team (cols N–U)

| Col | Code | Item (verbatim) | Anchors |
|---|---|---|---|
| N | SW1 | Is there a good atmosphere between you and your colleagues? | FREQ |
| O | PS1 *(reversed)* | If you make a mistake on this team, it is often held against you. | AG7 |
| P | PS2 | Members of this team are able to bring up problems and tough issues. | AG7 |
| Q | PS3 *(reversed)* | People on this team sometimes reject others for being different. | AG7 |
| R | PS4 | It is safe to take a risk on this team. | AG7 |
| S | PS5 *(reversed)* | It is difficult to ask other members of this team for help. | AG7 |
| T | PS6 | No one on this team would deliberately act in a way that undermines my efforts. | AG7 |
| U | PS7 | Working with members of this team, my unique skills and talents are valued and utilized. | AG7 |

### Section 4 — Optional comments (cols V–W)

- **O1.** What's the best thing about working here? *(paragraph, optional)*
- **O2.** If you could change ONE thing about working here, what would it be? *(paragraph, optional)*

**Dropped from v1 (binding decisions):** the turnover-intent item ("seriously considered leaving") — psychologically unsafe at n<20 — and all homegrown Likert wording. Founder-side "why do good people leave here?" is gone too (see `02_leader-views.md` R2).

---

## Dimensions and scoring (wired into TeamOpinion_Scoring)

| Dimension | Items | Type | Direction |
|---|---|---|---|
| Quantitative Demands (QD) | QD2, QD3 | FREQ | **Risk** (high = more demands) |
| Work-Life Conflict (WF) | WF2, WF3 | EXT | **Risk** (high = more conflict) |
| Supervisor Support (SS) | SS | FREQ | Protective |
| Role Clarity (CL) | CL1 | EXT | Protective |
| Recognition (RE) | RE1 | EXT | Protective |
| Justice (JU) | JU1, JU4 | EXT | Protective |
| Trust in Management (TM) | TMX2 | EXT | Protective |
| Sense of Community (SW) | SW1 | FREQ | Protective |
| Possibilities for Development (PD) | PD2 | EXT | Protective |
| Job Satisfaction (JS) | JS4 | SAT | Protective |
| Psychological Safety (PS) | PS1–PS7 | AG7 | Protective |

**Rules**
- **COPSOQ item score (0–100)** = `(5 − answer) × 25` — official anchors (1 → 100 … 5 → 0); dimension = mean of its items; scored in the direction of the scale name (COPSOQ manual).
- **Psychological safety:** reverse PS1/PS3/PS5 (`8 − answer`), mean of 7 → 1–7; health = `(mean − 1) / 6 × 100`.
- **Health score** (used for ranking): protective dimensions = official score; risk dimensions (QD, WF) = `100 − official`. Higher health = better everywhere.
- **Flags = within-firm relative only:** the **bottom 2 dimensions by health** get `FLAG`. No invented benchmark cutoffs — at n≈15 there is no defensible external threshold.
- **n** = numeric count in a required column (header-safe).
- Single-item dimensions are official COPSOQ III practice (Recognition, Trust, etc. are 1-item scales in the international middle version).

**Documented deviations (Forms limitations):**
- COPSOQ's "I do not have a supervisor / colleagues" missing-options can't be coded as missing in Forms (scales are required). At this firm's scale every respondent reports to a partner/senior — acceptable.
- Questions are grouped in 4 sections for the respondent; grouping never affects column order.

---

## Anonymity protocol (non-negotiable)

1. Email collection OFF, "limit to 1 response" OFF (no sign-in → no identity trail)
2. Report in **themes and percentages only** — never verbatim quotes with identifying style, never by timestamp
3. At n<20, individual answers are never shown separately to the founder
4. The founder sees the aggregated Dashboard + themes in #8, nothing raw

## Form settings (Team Opinion)

- Collect email addresses: **OFF**
- Limit to 1 response: **OFF**
- Allow response editing: **OFF**
- Confirmation message: *"Thank you — your response is anonymous and has been recorded."*
- Closing: run `closeTeamOpinion()` in Apps Script (or close responses in the Form UI) after the 5-day window

---

## Licenses & validity notes

- **COPSOQ III** — International COPSOQ Network / Burr et al. (2019), free under **CC BY-NC-ND 4.0**: items quoted **verbatim**, attributed, non-commercial consulting use, no wording changes. No India-validated version exists → international English + read-aloud pretest before launch (2 people outside the sample; comprehension check only — wording may not be "fixed").
- **Edmondson Psychological Safety (1999)** — 7 items quoted verbatim, cited (Admin. Science Quarterly 44(2)); standard practice for internal, non-public team diagnostics.

---

## Forward message (send this with the link)

> Hi team — quick favor. We're doing a short, honest review of how the firm is working (for everyone, not for any individual), and your input is the most important part.
>
> **Link:** [TEAM OPINION LINK]
>
> 20 quick rating questions + 2 optional comments, about 5 minutes, completely anonymous — no email, no names, and results will only be seen as themes and percentages, never individual answers.
>
> Please fill it by **[DATE + 5 days]**. The more of you fill it, the more useful the outcome is for all of us. Thanks.
