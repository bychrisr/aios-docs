# Contexto Atual do Projeto AIOS Docs (Gemini CLI)

Este documento resume o trabalho realizado e o estado atual do projeto `aios-docs` durante nossa sessão.

## 🎯 Objetivo Principal do Projeto
O `aios-docs` é um site de documentação multilíngue para o framework **Synkra AIOS**, construído com Next.js 15 (App Router) e Nextra 4. Ele é projetado para ser a fonte central de conhecimento para desenvolvedores e usuários do AIOS.

## 🛠️ Stack Tecnológico
- **Framework:** Next.js 15 (App Router)
- **Motor de Docs:** Nextra 4
- **Busca:** Pagefind
- **i18n:** Suporte a `pt-BR`, `en`, `es`
- **Deploy:** Vercel (com auto-deploy via GitHub)

## 🐛 Problemas Identificados e Corrigidos
1.  **Sincronização de Conteúdo Defeituosa:** O script `scripts/sync-content.sh` original estava falho, resultando em:
    *   Arquivos importantes do `aios-core` (como `roadmap.md`) estavam ausentes no `aios-docs`.
    *   Arquivos `.yaml`, `.zip` e outros eram copiados indevidamente, quebrando o build do Nextra.
    *   A estrutura de diretórios original não era respeitada.
    *   **Correção:** O script `sync-content.sh` foi reescrito (v3.1) para usar uma estratégia "opt-in" (copia apenas `.md`) e garantir que apenas conteúdo MD/MDX válido seja processado, resolvendo as falhas de build relacionadas a conteúdo inválido.
2.  **Home Page Desalinhada:** As páginas iniciais (`index.mdx`) não refletiam uma introdução adequada ao site de documentação.
    *   **Correção:** As home pages para `pt-BR`, `en`, `es` foram reescritas para serem concisas, informativas e incluir uma seção sobre os Playbooks e a auditoria por IA.
3.  **Falta de Página "Sobre o Site":** Não havia um local claro para informações sobre o próprio projeto `aios-docs`.
    *   **Correção:** Foi criada uma página `about/readme.mdx` para cada idioma, contendo o resumo do `README.md` principal do projeto. As entradas no `_meta.js` foram atualizadas.
4.  **Playbook de Comandos Desatualizado e Caótico:** A seção `playbook/commands` era uma lista extensa e desorganizada, desalinhada com a fonte da verdade (`aios-master.md`).
    *   **Correção:** A seção `playbook/commands` foi reestruturada para `index.mdx` (visão geral), `universal-commands.mdx`, `master-agent-commands.mdx` e `specialized-commands.mdx`, com `_meta.js` atualizados.
5.  **Aprimoramentos Visuais:** Adicionado um diagrama `Mermaid` à página `specialized-commands.mdx` em todos os idiomas para ilustrar o fluxo de delegação de comandos.

## 🚨 Problema Atual (Build Falhando)
Apesar das extensas correções na sincronização de conteúdo, o `npm run build` continua falhando com o erro:
`Error: <Html> should not be imported outside of pages/_document.`
Este erro ocorre ao tentar renderizar páginas (incluindo a `404` e possivelmente outras), indicando que o componente `<Html>` do Next.js está sendo importado em um local incorreto dentro do código do aplicativo, e não no conteúdo.

## ➡️ Próximo Passo Imediato
A solução mais direta para o erro de build atual é localizar e remover a importação (`import { Html } from 'next/document'`) que está causando o problema. Como não modificamos nenhum componente React central, o erro provavelmente reside em `app/[lang]/layout.tsx` ou em algum arquivo relacionado à forma como o Nextra lida com a renderização de documentos ou páginas de erro.

O build falhou na última tentativa de `npm run build` por conta deste erro.

## 📝 Próximos Passos (Planejados)
- Após a correção do build, será necessário re-integrar os conteúdos dos idiomas `en` e `es` (atualmente removidos para depuração) e então o conteúdo do `aios-core/docs` que foi totalmente limpo para resolver os problemas de sintaxe.
- O script `sync-content.sh` em sua versão `v3.1` (opt-in e com limpeza agressiva) está no estado mais promissor para re-sincronizar o conteúdo de forma estável.
- Auditoria de Playbooks: Revisar e atualizar os demais playbooks (além da seção de comandos) para garantir alinhamento com a lógica do AIOS e melhor UX.
- Implementar a "Auditoria de IA" para Playbooks, conforme discutido.
