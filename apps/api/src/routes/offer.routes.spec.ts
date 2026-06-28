


import 'dotenv/config';
import { describe, expect, it, beforeAll, beforeEach, afterAll }
from 'vitest';

import crypto from 'node:crypto';

import { env }
from '../config/env';

import { PostgresDatabase }
from '../infra/database';

import { buildServer }
from '../server';

import { 
  CreateStoresTableMigration,
  CreateOffersTableMigration
} from '../infra/database/migrations';

import { Store, StorePostgresRepository }
from '../domain/store';

describe('OfferRoutes', () => {
	const database = new PostgresDatabase(env.DATABASE_URL_TEST);

	let app: Awaited<ReturnType<typeof buildServer>>;

	beforeAll(async () => {
	  await database.connect();

	  await new CreateStoresTableMigration().up(database);
	  await new CreateOffersTableMigration().up(database);

	  app = await buildServer({ database });
	});

	beforeEach(async () => {
	  await database.query('DELETE FROM stores');
	  await database.query('DELETE FROM offers');
	});

	afterAll(async () => {
	  await database.disconnect();
	  await app.close();
	});

	/* Helpers */
	const createStore = async () => {
	  const repo = new StorePostgresRepository(database);
	  const store: Store = {
		id: crypto.randomUUID(),
		name: 'Mercado da Paz',
		createdAt: new Date()
	  };

	  await repo.create(store);

	  return store;
	}

	/* Tests */
	it('should create offer', async () => {
	  const store = await createStore();

	  const response = await app.inject({
		method: 'POST',
		url: '/offers',
		payload: {
		  storeId: store.id,
		  title: 'Mercado da Paz',
		  description: '50% de desconto'
		}
	  });

	  expect(response.statusCode).toBe(201);
	});
});
