# Link C — Staff Pulse (anonymous)

**Purpose:** the unfiltered evidence stream — what's actually dissatisfying inside the firm, straight from the team, invisible to the founder. Feeds #8 root-cause map as the HIGH-confidence stream (owner bias counterweight).

**Settings:** 12 questions, ~4 minutes, 5-day window.

---

## Form description (shown at top)

> **Team Pulse — 4 minutes, anonymous.**
> 12 quick questions. This is anonymous: no email is collected and no names are asked. Please don't write anyone's names in the text answers — including your own. Honest answers help the firm fix the right things. Nothing you write will be attributed to you.

## Questions

**Scale items (1–5, required).** Help text on every scale: `1 = Strongly disagree · 2 = Disagree · 3 = Neutral · 4 = Agree · 5 = Strongly agree`

### Block: Growth (cols B–D)
- **G1.** I can see a next step for my career here.
- **G2.** I'm learning and growing through my work here.
- **G3.** I can see myself working here two years from now.

### Block: Workload (cols E–G)
- **W1.** My workload is manageable through most of the year.
- **W2.** Even in peak/busy season, a sustainable pace is possible.
- **W3.** I can do good work here without burning out.

### Block: Support (cols H–J)
- **S1.** I can speak openly with the partners/seniors about problems.
- **S2.** I know what's expected of me and how my work is judged.
- **S3.** Good work gets noticed here.

### Block: Turnover intent (col K)
- **T1.** I have seriously considered leaving this firm in the past 6 months.

### Open text (cols L–M, optional)
- **O1.** What's the best thing about working here?
- **O2.** If you could change ONE thing about working here, what would it be?

---

## Scoring rules (wired into Pulse_Scoring tab)

- **Favorable %** per question = share answering 4 or 5 ÷ valid responses
- **Block score** = average of its questions' favorable %
- **Red flag:** any block < 50% favorable
- **Watch flag:** T1 (turnover intent) ≥ 30% favorable-agree
- **n** counted from numeric responses only (header-safe)

## Anonymity protocol (non-negotiable)

1. Email collection OFF, "limit to 1 response" OFF (no sign-in → no identity trail)
2. Report in **themes and percentages only** — never verbatim quotes with identifying style, never by timestamp
3. At n<20, individual answers are never shown separately to the founder
4. The founder sees the aggregated Dashboard + themes in #8, nothing raw

## Form settings (Link C)

- Collect email addresses: **OFF**
- Limit to 1 response: **OFF**
- Allow response editing: **OFF**
- Confirming message: *"Thank you — your response is anonymous and has been recorded."*
- Closing: run `closePulse()` in Apps Script (or close responses in the Form UI) after the 5-day window

---

## Forward message (send this with the link)

> Hi team — quick favor. We're doing a short, honest review of how the firm is working (for everyone, not for any individual), and your input is the most important part.
>
> **Link:** [PULSE LINK]
>
> 12 questions, about 4 minutes, completely anonymous — no email, no names, and results will only be seen as themes and percentages, never individual answers.
>
> Please fill it by **[DATE + 5 days]**. The more of you fill it, the more useful the outcome is for all of us. Thanks.
