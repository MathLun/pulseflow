


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

	it('should return all offers', async () => {
	  const store = await createStore();

	  await app.inject({
		method: 'POST',
		url: '/offers',
		payload: {
		  storeId: store.id,
		  title: 'Oferta 1',
		  description: 'Descrição 1'
		}
	  });

	  const response = await app.inject({
		method: 'GET',
		url: '/offers'
	  });

	  expect(response.statusCode).toBe(200);

	  const offers = response.json();

	  expect(offers).toHaveLength(1);

	  expect(offers[0]).toMatchObject({
		storeId: store.id,
		title: 'Oferta 1',
		description: 'Descrição 1'
	  });
	});

	it('should return empty offers list', async () => {
	  const response = await app.inject({
		method: 'GET',
		url: '/offers'
	  });

	  expect(response.statusCode).toBe(200);

	  expect(response.json()).toEqual([]);
	});

	it('should return offer by id', async () => {
	  const store = await createStore();

	  const createResponse = await app.inject({
		method: 'POST',
		url: '/offers',
		payload: {
		  storeId: store.id,
		  title: 'Oferta da semana',
		  description: '50% de desconto'
		}
	  });

	  const offer = createResponse.json();


	  const response = await app.inject({
		method: 'GET',
		url: `/offers/${offer.data.id}`
	  });

	  expect(response.statusCode).toBe(200);
	});

	it('should return 404 when offer does not exists', async () => {
	  const response = await app.inject({
		method: 'GET',
		url: '/offers/invalid-id'
	  });

	  expect(response.statusCode).toBe(404);

	});
});
