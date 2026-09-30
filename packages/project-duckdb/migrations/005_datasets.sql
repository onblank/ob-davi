CREATE TABLE IF NOT EXISTS obdavi_model.datasets (
  id UUID PRIMARY KEY,
  source_object_id UUID REFERENCES obdavi_model.source_objects(id),
  name VARCHAR NOT NULL,
  description VARCHAR,
  raw_relation_name VARCHAR,
  prepared_relation_name VARCHAR NOT NULL UNIQUE,
  row_count UBIGINT,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS obdavi_model.fields (
  id UUID PRIMARY KEY,
  dataset_id UUID NOT NULL REFERENCES obdavi_model.datasets(id),
  source_field_key VARCHAR,
  physical_name VARCHAR NOT NULL,
  display_name VARCHAR NOT NULL,
  data_type obdavi_model.field_data_type NOT NULL,
  semantic_role obdavi_model.field_semantic_role NOT NULL,
  nullable BOOLEAN NOT NULL,
  ordinal INTEGER NOT NULL CHECK (ordinal >= 0),
  format_kind obdavi_model.field_format_kind NOT NULL DEFAULT 'general',
  format_json JSON,
  inference_confidence DOUBLE CHECK (inference_confidence IS NULL OR (inference_confidence >= 0 AND inference_confidence <= 1)),
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  UNIQUE(dataset_id, physical_name)
);
