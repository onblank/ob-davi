# Releasing OB-DaVi

## Versioning and release pull requests

OB-DaVi follows Semantic Versioning. Conventional Commits feed Release Please, which owns version,
changelog, tag and GitHub Release creation.

Release automation authenticates through the organization-owned GitHub App configured with:

- Actions variable `ONBLANK_RELEASE_APP_ID`;
- Actions secret `ONBLANK_RELEASE_APP_PRIVATE_KEY`.

The app is installed only on repositories that use this release workflow. It needs repository
metadata read access plus Contents, Issues and Pull requests read/write access. It must not receive
administration access, approve pull requests, merge pull requests or bypass protected branches.

Never create or recreate a Release Please pull request manually. Its body contains machine-readable
release metadata that the action needs in order to create the tag and GitHub Release after merge.
Review the automated PR normally and merge it only after required CI succeeds.

## Native artifacts

Normal users receive native installers from GitHub Releases. The release workflow builds on Windows,
macOS and Linux, uploads the installers and publishes `SHA256SUMS`.

The workflow can also be dispatched manually with an existing `release_tag`. This recovery path
rebuilds and uploads native assets for an already-created GitHub Release; it does not calculate a
version or create a release pull request.
