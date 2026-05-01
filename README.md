# VSCode Extension Ts Boilerplate

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Open the project in VS Code
5. Press `F5` or go to `Run > Start Debugging`
6. Select one of the available configurations:
   - **Run Extension (Build once)** — builds once and launches the Extension Development Host
   - **Run Extension (Watch mode)** — rebuilds on every file save, ideal for active development
7. In the **Extension Development Host** window, open the Command Palette (`Ctrl+Shift+P`) and run `VSCode Extension Ts Boilerplate: Alive`

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
  - **Layered architecture** already in place: `src/commands/` (VS Code API layer), `src/helpers/` (pure logic, zero vscode dependency), `src/constants/` + `src/types/` (shared values and contracts)
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
"@vscode/vsce": "^3.0.0"
"@eslint/js": "^9.0.0"
"@types/jest": "^29.5.14"
"@types/node": "^22.0.0"
"@types/vscode": "^1.99.0"
"esbuild": "^0.25.10"
"eslint": "^9.23.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.0.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^29.7.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.3.2"
"tsx": "^4.19.3"
"typescript": "^5.6.3"
"typescript-eslint": "^8.0.0"
```

## Available Scripts

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| `npm run dev`           | Start watch mode build             |
| `npm run build`         | Build for production               |
| `npm run test`          | Run tests                          |
| `npm run test:watch`    | Run tests in watch mode            |
| `npm run test:coverage` | Run tests with coverage            |
| `npm run lint`          | Check for linting errors           |
| `npm run lint:fix`      | Fix linting errors                 |
| `npm run lint:all`      | Fix linting errors (src + tests)   |
| `npm run format`        | Format code with Prettier          |
| `npm run format:check`  | Check code formatting              |
| `npm run format:all`    | Format with Prettier (src + tests) |
| `npm run check-types`   | Type-check all tsconfigs           |
| `npm run ext:package`   | Package extension into a `.vsix`   |
| `npm run ext:publish`   | Publish extension to the Marketplace |

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/vscode-extension-ts-boilerplate`](https://www.diegolibonati.com.ar/#/project/vscode-extension-ts-boilerplate)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Production

Unlike web apps, VS Code extensions don't use Docker or a server. "Production" means packaging the extension into a `.vsix` file and optionally publishing it to the [VS Code Marketplace](https://marketplace.visualstudio.com/).

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
# installs it in VS Code:
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

## Project Structure

```
vscode-extension-ts-boilerplate/
├── __tests__/                      # Test suite
│   ├── __mocks__/                  # Shared mock data and module mocks
│   │   ├── extensionContext.mock.ts # Mock for vscode.ExtensionContext
│   │   └── vscode.mock.ts          # Mock for the vscode API
│   ├── commands/                   # Tests for command modules
│   ├── helpers/                    # Tests for helper functions
│   ├── extension.test.ts           # Tests for the extension entry point
│   └── jest.setup.ts               # Jest global setup
├── public/                         # Static assets
│   └── icon.png                    # Extension icon
├── scripts/
│   └── build.ts                    # esbuild bundler script
├── src/
│   ├── commands/                   # One file per registered VS Code command
│   │   └── aliveCommand.ts         # Example command
│   ├── constants/                  # App-wide constant values
│   │   └── vars.ts                 # General constants
│   ├── helpers/                    # Pure utility functions (no vscode dependencies)
│   │   └── getFullPathFile.ts      # Path joining helper
│   ├── types/                      # TypeScript type definitions
│   │   └── app.ts                  # Domain model types
│   └── extension.ts                # Extension entry point (activate / deactivate)
├── .vscode/
│   ├── extensions.json             # Recommended VS Code extensions
│   ├── launch.json                 # Debug / run configurations
│   ├── settings.json               # Workspace settings
│   └── tasks.json                  # Build tasks used by launch.json
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
| `src/helpers/`         | Stateless utility functions with no vscode API dependencies       |
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
     ├── helpers/    (pure logic layer — no vscode dependency)
     │
     ├── constants/  (shared values — typed via types/)
     │
     └── types/      (TypeScript contracts)
```

`extension.ts` acts as the composition root: it imports every `register*Command()` function and pushes the returned `Disposable` into `context.subscriptions`, delegating lifecycle management entirely to VS Code.

`helpers/` is intentionally kept free of any `vscode` import. This makes utility functions trivially testable with plain Jest — no mocking required.

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

Helpers in `src/helpers/` are stateless pure functions: same input always produces the same output, with no side effects. This keeps them framework-agnostic and directly unit-testable.

```ts
// src/helpers/getFullPathFile.ts
export const getFullPathFile = (
  directory: string,
  filename: string
): string => {
  return path.join(directory, filename);
};
```

## Code Quality Tools

### ESLint

Configured with TypeScript strict rules:

- Explicit return types required
- No `any` type allowed
- Consistent type imports
- No unused variables

### Prettier

Automatic code formatting:

- 2 spaces indentation
- Semicolons required
- Double quotes
- Trailing commas (ES5)

### Husky + lint-staged

Pre-commit hooks that automatically:

- Run ESLint on staged `.ts` files
- Format code with Prettier
- Block commits with linting errors

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
