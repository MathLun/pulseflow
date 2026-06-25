

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

const hasDatabase = Boolean(process.env.DATABASE_URL_TEST);

(hasDatabase ? describe : describe.skip)('Store Postgres Repository', () => {
	const database = new PostgresDatabase(env.DATABASE_URL_TEST);

	beforeAll(async () => {
	  await database.connect();
	});
	
	beforeEach(async () => {
	  await database.query('DELETE FROM stores');
	});

	afterAll(async () => {
	  await database.disconnect();
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

	it('should find all stores', async () =>
	{
	  const repository = new StorePostgresRepository(database);

	  const firstStore: Store = {
		  id: crypto.randomUUID(),
		  name: "Store 1",
		  createdAt: new Date()
	  };

	  const secondStore: Store = {
		  id: crypto.randomUUID(),
		  name: "Store 2",
		  createdAt: new Date()
	  };

	  await repository.create(firstStore);
	  await repository.create(secondStore);

	  const stores = await repository.findAll();

	  expect(stores).toHaveLength(2);
	  expect(stores[0]).toMatchObject({
		  id: firstStore.id,
		  name: firstStore.name
	  });
	  expect(stores[1]).toMatchObject({
		  id: secondStore.id,
		  name: secondStore.name
	  });
	});

	it('should find store by id', async () =>
	{
	  const repository = new StorePostgresRepository(database);

	  const store: Store = {
		  id: crypto.randomUUID(),
		  name: "Store 1",
		  createdAt: new Date()
	  };

	  await repository.create(store);

	  const foundStore = await repository.findById(store.id);

	  expect(foundStore).not.toBeNull();
	});

	it('should update store', async () => {
	  const repository = new StorePostgresRepository(database);

	  const store: Store = {
		  id: 'store-1',
		  name: 'Mercado Bahia',
		  createdAt: new Date()
	  };

	  await repository.create(store);

	  const updatedStore = await repository.update(store.id, 'Mercado Salvador');
	  expect(updatedStore?.name).toBe('Mercado Salvador');
	});

	it('should return null when store does not exists', async () => {
	  const repository = new StorePostgresRepository(database);

	  const updatedStore = await repository.update('invalid-id', 'Novo Nome');

	  expect(updatedStore).toBeNull();
	});

	it('should delete store', async () => {
	  const repository = new StorePostgresRepository(database);

	  const store: Store = {
		id: 'store-1',
		name: 'Store 1',
		createdAt: new Date()
	  };

	  await repository.create(store);

	  await repository.delete(store.id);

	  const foundStore = await repository.findById(store.id);

	  expect(foundStore).toBeNull();
	});

	it('should not fail when deleting non-existent store', async () => {
	  const repository = new StorePostgresRepository(database); 
	  await expect(repository.delete('invalid-id')).resolves.not.toThrow();
	});
});
