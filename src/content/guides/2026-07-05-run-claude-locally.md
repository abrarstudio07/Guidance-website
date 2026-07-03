---
title: "The Complete Guide to Running Local Models via Claude Code"
description: "Learn how to install the Claude Code CLI and redirect it to a local open-source model using Ollama for free, private AI coding."
pubDate: 2026-07-03
category: tools
tags:
  - claude-code
  - ollama
  - local-llm
  - cli
difficulty: intermediate
duration: 2
featured: true
---

## Why running Claude Code locally matters

Running an AI coding assistant locally keeps your proprietary codebase entirely private while dropping your API costs to zero. This guide shows you exactly how to hijack the official Anthropic Claude Code CLI tool and redirect its traffic to a local open-source model hosted on your hardware.

## Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js:** Version 18 or higher to execute NPM commands.
- **Ollama:** Installed and running in the background.

### Step 1: Install Claude Code CLI

First, install the official terminal assistant built by Anthropic. A global installation ensures you can access the CLI from any project directory on your computer.

Open your terminal and run:

```bash
npm install @anthropic-ai/claude-code -g
```

### Step 2: Set up your local model via Ollama

Next, you need an open-source coding model running locally to process your requests. Strong options for development include `qwen3-coder:7b` or `deepseek-coder`.

Download and start the model by running:

```bash
ollama run qwen3-coder:7b
```

Leave this terminal window running or verify the Ollama application icon is active in your system tray. Ollama runs a local server at `http://localhost:11434`.

### Step 3: Modify the Claude configuration

By default, the CLI pings Anthropic's paid cloud servers. You must rewrite the settings to route traffic to your local Ollama address instead.

#### Locate the configuration folder

Claude Code stores its settings in a hidden `.claude` folder in your home directory. 

| Operating System | Path |
| :--- | :--- |
| **Mac / Linux** | `~/.claude/` |
| **Windows** | `C:\Users\YourUsername\.claude\` |

#### Update the settings file

Navigate to that folder and open `settings.json` (create the file if it does not exist yet). Paste the exact configuration below:

```json
{
  "model": "qwen3-coder:7b",
  "env": {
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "ANTHROPIC_AUTH_TOKEN": "ollama",
    "ANTHROPIC_API_KEY": "not-applicable",
    "ANTHROPIC_BASE_URL": "http://localhost:11434/v1"
  }
}
```

> **Why this works:** Overriding `ANTHROPIC_BASE_URL` forces the CLI to talk to Ollama's local OpenAI-compatible API endpoint. The dummy keys bypass the CLI's cloud authentication gate.

### Step 4: Launch and test your setup

With your settings saved and Ollama active, your local assistant is ready. 

1. Navigate to any of your development project folders in the terminal.
2. Launch the interface:

```bash
claude
```

3. Test the setup with a prompt:

```text
Explain the structure of this project and verify if my configuration works.
```

Your terminal will now stream responses generated directly by your local hardware.

## Troubleshooting quick fixes

If you run into issues, check these common errors:

| Error | Quick Fix |
| :--- | :--- |
| **Connection Refused** | Ensure Ollama is active. Visit `http://localhost:11434` in your browser. It should say "Ollama is running". |
| **Missing API Key** | Double-check your `settings.json`. Ensure `ANTHROPIC_AUTH_TOKEN` and `ANTHROPIC_API_KEY` have string values to bypass the initial auth check. |

## Conclusion

You now have a powerful, context-aware coding assistant living entirely on your machine. Explore different local models in Ollama to find the perfect balance between speed and coding accuracy for your specific hardware.