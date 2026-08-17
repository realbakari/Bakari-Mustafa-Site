---
title: "Why I built Capsule: A control plane for coding agents"
date: 2026-08-17 00:00:00 +1000
tags:
- AI Agents
- Developer Tools
- Python
- Open Source
description: Notes on building Capsule, a lightweight control plane that indexes workspace skills, routes tasks to exactly one skill, and prevents agents from inheriting unrestricted permissions.
---

Over the last few months, my repositories have slowly accumulated a small army of instruction files, `SKILL.md` documents, prompt rules, and agent definitions.

If you use tools like Claude Code, Cursor, Codex, or Antigravity, you’ve probably run into the same growing pains. You start with one or two helpful markdown instructions, and before long you have twenty different skills scattered across `.agents/`, `.cursorrules`, and `.claude/`.

Working with this setup day-to-day exposed three specific problems that kept breaking my workflow:

### 1. Context exhaustion and prompt bloat

Most agent setups load every single instruction file into the system prompt at the start of every session. If you have 15 skills in a repo, the model is forced to read thousands of tokens of instructions before you even type your first prompt. 

This wastes token budget, increases latency, and causes attention drift—the model frequently confuses rules meant for database migrations with rules meant for frontend styling.

### 2. The blank-line permission bug

When looking through open-source agent definitions on community registries, I noticed a subtle security issue: **12 out of 24 marketplace agents omit an explicit `tools:` key**. 

In many agent frameworks, omitting the tools field doesn't mean "no tools"—it means the agent inherits every tool the host allows, including unrestricted bash execution, file writing, and deletion. Because the omission looks like a blank line in markdown, it easily slips past code review.

### 3. Trigger phrase collisions

When multiple skills have overlapping descriptions, models frequently guess which one to use and pick the wrong one. A skill should only activate when its specific criteria are met, with a clear recorded rationale.

---

## What Capsule does

I built [Capsule](https://github.com/realbakari/capsule) to give workspaces a lightweight, deterministic control plane. It's a small Python CLI (requiring Python 3.11+ with standard library `tomllib` and zero external dependencies) that runs entirely locally.

Its job is simple: **index everything in the workspace, route a task to exactly one skill, and refuse rather than guess**.

Here is how the workflow looks in practice:

### Single-pass indexing

Running `capsule index` scans the repository and condenses every instruction file, prompt, and skill into `capsule-index.json`:

```bash
capsule index
```

This extracts descriptions, trigger clauses, and tool requirements into a compact structured file. The agent reads this lightweight index instead of parsing dozens of full markdown files on every turn.

### Two-stage task routing

When you have a specific task, `capsule route` handles selection in two distinct steps:

1. **Shortlisting**: Fast matching against the condensed index to find potential matches.
2. **Reranking & Rationale**: Reads only the candidate `SKILL.md` bodies in full, selects exactly one, and records why it was chosen.

```bash
capsule route --task "clean up the sales spreadsheet and check column types"
```

Output:
```
Selected: xlsx-cleaner
Rationale: Task specifies tabular data normalization on Excel files.
Candidates evaluated: [xlsx-cleaner, csv-parser, schema-validator]
```

### Injecting prompts automatically with hooks

To avoid manually picking skills, `capsule harness --route-prompts` generates a native `UserPromptSubmit` hook. When you submit a prompt in your terminal, Capsule routes the prompt against the index and injects an activation block directly into the turn:

```xml
<capsule-activation>
Selected Skill: xlsx-cleaner
Policy: Read/write restricted to ./data/*
</capsule-activation>
```

### Checking diffs against skill contracts

One common failure mode with coding agents is rule drift: a skill might instruct the agent never to edit vendor files or remove docstrings, but five steps into a complex refactor, the agent edits them anyway.

Capsule lets you extract verifiable obligations from a skill and test git patches against them:

```bash
# Extract rules from the skill
capsule contract --skill refactor-engine

# Verify your staged diff against the contract
capsule verify --diff changes.patch
```

If the diff modifies a restricted path or violates a formatting rule, Capsule exits with code `5`, allowing you to catch regressions in CI or pre-commit hooks before committing.

---

## Multi-editor plugin export

If you work across different tools (e.g. Claude Code in terminal, Cursor in the editor), keeping configuration files in sync is tedious. 

Capsule generates native manifests with a single command:

```bash
capsule emit-plugins --repo realbakari/capsule --out .
```

This writes the appropriate configurations for Claude Code (`.claude/`), Cursor (`.cursorrules`), Codex, and Grok automatically.

---

## Try it out

Capsule is open source on [GitHub](https://github.com/realbakari/capsule). You can install the CLI with `pip3 install capsule-ctrl` or add it to a skills-compatible agent via `npx skills add realbakari/capsule`.
