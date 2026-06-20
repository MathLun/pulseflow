

import "dotenv/config";
import { describe, expect, it, beforeAll, afterAll, beforeEach } from 'vitest';

import { env }
from '../../../config/env';

import { PostgresDatabase }
from '../postgres.database';

import { PostgresMigrationRegistry }
from './postgres.migration.registry';

import { CreateStoresTableMigration }
from './001-create-stores-table';

describe('Postgres Migration Registry', () => {
	const database = new PostgresDatabase(env.DATABASE_URL_TEST);
	const registry = new PostgresMigrationRegistry(database);

	beforeAll(async () => {
	  await database.connect();
	});

	beforeEach(async () => {
	  await database.query(`DELETE FROM migrations`);
	});

	afterAll(async () => {
	  await database.disconnect();
	});

	it('should register executed migration', async () => {
	  const migration = new CreateStoresTableMigration();
	  await registry.register(migration.id);

	  const result = await database.query<{ id: string }>(`SELECT id FROM migrations WHERE id = $1`, [migration.id]);

	  expect(result.rows).toHaveLength(1);
	});

	it('should return executed migrations', async () => {
	  const migration = new CreateStoresTableMigration();

	  await registry.register(migration.id);

	  const executedIds = await registry.findExecutedIds();
	  expect(executedIds).toContain(
	    '001-create-stores-table'
	  );
	});
});
