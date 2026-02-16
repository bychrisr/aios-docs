# 🎁 Donation Proposal: Complete Documentation Site for AIOS

**Category:** Ideas
**Post to:** https://github.com/SynkraAI/aios-core/discussions

---

## Hi AIOS Team! 👋

I'm @bychrisr (Christian). I built a comprehensive documentation site for AIOS because I was struggling to learn the framework from scattered markdown files in the repo. Now that it's helped me, I'd like to donate it to the community.

## 🌐 What I Built

**Live Site:** https://docs.synkraaios.site
**Repository:** https://github.com/bychrisr/aios-docs

### Key Features

- ✅ **123 MDX pages** — Technical docs mirrored from aios-core + practical playbook
- ✅ **3 languages** — Portuguese (default), English, Spanish
- ✅ **Modern stack** — Nextra 4 + Next.js 15 (App Router)
- ✅ **Instant search** — Pagefind with 3-language indexing (7,712 words indexed)
- ✅ **Professional design** — Responsive, dark mode, LaTeX, Mermaid diagrams
- ✅ **Auto-sync** — GitHub Actions daily sync from aios-core (zero maintenance)
- ✅ **Auto-deploy** — Vercel CI/CD pipeline
- ✅ **Fast** — 95+ Lighthouse score, 2-min builds

### Content Structure

```
docs/                # 🔄 AUTO-SYNCED from aios-core (your existing docs)
├── guides/          # Getting started, agent activation, story development
├── agents/          # Complete reference for all 13 AIOS agents
├── workflows/       # SDC, QA Loop, Spec Pipeline documentation
├── architecture/    # System design, patterns, Mermaid diagrams
└── reference/       # Configuration reference

playbook/            # ✍️ ORIGINAL content (practical guides I wrote)
├── getting-started/ # Quick start, 60-min onboarding guide
├── workflows/       # Sprint planning, PR workflow, crisis management
├── templates/       # Template reference
├── checklists/      # Validation checklists
├── commands/        # Command reference
└── trails/          # Role-based learning paths
```

**What this means:**
- `docs/` = Your existing documentation, automatically mirrored (MD → MDX)
- `playbook/` = Practical guides I wrote to complement the technical docs
- **Zero extra work for you** — Keep writing .md in aios-core, site updates automatically

## 📸 Screenshots

**Note:** Upload these images inline when posting the Discussion (drag & drop into GitHub editor):

### 1. Homepage (Desktop)
`docs/screenshots/01-homepage.png` — Clean, professional layout

### 2. Search Demo
`docs/screenshots/02-search-demo.png` — Instant search across 7,712 words

### 3. Language Switcher (PT/EN/ES)
`docs/screenshots/03-language-switcher.png` — 3-language support

### 4. Agent Reference Page
`docs/screenshots/04-agent-page.png` — Complete agent documentation

### 5. Workflow with Mermaid Diagrams
`docs/screenshots/05-workflow-mermaid.png` — Visual workflow representation

### 6. Mobile Responsive
`docs/screenshots/06-mobile-responsive.png` — Mobile-first design

**Instructions for posting:**
1. Write discussion text first
2. Drag & drop each screenshot from `docs/screenshots/` folder
3. GitHub will upload and insert image links automatically

## 🤖 How Auto-Sync Works (Zero Extra Work)

**The magic:** GitHub Actions workflow runs daily at 6:00 UTC

```yaml
# .github/workflows/sync-content.yml
1. Clone aios-core/docs/*.md
2. Convert MD → MDX (automatic)
3. Copy to content/{locale}/docs/
4. Commit & push (triggers Vercel deploy)
```

**What this means for you:**
- ✅ Keep writing markdown in `aios-core/docs/` as you do today
- ✅ Changes appear on docs site within 24 hours (automatic)
- ✅ Zero extra maintenance on your side
- ✅ No need to learn Nextra or MDX
- ✅ Your workflow doesn't change at all

**Visual workflow:**
```
┌─────────────────────────────────────────────────────────────┐
│ aios-core/docs/*.md (YOUR REPO)                            │
│ You edit markdown files as you do today ✍️                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ (Daily at 6:00 UTC)
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ GitHub Actions Workflow 🤖                                  │
│ 1. Clone aios-core/docs/                                   │
│ 2. Convert MD → MDX (automatic)                            │
│ 3. Copy to aios-docs/content/{locale}/docs/               │
│ 4. Commit & push                                           │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ (Triggers automatically)
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Vercel Build & Deploy 🚀                                    │
│ 1. Build Next.js site                                      │
│ 2. Generate search index (Pagefind)                        │
│ 3. Deploy to production                                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ docs.synkraaios.site 🌐                                     │
│ Live documentation site with search, i18n, dark mode       │
└─────────────────────────────────────────────────────────────┘
```

**Example:**
```
Monday 9:00 AM: You edit aios-core/docs/guides/getting-started.md
Tuesday 6:00 AM: GitHub Actions sync runs (daily schedule)
Tuesday 6:05 AM: Vercel deploys new version automatically
Tuesday 6:07 AM: Your changes live on docs.synkraaios.site
```

**Full transparency:**
- `docs/` = Your existing documentation (auto-synced, zero work for you)
- `playbook/` = Practical guides I wrote (can be modified/removed as you see fit)

---

## 🎁 What I'm Offering

