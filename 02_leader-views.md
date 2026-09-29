# Leader Views — founder diagnostic (v3, goal-first)

**Purpose:** capture the founder's vision, the ONE 12-month outcome he wants, a single-goal root-cause analysis on it, and the firm profile — in one sitting (~12 min). This is the source of truth for `01_setup.gs`. If building manually, recreate exactly in this order.

**Design rules**
- **Goal-first:** vision (D1) and the 12-month goal (D2) come BEFORE any diagnosis — the whole plan anchors to his words, not ours.
- **One goal only:** D3 routes him to a single theme section; that section is the RCA. Additional goals are parked for the validation session (`08`), not collected here.
- **RCA shape (7 questions, identical in every branch):** symptom → lead sign → lag target → cause domains → why → binding constraint → evidence grade. R3 options are theme-specific; everything else is shared wording.
- Every question carries a provenance tag (legend below) — the method is sourced, not invented.
- No "Other" option on routing questions (Forms restriction: nav choices can't mix with non-nav).
- No person-level questions (Link B / Person Records stays shelved).

### Provenance legend

| Tag | Method |
|---|---|
| AI | Appreciative Inquiry — future-back vision framing |
| CPS | Creative Problem Solving — problem/goal definition |
| KN | Kaplan & Norton — lead and lag measures |
| ISH | Ishikawa-lite — cause-domain checklist |
| TOC | Theory of Constraints — thinking process + single binding constraint |
| IMA·RH | IMA × Robert Half Global Talent Retention 2023 — evidence-based retention drivers |
| EVID | Kit's own 2-stream evidence rule (see `04_analysis_engine.md`) |

---

## Page 1 — Intro + vision + goal

**Form title:** `Leader Views`

**Form description:**
> A 12-minute structured conversation: where the firm is going, the one outcome you want in the next 12 months, and what's really in the way. There are no right answers — your honest view drives the plan. The next section adapts to what you pick first.

**D1 [AI]. Imagine the firm is working exactly right three years from now. What is true that isn't true today?** *(paragraph, required)*

**D2 [CPS]. In the next 12 months, what ONE outcome would most change the firm for the better?** *(paragraph, required)*
- Help text: one outcome only — describe it in a sentence or two.
- Design note: goals beyond the first are captured live in the validation session, not here.

**D3 [CPS]. Which theme is that goal mostly about?** *(required, routing)*

| Choice | Routes to section |
|---|---|
| Growing revenue / taking on more work | Growth & capacity |
| People — keeping good people / their motivation | People & motivation |
| Succession — someone to carry the firm besides me | Succession & continuity |
| Quality & risk — errors, review, compliance slips | Quality & risk |
| My own time — I am the bottleneck | Your time & delegation |
| Not sure / it's a mix of things | Let's pinpoint it |

---

## The RCA section (all five branches — same 7 questions)

Each routed branch is a page break titled with the theme. Questions are identical in wording across branches; **R3 is theme-specific** (below). → after the section: **Values**.

**S1 [ISH]. How is this showing up today — what's actually happening?** *(paragraph, required)*

**S2 [KN]. What early sign would tell you this goal is starting to move, before any number shows it?** *(text, required)*
- This is the LEAD measure: observable within weeks.

**S3 [KN]. What number or fact, six months from now, would prove this goal is achieved?** *(text, required)*
- This is the LAG target: the founder's own definition of "done" → becomes Dashboard B3.

**R1 [ISH]. Where could this be coming from? Select all that contribute.** *(checkbox, required)*
- People & skills
- Process & standards
- Capacity & time
- Client mix & pipeline
- Tools & systems
- Leadership & communication

**R2 [TOC]. Why, what's stopping you?** *(paragraph, required)*
- Thinking-process question in his own words. Replaces the old accusatory "why do good people leave here?" framing.

**R3 [TOC]. If only one of these could be fixed, which is the binding constraint?** *(required)*

| Branch | R3 options |
|---|---|
| Growth & capacity | Not enough people with the right skills · My own time and involvement · Getting clients / pipeline · Fear of quality slipping as we grow |
| People & motivation **[IMA·RH]** | No visible career path · Pay below market · Workload / season pressure · Not enough guidance or mentoring |
| Succession & continuity | No one beyond me with client relationships · Work only I can do · Nobody ready / being developed |
| Quality & risk | Workload in peak season · Skill gaps in the team · No standard processes / templates · Unclear who is accountable |
| Your time & delegation | Client work only I can do · Firefighting and re-review · People issues · Admin and coordination |

**R4 [EVID]. What backs your answer?** *(required)*
- Firm numbers or records
- Direct observation
- My own judgment

---

## Section: Let's pinpoint it *(target of "Not sure")*

**U1 [CPS]. Which area feels most stuck today?** *(required, routing)*

| Choice | Routes to section |
|---|---|
| Growing revenue / taking on more work | Growth & capacity |
| People — keeping good people | People & motivation |
| Succession | Succession & continuity |
| Quality & risk | Quality & risk |
| My own time | Your time & delegation |

---

## Page: Values *(all branches converge here)*

**V1 [AI]. What must the firm never sacrifice to reach this goal — where's the line you won't cross?** *(paragraph, required)*

→ default continue

---

## Page: Firm profile — last section

**F1.** How many partners? *(number, required — type a number)*
**F2.** Total staff (excluding partners)? *(number, required)*
**F3.** How many are articled clerks / trainees? *(number, required)*
**F4.** How many are CA-qualified (not partners)? *(number, required)*
**F5.** Service lines — select all that apply *(checkbox, required)*
- Audit & assurance
- Income tax
- GST & indirect tax
- ROC & compliance
- Advisory & other

**F6.** Revenue direction, last 3 years? *(required)*
- Up
- Flat
- Down

**F7.** People who left in the last 24 months (approximate)? *(number, required — founder's estimate, tagged LOW confidence)*

---

## Form settings (Leader Views)

- Collect email addresses: **OFF**
- Limit to 1 response: **OFF** (avoids Google sign-in requirement)
- Allow response editing: **ON** (founder may refine answers)
- Confirmation message: *"Submitted. Your answers are now feeding the diagnostic — next step is a short review session."*

## Response column map (do not reorder questions — formulas depend on this)

| Col | Item | Col | Item |
|---|---|---|---|
| B | D1 vision (3 yrs) | S–Y | Succession RCA (S1,S2,S3,R1,R2,R3,R4) |
| C | D2 goal (12 mo) | Z–AF | Quality RCA (S1…R4) |
| D | D3 theme routing | AG–AM | Time RCA (S1…R4) |
| E–K | Growth RCA (S1,S2,S3,R1,R2,R3,R4) | AN | U1 pinpoint |
| L–R | People RCA (S1…R4) | AO | V1 values |
| | | AP–AV | F1–F7 profile (AP partners, AQ staff, AR articled, AS qualified, AT service lines, AU revenue, AV exits) |

- Only the routed branch carries data; the other four branch groups stay blank.
- **Lag target (S3) columns:** G (Growth), N (People), U (Succession), AB (Quality), AI (Time) — the Dashboard pulls the last non-empty across these five.
