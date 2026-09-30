# AGENTS.md — packages/domain

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Pure domain only. No Electron, React, SQL, DuckDB, SQLite, filesystem or source-driver imports.

Owns dataset/field identity, relationships, transformations, formulas, visualization definitions and dashboard concepts.

Stable UUID references are mandatory. Display-name changes must not break downstream objects.
