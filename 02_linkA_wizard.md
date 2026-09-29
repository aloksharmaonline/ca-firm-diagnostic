# Link A — Founder Wizard (strategic diagnostic)

**Purpose:** capture the founder's own priority destination, his view of what's dissatisfying, his vision, and the firm profile — in one sitting (~12 min). This is the source of truth for `01_setup.gs`. If building manually, recreate exactly in this order.

**Design rules**
- Section 1 (destination) routes the founder to ONE branch — he sees only his path.
- Every branch section ends by auto-advancing to Vision (set via `PageBreakItem.setGoToPage`, not per-question nav).
- "Not sure" gets a mini-branch that routes into whichever branch he picks.
- No "Other" option on routing questions (Forms restriction: nav choices can't mix with non-nav).
- No person-level/exit-history questions (that's Link B — shelved).

---

## Page 1 — Intro + destination

**Form description:**
> A 12-minute structured conversation about where the firm is and where you want it. There are no right answers — your honest view shapes the plan. The next section adapts to what you pick first.

**Q1. In the next 12 months, what would you most want to fix or change?** *(required, routing)*

| Choice | Routes to section |
|---|---|
| Growing revenue / taking on more work | Growth & capacity |
| People — keeping good people / their motivation | People & motivation |
| Succession — someone to carry the firm besides me | Succession & mid-layer |
| Quality & risk — errors, review, compliance slips | Quality & risk |
| My own time — I am the bottleneck | Your time & delegation |
| Not sure / it's a mix of things | Let's pinpoint it |

---

## Branch: Growth & capacity

**G1. What best describes the firm's capacity right now?** *(required)*
- We're maxed out — can't take more work
- We could take more, but something holds us back
- Plenty of capacity — the issue is getting the work

**G2. If three good people joined next month, what could the firm do that it can't today?** *(text, required)*

**G3. Biggest blocker to growing from where you are today?** *(required)*
- Not enough people with the right skills
- My own time and involvement
- Getting clients / pipeline
- Fear of quality slipping as we grow

→ auto-advance to **Vision**

---

## Branch: People & motivation

**P1. Which best describes the people situation?** *(required)*
- Good people leave too soon
- We struggle to attract good people
- People stay but aren't growing
- A mix of these

**P2. One person the firm cannot afford to lose:** *(text, optional)*
- Help text: leave blank to skip — used only for your continuity planning, not scored

**P3. When someone good resigns, how do you usually learn why?** *(required)*
- We have a proper exit conversation
- I hear it indirectly from others
- I can only guess
- I usually don't find out

**P4. In your view, why do good people leave here?** *(required)*
- No visible career path
- Pay below market
- Workload / season pressure
- Not enough guidance or mentoring
- They get pulled by industry / Big 4

→ auto-advance to **Vision**

---

## Branch: Succession & mid-layer

**S1. If you stopped working tomorrow, what would happen?** *(required)*
- The firm would struggle badly
- A few people could carry parts of it
- There's a clear person/team that could carry it

**S2. Besides you, who has real relationships with clients?** *(text, required)*

**S3. How much of your week is work only you can do?** *(required)*
- Less than 25%
- 25–50%
- 50–75%
- More than 75%

→ auto-advance to **Vision**

---

## Branch: Quality & risk

**Q1. When errors happen, where are they usually caught?** *(required)*
- In our own review
- The client flags them
- Found late / after filing
- Not tracked

**Q2. Where is the review/approval bottleneck today?** *(text, required)*

**Q3. Biggest quality risk right now?** *(required)*
- Workload in peak season
- Skill gaps in the team
- No standard processes / templates
- Unclear who is accountable

→ auto-advance to **Vision**

---

## Branch: Your time & delegation

**T1. What eats most of your calendar?** *(required)*
- Client work only I can do
- Firefighting and re-review
- People issues
- Business development
- Admin and coordination

**T2. First thing you'd hand off if you could trust it would be done right?** *(text, required)*

**T3. How often do people bring you decisions they could make themselves?** *(required)*
- Rarely
- Sometimes
- Often
- Almost always

→ auto-advance to **Vision**

---

## Section: Let's pinpoint it  *(target of "Not sure")*

**U1. Which area feels most stuck today?** *(required, routing)*

| Choice | Routes to section |
|---|---|
| Growing revenue / taking on more work | Growth & capacity |
| People — keeping good people | People & motivation |
| Succession | Succession & mid-layer |
| Quality & risk | Quality & risk |
| My own time | Your time & delegation |

---

## Page: Vision — where the firm is going  *(all branches converge here)*

**V1.** Imagine the firm is working exactly right three years from now. What is true that isn't true today? *(paragraph, required)*

**V2.** What must the firm never lose — what does it stand for? *(paragraph, required)*

**V3.** In one line, what should the firm be known for? *(text, required)*

→ default continue

---

## Page: Reality check & success test

**W1.** What have you already tried to fix this? What happened? *(paragraph, required)*

**W2.** What signs or numbers will tell you it's actually working? *(paragraph, required)*
- This is the founder's own definition of "solved" → becomes the headline of #10 Dashboard

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

**F7.** People who left in the last 24 months (approximate)? *(number, required — founder's estimate, tagged low-confidence)*

---

## Form settings (Link A)

- Collect email addresses: **OFF**
- Limit to 1 response: **OFF** (avoids Google sign-in requirement)
- Allow response editing: **ON** (founder may refine answers)
- Confirming message: *"Submitted. Your answers are now feeding the diagnostic — next step is a short review session."*

## Response column map (do not reorder questions — formulas depend on this)

| Col | Question | Col | Question |
|---|---|---|---|
| B | Q1 destination | O | Q3 quality risk |
| C | G1 capacity | P | T1 calendar |
| D | G2 text | Q | T2 text |
| E | G3 blocker | R | T3 decisions |
| F | P1 people situation | S | U1 pinpoint |
| G | P2 text | T | V1 vision |
| H | P3 how-hear (provenance) | U | V2 stand-for |
| I | P4 why-they-leave | V | V3 one-line |
| J | S1 if-I-stopped | W | W1 tried |
| K | S2 text | X | **W2 solved-definition** |
| L | S3 week-protected | Y | F1 partners |
| M | Q1 errors-caught | Z | F2 staff |
| N | Q2 text | AA | F3 articled |
| | | AB | F4 qualified |
| | | AC | F5 service lines |
| | | AD | F6 revenue direction |
| | | AE | F7 exits-24mo |
