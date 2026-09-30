# Data Model v1

The project file is a DuckDB database with the `.obdavi` extension.

## Schemas

```text
obdavi_meta   project identity/migrations
obdavi_model  portable semantic/authoring model
obdavi_raw    imported immutable snapshot tables
obdavi_data   prepared views/tables
obdavi_cache  disposable analytical/materialized caches
```

## Portable metadata tables

### `obdavi_meta.project`

- `id UUID PK`
- `name VARCHAR NOT NULL`
- `description VARCHAR NULL`
- `format_version INTEGER NOT NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

Singleton project row.

### `obdavi_meta.migrations`

- `version INTEGER PK`
- `name VARCHAR NOT NULL`
- `applied_at TIMESTAMPTZ NOT NULL`

## Model

### `obdavi_model.sources`

Portable source identity only. Never credentials or absolute machine paths.

- `id UUID PK`
- `adapter_kind source_adapter_kind NOT NULL`
- `display_name VARCHAR NOT NULL`
- `portable_hint VARCHAR NULL` — e.g. original file name or database display name
- `source_fingerprint VARCHAR NULL`
- `snapshot_revision INTEGER NOT NULL DEFAULT 1`
- `imported_at TIMESTAMPTZ NOT NULL`
- `last_refreshed_at TIMESTAMPTZ NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

### `obdavi_model.source_objects`

Tracks every logical object discovered in a source.

- `id UUID PK`
- `source_id UUID FK NOT NULL`
- `external_key VARCHAR NOT NULL` — stable adapter-specific identity where available
- `display_name VARCHAR NOT NULL`
- `object_kind source_object_kind NOT NULL`
- `ordinal INTEGER NOT NULL`
- `metadata_json JSON NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`
- UNIQUE `(source_id, external_key)`

Examples: Excel sheet, PDF table candidate, JSON top-level array, DB table/view.

### `obdavi_model.datasets`

- `id UUID PK`
- `source_object_id UUID FK NULL`
- `name VARCHAR NOT NULL`
- `description VARCHAR NULL`
- `raw_relation_name VARCHAR NULL`
- `prepared_relation_name VARCHAR NOT NULL`
- `row_count UBIGINT NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

Derived datasets may have no `source_object_id`.

### `obdavi_model.fields`

Stable field identity. Downstream objects reference `id`, never display names.

- `id UUID PK`
- `dataset_id UUID FK NOT NULL`
- `source_field_key VARCHAR NULL`
- `physical_name VARCHAR NOT NULL`
- `display_name VARCHAR NOT NULL`
- `data_type field_data_type NOT NULL`
- `semantic_role field_semantic_role NOT NULL`
- `nullable BOOLEAN NOT NULL`
- `ordinal INTEGER NOT NULL`
- `format_kind field_format_kind NOT NULL DEFAULT 'general'`
- `format_json JSON NULL`
- `inference_confidence DOUBLE NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`
- UNIQUE `(dataset_id, physical_name)`

### `obdavi_model.relationships`

- `id UUID PK`
- `from_dataset_id UUID FK NOT NULL`
- `from_field_id UUID FK NOT NULL`
- `to_dataset_id UUID FK NOT NULL`
- `to_field_id UUID FK NOT NULL`
- `cardinality relationship_cardinality NOT NULL`
- `filter_direction relationship_filter_direction NOT NULL`
- `is_active BOOLEAN NOT NULL DEFAULT TRUE`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

N:N is modeled through a bridge dataset rather than a magic direct relationship.

### `obdavi_model.transformations`

Ordered non-destructive preparation steps.

- `id UUID PK`
- `dataset_id UUID FK NOT NULL`
- `step_order INTEGER NOT NULL`
- `operation transformation_kind NOT NULL`
- `config_json JSON NOT NULL`
- `is_enabled BOOLEAN NOT NULL DEFAULT TRUE`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`
- UNIQUE `(dataset_id, step_order)`

### `obdavi_model.calculated_fields`

Row-context expressions.

- `id UUID PK`
- `dataset_id UUID FK NOT NULL`
- `name VARCHAR NOT NULL`
- `expression VARCHAR NOT NULL`
- `ast_json JSON NOT NULL`
- `output_type field_data_type NOT NULL`
- `semantic_role field_semantic_role NOT NULL`
- `format_json JSON NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

### `obdavi_model.measures`

Filter/aggregation-context expressions.

- `id UUID PK`
- `dataset_id UUID FK NOT NULL`
- `name VARCHAR NOT NULL`
- `expression VARCHAR NOT NULL`
- `ast_json JSON NOT NULL`
- `output_type field_data_type NOT NULL`
- `format_json JSON NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

### `obdavi_model.pivot_definitions`

- `id UUID PK`
- `name VARCHAR NOT NULL`
- `definition_json JSON NOT NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

Definition contains ordered rows, columns, values/measures, filters, sort, subtotals and totals. All field references use IDs.

### `obdavi_model.visualizations`

Persist OB-DaVi definitions, not ECharts options.

- `id UUID PK`
- `name VARCHAR NOT NULL`
- `kind visualization_kind NOT NULL`
- `pivot_definition_id UUID FK NULL`
- `query_definition_json JSON NOT NULL`
- `encoding_json JSON NOT NULL`
- `style_json JSON NOT NULL`
- `interaction_json JSON NOT NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

### `obdavi_model.dashboards`

- `id UUID PK`
- `name VARCHAR NOT NULL`
- `description VARCHAR NULL`
- `ordinal INTEGER NOT NULL`
- `canvas_json JSON NOT NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

### `obdavi_model.dashboard_widgets`

- `id UUID PK`
- `dashboard_id UUID FK NOT NULL`
- `widget_kind dashboard_widget_kind NOT NULL`
- `visualization_id UUID FK NULL`
- `x DOUBLE NOT NULL`
- `y DOUBLE NOT NULL`
- `width DOUBLE NOT NULL`
- `height DOUBLE NOT NULL`
- `z_index INTEGER NOT NULL DEFAULT 0`
- `config_json JSON NOT NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

### `obdavi_model.filters`

Persisted visual/dashboard filters. Interactive selections are ephemeral runtime state.

- `id UUID PK`
- `scope_type filter_scope_type NOT NULL`
- `scope_id UUID NOT NULL`
- `field_ref_kind field_reference_kind NOT NULL`
- `field_ref_id UUID NOT NULL`
- `operator filter_operator NOT NULL`
- `value_json JSON NULL`
- `is_enabled BOOLEAN NOT NULL DEFAULT TRUE`
- `created_at TIMESTAMPTZ NOT NULL`
- `updated_at TIMESTAMPTZ NOT NULL`

### `obdavi_model.project_settings`

Portable presentation/model defaults only, for example report locale/time zone and project theme configuration. User application preferences are local SQLite settings.

## Dynamic relations

`obdavi_raw` relations contain source snapshots. Their names are generated from stable dataset/source-object IDs, not user text.

`obdavi_data` contains prepared views/tables generated from transformation definitions.

`obdavi_cache` is disposable and must never be the only copy of domain state.

## Local SQLite model

Machine-only tables:
- `schema_migrations`;
- `app_settings`;
- `recent_projects`;
- `source_relinks`;
- `connection_profiles`;
- `connection_secrets` (encrypted bytes only);
- `window_state`.

None of these are embedded into `.obdavi` as machine-specific state.
