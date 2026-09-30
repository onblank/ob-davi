# Source Adapter Contract v1

## Common lifecycle

Every adapter implements the conceptual lifecycle:

```text
probe
  ↓
discoverObjects
  ↓
previewObject
  ↓
inferSchema
  ↓
snapshotObject
  ↓
validateSnapshot
  ↓
commitSnapshot
```

Refresh repeats discovery/snapshot into staging and performs schema-drift analysis before atomic replacement.

## Common capabilities

Adapters describe:
- adapter kind;
- accepted source locator type;
- whether source can expose multiple objects;
- whether credentials are needed;
- whether network access is possible;
- discovery support;
- refresh support;
- preview support;
- cancellation/progress support.

## Object tracking

Every logical object gets a `source_objects` row and its own dataset when imported.

Examples:

```text
workbook.xlsx
├── Sheet1
├── Sheet2
└── Stores

report.pdf
├── page-1-table-1
└── page-3-table-1

PostgreSQL
├── public.sales
├── public.stores
└── reporting.monthly_view
```

## Excel adapter

Formats: XLSX, XLS, XLSM, XLSB, ODS.

Use the pinned SheetJS CE 0.20.3 authoritative tarball distribution, not the stale public npm `xlsx` 0.18.5 package.

Responsibilities:
- enumerate all sheets;
- detect likely header row;
- support manual header-row override;
- handle leading blank/title rows;
- normalize duplicate/blank headers to safe physical names while preserving display text;
- expose formulas' cached/displayed results as data where available;
- never execute macros/VBA;
- infer types from a representative sample plus full validation during snapshot.

## Delimited text adapter

CSV/TSV:
- delimiter detection with explicit override;
- quote/escape handling;
- encoding detection/fallback UI;
- header/no-header selection;
- one source object per file;
- streaming snapshot for large files.

## JSON adapter

Supports JSON, JSONL and NDJSON.

Candidate discovery:
- root array → one dataset;
- top-level object containing multiple table-like arrays → multiple candidates;
- nested objects → flatten/keep JSON options;
- arrays inside rows → explode/keep JSON options.

## Parquet adapter

Use DuckDB-native analytical import where possible. Preserve source column types and nested metadata safely.

## Arrow adapter

Supports Arrow IPC/Feather. Use Apache Arrow JS for format handling and hand off a typed table/stream to the snapshot pipeline.

## SQLite adapter

Read-only source file. Discover user tables/views. Do not mutate the source. Snapshot selected objects into project DuckDB.

## DuckDB adapter

Read-only external DuckDB source. Discover schemas/tables/views. Do not treat an arbitrary DuckDB file as an OB-DaVi project unless its project metadata validates.

## PostgreSQL adapter

Read-only user-initiated connection. Discover schemas/tables/views. Remote/LAN/localhost are allowed. Credentials remain local. Snapshot selected objects.

## MySQL/MariaDB adapter

Same rules as PostgreSQL. Discover databases/tables/views allowed by the supplied read-only account.

## SQL Server adapter

Same rules as PostgreSQL. Use the cross-platform pure-JS/default driver path where practical.

## Refresh and schema drift

Refresh must never destroy the current snapshot until the replacement is validated.

1. import to staging relation;
2. infer schema;
3. match source columns against stable field identity;
4. classify unchanged/added/removed/type-changed/ambiguous;
5. calculate dependent formulas/relationships/visuals affected;
6. require user mapping for ambiguous changes;
7. compile transformations and run validation against staging;
8. transactionally swap snapshot and update revision;
9. discard staging on cancellation/failure.

## No auto-refresh

v1 refresh is explicit. OB-DaVi does not poll or reconnect to source databases in the background.
