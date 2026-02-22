#!/usr/bin/env node
// @ts-check
/**
 * Verifica (e opcionalmente corrige) links internos quebrados em content/.
 *
 * Uso:
 *   node scripts/check-links.mjs                        # verifica tudo
 *   node scripts/check-links.mjs --section playbook     # só o playbook
 *   node scripts/check-links.mjs --locale en            # só um locale
 *   node scripts/check-links.mjs --fix                  # remove links quebrados (mantém texto)
 *
 * Exit code 0 = sem links quebrados (ou todos corrigidos com --fix)
 * Exit code 1 = links quebrados encontrados
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = resolve(__dirname, '..', 'content')

// Locales suportados
const ALL_LOCALES = ['pt-BR', 'en', 'es']

// Regex para links Markdown: [text](target) — captura o target
const INLINE_LINK_RE = /\[(?:[^\]]*)\]\(([^)]+)\)/g

// Regex para definições de referência: [ref]: target
const REF_DEF_RE = /^\[(?:[^\]]+)\]:\s*(\S+)/gm

// Regex para links de referência: [text][ref]
const REF_LINK_RE = /\[(?:[^\]]*)\]\[([^\]]+)\]/g

/**
 * Coleta todos os arquivos .mdx recursivamente a partir de um diretório.
 * @param {string} dir
 * @returns {string[]}
 */
function collectMdxFiles(dir) {
  /** @type {string[]} */
  const files = []
  if (!existsSync(dir)) return files

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      files.push(...collectMdxFiles(fullPath))
    } else if (extname(entry) === '.mdx' || extname(entry) === '.md') {
      files.push(fullPath)
    }
  }
  return files
}

/**
 * Testa se um caminho resolve para um arquivo existente em content/.
 * Se o caminho já tem extensão .md, tenta também trocar por .mdx.
 *
 * @param {string} absPath - caminho absoluto (com ou sem extensão)
 * @returns {boolean}
 */
function fileExists(absPath) {
  // Caminho exato
  if (existsSync(absPath)) return true

  // Se termina em .md, tenta .mdx (sync converte .md → .mdx)
  if (absPath.endsWith('.md')) {
    const asMdx = absPath.slice(0, -3) + '.mdx'
    if (existsSync(asMdx)) return true
  }

  // Sem extensão: tenta .mdx, .md, ou como diretório com index
  const base = absPath.endsWith('.md') ? absPath.slice(0, -3) :
               absPath.endsWith('.mdx') ? absPath.slice(0, -4) : absPath
  return (
    existsSync(base + '.mdx') ||
    existsSync(base + '.md') ||
    existsSync(join(base, 'index.mdx')) ||
    existsSync(join(base, 'index.md'))
  )
}

/**
 * Verifica se um link interno aponta para um arquivo existente em content/.
 *
 * Links absolutos sem locale (ex: /docs/guides/foo) são validados tentando
 * cada locale suportado, pois o middleware Nextra resolve o locale automaticamente.
 *
 * @param {string} linkTarget  - o valor bruto do link (ex: "ROADMAP.md", "/en/docs/foo")
 * @param {string} sourceFile  - caminho absoluto do arquivo que contém o link
 * @returns {boolean} true se o link resolve para um arquivo existente
 */
function isLinkValid(linkTarget, sourceFile) {
  // Remove fragmento de âncora: foo.md#section → foo.md
  const withoutAnchor = linkTarget.split('#')[0]

  // Ignora âncoras puras, links externos e mailto
  if (
    !withoutAnchor ||
    withoutAnchor.startsWith('http://') ||
    withoutAnchor.startsWith('https://') ||
    withoutAnchor.startsWith('mailto:') ||
    withoutAnchor.startsWith('//')
  ) {
    return true
  }

  if (withoutAnchor.startsWith('/')) {
    // Link absoluto com locale: /en/docs/guides/foo → content/en/docs/guides/foo.mdx
    const firstSegment = withoutAnchor.split('/')[1]
    if (ALL_LOCALES.includes(firstSegment)) {
      return fileExists(join(CONTENT_DIR, withoutAnchor))
    }

    // Link absoluto sem locale: /docs/guides/foo
    // O middleware resolve o locale — válido se existir em qualquer locale
    for (const locale of ALL_LOCALES) {
      if (fileExists(join(CONTENT_DIR, locale, withoutAnchor))) {
        return true
      }
    }
    return false
  }

  // Link relativo: resolve a partir do diretório do arquivo fonte.
  // Apenas links relativos são verificados — eles apontam diretamente para
  // arquivos e não passam pelo middleware de locale.
  const sourceDir = dirname(sourceFile)
  const resolvedPath = resolve(sourceDir, withoutAnchor)

  return fileExists(resolvedPath)
}

/**
 * Extrai todos os links internos de um arquivo MDX.
 * Retorna array de { target, line }.
 *
 * @param {string} filePath
 * @returns {{ target: string, line: number }[]}
 */
