# Synkra AIOS Docs — Configuração do Agente de Desenvolvimento

Site de documentação pública da Synkra AIOS, construído com **Nextra 4 + Next.js 15 App Router**.

## Deployment

- **URL de Produção:** https://aios-docs.vercel.app
- **Domínio Custom:** https://docs.synkraaios.site
- **Projeto Vercel:** `christians-projects-623587aa/aios-docs`
- **Comando de deploy:** `vercel deploy --prod --yes --scope christians-projects-623587aa`

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Docs Engine:** Nextra 4 (`nextra` + `nextra-theme-docs`)
- **Busca:** Pagefind (indexação HTML pós-build, 3 índices de idioma)
- **i18n:** 3 locales — `pt-BR` (padrão), `en`, `es`
- **Deploy:** Vercel (SSG) com step de Pagefind pós-build
- **DNS:** Cloudflare CNAME → `cname.vercel-dns.com`
- **Testes E2E:** Playwright

## Estrutura do Projeto

```
aios-docs/
├── app/
│   ├── layout.tsx              # Root layout (metadata, imports de CSS)
│   ├── custom.css              # Overrides CSS (sidebar locale switch oculto)
│   └── [lang]/
│       ├── layout.tsx          # Layout aware de locale (navbar, sidebar, footer, i18n)
│       └── [[...mdxPath]]/
│           └── page.tsx        # Renderer dinâmico de páginas MDX
├── content/
│   ├── pt-BR/                  # Conteúdo em Português (locale padrão)
│   │   ├── docs/               # 110 arquivos .mdx sincronizados de docs/pt/
│   │   └── playbook/           # 13 arquivos .mdx do playbook (mantido manualmente)
│   ├── en/                     # Conteúdo em Inglês
│   │   ├── docs/               # 136 arquivos .mdx sincronizados de docs/ (raiz)
│   │   └── playbook/           # 13 arquivos .mdx do playbook (mantido manualmente)
│   └── es/                     # Conteúdo em Espanhol
│       ├── docs/               # 135 arquivos .mdx sincronizados de docs/es/
│       └── playbook/           # 13 arquivos .mdx do playbook (mantido manualmente)
├── scripts/
│   ├── sync-content.sh         # Script de sync v4.1 (espelha SynkraAI/aios-core)
│   └── mdx-sanitizer.js        # Sanitizador Node.js: MD → MDX compatível com Nextra
├── e2e/
│   └── example.spec.ts         # Testes E2E Playwright (2 testes, 6 variantes)
├── middleware.ts                # Proxy de locale Nextra (auto-detect + redirect)
├── next.config.mjs             # Config Nextra + i18n locales + redirects
├── vercel.json                 # Config Vercel (buildCommand, security headers)
├── mdx-components.tsx          # Overrides de componentes MDX
└── public/_pagefind/           # Índice de busca (gerado no build, ignorado no git)
```

---

## Sistema de Sincronização de Conteúdo (Mirror)

### Repositório Fonte

**`SynkraAI/aios-core`** — Clonado em `/tmp/aios-core` no CI/CD ou localmente.

### Estrutura Real do Repositório Fonte

```
aios-core/docs/
├── (raiz/sem prefixo)  ← INGLÊS ORIGINAL (~192 arquivos públicos)
│   ├── guides/         ← 86 guias em EN
│   ├── architecture/   ← docs técnicos EN
│   ├── installation/   ← guias de instalação EN
│   ├── aios-agent-flows/  ← fluxos de agentes EN
│   ├── aios-workflows/ ← workflows EN
│   └── ...
├── pt/                 ← PORTUGUÊS-BR (111 arquivos — tradução)
├── es/                 ← ESPANHOL (136 arquivos — tradução)
├── en/                 ← Apenas 25 arquivos de subcategorias específicas
│                         (aios-agent-flows + aios-workflows em EN)
│                         → merge no EN final com precedência
└── (docs internas: stories/, research/, handoffs/, qa/, releases/, strategy/)
```

### Mapeamento de Sync

| Origem no Repo Fonte                                    | Destino no Site       |
| ------------------------------------------------------- | --------------------- |
| `docs/` raiz (excluindo `/pt`, `/en`, `/es` e internas) | `content/en/docs/`    |
| `docs/en/` _(merge, versão EN específica prevalece)_    | `content/en/docs/`    |
| `docs/pt/`                                              | `content/pt-BR/docs/` |
| `docs/es/`                                              | `content/es/docs/`    |

### Resultado atual (406 arquivos, 0 erros)

| Idioma        | Arquivos .mdx |
| ------------- | ------------- |
| `en/docs/`    | 136           |
| `pt-BR/docs/` | 110           |
| `es/docs/`    | 135           |

O gap entre idiomas é **real e correto** — reflete o estado atual do `aios-core`: EN é o original (mais completo), PT e ES são traduções em progresso.

