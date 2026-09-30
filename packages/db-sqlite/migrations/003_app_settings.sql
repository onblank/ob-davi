CREATE TABLE IF NOT EXISTS app_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  language TEXT NOT NULL DEFAULT 'system',
  locale TEXT NOT NULL DEFAULT 'system',
  theme TEXT NOT NULL DEFAULT 'system' CHECK (theme IN ('system','light','dark')),
  recent_project_limit INTEGER NOT NULL DEFAULT 12 CHECK (recent_project_limit BETWEEN 1 AND 100),
  confirm_medium_confidence_pdf INTEGER NOT NULL DEFAULT 1 CHECK (confirm_medium_confidence_pdf IN (0,1)),
  updated_at TEXT NOT NULL
) STRICT;
