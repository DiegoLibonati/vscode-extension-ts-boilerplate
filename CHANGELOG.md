# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-17

### Added

- Initial release of the VSCode Extension TypeScript boilerplate.
- esbuild bundler with path alias plugin (`@/`, `@__tests__/`) and problem-matcher plugin for VS Code watch tasks.
- Strict TypeScript configuration with `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`.
- Jest + ts-jest setup with a global `vscode` API mock and 70% coverage threshold.
- ESLint 9 (flat config) with `typescript-eslint` strict and stylistic type-checked presets, plus Prettier integration.
- Husky + lint-staged pre-commit hook running ESLint and Prettier on staged `.ts` files.
- Layered architecture: `src/commands/`, `src/helpers/`, `src/constants/`, `src/types/`.
- Example `aliveCommand` demonstrating the command + disposable pattern.
- `.vscode/` workspace config with launch configurations and recommended extensions.
