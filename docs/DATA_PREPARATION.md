# Data Preparation v1

Raw source snapshots remain available. Preparation is an ordered pipeline of transformations.

Supported transformation families:

- columns: rename, reorder, remove, duplicate, index;
- types: cast and parse with error policy;
- rows: filter, sort, distinct, deduplicate, limit/sample when explicitly configured;
- values: replace, null replacement, fill forward/backward;
- strings: trim, upper/lower, substring, split, merge, regex extract/replace;
- numeric: arithmetic, abs, round/floor/ceil;
- dates: parse, year, quarter, month, week, day, hour, date difference/duration;
- conditional column;
- calculated column;
- pivot/unpivot;
- group by/aggregate;
- join/merge;
- append/union;
- JSON flatten;
- array explode.

Each transformation stores validated structured configuration, not arbitrary SQL.

The query engine compiles the pipeline to DuckDB SQL/plans.

Disabling or reordering a step must immediately recalculate downstream schema/dependency impact before commit.
