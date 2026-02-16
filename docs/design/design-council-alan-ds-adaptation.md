# Design Council: Alan DS Visual Adaptation for AIOS Docs

**Council Session:** Kaven Design Council v1.0
**Date:** 2026-02-16
**Requesting Agent:** @ux-design-expert (Uma)
**Scope:** Design System
**Framework:** Steel Man (2 rounds)
**Urgency:** Thorough (full roundtable)
**Participants:** Brad Frost, Don Norman, Julie Zhuo

---

## 🎯 Design Question (English)

**How can we adapt visual elements from Alan DS (Lendária Design System) to aios-docs while maintaining documentation usability?**

### Context

**Alan DS (Source):**
- React SPA with 60 components
- Typography: Inter (UI) + Source Serif 4 (reading) + Rajdhani (display) + JetBrains Mono (code)
- Gold palette (#C9B298 - `32 27% 69%`)
- Design tokens: spacing (4px base), shadows, border-radius, animations
- Philosophy: Luxury Minimalism (primary color ≤8%, generous whitespace, dark-first)

**aios-docs (Target):**
- Nextra 4 SSG + Next.js 15
- Focus: Technical documentation readability
- Mobile-first responsive (375px-1920px)
- 3 languages (pt-BR, en, es)
- 87 indexed pages
- Current: 49 lines in `app/custom.css`

### Technical Constraints

1. **Nextra 4 limitations:** Cannot import Alan DS React components directly
2. **SSG build:** Changes must be CSS/design tokens only
3. **Mobile-first:** Already optimized for icon-only navbar at <768px
4. **i18n:** Must work across 3 locales
5. **Performance:** Cannot increase bundle size significantly

### Challenge

Bring Alan DS's visual identity to docs **without:**
- Copying 100% of the design
- Losing the "technical documentation wiki" essence
- Breaking Nextra's structure

---

## 🔍 Framed Question (Technical Context)

**Architect's Refinement:**

"How can we incorporate Alan DS's visual identity into aios-docs without compromising the technical documentation reading experience, considering:
- **Alan DS:** React SPA, 60 components, dark-first, Luxury Minimalism (color ≤8%)
- **aios-docs:** Nextra 4 SSG, readability-focused, mobile-first, 3 languages
- **Goal:** Visual polish maintaining 'accessible technical wiki' essence"

**Affected Areas:**
- `app/custom.css` (current: 49 lines)
- Global typography (Nextra uses Inter by default)
- Semantic color palette
- Spacing/shadows/radius tokens

---

## 🧠 Individual Perspectives

### 🎨 Brad Frost - Design Systems Expert

**Applied Frameworks:** Atomic Design, Interface Inventory, Scale Testing

#### Key Insight

> "This is a **TOKEN EXTRACTION** problem, not a **COMPONENT PORT** problem. Extract 5-8 design tokens from Alan DS. Apply them incrementally. Show progress, not perfection."

#### Reality Check

**The Brutal Truth:** Alan DS is a component library for SPAs with 60 interactive components. Nextra is a documentation SSG that needs readability at 375px-1920px with 87 pages of technical content in 3 languages. **These are fundamentally different problems.**

#### Atomic Decomposition

```
Alan DS Components:
  - 60 React components (Atoms/Molecules/Organisms)
  - Interactive: Buttons, Cards, Dialogs, Forms
  - Dark-first UX (240 5% 4%)
  - Gold accent (32 27% 69%)

aios-docs "Components":
  - Markdown content (paragraphs, headings, code blocks)
  - Navigation (sidebar, navbar, breadcrumbs)
  - Search (Pagefind)
  - Non-interactive: mostly text consumption
```

#### Recommended Approach: "Subtle Tokenization"

**PHASE 1: Typography Migration (Zero Risk)**
```css
:root {
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-serif: 'Source Serif 4', serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-display: 'Rajdhani', sans-serif; /* use sparingly */
}

body { font-family: var(--font-sans); }
code, pre { font-family: var(--font-mono); }
.prose { font-family: var(--font-serif); }
```

**Why:** Typography is the fastest visual signal of "design system presence" without disrupting layout.

**PHASE 2: Color Accent (Low Risk)**
```css
:root {
  --primary: 32 27% 69%; /* Gold from Alan DS */
  --primary-dark: 33 27% 50%;
}

a { color: hsl(var(--primary)); }
a:hover { color: hsl(var(--primary-dark)); }
```

**Why:** Luxury Minimalism = color ≤8%. Links are ~5-8% of a doc site. Perfect candidate.

**PHASE 3: Spacing/Shadows (Medium Risk)**
```css
:root {
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}

.card, .nextra-sidebar { box-shadow: var(--shadow-sm); }
```

#### What to NEVER Do

❌ Try to import Alan DS's 60 components (wrong tool for the job)
❌ Force dark-first on a docs site (readers prefer light backgrounds)
❌ Copy entire `tailwind.config.ts` (over-engineering)
❌ Touch Nextra's layout logic (breaks i18n and search)

#### Scale Testing

- **1 page:** Does typography feel clearer? Does gold accent guide the eye?
- **10 pages:** Does spacing feel more generous? Does sidebar feel elevated?
- **87 pages:** Does it still build? Do all 3 languages work? Is mobile fast?

#### ROI Calculation

- **Time investment:** 2-4 hours (typography + tokens)
- **Maintenance burden:** Near zero (CSS variables, no JS)
- **Visual impact:** 7/10 (enough to feel "elevated" without breaking docs UX)
- **Risk:** 2/10 (isolated to `custom.css`, rollback in 5 minutes)

#### The Interface Inventory I'd Run

Screenshot 5 current aios-docs pages and 5 Alan DS guide pages side by side. Ask: **"Are we solving a real problem, or are we just bored with how our docs look?"**

If you can't articulate the problem in one sentence, you don't need Alan DS tokens. You need user feedback.

---

### 🧭 Don Norman - UX Expert

**Applied Frameworks:** Seven Stages of Action, Three Levels of Emotional Design, Affordances & Signifiers

#### Core Question

> "The question is not 'how do we make aios-docs look like Alan DS?' The question is: **'Will this visual adaptation improve or harm users' ability to achieve their goals?'**"

#### User Goals for Technical Documentation

1. **Find information quickly** (search, navigate)
2. **Understand complex concepts** (readability, examples)
3. **Copy/paste code reliably** (code blocks, syntax highlighting)
4. **Return to reference material** (breadcrumbs, bookmarks)

#### Three Levels Assessment

**LEVEL 1: VISCERAL (First Impression)**

Alan DS's Luxury Minimalism is beautiful and creates immediate emotional response: "This is premium. This is crafted."

**Verdict:** Neutral-to-positive. Visual elevation won't harm, but won't drive primary value for task-oriented users.

**LEVEL 2: BEHAVIORAL (In-Use Experience)**

**Key Cognitive Differences:**

| Alan DS (SPA) | aios-docs (SSG) |
|---------------|----------------|
| Click-heavy interactions | Scroll-heavy reading |
| Visual hierarchy via color | Visual hierarchy via typography |
| Dark backgrounds (reduce eye strain for UI) | Light backgrounds (better for long-form text) |
| Generous whitespace (guides action) | Dense information (reference utility) |

**Concern:** Applying dark-first design creates a **Gulf of Execution**. Users expect light backgrounds for reading. Dark mode forces cognitive re-adjustment.

**Verdict:** **Risky.** Typography and spacing = safe. Color inversion = cognitive friction.

**LEVEL 3: REFLECTIVE (Post-Use Meaning)**

Documentation is a **utilitarian tool**. Users judge docs by **speed and accuracy**, not **aesthetics**.

#### Seven Principles Checklist

1. **Discoverability** — ✅ Gold for links = good signifier | ❌ Gold for decoration = noise
2. **Feedback** — ✅ Alan DS hover states adapt well to Nextra nav
3. **Conceptual Model** — ⚠️ "Interactive app" vs. "Reference wiki" mismatch risk
4. **Affordances** — ⚠️ Visual richness suggests interactivity that doesn't exist
5. **Signifiers** — ❌ Alan DS signals "application," not "documentation"
6. **Mappings** — ✅ Typography/spacing safe | ❌ Component styling creates false affordances
7. **Constraints** — ✅ Design tokens add good constraints | ❌ Over-styling = unnecessary complexity

#### Bridging the Gulfs

**Gulf of Execution (Can users find what they need?):**
- Typography upgrade = ✅ (better readability)
- Dark-first design = ❌ (unfamiliar for docs)
- Gold accents for links = ✅ (clear signifiers)

**Gulf of Evaluation (Can users understand what they found?):**
- Better spacing = ✅ (reduced cognitive load)
- Luxury aesthetics = ⚠️ (may imply interactivity that doesn't exist)

#### Surgical Token Adoption

**ADOPT (Safe for Documentation UX):**
1. Typography tokens (Inter for UI, Source Serif for body)
2. Spacing tokens (generous whitespace improves scannability)
3. Gold accent for links/CTAs (clear signifiers, ≤8% usage)
4. Shadow tokens for nav/cards (depth helps hierarchy)

**ADAPT (Modify for Docs Context):**
5. Light-first, dark-optional (don't force dark mode)
6. Radius tokens (subtle rounding, not aggressive)

**AVOID (Cognitive Friction):**
7. ❌ 60 Alan DS components (wrong affordances)
8. ❌ Dark-first as default (reading convention violation)
9. ❌ Heavy animations (distracting for text consumption)

#### Humanity-Centered Consideration

> "Documentation serves developers learning new systems, often under time pressure. **Respect their cognitive load.** Visual elegance is secondary to **findability, readability, and reliability.**"

**Final Verdict:** Selectively adopt 5-6 tokens, maintain docs-first UX principles. The goal is "elevated documentation," not "documentation disguised as an app."

---

### 💎 Julie Zhuo - Design Leadership

**Applied Frameworks:** Purpose-People-Process, Design as Problem-Solving, Controversial Principles Test

#### The Story

> "When I was at Facebook, we had this constant tension: **'Should our internal design system match the consumer-facing product's aesthetic, or should it have its own identity?'** The answer was uncomfortable but correct: **'It depends on what problem you're solving.'**"

#### Purpose-People-Process Framework

**PURPOSE: What Problem Are You Solving?**

Honestly answer: **Why do you want to adapt Alan DS's visual identity to aios-docs?**

Is it because:
- **A) Users complain that aios-docs looks unprofessional?** (User problem)
- **B) You personally feel it's visually boring?** (You problem)
- **C) You want brand consistency across projects?** (Brand problem)
- **D) You admire Alan DS and want to learn from it?** (Learning problem)

