# Plano de Contribuição — AIOS Documentation Site

## 🎯 Objetivo

Contribuir com a comunidade AIOS fornecendo um site de documentação completo, moderno e multilíngue (pt-BR, en, es) construído com Nextra 4.

**Site:** https://docs.synkraaios.site  
**Repositório da Documentação:** https://github.com/bychrisr/aios-docs  
**Contribuidor:** @bychrisr (Christian)

---

## 📋 O Que Estamos Contribuindo

### 1. Site de Documentação Completo
- **Framework:** Nextra 4 + Next.js 15 (App Router)
- **Busca:** Pagefind com indexação em 3 idiomas
- **Internacionalização:** pt-BR (padrão), English, Español
- **Conteúdo:** 123 arquivos MDX (41 por locale)
- **Deployment:** Vercel com domínio customizado

### 2. Estrutura de Conteúdo
```
docs/
├── guides/          # Introdução, getting started, story development
├── agents/          # Visão geral dos 13 agentes
├── workflows/       # SDC, QA Loop, Spec Pipeline
├── architecture/    # System Architecture
└── reference/       # Configuration Reference

playbook/
├── getting-started/ # Quick start, onboarding
├── workflows/       # Sprint planning, PR, greenfield, brownfield
├── templates/       # Template reference
├── checklists/      # Validation checklists
├── commands/        # Command reference
└── trails/          # Role-based learning trails
```

### 3. Recursos Destacados
- ✅ Busca em tempo real (Pagefind)
- ✅ Suporte LaTeX para fórmulas matemáticas
- ✅ Diagramas Mermaid interativos
- ✅ Navegação intuitiva com sidebar
- ✅ Responsive design
- ✅ Dark mode
- ✅ SEO otimizado

---

## 🔄 Workflow de Contribuição

### Fase 1: Preparação (Local)

#### 1.1. Fork e Clone do Repositório Oficial
```bash
# Fork via GitHub UI: https://github.com/SynkraAI/aios-core
# Depois clone localmente:
git clone https://github.com/bychrisr/aios-core.git
cd aios-core

# Adicionar upstream
git remote add upstream https://github.com/SynkraAI/aios-core.git

# Atualizar com main do upstream
git checkout main
git pull upstream main
```

#### 1.2. Criar Branch Seguindo Convenção AIOS
```bash
git checkout -b docs/community-documentation-site
```

**Tipo:** `docs/` (contribuição de documentação)  
**Descrição:** `community-documentation-site`

---

### Fase 2: Criar Story AIOS

#### 2.1. Story File Structure
Criar: `docs/stories/STORY-DOCS-SITE.md`

```markdown
# STORY-DOCS-SITE — Community Documentation Website

**Status:** Draft  
**Epic:** N/A (Community Contribution)  
**Story Points:** 5  
**Executor:** @bychrisr  
**Created:** 2026-02-16

## Description

Provide the AIOS community with a professional, multilingual documentation website to improve onboarding and reference materials. The site includes comprehensive guides, agent documentation, workflow references, and practical playbooks in three languages.

## Acceptance Criteria

- [x] Documentation site deployed at https://docs.synkraaios.site
- [x] Content structured with 123 MDX files across 3 locales
- [x] Search functionality (Pagefind) working in all languages
- [x] Responsive design with dark mode support
- [ ] README.md updated with link to documentation site
- [ ] CONTRIBUTING.md references documentation for contributors
- [ ] Credits added to CONTRIBUTORS.md or equivalent
- [ ] Build verification successful

## Scope

### IN Scope
- Update README.md with documentation link
- Update CONTRIBUTING.md with documentation reference
- Add contributor credits
- Verify links are working
- Documentation for maintaining the site

### OUT of Scope
- Changes to aios-core codebase logic
- Migration of existing docs/* to external site
- Changes to package.json or dependencies

## File List

- [ ] README.md (update with docs site link)
- [ ] CONTRIBUTING.md (add reference to docs)
- [ ] CONTRIBUTORS.md (add @bychrisr credits)
- [ ] docs/external-resources.md (new file listing community resources)

## Dependencies

None — standalone documentation site already deployed.

## Risks

- **Low Risk:** Minimal changes to aios-core repository
- **Mitigation:** Only documentation files are modified, no code changes

## Definition of Done

- [ ] All acceptance criteria met
- [ ] README.md includes prominent link to docs site
- [ ] CONTRIBUTING.md references docs for new contributors
- [ ] Contributor credits properly added
- [ ] PR passes all quality gates (lint, typecheck)
- [ ] PR reviewed and approved by maintainers

## Business Value

- Improved onboarding experience for new AIOS users
- Professional documentation site enhances project credibility
- Multilingual support increases international adoption
- Search functionality improves discoverability
- Community contribution demonstrates ecosystem growth

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-02-16 | @bychrisr | Story created |
```

