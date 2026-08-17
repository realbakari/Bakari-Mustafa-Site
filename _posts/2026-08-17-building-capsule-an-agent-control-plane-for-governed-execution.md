---
title: "Building Capsule: An agent control plane for governed, replayable execution"
date: 2026-08-17 00:00:00 +1000
tags:
- Artificial Intelligence
- Autonomous Agents
- Software Architecture
- Python
- Open Source
description: Why I built Capsule, an open-source agent control plane that turns cluttered workspaces into compact run contexts, routes tasks to exactly one verified skill, and enforces deny-by-default governance.
---

As autonomous coding agents—like Claude Code, Codex, Cursor, Grok, and Antigravity—become standard tools in software engineering, our workspaces are filling up with dozens of instruction files, `SKILL.md` documents, prompt rules, and agent definitions.

Most agent workflows today manage this complexity with one of two flawed approaches:

1. **Context stuffing**: Shoving every instruction, prompt, and tool definition into the agent's system prompt on every turn, causing context exhaustion, high token costs, and attention drift.
2. **Ungoverned execution**: Granting broad permissions by default. In fact, across popular agent skill repositories, over half of agent definitions omit an explicit `tools:` key, inadvertently granting the agent full access to read, write, and execute bash commands on the host machine.

To solve this, I built [Capsule](https://github.com/realbakari/capsule)—an open-source agent control plane designed for governed, replayable execution.

```
Workspace & Repositories ──► [ Index & Condense ] ──► [ Two-Stage Router ] ──► [ Deny-by-Default Gates ] ──► Governed Execution
```

Capsule inspects a workspace, condenses everything readable into a compact run context, routes each task to exactly one skill pack, and enforces strict, license-gated boundaries over what an agent is allowed to touch.

---

## The core philosophy: refuse rather than guess

Capsule operates on a conservative principle: **index everything readable, load as little as possible into the prompt, and refuse rather than guess**.

Instead of treating instructions as passive documentation, Capsule treats skills and agent definitions as an active, governed surface with four core stages:

### 1. Discovery and compact indexing

Running `capsule index` walks the workspace and condenses all instruction files, tools, and docs into a structured `capsule-index.json`. 

By indexing metadata, description clauses, and capabilities without loading full file bodies into memory, Capsule turns a noisy multi-megabyte repository into a compact, auditable summary.

### 2. Two-stage precision task routing

When an agent receives a prompt, dumping twenty skills into its context causes hallucinations and trigger phrase collisions. Capsule solves this with a two-stage routing engine:

- **Stage 1 (Shortlisting)**: Fast semantic matching against the condensed index to shortlist candidates.
- **Stage 2 (Reranking & Rationale)**: Deep inspection of shortlisted `SKILL.md` bodies, selecting exactly one skill pack and recording an explicit rationale.

```bash
capsule route --task "clean up this sales spreadsheet and validate schema"
```

### 3. Automated brief injection per turn

To ensure the agent receives the correct skill without human micro-management, `capsule harness --route-prompts` generates a native `UserPromptSubmit` hook. 

Every prompt submitted in the host terminal is automatically evaluated against the index, injecting an activation brief:

```xml
<capsule-activation>
Selected Skill: xlsx-cleaner
Rationale: Task requests data normalization and schema validation on tabular Excel files.
Policy: Read/Write restricted to ./data/*
</capsule-activation>
```

### 4. Deny-by-default policy gates

Capsule enforces two strict gates before any code or skill is rebuilt or executed:

- **License Gate**: Decides what may be rebuilt or packaged. Restricted or proprietary licenses are indexed for metadata only and cannot be exported into portable packages without explicit operator override.
- **Trust Gate**: Multi-provider security verification against skills from public registries (`skills.sh`). If any security scanner flags a risk, Capsule takes the worst verdict—it refuses to run rather than taking an average score.

---

## Contract extraction and diff verification

One of the biggest risks with autonomous agents is prompt drift during execution. A skill might state: *"Never edit vendor files and never remove docstrings."* Yet during multi-step execution, the model might modify those exact files.

Capsule introduces deterministic contract verification:

```bash
# 1. Extract checkable obligations from the skill
capsule contract --skill refactor-engine

# 2. Verify git diff against the extracted contract before commit
capsule verify --diff changes.patch
```

If a patch violates the extracted rules (such as touching forbidden paths or violating formatting contracts), Capsule halts with exit code 5, preventing regressions before code is merged.

---

## Multi-host plugin generation

Different teams use different AI coding environments. Instead of maintaining separate configuration formats for each platform, Capsule includes native multi-host manifest generation:

```bash
capsule emit-plugins --repo realbakari/capsule --out .
```

This single command generates valid, tailored plugin manifests for:
- **Claude Code** (`.claude/`)
- **Codex / OpenAI**
- **Cursor** (`.cursorrules`)
- **Grok**

---

## Getting started

Capsule requires Python 3.11+ and works completely offline without network calls, accounts, or telemetry.

### Installation via Pip

```bash
pip3 install capsule-ctrl
capsule --help
```

### Installation as an Agent Skill

If you use an agent environment supporting the open skills standard:

```bash
npx skills add realbakari/capsule
```

### Pre-commit hook integration

You can add Capsule to your project's CI or pre-commit workflow to ensure all instruction files and skills remain calibrated and compliant:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/realbakari/capsule
    rev: main
    hooks:
      - id: capsule-validate
      - id: capsule-doctor
```

---

## Looking ahead

Autonomous agents are transitioning from conversational novelty to infrastructure that executes code directly in production repositories. Giving agents unconstrained reach without structured routing or governance is a recipe for silent failures.

Capsule provides the minimal, reliable control plane needed to keep agent execution focused, transparent, and safe.

Explore the source code, open issues, and contribute on GitHub: [github.com/realbakari/capsule](https://github.com/realbakari/capsule).
