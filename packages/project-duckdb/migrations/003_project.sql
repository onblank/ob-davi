CREATE TABLE IF NOT EXISTS obdavi_meta.project (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  format_version INTEGER NOT NULL CHECK (format_version >= 1),
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS obdavi_meta.migrations (
  version INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL,
  applied_at TIMESTAMPTZ NOT NULL
);