### Executar Sync Localmente

```bash
# Clonar o repo fonte
git clone https://github.com/SynkraAI/aios-core /tmp/aios-core

# Executar o sync (gera content/{en,pt-BR,es}/docs/)
bash scripts/sync-content.sh /tmp/aios-core

# Validar o build
npm run build
```

---

## Scripts de Infraestrutura

### `scripts/sync-content.sh` (v4.1)

Script Bash que espelha a documentação do `aios-core` para o site.

**Exclusões aplicadas (conteúdo interno ou incompatível com MDX):**

- Pastas: `stories/`, `research/`, `handoffs/`, `qa/`, `releases/`, `strategy/`
- Arquivos: `guides/agents/traces/*`, `guides/agents/*-SYSTEM.md`, `guides/workflows/xref-*`, `guides/workflows/AIOS-COMPLETE-CROSS-REFERENCE-ANALYSIS.md`, `00-shared-activation-pipeline*`

**Uso:**

```bash
bash scripts/sync-content.sh /path/to/aios-core-clone
```

### `scripts/mdx-sanitizer.js`

Script Node.js que processa cada arquivo `.md` via `stdin` → `stdout`, tornando-o compatível com o parser MDX do Nextra 4.

**Problemas resolvidos:**

1. **Comentários HTML `<!-- -->`** → removidos (causavam `Unexpected !`)
2. **URLs em angle brackets `<https://...>`** → convertidas para `[https://...]`
3. **Comparador `<=`** → escapado para `&lt;=` (causava `Unexpected =`)
4. **Tags HTML leves** (`<br>`, `<b>`, `<img>`, `<p>`, etc.) → escapadas para entidades HTML
5. **Âncoras `<a name="..."></a>`** → removidas (causavam `Unexpected closing slash`)
6. **`< seguido de número/espaço`** (ex: `<1ms`) → escapado para `&lt;1ms`
7. **Chaves literais `{texto}`** → convertidas para `[texto]` (causavam erros Acorn)
8. **Tags HTML dentro de blocos Mermaid** → múltiplos passes para aninhamento; `<br/>` vira `/`, outras tags removidas mantendo texto
9. **`&` literal em labels Mermaid** → escapado para `&amp;` (causava erros de parsing)

---

## Problemas Conhecidos Resolvidos

### 1. Importação inválida de `<Html>` do Next.js

**Problema:** `import { Html } from 'next/document'` em `app/layout.tsx` — importação inválida no App Router.
**Solução:** Substituído por tag HTML padrão `<html>`.

### 2. Build Nextra falhava em arquivos MD do aios-core

**Problema:** Nextra 4 usa parser MDX + Acorn (compilador de AST JavaScript), que interpreta conteúdo Markdown como JSX. Qualquer `<tag>`, `{chave}`, ou `<!-- comentário -->` causa erro de build.
**Solução:** `scripts/mdx-sanitizer.js` — processa cada arquivo antes de gravar `.mdx`.

### 3. Script de sync apontava para pasta legada errada

**Problema:** O script original apontava para `.aios-core/docs/` (22 arquivos de standards), ignorando os 400+ arquivos reais em `docs/pt/`, `docs/en/` e `docs/es/`.
**Solução:** `sync-content.sh` v4.1 — mapeia corretamente a estrutura do repositório.

### 4. Gap aparente entre idiomas (EN: 192 vs PT: 111)

**Problema:** Inicial interpretação de que faltavam 81 arquivos em PT-BR.
**Conclusão:** O gap é real mas intencional — reflete o estado atual das traduções. `docs/` raiz é o inglês original. `docs/pt/` e `docs/es/` são traduções em progresso. Não há documentação "faltando" — há documentação ainda não traduzida.

### 5. Diagramas Mermaid com tags HTML internas quebravam o build

**Problema:** Blocos Mermaid contendo `<br/>`, `<b>texto</b>` e chaves `{}` (sintaxe de nós de decisão) causavam `Unexpected -` e `Unexpected character` no parser MDX.
**Solução:** `sanitizeMermaidBlock()` no sanitizador: processa blocos `mermaid` com regex global antes do split em linhas, substituindo `<br/>` por `/` e removendo tags HTML residuais.

### 6. Testes Playwright falhavam com título vazio

**Problema:** `page.goto('http://localhost:3000/')` retornava redirect `/pt-BR` como texto puro — o Next.js serve redirect sem HTML completo.
**Solução:** Navegar diretamente para `http://127.0.0.1:3000/pt-BR` (bypassando resolução de DNS do localhost no Playwright).

---

## Gaps Conhecidos e Limitações Atuais

