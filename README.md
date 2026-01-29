# Cursor Rules Starter Kit

> *"Explaining your codebase to AI is like Groundhog Day, except Bill Murray had it easier."*

---

**The Problem:** Every new chat is a blank slate. Your AI assistant has the memory of a mass GPT lobotomy goldfish. It doesn't know your stack, your patterns, your opinions on tabs vs spaces, or that one cursed legacy folder everyone pretends doesn't exist.

**The Solution:** Cursor Rules. Write it once, never explain it again. Every new chat starts *already knowing* how you do things around here.

This starter kit gives you:
- 📋 **Ready-to-use rule templates** for components, APIs, LLM integrations, and more
- 🎯 **Smart glob patterns** so rules only load when relevant
- 🌳 **Project tree generator** so Cursor always has the lay of the land
- 🧠 **A framework for growing your rules** as your project evolves

Stop repeating yourself. Start shipping.

## Quick Start

### Option 1: Clone & Copy (Recommended)

```bash
# Clone the repo
git clone https://github.com/user/cursor-rules.git /tmp/cursor-rules

# Copy to your project
cd /path/to/your/project
cp -r /tmp/cursor-rules/.cursor .
mkdir -p scripts && cp /tmp/cursor-rules/scripts/generate-tree.js scripts/

# Clean up
rm -rf /tmp/cursor-rules
```

### Option 2: Direct Download (if on GitHub)

```bash
cd /path/to/your/project

# Download and extract just the .cursor folder
curl -L https://github.com/user/cursor-rules/archive/main.tar.gz \
  | tar -xz --strip-components=1 "cursor-rules-main/.cursor"
```

### Option 3: Manual Copy

```bash
# If you have the repo locally somewhere
cp -r /path/to/cursor-rules/.cursor /path/to/your/project/
```

### After Installation

1. **Configure your project context:**
   ```bash
   # Edit with your project's details
   nano .cursor/project.yaml
   ```

2. **Generate the project tree** (optional but recommended):
   ```bash
   # Add to package.json scripts: "tree": "node scripts/generate-tree.js"
   npm run tree
   ```

3. **Verify installation:**
   - Open your project in Cursor
   - Go to **Settings → Rules**
   - You should see all rules listed under "Project Rules"

4. **Customize rules** in `.cursor/rules/` for your specific needs

> 💡 **Pro tip:** Rules load automatically based on glob patterns—no manual registration needed.

---

## How Cursor Rules Work

### Auto-Discovery

Cursor automatically detects all `.mdc` files in your `.cursor/rules/` folder and displays them in **Settings → Rules and Commands → Project Rules**:

![Cursor Settings showing Project Rules](cursor-rules-settings.png)

From here you can:

- See all your project rules and their glob patterns at a glance
- Click any rule to view/edit its contents
- See which rules are "Pattern Matched" for the current file

No configuration required—just drop files in the folder and they appear.

### Folder Structure

```
your-project/
└── .cursor/
    ├── project.yaml              # 🆕 Project-specific variables
    └── rules/
        ├── _template.mdc         # Copy this for new rules
        ├── 00-project-context.mdc # 🆕 Loads project.yaml context
        ├── 01-critical.mdc       # Core rules (always active)
        ├── 02-components.mdc     # Component patterns
        ├── 03-api.mdc            # API/backend patterns
        ├── 04-llm-integration.mdc # LLM client & streaming
        ├── 05-prompts.mdc        # Prompt engineering
        ├── 06-agents.mdc         # Agent & workflow patterns
        ├── 07-rate-limits.mdc    # Retry & rate limiting
        ├── 08-ai-security.mdc    # AI security patterns
        ├── 09-observability.mdc  # Logging & tracing
        ├── 10-testing-ai.mdc     # Testing AI features
        ├── 11-ralph-loops.mdc    # Autonomous agent loops
        └── 12-session-handoff.mdc # 🆕 Session health & handoffs
```

### File Format (`.mdc`)

Every rule file has two parts:

```markdown
---
globs: ["**/*.ts", "**/*.tsx"]    ← When to load this rule
---

# Rule Title                      ← Markdown content

Your rules and examples here...
```

---

## Smart Rule Suggestions

> "I see you're doing X — here's the rule for that."

The AI **proactively suggests relevant rules** based on your request. You'll see:

```
💡 Rule Suggestion: This is a codebase-wide rename — a good fit for the Ralph Loop pattern.
   See `.cursor/rules/11-ralph-loops.mdc` for autonomous CLI loops with fresh context.
   
   Want me to help plan this using Ralph, or proceed normally?
```

