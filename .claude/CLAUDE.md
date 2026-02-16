# Synkra AIOS Docs — Claude Code Configuration

This is the **public documentation site** for Synkra AIOS, built with Nextra 4 + Next.js 15 App Router.

## Deployment

- **Production URL:** https://aios-docs.vercel.app
- **Custom Domain:** https://docs.synkraaios.site
- **Vercel Project:** `christians-projects-623587aa/aios-docs`
- **Deploy command:** `vercel deploy --prod --yes --scope christians-projects-623587aa`

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Docs Engine:** Nextra 4 (`nextra` + `nextra-theme-docs`)
- **Search:** Pagefind (post-build HTML indexing, 3 language indexes)
- **i18n:** 3 locales — `pt-BR` (default), `en`, `es`
- **Deployment:** Vercel (SSG) with Pagefind post-build step
- **DNS:** Cloudflare CNAME → `cname.vercel-dns.com`

## Project Structure

```
aios-docs/
├── app/
│   ├── layout.tsx              # Root layout (metadata, CSS imports)
│   ├── custom.css              # CSS overrides (sidebar locale switch hidden)
│   └── [lang]/
│       ├── layout.tsx          # Locale-aware layout (navbar, sidebar, footer, i18n)
│       └── [[...mdxPath]]/
│           └── page.tsx        # Dynamic MDX page renderer
├── content/
│   ├── pt-BR/                  # Portuguese content (default locale)
│   ├── en/                     # English content
│   └── es/                     # Spanish content
├── middleware.ts                # Nextra locale proxy (auto-detect + redirect)
├── next.config.mjs             # Nextra config + i18n locales + redirects
├── vercel.json                 # Vercel config (buildCommand, security headers)
├── mdx-components.tsx          # MDX component overrides
└── public/_pagefind/           # Search index (generated at build time)
```

## Content Structure (per locale)

Each locale directory (`content/{locale}/`) mirrors the same structure (29 MDX files + _meta.js per locale):

```
{locale}/
├── _meta.js                    # Root navigation labels
├── index.mdx                   # Landing page (redirects to /docs)
├── about/                      # About section
├── docs/                       # Technical documentation
│   ├── guides/                 # Introduction to AIOS, agent activation, etc.
│   ├── agents/                 # The 12 AIOS Agents overview
│   ├── workflows/              # SDC, QA Loop, Spec Pipeline (reference)
│   ├── architecture/           # System Architecture (135 lines, mermaid diagrams)
│   └── reference/              # Configuration Reference
└── playbook/                   # Practical playbook
    ├── getting-started/        # Quick start, 60-min onboarding
    ├── workflows/              # Sprint planning, PR, greenfield, brownfield (guides)
    ├── templates/              # Template reference
    ├── checklists/             # Validation checklists
    ├── commands/               # Command reference
    └── trails/                 # Role-based learning trails
```

## Key Files

| File | Purpose |
|------|---------|
| `app/[lang]/layout.tsx` | Navbar (logo, ThemeSwitch, LocaleSwitch, GitHub icon), sidebar, footer, i18n config, credits |
| `app/layout.tsx` | Root layout — imports `nextra-theme-docs/style.css` and `custom.css` |
| `middleware.ts` | `export { proxy as middleware } from 'nextra/locales'` |
| `next.config.mjs` | Nextra config (`search: true`, `latex: true`) + i18n locales + redirects |
| `vercel.json` | Vercel deployment config with security headers and Pagefind buildCommand |
| `app/custom.css` | Mobile responsive fixes + Design system tokens (typography, gold accent, spacing) |
| `docs/design/design-council-alan-ds-adaptation.md` | Design Council transcript (Brad Frost, Don Norman, Julie Zhuo) — Alan DS visual adaptation strategy |

## Common Commands

```bash
npm run dev          # Development server (search won't work)
npm run build        # Production build + Pagefind indexing
npm run start        # Serve production build (search works here)
```

The `build` script runs: `next build && pagefind --site .next/server/app --output-path public/_pagefind`

## Vercel Deployment

```bash
# Deploy to production
vercel deploy --prod --yes --scope christians-projects-623587aa

# Check deployment status
vercel inspect <deployment-url> --logs
```

Environment variables set on Vercel:
- `NEXTRA_DEFAULT_LOCALE=pt-BR`
- `NEXTRA_LOCALES=["pt-BR","en","es"]`
- `NEXT_PUBLIC_SITE_URL=https://docs.synkraaios.site`

## i18n Rules

- Default locale: `pt-BR` (root `/` redirects to `/pt-BR/docs`)
- All 3 locales must have matching file structures in `content/`
- `_meta.js` labels must be translated per locale
- Navigation: `_meta.js` keys map to `.mdx` filenames — every key MUST have a corresponding file
- Locale switcher shows abbreviated names: PT-BR, EN, ES
- `/:lang` routes redirect to `/:lang/docs` (configured in `next.config.mjs`)

