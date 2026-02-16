# Spec: Story 1.1 — Initialize Nextra 4 Project

**Status:** Approved
**Author:** Morgan (PM Agent)
**Date:** 2026-02-16
**Story:** 1.1
**Epic:** Epic 1 — Project Setup & Nextra Foundation

---

## 1. Summary

Inicializar o projeto aios-docs com Nextra 4 sobre Next.js 15 App Router, configurando a estrutura base que habilitara todas as stories subsequentes. O resultado e um site de documentacao funcional com uma pagina placeholder, dark mode, e build SSG passando.

## 2. Functional Requirements Addressed

- **FR1** (parcial): Renderizar markdown/MDX como paginas web (fundacao)
- **FR4** (parcial): Dark mode como tema padrao (default Nextra)
- **FR12** (parcial): Code blocks com syntax highlighting (default Nextra)

## 3. Non-Functional Requirements Addressed

- **NFR1** (parcial): Build SSG funcional
- **NFR4**: Site 100% estatico
- **NFR5** (parcial): Responsivo (Nextra theme default)

## 4. Dependencies

### External Dependencies (npm)

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15.0.0 | App Router framework |
| react | ^19.0.0 | UI library |
| react-dom | ^19.0.0 | React DOM renderer |
| nextra | ^4.0.0 | Documentation framework |
| nextra-theme-docs | ^4.0.0 | Docs theme with sidebar, TOC, dark mode |
| typescript | ^5.0.0 | Type checking |
| @types/react | latest | React type definitions |
| @types/node | latest | Node.js type definitions |

### Internal Dependencies

Nenhuma — story fundacional.

## 5. Files

### 5.1 Files to Create

| File | Service | Purpose |
|------|---------|---------|
| `package.json` | infra | Dependencies and scripts |
| `next.config.mjs` | infra | Nextra plugin + Next.js config |
| `tsconfig.json` | infra | TypeScript configuration |
| `mdx-components.tsx` | frontend | MDX component overrides (required by Nextra 4) |
| `app/layout.tsx` | frontend | Root layout with Nextra theme |
| `app/[[...mdxPath]]/page.tsx` | frontend | Catch-all route for content |
| `content/_meta.js` | frontend | Root navigation config |
| `content/index.mdx` | frontend | Landing page placeholder |
| `.gitignore` | infra | Git ignore rules |

### 5.2 Files to Modify

| File | Service | Change |
|------|---------|--------|
| (existing) `package.json` | infra | Replace placeholder scripts with real ones |

## 6. Testing Strategy

### Build Verification
- `npm run build` completa sem erros → Todas as paginas SSG geradas
- `npm run dev` inicia sem erros → Dev server na porta 3000

### Lint Check
- `npm run lint` passa sem erros

### Manual Verification
- Acessar `http://localhost:3000` mostra pagina com titulo
- Pagina renderiza em dark mode
- Content directory convention funciona (catch-all route)

## 7. Security Considerations

Nenhuma — site publico estatico, sem dados sensiveis nesta story.

## 8. Performance Considerations

- Build SSG deve completar em < 30 segundos (apenas 1 pagina)
- Dev server com Turbopack para hot reload rapido

## 9. Implementation Checklist

- [ ] Atualizar package.json com dependencias e scripts reais
- [ ] Criar next.config.mjs com Nextra plugin
- [ ] Criar tsconfig.json com configuracao Next.js
- [ ] Criar mdx-components.tsx (required by Nextra 4)
- [ ] Criar app/layout.tsx com Nextra theme (Navbar, Footer, Layout)
- [ ] Criar app/[[...mdxPath]]/page.tsx (catch-all route)
- [ ] Criar content/_meta.js (root navigation)
- [ ] Criar content/index.mdx (placeholder landing page)
- [ ] Atualizar .gitignore com .next/, node_modules/, out/
- [ ] Verificar npm run build
- [ ] Verificar npm run dev
- [ ] Verificar npm run lint

## 10. Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content convention | Content directory (not page.mdx) | Melhor para 940+ files, separa conteudo do app code |
| Package manager | npm | Default, sem overhead, alinhado com arquitetura |
| Turbopack | Enabled no dev | Performance de dev significativamente melhor |
| TypeScript | Strict mode | Padrao Next.js 15, previne bugs |
