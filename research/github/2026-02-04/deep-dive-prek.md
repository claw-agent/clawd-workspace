# Deep Dive: j178/prek

**URL:** https://github.com/j178/prek
**Language:** Rust
**License:** MIT

## Overview

prek is a Rust reimplementation of pre-commit, the popular git hooks framework. It's designed as a faster, dependency-free, drop-in replacement with additional features.

## Why This Matters

Pre-commit hooks are critical for code quality, but the Python-based pre-commit tool is:
- Slow (Python startup, pip installs)
- Heavy (requires Python runtime)
- Disk hungry (separate venvs per hook)

prek solves all of these.

## Adoption

Already used by major projects:
- **python/cpython** — The Python language itself!
- **apache/airflow** — Data orchestration
- **fastapi/fastapi** — Popular web framework
- **astral-sh/ruff** — Ruff linter team
- **home-assistant/core** — Home automation

This level of adoption validates the tool.

## Performance

From their benchmarks:
- **3x+ faster** than pre-commit
- **Half the disk space**
- Parallel repository cloning
- Parallel hook execution (by priority)
- Shared toolchains between hooks

## Key Features

### Drop-in Replacement
- Fully compatible with existing `.pre-commit-config.yaml`
- Same CLI interface
- Same hook repositories

### Improvements Over pre-commit

1. **No runtime required** — Single binary
2. **uv integration** — Fast Python environment management
3. **Monorepo support** — Built-in workspace mode
4. **Better UX**:
   - `prek run --directory` — Run on specific directory
   - `prek run --last-commit` — Run on last commit's changes
   - `prek run [HOOK] [HOOK]` — Run multiple specific hooks
5. **Built-in hooks** — Rust-native implementations (faster)
6. **Shell completions** — Tab-complete hook names

### Installation Methods

```bash
# Standalone installer (recommended)
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/j178/prek/releases/download/v0.3.1/prek-installer.sh | sh

# Homebrew
brew install prek

# uv (Python)
uv tool install prek

# Cargo
cargo install --locked prek

# npm
npm install -g @j178/prek
```

## Language Support

Current status:
- ✅ Python (via uv)
- ✅ Node.js
- ✅ Go
- ✅ Rust
- ✅ Ruby
- 🚧 Some languages still in progress

Check their docs for full language support status.

## GitHub Actions

```yaml
name: Prek checks
on: [push, pull_request]

jobs:
  prek:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: j178/prek-action@v1
```

## Integration Plan

For our repos:

1. **Test locally**
   ```bash
   brew install prek
   cd ~/clawd
   prek run --all-files
   ```

2. **If successful, add to TOOLS.md**

3. **Update CI** to use prek-action

## Concerns

- **v0.3.1** — Still early, may have edge cases
- **Some languages WIP** — Check before adopting if you use exotic hooks

## Verdict

**ADOPT**

This is a clear win:
- Faster
- Simpler (no Python dependency)
- Better UX
- Already proven in major projects

Recommend: Switch from pre-commit to prek on next project setup.
