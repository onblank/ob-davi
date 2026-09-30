# AGENTS.md — OB-DaVi

This repository belongs to the onBlank Group workspace.

Before making cross-product, AI, finance, billing, support, privacy, security, integration or shared
contract changes, agents must also read `../AGENTS.md`. If it is unavailable, ask the user for the
global onBlank context.

The global network-integration model does not authorize OB-DaVi to connect to another onBlank
project. The zero-cloud, explicit source access and snapshot portability rules below are stricter
and remain authoritative.

## Product

**OB-DaVi (Data Visualizer)** is an open-source desktop data preparation, analytics and dashboarding application by onBlank.

Repository: `ob-davi`  
Packages: `@obdavi/*`  
Application ID: `com.onblanksystems.obdavi`  
Portable project extension: `.obdavi`  
License: Apache-2.0

OB-DaVi and OB-Tracker are separate products. Never create a dependency on OB-Tracker or a shared onBlank package merely because visual styles or engineering patterns look similar.

## Non-negotiable product boundaries

OB-DaVi has **zero cloud dependency**.

It must never require:
- an OB-DaVi/onBlank account;
- authentication to onBlank;
- telemetry or product analytics;
- a cloud backend;
- remote feature flags;
- online activation;
- Google Sheets;
- SaaS API connectors;
- remotely hosted fonts/assets;
- background calls to onBlank or GitHub.

### User-initiated database network access is allowed

The user may explicitly configure PostgreSQL, MySQL/MariaDB or SQL Server running on localhost, LAN or a remote host.

Rules:
- connection is initiated by the user;
- connector is read-only from OB-DaVi's perspective;
- imported data is snapshotted into the `.obdavi` project;
- refresh is explicit, never hidden/background sync;
- a source going offline must not break the current project snapshot;
- credentials must never be stored in `.obdavi`;
- absolute local file paths must not be portable project data.

## Project format

A `.obdavi` file is a portable DuckDB database owned by OB-DaVi.

It contains:
- imported raw snapshots;
- prepared dataset definitions/views;
- portable source metadata without credentials/absolute local locators;
- field metadata;
- relationships;
- transformation pipelines;
- calculated fields;
- measures;
- pivots;
- visualizations;
- dashboards/widgets;
- filters;
- portable project settings.

Local machine metadata belongs in the application SQLite DB, not in `.obdavi`.

## Source adapters required for v1

File adapters:
- Excel: XLSX/XLS/XLSM/XLSB/ODS, data only, never execute macros;
- CSV/TSV;
- JSON/JSONL/NDJSON;
- Parquet;
- Arrow IPC/Feather;
- PDF text table extraction;
- SQLite file;
- DuckDB file.

Database adapters:
- PostgreSQL;
- MySQL/MariaDB;
- Microsoft SQL Server.

Every adapter follows the same lifecycle:

```text
probe → discover source objects → preview → infer → snapshot → validate → commit
                                                       ↑
                                                    refresh
```

Every logical object is tracked separately: Excel sheet, detected PDF table, JSON table candidate, DB table/view, etc.

## PDF safety rule

v1 supports genuine text PDFs only. No OCR.

Never import a low-confidence table candidate.

Confidence policy:
- high: importable after preview;
- medium: explicit user inspection/confirmation required;
- low: blocked with a clear explanation;
- image-only/scanned PDF: unsupported with a clear OCR-not-supported message.

Never optimize for “we extracted something” over correctness.

## Data model and schema drift

Fields use stable UUIDs. Visuals, formulas and relationships reference field IDs, never display names.

During refresh:
- stage new snapshot;
- infer new schema;
- compare source field identity;
- preserve field UUIDs for confidently matched columns;
- added columns receive new IDs;
- removed/retyped/ambiguous columns must surface dependency impact;
- ambiguous rename mapping requires user resolution;
- current snapshot remains intact if refresh fails/cancels;
- commit refreshed snapshot atomically after validation.

## Data preparation

Raw snapshot data is immutable from the user's perspective.

Transformations are ordered, non-destructive steps producing prepared datasets/views.

v1 must support at least:
- rename/reorder/remove columns;
- type changes;
- filtering/sorting/distinct/deduplication;
- value replacement;
- null remove/replace/fill forward/fill backward;
- string trim/case/substring/split/merge/regex extract/replace;
- numeric arithmetic/round/abs;
- date parsing and date parts;
- conditional/calculated columns;
- pivot/unpivot;
- group/aggregate;
- joins/merges;
- append/union;
- JSON flatten/explode;
- index columns.

## Formula engine

Calculated columns and measures are different concepts.

- calculated column: row context;
- measure: aggregation/filter context.

Formulas are parsed into an OB-DaVi AST, validated, then compiled to DuckDB SQL.

Forbidden:
- JavaScript `eval`;
- arbitrary JavaScript;
- executable user plugins in formula text;
- interpolating formula text directly into SQL;
- arbitrary SQL masquerading as a formula.

## Relationships

