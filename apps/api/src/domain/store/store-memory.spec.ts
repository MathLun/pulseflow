

import { describe, expect, it }
from 'vitest';

import type { Store }
from './store';

import { StoreInMemoryRepository }
from './store.memory';

describe('Store InMemory Repository', () => {
  it('should create a store', async () => {
    const repository = new StoreInMemoryRepository();
    const store: Store = {
	id: '1',
	name: 'Store 1',
	createdAt: new Date()
    };

    await repository.create(store);

    const stores = await repository.findAll();

    expect(stores).toHaveLength(1);
  });

  it('should find store by id', async () => {
    const repository = new StoreInMemoryRepository();
    const store: Store = {
	id: '1',
	name: 'Store 1',
	createdAt: new Date()
    };

    await repository.create(store);

    const result = await repository.findById('1');
    expect(result).toEqual(store);
  });

  it('should list all stores', async () => {
    const repository = new StoreInMemoryRepository();
    const store1: Store = {
	id: '1',
	name: 'Store 1',
	createdAt: new Date()
    };

    const store2: Store = {
	id: '2',
	name: 'Store 2',
	createdAt: new Date()
    };

    await repository.create(store1);
    await repository.create(store2);

    const stores = await repository.findAll();

    expect(stores).toHaveLength(2);
  });

  it('should return null when store does not exist', async () => {
    const repository = new StoreInMemoryRepository();
    const result = await repository.findById('1');
    expect(result).toBeNull();
  });

  it('should update store', async () => {
    const repository = new StoreInMemoryRepository();

    const store: Store = {
	id: 'store-1',
	name: 'Mercado Bahia',
	createdAt: new Date()
    };

    await repository.create(store);

    const updatedStore = await repository.update(
	store.id,
	'Mercado Salvador'
    );

    expect(updatedStore).toEqual({
	...store,
	name: 'Mercado Salvador'
    });
  });

  it('should return null when store does not exists', async () => {
    const repository = new StoreInMemoryRepository();
    const updatedStore = await repository.update('invalid-id', 'Novo nome');

    expect(updatedStore).toBeNull();
  });
});