### When Suggestions Appear

| Your Request | Suggested Rule |
|--------------|----------------|
| "Rename X to Y everywhere" | `11-ralph-loops.mdc` (mass refactor) |
| "Migrate from library X to Y" | `11-ralph-loops.mdc` (migration) |
| "Update all 50 components to..." | `11-ralph-loops.mdc` (large file count) |
| Working with LLM/AI code | `04-llm-integration.mdc` |
| Writing prompts | `05-prompts.mdc` |
| Building agents | `06-agents.mdc` |
| Rate limiting | `07-rate-limits.mdc` |
| AI security concerns | `08-ai-security.mdc` |

You can follow the suggestion or decline — it's informational, not mandatory.

---

## Project Context System

> "Edit one file, and every rule knows your stack."

The **project context system** lets you define project-specific variables that all rules can reference. Instead of editing every rule for each project, you edit one file.

### Setup

1. Edit `.cursor/project.yaml` with your project details:

```yaml
project:
  name: "My E-commerce App"
  type: "web-app"

stack:
  framework: "Next.js"
  styling: "Tailwind"
  database: "PostgreSQL"
  orm: "Prisma"

conventions:
  components: "PascalCase"
  state_management: "zustand"

preferences:
  test_framework: "vitest"
  commit_style: "conventional"
```

2. The `00-project-context.mdc` rule automatically loads this at session start.

### What You Can Configure

| Section | Purpose | Example Values |
|---------|---------|----------------|
| `project` | Identity & type | name, description, web-app/api/cli |
| `stack` | Tech stack | framework, styling, database, ORM |
| `directories` | Folder structure | src, components, api paths |
| `conventions` | Code style | naming, quotes, indentation |
| `ai` | LLM settings | provider, models, patterns |
| `preferences` | Team preferences | testing, git, docs |
| `notes` | Free-form context | Custom instructions |

### How It Works

When the AI starts a session, it reads `project.yaml` and adapts:

- **Creating components?** → Uses your naming convention and styling system
- **Writing tests?** → Uses your test framework (vitest/jest)
- **Making commits?** → Follows your commit style (conventional/gitmoji)
- **Placing files?** → Uses your directory structure

The rules stay generic—the context makes them specific.

---

## Session Health & Handoff

> "Know when to start fresh, and pick up exactly where you left off."

Long chat sessions degrade in quality. The **session handoff system** automatically monitors for problems and alerts you.

### Automatic Health Alerts

The AI checks for warning signs after each response. When critical issues are detected, you'll see:

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️  SESSION HEALTH CHECK                               │
├─────────────────────────────────────────────────────────┤
│  Signal detected: Same error attempted 3 times         │
│  Recommendation: Start a fresh chat                     │
│                                                         │
│  Say "generate handoff" to get a resume command,        │
│  or continue if you prefer.                             │
└─────────────────────────────────────────────────────────┘
```

### Warning Signs

| Severity | Signal | What It Looks Like |
|----------|--------|-------------------|
| 🔴 Critical | Error loops | Same error 3+ times despite fixes |
| 🔴 Critical | Context confusion | Mixing up files, forgetting decisions |
| 🔴 Critical | Undoing work | Reverting changes made earlier |
| 🟡 Warning | Scope creep | Task expanded way beyond original |
| 🟡 Warning | Task complete | Original goal done, moving to new work |

### Handoff Command

When starting fresh, the AI generates a handoff block:

```markdown
## 🔄 Session Handoff

### Completed
- [x] Set up authentication
- [x] Created login page

### Next Steps
1. Create profile API endpoint
2. Connect profile component

