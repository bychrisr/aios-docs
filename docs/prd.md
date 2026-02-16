# AIOS Docs — Product Requirements Document (PRD)

**Status:** Epics Defined
**Version:** 0.2
**Date:** 2026-02-16
**Author:** Morgan (PM Agent)

## Goals

- Transformar 940+ markdown files do `SynkraAI/aios-core` em site de documentacao navegavel e visualmente rico
- Oferecer experiencia multi-idioma nativa (PT-BR, EN, ES) com alternancia fluida
- Disponibilizar secao Playbook com guias praticos de uso diario do AIOS
- Manter documentacao sempre atualizada via sync automatizado com o repo oficial
- Prover busca full-text em todo o conteudo
- Usar dark mode como padrao com visual profissional (referencia: nextra.site)
- Estar deployado na Vercel com auto-deploy
- Estrutura preparada para contribuicao upstream (PR ao SynkraAI)

## Background Context

O Synkra AIOS e um meta-framework que orquestra 12 agentes de IA para desenvolvimento full-stack. Sua documentacao — dispersa em 940+ arquivos markdown dentro do repositorio `aios-core` — e rica mas inacessivel: nao ha navegacao estruturada, busca, ou interface visual. O repo ja contem traducoes em 3 idiomas (pt, en, es) que nao sao aproveitadas. Adicionalmente, existe um Playbook operacional (19+ guias) criado no Obsidian que precisa ser centralizado e disponibilizado publicamente. A solucao usa Nextra 4 (Next.js App Router) com tema de docs, i18n nativo, e Pagefind para busca, deployado na Vercel com GitHub Action para sincronizacao diaria do conteudo.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-15 | 0.1 | Initial PRD draft — Goals, Requirements | Morgan (PM) |
| 2026-02-16 | 0.2 | Added Epic List with stories after architecture review | Morgan (PM) |

## Requirements

### Functional

- **FR1:** O site deve renderizar arquivos markdown/MDX do aios-core como paginas web navegaveis com sidebar hierarquica e breadcrumbs
- **FR2:** O site deve suportar 3 idiomas (PT-BR, EN, ES) com seletor de idioma no header e locale-based routing
- **FR3:** O site deve ter busca full-text em todo o conteudo usando Pagefind com resultados instantaneos
- **FR4:** O site deve exibir dark mode como tema padrao, com toggle para light mode
- **FR5:** O site deve ter secao "Playbook" com guias praticos organizados por categoria (Getting Started, Workflows, Templates, Checklists, Comandos, Trilhas por Perfil)
- **FR6:** O conteudo do aios-core deve ser sincronizado automaticamente via GitHub Action com cron diario, criando commit e trigger de deploy apenas se houver mudancas
- **FR7:** A navegacao deve organizar o conteudo em categorias logicas: Guides, Agents, Workflows, Architecture, Playbook, API Reference
- **FR8:** Cada pagina deve exibir link "Edit this page" apontando para o arquivo fonte no GitHub
- **FR9:** O site deve renderizar diagramas Mermaid inline (usado extensivamente na doc do aios-core)
- **FR10:** O site deve ter pagina inicial (landing) com overview do AIOS, quick links e getting started
- **FR11:** A sidebar deve colapsar/expandir secoes e destacar a pagina atual
- **FR12:** O site deve suportar code blocks com syntax highlighting e copy button

### Non Functional

- **NFR1:** Build time < 3 minutos para 940+ paginas (Nextra 4 com static generation)
- **NFR2:** Lighthouse Performance score >= 90 em todas as paginas
- **NFR3:** Deploy automatico na Vercel em < 5 minutos apos push
- **NFR4:** O site deve ser 100% estatico (SSG) — sem server-side runtime
- **NFR5:** Responsivo: funcional em mobile (320px+), tablet e desktop
- **NFR6:** Estrutura de repo preparada para PR upstream — sem dependencias proprietarias ou paths hardcoded
- **NFR7:** SEO otimizado: meta tags, Open Graph, sitemap.xml automatico
- **NFR8:** Acessibilidade WCAG AA basica (contraste, navegacao por teclado, alt texts)

## Technical Assumptions

- **Framework:** Nextra 4 (Next.js 15 App Router)
- **Theme:** nextra-theme-docs
- **Repository:** Monorepo (docs + sync scripts)
- **Deploy:** Vercel (static export)
- **i18n:** Next.js i18n routing com locale suffixes
- **Search:** Pagefind (Rust-powered, static)
- **Sync:** GitHub Action (cron diario)
- **Content Source:** SynkraAI/aios-core (clone/fetch)

