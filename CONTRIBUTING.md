# Contributing to OB-DaVi

Thank you for contributing.

1. Read `AGENTS.md` and the scoped `AGENTS.md` for the package you change.
2. Preserve the product's zero-cloud-dependency architecture.
3. Add or update tests with behavior changes.
4. Update architecture/domain docs when a persisted schema, source adapter contract, formula behavior, project format or visualization contract changes.
5. Use Conventional Commits.

Examples:

```text
feat(importers): detect Excel header rows
fix(pdf): block low-confidence table candidate
feat(model): add bidirectional relationship validation
```

Pull requests should pass:

```bash
pnpm check
```
