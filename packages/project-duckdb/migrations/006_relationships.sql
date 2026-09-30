CREATE TABLE IF NOT EXISTS obdavi_model.relationships (
  id UUID PRIMARY KEY,
  from_dataset_id UUID NOT NULL REFERENCES obdavi_model.datasets(id),
  from_field_id UUID NOT NULL REFERENCES obdavi_model.fields(id),
  to_dataset_id UUID NOT NULL REFERENCES obdavi_model.datasets(id),
  to_field_id UUID NOT NULL REFERENCES obdavi_model.fields(id),
  cardinality obdavi_model.relationship_cardinality NOT NULL,
  filter_direction obdavi_model.relationship_filter_direction NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  CHECK (from_dataset_id <> to_dataset_id OR from_field_id <> to_field_id)
);