**The answer changes the strategy.** Design thinking starts with problem definition.

**PEOPLE: Who Are Your Users and What Do They Value?**

Your users are **developers, PMs, and architects reading technical documentation**. Based on 14 years at Facebook working with engineers, they value:

1. **Speed** — Can I find the answer in <30 seconds?
2. **Clarity** — Is the explanation clear and example-driven?
3. **Reliability** — Can I trust this is up-to-date?
4. **Copyable code** — Can I steal this and run?

Notice what's NOT on this list? **"Visually stunning typography."** That doesn't mean aesthetics don't matter — they're **hygiene factors, not delight factors**.

#### The Controversial Principles Test

- ❌ "Docs should be readable" — **Too vague.** Everyone agrees. Useless.
- ✅ "Docs should prioritize findability over visual elegance" — **Controversial.** Some would argue visual elegance IS findability. Real trade-off.

**Real question:** "Will Alan DS's visual identity improve findability, or will it prioritize elegance at findability's expense?"

**PROCESS: How Do You Validate This Decision?**

**STEP 1: Prototype 3 Levels**

- **Level 1: Typography + Gold links** (2 hours)
- **Level 2: + Spacing/Shadows** (4 hours)
- **Level 3: + Dark-first attempt** (8 hours)

Ship Level 1 to 20% of users. Measure: **Time to find doc page, bounce rate, feedback.**

