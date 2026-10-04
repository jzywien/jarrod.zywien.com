import Fastify, { type FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const generatedSiteRoot = fileURLToPath(new URL('../../dist/client/browser/', import.meta.url));
const fingerprintedBundlePattern =
  /^(?:main|polyfills|runtime|styles|chunk)-[A-Z\d]{8,}\.(?:js|css)$/;

function cacheControlFor(filePath: string): string {
  const fileName = filePath.split(/[\\/]/).at(-1) ?? '';

  if (fileName.toLowerCase().endsWith('.html')) {
    return 'public, max-age=0, must-revalidate';
  }

  if (fingerprintedBundlePattern.test(fileName)) {
    return 'public, max-age=31536000, immutable';
  }

  return 'public, max-age=0, must-revalidate';
}

export async function createApp(staticRoot = generatedSiteRoot): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      redact: ['req.headers.authorization', 'req.headers.cookie'],
    },
  });

  await app.register(fastifyStatic, {
    root: resolve(staticRoot),
    prefix: '/',
    index: ['index.html'],
    redirect: false,
    dotfiles: 'ignore',
    serveDotFiles: false,
    cacheControl: false,
    setHeaders(reply, filePath) {
      reply.header('Cache-Control', cacheControlFor(filePath));
      reply.header('X-Content-Type-Options', 'nosniff');
    },
  });

  app.setNotFoundHandler((_request, reply) =>
    reply.code(404).type('text/plain; charset=utf-8').send('Not Found\n'),
  );

  return app;
}
