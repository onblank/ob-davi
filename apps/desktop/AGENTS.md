# AGENTS.md — apps/desktop

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Owns Electron main/preload/renderer and OS integration.

Rules:

- renderer never gets Node, raw fs, raw DuckDB/SQLite or credentials;
- main process composes use cases, it does not own analytics/domain rules;
- heavy jobs go to worker processes/threads;
- typed IPC and payload validation are mandatory;
- `contextIsolation: true`, `nodeIntegration: false`, sandbox renderer where compatible;
- no unsolicited network traffic;
- remote DB connection UI may only invoke explicit source-adapter operations;
- `.obdavi` file dialogs and native export dialogs belong here;
- do not duplicate data/model rules in React.

Brand placeholders live at `src/renderer/assets/brand`. Keep fixed CSS containers/object-fit so replacing the files does not require UI code changes.
