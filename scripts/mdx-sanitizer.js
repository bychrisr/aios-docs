#!/usr/bin/env node

/**
 * mdx-sanitizer.js
 * Converte Markdown do repositório SynkraAI/aios-core em MDX
 * compatível com Nextra 4 (parser MDX + Acorn).
 *
 * Estratégia:
 * 1. Pré-processamento global: remove comentários HTML <!-- -->
 * 2. Pré-processamento por blocos: sanitiza o CONTEÚDO de blocos Mermaid
 *    (substituindo tags HTML e chaves por entidades/alternativas seguras)
 * 3. Processamento linha a linha: sanitiza texto normal fora de código
 *
 * Lê via stdin, escreve via stdout.
 */

/**
 * Sanitiza o conteúdo interno de um bloco mermaid.
 * No Nextra 4, o parser MDX ainda analisa o interior de blocos mermaid,
 * então precisamos escapar tags HTML e outras sintaxes que conflitam com JSX.
 */
function sanitizeMermaidBlock(blockContent) {
  // Dentro de blocos mermaid, as chaves {} são sintaxe do diagrama (nós de decisão).
  // O MDX as interpreta como expressões JavaScript → precisamos escapar o < e { de forma segura.

  // 1. Escapar tags HTML dentro de labels de nós Mermaid
  //    ex: F{texto<br/>mais} → F{texto / mais}
  //    ex: <b>texto</b> → texto
  blockContent = blockContent
    // <br/> e variantes: substituir por barra simples (legível em diagramas)
    .replace(/<br\s*\/?>/gi, ' / ')
    // Tags HTML com conteúdo: remover as tags, manter o texto
    .replace(/<([a-zA-Z][a-zA-Z0-9]*)[^>]*>(.*?)<\/\1>/gi, '$2')
    // Tags HTML avulsas (sem fechamento correspondente)
    .replace(/<\/?[a-zA-Z][a-zA-Z0-9]*[^>]*\/?>/g, '');

  return blockContent;
}

/**
 * Sanitiza uma linha de texto normal (fora de qualquer bloco de código).
 */
function sanitizeLine(line) {
  // 1. Remover âncoras HTML de navegação interna
  line = line.replace(/<a\s+name="[^"]*"\s*><\/a>/gi, '');

  // 2. Converter URLs em angle brackets para links Markdown
  //    ex: <https://exemplo.com> → [https://exemplo.com]
  line = line.replace(/<(https?:\/\/[^>]+)>/g, '[$1]');

  // 3. Escapar <= (comparador "menor ou igual") que JSX lê como tag
  line = line.replace(/<=/g, '&lt;=');

  // 4. Escapar tags HTML que podem confundir o parser MDX
  //    Cobre: <br>, <br/>, <img>, <p>, <div>, <b>, <i>, etc.
  line = line.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?\/?>/g, (match) => {
    return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  });

  // 5. Escapar < seguido de número ou espaço (ex: <1ms, < 500)
  line = line.replace(/<(?=[0-9 ])/g, '&lt;');

  // 6. Escapar chaves { } que o Acorn tenta executar como JS
  line = line.replace(/\{([^}]+)\}/g, (_, inner) => `[${inner}]`);

  return line;
}

function processMdxContent(content) {
  // Passo 1: Remover comentários HTML multi-linha
  content = content.replace(/<!--[\s\S]*?-->/g, '');

  // Passo 2: Processar blocos mermaid inteiros com regex global
  content = content.replace(
    /(```\s*mermaid\s*\n)([\s\S]*?)(```)/gi,
    (_, open, body, close) => {
      return open + sanitizeMermaidBlock(body) + close;
    }
  );

  // Passo 3: Processar linha por linha para texto normal
  const lines = content.split('\n');
  let inCodeBlock = false;

  const processedLines = lines.map(line => {
    const trimmed = line.trim();

    // Detectar início/fim de bloco de código genérico
    if (/^\s*```/.test(trimmed)) {
      inCodeBlock = !inCodeBlock;
      return line;
    }

    // Dentro de bloco de código: não tocar
    if (inCodeBlock) return line;

    // Texto normal
    return sanitizeLine(line);
  });

  return processedLines.join('\n');
}

// Leitura do stdin
let inputContent = '';
process.stdin.setEncoding('utf-8');

process.stdin.on('data', chunk => {
  inputContent += chunk;
});

process.stdin.on('end', () => {
  const sanitizedContent = processMdxContent(inputContent);
  process.stdout.write(sanitizedContent);
});