**STEP 2: Run the "5-Second Test"**

Show screenshot of current vs. adapted version to 10 engineers. Ask: **"What is this?"**

- If both say "documentation" → Safe adaptation
- If adapted says "app" → Cognitive mismatch

**STEP 3: Ask the Hard Question**

**"If we spend 10 hours on visual polish, what 10 hours of content improvement are we NOT doing?"**

**Prioritize Until It Hurts.** Every hour on Alan DS tokens is an hour NOT spent on:
- Adding more code examples
- Improving search indexing
- Translating to a 4th language
- Fixing broken links

**Is the visual upgrade the highest leverage work right now?**

#### Recommendation: Incremental + Validated

**ADOPT with user validation:**
1. Typography tokens (Inter + Source Serif)
2. Gold accent for links (≤8% usage)
3. Spacing tokens (generous whitespace)

**TEST before full rollout:**
4. Shadow tokens for nav/cards
5. Dark mode as **opt-in** (not default)

**AVOID without strong user signal:**
6. Porting 60 components (wrong problem)
7. Dark-first as default (reading convention break)
8. Rajdhani display font everywhere (too aggressive)

#### The Manager's Questions

If I were your manager proposing this:

1. **"What user problem does this solve?"** (Purpose)
2. **"Have you validated this with 5 real users?"** (People)
3. **"What's the rollback plan if it hurts usability?"** (Process)
4. **"What are we NOT doing because we're doing this?"** (Trade-offs)

#### Final Thought

> "The most beautiful design that doesn't serve users is just… expensive decoration. Be thoughtful. Be incremental. Be user-focused."

---

## 📊 Consolidated Summary

### Consensus Points

All three minds agree on:

1. ✅ **Typography tokens are safe and valuable** (Inter, Source Serif, JetBrains Mono)
2. ✅ **Gold accent for links works** (≤8% usage aligns with Luxury Minimalism)
3. ✅ **Spacing tokens improve readability** (generous whitespace reduces cognitive load)
4. ✅ **Incremental rollout is critical** (ship small, validate, iterate)
5. ✅ **Avoid porting 60 components** (wrong tool for the job)

### Key Disagreements / Trade-offs

| Aspect | Brad Frost | Don Norman | Julie Zhuo |
|--------|-----------|-----------|-----------|
| **Dark mode** | Don't force it on docs | Cognitive friction risk | Test with users first |
| **Risk assessment** | 2/10 (low) if incremental | 5/10 (medium) if components | 3/10 with validation |
| **Primary concern** | Over-engineering | Cognitive mismatch | Problem definition |
| **Core framework** | Interface Inventory | Seven Stages of Action | Purpose-People-Process |

### Three-Tier Recommendation

#### ✅ TIER 1: ADOPT (Safe, High Value)

