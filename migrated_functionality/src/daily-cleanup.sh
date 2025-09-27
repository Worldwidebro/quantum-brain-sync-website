#!/bin/bash
# Daily cleanup script for IZA OS ecosystem
# Applies billionaire consciousness empire cleanup rules

echo "🧹 Starting daily cleanup for IZA OS ecosystem..."

# Clean temporary files (older than 1 day)
echo "🗑️ Cleaning temporary files..."
find /tmp -name "*memU*" -type d -mtime +1 -exec rm -rf {} \; 2>/dev/null
find /tmp -name "*iza-os*" -type d -mtime +1 -exec rm -rf {} \; 2>/dev/null
find /tmp -name "*worldwidebro*" -type d -mtime +1 -exec rm -rf {} \; 2>/dev/null

# Clean git working directories
echo "🔧 Optimizing git repositories..."
find . -name ".git" -type d -exec git -C {} gc --prune=now \; 2>/dev/null

# Clean log files (older than 7 days)
echo "📝 Cleaning old log files..."
find . -name "*.log" -mtime +7 -delete 2>/dev/null
find . -name "logs" -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null

# Clean backup files (older than 30 days)
echo "💾 Cleaning old backup files..."
find . -name "*.bak" -mtime +30 -delete 2>/dev/null
find . -name "*.backup" -mtime +30 -delete 2>/dev/null

# Clean Python cache files
echo "🐍 Cleaning Python cache files..."
find . -name "__pycache__" -type d -mtime +1 -exec rm -rf {} \; 2>/dev/null
find . -name "*.pyc" -mtime +1 -delete 2>/dev/null
find . -name "*.pyo" -mtime +1 -delete 2>/dev/null

# Clean Node.js cache files
echo "📦 Cleaning Node.js cache files..."
find . -name "node_modules/.cache" -type d -mtime +1 -exec rm -rf {} \; 2>/dev/null
find . -name ".npm" -type d -mtime +1 -exec rm -rf {} \; 2>/dev/null

# Clean build artifacts
echo "🏗️ Cleaning build artifacts..."
find . -name "dist" -type d -mtime +1 -exec rm -rf {} \; 2>/dev/null
find . -name "build" -type d -mtime +1 -exec rm -rf {} \; 2>/dev/null
find . -name "_build" -type d -mtime +1 -exec rm -rf {} \; 2>/dev/null

# Clean temporary working files
echo "📄 Cleaning temporary working files..."
find . -name "*.tmp" -mtime +1 -delete 2>/dev/null
find . -name "*.temp" -mtime +1 -delete 2>/dev/null
find . -name ".DS_Store" -delete 2>/dev/null

# Report cleanup results
echo "📊 Cleanup Summary:"
echo "  - Temporary directories cleaned"
echo "  - Git repositories optimized"
echo "  - Old log files removed"
echo "  - Backup files cleaned"
echo "  - Cache files cleared"
echo "  - Build artifacts removed"

echo "✅ Daily cleanup completed successfully"

# Log cleanup completion
echo "$(date): Daily cleanup completed" >> /tmp/iza-os-cleanup.log
