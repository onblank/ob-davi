# AGENTS.md — packages/importers

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Each source adapter is isolated behind the common adapter contract.

Source data is untrusted. Do not execute spreadsheet macros, embedded scripts or PDF content.

PDF: text only, confidence-gated, preview required, no OCR in v1.

PostgreSQL/MySQL/SQL Server: explicit user connection, read-only semantics, snapshot import, no background refresh, no portable credentials.
