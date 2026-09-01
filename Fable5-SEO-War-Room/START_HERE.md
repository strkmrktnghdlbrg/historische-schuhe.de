# Fable 5 SEO War Room — Start Here

You get **one** high-leverage Claude Fable 5 session, and it hands you a 90-day plan to outrank your competitors. Everything else runs on cheap models or by hand.

## Quick start (5 steps)

1. **Unzip this folder** and open it in Claude Code.
2. **Edit `config.json`** — your domain, 3-5 competitors, your goal, and hours per week.
3. **Get your data into `data/`** (see `SKILL.md`, Step 1):
   - Drop raw CSV exports in yourself (Search Console, GA4, DataForSEO), OR
   - Let Claude pull them (Windsor.ai for Search Console + GA4, Claude's own DataForSEO access for competitors).
4. **Ask Claude (on a normal model) to compress** everything into `output/BRIEF.md`.
5. **Switch to Fable 5**, paste `templates/master_prompt.md`, answer its questions, and let it write your `BATTLE_PLAN.md` and `WEEKLY_CHECKLIST.md`.
6. **Back on a normal model**, ask Claude to populate `templates/dashboard_template.html` with your plan and save it as `output/BATTLE_PLAN.html` — an interactive 5-tab dashboard with charts and a clickable 12-week checklist.

Then execute the weekly checklist with Sonnet or by hand. You don't touch Fable again until next quarter.

## What's in here
- `SKILL.md` — the full walkthrough (read this).
- `templates/master_prompt.md` — the one prompt you run on Fable 5.
- `templates/dashboard_template.html` — the battle-plan dashboard (Claude fills in the data).
- `config.json` — your site + competitors.
- `data/` — where your raw data goes.
- `output/` — where the brief, your plan, and the dashboard get written.

Full system by Nico | AI Ranking → https://skool.com/ai-ranking
