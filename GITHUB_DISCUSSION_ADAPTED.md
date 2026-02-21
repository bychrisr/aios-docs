# GitHub Discussion - Adapted Format

## Title (já preenchido)
```
🎁 Donation Proposal: Complete Documentation Site for AIOS
```

---

## Describe your idea

### Hi AIOS Team! 👋

I'm @bychrisr (Christian). I built a comprehensive documentation site for AIOS because I wanted to learn the framework but found navigating between markdown files really challenging. I'm neurodivergent (ASD + ADHD), so I need visual, structured content to learn effectively. That's why I created this site with search, navigation, and practical playbooks — it's how I learn best.

**Now I want to donate the entire project to the AIOS community.**

### 🌐 What I Built

**Live Site:** https://docs.synkraaios.site
**Repository:** https://github.com/bychrisr/aios-docs

**Key Features:**
- ✅ **123 MDX pages** — Technical docs auto-synced from aios-core + practical playbooks
- ✅ **3 languages** — Portuguese (default), English, Spanish
- ✅ **Instant search** — Pagefind with 7,712 words indexed
- ✅ **Auto-sync** — GitHub Actions mirrors your docs daily (ZERO extra work for you)
- ✅ **Modern stack** — Nextra 4 + Next.js 15 (used by Next.js, React, Tailwind docs)
- ✅ **Professional design** — Responsive, dark mode, LaTeX, Mermaid diagrams

### 🤖 How Auto-Sync Works (Zero Maintenance)

**The magic:** GitHub Actions runs daily at 6:00 UTC

```
aios-core/docs/*.md (YOUR REPO)
        ↓ Daily sync
GitHub Actions converts MD → MDX
        ↓ Auto-commit
Vercel builds & deploys
        ↓ Live in 2 minutes
docs.synkraaios.site
```

**What this means:**
- You keep editing `aios-core/docs/*.md` as you do today
- Changes appear on the site within 24 hours (automatic)
- Zero extra work on your side
- No need to learn Nextra or MDX

### 📦 Content Structure

```
docs/          🔄 AUTO-SYNCED from aios-core (your existing docs)
├── guides/    # Getting started, agent activation
├── agents/    # Complete reference for all 13 agents
├── workflows/ # SDC, QA Loop, Spec Pipeline
└── architecture/

playbook/      ✍️ ORIGINAL content (practical guides I wrote)
├── getting-started/  # Quick start, 60-min onboarding
├── workflows/        # Sprint planning, PR workflow
├── commands/         # Command reference
└── trails/          # Role-based learning paths
```

**Full transparency:**
- `docs/` = Your documentation (auto-mirrored, zero work for you)
- `playbook/` = Practical guides I wrote (can be modified/removed)

### 🎁 What I'm Offering

**Option A: Transfer Repository to SynkraAI (Recommended)**

**Why separate repo makes sense:**
- ✅ Keeps aios-core lean (no Next.js dependencies, no build complexity)
- ✅ Your workflow unchanged (keep editing .md files in aios-core)
- ✅ Auto-sync handles everything (GitHub Actions + Vercel)
- ✅ Examples: React, Next.js, Vercel all have separate docs repos

**What I'll transfer:**
1. Full GitHub repo: `bychrisr/aios-docs` → `SynkraAI/aios-docs`
2. Domain: `docs.synkraaios.site` (or help redirect to your domain)
3. Vercel project (auto-deploy configured)
4. Complete documentation + 1 week transition support

**What you get:**
- Professional docs site with zero maintenance
- Working CI/CD pipeline
- Full ownership and control

**Option B: Official Fork**
You fork my repo as official docs, I keep mine as upstream

**Option C: Community Reference**
I maintain independently, you just link to it from aios-core

**My preference:** Option A (clean separation, like industry standard)

### 🤔 Why I'm Doing This

**Full transparency:**

AIOS is free and gave me tremendous value. As someone neurodivergent, I learn differently — I need structure, visuals, and step-by-step guides. Navigating between markdown files doesn't work for my brain. So I built this site the way I needed to learn: instant search, clear navigation, visual hierarchy, and practical playbooks.