| Gap                                       | Descrição                                                                 | Impacto                                         |
| ----------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| **BROWNFIELD-SERVICE-WORKFLOW (EN)**      | Habilitado via sanitizador melhorado (v4.3) — testado no próximo sync     | A ser confirmado no próximo sync do CI          |
| **guides/agents/traces/**                 | Excluído — são execution traces técnicos não adequados para docs públicas | Normal                                          |
| **docs-agent-technical-specification.md** | Excluído (PT e ES) — incompatível MDX irrecuperável                       | Especificação técnica ausente                   |
| **00-shared-activation-pipeline.md**      | Excluído — mermaid com sintaxe muito complexa                             | Doc de pipeline de ativação ausente             |
| **EN > PT > ES**                          | Gap de cobertura real entre idiomas                                       | Esperado enquanto traduções não estão completas |
| **Playbook não espelhado do aios-core**   | Playbook usa conteúdo mantido manualmente neste repo                      | Pode divergir do aios-core                      |

---

## Próximas Implementações

### Prioridade Alta

1. ~~**CI/CD: GitHub Actions para sync automático**~~ ✅ **FEITO** (2026-02-21)
   - `sync-content.yml`: cron diário 06:00 UTC + trigger manual — zero secrets necessários
   - `pr-validate.yml`: gate de build MDX em todo PR para `main`
   - Vercel auto-deploya via integração GitHub existente no push em `main`

2. ~~**Melhorar sanitizador para habilitar BROWNFIELD-SERVICE-WORKFLOW**~~ ✅ **FEITO** (2026-02-21)
   - Sanitizador v4.3: múltiplos passes de HTML stripping em mermaid, suporte a `&` em labels
   - Exclusão do BROWNFIELD-SERVICE-WORKFLOW removida do `sync-content.sh`

3. ~~**Auditoria do Playbook**~~ ✅ **FEITO** (2026-02-21)
   - Links quebrados `/playbook/workflows` corrigidos em EN, PT-BR e ES
   - Redirecionados para `/docs/guides/workflows` onde os arquivos reais estão

4. ~~**Reescrita completa do Playbook para AIOS v4.2**~~ ✅ **FEITO** (2026-02-21)
   - Novos arquivos: `cheat-sheet.mdx` e `agents.mdx` nos 3 locales
   - `index.mdx` reescrito com navigator por persona (6 perfis → links diretos)
   - `onboarding-60min.mdx`: 12 agentes corretos (era 13), nomes incluídos
   - `specialized-commands.mdx`: comandos reais por agente (todos os 12)
   - `trails/index.mdx`: links verificados para `/docs/guides/workflows/*`
   - `_meta.js` atualizado nos 3 locales com novas entradas
   - 33 testes Playwright passando (Chromium, Firefox, WebKit)

### Prioridade Média

4. ~~**Adicionar `_meta.js` dinâmico para navegação**~~ ✅ **FEITO** (2026-02-21)
   - `_meta.js` criado nas raízes de `content/{en,pt-BR,es}/docs/`
   - Controla labels traduzidos e ordem das seções principais na sidebar

5. ~~**Expandir cobertura de testes E2E**~~ ✅ **FEITO** (2026-02-21 → atualizado 2026-02-21)
   - 11 testes, 33 variantes (3 browsers): render, sync, workflow, multi-idioma, playbook, cheat-sheet, agents (todos os 12), onboarding, trails sem links quebrados
   - Seletores escopados a `article/main` para evitar falsos positivos da sidebar

6. **Melhorar tratamento dos arquivos Mermaid excluídos**
   - Implementar fallback: se arquivo tem mermaid incompatível, gerar versão simplificada sem o diagrama
   - Ainda relevante para `00-shared-activation-pipeline.md`

### Prioridade Baixa

7. **Design System (Tier 2 — a validar)**
   - Shadow tokens para sidebar e cards
   - Bordas com radius para cards de conteúdo
   - Validar impacto em métricas de bounce rate

8. **Monitor de paridade de sync**
   - Script que compara arquivos no aios-core vs content/ e gera relatório de diferenças
   - Alertar quando novos arquivos são adicionados ao aios-core mas não sincronizados

---

## Comandos Comuns

```bash
# Desenvolvimento (busca não funciona)
npm run dev

# Build de produção + indexação Pagefind
npm run build

# Servir produção local (busca funciona)
npm run start

# Sync completo (clone + sync + build)
git clone https://github.com/SynkraAI/aios-core /tmp/aios-core
bash scripts/sync-content.sh /tmp/aios-core
npm run build

# Testes E2E (requer npm run start rodando)
npx playwright test

# Deploy para produção
vercel deploy --prod --yes --scope christians-projects-623587aa
```

O script `build` executa: `next build && pagefind --site .next/server/app --output-path public/_pagefind`

---

## Métricas de Build Atuais (2026-02-21)

- **Páginas estáticas:** 432 geradas com sucesso
- **Arquivos MDX sincronizados (docs):** 381 (en: 136, pt-BR: 110, es: 135)
- **Arquivos MDX do playbook:** 39 (13 por locale × 3 locales)
- **Testes E2E:** 11 testes, 33 variantes (Chromium + Firefox + WebKit)
- **Idiomas:** 3 (pt-BR, en, es)
- **Sync automático:** diariamente às 06:00 UTC via GitHub Actions
- **Branch de trabalho:** sempre via PR — nunca direto em `main`

---

## Vercel e CI/CD

### GitHub Actions (automático)

| Workflow | Trigger | O que faz |
| -------- | ------- | --------- |
| `sync-content.yml` | Cron 06:00 UTC + manual | Clona aios-core, sync, commit em main |
| `pr-validate.yml` | Todo PR para main | `next build` — valida MDX antes do merge |

O Vercel detecta o push em `main` e deploya automaticamente (integração GitHub).

### Deployment Manual (quando necessário)

```bash
vercel deploy --prod --yes --scope christians-projects-623587aa
```

### Environment Variables (Vercel)

```
NEXTRA_DEFAULT_LOCALE=pt-BR
NEXTRA_LOCALES=["pt-BR","en","es"]
NEXT_PUBLIC_SITE_URL=https://docs.synkraaios.site
```

---

## Regras de i18n

- Locale padrão: `pt-BR` (root `/` redireciona para `/pt-BR/docs`)
- `_meta.js` labels devem ser traduzidos por locale
- Chaves em `_meta.js` mapeiam para nomes de arquivos `.mdx` — cada chave PRECISA ter arquivo correspondente
- Locale switcher mostra nomes abreviados: PT-BR, EN, ES
- Rotas `/:lang` redirecionam para `/:lang/docs` (configurado em `next.config.mjs`)

---

## Gotchas do MDX (Nextra 4)

- **Nunca usar `<=` ou `>=` em MDX** — usar `≤` e `≥` (unicode) ou `&lt;=`
- **Nunca usar `<` nu antes de texto** — MDX interpreta como JSX; usar `&lt;`
- **Nunca usar chaves `{texto}` em texto normal** — Acorn interpreta como expressão JS
- **Comentários HTML `<!-- -->` causam `Unexpected !`** — usar `{/* comentário */}` no MDX
- **Tags HTML em blocos Mermaid** — o parser MDX analisa o interior dos blocos; `<br/>` deve virar `<br />`
- **URLs em angle brackets `<https://...>`** — converter para `[url](url)` ou `[url]`
- **Todo `_meta.js` precisa de arquivo `.mdx` correspondente** — arquivos faltando causam erros de build
- **Arquivos MDX escritos manualmente** não passam pelo sanitizador — `{texto}` fora de backticks DEVE ser escapado manualmente (ex: `` `EPIC-{ID}-EXECUTION.yaml` `` em vez de `EPIC-{ID}-EXECUTION.yaml`)
- **Chaves em `_meta.js`** mapeiam para arquivos/dirs commitados no git — nunca adicionar chave para conteúdo gerado por sync local