**Estimated effort:** 2-4 hours
**Risk:** 2/10
**Expected impact:** 7/10

1. **Typography System**
   - Inter for UI elements
   - Source Serif 4 for body text (better reading)
   - JetBrains Mono for code blocks
   - Rajdhani sparingly for hero sections

2. **Gold Accent for Links**
   - `--primary: 32 27% 69%` (Alan DS gold)
   - Apply to: links, CTAs, active nav items
   - Total usage: ≤8% (Luxury Minimalism principle)

3. **Spacing Tokens (4px base unit)**
   - `--space-4: 1rem`, `--space-6: 1.5rem`, `--space-8: 2rem`
   - Apply to: content padding, section margins

#### ⚠️ TIER 2: TEST BEFORE FULL ROLLOUT (Moderate Risk)

**Estimated effort:** 4-6 hours
**Risk:** 4/10
**Expected impact:** 5/10

4. **Shadow Tokens**
   - `--shadow-sm`, `--shadow-md` for nav/cards
   - Adds depth, improves visual hierarchy
   - **Validation:** 5-second test with 10 users

5. **Dark Mode (Opt-in)**
   - NOT default (preserves reading conventions)
   - User toggle in navbar
   - **Validation:** Usage metrics after 2 weeks

6. **Border Radius Tokens**
   - Subtle rounding (not aggressive)
   - Apply to: cards, code blocks, buttons

#### ❌ TIER 3: AVOID (High Risk, Low Value)

7. **Porting Alan DS Components** — Wrong problem
8. **Dark-first as Default** — Cognitive friction for reading
9. **Heavy Animations** — Distracting for text consumption
10. **Rajdhani Everywhere** — Too aggressive for body text

### Implementation Strategy

**Week 1: Tier 1 (Typography + Gold + Spacing)**
- Implement in `app/custom.css`
- Ship to 20% of users
- Measure: bounce rate, time-to-find, qualitative feedback

**Week 2-3: Validation & Iteration**
- If Tier 1 metrics positive → Proceed to Tier 2
- If neutral/negative → Rollback, gather user feedback
- Run 5-second test with screenshots

**Week 4: Tier 2 (Shadows + Dark Mode Opt-in)**
- Ship to 50% of users
- A/B test dark mode toggle usage
- Monitor performance impact

### Success Metrics

- **Qualitative:** "Docs look more professional" feedback
- **Behavioral:** Time-to-find unchanged or improved
- **Performance:** Build time unchanged, bundle size <5% increase
- **Accessibility:** WCAG AA maintained across all 3 languages

---

## 🎯 Action Items

1. **@ux-design-expert (Uma):** Create CSS prototype with Tier 1 tokens
2. **@kaven-frontend-dev (Pixel):** Implement typography + gold accent in `custom.css`
3. **@kaven-architect (Atlas):** Validate no breaking changes to Nextra structure
4. **User Research:** Run 5-second test with 10 developers
5. **Metrics:** Set up analytics to track time-to-find and bounce rate

---

## 📚 Evidence Bundle

- **Council Transcript:** This document
- **Action Items:** See section above
- **Dissenting Views:** None major; all minds aligned on incremental approach
- **Next Steps:** Prototype Tier 1, validate with users, iterate

---

**Design Council Session Complete**
**Recommendation Status:** APPROVED for Tier 1 implementation with user validation
**Architectural Feasibility:** APPROVED (CSS-only changes, no Nextra modifications)

---

---

# Conselho de Design: Adaptação Visual do Alan DS para AIOS Docs

**Sessão do Conselho:** Kaven Design Council v1.0
**Data:** 16/02/2026
**Agente Solicitante:** @ux-design-expert (Uma)
**Escopo:** Sistema de Design
**Framework:** Steel Man (2 rodadas)
**Urgência:** Completa (mesa redonda completa)
**Participantes:** Brad Frost, Don Norman, Julie Zhuo

---

## 🎯 Questão de Design (Português)

**Como podemos adaptar elementos visuais do Alan DS (Lendária Design System) para o aios-docs mantendo a usabilidade da documentação?**

### Contexto

