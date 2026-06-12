

import { describe, expect, it }
from 'vitest';

import { StoreInMemoryRepository }
from '../../domain/store';

import { ListStoresUseCase }
from './list-stores';

describe('List Stores Use Case', () => {
  it('should return empty array when no stores exist', async () => {
	const repository = new StoreInMemoryRepository();
	const usecase = new ListStoresUseCase(repository);
	const stores = await usecase.execute();

	expect(stores).toEqual([]);
  });

  it('should return all stores', async () => {
	const repository = new StoreInMemoryRepository();
	await repository.create({
		id: '1',
		name: 'Store 1',
		createdAt: new Date()
	});

	await repository.create({
		id: '2',
		name: 'Store 2',
		createdAt: new Date()
	});

	const usecase = new ListStoresUseCase(repository);

	const stores = await usecase.execute();

	expect(stores).toHaveLength(2);
  });
});
