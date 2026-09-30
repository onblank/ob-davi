CREATE TABLE IF NOT EXISTS obdavi_model.transformations (
  id UUID PRIMARY KEY,
  dataset_id UUID NOT NULL REFERENCES obdavi_model.datasets(id),
  step_order INTEGER NOT NULL CHECK (step_order >= 0),
  operation obdavi_model.transformation_kind NOT NULL,
  config_json JSON NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  UNIQUE(dataset_id, step_order)
);
