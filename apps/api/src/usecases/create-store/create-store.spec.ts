

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
});
