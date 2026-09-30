CREATE TABLE IF NOT EXISTS recent_projects (
  project_id TEXT PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  last_opened_at TEXT NOT NULL,
  is_pinned INTEGER NOT NULL DEFAULT 0 CHECK (is_pinned IN (0,1))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_recent_projects_last_opened ON recent_projects(last_opened_at DESC);
