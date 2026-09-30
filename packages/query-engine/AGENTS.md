# AGENTS.md — packages/query-engine

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Owns safe compilation of formulas, transformations, filters, relationships, pivots and analytical queries to DuckDB plans/SQL.

Never `eval` formulas. Never concatenate unvalidated user text as SQL identifiers/functions/operators. Resolve stable IDs through trusted metadata and quote identifiers centrally.

Detect ambiguous relationship paths rather than guessing.
