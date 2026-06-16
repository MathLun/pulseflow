

import "dotenv/config";

import { describe, expect, it, beforeEach, beforeAll, afterAll }
from 'vitest';

import { PostgresDatabase }
from '../../infra/database/postgres.database';

import { env }
from '../../config/env';

import { Store }
from './store';

import { StorePostgresRepository }
from './store.postgres';

describe('Store Postgres Repository', () => {
	const database = new PostgresDatabase(env.DATABASE_URL);

	beforeAll(async () => {
	  await database.connect();
	});

	afterAll(async () => {
	  await database.disconnect();
	});

	beforeEach(async () => {
	  await database.query('DELETE FROM stores');
	});

	it('should create repository instance', async () => {

	  const repository = new StorePostgresRepository(database);

	  expect(repository).toBeInstanceOf(StorePostgresRepository);
	});

	it('should create store in progress', async () => {
	  const repository = new StorePostgresRepository(database);

	  const store: Store = {
		  id: crypto.randomUUID(),
		  name: 'Store 1',
		  createdAt: new Date()
	  };

	  await repository.create(store);

	  const result = await database.query(`
	      SELECT * FROM stores WHERE id = $1
	  `, [store.id]);

	  expect(result.rows).toHaveLength(1);
	});
});
