# Architecture

## Runtime

```text
┌───────────────────────────────┐
│ React renderer                │
│ canvas / model / dashboard UI │
└──────────────┬────────────────┘
               │ typed IPC
┌──────────────▼────────────────┐
│ Electron main                 │
│ composition + OS integration  │
└──────┬───────────────┬────────┘
       │               │
       │ jobs          │ local app state
       ▼               ▼
┌──────────────┐   ┌───────────┐
│ worker       │   │ SQLite    │
│ imports      │   │ settings  │
│ analytics    │   │ recents   │
│ exports      │   │ relinks   │
└──────┬───────┘   └───────────┘
       │
       ├──────────────┐
       ▼              ▼
┌──────────────┐  ┌──────────────┐
│ .obdavi      │  │ Source       │
│ DuckDB       │  │ adapters     │
│ portable     │  │ files / DBs  │
└──────────────┘  └──────────────┘
```

## Portable vs machine-local state

`.obdavi` is the portable project and contains data snapshots plus analytical/model/dashboard definitions.

Machine-local SQLite contains UI/application state, recent paths, relink information and encrypted connection-secret material. Moving an `.obdavi` file to another computer must preserve the dashboards even when original sources are unavailable.

## No OB-Tracker sharing

OB-DaVi deliberately duplicates its own brand tokens, UI primitives and runtime contracts. Similarity with OB-Tracker is not a reason to create a cross-repository dependency.
