CREATE TABLE IF NOT EXISTS connection_profiles (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('postgresql','mysql','sqlserver')),
  name TEXT NOT NULL,
  host TEXT NOT NULL,
  port INTEGER NOT NULL CHECK (port BETWEEN 1 AND 65535),
  database_name TEXT NOT NULL,
  username TEXT,
  ssl_mode TEXT,
  options_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS connection_secrets (
  profile_id TEXT PRIMARY KEY REFERENCES connection_profiles(id) ON DELETE CASCADE,
  encrypted_payload BLOB NOT NULL,
  encryption_provider TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS source_relinks (
  project_id TEXT NOT NULL,
  source_id TEXT NOT NULL,
  adapter_kind TEXT NOT NULL,
  local_locator_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY(project_id, source_id)
) STRICT;

CREATE TABLE IF NOT EXISTS window_state (
  window_key TEXT PRIMARY KEY,
  state_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;
