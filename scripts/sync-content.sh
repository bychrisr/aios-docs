#!/usr/bin/env bash
# sync-content.sh — Sync documentation from aios-core to aios-docs
# Usage: bash scripts/sync-content.sh [path-to-aios-core-clone]

set -euo pipefail

SOURCE="${1:?Usage: sync-content.sh <path-to-aios-core>}"
TARGET="content/docs"

echo "=== AIOS Content Sync ==="
echo "Source: $SOURCE"
echo "Target: $TARGET"

# Validate source
if [ ! -d "$SOURCE" ]; then
  echo "ERROR: Source directory not found: $SOURCE"
  exit 1
fi

# Create target directories
mkdir -p "$TARGET/guides"
mkdir -p "$TARGET/agents"
mkdir -p "$TARGET/workflows"
mkdir -p "$TARGET/architecture"
mkdir -p "$TARGET/reference"

# Sync documentation directories
# Guides
if [ -d "$SOURCE/docs" ]; then
  echo "Syncing docs/ → guides/"
  find "$SOURCE/docs" -name "*.md" -exec cp {} "$TARGET/guides/" \; 2>/dev/null || true
fi

# Agent definitions
if [ -d "$SOURCE/agents" ]; then
  echo "Syncing agents/"
  find "$SOURCE/agents" -name "*.md" -o -name "*.yaml" | while read -r file; do
    basename=$(basename "$file")
    name="${basename%.*}"
    # Convert YAML agent files to MDX stubs
    if [[ "$file" == *.yaml ]]; then
      echo "---" > "$TARGET/agents/${name}.mdx"
      echo "title: ${name}" >> "$TARGET/agents/${name}.mdx"
      echo "---" >> "$TARGET/agents/${name}.mdx"
      echo "" >> "$TARGET/agents/${name}.mdx"
      echo "# ${name}" >> "$TARGET/agents/${name}.mdx"
      echo "" >> "$TARGET/agents/${name}.mdx"
      echo "> Agent definition synced from aios-core." >> "$TARGET/agents/${name}.mdx"
    else
      cp "$file" "$TARGET/agents/" 2>/dev/null || true
    fi
  done
fi

# Workflows and tasks
if [ -d "$SOURCE/workflows" ]; then
  echo "Syncing workflows/"
  find "$SOURCE/workflows" -name "*.md" -exec cp {} "$TARGET/workflows/" \; 2>/dev/null || true
fi

# Architecture docs
if [ -d "$SOURCE/architecture" ] || [ -d "$SOURCE/docs/architecture" ]; then
  echo "Syncing architecture/"
  find "$SOURCE" -path "*/architecture/*.md" -exec cp {} "$TARGET/architecture/" \; 2>/dev/null || true
fi

# Reference (schemas, configs)
if [ -d "$SOURCE/schemas" ]; then
  echo "Syncing schemas → reference/"
  find "$SOURCE/schemas" -name "*.md" -o -name "*.yaml" | while read -r file; do
    basename=$(basename "$file")
    cp "$file" "$TARGET/reference/" 2>/dev/null || true
  done
fi

# Rename .md files to .mdx for Nextra compatibility
find "$TARGET" -name "*.md" -not -name "_meta.js" | while read -r file; do
  mv "$file" "${file%.md}.mdx" 2>/dev/null || true
done

# Count synced files
TOTAL=$(find "$TARGET" -name "*.mdx" | wc -l)
echo ""
echo "=== Sync Complete ==="
echo "Total MDX files: $TOTAL"
echo "Target: $TARGET"