**Alan DS (Origem):**
- SPA React com 60 componentes
- Tipografia: Inter (UI) + Source Serif 4 (leitura) + Rajdhani (display) + JetBrains Mono (código)
- Paleta gold (#C9B298 - `32 27% 69%`)
- Tokens de design: spacing (base 4px), shadows, border-radius, animações
- Filosofia: Luxury Minimalism (cor primária ≤8%, whitespace generoso, dark-first)

**aios-docs (Destino):**
- Nextra 4 SSG + Next.js 15
- Foco: Legibilidade de documentação técnica
- Mobile-first responsivo (375px-1920px)
- 3 idiomas (pt-BR, en, es)
- 87 páginas indexadas
- Atual: 49 linhas em `app/custom.css`

### Restrições Técnicas

1. **Limitações do Nextra 4:** Não é possível importar componentes React do Alan DS diretamente
2. **Build SSG:** Mudanças devem ser apenas CSS/tokens de design
3. **Mobile-first:** Já otimizado para navbar icon-only em <768px
4. **i18n:** Deve funcionar nos 3 locales
5. **Performance:** Não pode aumentar significativamente o bundle size

### Desafio

Trazer a identidade visual do Alan DS para os docs **sem:**
- Copiar 100% do design
- Perder a essência de "wiki de documentação técnica"
- Quebrar a estrutura do Nextra

---

## 🔍 Questão Enquadrada (Contexto Técnico)

**Refinamento do Arquiteto:**

"Como podemos incorporar a identidade visual do Alan DS no aios-docs sem comprometer a experiência de leitura da documentação técnica, considerando:
- **Alan DS:** SPA React, 60 componentes, dark-first, Luxury Minimalism (cor ≤8%)
- **aios-docs:** SSG Nextra 4, focado em legibilidade, mobile-first, 3 idiomas
- **Objetivo:** Polish visual mantendo essência de 'wiki técnica acessível'"

**Áreas Afetadas:**
- `app/custom.css` (atual: 49 linhas)
- Tipografia global (Nextra usa Inter por padrão)
- Paleta de cores semânticas
- Tokens de spacing/shadows/radius

---

## 🧠 Perspectivas Individuais

### 🎨 Brad Frost - Especialista em Design Systems

**Frameworks Aplicados:** Atomic Design, Interface Inventory, Scale Testing

#### Insight-Chave

> "Este é um problema de **EXTRAÇÃO DE TOKENS**, não de **PORT DE COMPONENTES**. Extraia 5-8 tokens de design do Alan DS. Aplique incrementalmente. Mostre progresso, não perfeição."

#### Verificação da Realidade

**A Verdade Brutal:** Alan DS é uma biblioteca de componentes para SPAs com 60 componentes interativos. Nextra é um SSG de documentação que precisa de legibilidade de 375px a 1920px com 87 páginas de conteúdo técnico em 3 idiomas. **Estes são problemas fundamentalmente diferentes.**

#### Decomposição Atômica

```
Componentes Alan DS:
  - 60 componentes React (Atoms/Molecules/Organisms)
  - Interativos: Buttons, Cards, Dialogs, Forms
  - UX Dark-first (240 5% 4%)
  - Accent gold (32 27% 69%)

"Componentes" aios-docs:
  - Conteúdo Markdown (parágrafos, títulos, blocos de código)
  - Navegação (sidebar, navbar, breadcrumbs)
  - Busca (Pagefind)
  - Não-interativo: principalmente consumo de texto
```

#### Abordagem Recomendada: "Tokenização Sutil"

**FASE 1: Migração de Tipografia (Risco Zero)**
```css
:root {
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-serif: 'Source Serif 4', serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-display: 'Rajdhani', sans-serif; /* usar com moderação */
}

body { font-family: var(--font-sans); }
code, pre { font-family: var(--font-mono); }
.prose { font-family: var(--font-serif); }
```

**Por quê:** Tipografia é o sinal visual mais rápido de "presença de design system" sem interromper o layout.

**FASE 2: Accent de Cor (Baixo Risco)**
```css
:root {
  --primary: 32 27% 69%; /* Gold do Alan DS */
  --primary-dark: 33 27% 50%;
}

a { color: hsl(var(--primary)); }
a:hover { color: hsl(var(--primary-dark)); }
```

**Por quê:** Luxury Minimalism = cor ≤8%. Links representam ~5-8% de um site de docs. Candidato perfeito.

**FASE 3: Spacing/Shadows (Risco Médio)**
```css
:root {
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}

.card, .nextra-sidebar { box-shadow: var(--shadow-sm); }
```

#### O Que NUNCA Fazer

❌ Tentar importar os 60 componentes do Alan DS (ferramenta errada para o trabalho)
❌ Forçar dark-first em um site de docs (leitores preferem backgrounds claros)
❌ Copiar todo o `tailwind.config.ts` (over-engineering)
❌ Tocar na lógica de layout do Nextra (quebra i18n e busca)

#### Teste de Escala

- **1 página:** A tipografia está mais clara? O accent gold guia o olhar?
- **10 páginas:** O spacing parece mais generoso? A sidebar parece elevada?
- **87 páginas:** Ainda builda? Todos os 3 idiomas funcionam? Mobile ainda rápido?

#### Cálculo de ROI

- **Investimento de tempo:** 2-4 horas (tipografia + tokens)
- **Carga de manutenção:** Quase zero (CSS variables, sem JS)
- **Impacto visual:** 7/10 (suficiente para sentir "elevado" sem quebrar UX de docs)
- **Risco:** 2/10 (isolado em `custom.css`, rollback em 5 minutos)

#### O Interface Inventory Que Eu Rodaria

Screenshot de 5 páginas atuais do aios-docs e 5 páginas de guia do Alan DS lado a lado. Perguntar: **"Estamos resolvendo um problema real, ou estamos apenas entediados com a aparência dos docs?"**

Se você não consegue articular o problema em uma frase, você não precisa dos tokens do Alan DS. Você precisa de feedback dos usuários.

---

### 🧭 Don Norman - Especialista em UX

**Frameworks Aplicados:** Seven Stages of Action, Three Levels of Emotional Design, Affordances & Signifiers

#### Questão Central

> "A questão não é 'como fazemos aios-docs parecer com Alan DS?' A questão é: **'Esta adaptação visual vai melhorar ou prejudicar a capacidade dos usuários de alcançar seus objetivos?'**"

#### Objetivos dos Usuários para Documentação Técnica

1. **Encontrar informação rapidamente** (busca, navegação)
2. **Entender conceitos complexos** (legibilidade, exemplos)
3. **Copiar/colar código confiavelmente** (blocos de código, syntax highlighting)
4. **Retornar ao material de referência** (breadcrumbs, bookmarks)

#### Avaliação dos Três Níveis

**NÍVEL 1: VISCERAL (Primeira Impressão)**

O Luxury Minimalism do Alan DS é bonito e cria resposta emocional imediata: "Isso é premium. Isso é artesanal."

**Veredito:** Neutro-a-positivo. Elevação visual não prejudica, mas não direciona valor primário para usuários orientados a tarefas.

**NÍVEL 2: BEHAVIORAL (Experiência Durante o Uso)**

**Diferenças Cognitivas-Chave:**

| Alan DS (SPA) | aios-docs (SSG) |
|---------------|----------------|
| Interações com muitos cliques | Leitura com muito scroll |
| Hierarquia visual via cor | Hierarquia visual via tipografia |
| Backgrounds escuros (reduzem cansaço ocular para UI) | Backgrounds claros (melhor para texto longo) |
| Whitespace generoso (guia ação) | Informação densa (utilidade de referência) |

**Preocupação:** Aplicar design dark-first cria um **Gulf of Execution**. Usuários esperam backgrounds claros para leitura. Dark mode força reajuste cognitivo.

**Veredito:** **Arriscado.** Tipografia e spacing = seguro. Inversão de cor = fricção cognitiva.

**NÍVEL 3: REFLECTIVE (Significado Pós-Uso)**

Documentação é uma **ferramenta utilitária**. Usuários julgam docs por **velocidade e precisão**, não por **estética**.

#### Checklist dos Sete Princípios

1. **Discoverability** — ✅ Gold para links = bom signifier | ❌ Gold para decoração = ruído
2. **Feedback** — ✅ Estados de hover do Alan DS se adaptam bem à nav do Nextra
3. **Conceptual Model** — ⚠️ Risco de incompatibilidade "App interativo" vs. "Wiki de referência"
4. **Affordances** — ⚠️ Riqueza visual sugere interatividade que não existe
5. **Signifiers** — ❌ Alan DS sinaliza "aplicação", não "documentação"
6. **Mappings** — ✅ Tipografia/spacing seguro | ❌ Styling de componentes cria affordances falsas
7. **Constraints** — ✅ Tokens de design adicionam constraints boas | ❌ Over-styling = complexidade desnecessária

#### Fechando as Lacunas (Bridging the Gulfs)

**Gulf of Execution (Usuários conseguem encontrar o que precisam?):**
- Upgrade de tipografia = ✅ (melhor legibilidade)
- Design dark-first = ❌ (não familiar para docs)
- Accents gold para links = ✅ (signifiers claros)

**Gulf of Evaluation (Usuários conseguem entender o que encontraram?):**
- Melhor spacing = ✅ (carga cognitiva reduzida)
- Estética luxury = ⚠️ (pode implicar interatividade que não existe)

#### Adoção Cirúrgica de Tokens

**ADOTAR (Seguro para UX de Documentação):**
1. Tokens de tipografia (Inter para UI, Source Serif para corpo)
2. Tokens de spacing (whitespace generoso melhora escaneabilidade)
3. Accent gold para links/CTAs (signifiers claros, uso ≤8%)
4. Tokens de shadow para nav/cards (profundidade ajuda hierarquia)

**ADAPTAR (Modificar para Contexto de Docs):**
5. Light-first, dark-opcional (não forçar dark mode)
6. Tokens de radius (arredondamento sutil, não agressivo)

**EVITAR (Fricção Cognitiva):**
7. ❌ 60 componentes do Alan DS (affordances erradas)
8. ❌ Dark-first como padrão (violação de convenção de leitura)
9. ❌ Animações pesadas (distraem do consumo de texto)

#### Consideração Centrada na Humanidade

> "Documentação serve desenvolvedores aprendendo novos sistemas, frequentemente sob pressão de tempo. **Respeite sua carga cognitiva.** Elegância visual é secundária a **findability, legibilidade e confiabilidade.**"

**Veredito Final:** Adotar seletivamente 5-6 tokens, manter princípios de UX docs-first. O objetivo é "documentação elevada", não "documentação disfarçada de app".

---

### 💎 Julie Zhuo - Liderança em Design

**Frameworks Aplicados:** Purpose-People-Process, Design as Problem-Solving, Controversial Principles Test

#### A História

> "Quando eu estava no Facebook, tínhamos essa tensão constante: **'Nosso design system interno deve combinar com a estética do produto voltado ao consumidor, ou deve ter sua própria identidade?'** A resposta era desconfortável mas correta: **'Depende de qual problema você está resolvendo.'**"

#### Framework Purpose-People-Process

**PURPOSE: Qual Problema Você Está Resolvendo?**

Responda honestamente: **Por que você quer adaptar a identidade visual do Alan DS para o aios-docs?**

É porque:
- **A) Usuários reclamam que aios-docs parece não-profissional?** (Problema do usuário)
- **B) Você pessoalmente acha visualmente chato?** (Problema seu)
- **C) Você quer consistência de marca entre projetos?** (Problema de marca)
- **D) Você admira Alan DS e quer aprender com ele?** (Problema de aprendizado)

