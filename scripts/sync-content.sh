#!/usr/bin/env bash
# sync-content.sh — Espelha a documentação de SynkraAI/aios-core para aios-docs
#
# Estrutura do repositório fonte (SynkraAI/aios-core):
#   docs/          → INGLÊS ORIGINAL (raiz, excluindo subpastas de idioma e internas)
#   docs/en/       → Subcategorias EN específicas (merge com precedência)
#   docs/pt/       → Português Brasileiro
#   docs/es/       → Espanhol
#
# Pastas INTERNAS (excluídas do sync público):
#   stories/, research/, handoffs/, qa/, releases/, strategy/
#
# Uso:
#   bash scripts/sync-content.sh /path/to/aios-core-clone
#
# No Github Actions:
#   git clone https://github.com/SynkraAI/aios-core /tmp/aios-core
#   bash scripts/sync-content.sh /tmp/aios-core

set -euo pipefail

# --- Configuração ---
SOURCE_REPO_PATH="${1:-/tmp/aios-core}"
CONTENT_BASE_DIR="content"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Pastas internas que NÃO devem aparecer no site público
INTERNAL_DIRS="stories research handoffs qa releases strategy"

# Padrões de arquivos específicos a excluir (conteúdo técnico interno com mermaid complexo)
# São traces de execução de agentes e cross-reference analysis — não são docs públicas
EXCLUDE_PATTERNS=(
  "*/guides/agents/traces/*"
  "*/guides/agents/AIOS-MASTER-SYSTEM.md"
  "*/guides/agents/ANALYST-SYSTEM.md"
  "*/guides/agents/ARCHITECT-SYSTEM.md"
  "*/guides/agents/DATA-ENGINEER-SYSTEM.md"
  "*/guides/agents/DEVOPS-SYSTEM.md"
  "*/guides/agents/DEV-SYSTEM.md"
  "*/guides/agents/PM-SYSTEM.md"
  "*/guides/agents/QA-SYSTEM.md"
  "*/guides/agents/SM-SYSTEM.md"
  "*/guides/agents/SQUAD-CREATOR-SYSTEM.md"
  "*/guides/agents/UX-DESIGN-EXPERT-SYSTEM.md"
  "*/guides/workflows/xref-*"
  "*/guides/workflows/AIOS-COMPLETE-CROSS-REFERENCE-ANALYSIS.md"
  "*/guides/workflows/WORKFLOW-TASK-AGENT-ANALYSIS.md"
  "*/aios-agent-flows/README.md"
  "*/aios-workflows/README.md"
)

# --- Início ---
echo "=== AIOS Content Sync v4.1 (Mirror Mode) ==="
echo "Source Repository: $SOURCE_REPO_PATH"
echo "Target Base:       $CONTENT_BASE_DIR"
echo ""

# Validar que o repo fonte existe
if [ ! -d "$SOURCE_REPO_PATH" ] || [ ! -d "$SOURCE_REPO_PATH/docs" ]; then
  echo "❌ ERROR: Repositório fonte não encontrado em: '$SOURCE_REPO_PATH'"
  echo "Execute: git clone https://github.com/SynkraAI/aios-core $SOURCE_REPO_PATH"
  exit 1
fi

TOTAL_PROCESSED=0
TOTAL_ERRORS=0

# --- Função auxiliar para processar um arquivo .md -> .mdx ---
process_file() {
  local md_file="$1"
  local src_base="$2"
  local dest_base="$3"

  local relative_path="${md_file#$src_base/}"
  local dest_mdx="$dest_base/${relative_path%.md}.mdx"

  # Criar diretórios intermediários
  mkdir -p "$(dirname "$dest_mdx")"

  # Gerar título a partir do nome do arquivo
  local filename
  filename=$(basename "$md_file" .md)
  local title
  title=$(echo "$filename" | sed 's/[-_]/ /g' | awk '{for(i=1;i<=NF;i++){ $i=toupper(substr($i,1,1)) tolower(substr($i,2)) }}1')

  # Escrever .mdx com frontmatter + conteúdo sanitizado
  if {
    echo "---"
    echo "title: \"$title\""
    echo "---"
    echo ""
    node "$SCRIPT_DIR/mdx-sanitizer.js" < "$md_file"
  } > "$dest_mdx"; then
    TOTAL_PROCESSED=$((TOTAL_PROCESSED + 1))
    return 0
  else
    echo "  ❌ Erro ao processar: $relative_path"
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
    return 1
  fi
}

# --- Construir o padrão de exclusão para o find ---
build_exclude_args() {
  local src_base="$1"
  local args=""
  for dir in $INTERNAL_DIRS; do
    args="$args -not -path '$src_base/$dir/*'"
  done
  # Excluir também as subpastas de idioma (pt, en, es) da raiz
  args="$args -not -path '$src_base/pt/*' -not -path '$src_base/en/*' -not -path '$src_base/es/*'"
  echo "$args"
}

# ============================================================
# PASSO 1: EN = raiz docs/ (excluindo pastas internas e idiomas)
# ============================================================
echo "---"
echo "Sincronizando: EN (docs/ raiz) -> content/en/docs"

EN_SRC="$SOURCE_REPO_PATH/docs"
EN_DEST="$CONTENT_BASE_DIR/en/docs"

rm -rf "$EN_DEST"
mkdir -p "$EN_DEST"