### Resume Command
Continue auth implementation. Done: login/signup. 
Next: profile API at `/api/user/profile`.
Key files: `user-profile.tsx`, `middleware.ts`
```

Copy this into your new chat to continue without losing context.

### Trigger Phrases

Say any of these to get a handoff:
- "Let's continue in a new chat"
- "Generate a handoff"
- "Create a checkpoint"
- "Summarize for next session"

---

## Glob Patterns & Context Efficiency

> ⚠️ **Important: NOT every rule loads on every prompt.**

Rules only load when you're working with files that match their glob pattern. This is intentional — AI context is limited, so only relevant rules should be active.

### How Rules Load

| Glob Pattern | When It Loads | Context Cost |
|--------------|---------------|--------------|
| `["**/*"]` or `alwaysApply: true` | **Every prompt** | Always uses context |
| `["**/components/**/*"]` | Only with component files | Zero cost otherwise |
| `["**/api/**/*.ts"]` | Only with API files | Zero cost otherwise |

### This Repo's Rules

**Always Active (4 rules):**

| Rule | Why Always Active |
|------|-------------------|
| `00-project-context.mdc` | Loads project config, suggests other rules |
| `01-critical.mdc` | Core code style applies everywhere |
| `11-ralph-loops.mdc` | Needs to detect large refactor requests |
| `12-session-handoff.mdc` | Monitors session health |

**Conditionally Active (8 rules):**

| Rule | Only Loads For |
|------|----------------|
| `02-components.mdc` | Component files (`**/components/**/*`) |
| `03-api.mdc` | API/service files |
| `04-llm-integration.mdc` | LLM/AI code directories |
| `05-prompts.mdc` | Prompt files |
| `06-agents.mdc` | Agent/workflow code |
| `07-rate-limits.mdc` | Lib/utils/services |
| `08-ai-security.mdc` | TypeScript files |
| `09-observability.mdc` | Lib/services |
| `10-testing-ai.mdc` | Test files |

### Why This Matters

```
❌ Bad: 12 rules × 200 tokens each = 2,400 tokens on EVERY prompt
✅ Good: 4 always + 2 relevant = ~1,200 tokens (50% savings)
```

Fewer tokens = more room for your code and conversation.

### Check Active Rules

Open **Cursor Settings → Rules** to see which rules are "Pattern Matched" for your current file.

### Pattern Syntax

| Symbol | Meaning | Example |
|--------|---------|---------|
| `*` | Any chars (not `/`) | `*.ts` → all .ts files |
| `**` | Any path depth | `**/utils/**` → any utils folder |
| `{a,b}` | Either a or b | `*.{ts,tsx}` → .ts or .tsx |
| `[abc]` | Any of a, b, c | `file[123].ts` → file1.ts, file2.ts... |

---

## Creating Rules

### 1. Copy the template

```bash
cp .cursor/rules/_template.mdc .cursor/rules/04-my-rule.mdc
```

### 2. Set appropriate globs

```yaml
---
globs: ["**/hooks/**/*.ts"]  # Only for hook files
---
```

### 3. Write clear rules with examples

```markdown
## Always Do This

