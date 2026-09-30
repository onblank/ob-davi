CREATE TABLE IF NOT EXISTS obdavi_model.pivot_definitions (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  definition_json JSON NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS obdavi_model.visualizations (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  kind obdavi_model.visualization_kind NOT NULL,
  pivot_definition_id UUID REFERENCES obdavi_model.pivot_definitions(id),
  query_definition_json JSON NOT NULL,
  encoding_json JSON NOT NULL,
  style_json JSON NOT NULL,
  interaction_json JSON NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);
