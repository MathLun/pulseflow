

import { describe, expect, it } from 'vitest';

import { StoreInMemoryRepository } from '../../domain/store/store.memory';
import { UpdateStoreUseCase } from './update-store';

describe('Update Store Use Case', () => {
  it('should update store', async () => {
    const repository = new StoreInMemoryRepository();
    const useCase = new UpdateStoreUseCase(repository);

    const store = {
      id: 'store-1',
      name: 'Mercado Bahia',
      createdAt: new Date()
    };

    await repository.create(store);

    const result = await useCase.execute(
      store.id,
      'Mercado Salvador'
    );

    expect(result).toEqual({
      ...store,
      name: 'Mercado Salvador'
    });
  });

  it('should return null when store does not exist', async () => {
    const repository = new StoreInMemoryRepository();
    const useCase = new UpdateStoreUseCase(repository);

    const result = await useCase.execute(
      'invalid-id',
      'Novo Nome'
    );

    expect(result).toBeNull();
  });

  it('should throw when store name is empty', async () => {
    const repository = new StoreInMemoryRepository();
    const useCase = new UpdateStoreUseCase(repository);

    await expect(
      useCase.execute(
        'store-1',
        ''
      )
    ).rejects.toThrow(
      'Store name is required'
    );
  });
});