## Epic List

### Epic 1: Project Setup & Nextra Foundation

> Setup the Nextra 4 project, configure Next.js App Router, install dependencies, dark mode, and achieve first successful build with a placeholder landing page.

**FRs:** FR1, FR4, FR12
**NFRs:** NFR1, NFR4, NFR5

| Story | Title | Complexity |
|-------|-------|------------|
| 1.1 | Initialize Nextra 4 project with Next.js 15 App Router | SIMPLE |
| 1.2 | Configure dark mode as default with light mode toggle | SIMPLE |
| 1.3 | Create landing page with AIOS overview and quick links | STANDARD |

---

### Epic 2: Content Structure & Navigation

> Organize the 940+ markdown files into logical categories with sidebar navigation, _meta.js files, breadcrumbs, and collapsible sections.

**FRs:** FR1, FR7, FR8, FR9, FR11
**NFRs:** NFR6

| Story | Title | Complexity |
|-------|-------|------------|
| 2.1 | Define content directory structure and _meta.js navigation | STANDARD |
| 2.2 | Configure Mermaid diagram rendering | SIMPLE |
| 2.3 | Configure "Edit this page" links per content section | SIMPLE |
| 2.4 | Add syntax highlighting with copy button for code blocks | SIMPLE |

---

### Epic 3: Playbook Section

> Create the Playbook section with 19+ practical guides organized by category, migrated from Obsidian vault.

**FRs:** FR5, FR7

| Story | Title | Complexity |
|-------|-------|------------|
| 3.1 | Create Playbook content structure and navigation | STANDARD |
| 3.2 | Migrate and adapt 19 generic playbook guides | STANDARD |
| 3.3 | Generalize 5 project-specific playbook files | SIMPLE |

---

### Epic 4: Content Sync Pipeline

> Automate daily synchronization of documentation from SynkraAI/aios-core to aios-docs via GitHub Action.

**FRs:** FR6
**NFRs:** NFR3, NFR6

| Story | Title | Complexity |
|-------|-------|------------|
| 4.1 | Create sync script (clone, extract, transform, copy) | STANDARD |
| 4.2 | Create GitHub Action workflow with daily cron | STANDARD |

---

### Epic 5: Search

> Integrate Pagefind full-text search with instant results across all content.

**FRs:** FR3
**NFRs:** NFR1

| Story | Title | Complexity |
|-------|-------|------------|
| 5.1 | Configure Pagefind search integration | SIMPLE |

---

### Epic 6: SEO & Performance

> Optimize for search engines, accessibility, and Lighthouse performance targets.

**FRs:** FR10
**NFRs:** NFR1, NFR2, NFR5, NFR7, NFR8

| Story | Title | Complexity |
|-------|-------|------------|
| 6.1 | Configure SEO meta tags, Open Graph, and sitemap | SIMPLE |
| 6.2 | Verify Lighthouse >= 90 and fix performance issues | SIMPLE |
| 6.3 | Verify WCAG AA accessibility basics | SIMPLE |

---

### Epic 7: Deployment

> Deploy to Vercel with auto-deploy on push and preview deployments per PR.

**NFRs:** NFR3, NFR4

| Story | Title | Complexity |
|-------|-------|------------|
| 7.1 | Configure Vercel deployment with auto-deploy | SIMPLE |
| 7.2 | Configure preview deployments per PR | SIMPLE |

---

### Epic 8: i18n (Phase 2 — Post-MVP)

> Add multi-language support (EN, ES) to existing PT-BR content.

**FRs:** FR2

| Story | Title | Complexity |
|-------|-------|------------|
| 8.1 | Configure Next.js i18n routing with locale support | STANDARD |
| 8.2 | Add language selector to navbar | SIMPLE |
| 8.3 | Map existing aios-core translations to locale files | COMPLEX |

---

## Implementation Order

```
Epic 1 (Setup) → Epic 2 (Content) → Epic 3 (Playbook) → Epic 5 (Search)
                                                            ↓
Epic 7 (Deploy) → Epic 6 (SEO/Perf) → Epic 4 (Sync) → Epic 8 (i18n)
```

**MVP (Epics 1-5, 7):** Site funcional com conteudo, navegacao, busca, e deploy.
**Post-MVP (Epics 6, 8):** SEO optimization e multi-idioma.

## Next Steps

1. ~~Architecture design (@architect)~~ DONE
2. ~~Epic/story breakdown (@pm)~~ DONE
3. Story drafting (@sm) → Starting with Epic 1, Story 1.1
4. Implementation
