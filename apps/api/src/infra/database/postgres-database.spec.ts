

import "dotenv/config";
import { describe, expect, it }
from 'vitest';

import { env }
from '../../config/env';

import { PostgresDatabase }
from './postgres.database';

const hasDatabase = Boolean(process.env.DATABASE_URL);

(hasDatabase ? describe : describe.skip)('Postgres Database', () => {
	it('should connect to progress database', async () => {
	  const database = new PostgresDatabase(env.DATABASE_URL);

	  await expect(database.connect()).resolves.toBeUndefined();

	  await database.disconnect();
	});

	it('should connect and execute query', async () => {
	  const database = new PostgresDatabase(env.DATABASE_URL);
	  await database.connect();

	  const healthy = await database.ping();
	  expect(healthy).toBe(true);

	  await database.disconnect();
	});
});
