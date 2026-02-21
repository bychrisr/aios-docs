#!/usr/bin/env node

/**
 * mdx-sanitizer.js
 * Utilitário em Node.js para sanitizar conteúdo Markdown (MD)
 * proveniente do repositório fonte para que não quebre a build do Nextra (MDX).
 *
 * Ele resolve dois problemas principais:
 * 1. Uso de chaves `{...}` no corpo do texto (ex: `author: {name}`) que o Acorn
 *    tenta parsear como expressões JavaScript inválidas (erro: "Could not parse expression with acorn")
 * 2. Símbolos de "menor que" `<` que confundem o parser JSX achando ser uma tag HTML.
 *
 * O script lê no formato string (stdin) e imprime (stdout) sanitizado.
 */

const fs = require('fs');

function sanitizeLine(line, inCodeBlock) {
  if (inCodeBlock) return line;

  // 1. Remover âncoras antigas do HTML e links names que quebram o parsing MDX
  // ex: <a name="essay-1"></a>
  line = line.replace(/<a name="[^"]*"><\/a>/g, '');
  line = line.replace(/&lt;a name="[^"]*"&gt;<\/a>/g, '');

  // 2. Escapar chaves literais problemáticas (expressões JSX/Acorn espúrias fora de código)
  let sanitized = line.replace(/\{([^}]+)\}/g, (match, innerText) => {
    return `[${innerText}]`;
  });

  // 3. Escapar `<` perdidos (e.g. "<500ms" -> "&lt;500ms")
  // Protege `<` que são seguidos por qualquer dígito ou espaço (não match para letras maiusculas e minusculas
  // assumindo que <letra pode ser tag valida, a nao ser que seja algo como <1ms).
  // E remove qualquer tag </ fechadora solta q for match com </a> etc, deixamos assim:
  sanitized = sanitized.replace(/<(?=[0-9 ])/g, '&lt;');

  return sanitized;
}

function processMdxContent(content) {
  const lines = content.split('\n');
  let inCodeBlock = false;
  
  const processedLines = lines.map(line => {
    // Detecta início ou fim de blockquote/código Markdown
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return line;
    }

    return sanitizeLine(line, inCodeBlock);
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