---

### Fase 3: Modificações no aios-core

#### 3.1. Atualizar README.md

<function_calls>
<invoke name="Read">
<parameter name="file_path">/media/bychrisr/externo/projects/work/aios-docs/.claude/CLAUDE.md
**Localização:** `README.md` (raiz do aios-core)

**Modificação:**

```markdown
# AIOS — Autonomous Development Engine

... [conteúdo existente] ...

## 📚 Documentation

**Official Documentation Site:** https://docs.synkraaios.site

The AIOS community documentation includes:
- **Getting Started Guides** — Quick start and 60-minute onboarding
- **Agent Reference** — Complete guide to all 13 AIOS agents
- **Workflows** — SDC, QA Loop, Spec Pipeline, Brownfield Discovery
- **Architecture** — System design and technical architecture
- **Playbook** — Practical guides, templates, and checklists
- **Multilingual** — Available in Portuguese, English, and Spanish

> 🌟 Community-maintained documentation by @bychrisr

... [conteúdo existente continua] ...
```

#### 3.2. Atualizar CONTRIBUTING.md

**Localização:** `CONTRIBUTING.md` ou `docs/CONTRIBUTING.md`

**Modificação:**

```markdown
# Contributing to AIOS

... [conteúdo existente] ...

## Documentation

For comprehensive guides on AIOS concepts, workflows, and best practices, visit our **community documentation site**:

👉 **https://docs.synkraaios.site**

The documentation includes:
- Introduction to AIOS and the Story Development Cycle
- Agent activation and workflow guides
- Coding standards and quality gates
- Template and checklist references
- Role-based learning trails

... [conteúdo existente continua] ...
```

#### 3.3. Adicionar Créditos de Contribuidor

**Opção A:** Criar/Atualizar `CONTRIBUTORS.md`

```markdown
# Contributors

Thank you to all the people who have contributed to AIOS!

## Core Team

[lista existente do time core]

## Community Contributors

### Documentation

- **@bychrisr** (Christian) — Community Documentation Site (https://docs.synkraaios.site)
  - Nextra 4 documentation site with multilingual support
  - Comprehensive guides, agent reference, and playbooks
  - Search functionality with Pagefind
  - Deployed at custom domain with CI/CD pipeline

[outros contribuidores]
```

**Opção B:** Se não existir CONTRIBUTORS.md, adicionar seção no README.md

```markdown
## 🙏 Contributors

Special thanks to community contributors:

- **@bychrisr** — [Community Documentation Site](https://docs.synkraaios.site) (multilingual docs with Nextra 4)

[outros contribuidores]
```

#### 3.4. Criar Arquivo de Recursos Externos (Novo)

**Localização:** `docs/external-resources.md`

```markdown
# External Resources

Community-created resources and tools for AIOS.

## Documentation

### Community Documentation Site
- **URL:** https://docs.synkraaios.site
- **Maintainer:** @bychrisr
- **Tech Stack:** Nextra 4, Next.js 15, Pagefind
- **Languages:** Portuguese (default), English, Spanish
- **Content:**
  - Getting Started Guides
  - Agent Reference (13 agents)
  - Workflow Documentation (SDC, QA Loop, Spec Pipeline)
  - System Architecture
  - Practical Playbook
  - Templates & Checklists
  - Command Reference
- **Repository:** https://github.com/bychrisr/aios-docs

## Contributing Resources

Have you created a resource for AIOS? Submit a PR to add it here!

**Requirements:**
- Must be publicly accessible
- Must follow AIOS principles and methodology
- Must maintain accuracy with official specs
- Should provide value to the community
```

---

### Fase 4: Validação Local (Quality Gates)

#### 4.1. Layer 1: Pre-commit (Local - Fast)

```bash
# Navegar para o diretório aios-core clonado
cd ~/aios-core

# Rodar ESLint (se aplicável aos arquivos Markdown)
npm run lint

# Verificar TypeScript (não aplicável para mudanças só de docs, mas rodar por garantia)
npm run typecheck

# Validar links (se o projeto tiver script para isso)
# npm run validate-links
```

