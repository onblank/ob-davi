# Security

OB-DaVi processes untrusted files and may connect to databases chosen by the user.

Please report security vulnerabilities privately through the repository's GitHub security advisory flow rather than filing a public issue.

Core security assumptions:

- renderer has no Node, raw filesystem, DB or credential access;
- source files are untrusted input;
- formulas are parsed into a validated AST and never evaluated as JavaScript;
- visual definitions do not execute arbitrary code;
- database connectors are read-only import/refresh boundaries;
- secrets are stored locally using OS-protected encryption where available;
- credentials are never written to `.obdavi` projects;
- OB-DaVi performs no unsolicited outbound network calls.
