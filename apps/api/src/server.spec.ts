
import "dotenv/config";

import { describe, expect, it, beforeAll, afterAll }
from 'vitest'

import { env }
from './config/env';

import { buildServer }
from './server';

import { PostgresDatabase }
from './infra/database';

const hasDatabase = Boolean(process.env.DATABASE_URL);

(hasDatabase ? describe : describe.skip)('Health Check', () => {
  const database = new PostgresDatabase(env.DATABASE_URL);
  let app: Awaited<ReturnType<typeof buildServer>>;

  beforeAll(async () => {
	  await database.connect();
	  app = await buildServer({ database });
  });

  afterAll(async () => {
	  await database.disconnect();
	  await app.close();
  });

  it('should return status ok', async () => {
    const response = await app.inject({
	method: 'GET',
	url: '/health',
    });

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
	status: 'ok',
    });
  });

  it('should return 404 for unknown route',
  async () => {
    const response = await app.inject({
	method: 'GET',
	url: '/health/check'
    });

    expect(response.statusCode).toBe(404);
  });
});
