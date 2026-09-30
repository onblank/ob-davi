CREATE TABLE IF NOT EXISTS obdavi_model.calculated_fields (
  id UUID PRIMARY KEY,
  dataset_id UUID NOT NULL REFERENCES obdavi_model.datasets(id),
  name VARCHAR NOT NULL,
  expression VARCHAR NOT NULL,
  ast_json JSON NOT NULL,
  output_type obdavi_model.field_data_type NOT NULL,
  semantic_role obdavi_model.field_semantic_role NOT NULL,
  format_json JSON,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  UNIQUE(dataset_id, name)
);

CREATE TABLE IF NOT EXISTS obdavi_model.measures (
  id UUID PRIMARY KEY,
  dataset_id UUID NOT NULL REFERENCES obdavi_model.datasets(id),
  name VARCHAR NOT NULL,
  expression VARCHAR NOT NULL,
  ast_json JSON NOT NULL,
  output_type obdavi_model.field_data_type NOT NULL,
  format_json JSON,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  UNIQUE(dataset_id, name)
);
