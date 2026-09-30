# OB-DaVi

**OB-DaVi (Data Visualizer)** is an open-source desktop application by onBlank for importing, preparing, relating, analyzing and visualizing data locally.

Its product principle is simple:

> Drop or connect data. Build a model. Explore it. Build dashboards. Keep the project portable.

OB-DaVi is a completely separate product and repository from OB-Tracker. It shares the onBlank brand language and some engineering conventions, but **no code, packages, UI library, contracts or runtime dependencies are shared between the products**.

## Product boundaries

- Desktop application: Electron + React + TypeScript.
- Portable project: one `.obdavi` file backed by DuckDB.
- Local application metadata: SQLite.
- Analytics: DuckDB, outside the renderer.
- Charts: Apache ECharts through an OB-DaVi visualization model.
- No account, auth, telemetry, analytics service, cloud backend or onBlank connectivity.
- No Google Sheets or SaaS/API connectors in v1.
- User-initiated PostgreSQL, MySQL/MariaDB and SQL Server connections are allowed for import/refresh.
- Remote data is snapshotted into the `.obdavi` project. Dashboards remain usable when the source is unavailable.
- Credentials and absolute local source paths never travel inside `.obdavi`.

## v1 source adapters

- Excel: XLSX, XLS, XLSM data, XLSB, ODS (macros are never executed)
- CSV / TSV
- JSON / JSONL / NDJSON
- Parquet
- Apache Arrow IPC / Feather
- text-based PDFs with reliable tabular extraction
- SQLite database files
- DuckDB database files
- PostgreSQL
- MySQL / MariaDB
- Microsoft SQL Server

Scanned/image-only PDFs are intentionally unsupported in v1. Low-confidence PDF extraction is blocked rather than importing unreliable data.

## v1 analytics and authoring

- multi-object imports (all Excel sheets and all selected source objects are tracked);
- schema/type inference and manual overrides;
- non-destructive data preparation pipeline;
- relationships from day one;
- calculated columns and context-aware measures;
- tables and pivot tables;
- KPI cards;
- bar, line, area, pie, scatter, histogram, heatmap, treemap, waterfall, funnel, gauge, boxplot and combo charts;
- visual filters, dashboard filters/slicers and interactive cross-filtering;
- multiple dashboards per project;
- PDF/PNG dashboard export, SVG/PNG visual export and CSV/XLSX table export.

## Development

Requirements:

- Node 24 LTS
- pnpm 12.6.0

```bash
corepack enable
corepack prepare pnpm@12.6.0 --activate
pnpm install
pnpm dev
```

There is intentionally no required `.env` file.

Before changing the repository, read [`AGENTS.md`](./AGENTS.md) and the nearest scoped `AGENTS.md` file.
