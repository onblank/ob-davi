CREATE TABLE IF NOT EXISTS obdavi_model.dashboards (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  ordinal INTEGER NOT NULL CHECK (ordinal >= 0),
  canvas_json JSON NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  UNIQUE(ordinal)
);

CREATE TABLE IF NOT EXISTS obdavi_model.dashboard_widgets (
  id UUID PRIMARY KEY,
  dashboard_id UUID NOT NULL REFERENCES obdavi_model.dashboards(id),
  widget_kind obdavi_model.dashboard_widget_kind NOT NULL,
  visualization_id UUID REFERENCES obdavi_model.visualizations(id),
  x DOUBLE NOT NULL,
  y DOUBLE NOT NULL,
  width DOUBLE NOT NULL CHECK (width > 0),
  height DOUBLE NOT NULL CHECK (height > 0),
  z_index INTEGER NOT NULL DEFAULT 0,
  config_json JSON NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  CHECK ((widget_kind = 'visualization' AND visualization_id IS NOT NULL) OR widget_kind <> 'visualization')
);
