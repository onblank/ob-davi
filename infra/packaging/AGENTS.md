# AGENTS.md — infra/packaging

Also read `../../AGENTS.md` and `../../../AGENTS.md`; both remain applicable to this subtree.

Owns installers/releases for Windows, macOS and Linux.

Normal users must receive installable artifacts without Node, pnpm, env files or programming knowledge.

No signing secrets in repository files. Signing/notarization credentials live only in release CI secrets.
