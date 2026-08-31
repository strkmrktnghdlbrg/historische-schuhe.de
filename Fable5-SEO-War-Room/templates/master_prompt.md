# Master Prompt — The ONLY Fable 5 SEO Prompt You'll Ever Need

> Run this ONCE, with the Fable 5 model selected, against your compressed `BRIEF.md`.
> Everything before this (gather + compress) is done with scripts or cheaper models.
> Everything after this (execute the checklist) is done with Sonnet or by hand.
>
> How to use: make sure `output/BRIEF.md` exists, select Fable 5 as your model,
> then paste the prompt below. Fable will read the brief, question it, then write
> `BATTLE_PLAN.md` and `WEEKLY_CHECKLIST.md` into `output/`.

---

## THE PROMPT

You are my senior SEO strategist. I've hired you for exactly one session, so make it count.

Read `output/BRIEF.md`. It is a compressed brief of everything about my website:

- **Search Console** — what I already rank for, my impressions, clicks, average position, and which of my pages are gaining or decaying.
- **GA4** — what actually converts: my top landing pages, their traffic sources, and conversion events.
- **DataForSEO** — my tracked competitors, the keywords they rank for that I don't (the gap), and a summary of their backlink profiles.

My goal: **outrank the competitors listed in the brief over the next 90 days.** My weekly capacity and my business goal are stated at the top of the brief; respect them.

### Step 1 — Interrogate before you plan
Before writing any plan, read the entire brief and tell me the **3 to 5 most important things you notice**. I care most about insights that only appear when you connect two data sources together, for example:
- a page that converts well in GA4 but gets almost no impressions in Search Console (demand exists, visibility doesn't),
- a keyword a competitor wins mainly because of one specific backlink or one specific page,
- a cluster where I'm on page 2 for several related terms and one piece of content could lift all of them.

If anything in the brief is ambiguous, or you want a data slice I didn't include, **ask me before you plan.** Do not guess.

### Step 2 — Write BATTLE_PLAN.md
Write `output/BATTLE_PLAN.md`. This is my diagnosis and strategy:
- **What's broken** — the specific problems holding my rankings back, cited with numbers from the brief.
- **Where each competitor is beatable** — go competitor by competitor. For each, name the exact weakness and why I can win there.
- **Prioritized bets** — an ordered list of the moves I should make in the next 90 days. For every bet include: expected impact, effort required, and your reasoning for its position in the order.

Be opinionated. If I push back on a priority, either defend it with evidence or change your mind and tell me why.

### Step 3 — Write WEEKLY_CHECKLIST.md
Write `output/WEEKLY_CHECKLIST.md`. A week-by-week execution plan for 12 weeks:
- Each week has **2 to 4 concrete tasks** tied to the bets in the battle plan.
- Tag every task with who executes it: **`[Sonnet]`** if a cheaper model can do it (drafting content, generating schema, writing meta descriptions), or **`[Manual]`** if I have to (outreach, publishing, technical fixes).
- **Assume I will NOT use you again until the next quarter.** The checklist has to stand entirely on its own, with enough detail that I never need to ask you what a task means.

### Rules
- Base every recommendation on evidence in the brief and cite the specific numbers.
- No generic SEO advice I could get from any blog. If it isn't grounded in my data, don't say it.
- If the data doesn't support a recommendation, say so plainly rather than inventing one.
- Write the two files to `output/`. When you're done, give me a 5-line summary of the top 3 bets and what to do in week 1.