**A resposta muda a estratégia.** Design thinking começa com definição do problema.

**PEOPLE: Quem São Seus Usuários e O Que Eles Valorizam?**

Seus usuários são **desenvolvedores, PMs e arquitetos lendo documentação técnica**. Baseado em 14 anos no Facebook trabalhando com engenheiros, eles valorizam:

1. **Velocidade** — Consigo encontrar a resposta em <30 segundos?
2. **Clareza** — A explicação é clara e baseada em exemplos?
3. **Confiabilidade** — Posso confiar que está atualizado?
4. **Código copiável** — Posso roubar isso e rodar?

Note o que NÃO está nesta lista? **"Tipografia visualmente deslumbrante."** Isso não significa que estética não importa — são **fatores de higiene, não fatores de deleite**.

#### O Teste de Princípios Controversos

- ❌ "Docs devem ser legíveis" — **Muito vago.** Todo mundo concorda. Inútil.
- ✅ "Docs devem priorizar findability sobre elegância visual" — **Controverso.** Alguns argumentariam que elegância visual É findability. Trade-off real.

**Questão real:** "A identidade visual do Alan DS vai melhorar findability, ou vai priorizar elegância às custas de findability?"

**PROCESS: Como Você Valida Esta Decisão?**

**PASSO 1: Prototipar 3 Níveis**

