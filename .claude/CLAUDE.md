# Synkra AIOS Docs — Claude Code Configuration

This is the **public documentation site** for Synkra AIOS, built with Nextra 4 + Next.js 15 App Router.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Docs Engine:** Nextra 4 (`nextra` + `nextra-theme-docs`)
- **Search:** Pagefind (post-build HTML indexing)
- **i18n:** 3 locales — `pt-BR` (default), `en`, `es`
- **Deployment:** Static site (SSG)

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
├── next.config.mjs             # Nextra config + i18n locales
├── mdx-components.tsx          # MDX component overrides
└── public/_pagefind/           # Search index (generated at build time)
```

## Content Structure (per locale)

Each locale directory (`content/{locale}/`) mirrors the same structure:

```
{locale}/
├── _meta.js                    # Root navigation labels
├── index.mdx                   # Landing page
├── about/                      # About section
├── docs/                       # Technical documentation
│   ├── guides/                 # Getting started, agent activation, etc.
│   ├── agents/                 # Agent overview
│   ├── workflows/              # SDC, QA Loop, Spec Pipeline
│   ├── architecture/           # System architecture
│   └── reference/              # Reference docs
└── playbook/                   # Practical playbook
    ├── getting-started/        # Quick start, onboarding
    ├── workflows/              # Sprint planning, PR, greenfield, brownfield
    ├── templates/              # Template reference
    ├── checklists/             # Validation checklists
    ├── commands/               # Command reference
    └── trails/                 # Role-based learning trails
```

## Key Files

| File | Purpose |
|------|---------|
| `app/[lang]/layout.tsx` | Navbar (logo + subtitle + LocaleSwitch), sidebar, footer, i18n config |
| `app/layout.tsx` | Root layout — imports `nextra-theme-docs/style.css` and `custom.css` |
| `middleware.ts` | `export { proxy as middleware } from 'nextra/locales'` |
| `next.config.mjs` | Nextra config (`search: true`, `latex: true`) + i18n locales |
| `app/custom.css` | Hides LocaleSwitch from sidebar (kept in navbar only) |

## Common Commands

```bash
npm run dev          # Development server (search won't work)
npm run build        # Production build + Pagefind indexing
npm run start        # Serve production build (search works here)
```

The `build` script runs: `next build && pagefind --site .next/server/app --output-path public/_pagefind`

## i18n Rules

- Default locale: `pt-BR` (root `/` redirects to `/pt-BR`)
- All 3 locales must have matching file structures in `content/`
- `_meta.js` labels must be translated per locale
- Navigation: `_meta.js` keys map to `.mdx` filenames — every key MUST have a corresponding file
- Locale switcher shows abbreviated names: PT-BR, EN, ES

## MDX Gotchas

- **Never use `<=` or `>=` in MDX** — use `≤` and `≥` (unicode) instead
- **Never use bare `<` before text** — MDX interprets it as JSX; use `{'<'}` if needed
- **Every `_meta.js` key needs a matching `.mdx` file** — missing files cause build errors
- **`sourceCode` prop is required** — `importPage()` returns it, must pass to `<Wrapper>`

## Git Conventions

- Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
- Keep commits atomic and focused
- Don't commit `.env` (contains API keys template)

## Build Verification

After changes, always verify:
1. `npm run build` succeeds (check for MDX compilation errors)
2. Pagefind indexes all expected pages across all languages
3. `npm run start` serves correctly on all locale routes

---
*Synkra AIOS Docs — Claude Code Configuration v3.0*
