# VSCode Extension Ts Boilerplate

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**VSCode Extension Ts Boilerplate** is a TypeScript-based template for building VS Code extensions with a fully configured development environment and a clean layered architecture ready to extend.

- **What it is:** A production-ready boilerplate for building VS Code extensions with TypeScript — giving you a clean, pre-configured foundation so you can focus on writing your extension's actual logic from day one.

- **The problem it solves:** Every new VS Code extension requires the same repetitive setup: wiring up esbuild, configuring TypeScript with strict mode, mocking the `vscode` API for tests, setting up ESLint + Prettier + pre-commit hooks, and deciding how to organize commands, helpers, and types. This template makes all of those decisions once so you never have to again.

- **What it includes:**
  - **esbuild bundler** (`scripts/build.ts`) with path alias support (`@/` → `src/`, `@__tests__/` → `__tests__/`) and a problem-matcher plugin for VS Code's watch task integration
  - **Four TypeScript configs** scoped by concern: `src/`, `__tests__/`, `scripts/`, and a shared `tsconfig.base.json` with strict mode fully enabled (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, etc.)
  - **Jest + ts-jest** with a complete `vscode` API mock (`__tests__/__mocks__/vscode.mock.ts`) and `ExtensionContext` mock — unit tests run without a VS Code instance; 70% coverage threshold enforced
  - **ESLint** (flat config) with `typescript-eslint` strict rules: explicit return types, no `any`, consistent type imports, no unused variables
  - **Prettier** integrated with ESLint via `eslint-plugin-prettier` to avoid conflicts
  - **Husky + lint-staged** pre-commit hook that runs ESLint fix + Prettier on every staged `.ts` file, blocking commits with errors
  - **Layered architecture** already in place: `src/commands/` (VS Code API layer), `src/helpers/` (utility functions — pure logic by default, free to import `vscode` when needed), `src/constants/` + `src/types/` (shared values and contracts)
  - **`.vscode/` workspace config**: two launch configurations (build-once and watch-mode), recommended extensions, and build tasks wired to the debug runner

- **How to use it:** Clone the repo, update the extension `name`, `displayName`, `publisher`, and command IDs in `package.json`, rename or delete the example `aliveCommand.ts`, and start adding your own `register*Command()` functions in `src/commands/` — the architecture and tooling are already wired up.

## Technologies Used

1. Typescript

## Libraries Used

### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

### DevDependencies

```
"@eslint/js": "^9.0.0"
"@semantic-release/changelog": "^6.0.3"
"@semantic-release/exec": "^7.1.0"
"@semantic-release/git": "^10.0.1"
"@types/jest": "^29.5.14"
"@types/node": "^22.0.0"
"@types/vscode": "^1.99.0"
"@vscode/vsce": "^3.0.0"
"esbuild": "^0.25.10"
"eslint": "^9.23.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.0.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^29.7.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"semantic-release": "^25.0.3"
"ts-jest": "^29.3.2"
"tsx": "^4.19.3"
"typescript": "^5.6.3"
"typescript-eslint": "^8.0.0"
```

## Getting Started

Now that you know what the boilerplate provides, here's how to spin it up locally:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Open the project in VS Code
5. Press `F5` or go to `Run > Start Debugging`
6. Select one of the available configurations:
   - **Run Extension (Build once)** — builds once and launches the Extension Development Host
   - **Run Extension (Watch mode)** — rebuilds on every file save, ideal for active development
7. In the **Extension Development Host** window, open the Command Palette (`Ctrl+Shift+P`) and run `VSCode Extension Ts Boilerplate: Alive`

For active development outside the debug runner, you can run the bundler directly in watch mode:

```bash
npm run dev
```