**Tempo esperado:** <5s

#### 4.2. Layer 2: Story Validation

```bash
# Validar story criada
node .aios-core/utils/aios-validator.js stories

# Verificar se checkboxes estão marcados corretamente
```

#### 4.3. Verificação Manual

- [ ] README.md renderiza corretamente no GitHub
- [ ] Links para https://docs.synkraaios.site funcionam
- [ ] Créditos estão visíveis
- [ ] Arquivos Markdown seguem convenções do projeto

---

### Fase 5: Commit e Push

#### 5.1. Adicionar Arquivos Modificados

```bash
git add README.md
git add CONTRIBUTING.md
git add CONTRIBUTORS.md  # ou docs/CONTRIBUTORS.md
git add docs/external-resources.md
git add docs/stories/STORY-DOCS-SITE.md
```

#### 5.2. Commit Seguindo Convenção

```bash
git commit -m "docs: add community documentation site reference

Add reference to community-maintained documentation site at
https://docs.synkraaios.site in README.md and CONTRIBUTING.md.

The site provides comprehensive multilingual documentation including:
- Getting started guides and onboarding
- Complete agent reference (13 agents)
- Workflow documentation (SDC, QA Loop, Spec Pipeline)
- System architecture and design patterns
- Practical playbook with templates and checklists

Credits @bychrisr for building and maintaining the site.

Built with: Nextra 4, Next.js 15, Pagefind search
Languages: Portuguese (default), English, Spanish
Repository: https://github.com/bychrisr/aios-docs

Refs: STORY-DOCS-SITE"
```

#### 5.3. Push para Fork

```bash
git push origin docs/community-documentation-site
```

---

### Fase 6: Pull Request

#### 6.1. Criar PR via GitHub UI

**URL:** https://github.com/SynkraAI/aios-core/compare

**Base:** `main` (upstream)  
**Compare:** `docs/community-documentation-site` (seu fork)

#### 6.2. Título do PR

```
docs: add community documentation site reference
```

#### 6.3. Descrição do PR

```markdown
## 📚 Community Contribution — Documentation Site

### What
Add reference to community-maintained documentation site (https://docs.synkraaios.site) to help new and existing AIOS users find comprehensive guides and references.

### Why
The AIOS project deserves modern, accessible documentation that helps users:
- Onboard quickly with step-by-step guides
- Understand the 13 agents and their roles
- Learn workflows (SDC, QA Loop, Spec Pipeline)
- Access templates, checklists, and command references
- Navigate content in their preferred language

### How
- Updated `README.md` with prominent documentation link
- Updated `CONTRIBUTING.md` to reference docs for contributors
- Added contributor credits for @bychrisr
- Created `docs/external-resources.md` for community resources

### Documentation Site Features
✅ **Multilingual:** Portuguese (default), English, Spanish  
✅ **Search:** Pagefind with real-time indexed search  
✅ **Content:** 123 MDX files covering guides, agents, workflows, architecture, playbook  
✅ **Modern Stack:** Nextra 4 + Next.js 15 (App Router)  
✅ **Deployment:** Vercel with custom domain  
✅ **Open Source:** https://github.com/bychrisr/aios-docs

### Testing
- ✅ Links verified working
- ✅ Markdown renders correctly
- ✅ No code changes (docs only)
- ✅ Story validation passed

### Story Reference
`docs/stories/STORY-DOCS-SITE.md`

### Credits
**Created by:** @bychrisr (Christian)  
**Maintained by:** Community  
**Repository:** https://github.com/bychrisr/aios-docs

---

### PR Checklist
- [x] Follows AIOS coding standards (N/A - docs only)
- [x] All quality gates pass (lint, typecheck not applicable)
- [x] Test coverage ≥80% (N/A - docs only)
- [x] Story updated
- [x] Documentation updated
- [x] No console.logs or commented code (N/A)
- [x] Commits follow convention
- [x] PR description complete
- [x] Credits added for contributor

### Screenshots

[Adicionar screenshots do site: homepage, search, multilingual switcher, agent reference page]
```

#### 6.4. Labels Sugeridos

- `documentation`
- `community`
- `enhancement`

---

## 📸 Screenshots para o PR

Prepare screenshots do site para incluir no PR:

