CREATE TABLE IF NOT EXISTS obdavi_model.filters (
  id UUID PRIMARY KEY,
  scope_type obdavi_model.filter_scope_type NOT NULL,
  scope_id UUID NOT NULL,
  field_ref_kind obdavi_model.field_reference_kind NOT NULL,
  field_ref_id UUID NOT NULL,
  operator obdavi_model.filter_operator NOT NULL,
  value_json JSON,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS obdavi_model.project_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  locale VARCHAR NOT NULL DEFAULT 'system',
  timezone VARCHAR NOT NULL DEFAULT 'system',
  theme_json JSON NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL
);
