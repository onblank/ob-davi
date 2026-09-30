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

Dependency versions were selected from current stable package metadata on 2026-09-30. This generation environment did not run `pnpm install`, so no lockfile is fabricated. On the development machine run:

```bash
corepack enable
corepack prepare pnpm@12.6.0 --activate
pnpm install
pnpm check
pnpm dev
```

Commit the generated `pnpm-lock.yaml` after the first successful install/check.

Additional note: DuckDB migration SQL is defined but was not executed in this container because no DuckDB runtime is installed here. Validate it during the first `pnpm check`/project integration pass.