No `.env` file is required to run the extension — see [Env Keys](#env-keys) for the variables consumed by the publish pipeline.

### Pre-Commit for Development

The pre-commit pipeline is already wired up via **Husky + lint-staged**. On every commit, staged `.ts` files are automatically linted and formatted, and the commit is blocked if there are unfixable errors.

The hook runs:

- **ESLint** with TypeScript strict rules (explicit return types, no `any`, consistent type imports, no unused variables) — auto-fixes what it can.
- **Prettier** with the project conventions (2 spaces, semicolons, double quotes, ES5 trailing commas).

To trigger the same checks manually:

```bash
npm run lint           # Check linting errors in src/
npm run lint:fix       # Auto-fix linting errors in src/
npm run lint:all       # Auto-fix linting errors in src/ + __tests__/
npm run format         # Format src/ with Prettier
npm run format:check   # Check formatting without writing
npm run format:all     # Format src/ + __tests__/ with Prettier
npm run check-types    # Type-check all tsconfigs (src, tests, scripts)
```

## Env Keys

This extension does not consume any runtime environment variables — installed users do not need to configure anything, and contributors do not need a `.env` to run it locally.

The only secret in the toolchain belongs to the **publish pipeline**: an Azure DevOps Personal Access Token (PAT) used by `vsce` to push the extension to the Marketplace. It is not loaded from a `.env` file; `vsce` prompts for it on first publish and caches it locally, or you can pass it explicitly. See [Production → Publish to the Marketplace](#publish-to-the-marketplace) for the full flow.

| Variable   | Scope            | Required | Description                                                                                                                |
| ---------- | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `VSCE_PAT` | Publishing only  | Optional | Azure DevOps PAT with Marketplace publish permissions. Can be exported as an env var or passed via `npx vsce publish --pat <token>` to skip the interactive prompt. |

## Project Structure

With the project running, here's how the codebase is organized:

```
vscode-extension-ts-boilerplate/
├── __tests__/                      # Test suite
│   ├── __mocks__/                  # Shared mock data and module mocks
│   │   ├── extensionContext.mock.ts # Mock for vscode.ExtensionContext
│   │   └── vscode.mock.ts          # Mock for the vscode API
│   ├── commands/                   # Tests for command modules
│   ├── helpers/                    # Tests for helper functions
│   └── jest.setup.ts               # Jest global setup
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI/CD pipeline
├── public/                         # Static assets
│   └── icon.png                    # Extension icon
├── scripts/
│   └── build.ts                    # esbuild bundler script
├── src/
│   ├── commands/                   # One file per registered VS Code command
│   │   └── aliveCommand.ts         # Example command
│   ├── constants/                  # App-wide constant values
│   │   └── vars.ts                 # General constants
│   ├── helpers/                    # Utility functions (may import vscode when needed)
│   │   └── getFullPathFile.ts      # Path joining helper
│   ├── types/                      # TypeScript type definitions
│   │   └── app.ts                  # Domain model types
│   └── extension.ts                # Extension entry point (activate / deactivate)
├── .vscode/
│   ├── extensions.json             # Recommended VS Code extensions
│   ├── launch.json                 # Debug / run configurations
│   ├── settings.json               # Workspace settings
│   └── tasks.json                  # Build tasks used by launch.json
├── .editorconfig                   # Editor-agnostic formatting rules
├── .npmrc                          # npm settings (engine-strict)
├── .nvmrc                          # Pinned Node version (used by CI)
├── CHANGELOG.md                    # Release notes (Keep a Changelog)
├── eslint.config.mjs               # ESLint flat config
├── jest.config.mjs                 # Jest configuration
├── tsconfig.app.json               # TypeScript config for src/
├── tsconfig.base.json              # Shared TypeScript base config
├── tsconfig.scripts.json           # TypeScript config for scripts/
├── tsconfig.test.json              # TypeScript config for __tests__/
└── package.json                    # Project metadata and scripts
```

| Folder / File          | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `__tests__/`           | All test files, grouped by source category                        |
| `__tests__/__mocks__/` | Reusable mocks — vscode API and ExtensionContext                  |
| `src/commands/`        | One file per VS Code command; each exports a `register*` function |
| `src/constants/`       | Centralized constants with typed values from `src/types/`         |
| `src/helpers/`         | Utility functions; may import `vscode` when wrapping the API      |
| `src/types/`           | TypeScript interfaces and types, split by concern                 |
| `src/extension.ts`     | Entry point — registers all commands via `context.subscriptions`  |
| `scripts/build.ts`     | esbuild bundler with path alias and problem matcher plugins       |
| `.vscode/launch.json`  | Two run configs: build-once and watch mode                        |

## Architecture & Design Patterns

### Architecture

The extension follows a **layered architecture** with strict separation between the VS Code API surface and pure application logic:

```
extension.ts  (entry point)
     │
     ├── commands/   (VS Code API layer — registers commands, handles Disposables)
     │
     ├── helpers/    (utility layer — pure logic preferred, vscode allowed when needed)
     │
     ├── constants/  (shared values — typed via types/)
     │
     └── types/      (TypeScript contracts)
```

`extension.ts` acts as the composition root: it imports every `register*Command()` function and pushes the returned `Disposable` into `context.subscriptions`, delegating lifecycle management entirely to VS Code.

`helpers/` favors pure functions so they can be tested with plain Jest — no mocking required. When a helper genuinely needs the VS Code API (e.g. a thin wrapper around `vscode.window.showQuickPick`), importing `vscode` is allowed; the global `vscode` mock in `__tests__/__mocks__/` covers those cases at test time.

---

### Design Patterns

**Command Pattern**

Each VS Code command is encapsulated in its own module inside `src/commands/`. Every module exposes a single `register*Command(): vscode.Disposable` function that wires the command ID to its handler internally. `extension.ts` only calls `register*` — it never knows about the underlying handler logic.

```ts
// src/commands/aliveCommand.ts
const aliveCommand = (): void => {
  vscode.window.showInformationMessage("...");
};

export const registerAliveCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    "vscode-extension-ts-boilerplate.alive",
    aliveCommand
  );
};
```

**Disposable Pattern**

VS Code's resource lifecycle is managed through `Disposable` objects. Every registered command is pushed to `context.subscriptions`, so VS Code automatically disposes them when the extension is deactivated — no manual cleanup needed.

```ts
// src/extension.ts
context.subscriptions.push(registerAliveCommand());
```

**Pure Functions**

Helpers in `src/helpers/` are preferably stateless pure functions: same input always produces the same output, with no side effects. This keeps them framework-agnostic and directly unit-testable. Helpers that wrap the VS Code API are also allowed when useful — they remain testable via the global `vscode` mock.

```ts
// src/helpers/getFullPathFile.ts
export const getFullPathFile = (
  directory: string,
  filename: string
): string => {
  return path.join(directory, filename);
};
```

## Testing

With the architecture clear, the next step before shipping is verifying everything works.

Tests live in `__tests__/` and run on **Jest + ts-jest**. The `vscode` module is fully mocked via `__tests__/__mocks__/vscode.mock.ts`, so the suite runs without spawning a VS Code instance. Coverage is collected from `src/**/*.ts` and a **70% threshold is enforced**.

1. Navigate to the project folder
2. Execute: `npm test`

For watch mode (re-runs on file changes, ideal during development):

```bash
npm run test:watch
```

For the coverage report:

```bash
npm run test:coverage
```

To run a single test file:

```bash
npx jest __tests__/path/to/file.test.ts --verbose
```

## Security Audit

Once tests pass, audit the dependency tree before packaging.

```bash
npm audit
```

Resolve any high/critical advisories before moving on to [Build](#build). Since this template ships with **zero production dependencies**, audit findings will only ever come from `devDependencies` and won't be bundled into the published `.vsix`.

## Build

With tests green and the dependency tree clean, build the production bundle.

```bash
npm run build
```

This runs `scripts/build.ts`, which uses **esbuild** to bundle `src/extension.ts` → `dist/extension.js` (CJS, Node 22, `vscode` marked external). Two esbuild plugins are wired in:

- `aliasPlugin` — resolves `@/` and `@__tests__/` path aliases
- `problemMatcherPlugin` — emits `[watch] build started/finished` markers consumed by `.vscode/tasks.json`

For active development, use `npm run dev` instead — it runs the same bundler in watch mode with source maps enabled.

To inspect the bundle composition (per-module size breakdown plus a `dist/metafile.json` for tools like [esbuild's bundle analyzer](https://esbuild.github.io/analyze/)):

```bash
npm run build -- --analyze
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch. On `push` to `main`, the same workflow continues with two additional jobs that produce an automated release to the VS Code Marketplace.

### Pipeline overview

```
                      ┌─── PR or push to main ───┐
                      ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│     testing      │─▶│      build       │
│ eslint · tsc · prettier │  jest --verbose  │  │ esbuild → dist/  │
│      npm audit       │  │                  │  │                  │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
                                                          │
                                       (only on push to main, sequentially)
                                                          ▼
                                                ┌──────────────────────┐
                                                │ check-publish-config │
                                                │  verifies VSCE_PAT   │
                                                └──────────────────────┘
                                                          │
                                                          ▼
                                                ┌──────────────────────────┐
                                                │   publish-marketplace    │
                                                │     semantic-release     │
                                                │   (bump · changelog ·    │
                                                │  tag · vsce · GH release)│
                                                └──────────────────────────┘
```

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — `npm run lint`, `npm run check-types`, `npm run format:check`, `npm audit --audit-level=high`.
2. **`testing`** — `npm test` (Jest + ts-jest with the global `vscode` mock).
3. **`build`** — runs `npm run build` to confirm `scripts/build.ts` produces a clean `dist/extension.js` bundle.

### Release jobs (only on push to `main`)

4. **`check-publish-config`** — reads the `VSCE_PAT` secret through an env var (the only way to test a secret's presence in Actions) and exposes an `enabled` output. If `VSCE_PAT` is missing, the next job is reported as **Skipped** so downstream consumers of this boilerplate can adopt the CI without ever touching the workflow file.
5. **`publish-marketplace`** — runs [`semantic-release`](https://semantic-release.gitbook.io/) with the plugin pipeline defined in [`.releaserc.json`](.releaserc.json). It inspects the commits since the latest tag, decides the next SemVer version using [Conventional Commits](#conventional-commits-required-for-releases), prepends the new entry to `CHANGELOG.md`, bumps `package.json` + `package-lock.json` (without publishing to npm), publishes the extension via `npx vsce publish --no-git-tag-version` (which re-runs `vscode:prepublish` → `npm run build` and uploads the `.vsix` to the Marketplace), commits, tags and pushes back to `main` as `github-actions[bot]`, and finally creates the matching GitHub Release with the generated notes. The release commit subject is `chore(release): vX.Y.Z [skip ci]` so the follow-up push does not re-trigger CI.

### Conventional Commits (required for releases)

Commits merged into `main` must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) so the pipeline can compute the next version and group the changelog entries.

| Commit prefix | Version bump | Example |
|---|---|---|
| `feat:` / `feat(scope):` | **MINOR** | `feat(commands): add open settings command` |
| `fix:` / `fix(scope):` | **PATCH** | `fix: avoid crash when workspace is empty` |
| `perf:`, `refactor:`, `docs:`, `build:`, `ci:`, `chore:`, `style:`, `test:` | **PATCH** | `refactor: extract path helper` |
| `feat!:` / `fix!:` or `BREAKING CHANGE:` in the body | **MAJOR** | `feat!: rename activation command` |

When a push contains multiple commits, the highest applicable bump wins (a single `feat:` among many `fix:` triggers a MINOR bump). If you squash-merge PRs, configure the repo to use the PR title as the squash commit message and write the **PR title** following the convention.

The changelog generator groups entries as:

- `feat:` → **### Added**
- `fix:` → **### Fixed**
- `refactor:`, `perf:`, `chore:`, `docs:`, `style:`, `build:`, `ci:`, `revert:` → **### Changed**

### Skipping a release

If you need to push a change to `main` without producing a release (e.g. tweaking job names in the workflow, fixing a typo in the README), append `[skip release]` to the commit message. The validation jobs (lint, test, build) still run; only `check-publish-config` and `publish-marketplace` are skipped.

```bash
git commit -m "ci: rename build job for clarity [skip release]"
```

To skip **everything** including validation, use GitHub's standard `[skip ci]` marker instead.

### Where the build outputs live

| Output | Location |
|---|---|
| Validation logs (lint, tests) | **Actions** tab on GitHub |
| Local build artifact (`dist/extension.js`) | Ephemeral, inside the runner |
| Published `.vsix` per version | [VS Code Marketplace](https://marketplace.visualstudio.com/) under the extension's `publisher` |
| Version history & notes | [`CHANGELOG.md`](CHANGELOG.md) + git tags (`vX.Y.Z`) |

> **Note:** GitHub's **Packages** section is for package registries (npm, PyPI, Docker, etc.) and does not host VS Code extensions. The `.vsix` is hosted by the Marketplace; the git tag is the canonical reference for each release.

### Repository setup required for releases

For the release jobs to push tags + commits back to `main` and publish to the Marketplace, the repository needs:

1. **Settings → Secrets and variables → Actions**: add `VSCE_PAT`, an [Azure DevOps Personal Access Token](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token) with `Marketplace > Manage` scope. Without this secret the publish job is auto-skipped.
2. **Settings → Actions → General → Workflow permissions**: set to *Read and write permissions* (the workflow already declares `permissions: contents: write`, `issues: write`, `pull-requests: write` at the job level so `semantic-release` can create releases and comment on related issues/PRs, but the repo toggle must allow it).
3. **Branch protection on `main`**: if enabled, allow `github-actions[bot]` to bypass the PR requirement, or disable the protection for the bot. Otherwise `publish-marketplace` will fail when pushing the version bump.
4. **`publisher` in `package.json`** must match the publisher tied to the `VSCE_PAT` token, otherwise `vsce publish` fails with `403 Forbidden`.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run check-types
npm run format:check
npm audit --audit-level=high

# testing
npm test

# build
npm run build
```

## Production

Unlike web apps, VS Code extensions don't use Docker or a server. **"Production" means packaging the extension into a `.vsix` file and optionally publishing it to the [VS Code Marketplace](https://marketplace.visualstudio.com/).**

Before publishing, make sure you've completed the release pipeline:

1. [Testing](#testing) — `npm run test:coverage` passes the 70% threshold
2. [Security Audit](#security-audit) — `npm audit` is clean
3. [Build](#build) — `npm run build` produces `dist/extension.js`

### How it works

The build pipeline hooks into VS Code's publish lifecycle automatically:

- **`vscode:prepublish`** — runs `npm run build` before every `vsce package` or `vsce publish` call, ensuring the bundle in `dist/` is always up to date
- **`.vscodeignore`** — controls which files are excluded from the package (like `.dockerignore`); source files, tests, and config files are excluded, only `dist/` and `public/` ship

### Flow

```
npm run build  →  dist/extension.js  →  npm run ext:package  →  .vsix
                                                                   ↓
                                              install locally  or  npm run ext:publish  →  Marketplace
```

### Package locally

Creates a `.vsix` file you can install manually or distribute:

```bash
npm run ext:package
# install it in VS Code:
code --install-extension your-extension-1.0.0.vsix
```

### Publish to the Marketplace

Requires a **Personal Access Token (PAT)** from [Azure DevOps](https://dev.azure.com) with Marketplace publish permissions, and that the `publisher` field in `package.json` matches your publisher account.

```bash
npm run ext:publish
```

On first run, `vsce` will prompt for the PAT and cache it. To set it explicitly:

```bash
npx vsce publish --pat <YOUR_PAT>
```

## Known Issues

- **`brace-expansion` moderate advisory ([GHSA-jxxr-4gwj-5jf2](https://github.com/advisories/GHSA-jxxr-4gwj-5jf2))** — surfaced by `npm audit` as a transitive `devDependency` (pulled in by `@typescript-eslint/typescript-estree`, `glob`, and `npm`). It is **not bundled** into the published `.vsix` (the extension ships with zero production dependencies) and CI runs `npm audit --audit-level=high`, so this moderate finding does not fail the pipeline. It will clear automatically once the upstream `devDependencies` bump their `brace-expansion` ranges; running `npm audit fix` locally is also safe.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/vscode-extension-ts-boilerplate`](https://www.diegolibonati.com.ar/#/project/vscode-extension-ts-boilerplate)
