# AGENTS.md — packages/analytics-duckdb

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Owns analytical DuckDB execution outside the renderer.

Large queries/imports/pivots/profiling run as cancellable jobs. Return aggregated/result data, not giant raw JS arrays when avoidable.

Caches are disposable and must never be the only representation of domain state.