```typescript
// Good
const data = await fetchData();

// Bad - never do this
const data = fetch(); // missing await
```
```

---

## Best Practices

1. **One topic per file** - Keep rules focused
2. **Use specific globs** - Don't load irrelevant rules
3. **Show code examples** - Concrete > abstract
4. **Number your files** - `01-`, `02-` keeps order consistent
5. **Keep it concise** - AI context is limited

---

## Included Templates

### Core Rules

| File | Purpose | Default Globs |
|------|---------|---------------|
| `_template.mdc` | Blank starter | `**/*.ts, **/*.tsx` |
| `00-project-context.mdc` | **Loads project.yaml context** | `**/*` (always) |
| `01-critical.mdc` | Core rules (style, imports, errors) | `**/*` (always) |
| `02-components.mdc` | UI component patterns | `**/components/**/*` |
| `03-api.mdc` | API & service patterns | `**/api/**/*`, `**/services/**/*` |

### AI/LLM Rules (for automation & AI-powered apps)

| File | Purpose | Default Globs |
|------|---------|---------------|
| `04-llm-integration.mdc` | LLM client setup, streaming, structured outputs | `**/llm/**/*`, `**/ai/**/*` |
| `05-prompts.mdc` | Prompt engineering, templates, versioning | `**/prompts/**/*` |
| `06-agents.mdc` | Agent loops, tools, workflows | `**/agents/**/*`, `**/workflows/**/*` |
| `07-rate-limits.mdc` | Retry logic, rate limiters, queues | `**/lib/**/*`, `**/utils/**/*` |
| `08-ai-security.mdc` | Prompt injection, sanitization, API keys | `**/*.ts, **/*.tsx` |
| `09-observability.mdc` | Logging, tracing, cost tracking | `**/lib/**/*`, `**/services/**/*` |
| `10-testing-ai.mdc` | Mocking LLMs, evals, integration tests | `**/__tests__/**/*`, `**/*.test.ts` |

### Workflow Rules

| File | Purpose | Default Globs |
|------|---------|---------------|
| `11-ralph-loops.mdc` | Autonomous agent loops for mass refactors | `**/*` (always) |
| `12-session-handoff.mdc` | **Session health monitoring & handoffs** | `**/*` (always) |

---

## Project Tree Generator

The `project-tree.md` file gives Cursor a bird's-eye view of your codebase structure.

### Setup

1. Copy the script:
   ```bash
   mkdir -p scripts
   cp ~/Desktop/cursor-rules/scripts/generate-tree.js scripts/
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "tree": "node scripts/generate-tree.js"
     }
   }
   ```

3. Generate:
   ```bash
   npm run tree
   ```

### What It Does

- Generates a tree view of your project structure
- Auto-detects common directories (components, hooks, services, etc.)
- Ignores `node_modules`, `.git`, build artifacts, etc.
- Summarizes large folders (icons, tests) with file counts
- Outputs to `.cursor/project-tree.md`

### When to Regenerate

Run `npm run tree` after:
- Adding new major directories
- Significant file structure changes
- Before starting a new feature (to refresh context)

### Customization

Edit `scripts/generate-tree.js` to:

```javascript
// Add directories to ignore
const IGNORE_DIRS = new Set([
  'node_modules',
  '.git',
  // Add your own...
]);

// Add directories to summarize (show count only)
const SUMMARIZE_DIRS = new Set([
  'icons',
  '__tests__',
  // Add your own...
]);

// Adjust tree depth
const MAX_DEPTH = 6;
```

---

## Troubleshooting

**Rules not loading?**

- [ ] File has `.mdc` extension
- [ ] File is in `.cursor/rules/` folder
- [ ] Frontmatter uses valid YAML
- [ ] Glob pattern matches your file
- [ ] Try restarting Cursor

**Rules too broad?**

- Use more specific glob patterns
- Split into multiple focused files

**Tree not generating?**

- [ ] Script exists at `scripts/generate-tree.js`
- [ ] `npm run tree` script added to package.json
- [ ] Run from project root directory

---

## Changelog

### v2.0 — Dynamic Context & Session Management

Major update adding intelligent session handling and project-aware rules.

#### New Features

| Feature | Files | Description |
|---------|-------|-------------|
| **Smart Rule Suggestions** | `00-project-context.mdc` | AI suggests relevant rules based on your request |
| **Project Context System** | `project.yaml`, `00-project-context.mdc` | Define project variables once, all rules adapt automatically |
| **Session Health Alerts** | `12-session-handoff.mdc` | AI monitors for problems (error loops, confusion) and alerts you |
| **Session Handoff** | `12-session-handoff.mdc` | Generate resume commands to continue work in fresh chats |
| **Ralph Loop Pattern** | `11-ralph-loops.mdc`, `ralph-loop.sh` | Autonomous agent loops for large-scale mechanical refactors |

#### Smart Rule Suggestions

**Problem:** You have 12+ rule files but don't always remember which applies when.

**Solution:** The AI recognizes patterns in your request and suggests the relevant rule:

```
💡 Rule Suggestion: This looks like a codebase-wide rename.
   See `.cursor/rules/11-ralph-loops.mdc` for the recommended approach.
```

The suggestion includes:
- What pattern was detected
- Which rule file to reference
- Option to proceed or decline

#### Project Context System

**Problem:** Rules are generic. Every new project requires editing multiple rule files.

**Solution:** A single `project.yaml` file holds all project-specific config:

```yaml
stack:
  framework: "Next.js"
  styling: "Tailwind"
conventions:
  components: "PascalCase"
```

The AI reads this at session start and adapts all rules accordingly. Copy the rules to a new project, update `project.yaml`, done.

#### Session Health & Handoff

**Problem:** Long chat sessions degrade. The AI loses track, repeats mistakes, forgets context.

**Solution:** Automatic health monitoring with two components:

1. **Health Alerts** — AI checks for warning signs after each response:
   - 🔴 Same error 3+ times
   - 🔴 Undoing its own work
   - 🔴 File/name confusion
   - 🟡 Task complete, scope creep

2. **Handoff Commands** — When starting fresh, say "generate handoff" to get:
   - What was completed
   - Files modified
   - Next steps
   - A resume command to paste in the new chat

#### Ralph Loop Pattern

**Problem:** Large mechanical refactors (50+ files) exhaust context windows and accumulate errors.

**Solution:** External CLI loops with fresh context per iteration:

1. Plan the transformation in Cursor (Plan Mode)
2. Generate a bash script with verification commands
3. Run externally — each iteration gets clean context
4. External verification (grep, tsc) decides completion, not the LLM

Best for: mass renames, library migrations, pattern replacements across codebase.

### v1.0 — Initial Release

- Core rule templates (01-10)
- Glob-based rule loading
- Project tree generator
- README documentation
