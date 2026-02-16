# AIOS Documentation Site

> **Official documentation for Synkra AIOS** — Universal AI Agent Framework

🌐 **Live Site:** [https://docs.synkraaios.site](https://docs.synkraaios.site)

## About

This is a comprehensive, multilingual documentation site for the [Synkra AIOS framework](https://github.com/SynkraAI/aios-core), built with Nextra 4 and Next.js 15.

### Features

- 📚 **3 Languages:** Portuguese (default), English, Spanish
- 🔍 **Full-text Search:** Pagefind-powered search with 87 indexed pages
- 📱 **Responsive Design:** Mobile-first, accessible documentation
- 🔄 **Auto-sync:** Daily synchronization from `aios-core` repository
- ⚡ **Fast:** Static site generation with Next.js App Router
- 🎨 **Modern UI:** Nextra 4 theme with dark mode support

## Quick Start

```bash
# Install dependencies
npm install

# Development (search won't work)
npm run dev

# Production build (includes Pagefind indexing)
npm run build

# Serve production build locally (with search)
npm start
```

## Documentation

- [Maintenance Guide](MAINTENANCE.md) — Complete setup and operations guide
- [Technical Configuration](.claude/CLAUDE.md) — Nextra config and architecture
- [Quality Audit](QUALITY_AUDIT_REPORT.md) — Documentation quality assessment
- [Execution Plan](EXECUTION_PLAN.md) — Contribution process documentation

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Docs Engine:** Nextra 4
- **Search:** Pagefind (post-build indexing)
- **i18n:** 3 locales (pt-BR, en, es)
- **Deployment:** Vercel (automatic via GitHub integration)
- **DNS:** Cloudflare → `docs.synkraaios.site`

## Content Synchronization

This site automatically syncs content from the official [`SynkraAI/aios-core`](https://github.com/SynkraAI/aios-core) repository:

- **Schedule:** Daily at 6:00 UTC
- **Workflow:** `.github/workflows/sync-content.yml`
- **Script:** `scripts/sync-content.sh` (MD → MDX conversion)

## Contributing

To suggest edits to documentation content, contribute directly to the [`aios-core` repository](https://github.com/SynkraAI/aios-core). Changes will be automatically synced.

For site infrastructure improvements (layout, search, i18n), open an issue or PR in this repository.

## Credits

**Original Creator:** [@bychrisr](https://github.com/bychrisr) (Christian)
**Donated to:** SynkraAI AIOS Community
**Date:** February 2026

**Maintained by:** AIOS Community
**License:** MIT © 2026 Synkra AI

---

*Built with ❤️ using Synkra AIOS*
