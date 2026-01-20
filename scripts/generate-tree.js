#!/usr/bin/env node

/**
 * Directory Tree Generator for Cursor
 * Generates a tree structure of the project for AI context
 * 
 * Usage: node scripts/generate-tree.js
 * Or:    npm run tree
 */

const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION - Customize for your project
// ============================================

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, '.cursor', 'project-tree.md');

// Get project name from package.json or folder name
const getProjectName = () => {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'));
    return pkg.name || path.basename(ROOT_DIR);
  } catch {
    return path.basename(ROOT_DIR);
  }
};

// Directories to ignore (add your own)
const IGNORE_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  '.turbo',
  '.vercel',
  'dist',
  'build',
  'out',
  'coverage',
  '.cache',
  '.husky',
  '.vscode',
  'terminals',
]);

// Files to ignore
const IGNORE_FILES = new Set([
  '.DS_Store',
  'Thumbs.db',
  '.env.local',
  '.env',
  '.env.development',
  '.env.production',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'tsconfig.tsbuildinfo',
]);

// File extensions to ignore
const IGNORE_EXTENSIONS = new Set([
  '.log',
  '.tmp',
  '.bak',
]);

// Directories to summarize (show file count instead of listing)
const SUMMARIZE_DIRS = new Set([
  'icons',
  '__tests__',
  'stories',
  'fixtures',
  'mocks',
  '__mocks__',
  '__snapshots__',
]);

// Max depth for tree generation
const MAX_DEPTH = 6;

// ============================================
// TREE GENERATION LOGIC
// ============================================

function shouldIgnore(name, isDir) {
  if (name.startsWith('.') && isDir && name !== '.cursor') return true;
  if (isDir && IGNORE_DIRS.has(name)) return true;
  if (!isDir && IGNORE_FILES.has(name)) return true;
  if (!isDir && IGNORE_EXTENSIONS.has(path.extname(name))) return true;
  return false;
}

function getFileCount(dirPath) {
  let count = 0;
  try {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        count += getFileCount(fullPath);
      } else {
        count++;
      }
    }
  } catch {
    // Ignore permission errors
  }
  return count;
}

function generateTree(dirPath, prefix = '', depth = 0) {
  if (depth > MAX_DEPTH) return '';
  
  let output = '';
  
  let items;
  try {
    items = fs.readdirSync(dirPath).sort((a, b) => {
      const aPath = path.join(dirPath, a);
      const bPath = path.join(dirPath, b);
      const aIsDir = fs.statSync(aPath).isDirectory();
      const bIsDir = fs.statSync(bPath).isDirectory();
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });
  } catch {
    return '';
  }

  const filteredItems = items.filter(item => {
    const fullPath = path.join(dirPath, item);
    try {
      const isDir = fs.statSync(fullPath).isDirectory();
      return !shouldIgnore(item, isDir);
    } catch {
      return false;
    }
  });

  filteredItems.forEach((item, index) => {
    const isLast = index === filteredItems.length - 1;
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    const connector = isLast ? '└── ' : '├── ';
    const newPrefix = prefix + (isLast ? '    ' : '│   ');

    if (stat.isDirectory()) {
      const dirName = path.basename(fullPath);
      
      if (SUMMARIZE_DIRS.has(dirName)) {
        const fileCount = getFileCount(fullPath);
        output += `${prefix}${connector}${item}/ (${fileCount} files)\n`;
      } else {
        output += `${prefix}${connector}${item}/\n`;
        output += generateTree(fullPath, newPrefix, depth + 1);
      }
    } else {
      output += `${prefix}${connector}${item}\n`;
    }
  });

  return output;
}

function generateMarkdown() {
  const timestamp = new Date().toISOString().split('T')[0];
  const projectName = getProjectName();
  
  let content = `# Project Directory Tree

> Auto-generated on ${timestamp}
> Run \`npm run tree\` to update

\`\`\`
${projectName}/
${generateTree(ROOT_DIR)}\`\`\`

## Key Directories

| Directory | Purpose |
|-----------|---------|
`;

  // Auto-detect common directories and add them
  const commonDirs = [
    { path: 'src/app', desc: 'Next.js App Router - Pages & Routes' },
    { path: 'src/pages', desc: 'Next.js Pages Router' },
    { path: 'app', desc: 'Next.js App Router (root)' },
    { path: 'pages', desc: 'Next.js Pages Router (root)' },
    { path: 'src/components', desc: 'React components' },
    { path: 'components', desc: 'React components' },
    { path: 'src/components/ui', desc: 'Reusable UI components' },
    { path: 'src/hooks', desc: 'Custom React hooks' },
    { path: 'hooks', desc: 'Custom React hooks' },
    { path: 'src/services', desc: 'API service layer' },
    { path: 'services', desc: 'API service layer' },
    { path: 'src/lib', desc: 'Shared libraries' },
    { path: 'lib', desc: 'Shared libraries' },
    { path: 'src/utils', desc: 'Utility functions' },
    { path: 'utils', desc: 'Utility functions' },
    { path: 'src/types', desc: 'TypeScript types' },
    { path: 'types', desc: 'TypeScript types' },
    { path: 'src/stores', desc: 'State management' },
    { path: 'stores', desc: 'State management' },
    { path: 'src/styles', desc: 'Global styles' },
    { path: 'styles', desc: 'Global styles' },
    { path: 'src/constants', desc: 'App constants' },
    { path: 'public', desc: 'Static assets' },
    { path: 'prisma', desc: 'Prisma schema & migrations' },
    { path: 'api', desc: 'API routes' },
  ];

  const addedPaths = new Set();
  
  commonDirs.forEach(({ path: dirPath, desc }) => {
    const fullPath = path.join(ROOT_DIR, dirPath);
    if (fs.existsSync(fullPath) && !addedPaths.has(desc)) {
      content += `| \`/${dirPath}/\` | ${desc} |\n`;
      addedPaths.add(desc);
    }
  });

  return content;
}

// ============================================
// MAIN EXECUTION
// ============================================

// Ensure .cursor directory exists
const cursorDir = path.join(ROOT_DIR, '.cursor');
if (!fs.existsSync(cursorDir)) {
  fs.mkdirSync(cursorDir, { recursive: true });
}

// Generate and write the tree
const markdown = generateMarkdown();
fs.writeFileSync(OUTPUT_FILE, markdown);

console.log(`✅ Project tree generated: ${OUTPUT_FILE}`);
console.log(`   ${markdown.split('\n').length} lines`);