function extractLinks(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  /** @type {{ target: string, line: number }[]} */
  const links = []

  // Coleta definições de referência: [ref]: target
  /** @type {Map<string, string>} */
  const refDefs = new Map()
  let refMatch
  REF_DEF_RE.lastIndex = 0
  while ((refMatch = REF_DEF_RE.exec(content)) !== null) {
    // A chave da regex é o texto entre colchetes antes dos dois-pontos
    const fullMatch = refMatch[0]
    const keyMatch = fullMatch.match(/^\[([^\]]+)\]:/)
    if (keyMatch) {
      refDefs.set(keyMatch[1].toLowerCase(), refMatch[1])
    }
  }

  // Processa linha a linha para ter número de linha correto
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx]
    const lineNum = lineIdx + 1

    // Pula blocos de código (linhas dentro de ``` ou ~~~)
    if (line.trimStart().startsWith('```') || line.trimStart().startsWith('~~~')) {
      continue
    }

    // Links inline: [text](target)
    let inlineMatch
    INLINE_LINK_RE.lastIndex = 0
    while ((inlineMatch = INLINE_LINK_RE.exec(line)) !== null) {
      const target = inlineMatch[1].trim()
      // Ignora imagens (o regex pega ambos, mas imagens têm ! antes — excluímos)
      const before = line.slice(0, inlineMatch.index)
      if (before.endsWith('!')) continue
      links.push({ target, line: lineNum })
    }

    // Links de referência: [text][ref]
    let refLinkMatch
    REF_LINK_RE.lastIndex = 0
    while ((refLinkMatch = REF_LINK_RE.exec(line)) !== null) {
      const refKey = refLinkMatch[1].toLowerCase()
      const target = refDefs.get(refKey)
      if (target) {
        links.push({ target, line: lineNum })
      }
    }
  }

  return links
}

/**
 * Remove links quebrados de um arquivo, mantendo o texto do link.
 * [texto](url-quebrada) → texto
 * Também remove definições de referência quebradas: [ref]: url-quebrada
 *
 * @param {string} filePath
 * @param {Set<string>} brokenTargets - conjunto de targets a remover
 */
function fixBrokenLinks(filePath, brokenTargets) {
  let content = readFileSync(filePath, 'utf-8')
  let changed = false

  for (const target of brokenTargets) {
    // Escapa chars especiais de regex no target
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // Remove link inline: [texto](target) → texto  (ignora imagens ![ )
    const inlineRe = new RegExp(`(?<!!)\\[([^\\]]+)\\]\\(${escaped}(?:\\s+"[^"]*")?\\)`, 'g')
    const before = content
    content = content.replace(inlineRe, '$1')
    if (content !== before) changed = true

    // Remove definição de referência: [ref]: target
    const refDefRe = new RegExp(`^\\[[^\\]]+\\]:\\s*${escaped}[^\\n]*\\n?`, 'gm')
    content = content.replace(refDefRe, '')
  }

  if (changed) {
    writeFileSync(filePath, content, 'utf-8')
  }
  return changed
}

function main() {
  const args = process.argv.slice(2)

  // --locale <locale>: restringe a um único locale
  const localeIdx = args.indexOf('--locale')
  const locales =
    localeIdx !== -1 && args[localeIdx + 1]
      ? [args[localeIdx + 1]]
      : ALL_LOCALES

  // --section <docs|playbook|all>: restringe a uma seção de conteúdo (padrão: all)
  const sectionIdx = args.indexOf('--section')
  const section = sectionIdx !== -1 && args[sectionIdx + 1] ? args[sectionIdx + 1] : 'all'

  // --fix: remove automaticamente links quebrados (mantém texto)
  const fixMode = args.includes('--fix')

  /** @type {{ file: string, line: number, link: string, resolved: string }[]} */
  const brokenLinks = []

  for (const locale of locales) {
    /** @type {string[]} */
    let scanDirs
    if (section === 'playbook') {
      scanDirs = [join(CONTENT_DIR, locale, 'playbook')]
    } else if (section === 'docs') {
      scanDirs = [join(CONTENT_DIR, locale, 'docs')]
    } else {
      scanDirs = [join(CONTENT_DIR, locale)]
    }

    for (const dir of scanDirs) {
      const files = collectMdxFiles(dir)

      for (const file of files) {
        const links = extractLinks(file)
        for (const { target, line } of links) {
          if (!isLinkValid(target, file)) {
            const withoutAnchor = target.split('#')[0]
            let resolved = withoutAnchor
            if (!withoutAnchor.startsWith('/') && !withoutAnchor.startsWith('http')) {
              resolved = resolve(dirname(file), withoutAnchor)
            }
            brokenLinks.push({ file, line, link: target, resolved })
          }
        }
      }
    }
  }

  if (brokenLinks.length === 0) {
    console.log('✓ No broken internal links found.')
    process.exit(0)
  }

  if (fixMode) {
    // Agrupa targets quebrados por arquivo
    /** @type {Map<string, Set<string>>} */
    const byFile = new Map()
    for (const { file, link } of brokenLinks) {
      if (!byFile.has(file)) byFile.set(file, new Set())
      byFile.get(file)?.add(link)
    }

    let fixedFiles = 0
    for (const [file, targets] of byFile) {
      const relFile = file.replace(resolve(__dirname, '..') + '/', '')
      if (fixBrokenLinks(file, targets)) {
        console.log(`  fixed: ${relFile} (${targets.size} link(s) removed)`)
        fixedFiles++
      }
    }
    console.log(`✓ Fixed ${fixedFiles} file(s) — removed ${brokenLinks.length} broken link(s).`)
    process.exit(0)
  }

  console.error(`✗ Found ${brokenLinks.length} broken internal link(s):\n`)
  for (const { file, line, link, resolved } of brokenLinks) {
    const relFile = file.replace(resolve(__dirname, '..') + '/', '')
    console.error(`  ${relFile}:${line}`)
    console.error(`    link:     ${link}`)
    console.error(`    resolved: ${resolved}`)
    console.error()
  }

  process.exit(1)
}

main()
