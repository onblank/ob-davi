# AGENTS.md — packages/application

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Use cases and orchestration only. Depend on domain/contracts, not concrete DB/file/network drivers.

Important use cases include project create/open, import, explicit refresh/relink, transformation editing, relationships, formulas/measures, pivot/visual/dashboard creation, cross-filter handling and exports.

Refresh must stage/validate before atomically replacing the current snapshot.