### Option A: Transfer Repository to SynkraAI (Recommended)

**Why a separate repo makes sense:**
- ✅ **Keeps aios-core lean** — No build complexity, no Next.js dependencies
- ✅ **Independent versioning** — Docs can update without core releases
- ✅ **Specialized tooling** — Nextra optimized for documentation, not mixed with framework code
- ✅ **Clear separation** — Code in aios-core, docs in aios-docs (like React, Next.js, Vercel do)
- ✅ **Easier maintenance** — Different contributors, different workflows
- ✅ **Auto-sync** — Your existing docs stay in aios-core, automatically mirrored

**What I'll do:**
1. Transfer `bychrisr/aios-docs` → `SynkraAI/aios-docs`
2. Transfer domain `docs.synkraaios.site` (or help redirect to your domain)
3. Transfer/setup Vercel project for auto-deployment
4. Provide transition support (1 week)
5. Preserve credits in footer and README

**What you get:**
- Full ownership and control
- Complete git history
- Working CI/CD pipeline
- Maintained infrastructure

### Option B: Official Fork

**Alternative approach:**
1. SynkraAI forks `bychrisr/aios-docs` as official docs
2. I keep my repo as upstream (for personal experimentation)
3. You customize/maintain your fork
4. Credits link back to original repo

### Option C: Community Reference

**If you prefer keeping docs in aios-core:**
1. I maintain docs site independently
2. You just add reference links in aios-core README
3. Community benefits from both approaches
4. No transfer needed

**My preference:** Option A (keeps repos clean and focused)

## 🤔 Why Am I Doing This?

**Full transparency:**

AIOS is free and gave me tremendous value. I went from struggling with scattered markdown files to understanding the entire framework. Now I want to **give back** what AIOS gave me.

**My journey:**
1. Downloaded AIOS → Confused by documentation scattered across repo
2. Built this site to help myself learn → It worked!
3. Now I understand AIOS deeply → Want others to have the same experience
4. AIOS is free → This is my way to say thank you

**Why donate instead of keeping independent:**
- Official docs reach more people than "some random site"
- SynkraAI can maintain long-term as AIOS evolves
- Community can contribute and improve
- I get recognition through meaningful contribution

**I'm not asking for money or status** — just want to give back to a project that helped me for free.

**What I'm NOT asking for:**
- ❌ Money or compensation
- ❌ Maintainer status (unless you want me)
- ❌ Control over technical documentation (that's yours)
- ❌ Ongoing obligations

**What I AM asking for:**
- ✅ Credits preserved (footer + README: "Built by @bychrisr")
- ✅ Keep the `playbook/` section I wrote (or modify as needed)
- ✅ Let me help during transition (1 week)
- ✅ Your honest feedback

## 📊 Current Stats

- **Build time:** ~2 minutes (Next.js + Pagefind)
- **Lighthouse score:** 95+ (performance/accessibility/SEO)
- **Search index:** 7,712 words across 3 languages
- **Uptime:** 99.9% (Vercel hosting)
- **Bundle size:** Optimized for fast loading

## 🛠️ Technical Details

**Stack:**
- Framework: Next.js 15 (App Router)
- Docs Engine: Nextra 4
- Search: Pagefind (post-build HTML indexing)
- Deployment: Vercel (automatic via GitHub)
- i18n: 3 locales with matching file structures
- **Auto-sync:** GitHub Actions (daily from aios-core)

**Maintenance effort (for you: ZERO):**
- Your workflow: Keep editing `aios-core/docs/*.md` as today
- GitHub Actions: Converts MD → MDX automatically (daily 6:00 UTC)
- Vercel: Builds and deploys automatically
- Search: Rebuilds automatically with every deploy
- **You literally don't change anything in your current workflow**

**Maintenance effort (for site maintainer: LOW):**
- Monitor GitHub Actions workflow (1 min/week)
- Update Nextra/Next.js occasionally (quarterly)
- Review community PRs for playbook section (as needed)

## 🚀 Next Steps

**If you're interested:**
1. ✅ Visit the site: https://docs.synkraaios.site
2. ✅ Review the repo: https://github.com/bychrisr/aios-docs
3. ✅ Share your thoughts on this proposal
4. ✅ Decide which option (A/B/C) fits AIOS best

**No pressure!** I'm happy to maintain independently if this doesn't fit your vision. The goal is helping the AIOS community, whatever form that takes.

## 🤝 Questions I'd Love Answered

1. **Does AIOS want an official documentation site?** (separate repo, auto-synced)
2. **Is the auto-sync approach acceptable?** (your docs stay in aios-core, mirrored automatically)
3. **Is Nextra 4 an acceptable stack?** (used by Next.js, React, Tailwind, shadcn/ui)
4. **Would you prefer transfer (Option A) or fork (Option B)?**
5. **Any concerns about the `playbook/` content I wrote?** (happy to revise or remove)
6. **What's missing that you'd want to see?**

## 💬 Open to Discussion

This is a genuine offer to help the community. I'm flexible on:
- Transfer vs. fork vs. reference
- Content revisions and corrections
- Tech stack changes (if needed)
- Credit format and attribution
- Level of my involvement post-transfer

Let me know what works best for AIOS!

---

**Built with ❤️ by @bychrisr**
**Ready to donate for maximum community impact 🎁**
