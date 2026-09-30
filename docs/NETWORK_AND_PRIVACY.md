# Network and Privacy

OB-DaVi is local-first and zero-cloud-dependency.

## Allowed network activity

Only explicit database source connections initiated by the user:
- PostgreSQL;
- MySQL/MariaDB;
- SQL Server.

These may target localhost, LAN or a remote host supplied by the user.

## Forbidden runtime activity

- onBlank backend calls;
- telemetry;
- product analytics;
- advertising SDKs;
- crash upload without explicit future design change;
- account/login;
- Google Sheets;
- OAuth SaaS connectors;
- arbitrary HTTP/API ingestion in v1;
- remote fonts/assets;
- hidden/background refresh.

## Snapshot semantics

Remote data is copied into the project. Losing network/source access does not invalidate the existing dashboard.
