# AGENTS.md — packages/contracts

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Define capabilities, not implementations.

No SQL strings, Electron types, React types or concrete database handles in public ports.

Source adapters expose probe/discovery/preview/snapshot semantics. Analytics runs through a worker-facing port. Long operations must support AbortSignal/progress where practical.
