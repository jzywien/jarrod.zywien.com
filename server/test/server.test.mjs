import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { createApp } from '../dist/app.js';

const temporaryDirectories = [];

after(async () => {
  await Promise.all(
    temporaryDirectories.map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

async function createFixture(files) {
  const directory = await mkdtemp(join(tmpdir(), 'profile-site-test-'));
  temporaryDirectories.push(directory);
  const root = join(directory, 'public');
  await mkdir(root);

  await Promise.all(
    Object.entries(files).map(async ([filePath, contents]) => {
      const destination = join(root, filePath);
      await mkdir(join(destination, '..'), { recursive: true });
      await writeFile(destination, contents);
    }),
  );

  return { directory, root };
}

test('serves static files with correct content types and cache headers', async () => {
  const { root } = await createFixture({
    'index.html': '<!doctype html><title>Profile</title>',
    'assets/main-ABCDEFGH.js': "console.log('fingerprinted');",
    'assets/styles.css': 'body { color: black; }',
    'assets/profile-placeholder.png': 'placeholder image',
    'assets/resume-download.pdf': 'placeholder PDF',
  });
  const app = await createApp(root);

  try {
    const page = await app.inject({ method: 'GET', url: '/' });
    assert.equal(page.statusCode, 200);
    assert.match(page.headers['content-type'], /^text\/html/);
    assert.equal(page.headers['cache-control'], 'public, max-age=0, must-revalidate');
    assert.match(page.payload, /Profile/);

    const script = await app.inject({ method: 'GET', url: '/assets/main-ABCDEFGH.js' });
    assert.equal(script.statusCode, 200);
    assert.match(script.headers['content-type'], /javascript/);
    assert.equal(script.headers['cache-control'], 'public, max-age=31536000, immutable');

    const stylesheet = await app.inject({ method: 'GET', url: '/assets/styles.css' });
    assert.equal(stylesheet.statusCode, 200);
    assert.match(stylesheet.headers['content-type'], /^text\/css/);
    assert.equal(stylesheet.headers['cache-control'], 'public, max-age=0, must-revalidate');

    for (const url of ['/assets/profile-placeholder.png', '/assets/resume-download.pdf']) {
      const asset = await app.inject({ method: 'GET', url });
      assert.equal(asset.statusCode, 200);
      assert.equal(asset.headers['cache-control'], 'public, max-age=0, must-revalidate');
    }
  } finally {
    await app.close();
  }
});

test('serves the prerendered profile home page from the production build', async () => {
  const app = await createApp();

  try {
    const response = await app.inject({ method: 'GET', url: '/' });
    assert.equal(response.statusCode, 200);
    assert.match(response.headers['content-type'], /^text\/html/);
    assert.match(response.payload, /<h1\b/);
    assert.match(response.payload, /Jarrod Zywien/);

    const scriptPath = response.payload.match(/<script src="([^"]+\.js)"/)?.[1];
    assert.ok(scriptPath, 'the prerendered page should reference a JavaScript bundle');
    const scriptUrl = new URL(scriptPath, 'http://localhost').pathname;
    const script = await app.inject({ method: 'GET', url: scriptUrl });
    assert.equal(script.statusCode, 200);
    assert.equal(script.headers['cache-control'], 'public, max-age=31536000, immutable');

    const stylesheetPath = response.payload.match(
      /<link rel="stylesheet" href="([^"]+\.css)"/,
    )?.[1];
    assert.ok(stylesheetPath, 'the prerendered page should reference a CSS bundle');
    const stylesheetUrl = new URL(stylesheetPath, 'http://localhost').pathname;
    const stylesheet = await app.inject({ method: 'GET', url: stylesheetUrl });
    assert.equal(stylesheet.statusCode, 200);
    assert.equal(stylesheet.headers['cache-control'], 'public, max-age=31536000, immutable');
  } finally {
    await app.close();
  }
});

test('supports HEAD with the same headers and no response body', async () => {
  const { root } = await createFixture({ 'index.html': '<main>Resume</main>' });
  const app = await createApp(root);

  try {
    const response = await app.inject({ method: 'HEAD', url: '/' });
    assert.equal(response.statusCode, 200);
    assert.match(response.headers['content-type'], /^text\/html/);
    assert.equal(response.headers['cache-control'], 'public, max-age=0, must-revalidate');
    assert.equal(response.payload, '');
  } finally {
    await app.close();
  }
});

test('returns real 404s for missing routes and assets', async () => {
  const { root } = await createFixture({ 'index.html': '<main>Resume</main>' });
  const app = await createApp(root);

  try {
    for (const url of ['/missing', '/assets/missing.js']) {
      const response = await app.inject({ method: 'GET', url });
      assert.equal(response.statusCode, 404);
      assert.equal(response.payload, 'Not Found\n');
    }
  } finally {
    await app.close();
  }
});

test('does not expose dotfiles or files outside the configured static root', async () => {
  const { directory, root } = await createFixture({
    '.env': 'private-dotfile',
    'index.html': '<main>Resume</main>',
  });
  const secret = 'outside-static-root';
  await writeFile(join(directory, 'secret.txt'), secret);
  const app = await createApp(root);

  try {
    for (const url of ['/.env', '/%2e%2e/secret.txt', '/..%2fsecret.txt']) {
      const response = await app.inject({ method: 'GET', url });
      assert.notEqual(response.statusCode, 200);
      assert.equal(response.payload.includes(secret), false);
      assert.equal(response.payload.includes('private-dotfile'), false);
    }
  } finally {
    await app.close();
  }
});