- **Nível 1: Tipografia + Links gold** (2 horas)
- **Nível 2: + Spacing/Shadows** (4 horas)
- **Nível 3: + Tentativa dark-first** (8 horas)

Enviar Nível 1 para 20% dos usuários. Medir: **Tempo para encontrar página de doc, bounce rate, feedback.**

**PASSO 2: Rodar o "Teste de 5 Segundos"**

Mostrar screenshot da versão atual vs. adaptada para 10 engenheiros. Perguntar: **"O que é isso?"**

- Se ambos dizem "documentação" → Adaptação segura
- Se adaptada diz "app" → Incompatibilidade cognitiva

**PASSO 3: Fazer a Pergunta Difícil**

**"Se gastarmos 10 horas em polish visual, que 10 horas de melhoria de conteúdo NÃO estamos fazendo?"**

**Priorize Até Doer.** Cada hora em tokens Alan DS é uma hora NÃO gasta em:
- Adicionar mais exemplos de código
- Melhorar indexação de busca
- Traduzir para um 4º idioma
- Corrigir links quebrados

**O upgrade visual é o trabalho de maior alavancagem agora?**

#### Recomendação: Incremental + Validado

**ADOTAR com validação de usuário:**
1. Tokens de tipografia (Inter + Source Serif)
2. Accent gold para links (uso ≤8%)
3. Tokens de spacing (whitespace generoso)

**TESTAR antes de rollout completo:**
4. Tokens de shadow para nav/cards
5. Dark mode como **opt-in** (não padrão)

**EVITAR sem sinal forte de usuário:**
6. Portar 60 componentes (problema errado)
7. Dark-first como padrão (quebra de convenção de leitura)
8. Fonte display Rajdhani em todo lugar (muito agressiva)

#### As Perguntas do Gerente

Se eu fosse seu gerente propondo isso:

1. **"Qual problema de usuário isso resolve?"** (Purpose)
2. **"Você validou isso com 5 usuários reais?"** (People)
3. **"Qual é o plano de rollback se prejudicar usabilidade?"** (Process)
4. **"O que NÃO estamos fazendo porque estamos fazendo isso?"** (Trade-offs)

#### Pensamento Final

> "O design mais bonito que não serve usuários é apenas… decoração cara. Seja ponderado. Seja incremental. Seja focado no usuário."

---

## 📊 Resumo Consolidado

### Pontos de Consenso

Todas as três minds concordam em:

1. ✅ **Tokens de tipografia são seguros e valiosos** (Inter, Source Serif, JetBrains Mono)
2. ✅ **Accent gold para links funciona** (uso ≤8% alinha com Luxury Minimalism)
3. ✅ **Tokens de spacing melhoram legibilidade** (whitespace generoso reduz carga cognitiva)
4. ✅ **Rollout incremental é crítico** (ship pequeno, valide, itere)
5. ✅ **Evitar portar 60 componentes** (ferramenta errada para o trabalho)