It worked! Now I understand AIOS deeply. I want to **give back** what AIOS gave me, especially for others who learn like I do.

**What I'm NOT asking for:**
- ❌ Money or compensation
- ❌ Maintainer status (unless you want me)
- ❌ Control over technical docs (that's yours)

**What I AM asking for:**
- ✅ Credits preserved (footer: "Built by @bychrisr")
- ✅ Keep the playbooks I wrote (or modify as needed)
- ✅ 1 week transition support
- ✅ Your honest feedback

### 📸 Screenshots

[Upload these 6 images inline by dragging from `docs/screenshots/`:]
1. **01-homepage.png** — Professional homepage
2. **02-search-demo.png** — Instant search in action
3. **03-language-switcher.png** — 3-language support
4. **04-agent-page.png** — Agent documentation
5. **05-workflow-mermaid.png** — Visual workflows
6. **06-mobile-responsive.png** — Mobile-first design

---

## Use Case

**Problem it solves:**
As a neurodivergent developer learning AIOS, navigating between markdown files in a repo is overwhelming. I needed:
- Instant search across all documentation
- Clear visual hierarchy and navigation
- Step-by-step practical guides (playbooks)
- Multi-language support for diverse community

**Who benefits:**
1. **New AIOS users** — Easier onboarding with structured learning
2. **Neurodivergent developers** — Visual, searchable, structured content
3. **Non-English speakers** — 3 languages (PT/EN/ES) with more possible
4. **AIOS team** — Professional docs site with ZERO maintenance (auto-synced)

**Real-world scenario:**
```
Developer finds AIOS → Visits docs site → Searches "how to create story"
→ Finds guide instantly → Follows step-by-step playbook → Successfully implements
```

Instead of:
```
Developer finds AIOS → Clones repo → Searches through files → Gets lost
→ Gives up or asks in Discord
```

---

## Alternatives Considered

### Alternative 1: Keep docs in aios-core repo
**Pros:** Everything in one place
**Cons:**
- Adds build complexity (Next.js + Pagefind to framework repo)
- Mixed concerns (code + documentation tooling)
- No auto-sync (manual duplication)

### Alternative 2: Use ReadTheDocs or GitBook
**Pros:** Established platforms
**Cons:**
- Less customization
- No GitHub Actions auto-sync from your repo
- Migration effort from current setup
- Less modern (no React-based features)

### Alternative 3: Keep independent (current workaround)
**Pros:** No commitment from AIOS team
**Cons:**
- Less visibility (not official)
- I can't maintain long-term as AIOS evolves
- Community fragmentation (unofficial vs official)

**Why my solution is better:**
- ✅ Separate repo keeps aios-core lean (like React, Next.js, Vercel do)
- ✅ Auto-sync means zero extra work for your team
- ✅ Modern stack (Nextra 4) used by major projects
- ✅ Already built, tested, and working
- ✅ Full transfer = community ownership

---

## Would you be willing to contribute?

✅ **I would be interested in implementing this feature**
(Already implemented! Just needs transfer/acceptance)

✅ **I can help with documentation**
(The documentation IS the feature, and I'll provide transition support)

✅ **I can help with testing**
(Site is live and tested, happy to help validate post-transfer)

---

## Questions for Discussion

1. **Does AIOS want an official documentation site?** (separate repo, auto-synced)
2. **Is the auto-sync approach acceptable?** (your docs stay in aios-core, mirrored daily)
3. **Is Nextra 4 an acceptable stack?** (industry standard for docs sites)
4. **Would you prefer transfer (Option A), fork (Option B), or reference (Option C)?**
5. **Any concerns about the playbook content I wrote?** (happy to revise or remove)
6. **What's missing that you'd want to see?**

---

**Let's discuss! I'm flexible and want to help the community. 🚀**

**Built with ❤️ by @bychrisr**
**Ready to donate for giving back to AIOS 🎁**
