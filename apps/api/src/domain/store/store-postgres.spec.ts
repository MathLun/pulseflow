

import { describe, expect, it }
from 'vitest';

import { PostgresDatabase }
from '../../infra/database/postgres.database';

import { env }
from '../../config/env';

import { StorePostgresRepository }
from './store.postgres';

describe('Store Postgres Repository', () => {
	it('should create repository instance', async () => {
	  const database = new PostgresDatabase(env.DATABASE_URL);

	  const repository = new StorePostgresRepository(database);

	  expect(repository).toBeInstanceOf(StorePostgresRepository);
	});
});