# find com exclusão dinâmica das pastas internas e de idioma
EN_COUNT=0
while IFS= read -r md_file; do
  process_file "$md_file" "$EN_SRC" "$EN_DEST"
  EN_COUNT=$((EN_COUNT + 1))
done < <(find "$EN_SRC" -type f -name "*.md" \
  -not -path "*/pt/*" \
  -not -path "*/en/*" \
  -not -path "*/es/*" \
  -not -path "*/stories/*" \
  -not -path "*/research/*" \
  -not -path "*/handoffs/*" \
  -not -path "*/qa/*" \
  -not -path "*/releases/*" \
  -not -path "*/strategy/*" \
  -not -path "*/guides/agents/traces/*" \
  -not -path "*/guides/agents/AIOS-MASTER-SYSTEM.md" \
  -not -path "*/guides/agents/ANALYST-SYSTEM.md" \
  -not -path "*/guides/agents/ARCHITECT-SYSTEM.md" \
  -not -path "*/guides/agents/DATA-ENGINEER-SYSTEM.md" \
  -not -path "*/guides/agents/DEVOPS-SYSTEM.md" \
  -not -path "*/guides/agents/DEV-SYSTEM.md" \
  -not -path "*/guides/agents/PM-SYSTEM.md" \
  -not -path "*/guides/agents/QA-SYSTEM.md" \
  -not -path "*/guides/agents/SM-SYSTEM.md" \
  -not -path "*/guides/agents/SQUAD-CREATOR-SYSTEM.md" \
  -not -path "*/guides/agents/UX-DESIGN-EXPERT-SYSTEM.md" \
  -not -path "*/guides/workflows/xref-*" \
  -not -path "*/guides/workflows/AIOS-COMPLETE-CROSS-REFERENCE-ANALYSIS.md" \
  -not -path "*/guides/workflows/WORKFLOW-TASK-AGENT-ANALYSIS.md" \
  | sort)

echo "  Fonte: $EN_COUNT arquivos"

# PASSO 1b: Merge de docs/en/ (versões EN específicas, prevalecem sobre raiz)
if [ -d "$SOURCE_REPO_PATH/docs/en" ]; then
  EN_MERGE_COUNT=0
  while IFS= read -r md_file; do
    process_file "$md_file" "$SOURCE_REPO_PATH/docs/en" "$EN_DEST"
    EN_MERGE_COUNT=$((EN_MERGE_COUNT + 1))
  done < <(find "$SOURCE_REPO_PATH/docs/en" -type f -name "*.md" | sort)
  echo "  Merge docs/en/: $EN_MERGE_COUNT arquivos (sobrescreve)"
fi

EN_FINAL=$(find "$EN_DEST" -name "*.mdx" | wc -l)
echo "✅ EN completo: $EN_FINAL arquivos .mdx gerados"

# ============================================================
# PASSO 2: PT-BR = docs/pt/
# ============================================================
echo "---"
echo "Sincronizando: PT-BR (docs/pt/) -> content/pt-BR/docs"

PT_SRC="$SOURCE_REPO_PATH/docs/pt"
PT_DEST="$CONTENT_BASE_DIR/pt-BR/docs"

if [ ! -d "$PT_SRC" ]; then
  echo "⚠️  AVISO: docs/pt/ não encontrado — pulando PT-BR"
else
  rm -rf "$PT_DEST"
  mkdir -p "$PT_DEST"

  while IFS= read -r md_file; do
    process_file "$md_file" "$PT_SRC" "$PT_DEST"
  done < <(find "$PT_SRC" -type f -name "*.md" \
    -not -name "docs-agent-technical-specification.md" \
    | sort)

  PT_FINAL=$(find "$PT_DEST" -name "*.mdx" | wc -l)
  echo "✅ PT-BR completo: $PT_FINAL arquivos .mdx gerados"
fi

# ============================================================
# PASSO 3: ES = docs/es/
# ============================================================
echo "---"
echo "Sincronizando: ES (docs/es/) -> content/es/docs"

ES_SRC="$SOURCE_REPO_PATH/docs/es"
ES_DEST="$CONTENT_BASE_DIR/es/docs"

if [ ! -d "$ES_SRC" ]; then
  echo "⚠️  AVISO: docs/es/ não encontrado — pulando ES"
else
  rm -rf "$ES_DEST"
  mkdir -p "$ES_DEST"

  while IFS= read -r md_file; do
    process_file "$md_file" "$ES_SRC" "$ES_DEST"
  done < <(find "$ES_SRC" -type f -name "*.md" \
    -not -name "docs-agent-technical-specification.md" \
    | sort)

  ES_FINAL=$(find "$ES_DEST" -name "*.mdx" | wc -l)
  echo "✅ ES completo: $ES_FINAL arquivos .mdx gerados"
fi

# ============================================================
# Resumo final
# ============================================================
echo ""
echo "=== Resumo da Sincronização ==="
echo "Total processados: $TOTAL_PROCESSED"
echo "Erros:             $TOTAL_ERRORS"
echo ""
echo "Paridade por idioma:"
for lang_dir in en pt-BR es; do
  COUNT=$(find "$CONTENT_BASE_DIR/$lang_dir/docs" -name "*.mdx" 2>/dev/null | wc -l)
  echo "  $lang_dir/docs: $COUNT arquivos"
done

if [ "$TOTAL_ERRORS" -gt 0 ]; then
  echo ""
  echo "⚠️  Sync concluído com $TOTAL_ERRORS erros."
  exit 1
fi

echo ""
echo "=== Sync Finalizado com Sucesso ==="