v1 supports:
- 1:1;
- 1:N;
- N:1;
- N:N through explicit bridge datasets.

Relationship definitions include filtering direction and active state.

Reject or require resolution for ambiguous active relationship paths that make filter propagation nondeterministic.

## Filtering

Keep these concepts distinct:
- preparation filter: changes prepared dataset;
- visual filter: affects one visualization;
- dashboard filter/slicer: affects compatible dashboard visuals;
- interactive selection: temporary cross-filter generated by interaction.

Cross-filtering is required in v1.

## Pivots

Pivot definitions are first-class persisted objects.

They support:
- rows;
- columns;
- values/measures;
- filters;
- sorting;
- subtotals/grand totals.

One pivot definition can be rendered as a matrix/pivot table or used as the analytical source of a compatible chart.

## Visualizations

Persist OB-DaVi's own `VisualizationDefinition`, not raw ECharts configuration.

Use an adapter:

```text
OB-DaVi visualization definition
          ↓
visualization-engine
          ↓
ECharts option
```

v1 visualization kinds include:
- table;
- pivot table;
- KPI/card;
- bar/horizontal/grouped/stacked bar;
- line;
- area/stacked area;
- pie/donut;
- scatter/bubble;
- histogram;
- heatmap;
- treemap;
- waterfall;
- funnel;
- gauge;
- boxplot;
- combo bar + line.

No online map dependency. Future mapping should prefer offline GeoJSON.

## Dashboarding

A project supports multiple dashboards.

Dashboard widgets support drag/resize/duplicate/copy-paste/alignment/z-order.

Widget kinds include at least visualization, slicer, text and KPI/visual references.

## Export

v1 supports:
- dashboard → PDF, PNG;
- individual visual → PNG, SVG where supported;
- table/pivot → CSV, XLSX.

Exports are snapshots for presentation/sharing and do not require OB-DaVi to view.

## Processes

Renderer must remain responsive.

Heavy operations run outside the renderer:
- imports;
- profiling;
- transformations;
- analytical queries;
- pivots;
- large aggregations;
- heavy exports.

Expected direction:

```text
React renderer
  ↓ typed IPC
Electron main
  ↓ job protocol
analytics/import worker
  ↓
DuckDB / source adapters
```

Long jobs support progress, cancellation and structured errors.

## Electron security

Required:
- `contextIsolation: true`;
- `nodeIntegration: false`;
- sandbox renderer where compatible;
- narrow preload bridge;
- typed IPC;
- payload validation;
- renderer has no raw filesystem/database/credential access.

## Credentials

Secrets are local-only and protected through OS-backed encryption where available.

Do not store database passwords:
- in `.obdavi`;
- in `.env`;
- in source code;
- in plain-text SQLite columns.

Connection profiles may store non-secret metadata locally; encrypted secret payloads are machine-local.

## Architecture

Use Clean Architecture.

```text
UI / Electron
      ↓
Application
      ↓
Domain
      ↑
Contracts
      ↑
Infrastructure adapters
```

Packages:
- `@obdavi/domain`
- `@obdavi/application`
- `@obdavi/contracts`
- `@obdavi/db-sqlite`
- `@obdavi/project-duckdb`
- `@obdavi/analytics-duckdb`
- `@obdavi/importers`
- `@obdavi/query-engine`
- `@obdavi/visualization-engine`
- `@obdavi/exporters`
- `@obdavi/settings`
- `@obdavi/ui`
- `@obdavi/shared`
- `@obdavi/test-utils`

Do not bypass package boundaries because a shortcut is easier.

## SQL

SQL is allowed only in DuckDB/SQLite infrastructure and query compilation layers.

User-facing domain/application/UI code must not contain persistence SQL.

DuckDB project migrations use explicit SQL and follow:
- `001_initials.sql`: schemas/types;
- `002_functions.sql`: macros/helper SQL functions when supported;
- subsequent feature migrations: tables, indexes and associated constraints/macros.

SQLite local migrations use the same numbering convention, adapted to SQLite's capabilities.

## Testing

Minimum test groups:
- schema inference;
- source-object discovery;
- PDF confidence/table detection;
- formula parser/compiler;
- transformation compiler;
- relationship validation;
- query planner;
- pivot query generation;
- cross-filter propagation;
- visualization adapter;
- snapshot refresh/schema drift;
- project migrations;
- local SQLite migrations;
- Electron IPC security-critical flows.

## Branding

Use onBlank tokens locally in this repository. Do not import branding from OB-Tracker or another repo.

Runtime assets are bundled locally.

Real logos can replace placeholder files in `apps/desktop/src/renderer/assets/brand/` without changing UI code. CSS constrains display dimensions and `object-fit`.

## Development

- Node 24
- pnpm only
- Turborepo
- TypeScript strict
- no required `.env`
- Conventional Commits
- SemVer

Before implementing a feature:
1. identify domain objects/rules;
2. identify use case;
3. define/update ports;
4. implement infrastructure adapter;
5. wire through typed IPC;
6. build UI last;
7. test the rule and failure paths.
