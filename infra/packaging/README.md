# Packaging

`electron-builder` is configured from `apps/desktop/electron-builder.yml`.

Targets:
- Windows: NSIS `.exe`
- macOS: `.dmg`
- Linux: `.AppImage` and `.deb`

Signing/notarization is intentionally not configured through repository `.env` files. Official release credentials belong in GitHub Actions Secrets when certificates/accounts are available.

The public website can later link directly to signed release artifacts or mirror them behind onblanksystems.com without changing the desktop runtime architecture.
