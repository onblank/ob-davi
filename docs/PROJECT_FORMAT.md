# `.obdavi` Project Format v1

An `.obdavi` file is a DuckDB database containing the full portable project snapshot and authoring model.

## Goals

- copy to another computer and open;
- dashboards continue to work with no source connection;
- no sidecar directory required;
- no embedded credentials;
- no absolute machine paths;
- explicit format version and SQL migrations.

## Source relinking

Portable project:

```text
source id
adapter kind
portable display name/hint
fingerprint
snapshot revision
```

Machine-local SQLite:

```text
(project id, source id) -> absolute file path
(project id, source id) -> local DB connection profile id
```

If a source cannot be found on another machine, the current project snapshot remains usable. The UI can offer `Relink source` or `Keep current snapshot`.

## Autosave

Authoring changes are persisted transactionally to `.obdavi`. The project is not a giant unsaved React document.

## Save As

`Save As` copies/creates a new valid project with a new project identity unless the operation explicitly means moving the same project.
