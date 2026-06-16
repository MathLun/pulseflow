

import "dotenv/config";
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

import { env }
from '../../config/env';

import { PostgresDatabase }
from './postgres.database';

const hasDatabase = Boolean(process.env.DATABASE_URL);

(hasDatabase ? describe : describe.skip)('Stores Table', () => {
  const database = new PostgresDatabase(env.DATABASE_URL);

  beforeAll(async () => {
	await database.connect();
  });

  afterAll(async () => {
	await database.disconnect();
  });

  it('should have stores table', async () => {
	const result = await database.query(`
	  SELECT table_name
	  FROM information_schema.tables
	  WHERE table_name = 'stores'
	`);

	expect(result.rows).toHaveLength(1);
	expect(result.rows[0].table_name).toBe('stores');
  });
});
