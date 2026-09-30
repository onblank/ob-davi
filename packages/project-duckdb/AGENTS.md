# AGENTS.md — packages/project-duckdb

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Owns the `.obdavi` portable DuckDB project format.

Schemas: `obdavi_meta`, `obdavi_model`, `obdavi_raw`, `obdavi_data`, `obdavi_cache`.

Migrations are immutable after release. Never store credentials or absolute machine paths. Raw snapshots are not silently modified by preparation operations.
