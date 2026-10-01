# Scaffold validation

Static generation checks:

- ✅ No .env files
- ✅ Root AGENTS.md exists
- ✅ DuckDB migrations present
- ✅ SQLite migrations present and executed successfully against local SQLite
- ✅ Brand colors present
- ✅ PDF confidence policy implemented
- ✅ All v1 adapters registered
- ✅ Portable project extension configured
- ✅ App ID configured
- ✅ Apache-2.0 license

## Dependency/build validation

Dependency versions were selected from current stable package metadata on 2026-09-30. The first
dependency installation and full repository check completed successfully on that date, and the
generated `pnpm-lock.yaml` is now the reproducible dependency source for CI. To reproduce locally:

```bash
corepack enable
corepack prepare pnpm@12.6.0 --activate
pnpm install
pnpm check
pnpm dev
```

The check covers linting, TypeScript, tests and production builds across all workspace packages.
The DuckDB migration SQL is present, but no current test exercises a complete project migration;
that remains an integration-test gap rather than a dependency/build-validation gap.