## Navigation Labels

Labels in `_meta.js` files must be distinct — avoid duplicates across sections:

| Section | pt-BR | en | es |
|---------|-------|-----|-----|
| docs/workflows | Workflows — Referência | Workflows — Reference | Workflows — Referencia |
| playbook/workflows | Guias de Workflow | Workflow Guides | Guías de Workflow |
| docs/guides/getting-started | Introdução ao AIOS | Introduction to AIOS | Introducción al AIOS |

Generic titles like "Visão Geral" / "Overview" should be replaced with descriptive names.

## Mobile UX Optimizations

### Header Mobile (< 768px)

**Layout:** `Logo | Theme Icon | Locale Icon | GitHub Icon | Menu`

**CSS Implementation (`app/custom.css`):**
```css
@media (max-width: 767px) {
  /* Hide logo subtitle */
  .logo-subtitle {
    display: none !important;
  }

  /* Icon-only buttons (ThemeSwitch, LocaleSwitch) */
  .nextra-navbar button[aria-haspopup="listbox"],
  .nextra-navbar button:has(svg[viewBox*="20"]):not([aria-label="Menu"]) {
    font-size: 0 !important;
  }

  /* Keep icons visible */
  .nextra-navbar button svg,
  .nextra-navbar button img {
    font-size: initial !important;
    display: block !important;
  }

  /* Stack footer vertically */
  footer div {
    flex-direction: column !important;
    gap: 0.5rem !important;
    text-align: center !important;
  }
}
```

**Features:**
- ✅ Minimalist design with icon-only buttons
- ✅ ThemeSwitch and LocaleSwitch show full text in dropdown menus
- ✅ GitHub icon positioned before hamburger menu
- ✅ Logo subtitle hidden to prevent overflow
- ✅ LocaleSwitch hidden from mobile sidebar footer (kept only in navbar)

### Footer Mobile

Footer text stacks vertically on mobile with centered alignment and smaller font size for better readability.

### Credits

All pages include attribution to **@bychrisr** in:
- Footer: "Built with ❤️ by @bychrisr • Maintained by AIOS Community"
- README.md: Credits section with creation date
- About pages: All 3 locales (pt-BR, en, es)

## Design System Strategy

**Design Council Decision (2026-02-16):**
Consulted with Brad Frost (Design Systems), Don Norman (UX), and Julie Zhuo (Design Leadership) via Kaven Design Council workflow. Full transcript: `docs/design/design-council-alan-ds-adaptation.md`

### Design Philosophy

**Influenced by Alan DS (Lendária Design System):**
- **Luxury Minimalism:** Primary color usage ≤8%, generous whitespace
- **Typography hierarchy:** Multi-font system for different content types
- **Dark-optional:** Light-first for documentation readability, dark mode as user choice
- **Token-based:** CSS variables for consistency and maintainability

**Core Principle:** "Token extraction, not component port" — adopt design tokens selectively while maintaining Nextra's docs-first UX.

### 3-Tier Implementation Strategy

#### ✅ Tier 1: ADOPTED (Safe, High Value)

**Typography System:**
```css
:root {
  --font-sans: 'Inter', -apple-system, sans-serif;           /* UI elements */
  --font-serif: 'Source Serif 4', serif;                     /* Body text (better reading) */
  --font-mono: 'JetBrains Mono', monospace;                  /* Code blocks */
  --font-display: 'Rajdhani', sans-serif;                    /* Hero sections (use sparingly) */
}
```

**Color System (Gold Accent):**
```css
:root {
  --primary: 32 27% 69%;        /* #C9B298 Gold from Alan DS */
  --primary-dark: 33 27% 50%;   /* Darker gold for hover */
}
/* Applied to: links, CTAs, active nav items (≤8% total usage) */
```

**Spacing Tokens (4px base unit):**
```css
:root {
  --space-4: 1rem;   /* 16px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem;   /* 32px */
}
```

#### ⚠️ Tier 2: TEST BEFORE ROLLOUT (Validate with Users)

**Shadow Tokens:**
```css
:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
/* Applied to: sidebar, cards, elevated components */
```

**Dark Mode:**
- User toggle in navbar (opt-in, not default)
- Preserves light-first reading convention
- Validate usage metrics after 2 weeks

**Border Radius:**
- Subtle rounding for cards, code blocks, buttons
- Test for visual coherence with Nextra's aesthetic

#### ❌ Tier 3: AVOID (High Risk, Low Value)

1. ❌ **Porting Alan DS's 60 React components** — Wrong tool for documentation
2. ❌ **Dark-first as default** — Cognitive friction for long-form reading
3. ❌ **Heavy animations** — Distracting for text consumption
4. ❌ **Rajdhani for body text** — Too aggressive for documentation
5. ❌ **Copying entire tailwind.config.ts** — Over-engineering

