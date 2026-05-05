# Contributing to nuxt-driver.js

Thank you for your interest in contributing!

## Prerequisites

- [Bun](https://bun.sh) >= 1.0
- Node.js >= 20 (required by some Nuxt internals)

## Development Setup

```bash
# 1. Fork and clone the repo
git clone https://github.com/BayBreezy/nuxt-driver.js.git
cd nuxt-driver.js

# 2. Install dependencies
bun install

# 3. Generate type stubs and prepare the playground
bun run dev:prepare

# 4. Start the playground dev server
bun run dev
```

## Running Tests

```bash
# Run all tests once
bun run test

# Watch mode
bun run test:watch

# Type check
bun run test:types
```

## Linting & Formatting

```bash
# Run ESLint + oxlint
bun run lint

# Format with oxfmt
bun run fmt

# Check formatting without writing
bun run fmt:check
```

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature or composable option |
| `fix:` | Bug fix |
| `docs:` | Documentation changes only |
| `chore:` | Tooling, deps, release housekeeping |
| `refactor:` | Code change that is neither a fix nor a feature |
| `test:` | Adding or updating tests |

## Pull Request Guidelines

1. Branch from `main` using a descriptive name: `feat/tour-events`, `fix/localstorage-ssr`
2. Keep PRs focused — one logical change per PR
3. Add or update tests for any changed behaviour
4. Make sure `bun run lint`, `bun run fmt:check`, and `bun run test` all pass before opening the PR
5. Fill out the PR description explaining **why** the change is needed

## Release Process

Releases are handled by the maintainer via `bun run release`. Contributors do not need to worry about publishing.
