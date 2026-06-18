
import "dotenv/config";
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

import { env }
from '../../../config/env';

import { PostgresDatabase }
from '../postgres.database';

import { CreateStoresTableMigration }
from './001-create-stores-table';

const hasDatabase = Boolean(process.env.DATABASE_URL_TEST);

(hasDatabase ? describe : describe.skip)('Create Stores Table Migration Database', () => {
	const database = new PostgresDatabase(env.DATABASE_URL_TEST);

	beforeAll(async () => {
		await database.connect();

		await database.query(`DROP TABLE IF EXISTS stores`);
	});

	afterAll(async () => {
		await database.disconnect();
	});

	it('should create stores table', async () => {
	  const migration = new CreateStoresTableMigration();

	  await migration.up(database);

	  const result = await database.query<{
		  table_name: string
	  }>(`
	     SELECT table_name
	     FROM information_schema.tables
	     WHERE table_name = 'stores';
	  `);

	  expect(result.rows).toHaveLength(1);

	});
});
