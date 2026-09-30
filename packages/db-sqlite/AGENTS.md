# AGENTS.md — packages/db-sqlite

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Machine-local state only. Never put portable project/dashboard/model state here.

Allowed: app settings, recents, source relinks, local connection profiles, encrypted secret blobs, window state.

No plaintext passwords. Use explicit SQL migrations. SQLite-specific behavior must not leak into domain.