### Principais Discordâncias / Trade-offs

| Aspecto | Brad Frost | Don Norman | Julie Zhuo |
|--------|-----------|-----------|-----------|
| **Dark mode** | Não force em docs | Risco de fricção cognitiva | Teste com usuários primeiro |
| **Avaliação de risco** | 2/10 (baixo) se incremental | 5/10 (médio) se componentes | 3/10 com validação |
| **Preocupação primária** | Over-engineering | Incompatibilidade cognitiva | Definição do problema |
| **Framework central** | Interface Inventory | Seven Stages of Action | Purpose-People-Process |

### Recomendação em Três Níveis

#### ✅ NÍVEL 1: ADOTAR (Seguro, Alto Valor)

**Esforço estimado:** 2-4 horas
**Risco:** 2/10
**Impacto esperado:** 7/10

1. **Sistema de Tipografia**
   - Inter para elementos de UI
   - Source Serif 4 para texto do corpo (melhor leitura)
   - JetBrains Mono para blocos de código
   - Rajdhani com moderação para seções hero

2. **Accent Gold para Links**
   - `--primary: 32 27% 69%` (gold do Alan DS)
   - Aplicar em: links, CTAs, itens de nav ativos
   - Uso total: ≤8% (princípio Luxury Minimalism)

3. **Tokens de Spacing (unidade base 4px)**
   - `--space-4: 1rem`, `--space-6: 1.5rem`, `--space-8: 2rem`
   - Aplicar em: padding de conteúdo, margens de seção

#### ⚠️ NÍVEL 2: TESTAR ANTES DE ROLLOUT COMPLETO (Risco Moderado)

**Esforço estimado:** 4-6 horas
**Risco:** 4/10
**Impacto esperado:** 5/10

4. **Tokens de Shadow**
   - `--shadow-sm`, `--shadow-md` para nav/cards
   - Adiciona profundidade, melhora hierarquia visual
   - **Validação:** Teste de 5 segundos com 10 usuários

5. **Dark Mode (Opt-in)**
   - NÃO padrão (preserva convenções de leitura)
   - Toggle de usuário na navbar
   - **Validação:** Métricas de uso após 2 semanas

6. **Tokens de Border Radius**
   - Arredondamento sutil (não agressivo)
   - Aplicar em: cards, blocos de código, botões

#### ❌ NÍVEL 3: EVITAR (Alto Risco, Baixo Valor)

7. **Portar Componentes do Alan DS** — Problema errado
8. **Dark-first como Padrão** — Fricção cognitiva para leitura
9. **Animações Pesadas** — Distraem do consumo de texto
10. **Rajdhani Em Todo Lugar** — Muito agressivo para corpo de texto

### Estratégia de Implementação

**Semana 1: Nível 1 (Tipografia + Gold + Spacing)**
- Implementar em `app/custom.css`
- Enviar para 20% dos usuários
- Medir: bounce rate, time-to-find, feedback qualitativo

**Semana 2-3: Validação & Iteração**
- Se métricas Nível 1 positivas → Prosseguir para Nível 2
- Se neutras/negativas → Rollback, coletar feedback de usuário
- Rodar teste de 5 segundos com screenshots

**Semana 4: Nível 2 (Shadows + Dark Mode Opt-in)**
- Enviar para 50% dos usuários
- Teste A/B de uso de toggle dark mode
- Monitorar impacto de performance

### Métricas de Sucesso

- **Qualitativo:** Feedback "Docs parecem mais profissionais"
- **Comportamental:** Time-to-find inalterado ou melhorado
- **Performance:** Tempo de build inalterado, bundle size aumento <5%
- **Acessibilidade:** WCAG AA mantido em todos os 3 idiomas

---

## 🎯 Itens de Ação

1. **@ux-design-expert (Uma):** Criar protótipo CSS com tokens Nível 1
2. **@kaven-frontend-dev (Pixel):** Implementar tipografia + accent gold em `custom.css`
3. **@kaven-architect (Atlas):** Validar sem breaking changes na estrutura Nextra
4. **Pesquisa de Usuário:** Rodar teste de 5 segundos com 10 desenvolvedores
5. **Métricas:** Configurar analytics para rastrear time-to-find e bounce rate

---

## 📚 Bundle de Evidências

- **Transcrição do Conselho:** Este documento
- **Itens de Ação:** Ver seção acima
- **Visões Dissidentes:** Nenhuma importante; todas as minds alinhadas na abordagem incremental
- **Próximos Passos:** Prototipar Nível 1, validar com usuários, iterar

---

**Sessão do Conselho de Design Completa**
**Status da Recomendação:** APROVADO para implementação Nível 1 com validação de usuário
**Viabilidade Arquitetural:** APROVADO (mudanças apenas CSS, sem modificações Nextra)
