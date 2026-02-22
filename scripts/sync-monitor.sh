#!/usr/bin/env bash
# sync-monitor.sh — Compara aios-core com content/ e reporta paridade de sync
#
# Detecta arquivos no aios-core que NÃO foram sincronizados para content/.
# Útil para identificar novos arquivos adicionados ao aios-core entre syncs.
#
# Uso:
#   bash scripts/sync-monitor.sh /path/to/aios-core-clone
#
# Saída:
#   - Arquivos não sincronizados por idioma
#   - Resumo de cobertura (sincronizados / faltando / excluídos intencionalmente)
#   - Exit code 1 se houver arquivos não sincronizados

set -euo pipefail

SOURCE_REPO_PATH="${1:-/tmp/aios-core}"
CONTENT_BASE_DIR="content"

# Exclusões intencionais — devem espelhar exatamente o sync-content.sh
EXCLUDED_PATTERNS=(
  "guides/agents/traces/"
  "guides/agents/AIOS-MASTER-SYSTEM.md"
  "guides/agents/ANALYST-SYSTEM.md"
  "guides/agents/ARCHITECT-SYSTEM.md"
  "guides/agents/DATA-ENGINEER-SYSTEM.md"
  "guides/agents/DEVOPS-SYSTEM.md"
  "guides/agents/DEV-SYSTEM.md"
  "guides/agents/PM-SYSTEM.md"
  "guides/agents/QA-SYSTEM.md"
  "guides/agents/SM-SYSTEM.md"
  "guides/agents/SQUAD-CREATOR-SYSTEM.md"
  "guides/agents/UX-DESIGN-EXPERT-SYSTEM.md"
  "guides/workflows/xref-"
  "guides/workflows/AIOS-COMPLETE-CROSS-REFERENCE-ANALYSIS.md"
  "guides/workflows/WORKFLOW-TASK-AGENT-ANALYSIS.md"
  "aios-agent-flows/README.md"
  "aios-workflows/README.md"
  "docs-agent-technical-specification.md"
)

INTERNAL_DIRS="stories research handoffs qa releases strategy"

echo "=== AIOS Sync Monitor ==="
echo "Source: $SOURCE_REPO_PATH"
echo "Target: $CONTENT_BASE_DIR"
echo ""

if [ ! -d "$SOURCE_REPO_PATH" ] || [ ! -d "$SOURCE_REPO_PATH/docs" ]; then
  echo "❌ ERROR: Repositório fonte não encontrado em: '$SOURCE_REPO_PATH'"
  echo "Execute: git clone https://github.com/SynkraAI/aios-core $SOURCE_REPO_PATH"
  exit 1
fi

# Retorna 0 se o caminho relativo bate algum padrão de exclusão
is_excluded() {
  local rel_path="$1"
  for pattern in "${EXCLUDED_PATTERNS[@]}"; do
    if [[ "$rel_path" == *"$pattern"* ]]; then
      return 0
    fi
  done
  return 1
}

# Verifica um diretório fonte contra um diretório destino
# Argumentos: <src_dir> <dest_dir> <idioma_label> [strip_prefix]
check_parity() {
  local src_dir="$1"
  local dest_dir="$2"
  local label="$3"
  local strip_prefix="${4:-}"

  local missing=0
  local excluded=0
  local synced=0

  echo "--- $label ---"

  if [ ! -d "$src_dir" ]; then
    echo "  ⚠️  Diretório fonte não encontrado: $src_dir"
    return
  fi

  while IFS= read -r md_file; do
    local relative="${md_file#$src_dir/}"

    # Pular subpastas de idioma e internas (apenas relevante para EN raiz)
    if [ -n "$strip_prefix" ]; then
      local skip=false
      for dir in $INTERNAL_DIRS; do
        if [[ "$relative" == "$dir/"* ]]; then skip=true; break; fi
      done
      $skip && continue
      [[ "$relative" == pt/* || "$relative" == en/* || "$relative" == es/* ]] && continue
    fi

    if is_excluded "$relative"; then
      excluded=$((excluded + 1))
      continue
    fi

    local expected_mdx="$dest_dir/${relative%.md}.mdx"
    if [ -f "$expected_mdx" ]; then
      synced=$((synced + 1))
    else
      echo "  ⚠️  NÃO SINCRONIZADO: $relative"
      missing=$((missing + 1))
    fi
  done < <(find "$src_dir" -type f -name "*.md" | sort)

  echo "  ✅ Sincronizados: $synced  |  ⚠️  Faltando: $missing  |  🚫 Excluídos: $excluded"
  echo "$missing"
}

# EN — docs/ raiz (com strip de subpastas de idioma e internas)
EN_MISSING=$(check_parity \
  "$SOURCE_REPO_PATH/docs" \
  "$CONTENT_BASE_DIR/en/docs" \
  "EN (docs/ raiz)" \
  "strip")
echo ""

# PT-BR — docs/pt/
PT_MISSING=$(check_parity \
  "$SOURCE_REPO_PATH/docs/pt" \
  "$CONTENT_BASE_DIR/pt-BR/docs" \
  "PT-BR (docs/pt/)")
echo ""

# ES — docs/es/
ES_MISSING=$(check_parity \
  "$SOURCE_REPO_PATH/docs/es" \
  "$CONTENT_BASE_DIR/es/docs" \
  "ES (docs/es/)")
echo ""

TOTAL_MISSING=$((EN_MISSING + PT_MISSING + ES_MISSING))

echo "=== Resumo ==="
if [ "$TOTAL_MISSING" -eq 0 ]; then
  echo "✅ Paridade completa — nenhum arquivo novo detectado no aios-core."
else
  echo "⚠️  $TOTAL_MISSING arquivo(s) no aios-core não estão sincronizados."
  echo "   Execute: bash scripts/sync-content.sh $SOURCE_REPO_PATH"
  exit 1
fi