1. **Homepage** (https://docs.synkraaios.site/pt-BR/docs)
2. **Search functionality** (mostrando Pagefind em ação)
3. **Language switcher** (PT-BR / EN / ES)
4. **Agent reference page** (mostrando um dos 13 agentes)
5. **Workflow diagram** (SDC ou QA Loop com Mermaid)
6. **Mobile responsive** (vista mobile do site)

**Comando para gerar screenshots:**
```bash
# Se tiver ferramenta de screenshot CLI
# Ou manualmente: Ctrl+Shift+S no navegador
```

---

## ✅ Checklist Final Antes de Submeter PR

### Preparação
- [ ] Fork do aios-core criado
- [ ] Branch `docs/community-documentation-site` criada
- [ ] Story `STORY-DOCS-SITE.md` criada e validada

### Modificações
- [ ] README.md atualizado com link do site
- [ ] CONTRIBUTING.md atualizado com referência
- [ ] Créditos de @bychrisr adicionados
- [ ] `docs/external-resources.md` criado

### Validação
- [ ] Links funcionando (https://docs.synkraaios.site)
- [ ] Markdown renderiza corretamente
- [ ] Checkboxes da story marcados conforme progresso
- [ ] Commit segue convenção (Conventional Commits)

### PR
- [ ] Título segue formato: `docs: add community documentation site reference`
- [ ] Descrição completa com What/Why/How
- [ ] Screenshots incluídos
- [ ] Labels adicionados
- [ ] Story referenciada

### Pós-Submissão
- [ ] Monitorar feedback dos maintainers
- [ ] Responder a revisões prontamente
- [ ] Fazer ajustes solicitados se necessário

---

## 🔄 Pós-PR: Responder a Feedback

### Se Solicitarem Mudanças

```bash
# Fazer modificações nos arquivos
vim README.md

# Commit com mensagem indicando que é resposta a review
git add .
git commit -m "docs: address PR review feedback

- Updated wording in README.md
- Added missing link in CONTRIBUTING.md

Co-authored-by: [Reviewer Name] <email>"

# Push para o mesmo branch (atualiza PR automaticamente)
git push origin docs/community-documentation-site
```

### Se Aprovarem

🎉 **Parabéns!** Sua contribuição foi aceita pela comunidade AIOS.

**Próximos passos:**
1. Manter o site atualizado conforme aios-core evolui
2. Monitorar issues/PRs para atualizar documentação
3. Considerar contribuições adicionais

---

## 📝 Manutenção Contínua do Site

### Sincronização com aios-core

```bash
# Periodicamente, verificar mudanças no upstream
cd ~/aios-core
git fetch upstream
git log upstream/main --oneline -20

# Se houver mudanças relevantes, atualizar aios-docs
cd ~/aios-docs
# Atualizar conteúdo MDX conforme necessário
```

### Monitoramento

- **Issues:** Acompanhar https://github.com/SynkraAI/aios-core/issues
- **Releases:** Atualizar docs quando novas versões forem lançadas
- **Community feedback:** Melhorar docs baseado em dúvidas frequentes

---

## 🎯 Métricas de Sucesso

| Métrica | Objetivo |
|---------|----------|
| PR aceito e merged | ✅ Sim |
| Site referenciado no README oficial | ✅ Sim |
| Créditos visíveis | ✅ Sim |
| Zero breaking changes | ✅ Sim (apenas docs) |
| Feedback positivo da comunidade | 🎯 Meta |

---

## 📞 Contato

**Contribuidor:** @bychrisr (Christian)  
**Site:** https://docs.synkraaios.site  
**Repositório:** https://github.com/bychrisr/aios-docs

**Para dúvidas sobre o plano:**
- Abrir issue no repositório aios-docs
- Mencionar @bychrisr no PR do aios-core

---

## 🚀 Timeline Estimado

| Fase | Duração Estimada | Status |
|------|------------------|--------|
| Preparação (fork, clone, branch) | 10 minutos | ⏳ Pendente |
| Criar story | 15 minutos | ⏳ Pendente |
| Modificar arquivos | 30 minutos | ⏳ Pendente |
| Validação local | 10 minutos | ⏳ Pendente |
| Commit e push | 5 minutos | ⏳ Pendente |
| Criar PR com screenshots | 20 minutos | ⏳ Pendente |
| **Total** | **~90 minutos** | |
| Revisão pelos maintainers | 1-7 dias | ⏳ Aguardando |

---

**Versão:** 1.0  
**Data:** 2026-02-16  
**Autor:** @bychrisr  
**Status:** Pronto para Execução
