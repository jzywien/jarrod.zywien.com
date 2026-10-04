import { createApp } from './app.js';

function readPort(value: string | undefined): number {
  if (value === undefined || value === '') {
    return 8080;
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return port;
}

const app = await createApp();

try {
  const port = readPort(process.env.PORT);
  const address = await app.listen({ host: '0.0.0.0', port });
  app.log.info({ address }, 'Static site server listening');
} catch (error: unknown) {
  app.log.error({ err: error }, 'Failed to start static site server');
  process.exitCode = 1;
}

let isShuttingDown = false;

function shutDown(signal: NodeJS.Signals): void {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  app.log.info({ signal }, 'Shutting down static site server');
  void app.close().catch((error: unknown) => {
    app.log.error({ err: error }, 'Failed to close static site server cleanly');
    process.exitCode = 1;
  });
}

process.once('SIGINT', shutDown);
process.once('SIGTERM', shutDown);
