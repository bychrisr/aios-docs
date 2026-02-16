# AIOS Documentation Screenshots

Este diretório contém screenshots de referência do site de documentação AIOS para uso em GitHub Discussions, README, e materiais de apresentação.

## Screenshots Necessários

### 1. Homepage (`01-homepage.png`)
- **URL:** https://docs.synkraaios.site/pt-BR/docs
- **Viewport:** 1920x1080 (desktop)
- **Mostra:** Logo, navbar, sidebar, conteúdo principal da homepage
- **Foco:** Visão geral do layout e navegação

### 2. Search Demo (`02-search-demo.gif` ou `.png`)
- **URL:** https://docs.synkraaios.site/pt-BR/docs
- **Ação:** Clicar na barra de busca, digitar "agent", mostrar resultados
- **Viewport:** 1920x1080
- **Mostra:** Pagefind UI em ação, resultados instantâneos
- **Formato:** GIF animado (preferível) ou PNG estático

### 3. Language Switcher (`03-language-switcher.png`)
- **URL:** Qualquer página
- **Viewport:** 1920x1080
- **Mostra:** Dropdown de idiomas aberto (PT-BR / EN / ES)
- **Foco:** Navbar superior direita com seletor de idioma expandido

### 4. Agent Page (`04-agent-page.png`)
- **URL:** https://docs.synkraaios.site/pt-BR/docs/agents/dev
- **Viewport:** 1920x1080
- **Mostra:** Página de agente com formatação MDX, blocos de código, estrutura
- **Foco:** Qualidade da renderização de conteúdo

### 5. Workflow Mermaid (`05-workflow-mermaid.png`)
- **URL:** https://docs.synkraaios.site/pt-BR/docs/workflows/story-development-cycle
- **Viewport:** 1920x1080
- **Mostra:** Diagrama Mermaid renderizado
- **Foco:** Capacidade de renderização de diagramas

### 6. Mobile Responsive (`06-mobile-responsive.png`)
- **URL:** https://docs.synkraaios.site/pt-BR/docs
- **Viewport:** 375x667 (iPhone 8)
- **Mostra:** Hamburger menu, navegação mobile
- **Foco:** Responsividade do layout

---

## Como Capturar Screenshots

### Opção 1: Manualmente (Navegador)

**Chrome/Edge:**
1. Abrir DevTools (F12)
2. Ctrl+Shift+P → "Capture full size screenshot" ou "Capture screenshot"
3. Salvar como `0X-nome.png` neste diretório

**Firefox:**
1. Ctrl+Shift+S (Screenshot tool)
2. Selecionar "Save full page" ou "Save visible"
3. Salvar como `0X-nome.png` neste diretório

### Opção 2: CLI com Playwright

```bash
# Instalar Playwright (se necessário)
npm install -D @playwright/test
npx playwright install chromium

# Capturar screenshots
npx playwright screenshot https://docs.synkraaios.site/pt-BR/docs \
  docs/screenshots/01-homepage.png \
  --viewport-size=1920,1080

npx playwright screenshot https://docs.synkraaios.site/pt-BR/docs/agents/dev \
  docs/screenshots/04-agent-page.png \
  --viewport-size=1920,1080

npx playwright screenshot https://docs.synkraaios.site/pt-BR/docs/workflows/story-development-cycle \
  docs/screenshots/05-workflow-mermaid.png \
  --viewport-size=1920,1080 \
  --full-page

# Mobile
npx playwright screenshot https://docs.synkraaios.site/pt-BR/docs \
  docs/screenshots/06-mobile-responsive.png \
  --viewport-size=375,667
```

### Opção 3: Browser DevTools (Responsividade)

1. Abrir DevTools (F12)
2. Ativar Device Toolbar (Ctrl+Shift+M)
3. Selecionar dispositivo (iPhone 8, iPad, etc.)
4. Capturar screenshot

---

## Uso dos Screenshots

### GitHub Discussion
- Incorporar screenshots inline com `![alt](url)`
- Usar para demonstrar features e UX

### README.md
- Screenshot principal (homepage) no topo
- Features visuais (search, i18n) em seções específicas

### Apresentações
- Usar resolução original (1920x1080)
- Comprimir se necessário para tamanho de arquivo

---

## Especificações Técnicas

| Aspecto | Especificação |
|---------|---------------|
| Formato | PNG (ou GIF para demos animados) |
| Resolução Desktop | 1920x1080 |
| Resolução Mobile | 375x667 (iPhone 8) ou 768x1024 (iPad) |
| Compressão | PNG otimizado (TinyPNG, ImageOptim) |
| Tamanho máximo | < 500KB por screenshot |

---

*Última atualização: 2026-02-16*
