

import { describe, expect, it }
from 'vitest';

import { StoreInMemoryRepository }
from '../../domain/store';

import { FindStoreByIdUseCase }
from './find-store-by-id';

describe('Find Store By Id Use Case', () => {
  it('should find store by id', async () => {
	const repository = new StoreInMemoryRepository();

	const store = {
		id: '1',
		name: 'Store 1',
		createdAt: new Date()
	};

	await repository.create(store);

	const usecase = new FindStoreByIdUseCase(repository);

	const result = await usecase.execute({
		id: '1'
	});

	expect(result).toEqual(store);
  });

  it('should throw when store not exist', async () => {
	const repository = new StoreInMemoryRepository();
	const usecase = new FindStoreByIdUseCase(repository);
	const result = usecase.execute({
		id: '1'
	});

	await expect(result).rejects.toThrow('Store not found');
  });
});
