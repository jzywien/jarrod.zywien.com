# jarrod.zywien.com

Personal résumé and profile site. Angular and Tailwind render the public page to
static HTML at build time. Its editorial layout uses a typographic name masthead,
a compact section index, and open, ruled résumé sections. A small TypeScript
Fastify server serves the generated files on Google App Engine Standard.

## Requirements

- Node.js 24.15 or later in the 24.x line
- npm 11 or a compatible npm release

Install the locked dependencies with:

```sh
npm ci
```

## Local development

Start the Angular development server with:

```sh
npm run dev
```

Open `http://localhost:4200/` to view the site while editing.
Edit résumé and profile content, including the concise placeholders for details
that have not been supplied, in `src/app/profile-content.ts`.

The compact sun/moon button switches between the resolved light and dark theme.
The default remains Dark; a saved System preference follows the device color
preference until the button is used. Theme choices are saved in browser storage
when available. Edit the shared palette tokens in `src/styles.css`. Printed
pages use a white background and dark text.

Build the static site and TypeScript server, then run the production server with:

```sh
npm run build
npm start
```

The Fastify server listens on `0.0.0.0` and uses `PORT`, defaulting to `8080`.
It serves `dist/client/browser` and returns 404 for routes that do not map to a
generated file. HTML and unhashed files revalidate; fingerprinted Angular
JavaScript and CSS bundles use a one-year immutable cache.

## Checks

Run the repository checks from the root:

```sh
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
```

The tests exercise prerendered profile HTML, static GET and HEAD responses,
content types, cache headers, missing files, dotfiles, and the static root
boundary.

## App Engine deployment

The App Engine Standard configuration uses Node.js 24, zero minimum instances,
and a maximum of two instances. HTTPS is enforced by `app.yaml`. During
deployment, the `gcp-build` hook builds the Angular static output and compiles
the TypeScript server. The instance startup command only runs the compiled
server; it does not build the application.

Deploy to the existing `jzywien` project with:

```sh
gcloud app deploy --project jzywien
```

Deployment is intentionally a manual command and is not run by the build or
verification scripts.
