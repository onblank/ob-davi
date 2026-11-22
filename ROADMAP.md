# OB-DaVi — Development Roadmap

**Baseline:** `f4ace79` on `dev`. **Next:** 1.2, create and reopen a portable project through the app.

## Objective

Turn local data into reproducible analysis and dashboards. A user can create a portable
`.obdavi` DuckDB project, import data, prepare and query it, build a dashboard and export it.
Projects work offline once imported. Explicit read-only database import or refresh may use the
network. The [v1 scope](docs/V1_SCOPE.md) defines the supported product capabilities.

## How to maintain this roadmap

- `[x]` requires evidence for the named outcome on `dev`. A registered adapter, placeholder
  screen or SQL file alone does not close a user journey. Close a phase after its iterations and exit
  criterion pass.
- Take the first ready iteration unless the owner changes priority. In the same PR, record the
  acceptance evidence and PR/commit, then update **Next**. Follow [AGENTS.md](AGENTS.md) for
  integration and promotion.

| Phase | Outcome                               | Status                                            |
| ----- | ------------------------------------- | ------------------------------------------------- |
| 1     | Portable project lifecycle            | Scaffold verified, project migration journey open |
| 2     | Import, preview and refresh           | Adapter contracts and registry present            |
| 3     | Preparation and analysis              | Domain/query foundations present                  |
| 4     | Visual analysis and dashboards        | Open                                              |
| 5     | Export, resilience and native release | Release workflow present, product acceptance open |

## [ ] Phase 1 — Portable project lifecycle

- [x] **1.1 — Toolchain and boundaries.** Establish the desktop shell, workspace packages,
      SQLite settings migration, adapter registry and build checks. The
      [scaffold validation](SCAFFOLD_VALIDATION.md) records the first full repository check.
- [ ] **1.2 — Project creation, open and migrations.** Implement create/open/save/reopen against
      the [project format](docs/PROJECT_FORMAT.md). Exercise actual DuckDB migrations on fresh and
      existing projects, fail safely on incompatible or damaged files and verify an interrupted write
      leaves the last valid project usable.
- [ ] **1.3 — Local settings and relocation.** Reopen a copied project on another machine/profile.
      Verify recents, explicit relinking and the separation of portable project data from local
      settings, credentials and machine paths.

**Exit:** an actual project opens after restart, relocation and supported upgrades, with its
contents intact when sources are unavailable.

## [ ] Phase 2 — Source acquisition and snapshot refresh

- [ ] **2.1 — First import journey.** Start with CSV/TSV. Discover, preview and infer fields, allow
      type correction, and commit an immutable snapshot. Verify cancellation, invalid inputs and that
      the project opens with its snapshot after the original file is removed.
- [ ] **2.2 — Remaining file adapters.** Add and verify Excel, JSON/JSONL/NDJSON,
      Parquet, Arrow/Feather, SQLite and DuckDB, plus text PDF. Cover multi-object discovery and apply
      the [PDF confidence policy](docs/PDF_EXTRACTION.md) before publishing extracted results.
- [ ] **2.3 — Explicit database imports.** Verify PostgreSQL, MySQL/MariaDB and SQL Server with
      read-only access, correctly scoped discovery and secure machine-local profiles. Exercise revoked
      credentials, connection failure and cancellation under [the privacy rules](docs/NETWORK_AND_PRIVACY.md).
- [ ] **2.4 — Atomic refresh and schema drift.** Stage replacements and present compatible and
      incompatible changes for review. Preserve the original snapshot on error or cancellation and
      verify stable field IDs and dependencies after an accepted refresh.

**Exit:** every documented adapter has real fixture or database evidence for its supported scope,
and a failed refresh keeps the last accepted snapshot usable.

## [ ] Phase 3 — Preparation and query engine

- [ ] **3.1 — Non-destructive preparation.** Persist and replay the transformations in
      [the preparation spec](docs/DATA_PREPARATION.md). Verify edits, previews, invalid steps and
      cancellation while preserving imported raw data.
- [ ] **3.2 — Relationships, calculated columns and measures.** Validate relationship cardinality,
      formula types and aggregations on known datasets. Exercise invalid/cyclic references, field
      changes and multiple grain scenarios using the documented formula and data-model constraints.
- [ ] **3.3 — Filters and pivots.** Verify typed filtering, aggregation, totals and pivot queries
      against fixed expected results. Use bounded preview execution and keep long-running jobs
      cancellable from the desktop.

**Exit:** reopening a project reproduces its prepared data and known analytical results.

## [ ] Phase 4 — Interactive dashboards

- [ ] **4.1 — Visuals and chart catalog.** Build chart authoring on the analytical query
      interfaces. Cover the [v1 visualization catalog](docs/VISUALIZATIONS.md), including pivot-based
      charts and invalid field assignments.
- [ ] **4.2 — Dashboard authoring.** Build multiple editable canvas dashboards with persisted
      layout, visual configuration, filters and slicers. Verify reopening and editing without losing
      configuration.
- [ ] **4.3 — Cross-filtering.** Verify selections propagate along supported relationships, can
      be cleared and produce deterministic results when filters overlap or a source is refreshed.

**Exit:** a user can build, reopen and interact with a dashboard based on imported datasets and
trusted query results.

## [ ] Phase 5 — Export and native release

- [ ] **5.1 — Exports.** Verify PDF/PNG/SVG and CSV/XLSX where appropriate against
      [the export spec](docs/EXPORTS.md). Compare output with the selected data and filter state and
      verify failed/cancelled exports preserve the project.
- [ ] **5.2 — Desktop resilience and native acceptance.** Verify representative large data,
      cancellation, offline reopening and project/credential privacy. Exercise fresh install and
      upgrade on Windows, macOS and Linux with real project/import/export journeys.
- [ ] **5.3 — Publish v1.** Rehearse the [release workflow](docs/RELEASING.md), verify downloadable
      installers and checksums, document platform trust/signing status and record owner approval.

**Exit:** validated artifacts install and run the v1 journey on all supported platforms.

Adapter implementation can proceed in parallel after the first import contract is proven. Chart
and dashboard acceptance depends on the analytical queries. Full release acceptance depends on all
required capabilities in the v1 scope.
