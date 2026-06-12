

import { describe, expect, it }
from 'vitest';

import { StoreInMemoryRepository }
from '../../domain/store';

import { CreateStoreUseCase }
from './create-store';

describe('Create Store UseCase', () => {
  it('should create store with usecase', async () => {
    const repository = new StoreInMemoryRepository();
    const usecase = new CreateStoreUseCase(repository);

    const name = 'Store 1';

    const result = await usecase.execute({ name });

    expect(result.name).toBe('Store 1');
  });

  it('should generate store id', async () => {
    const repository = new StoreInMemoryRepository();
    const usecase = new CreateStoreUseCase(repository);

    const result = await usecase.execute({
	    name: 'Store 1'
    });

    expect(result.id).toBeDefined();
  });

  it('should throw when store name is empty', async () => {
    const repository = new StoreInMemoryRepository();
    const usecase = new CreateStoreUseCase(repository);

    const result = usecase.execute({
	    name: ''
    });

    await expect(result).rejects.toThrow('Store name is required');
  });
});
