# AIOS Documentation Site — Maintenance Guide

> **Status:** Production (v3.1)
> **Last Updated:** 2026-02-16
> **Maintainer:** SynkraAI Community + @bychrisr

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [System Architecture](#system-architecture)
3. [Daily Operations](#daily-operations)
4. [Content Updates](#content-updates)
5. [Deployment Process](#deployment-process)
6. [Troubleshooting](#troubleshooting)
7. [Performance Monitoring](#performance-monitoring)
8. [Security & Access](#security--access)

---

## Quick Start

### Prerequisites

```bash
# Required
node >= 18.0.0
npm >= 9.0.0

# Optional (for screenshots)
playwright
```

### Local Setup

```bash
# 1. Clone repository
git clone https://github.com/bychrisr/aios-docs.git
cd aios-docs

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# Site available at: http://localhost:3000

# 4. Build for production
npm run build

# 5. Test production build locally
npm run start
# Site available at: http://localhost:3000
```

**Important:** Search (Pagefind) only works in production builds (`npm run build` + `npm start`), not in dev mode.

---

## System Architecture

### Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 15 (App Router) | React-based static site generation |
| Docs Engine | Nextra 4 | MDX-based documentation system |
| Search | Pagefind | Post-build HTML indexing (3 locales) |
| i18n | Nextra i18n | 3 locales: pt-BR (default), en, es |
| Deployment | Vercel | Automatic deployments via GitHub integration |
| DNS | Cloudflare | CNAME → cname.vercel-dns.com |

### Repository Structure

```
aios-docs/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── custom.css             # CSS overrides
│   └── [lang]/                # Locale-aware routes
│       ├── layout.tsx         # Navbar, sidebar, footer
│       └── [[...mdxPath]]/
│           └── page.tsx       # Dynamic MDX renderer
├── content/                    # Multilingual MDX content
│   ├── pt-BR/                 # Portuguese (default)
│   ├── en/                    # English
│   └── es/                    # Spanish
├── .github/workflows/
│   └── sync-content.yml       # Automated content sync
├── scripts/
│   └── sync-content.sh        # MD → MDX conversion
├── middleware.ts               # Nextra locale proxy
├── next.config.mjs            # Nextra + i18n config
├── vercel.json                # Vercel deployment config
└── public/_pagefind/          # Search indexes (generated)
```

### Content Architecture

Each locale directory (`content/{locale}/`) contains:
- **29 MDX files** (matching structure across all 3 locales)
- **_meta.js files** (navigation labels, translated per locale)
- **Sections:** `docs/`, `playbook/`, `about/`, `index.mdx`

**Critical Rule:** All 3 locales MUST have identical file structures. Missing files cause build errors.

---

## Daily Operations

### Content Synchronization

**Automated Sync** (Daily at 6:00 UTC):
```yaml
# .github/workflows/sync-content.yml
on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6:00 UTC
```

**Manual Sync:**
```bash
# Trigger via GitHub Actions UI
gh workflow run sync-content.yml

# Or run locally
git clone --depth 1 https://github.com/SynkraAI/aios-core.git /tmp/aios-core
bash scripts/sync-content.sh /tmp/aios-core
```

**What it does:**
1. Clones `SynkraAI/aios-core` (shallow)
2. Converts `.md` → `.mdx` (Nextra compatibility)
3. Copies to `content/docs/`
4. Commits if changes detected

**Important:** Sync only updates `content/docs/` (technical docs). Playbook, about, and translations are managed manually.

---

## Content Updates

### Updating Existing Pages

1. **Locate file:** `content/{locale}/path/to/page.mdx`
2. **Edit content** (MDX syntax)
3. **Test locally:** `npm run dev`
4. **Build:** `npm run build`
5. **Commit & push**

### Adding New Pages

1. **Create file:** `content/{locale}/section/new-page.mdx`
2. **Update `_meta.js`:** Add entry for new page
3. **Replicate across locales:** Create equivalent in `en/` and `es/`
4. **Verify build:** `npm run build`

**Example `_meta.js` entry:**
```js
export default {
  'new-page': 'New Page Title'
}
```

### MDX Gotchas

| Issue | Solution |
|-------|----------|
| `<=` or `>=` breaks build | Use `≤` and `≥` (Unicode) |
| Bare `<` in text | Use `{'<'}` |
| Bare `>` in text | Use `{'>'}` |
| Missing `_meta.js` key | Every key needs a matching `.mdx` file |

---

## Deployment Process

### Automatic Deployment (Primary)

**Trigger:** Push to `main` branch

**Pipeline:**
1. Vercel detects commit
2. Runs `npm run build` (includes Pagefind indexing)
3. Deploys to production
4. Updates `https://docs.synkraaios.site`

**Monitoring:**
```bash
# View recent deployments
vercel ls

# Check deployment logs
vercel inspect <deployment-url> --logs
```

### Manual Deployment

```bash
# Deploy to production
vercel deploy --prod --yes --scope christians-projects-623587aa

# Preview deployment (staging)
vercel deploy --scope christians-projects-623587aa
```

### Environment Variables (Vercel)

```bash
NEXTRA_DEFAULT_LOCALE=pt-BR
NEXTRA_LOCALES=["pt-BR","en","es"]
NEXT_PUBLIC_SITE_URL=https://docs.synkraaios.site
```

---

## Troubleshooting

### Build Errors

#### `Error: Missing MDX file for key 'xyz'`
**Cause:** `_meta.js` references a file that doesn't exist
**Fix:** Create the file or remove the key from `_meta.js`

#### `Unexpected character '<'` (MDX parsing)
**Cause:** Bare `<` or `>` in text content
**Fix:** Replace with `{'<'}` or `{'>'}`, or use Unicode `≤` / `≥`

#### Search not working in dev mode
**Cause:** Pagefind requires production build
**Fix:** Run `npm run build && npm start` instead of `npm run dev`

### Sync Issues

#### Sync workflow runs but no changes committed
**Cause:** Content already up-to-date
**Action:** No action needed (expected behavior)

#### Sync workflow fails with permission error
**Fix:**
```bash
# Check GitHub Actions permissions
gh api repos/bychrisr/aios-docs/actions/permissions
# Should show: "enabled": true, "allowed_actions": "all"
```

### Deployment Issues

#### Deployment succeeds but site shows old content
**Fix:**
```bash
# Hard refresh browser (Ctrl+Shift+R)
# Or check Vercel deployment URL directly
vercel ls
```

#### Custom domain not resolving
**Fix:**
```bash
# Verify Cloudflare CNAME record
# docs.synkraaios.site → cname.vercel-dns.com
```

---

## Performance Monitoring

### Pagefind Search Index

**Current stats:**
- **87 pages** indexed
- **3 language indexes** (pt-BR, en, es)
- **3146 words** searchable

**Verify after build:**
```bash
ls -la public/_pagefind/
# Should see: pagefind.pt-br_*.pf_meta, pagefind.en_*.pf_meta, pagefind.es_*.pf_meta
```

### Build Performance

**Expected build time:** ~45-60 seconds

**Build stages:**
1. Next.js build (~30s)
2. Pagefind indexing (~15s)
3. Vercel upload (~10s)

---

## Security & Access

### Repository Access

- **Owner:** @bychrisr
- **Collaborators:** SynkraAI team (if transferred)

### Vercel Project

- **Owner:** christians-projects-623587aa
- **Production URL:** https://aios-docs.vercel.app
- **Custom Domain:** https://docs.synkraaios.site

### GitHub Actions Secrets

- `GITHUB_TOKEN` (automatic, managed by GitHub)
- **No additional secrets required** (public repos only)

### DNS Management

- **Provider:** Cloudflare
- **Record:** `docs.synkraaios.site` (CNAME → `cname.vercel-dns.com`)

---

## Common Commands Reference

```bash
# Development
npm run dev                    # Start dev server (port 3000)
npm run build                  # Production build + Pagefind
npm run start                  # Serve production build

# Git operations
git status                     # Check changes
git add .                      # Stage all changes
git commit -m "docs: ..."      # Conventional commit
git push origin main           # Deploy to production

# GitHub Actions
gh workflow list               # List workflows
gh workflow run sync-content   # Trigger manual sync
gh run list --limit 5          # Recent workflow runs

# Vercel
vercel                         # Preview deployment
vercel --prod                  # Production deployment
vercel ls                      # List deployments
vercel inspect <url> --logs    # View logs
```

---

## Maintenance Checklist

### Weekly
- [ ] Verify automatic sync ran successfully
- [ ] Check Vercel deployment status
- [ ] Test search functionality on production

### Monthly
- [ ] Review and update dependencies (`npm outdated`)
- [ ] Audit Pagefind index size
- [ ] Review analytics (if configured)
- [ ] Check for broken links

### Quarterly
- [ ] Update translations for new content
- [ ] Review and update this maintenance guide
- [ ] Performance audit (Lighthouse scores)
- [ ] Security audit (`npm audit`)

---

## Support & Contacts

**Original Creator:** [@bychrisr](https://github.com/bychrisr) (Christian)
**Community:** SynkraAI AIOS Project
**Repository:** https://github.com/bychrisr/aios-docs
**Production Site:** https://docs.synkraaios.site

**Documentation:**
- [CLAUDE.md](.claude/CLAUDE.md) — Technical configuration
- [EXECUTION_PLAN.md](EXECUTION_PLAN.md) — Contribution process
- [QUALITY_AUDIT_REPORT.md](QUALITY_AUDIT_REPORT.md) — Quality assessment

---

*Last Updated: 2026-02-16 by @bychrisr*
