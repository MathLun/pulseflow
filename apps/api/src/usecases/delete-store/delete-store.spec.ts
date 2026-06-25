

import "dotenv/config";
import { describe, expect, it }
from 'vitest';

import { Store, StoreInMemoryRepository } 
from '../../domain/store';

import { DeleteStoreUseCase }
from './delete-store';

describe('Delete Store Use Case', async () => {
	it('should delete store', async () => 
	{
	  const repository = new StoreInMemoryRepository();

	  const store: Store = {
		id: 'store-1',
		name: 'Store 1',
		createdAt: new Date()
	  };

	  await repository.create(store);

	  const usecase = new DeleteStoreUseCase(repository);

	  await usecase.execute(store.id);

	  const foundStore = await repository.findById(store.id);

	  expect(foundStore).toBeNull();
	});

	it('should return null when store does not exist', async () => {
	  const repository = new StoreInMemoryRepository();

	  const usecase = new DeleteStoreUseCase(repository);

	  const result = await usecase.execute('invalid-id');

	  expect(result).toBeNull();
	});
});