### Design Validation

**Before deploying Tier 2 changes:**
1. **5-Second Test:** Show screenshots to 10 developers, ask "What is this?"
   - Expected: "Documentation" (not "App")
2. **Metrics:** Measure bounce rate, time-to-find, user feedback
3. **Rollback Plan:** Changes isolated in `custom.css`, revert in <5 minutes

**Success Criteria:**
- Visual impact: 7/10 (elevated feel without breaking docs UX)
- Risk: 2/10 (CSS-only, no JS, no structural changes)
- Maintenance: Near zero (CSS variables)
- Performance: Bundle size increase <5%

### What Makes This Different From Alan DS

| Aspect | Alan DS (SPA) | aios-docs (SSG) |
|--------|---------------|----------------|
| **Purpose** | Interactive web application | Technical documentation |
| **Interaction** | Click-heavy | Scroll-heavy reading |
| **Visual hierarchy** | Color-driven | Typography-driven |
| **Background** | Dark-first (UI focus) | Light-first (reading focus) |
| **Components** | 60 React components | Markdown content + Nextra primitives |
| **Whitespace** | Guides action | Improves scannability |

**Key Insight (Brad Frost):** "This is a TOKEN EXTRACTION problem, not a COMPONENT PORT problem."

**Key Insight (Don Norman):** "Selectively adopt 5-6 tokens, maintain docs-first UX principles. The goal is 'elevated documentation,' not 'documentation disguised as an app.'"

**Key Insight (Julie Zhuo):** "Define the user problem first. For documentation, 'helpful' beats 'beautiful' every time."

## MDX Gotchas

- **Never use `<=` or `>=` in MDX** — use `≤` and `≥` (unicode) instead
- **Never use bare `<` before text** — MDX interprets it as JSX; use `{'<'}` if needed
- **Never use bare `>` in text** — wrap as `{">"}` to avoid JSX interpretation
- **Every `_meta.js` key needs a matching `.mdx` file** — missing files cause build errors
- **`sourceCode` prop is required** — `importPage()` returns it, must pass to `<Wrapper>`

## Content Source of Truth

The official documentation source is the `aios-core` repository (`docs/` directory). Key references:

| Official Source | Docs Site Page |
|----------------|----------------|
| `aios-core/docs/getting-started.md` (566 lines) | `content/{locale}/docs/guides/getting-started.mdx` |
| `aios-core/docs/core-architecture.md` (224 lines) | `content/{locale}/docs/architecture/index.mdx` |
| `aios-core/docs/meta-agent-commands.md` (60+ commands) | `content/{locale}/playbook/commands/index.mdx` |
| `aios-core/docs/aios-agent-flows/README.md` (13 agents) | `content/{locale}/docs/agents/index.mdx` |

The correct package name is `@synkra/aios-core` (not `@synkra/aios-cli`).
The correct template path is `.aios-core/development/templates/` (not `.aios-core/product/templates/`).
The framework has 13 agents (including @squad-creator / Nova).

## Content Synchronization (Mirror Process)

This project is an **automated mirror** of `SynkraAI/aios-core` documentation with enhancements:

### Sync Infrastructure
- **Workflow:** `.github/workflows/sync-content.yml` (daily at 6:00 UTC)
- **Script:** `scripts/sync-content.sh` (clone → convert → copy)
- **Conversion:** Markdown (`.md`) → MDX (`.mdx`) for Nextra compatibility
- **Frequency:** Daily automatic sync + manual trigger available

### Content Flow
```
aios-core/docs/*.md → clone → convert to .mdx → content/{locale}/docs/
```

### Enhancements Applied
- ✅ Multilingual translations (pt-BR, en, es)
- ✅ Nextra-compatible MDX formatting
- ✅ Pagefind search indexing
- ✅ Navigation structure optimization
- ✅ Quality improvements (e.g., agent count corrections)
- ✅ Mobile-first responsive design

**Important:** We are a **faithful mirror with presentation enhancements**, not an independent documentation source. Content corrections should ideally be proposed to the upstream `aios-core` repository.

## Git Conventions

- Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
- Keep commits atomic and focused
- Don't commit `.env` (contains API keys template)

## Build Verification

After changes, always verify:
1. `npm run build` succeeds (check for MDX compilation errors)
2. Pagefind indexes all expected pages across all 3 languages (currently 87 pages, 3146 words)
3. All 3 locales have matching file structures (29 MDX files each)

---
*Synkra AIOS Docs — Claude Code Configuration v3.3*
*Last Updated: 2026-02-16 — Design System Strategy (Alan DS influence), Kaven Design Council decision*
