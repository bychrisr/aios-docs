#!/usr/bin/env bash
# sync-content.sh — Sync documentation from aios-core to aios-docs
# Usage: bash scripts/sync-content.sh [path-to-aios-core-clone]

set -euo pipefail

# --- Configuration ---
SOURCE_REPO_PATH="${1:-/tmp/aios-core-clone}"
declare -A LANG_MAP
LANG_MAP=(
  ["pt"]="pt-BR"
  ["en"]="en"
  ["es"]="es"
)
CONTENT_BASE_DIR="content"

# --- Main Logic ---

echo "=== AIOS Content Sync v3.1 (Opt-in + Cleanup) ==="
echo "Source Repository: $SOURCE_REPO_PATH"
echo "Target Base: $CONTENT_BASE_DIR"
echo ""

if [ ! -d "$SOURCE_REPO_PATH" ] || [ ! -d "$SOURCE_REPO_PATH/docs" ]; then
  echo "❌ ERROR: Source directory not found or is invalid: '$SOURCE_REPO_PATH'"
  echo "Please clone 'SynkraAI/aios-core' first or provide the correct path."
  exit 1
fi

echo "Cleaning all target docs directories..."
for lang_dest in "${LANG_MAP[@]}"; do
    rm -rf "$CONTENT_BASE_DIR/$lang_dest/docs"
done

# Sincronizar conteúdo para cada idioma
for lang_src in "${!LANG_MAP[@]}"; do
  lang_dest="${LANG_MAP[$lang_src]}"
  
  # A documentação principal está na raiz, o resto em subpastas
  SRC_DOCS_PATH="$SOURCE_REPO_PATH/docs"
  if [ "$lang_src" != "pt" ]; then
      SRC_DOCS_PATH="$SOURCE_REPO_PATH/docs/$lang_src"
  fi

  DEST_PATH_BASE="$CONTENT_BASE_DIR/$lang_dest/docs"

  echo "---"
  echo "Syncing language: '$lang_src' -> '$lang_dest'"
  echo "From: $SRC_DOCS_PATH"
  echo "To:   $DEST_PATH_BASE"

  if [ ! -d "$SRC_DOCS_PATH" ]; then
    echo "⚠️ WARNING: Source language directory not found, skipping: $SRC_DOCS_PATH"
    continue
  fi

  # Usar find para localizar apenas arquivos .md e processá-los um a um
  find "$SRC_DOCS_PATH" -type f -name "*.md" | while read -r md_file; do
    relative_path="${md_file#$SRC_DOCS_PATH/}"
    dest_file_mdx="$DEST_PATH_BASE/$relative_path"
    dest_file_mdx="${dest_file_mdx%.md}.mdx"
    
    mkdir -p "$(dirname "$dest_file_mdx")"

    filename=$(basename "$md_file" .md)
    title=$(echo "$filename" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++){ $i=toupper(substr($i,1,1)) tolower(substr($i,2)) }}1')

    # Criar o arquivo .mdx com frontmatter e limpeza agressiva de HTML
    {
      echo "---"
      echo "title: \"$title\""
      echo "---"
      echo ""
      # Remove todas as tags HTML que podem quebrar o parser MDX
      # Transforma `<` seguido de numero em `&lt;numero`
      sed -e 's/<[^>]*>//g' -e 's/<\([0-9]\)/\&lt;\1/g' "$md_file"
    } > "$dest_file_mdx"
    
    echo "Processed: $relative_path"
  done
  
  echo "✅ Sync for '$lang_dest' complete."
done

# Restaurar os diretórios de docs para 'en' e 'es' que foram removidos
echo "---"
echo "Restoring 'en' and 'es' docs directories before sync..."
mkdir -p "content/en/docs"
mkdir -p "content/es/docs"

# Sincronizar novamente para garantir que tudo está no lugar
# (Esta execução será mais rápida pois a maioria dos arquivos já existe)
echo "---"
# Re-running sync logic was removed to prevent infinite loop.
echo "---"

echo ""
echo "=== Sync Finished Successfully ==="
