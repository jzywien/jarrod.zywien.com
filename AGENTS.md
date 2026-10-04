# Project guidance

This is a personal résumé/profile website: Angular and Tailwind generate static
HTML at build time; a small TypeScript Fastify server serves it on Google App
Engine Standard with Node.js 24. Keep the architecture and dependencies minimal.

## Implementation

- Use the latest stable compatible releases. Check Angular compiler, Node,
  TypeScript, test runner, and Fastify plugin compatibility before installing.
  Commit one npm lockfile; use `npm ci` for reproducible installs.
- Use Angular CLI's current build tooling, standalone components, zoneless change
  detection, strict TypeScript, and strict template checking.
- Use signals for mutable local state and computed signals for derived state.
  Prefer modern template control flow and signal inputs/outputs where needed.
  Use RxJS for asynchronous streams when it adds value; avoid unnecessary state
  libraries, services, modules, and abstractions.
- Keep components focused and profile content in a typed, easy-to-edit source.
  Never invent personal employment history or accomplishments; mark placeholders.
- Prerender public pages with Angular's static output mode. Essential profile
  content and metadata must be present in generated HTML without JavaScript.
  Keep rendering deterministic; initialize browser-only code in browser render
  hooks and avoid hydration mismatches.
- Use Tailwind's current PostCSS integration, shared design tokens, semantic
  HTML, responsive layouts, visible focus, appropriate contrast, reduced-motion
  support, and useful print styles. Avoid unnecessary UI dependencies.
- Enable strict typing throughout. Avoid `any`; narrow unknown values and validate
  external input. Prefer clear names, small functions, and explicit boundaries.
- Use ESM for the server and compile TypeScript before production startup. Keep
  the server focused on static files, with correct content types, GET/HEAD
  behavior, real 404s, structured logging, and graceful shutdown.
- Cache fingerprinted assets long-term with immutable caching; revalidate HTML
  and do not mark unhashed content immutable. Never serve source files, secrets,
  or arbitrary filesystem paths.
- Listen on `0.0.0.0` and `process.env.PORT` (8080 locally). Use
  `runtime: nodejs24` and a compatible `engines.node` major range. Build during
  deployment, never on instance startup; include necessary source/build config
  in uploads. Keep scaling and dependencies proportionate to a small static site.
- Preserve Git history and existing deployment identifiers. Remove obsolete app
  code and configuration. Do not deploy or publish as part of scaffolding.

## Verification and documentation

- Provide root commands for development, production build/start, lint, typecheck,
  tests, and formatting checks. Document exact commands and deployment behavior
  in README.md; keep this file in sync with the resulting scripts.
- Before completing changes, run `npm run lint`, `npm run typecheck`,
  `npm test`, `npm run format:check`, and `npm run build`.
- Test meaningful behavior: generated profile HTML, static GET/HEAD responses,
  asset content types/cache headers, missing routes/assets, and file boundaries.
  Do not add tests that merely repeat implementation details.
- Review the production site at desktop and mobile widths and verify keyboard
  navigation and print layout. Report any unavailable verification explicitly.
- Make focused changes; do not add APIs, authentication, databases, analytics,
  service workers, or deployment automation without a concrete requirement.

## Delegated implementation

Implementation is delegated to subagents. The primary agent maintains this file,
reviews work and verification results, and requests corrections; it does not
implement application changes. Coordinate ownership of shared configuration and
package files to prevent conflicting edits.
