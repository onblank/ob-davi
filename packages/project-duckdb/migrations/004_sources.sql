CREATE TABLE IF NOT EXISTS obdavi_model.sources (
  id UUID PRIMARY KEY,
  adapter_kind obdavi_model.source_adapter_kind NOT NULL,
  display_name VARCHAR NOT NULL,
  portable_hint VARCHAR,
  source_fingerprint VARCHAR,
  snapshot_revision INTEGER NOT NULL DEFAULT 1 CHECK (snapshot_revision >= 1),
  imported_at TIMESTAMPTZ NOT NULL,
  last_refreshed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS obdavi_model.source_objects (
  id UUID PRIMARY KEY,
  source_id UUID NOT NULL REFERENCES obdavi_model.sources(id),
  external_key VARCHAR NOT NULL,
  display_name VARCHAR NOT NULL,
  object_kind obdavi_model.source_object_kind NOT NULL,
  ordinal INTEGER NOT NULL CHECK (ordinal >= 0),
  metadata_json JSON,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  UNIQUE(source_id, external_key)
);