---

## Design System

### Filosofia (Influenciada pelo Alan DS da Synkra)

**Princípio Core:** "Extração de tokens, não porte de componentes" — adotar tokens de design seletivamente mantendo o UX de documentação do Nextra.

### Implementação Atual

```css
:root {
  /* Tipografia */
  --font-sans: "Inter", -apple-system, sans-serif;
  --font-serif: "Source Serif 4", serif;
  --font-mono: "JetBrains Mono", monospace;

  /* Paleta Gold */
  --primary: 32 27% 69%; /* #C9B298 Gold do Alan DS */
  --primary-dark: 33 27% 50%; /* Gold escuro para hover */

  /* Espaçamento (base 4px) */
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
}
```

### Mobile UX

- **Header `<768px`:** Logo | ícone de tema | ícone de locale | ícone GitHub | Menu
- Botões em modo ícone-only no mobile
- Footer empilha verticalmente com alinhamento centralizado
- LocaleSwitch oculto no rodapé do sidebar mobile (mantido apenas na navbar)

---

## Git Conventions

- **NUNCA trabalhar direto em `main`** — sempre criar branch, abrir PR, mergear
- Prefixos de branch: `feat/`, `fix/`, `chore/`, `docs/`
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
- Nunca commitar `.env`
- `public/_pagefind/` ignorado pelo git (gerado no build)
- Exceção: bot de sync (`github-actions[bot]`) commita direto em `main` com `[skip ci]`

---

_Synkra AIOS Docs — CLAUDE.md v4.4_
_Última atualização: 2026-02-21 — Sanitizador melhorado, BROWNFIELD habilitado, playbook corrigido, `_meta.js` de navegação, 5 testes E2E_
